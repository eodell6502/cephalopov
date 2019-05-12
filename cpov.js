#!/usr/bin/env node

/*

Copyright 2018-2019 Eric O'Dell and subsequent contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//##############################################################################
//# This is the entry point for the CephaloPOV CLI program.
//##############################################################################

global.cpov = new (require("./lib/cephalopov.js"))();


const path    = require("path");
const os      = require("os");
const minicle = require("minicle");
const mu      = require("minicle-usage");
const ac      = require("ansi-colors");

cpov.cwd      = process.cwd();

cpov.platform = os.platform();
cpov.arch     = os.arch();

tmp = require("./lib/classes.js");

for(var k in tmp) {
    global[k] = tmp[k];
}

cpov.settings = new Settings();


//------------------------------------------------------------------------------
// Internal state variables. These are distinct from the user-defined settings
// in cpov.settings and should generally be treated as read-only from the POV of
// user programs.
//------------------------------------------------------------------------------

cpov.debugLog       = null;      // File handle for debugging log
cpov.tickVal        = 1.0;       // clock tick
cpov.clockTime      = 0;         // current clock time
cpov.startTime      = 0.0;       // starting time for animation
cpov.endTime        = Infinity;  // ending time for animation
cpov.startFrame     = 0;         // starting frame number for animation
cpov.endFrame       = Infinity;  // ending frame number for animation
cpov.snapshots      = [ ];       // snapshots for current frame

cpov.currentFrame   = 0;         // current animation frame
cpov.frameCount     = 0;         // actual number of frames output
cpov.objectSerial   = 0;         // running count of Primitives created
cpov.serialMap      = { };       // maps serials to objects
cpov.idMap          = { };       // maps identifiers to serials



main();



//==============================================================================
// Our friend, the main loop.
//==============================================================================

function main() {

    var opts = {
        infile:     { short: "i", vals: [ ], args: "<filename>",    desc: "Path to input file." },
        outfiles:   { short: "o", vals: [ ], args: "<template>",    desc: "Template for output file names." },
        preamble:   { short: "p", vals: [ ], args: "<filename(s)>", desc: "Files with text to prepend to output." },
        sdlInclude: { short: "s", vals: [ ], args: "<filename(s)>", desc: "SDL files to include after preamble." },
        tickVal:    { short: "c", vals: [ ], args: "<float>",       desc: "Time increment per frame (def. 1.0)" },
        startTime:  { short: "t", vals: [ ], args: "<float>",       desc: "Start output at anim clock time (def. 0.0)" },
        endTime:    { short: "T", vals: [ ], args: "<float>",       desc: "End output at anim clock time (def. Inf.)" },
        startFrame: { short: "f", vals: [ ], args: "<integer>",     desc: "Start output at frame number (default 0)" },
        endFrame:   { short: "F", vals: [ ], args: "<integer>",     desc: "End output at frame number (default Inf.)" },
        verbose:    { short: "v", cnt: 0,    args: "",              desc: "Increase verbosity (starts at 1, up to 4)." },
        quietMode:  { short: "q", cnt: 0,    args: "",              desc: "Suppress console output." },
        debug:      { short: "d", cnt: 0,    args: "",              desc: "Display debugging info." },
        help:       { short: "h", cnt: 0,    args: "",              desc: "Display this text." },
    };

    var headerText = "CephaloPOV v" + cpov.version + " -- Scripting system for POV-Ray";

    minicle(opts);

    if(opts.help.cnt) {
        mu.header(headerText);
        mu.usage(opts, { usageText: "cpov [options] [-i] <input_file>..." });
    }

    if(opts.verbose.cnt > 0)
        cpov.settings.verbosity = Math.max(opts.verbose.cnt, 4);

    if(opts.debug.cnt > 0) {
        cpov.settings.verbosity = 4;
        cpov.settings.debug     = Math.min(opts.debug.cnt, 2);

        if(cpov.settings.debug == 2) {
            cpov.debugLog = new cpov.File("cpov_debug.log", "w");
        }
    }

    if(opts.quietMode.cnt > 0) {
        cpov.settings.verbosity = 0;
        cpov.settings.quietMode = true;
    }

    if(!cpov.settings.quietMode && cpov.settings.verbosity > 0)
        mu.header(headerText);


    if(opts.infile.vals.length == 0)
        cpov.error("fatal", "No input file specified.", "CEPHALOPOV");
    else
        cpov.settings.infile = opts.infile.vals[0];

    if(opts.outfiles.vals.length == 0) {
        cpov.error("info", "No output template specified, using '" + cpov.settings.outputBase + "'.", "CEPHALOPOV");
    } else {
        cpov.settings.outputBase = opts.outfiles.vals[0];
    }

    if(opts.sdlInclude.vals.length > 0)
        cpov.settings.sdlIncludes = opts.sdlInclude.vals.slice(0);

    if(opts.preamble.vals.length) {
        cpov.settings.preamble = "";
        for(var i = 0; i < opts.preamble.vals.length; i++) {
            var fp = new cpov.File(opts.preamble.vals[i], "r");
            if(!fp.open)
                cpov.error("fatal", "Unable to open file " + opts.preamble.vals[i] + " for reading.", "CEPHALOPOV");
            cpov.settings.preamble += fp.read();
            fp.close();
        }
    }

    if(opts.tickVal.vals.length) {
        var tickVal = parseFloat(opts.tickVal.vals[0]);
        if(isNaN(tickVal))
            cpov.error("fatal", "The tickVal must be a float.", "CEPHALOPOV");
        cpov.tickVal = tickVal;
    }

    if(opts.startTime.vals.length) {
        var startTime = parseFloat(opts.startTime.vals[0]);
        if(isNaN(startTime))
            cpov.error("fatal", "The startTime must be a float.", "CEPHALOPOV");
        cpov.startTime = startTime;
    }

    if(opts.endTime.vals.length) {
        var endTime = parseFloat(opts.endTime.vals[0]);
        if(isNaN(endTime))
            cpov.error("fatal", "The endTime must be a float.", "CEPHALOPOV");
        cpov.endTime = endTime;
    }

    if(opts.startFrame.vals.length) {
        var startFrameFloat = parseFloat(opts.startFrame.vals[0]);
        var startFrame      = parseInt(opts.startFrame.vals[0]);
        if(isNaN(startFrame) || startFrameFloat != startFrame || startFrame < 0)
            cpov.error("fatal", "The startFrame must be an integer >= 0.", "CEPHALOPOV");
        cpov.startFrame = startFrame;
    }

    if(opts.endFrame.vals.length) {
        var endFrameFloat = parseFloat(opts.endFrame.vals[0]);
        var endFrame      = parseInt(opts.endFrame.vals[0]);
        if(isNaN(endFrame) || endFrameFloat != endFrame || endFrame < 0 || endFrame <= cpov.startFrame)
            cpov.error("fatal", "The endFrame must be an integer >= 0 and <= startFrame .", "CEPHALOPOV");
        cpov.endFrame = endFrame;
    }

    cpov.globalSettings = new GlobalSettings({ assumedGamma: 1.0 }); // assumedGamma is required as of POV-Ray 3.7+
    cpov.imageOptions   = new ImageOptions();

    // FIXME: We really want to be *much* more selective than this.
    // Is this even necessary at this point? It feels like a hangover from
    // the early development phase, and everything should be in the global
    // cpov object anyway.

    for(var item in cpov)
        global[item] = cpov[item];

    try {
        var userProgram = require(path.normalize(cpov.cwd) + "/" + cpov.settings.infile);
    } catch(e) {
        console.log(e);
        cpov.error("fatal", "Unable to require input file '" + cpov.settings.infile + "'.", "CEPHALOPOV");
    }

    var projectConfig = path.normalize(cpov.cwd) + "/" + cpov.settings.infile;
    if(projectConfig.substr(-3) == ".js")
        cpov.configLoad(projectConfig.substr(0, projectConfig.length - 3) + ".config.js");
    else
        cpov.configLoad(null);

    userProgram(cpov); // main loop

}




