//##############################################################################
//# This is the entry point for the CephaloPOV CLI program.
//##############################################################################

var chalk = require("chalk");
var cpov = require("./cephalopov.js");
var File = require("./file.js");
// import classes

main();


/*
    -i, --infile
    -o, --outfiles (basename)
    -p, --preamble
    -s, --sdlinclude
    -v, --verbose
    -q, --quietMode
    -d, --debug (verbose = 4)
    -h, --help
*/


function main() {

    var opts = {
        infile:     { short: "i", vals: [ ] },  // accumulates values
        outfiles:   { short: "o", vals: [ ] },
        preamble:   { short: "p", vals: [ ] },
        sdlInclude: { short: "s", vals: [ ] },
        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
        quietMode:  { short: "q", cnt: 0 },
        debug:      { short: "d", cnt: 0 },
        help:       { short: "h", cnt: 0 },
    }

    cpov.parseCLI(opts);

    if(opts.help.cnt) {
        console.log("\nUsage: cpov [options] [-i] <input_file>...\n\n"
            + "    -i, --infile     <filename>     Path to input file.\n"
            + "    -o, --outfiles   <template>     Template for output file names.\n"
            + "    -p, --preamble   <file(s)>      Files with text to prepend to output.\n"
            + "    -s, --sdlInclude <filename(s)>  SDL files to include after preamble.\n"
            + "    -v, --verbose                   Increase verbosity (starts at 1, up to 4).\n"
            + "    -q, --quietMode                 Suppress console output.\n"
            + "    -d, --debug                     Display debugging info.\n"
            + "    -h, --help                      Display this text.\n\n");
        process.exit(0);
    }

    if(opts.infile.vals.length == 0)
        cpov.error("fatal", "No input file specified.", "CEPHALOPOV");

    if(opts.outfiles.vals.length == 0) {
        cpov.error("warn", "No output template specified, using '" + cpov.outputBase + "'.", "CEPHALOPOV");
    } else {
        cpov.outputBase = opts.outfiles.vals[0];
    }

    if(opts.verbose.cnt > 0)
        cpov.verbosity = Math.max(opts.verbose.cnt, 4);

    if(opts.debug.cnt > 0)
        cpov.verbosity = 4;

    if(opts.quietMode.cnt > 0) {
        cpov.verbosity = 0;
        cpov.quietMode = true;
    }

    if(opts.sdlInclude.vals.length > 0)
        cpov.sdlIncludes = opts.sdlInclude.vals.slice(0);

    for(var i = 0; i < opts.preamble.vals.length; i++) {
        var fp = new File(opts.preamble.vals[i], "r");
        if(!fp.open)
            cpov.error("FATAL", "Unable to open file " + opts.preamble.vals[i] + " for reading.", "CEPHALOPOV");
        if(cpov.preamble === false)
            cpov.preamble = "";
        cpov.preamble += fp.read();
        fp.close();
    }

    try {
        var userProgram = require(opts.infile.vals[0]);
    } catch(e) {
        cpov.error("fatal", "Unable to require input file '" + opts.infile.vals[0] + "'.", "CEPHALOPOV");
    }

    if(!userProgram.main)
        cpov.error("fatal", "Unable to access its 'main' export in input file.", "CEPHALOPOV");

    userProgram.main(cpov); // main loop

}





