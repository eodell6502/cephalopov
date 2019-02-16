#!/usr/bin/env node

//##############################################################################
//# This is the entry point for the CephaloPOV CLI program.
//##############################################################################

var chalk = require("chalk");
var cpov = require("./lib/cephalopov.js");
var File = require("./lib/file.js");

var path = require("path");
var os   = require("os");
var process = require("process");

cpov.cwd      = process.cwd();
cpov.platform = os.platform();
cpov.arch     = os.arch();

cpov.classes  = require("./lib/classes.js");

for(var k in cpov.classes) {
    global[k] = cpov.classes[k];
}

main();



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

    cpov.parseCLI(opts);

    if(opts.help.cnt) {
        console.log("\nUsage: cpov [options] [-i] <input_file>...\n\n"
            + "    -i, --infile     <filename>     Path to input file.\n"
            + "    -o, --outfiles   <template>     Template for output file names.\n"
            + "    -p, --preamble   <file(s)>      Files with text to prepend to output.\n"
            + "    -s, --sdlInclude <filename(s)>  SDL files to include after preamble.\n"
            + "    -c, --tickVal    <float>        Time increment per frame (default 1.0)\n"
            + "    -t, --startTime  <float>        Start output at anim clock time (default 0.0)\n"
            + "    -T, --endTime    <float>        End output at anim clock time (default Infinity)\n"
            + "    -f, --startFrame <integer>      Start output at frame number (default 0)\n"
            + "    -F, --endFrame   <integer>      End output at frame number (default Infinity)\n"
            + "    -v, --verbose                   Increase verbosity (starts at 1, up to 4).\n"
            + "    -q, --quietMode                 Suppress console output.\n"
            + "    -d, --debug                     Display debugging info.\n"
            + "    -h, --help                      Display this text.\n\n");
        process.exit(0);
    }

    if(opts.verbose.cnt > 0)
        cpov.verbosity = Math.max(opts.verbose.cnt, 4);

    if(opts.debug.cnt > 0) {
        cpov.verbosity = 4;
        cpov.debug     = Math.min(opts.debug.cnt, 2);

        if(cpov.debug == 2) {
            cpov.debugLog = new File("cpov_debug.log", "w");
        }
    }

    if(opts.infile.vals.length == 0)
        cpov.error("fatal", "No input file specified.", "CEPHALOPOV");

    if(opts.outfiles.vals.length == 0) {
        cpov.error("warn", "No output template specified, using '" + cpov.outputBase + "'.", "CEPHALOPOV");
    } else {
        cpov.outputBase = opts.outfiles.vals[0];
    }

    if(opts.quietMode.cnt > 0) {
        cpov.verbosity = 0;
        cpov.quietMode = true;
    }

    if(opts.sdlInclude.vals.length > 0)
        cpov.sdlIncludes = opts.sdlInclude.vals.slice(0);

    if(opts.preamble.vals.length) {
        cpov.preamble = "";
        for(var i = 0; i < opts.preamble.vals.length; i++) {
            var fp = new File(opts.preamble.vals[i], "r");
            if(!fp.open)
                cpov.error("fatal", "Unable to open file " + opts.preamble.vals[i] + " for reading.", "CEPHALOPOV");
            cpov.preamble += fp.read();
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

    for(var item in cpov)
        global[item] = cpov[item];


    try {
        var userProgram = require(path.normalize(cpov.cwd) + "/" + opts.infile.vals[0]);
    } catch(e) {
        console.log(e);
        cpov.error("fatal", "Unable to require input file '" + opts.infile.vals[0] + "'.", "CEPHALOPOV");
    }

    var projectConfig = path.normalize(cpov.cwd) + "/" + opts.infile.vals[0];
    if(projectConfig.substr(-3) == ".js")
        cpov.configLoad(projectConfig.substr(0, projectConfig.length - 3) + ".config.js");
    else
        cpov.configLoad(null);

    userProgram(cpov); // main loop

}



