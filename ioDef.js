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
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "allFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "allFile must be either a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "antialias",
            valid: "cpov.isBoolean(val)",
            err:   "antialias must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "antialiasDepth",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 9)",
            err:   "antialiasDepth must be an integer in the range 1-9.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "antialiasGamma",
            valid: "cpov.isFloat(val)",
            err:   "antialiasGamma must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "antialiasThreshold",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "antialiasThreshold must be a float greater than or equal to zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "appendFile",
            valid: "cpov.isBoolean(val)",
            err:   "appendFile must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "bitsPerColor",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 5, 16)",
            err:   "bitsPerColor must be an integer in the range 5-16.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "bounding",
            valid: "cpov.isBoolean(val)",
            err:   "bounding must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "boundingMethod",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 2)",
            err:   "boundingMethod must be either 1 or 2.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "boundingThreshold",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "boundingThreshold must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "bspBaseAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspBaseAccessCost must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "bspChildAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspChildAccessCost must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "bspIsectCost",
            valid: "cpov.isFloat(val)",
            err:   "bspIsectCost must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "bspMaxDepth",
            valid: "cpov.isInt(val) && val > 0",
            err:   "bspMaxDepth must be an integer greater than zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "bspMissChance",
            valid: "cpov.isFloat(val)",
            err:   "bspMissChance must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "continueTrace",
            valid: "cpov.isBoolean(val)",
            err:   "continueTrace must be a boolean",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "createIni",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "createIni must be either a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "debugConsole",
            valid: "cpov.isBoolean(val)",
            err:   "debugConsole must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "debugFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "debugFile must be either a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "display",
            valid: "cpov.isBoolean(val)",
            err:   "display must be a boolean",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "displayGamma",
            valid: "cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB')",
            err:   "displayGamma must be either a float or the string 'sRGB'.",
            desc:  "TODO",
            tname: "float<br/>string"
        }, {
            name:  "dither",
            valid: "cpov.isBoolean(val)",
            err:   "dither must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "ditherMethod",
            valid: "cpov.isKey(val, cpov.ditherTypes)",
            err:   "ditherMethod must be one of " + cpov.keysToTextList(cpov.ditherTypes) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "endColumn",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endColumn must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "endRow",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endRow must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "exePath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "exePath must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "fatalConsole",
            valid: "cpov.isBoolean(val)",
            err:   "fatalConsole must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "fatalErrorCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "fatalErrorCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "fatalErrorReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "fatalErrorReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "fatalFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "fatalFile must be either a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "fileGamma",
            valid: "cpov.isFloat(val) || val === 'sRGB'",
            err:   "fileGamma must be either a float or the string 'sRGB'.",
            desc:  "TODO",
            tname: "float<br/>string"
        }, {
            name:  "height",
            valid: "cpov.isInt(val) && val > 0",
            err:   "height must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "highReproducibility",
            valid: "cpov.isBoolean(val)",
            err:   "highReproducibility must be a boolean",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "includeHeader",
            valid: "cpov.isNonEmptyString(val)",
            err:   "includeHeader must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "inputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "inputFileName must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "jitter",
            valid: "cpov.isBoolean(val)",
            err:   "jitter must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "jitterAmount",
            valid: "cpov.isFloat(val)",
            err:   "jitterAmount must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "libraryPath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "libraryPath must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "maxImageBufferMemory",
            valid: "cpov.isInt(val) && val > 0",
            err:   "maxImageBufferMemory must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "outputAlpha",
            valid: "cpov.isBoolean(val)",
            err:   "outputAlpha must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "outputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "outputFileName must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "outputFileType",
            valid: "cpov.isKey(val, cpov.outputFileTypes)",
            err:   "outputFileType must be one of " + cpov.keysToTextList(cpov.outputFileTypes),
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "outputToFile",
            valid: "cpov.isBoolean(val)",
            err:   "outputToFile must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "palette",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "palette must be a single character.",
            desc:  "TODO",
            tname: "char"
        }, {
            name:  "pauseWhenDone",
            valid: "cpov.isBoolean(val)",
            err:   "pauseWhenDone must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "postFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postFrameCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "postFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "postSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postSceneCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "postSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "preFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preFrameCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "preFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "preSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preSceneCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "preSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "previewEndSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewEndSize must be an integer greater than zero",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "previewStartSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewStartSize must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "quality",
            valid: "cpov.isInt(val) && val >= 0 && val <= 11",
            err:   "quality must be an integer in the range (0 - 11)",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "radiosityFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFileName must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "radiosityFromFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFromFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "radiosityToFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityToFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "radiosityVainPretrace",
            valid: "cpov.isBoolean(val)",
            err:   "radiosityVainPretrace must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "removeBounds",
            valid: "cpov.isBoolean(val)",
            err:   "removeBounds must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "renderBlockSize",
            valid: "cpov.isInt(val) && val >= 4",
            err:   "renderBlockSize must be an integer greater than or equal to 4.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "renderBlockStep",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "renderBlockStep must be an integer greater than or equal to 1.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "renderConsole",
            valid: "cpov.isBoolean(val)",
            err:   "renderConsole must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "renderFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "renderFile must be a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "renderPattern",
            valid: "cpov.isInt(val) && val >= 0 && val <= 5",
            err:   "renderPattern must be an integer in the range (0 - 5).",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "samplingMethod",
            valid: "cpov.isInt(val) && val >= 1 && val <= 2",
            err:   "samplingMethod must be an integer in the range (1 - 2).",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "splitUnions",
            valid: "cpov.isBoolean(val)",
            err:   "splitUnions must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "startColumn",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startColumn must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "startRow",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startRow must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "statisticConsole",
            valid: "cpov.isBoolean(val)",
            err:   "statisticConsole must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "statisticFile",
            valid: "cpov.isBoolean || cpov.isNonEmptyString(val)",
            err:   "statisticFile must be a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "testAbort",
            valid: "cpov.isBoolean(val)",
            err:   "testAbort must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "testAbortCount",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "testAbortCount must be an integer greater than or equal to one.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "userAbortCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "userAbortCommand must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "userAbortReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "userAbortReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + ".",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "verbose",
            valid: "cpov.isBoolean(val)",
            err:   "verbose must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "videoMode",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "videoMode must be a single character.",
            desc:  "TODO",
            tname: "char"
        }, {
            name:  "warningConsole",
            valid: "cpov.isBoolean(val)",
            err:   "warningConsole must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "warningFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "warningFile must be a boolean or a non-empty string.",
            desc:  "TODO",
            tname: "boolean<br/>string"
        }, {
            name:  "warningLevel",
            valid: "cpov.isInt(val) && (val == 0 || val == 5 || val == 10)",
            err:   "warningLevel must be one of 0, 5, or 10.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "width",
            valid: "cpov.isInt(val) && val > 0",
            err:   "width must be an integer greater than zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "workThreads",
            valid: "cpov.isInt(val) && val >= 1 && val <= 512",
            err:   "workThreads must be an integer in the range (1 - 512).",
            desc:  "TODO",
            tname: "integer"
        }
    ]
};
