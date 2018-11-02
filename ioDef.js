//------------------------------------------------------------------------------
// Definition of imageOptions parameter validations and error messages.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The ImageOptions class manages the variables that will be output "
        + "into .ini files for each frame and which can, optionally, be emitted "
        + "in the form of command line switches.",
    conArgs: false,
    conBlock: false,
    snippets: ["ImageOptions.output"],
    mutable: [
        {
            name:  "allConsole",
            valid: "cpov.isBoolean(val)",
            err:   "allConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray debug messages, fatal errors, rendering info, statistics, and warnings are sent to the console.",
            tname: "boolean"
        }, {
            name:  "allFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "allFile must be either a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray debug messages, fatal errors, rendering info, statistics, and warnings are written to <code>ALLTEXT.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "antialias",
            valid: "cpov.isBoolean(val)",
            err:   "antialias must be a boolean.",
            desc:  "If <code>true</code>, enables antialiasing.",
            tname: "boolean"
        }, {
            name:  "antialiasDepth",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 9)",
            err:   "antialiasDepth must be an integer in the range 1-9.",
            desc:  "Specifies the number of rows and columns within each pixel to be super-sampled. Values in the range 1-9 are permitted, and the default is 3.",
            tname: "integer"
        }, {
            name:  "antialiasGamma",
            valid: "cpov.isFloat(val)",
            err:   "antialiasGamma must be a float.",
            desc:  "Sets the gamma to be used in antialiasing.",
            tname: "float"
        }, {
            name:  "antialiasThreshold",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "antialiasThreshold must be a float greater than or equal to zero.",
            desc:  "Defines the amount by which a pixel must differ from its neighbors to trigger supersampling. The default is 0.3.",
            tname: "float"
        }, {
            name:  "appendFile",
            valid: "cpov.isBoolean(val)",
            err:   "appendFile must be a boolean.",
            desc:  "If <code>true</code>, output from the various runtime log files will be appended to existing files. If <code>false</code>, runtime log files will be overwritten.",
            tname: "boolean"
        }, {
            name:  "bitsPerColor",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 5, 16)",
            err:   "bitsPerColor must be an integer in the range 5-16.",
            desc:  "Specifies the number of bits per color channel in the image file. This only affects PNG and PNM output, which allow 5-16 bits per channel.",
            tname: "integer"
        }, {
            name:  "bounding",
            valid: "cpov.isBoolean(val)",
            err:   "bounding must be a boolean.",
            desc:  "If <code>true</code> (the default), turns automatic bounding control on.",
            tname: "boolean"
        }, {
            name:  "boundingMethod",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 2)",
            err:   "boundingMethod must be either 1 or 2.",
            desc:  "If set to 1 (the default), the POV-Ray 3.0+ automatic bounding system is used. If set to 2, the new (and very much beta) Binary Space Partitioning method is used.",
            tname: "integer"
        }, {
            name:  "boundingThreshold",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "boundingThreshold must be an integer greater than or equal to zero.",
            desc:  "Sets the minimum number of objects that must be in a scene before automatic bounding control is used. Defaults to 25.",
            tname: "integer"
        }, {
            name:  "bspBaseAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspBaseAccessCost must be a float.",
            desc:  "Parameter for the beta Binary Space Partioning System. See <a href=\"http://www.realtimerendering.com/resources/RTNews/html/rtnv17n1.html#art8\">this article</a> for details.",
            tname: "float"
        }, {
            name:  "bspChildAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspChildAccessCost must be a float.",
            desc:  "Parameter for the beta Binary Space Partioning System. See <a href=\"http://www.realtimerendering.com/resources/RTNews/html/rtnv17n1.html#art8\">this article</a> for details.",
            tname: "float"
        }, {
            name:  "bspIsectCost",
            valid: "cpov.isFloat(val)",
            err:   "bspIsectCost must be a float.",
            desc:  "Parameter for the beta Binary Space Partioning System. See <a href=\"http://www.realtimerendering.com/resources/RTNews/html/rtnv17n1.html#art8\">this article</a> for details.",
            tname: "float"
        }, {
            name:  "bspMaxDepth",
            valid: "cpov.isInt(val) && val > 0",
            err:   "bspMaxDepth must be an integer greater than zero.",
            desc:  "Parameter for the beta Binary Space Partioning System. See <a href=\"http://www.realtimerendering.com/resources/RTNews/html/rtnv17n1.html#art8\">this article</a> for details.",
            tname: "float"
        }, {
            name:  "bspMissChance",
            valid: "cpov.isFloat(val)",
            err:   "bspMissChance must be a float.",
            desc:  "Parameter for the beta Binary Space Partioning System. See <a href=\"http://www.realtimerendering.com/resources/RTNews/html/rtnv17n1.html#art8\">this article</a> for details.",
            tname: "float"
        }, {
            name:  "debugConsole",
            valid: "cpov.isBoolean(val)",
            err:   "debugConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray debug messages are sent to the console.",
            tname: "boolean"
        }, {
            name:  "debugFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "debugFile must be either a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray debug messages are written to <code>DEBUG.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "display",
            valid: "cpov.isBoolean(val)",
            err:   "display must be a boolean",
            desc:  "If <code>true</code>, the image in progress will be displayed during rendering.",
            tname: "boolean"
        }, {
            name:  "displayGamma",
            valid: "cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB')",
            err:   "displayGamma must be either a float or the string 'sRGB'.",
            desc:  "A float defining the gamma to be used by the display during rendering or the string <code>\"sRGB\"</code> (roughly 2.2).",
            tname: "float<br/>string"
        }, {
            name:  "dither",
            valid: "cpov.isBoolean(val)",
            err:   "dither must be a boolean.",
            desc:  "If <code>true</code> (the default is <code>false</code>), output dithering is used.",
            tname: "boolean"
        }, {
            name:  "ditherMethod",
            valid: "cpov.isKey(val, cpov.ditherTypes)",
            err:   "ditherMethod must be one of " + cpov.keysToTextList(cpov.ditherTypes) + ".",
            desc:  "Sets the dithering algorithm if dithering is turned on. The supported values are: $keylist.ditherTypes",
            tname: "string"
        }, {
            name:  "endColumn",
            valid: "cpov.isFloat(val) && val > 0",
            err:   "endColumn must be an integer greater than zero.",
            desc:  "Forces the end of output at the specified column if an integer is supplied or a fraction of screen width if a float in the unit interval (0.n) is supplied.",
            tname: "integer<br/>float"
        }, {
            name:  "endRow",
            valid: "cpov.isFloat(val) && val > 0",
            err:   "endRow must be an integer greater than zero.",
            desc:  "Forces the end of output at the specified row if an integer is supplied or a fraction of screen height if a float in the unit interval (0.n) is supplied.",
            tname: "integer<br/>float"
        }, {
            name:  "exePath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "exePath must be a non-empty string.",
            desc:  "This should contain the full path to the POV-Ray executable if it is not in the system path.",
            tname: "string"
        }, {
            name:  "fatalConsole",
            valid: "cpov.isBoolean(val)",
            err:   "fatalConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray fatal error messages are sent to the console.",
            tname: "boolean"
        }, {
            name:  "fatalErrorCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "fatalErrorCommand must be a non-empty string.",
            desc:  "Shell command to execute when POV-Ray encounters a fatal error.",
            tname: "string"
        }, {
            name:  "fatalErrorReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "fatalErrorReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "Specifies the action to take when a fatal error occurs during the exectuion of the <code>fatalErrorCommand</code>. Action codes may be prefixed with \"<code>-</code>\" or \"<code>!</code> to negate the action. The legal codes are $keylist.returnActionsRaw",
            tname: "string"
        }, {
            name:  "fatalFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "fatalFile must be either a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray fatal error messages are written to <code>FATAL.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "fileGamma",
            valid: "cpov.isFloat(val) || val === 'sRGB'",
            err:   "fileGamma must be either a float or the string 'sRGB'.",
            desc:  "Sets the display target gamma for the output file. This may be given as either a float or the string <code>\"sRGB\"</code> (approx. 2.2).",
            tname: "float<br/>string"
        }, {
            name:  "height",
            valid: "cpov.isInt(val) && val > 0",
            err:   "height must be an integer greater than zero.",
            desc:  "Height of output image in pixels.",
            tname: "integer"
        }, {
            name:  "highReproducibility",
            valid: "cpov.isBoolean(val)",
            err:   "highReproducibility must be a boolean",
            desc:  "If <code>true</code>, enables the experimental high reproducibility mode, which attempts to impose determinism on calculations in SMP environments. Currently only works with radiosity.",
            tname: "boolean"
        }, {
            name:  "includeHeader",
            valid: "cpov.isNonEmptyString(val)",
            err:   "includeHeader must be a non-empty string.",
            desc:  "Specifies an SDL include file to be referenced in the SDL output.",
            tname: "string"
        }, {
            name:  "inputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "inputFileName must be a non-empty string.",
            desc:  "Explicitly sets an input .pov file name.",
            tname: "string"
        }, {
            name:  "jitter",
            valid: "cpov.isBoolean(val)",
            err:   "jitter must be a boolean.",
            desc:  "If <code>true</code>, enables random jittering of antialiasing super-samples to minimize artifacts. This should only be used for static scenes, not animation.",
            tname: "boolean"
        }, {
            name:  "jitterAmount",
            valid: "cpov.isFloat(val)",
            err:   "jitterAmount must be a float.",
            desc:  "Defines the amount of jitter. The default is 1.0, above which super-samples may stray outside of their pixels.",
            tname: "float"
        }, {
            name:  "libraryPath",
            valid: "cpov.isArrayOfNonEmptyStrings(val, 1, Infinity)",
            err:   "libraryPath must be an array of one or more non-empty strings.",
            desc:  "An array of one or more paths to search for include files.",
            tname: "Array"
        }, {
            name:  "maxImageBuffer",
            valid: "cpov.isInt(val) && val > 0",
            err:   "maxImageBuffer must be an integer greater than zero.",
            desc:  "Specifies the number of megabytes of memory to reserve as an output buffer for images. The default is 128.",
            tname: "integer"
        }, {
            name:  "outputAlpha",
            valid: "cpov.isBoolean(val)",
            err:   "outputAlpha must be a boolean.",
            desc:  "Enables or disables the alpha channel in output files. This only has an effect when the output file type supports alpha, i.e., PNG or Targa.",
            tname: "boolean"
        }, {
            name:  "outputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "outputFileName must be a non-empty string.",
            desc:  "By default, the output file name is derived from the .pov scene file name. This option allows it to be set manually. If a directory name is given here instead of a file name, the default name is used and the file is written to the specified directory.",
            tname: "string"
        }, {
            name:  "outputFileType",
            valid: "cpov.isKey(val, cpov.outputFileTypes)",
            err:   "outputFileType must be one of " + cpov.keysToTextList(cpov.outputFileTypes),
            desc:  "Sets the format of the output file. These are all single-character codes as specified below: $keylist.outputFileTypes",
            tname: "string"
        }, {
            name:  "outputToFile",
            valid: "cpov.isBoolean(val)",
            err:   "outputToFile must be a boolean.",
            desc:  "If <code>true</code> (the default), POV-Ray will produce an output image file. If <code>false</code>, no file is produced, which is often desirable when doing test renders.",
            tname: "boolean"
        }, {
            name:  "palette",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "palette must be a single character.",
            desc:  "A single character which selects a hardware-dependent palette for display during rendering.",
            tname: "char"
        }, {
            name:  "pauseWhenDone",
            valid: "cpov.isBoolean(val)",
            err:   "pauseWhenDone must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray will wait for a keypress at the end of rendering before clearing the display.",
            tname: "boolean"
        }, {
            name:  "postSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postSceneCommand must be a non-empty string.",
            desc:  "Shell command to execute after rendering a scene. Since CephaloPOV replaces POV-Ray's native animation system, this happens after every frame in an animation.",
            tname: "string"
        }, {
            name:  "postSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "Specifies the action to take when the <code>postSceneAction</code> fails. See <code>fatalExecutionReturn</code> for a list of legal values.",
            tname: "string"
        }, {
            name:  "preSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preSceneCommand must be a non-empty string.",
            desc:  "Shell command to execute before rendering a scene. Since CephaloPOV replaces POV-Ray's native animation system, this happens before every frame in an animation.",
            tname: "string"
        }, {
            name:  "preSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "Specifies the action to take when the <code>preSceneAction</code> fails. See <code>fatalExecutionReturn</code> for a list of legal values.",
            tname: "string"
        }, {
            name:  "previewEndSize",
            valid: "cpov.isInt(val) && cpov.isPowerOfTwo(val) && val > 0",
            err:   "previewEndSize must be an integer that is both a power of two and greater than zero",
            desc:  "Sets the final block size in pixels for mosaic rendering. This must be an integer that is both a power of two and greater than zero.",
            tname: "integer"
        }, {
            name:  "previewStartSize",
            valid: "cpov.isInt(val) && cpov.isPowerOfTwo(val) && val > 0",
            err:   "previewStartSize must be an integer that is both a power of two and greater than zero.",
            desc:  "Sets the initial block size in pixels for mosaic rendering. This must be an integer that is both a power of two and greater than zero.",
            tname: "integer"
        }, {
            name:  "quality",
            valid: "cpov.isInt(val) && val >= 0 && val <= 11",
            err:   "quality must be an integer in the range (0 - 11)",
            desc:  "Determines rendering quality in the range (0 - 11), with higher values being better. The supported levels, with duplication to allow for future changes, are $keylist.renderQuality",
            tname: "integer"
        }, {
            name:  "radFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radFileName must be a non-empty string.",
            desc:  "If specified, manually sets the name of the radiosity cache file.",
            tname: "string"
        }, {
            name:  "radFromFile",
            valid: "cpov.isBoolean(val)",
            err:   "radFromFile must be a boolean.",
            desc:  "If <code>true</code>, loads sample data from an existing radiosity cache file.",
            tname: "string"
        }, {
            name:  "radToFile",
            valid: "cpov.isBoolean(val)",
            err:   "radToFile must be a boolean.",
            desc:  "If <code>true</code>, saves sample data to a radiosity cache file for reuse.",
            tname: "string"
        }, {
            name:  "radVainPretrace",
            valid: "cpov.isBoolean(val)",
            err:   "radVainPretrace must be a boolean.",
            desc:  "If <code>true</code> (the default), an extra radiosity trace will be taken to improve the quality of the preview. If not needed, this can be turned off to improve rendering speed.",
            tname: "boolean"
        }, {
            name:  "removeBounds",
            valid: "cpov.isBoolean(val)",
            err:   "removeBounds must be a boolean.",
            desc:  "If <code>true</code> (the default), manual bounds will be removed if automatic bounding control is turned on.",
            tname: "boolean"
        }, {
            name:  "renderBlockSize",
            valid: "cpov.isInt(val) && val >= 4",
            err:   "renderBlockSize must be an integer greater than or equal to 4.",
            desc:  "Specifies the size of blocks of pixels to be rendered. Must be 4 or greater.",
            tname: "integer"
        }, {
            name:  "renderBlockStep",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "renderBlockStep must be an integer greater than or equal to 1.",
            desc:  "Sets the step size for walking through the blocks numbered by <code>renderPattern</code>",
            tname: "integer"
        }, {
            name:  "renderConsole",
            valid: "cpov.isBoolean(val)",
            err:   "renderConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray rendering information is sent to the console.",
            tname: "boolean"
        }, {
            name:  "renderFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "renderFile must be a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray rendering information is written to <code>RENDER.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "renderPattern",
            valid: "cpov.isInt(val) && val >= 0 && val <= 5",
            err:   "renderPattern must be an integer in the range (0 - 5).",
            desc:  "Determines the order in which render blocks will be rendered. See the POV-Ray documentation for <a href=\"http://povray.org/documentation/3.7.0/r3_2.html#r3_2_8_2_1\">details</a>.",
            tname: "integer"
        }, {
            name:  "samplingMethod",
            valid: "cpov.isInt(val) && val >= 1 && val <= 2",
            err:   "samplingMethod must be an integer in the range (1 - 2).",
            desc:  "Sets the antialiasing sampling method. A value of 1, the default, enables non-recursive sampling, while 2 enables adaptive, recursive sampling.",
            tname: "integer"
        }, {
            name:  "splitUnions",
            valid: "cpov.isBoolean(val)",
            err:   "splitUnions must be a boolean.",
            desc:  "If <code>true</code>, manually bound <code>Union</code> objects will be rebound by the automatic bounding system. The default is <code>false</code>.",
            tname: "boolean"
        }, {
            name:  "startColumn",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "startColumn must be an integer greater than or equal to zero.",
            desc:  "Forces the start of output at the specified column if an integer is supplied or a fraction of screen width if a float in the unit interval (0.n) is supplied.",
            tname: "integer<br/>float"
        }, {
            name:  "startRow",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "startRow must be an integer greater than or equal to zero.",
            desc:  "Forces the end of output at the specified row if an integer is supplied or a fraction of screen height if a float in the unit interval (0.n) is supplied.",
            tname: "integer<br/>float"
        }, {
            name:  "statisticConsole",
            valid: "cpov.isBoolean(val)",
            err:   "statisticConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray statistics are sent to the console.",
            tname: "boolean"
        }, {
            name:  "statisticFile",
            valid: "cpov.isBoolean || cpov.isNonEmptyString(val)",
            err:   "statisticFile must be a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray statistics are written to <code>STATS.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "testAbort",
            valid: "cpov.isBoolean(val)",
            err:   "testAbort must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray will poll the keyboard for <code>Ctrl-C</code> to halt the program. If false, <code>Ctrl-C</code> is ignored.",
            tname: "boolean"
        }, {
            name:  "testAbortCount",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "testAbortCount must be an integer greater than or equal to one.",
            desc:  "If <code>testAbort</code> is <code>true</code>, <code>testAbortCount</code> specifies the number of pixels rendered between tests for <code>Ctrl-C</code>.",
            tname: "integer"
        }, {
            name:  "userAbortCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "userAbortCommand must be a non-empty string.",
            desc:  "Shell command to execute when the user aborts rendering.",
            tname: "string"
        }, {
            name:  "userAbortReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "userAbortReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "Specifies the action to take when the <code>userAbortAction</code> fails. See <code>fatalExecutionReturn</code> for a list of legal values.",
            tname: "string"
        }, {
            name:  "verbose",
            valid: "cpov.isBoolean(val)",
            err:   "verbose must be a boolean.",
            desc:  "If true, POV-Ray will output additional information about each render. Not to be confused with CephaloPOV's <code>-v</code> switch, which only increses the verbosity of its own output.",
            tname: "boolean"
        }, {
            name:  "videoMode",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "videoMode must be a single character.",
            desc:  "A single character/digit which defines the hardware-dependent video mode.",
            tname: "char"
        }, {
            name:  "warningConsole",
            valid: "cpov.isBoolean(val)",
            err:   "warningConsole must be a boolean.",
            desc:  "If <code>true</code>, POV-Ray warning messages are sent to the console.",
            tname: "boolean"
        }, {
            name:  "warningFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "warningFile must be a boolean or a non-empty string.",
            desc:  "If <code>true</code>, POV-Ray warning messages are written to <code>WARNING.OUT</code>. Alternatively, a custom filename may be specified here.",
            tname: "boolean<br/>string"
        }, {
            name:  "warningLevel",
            valid: "cpov.isInt(val) && cpov.isKey(val, cpov.warningLevels)",
            err:   "warningLevel must be one of 0, 5, or 10.",
            desc:  "Specifies POV-Ray's warning level. The legal values are: $keylist.warningLevels",
            tname: "integer"
        }, {
            name:  "width",
            valid: "cpov.isInt(val) && val > 0",
            err:   "width must be an integer greater than zero.",
            desc:  "Width of output image in pixels.",
            tname: "integer"
        }, {
            name:  "workThreads",
            valid: "cpov.isInt(val) && val >= 1 && val <= 512",
            err:   "workThreads must be an integer in the range (1 - 512).",
            desc:  "Sets the number of processor threads in a multicore environment. Defaults to the detected number of cores or 4 if detection is not possible, but may be set as high as 512.",
            tname: "integer"
        }
    ]
};
