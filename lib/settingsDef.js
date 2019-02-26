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

//------------------------------------------------------------------------------
// Definition of Settings parameter validations and error messages.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The Settings class is a singleton instantiated as cpov.settings that "
        + "manages CephaloPOV-specific settings as opposed to the POV-Ray settings "
        + "in cpov.imageOptions and cpov.globalSettings.",
    conArgs: false,
    conBlock: false,
    snippets: [
        "Primitive.xset"
    ],
    mutable: [
        {
            name:    "debug",
            valid:   "cpov.isInt(val) && cpov.isWithin(val, 0, 2)",
            err:     "debug must be an integer in the range 0-2.",
            default: 0,
            desc:    "Determines the debugging mode. The legal values are $keylist.debugModes",
            tname:   "integer"
        },
        {
            name:    "frameBegin",
            valid:   "cpov.isNullOrFunction(val)",
            err:     "frameBegin must be either null or a function.",
            desc:    "This callback function is called at the beginning of each frame.",
            tname:   "function"
        },
        {
            name:    "frameEnd",
            valid:   "cpov.isNullOrFunction(val)",
            err:     "frameEnd must be either null or a function.",
            desc:    "This callback function is called at the end of each frame.",
            tname:   "function"
        },
        {
            name:    "infile",
            valid:   "cpov.isNonEmptyString(val)",
            err:     "infile must be a non-empty string.",
            desc:    "This is the name of the user program file.",
            tname:   "string"
        },
        {
            name:    "outputBase",
            valid:   "cpov.isNonEmptyString(val)",
            err:     "outputBase must be a non-empty string.",
            default: "\"cpov0000\"",
            desc:    "Provides the template for generated filenames. The first substring of zeroes will be replaced with the frame number zero-padded to the same number of digits, and <code>.ini</code> and <code>.pov</code> will be appended to form the filename. The default is <code>\"cpov0000\"</code>.",
            tname:   "string"
        },
        {
            name:    "preamble",
            valid:   "val === null || cpov.isString(val)",
            err:     "preamble must be a string or null.",
            desc:    "If non-<code>null</code>, this specifies a string&mdash;presumably SDL&mdash;to prepend to all output <code>.pov</code> files. This can also be specified by passing a filename to the <code>-p</code> or <code>--preamble</code> command line switches.",
            tname:   "string"
        },
        {
            name:    "quietMode",
            valid:   "cpov.isBoolean(val)",
            err:     "quietMode must be a boolean",
            default: "false",
            desc:    "If true, console output will be suppressed. Can be set with the <code>-q</code> or <code>--quietMode</code> command line switches.",
            tname:   "boolean"
        },
        {
            name:    "sdlIncludes",
            valid:   "cpov.isArrayOfNonEmptyStrings(val)",
            err:     "sdlIncludes must be an array of one or more SDL include files.",
            desc:    "Specifies an array of one or more SDL include files. These will generate <code>#include</code> statements in the generated <code>.pov</code> files in the order given after the contents of <code>cpov.settings.preamble</code>.",
            tname:   "boolean"
        },
        {
            name:    "snapshotMode",
            valid:   "cpov.isBoolean(val)",
            err:     "snapshotMode must be a boolean",
            default: "false",
            desc:    "If true, snapshot mode will be used for animations.",
            tname:   "boolean"
        },
        {
            name:    "verbosity",
            valid:   "cpov.isInt(val) && cpov.isWithin(val, 0, 4)",
            err:     "verbosity must be an integer in the range 0-4.",
            default: 1,
            desc:    "Sets the verbosity of console output. The default value, <code>1</code>, permits output of fatal errors and warnings, <code>2</code> enables information messages, <code>3</code> enables debugging messages. Quiet mode is the same as a verbosity of <code>0</code>. This value is incremented by the <code>-v</code> command line switch.",
            tname:   "integer"
        }
    ]
};

