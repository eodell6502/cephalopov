//##############################################################################
//# This is the entry point for the CephaloPOV CLI program.
//##############################################################################

var chalk = require("chalk");
var cpov = require("./cephalopov.js").cpov;
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

    var optionMap = {
        infile:     { short: "i", vals: [ ] },  // accumulates values
        outfiles:   { short: "o", vals: [ ] },
        preamble:   { short: "p", vals: [ ] },
        sdlinclude: { short: "s", vals: [ ] },
        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
        quietMode:  { short: "q", cnt: 0 },
        debug:      { short: "d", cnt: 0 },
        help:       { short: "h", cnt: 0 },
    }

    cpov.parseCLI(optionMap);
}





