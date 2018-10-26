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
            err:   "allConsole must be a boolean."
        }, {
            name:  "allFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "allFile must be either a boolean or a non-empty string."
        }, {
            name:  "antialias",
            valid: "cpov.isBoolean(val)",
            err:   "antialias must be a boolean."
        }, {
            name:  "antialiasDepth",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 9)",
            err:   "antialiasDepth must be an integer in the range 1-9."
        }, {
            name:  "antialiasGamma",
            valid: "cpov.isFloat(val)",
            err:   "antialiasGamma must be a float."
        }, {
            name:  "antialiasThreshold",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "antialiasThreshold must be a float greater than or equal to zero."
        }, {
            name:  "appendFile",
            valid: "cpov.isBoolean(val)",
            err:   "appendFile must be a boolean."
        }, {
            name:  "bitsPerColor",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 5, 16)",
            err:   "bitsPerColor must be an integer in the range 5-16."
        }, {
            name:  "bounding",
            valid: "cpov.isBoolean(val)",
            err:   "bounding must be a boolean."
        }, {
            name:  "boundingMethod",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 2)",
            err:   "boundingMethod must be either 1 or 2."
        }, {
            name:  "boundingThreshold",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "boundingThreshold must be an integer greater than or equal to zero."
        }, {
            name:  "bspBaseAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspBaseAccessCost must be a float."
        }, {
            name:  "bspChildAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspChildAccessCost must be a float."
        }, {
            name:  "bspIsectCost",
            valid: "cpov.isFloat(val)",
            err:   "bspIsectCost must be a float."
        }, {
            name:  "bspMaxDepth",
            valid: "cpov.isInt(val) && val > 0",
            err:   "bspMaxDepth must be an integer greater than zero."
        }, {
            name:  "bspMissChance",
            valid: "cpov.isFloat(val)",
            err:   "bspMissChance must be a float."
        }, {
            name:  "continueTrace",
            valid: "cpov.isBoolean(val)",
            err:   "continueTrace must be a boolean"
        }, {
            name:  "createIni",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "createIni must be either a boolean or a non-empty string."
        }, {
            name:  "debugConsole",
            valid: "cpov.isBoolean(val)",
            err:   "debugConsole must be a boolean."
        }, {
            name:  "debugFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "debugFile must be either a boolean or a non-empty string."
        }, {
            name:  "display",
            valid: "cpov.isBoolean(val)",
            err:   "display must be a boolean"
        }, {
            name:  "displayGamma",
            valid: "cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB')",
            err:   "displayGamma must be either a float or the string 'sRGB'."
        }, {
            name:  "dither",
            valid: "cpov.isBoolean(val)",
            err:   "dither must be a boolean."
        }, {
            name:  "ditherMethod",
            valid: "cpov.isKey(val, cpov.ditherTypes)",
            err:   "ditherMethod must be one of " + cpov.keysToTextList(cpov.ditherTypes) + "."
        }, {
            name:  "endColumn",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endColumn must be an integer greater than zero."
        }, {
            name:  "endRow",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endRow must be an integer greater than zero."
        }, {
            name:  "exePath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "exePath must be a non-empty string."
        }, {
            name:  "fatalConsole",
            valid: "cpov.isBoolean(val)",
            err:   "fatalConsole must be a boolean."
        }, {
            name:  "fatalErrorCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "fatalErrorCommand must be a non-empty string."
        }, {
            name:  "fatalErrorReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "fatalErrorReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "fatalFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "fatalFile must be either a boolean or a non-empty string."
        }, {
            name:  "fileGamma",
            valid: "cpov.isFloat(val) || val === 'sRGB'",
            err:   "fileGamma"
        }, {
            name:  "height",
            valid: "cpov.isInt(val) && val > 0",
            err:   "height must be an integer greater than zero."
        }, {
            name:  "highReproducibility",
            valid: "cpov.isBoolean(val)",
            err:   "highReproducibility must be a boolean"
        }, {
            name:  "includeHeader",
            valid: "cpov.isNonEmptyString(val)",
            err:   "includeHeader must be a non-empty string."
        }, {
            name:  "inputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "inputFileName must be a non-empty string."
        }, {
            name:  "jitter",
            valid: "cpov.isBoolean(val)",
            err:   "jitter must be a boolean."
        }, {
            name:  "jitterAmount",
            valid: "cpov.isFloat(val)",
            err:   "jitterAmount must be a float."
        }, {
            name:  "libraryPath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "libraryPath must be a non-empty string."
        }, {
            name:  "maxImageBufferMemory",
            valid: "cpov.isInt(val) && val > 0",
            err:   "maxImageBufferMemory must be an integer greater than zero."
        }, {
            name:  "outputAlpha",
            valid: "cpov.isBoolean(val)",
            err:   "outputAlpha must be a boolean."
        }, {
            name:  "outputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "outputFileName must be a non-empty string."
        }, {
            name:  "outputFileType",
            valid: "cpov.isKey(val, cpov.outputFileTypes)",
            err:   "outputFileType must be one of " + cpov.keysToTextList(cpov.outputFileTypes)
        }, {
            name:  "outputToFile",
            valid: "cpov.isBoolean(val)",
            err:   "outputToFile must be a boolean."
        }, {
            name:  "palette",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "palette"
        }, {
            name:  "pauseWhenDone",
            valid: "cpov.isBoolean(val)",
            err:   "pauseWhenDone must be a boolean."
        }, {
            name:  "postFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postFrameCommand must be a non-empty string."
        }, {
            name:  "postFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "postSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postSceneCommand must be a non-empty string."
        }, {
            name:  "postSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "preFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preFrameCommand must be a non-empty string."
        }, {
            name:  "preFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "preSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preSceneCommand must be a non-empty string."
        }, {
            name:  "preSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "previewEndSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewEndSize must be an integer greater than zero"
        }, {
            name:  "previewStartSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewStartSize must be an integer greater than zero."
        }, {
            name:  "quality",
            valid: "cpov.isInt(val) && val >= 0 && val <= 11",
            err:   "quality must be an integer in the range (0 - 11)"
        }, {
            name:  "radiosityFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFileName must be a non-empty string."
        }, {
            name:  "radiosityFromFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFromFile must be a non-empty string."
        }, {
            name:  "radiosityToFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityToFile must be a non-empty string."
        }, {
            name:  "radiosityVainPretrace",
            valid: "cpov.isBoolean(val)",
            err:   "radiosityVainPretrace must be a boolean."
        }, {
            name:  "removeBounds",
            valid: "cpov.isBoolean(val)",
            err:   "removeBounds must be a boolean."
        }, {
            name:  "renderBlockSize",
            valid: "cpov.isInt(val) && val >= 4",
            err:   "renderBlockSize must be an integer greater than or equal to 4."
        }, {
            name:  "renderBlockStep",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "renderBlockStep must be an integer greater than or equal to 1."
        }, {
            name:  "renderConsole",
            valid: "cpov.isBoolean(val)",
            err:   "renderConsole must be a boolean."
        }, {
            name:  "renderFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "renderFile must be a boolean or a non-empty string."
        }, {
            name:  "renderPattern",
            valid: "cpov.isInt(val) && val >= 0 && val <= 5",
            err:   "renderPattern must be an integer in the range (0 - 5)."
        }, {
            name:  "samplingMethod",
            valid: "cpov.isInt(val) && val >= 1 && val <= 2",
            err:   "samplingMethod must be an integer in the range (1 - 2)."
        }, {
            name:  "splitUnions",
            valid: "cpov.isBoolean(val)",
            err:   "splitUnions must be a boolean."
        }, {
            name:  "startColumn",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startColumn must be an integer greater than or equal to zero."
        }, {
            name:  "startRow",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startRow must be an integer greater than or equal to zero."
        }, {
            name:  "statisticConsole",
            valid: "cpov.isBoolean(val)",
            err:   "statisticConsole must be a boolean."
        }, {
            name:  "statisticFile",
            valid: "cpov.isBoolean || cpov.isNonEmptyString(val)",
            err:   "statisticFile must be a boolean or a non-empty string."
        }, {
            name:  "testAbort",
            valid: "cpov.isBoolean(val)",
            err:   "testAbort must be a boolean."
        }, {
            name:  "testAbortCount",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "testAbortCount must be an integer greater than or equal to one."
        }, {
            name:  "userAbortCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "userAbortCommand must be a non-empty string."
        }, {
            name:  "userAbortReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "userAbortReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "verbose",
            valid: "cpov.isBoolean(val)",
            err:   "verbose must be a boolean."
        }, {
            name:  "videoMode",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "videoMode must be a single character."
        }, {
            name:  "warningConsole",
            valid: "cpov.isBoolean(val)",
            err:   "warningConsole must be a boolean."
        }, {
            name:  "warningFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "warningFile must be a boolean or a non-empty string."
        }, {
            name:  "warningLevel",
            valid: "cpov.isInt(val) && (val == 0 || val == 5 || val == 10)",
            err:   "warningLevel must be one of 0, 5, or 10."
        }, {
            name:  "width",
            valid: "cpov.isInt(val) && val > 0",
            err:   "width must be an integer greater than zero."
        }, {
            name:  "workThreads",
            valid: "cpov.isInt(val) && val >= 1 && val <= 512",
            err:   "workThreads must be an integer in the range (1 - 512)."
        }
    ]
};
