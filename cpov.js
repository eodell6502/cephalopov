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


var path    = require("path");
var os      = require("os");
var process = require("process");
var minicle = require("minicle");

cpov.cwd      = process.cwd();

cpov.platform = os.platform();
cpov.arch     = os.arch();

tmp = require("./lib/classes.js");

for(var k in tmp) {
    global[k] = tmp[k];
}

cpov.settings = new Settings();

console.log(cpov.cwd);

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
        debug:      { short: "d", cnt: 0 },
        endFrame:   { short: "F", vals: [ ] },
        endTime:    { short: "T", vals: [ ] },
        help:       { short: "h", cnt: 0 },
        infile:     { short: "i", vals: [ ] },  // accumulates values
        outfiles:   { short: "o", vals: [ ] },
        preamble:   { short: "p", vals: [ ] },
        quietMode:  { short: "q", cnt: 0 },
        sdlInclude: { short: "s", vals: [ ] },
        startFrame: { short: "f", vals: [ ] },
        startTime:  { short: "t", vals: [ ] },
        tickVal:    { short: "c", vals: [ ] },
        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
    }

    minicle(opts);

    if(opts.help.cnt) {
        outputHeader();
        usageInstructions();
        process.exit(0);
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
        outputHeader();


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


//==============================================================================
// Outputs the runtime header to console. This will become progressively more
// ostentatious and ridiculous as time goes by.
//==============================================================================

function outputHeader() {

    if(!cpov.chalk.supportsColor) {
        console.log(
            "\n===========================================================================\n"
            + "            CephaloPOV v" + cpov.version + " -- Scripting system for POV-Ray\n"
            + "===========================================================================\n"
        );
    } else {
        console.log(
            "\n" + cpov.chalk.blue("===========================================================================") + "\n"
            + cpov.chalk.yellow.bold("            CephaloPOV v" + cpov.version + " -- Scripting system for POV-Ray") + "\n"
            + cpov.chalk.blue("===========================================================================") + "\n"
        );
    }
}



function usageInstructions() {

    console.log(cpov.chalk.white.bold("  Usage: cpov [options] [-i] <input_file>...\n\n")
        + cpov.chalk.yellow.bold("    -i") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--infile     ") + cpov.chalk.blue.bold("<filename>     ") + cpov.chalk.cyan.bold("Path to input file.\n")
        + cpov.chalk.yellow.bold("    -o") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--outfiles   ") + cpov.chalk.blue.bold("<template>     ") + cpov.chalk.cyan.bold("Template for output file names.\n")
        + cpov.chalk.yellow.bold("    -p") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--preamble   ") + cpov.chalk.blue.bold("<file(s)>      ") + cpov.chalk.cyan.bold("Files with text to prepend to output.\n")
        + cpov.chalk.yellow.bold("    -s") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--sdlInclude ") + cpov.chalk.blue.bold("<filename(s)>  ") + cpov.chalk.cyan.bold("SDL files to include after preamble.\n")
        + cpov.chalk.yellow.bold("    -c") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--tickVal    ") + cpov.chalk.blue.bold("<float>        ") + cpov.chalk.cyan.bold("Time increment per frame (def. 1.0)\n")
        + cpov.chalk.yellow.bold("    -t") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--startTime  ") + cpov.chalk.blue.bold("<float>        ") + cpov.chalk.cyan.bold("Start output at anim clock time (def. 0.0)\n")
        + cpov.chalk.yellow.bold("    -T") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--endTime    ") + cpov.chalk.blue.bold("<float>        ") + cpov.chalk.cyan.bold("End output at anim clock time (def. Inf.)\n")
        + cpov.chalk.yellow.bold("    -f") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--startFrame ") + cpov.chalk.blue.bold("<integer>      ") + cpov.chalk.cyan.bold("Start output at frame number (default 0)\n")
        + cpov.chalk.yellow.bold("    -F") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--endFrame   ") + cpov.chalk.blue.bold("<integer>      ") + cpov.chalk.cyan.bold("End output at frame number (default Inf.)\n")
        + cpov.chalk.yellow.bold("    -v") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--verbose    ") + cpov.chalk.blue.bold("               ") + cpov.chalk.cyan.bold("Increase verbosity (starts at 1, up to 4).\n")
        + cpov.chalk.yellow.bold("    -q") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--quietMode  ") + cpov.chalk.blue.bold("               ") + cpov.chalk.cyan.bold("Suppress console output.\n")
        + cpov.chalk.yellow.bold("    -d") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--debug      ") + cpov.chalk.blue.bold("               ") + cpov.chalk.cyan.bold("Display debugging info.\n")
        + cpov.chalk.yellow.bold("    -h") + cpov.chalk.yellow(", ") + cpov.chalk.yellow.bold("--help       ") + cpov.chalk.blue.bold("               ") + cpov.chalk.cyan.bold("Display this text.\n\n"));
}
