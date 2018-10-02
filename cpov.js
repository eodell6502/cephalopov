//==============================================================================
// The cpov object contains all of the data structures and generic methods in
// CephaloPOV that do not appear in other specialized classes.
//==============================================================================

var cpov = {

    //--------------------------------------------------------------------------
    // Internal global state.
    //--------------------------------------------------------------------------

    quietMode: false,
    verbosity: 1,
    debug:     true,

    //--------------------------------------------------------------------------
    // Module wrappers.
    //--------------------------------------------------------------------------

    fs:      require("fs"),
    chalk:   require("chalk"),
    process: require("process"),

    //--------------------------------------------------------------------------
    // Legal dither types mapped to textual descriptions.
    //--------------------------------------------------------------------------

    ditherTypes: {
        "B2": "Bayer pattern 2x2",
        "B3": "Bayer pattern 3x3",
        "B4": "Bayer pattern 4x4",
        "D1": "Simple error diffusion 1D",
        "D2": "Simple error diffusion 2D",
        "FS": "Floyd-Steinberg error diffusion"
    },

    //--------------------------------------------------------------------------
    // Definition of globalSettings parameter validations and error messages.
    //--------------------------------------------------------------------------

    gsDef: {
        mutable: [
            {
                name:  "adcBailout",
                valid: "cpov.isFloat(val) && val >= 0",
                err:   "adcBailout must be a float greater than or equal to zero."
            }, {
                name:  "ambientLight",
                valid: "cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB')",
                err:   "ambientLight must be a VectorRGB or VectorSRGB."
            }, {
                name:  "assumedGamma",
                valid: "cpov.isFloat(val)",
                err:   "assumedGamma must be a float."
            }, {
                name:  "charset",
                valid: "cpov.isInArray(val, ['ascii', 'utf8', 'sys'])",
                err:   "charset must be one of 'ascii', 'utf8', or 'sys'."
            }, {
                name:  "iridWavelength",
                valid: "cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB')",
                err:   "iridWavelength must be a VectorRGB or VectorSRGB"
            }, {
                name:  "maxIntersections",
                valid: "cpov.isInt(val) && val >= 0",
                err:   "maxIntersections must be an integer greater than or equal to zero."
            }, {
                name:  "maxTraceLevel",
                valid: "cpov.isInt(val) && val >= 0",
                err:   "maxTraceLevel must be an integer greater than or equal to zero."
            }, {
                name:  "mmPerUnit",
                valid: "cpov.isFloat(val) && val >= 0",
                err:   "mmPerUnit must be a float greater than or equal to zero."
            }, {
                name:  "noiseGenerator",
                valid: "cpov.isInt(val) && cpov.inArray(val, [1, 2, 3])",
                err:   "noiseGenerator must be an integer and one of 1, 2, or 3."
            }, {
                name:  "numberOfWaves",
                valid: "cpov.isInt(val) && val >= 0",
                err:   "numberOfWaves must be an integer greater than or equal to zero."
            }, {
                name:  "photon",
                valid: "cpov.isBoolean(val)",
                err:   "photon must be a boolean."
            }, {
                name:  "photonAdcBailout",
                valid: "cpov.isFloat(val) && val >= 0",
                err:   "photonAdcBailout must be a float greater than or equal to zero."
            }, {
                name:  "photonAutostop",
                valid: "cpov.isFloat(val) && cpov.within(val, 0, 1)",
                err:   "photonAutostop must be a float within the unit interval (0.0 - 1.0)"
            }, {
                name:  "photonCount",                                                                          // TODO: cannot be used with photonSpacing
                valid: "cpov.isInt(val) && val >= 0",
                err:   "photonCount must be an integer greater than or equal to zero"
            }, {
                name:  "photonExpandThresholds",
                valid: "Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])",
                err:   "photonExpandThresholds must be an array consisting of a float and and integer."
            }, {
                name:  "photonGather",
                valid: "cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]",
                err:   "photonGather must be an array of two integers greater than zero in ascending order."
            }, {
                name:  "photonJitter",
                valid: "cpov.isFloat(val)",
                err:   "photonJitter must be a float."
            }, {
                name:  "photonLoadFile",
                valid: "cpov.isNonEmptyString(val)",
                err:   "photonLoadFile must be a non-empty string."
            }, {
                name:  "photonMaxTraceLevel",
                valid: "cpov.isInt(val) && val >= 0",
                err:   "photonMaxTraceLevel must be an integer greater than or equal to zero."
            }, {
                name:  "photonMedia",
                valid: "cpov.isArrayOfFloats(val, 2, 2)",
                err:   "photonMedia must be an array of two floats."
            }, {
                name:  "photonRadius", //            type: "@float[4]",              test: null            },
                valid: "cpov.isArrayOfFloats(val, 4, 4)",
                err:   "photonRadius must be an array of four floats."
            }, {
                name:  "photonSaveFile", //          type: "string",                 test: "nonempty"      },
                valid: "cpov.isNonEmptyString(val)",
                err:   "photonSaveFile must be a non-empty string."
            }, {
                name:  "photonSpacing",                                                                       // TODO: cannot be used with photonCount
                valid: "cpov.isFloat(val) && val > 0",
                err:   "photonSpacing must be a float greater than zero."
            }, {
                name:  "radAdcBailout",
                valid: "cpov.isFloat(val)",
                err:   "radAdcBailout must be a float."
            }, {
                name:  "radAlwaysSample",
                valid: "cpov.isBoolean(val)",
                err:   "radAlwaysSample must be a boolean."
            }, {
                name:  "radBrightness",
                valid: "cpov.isFloat(val)",
                err:   "radBrightness must be a float."
            }, {
                name:  "radCount",
                valid: "cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)",
                err:   "radCount must be an array of one or two integers, both of which must be greater than or equal to one."
            }, {
                name:  "radErrorBound",
                valid: "cpov.isFloat(val)",
                err:   "radErrorBound must be a float."
            }, {
                name:  "radGrayThreshold",
                valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
                err:   "radGrayThreshold must be a float in the unit interval (0.0 - 1.0)."
            }, {
                name:  "radiosity",
                valid: "cpov.isBoolean(val)",
                err:   "radiosity must be a boolean."
            }, {
                name:  "radLowErrorFactor",
                valid: "cpov.isFloat(val)",
                err:   "radLowErrorFactor must be a float."
            }, {
                name:  "radMaximumReuse",
                valid: "cpov.isFloat(val)",
                err:   "radMaximumReuse must be a float."
            }, {
                name:  "radMaxSample",
                valid: "cpov.isFloat(val)",
                err:   "radMaxSample must be a float."
            }, {
                name:  "radMinimumReuse",
                valid: "cpov.isFloat(val)",
                err:   "radMinimumReuse must be a float."
            }, {
                name:  "radNearestCount",
                valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
                err:   "radNearestCount must be an integer in the range 1-20."
            }, {
                name:  "radNormal",
                valid: "cpov.isBoolean(val)",
                err:   "radNormal must be a boolean."
            }, {
                name:  "radPretraceEnd",
                valid: "cpov.isFloat(val) && cpov.isWithin(0, 1)",
                err:   "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)"
            }, {
                name:  "radPretraceStart",
                valid: "cpov.isFloat(val) && cpov.isWithin(0, 1)",
                err:   "radPretraceStart must be a float in the unit interval (0.0 - 1.0)"
            }, {
                name:  "radRecursionLimit",
                valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20).",
                err:   "radRecursionLimit must be an integer in the range 1-20."
            }, {
                name:  "radSubsurface",
                valid: "cpov.isBoolean(val)",
                err:   "radSubsurface must be a boolean."
            }, {
                name:  "subRadiosity",
                valid: "cpov.isBoolean(val)",
                err:   "subRadiosity must be a boolean"
            }, {
                name:  "subSamples",
                valid: "cpov.isArrayOfInts(val, 2, 2)",
                err:   "subSamples must be an array of two integers."
            }, {
                name:  "subsurface",
                valid: "cpov.isBoolean(val)",
                err:   "subsurface must be a boolean."
            }
        ]
    },

    //--------------------------------------------------------------------------
    // Definition of imageOptions parameter validations and error messages.
    //--------------------------------------------------------------------------

    ioDef: {
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
                valid: "cpov.isInt(val) && cpov.isWithin(5, 16)",
                err:   "bitsPerColor must be an integer in the range 5-16."
            }, {
                name:  "bounding",
                valid: "cpov.isBoolean(val)",
                err:   "bounding must be a boolean."
            }, {
                name:  "boundingMethod",
                valid: "cpov.isInt(val) && cpov.isWithin(1, 2)",
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
                err:   "postFrameReturn must be one of " + cpov.keysToList(cpov.returnActions) + "."
            }, {
                name:  "postSceneCommand",
                valid: "cpov.isNonEmptyString(val)",
                err:   "postSceneCommand must be a non-empty string."
            }, {
                name:  "postSceneReturn",
                valid: "cpov.isKey(val, cpov.returnActions)",
                err:   "postSceneReturn must be one of " + cpov.keysToList(cpov.returnActions) + "."
            }, {
                name:  "preFrameCommand",
                valid: "cpov.isNonEmptyString(val)",
                err:   "preFrameCommand must be a non-empty string."
            }, {
                name:  "preFrameReturn",
                valid: "cpov.isKey(val, cpov.returnActions)",
                err:   "preFrameReturn must be one of " + cpov.keysToList(cpov.returnActions) + "."
            }, {
                name:  "preSceneCommand",
                valid: "cpov.isNonEmptyString(val)",
                err:   "preSceneCommand must be a non-empty string."
            }, {
                name:  "preSceneReturn",
                valid: "cpov.isKey(val, cpov.returnActions)",
                err:   "preSceneReturn must be one of " + cpov.keysToList(cpov.returnActions) + "."
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
                valid: "cpov.isBoolean(val) && cpov.isNonEmptyString(val)",
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
                valid: "cpov.isInt(val) && val >= 1 && val <= 512.",
                err:   "workThreads must be an integer in the range (1 - 512)."
            }
        ]
    },

    //--------------------------------------------------------------------------
    // Defines the types and validity tests for properties which are common to
    // all primitive objects.
    //--------------------------------------------------------------------------

    objCommon: {
        mutable: [
            {
                name:  "active",
                valid: "cpov.isBoolean(val)",
                err:   "active must be a boolean."
            }, {
                name:  "baseTransform",
                valid: "cpov.isClass(val, 'Matrix')",
                err:   "baseTransform must be a Matrix."
            }, {
                name:  "boundedBy",
                valid: "cpov.inheritsFrom('Primitive') ",  // TODO: limit to actual allowable Primitives.
                err:   "boundedBy must be a Primitive."
            }, {
                name:  "children",
                valid: "cpov.isArrayOfSubclass(val, 'Primitive')",
                err:   "children must be an array of Primitives."
            }, {
                name:  "clippedBy",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "clippedBy"
            }, {
                name:  "doubleIlluminate",
                valid: "cpov.isBoolean(val)",
                err:   "doubleIlluminate must be a boolean."
            }, {
                name:  "finish",
                valid: "cpov.isClass(val, 'Finish')",
                err:   "finish must be a Finish."
            }, {
                name:  "frameBegin",
                valid: "typeof val == 'function'",
                err:   "frameBegin must be a JavaScript function."
            }, {
                name:  "frameEnd",
                valid: "typeof val == 'function'",
                err:   "frameEnd must be a JavaScript function."
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean."
            }, {
                name:  "hollow",
                valid: "cpov.isBoolean(val)",
                err:   "hollow must be a boolean."
            }, {
                name:  "id",
                valid: "cpov.isNonEmptyString(val)",
                err:   "id must be a non-empty string."
            }, {
                name:  "interior",
                valid: "cpov.isClass(val, 'Interior')",
                err:   "interior must be an Interior."
            }, {
                name:  "inverse",
                valid: "cpov.isBoolean(val)",
                err:   "inverse must be a boolean."
            }, {
                name:  "material",
                valid: "cpov.isClass(val, 'Material')",
                err:   "material must be a Material."
            }, {
                name:  "noImage",
                valid: "cpov.isBoolean(val)",
                err:   "noImage must be a boolean."
            }, {
                name:  "noRadiosity",
                valid: "cpov.isBoolean(val)",
                err:   "noRadiosity must be a boolean."
            }, {
                name:  "noReflection",
                valid: "cpov.isBoolean(val)",
                err:   "noReflection must be a boolean."
            }, {
                name:  "normal",
                valid: "cpov.isClass(val, 'VectorXYZ')",
                err:   "normal must be a VectorXYZ."
            }, {
                name:  "noShadow",
                valid: "cpov.isBoolean(val)",
                err:   "noShadow must be a boolean."
            }, {
                name:  "parent",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "parent must be a Primitive."
            }, {
                name:  "photons", //          type: "Photons",    test: null }, TODO FIXME
                valid: "",
                err:   "photons"
            }, {
                name:  "radiosity", //        type: "Radiosity",  test: null }, TODO FIXME
                valid: "",
                err:   "radiosity"
            }, {
                name:  "serial",
                valid: "cpov.isInt(val)",
                err:   "serial must be an integer."
            }, {
                name:  "texture",
                valid: "cpov.isClass(val, 'Texture')",
                err:   "texture must be a Texture."
            }, {
                name:  "transform",
                valid: "cpov.isClass(val, 'Matrix')",
                err:   "transform must be a Matrix."
            }
        ]
    },

    //------------------------------------------------------------------------------
    // Definitions of parameters for primitive geometric objects.
    //
    // TODO: "mesh2" needs to be added once I understand it better.
    //------------------------------------------------------------------------------

    objDef: {

        // TODO: need way to specify special methods, e.g., editing the components array

        blob: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "components",
                    req:   true,
                    valid: "cpov.isClass(val, ['Sphere', 'Cylinder']) && components.length",
                    err:   "components must be an array of Spheres and/or Cylinders."
                }, {
                    name:  "threshold",
                    valid: "cpov.isFloat(val)",
                    err:   "threshold"
                }, {
                    name:  "sturm",
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }, {
                    name:  "hierarchy",
                    valid: "cpov.isBoolean(val)",
                    err:   "hierarchy must be a boolean."
                }
            ],
        },

        box: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "corner1",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "corner1 must be a VectorXYZ."
                }, {
                    name:  "corner2",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "corner2"
                }
            ],

        },

        //--------------------------------------------------------------------------
        // The camera type isn't really a primitive in SDL, but we're going to
        // treat it as one for most purposes and fake it in CSG objects.
        //--------------------------------------------------------------------------

        camera: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "type", // type: "string(perspective|orthographic|fisheye|ultra_wide_angle|omnimax|panoramic|spherical|cylinder|mesh_camera)",
                    req:   true,
                    valid: "cpov.isInArray(val, ['perspective', 'orthographic', 'fisheye', 'ultra_wide_angle', 'omnimax', 'panoramic', 'spherical', 'cylinder', 'mesh_camera'])",
                    err:   "type must be one of perspective, orthographic, fisheye, ultra_wide_angle, omnimax, panoramic, spherical, cylinder, or mesh_camera."
                }, {
                    name:  "angle", //        type: "FIXME" }, // TODO
                    valid: "",
                    err:   "angle"
                }, {
                    name:  "apertureSize",
                    valid: "cpov.isFloat(val)",
                    err:   "apertureSize must be a float."
                }, {
                    name:  "blurSamples",
                    valid: "cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0",
                    err:   "blurSamples must be an array of two floats greater than or equal to zero."
                }, {
                    name:  "bokeh",
                    valid: "cpov.isClass(val, 'VectorRGB') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0",
                    err:   "bokeh must be a VectorRGB in the range <0, 0, 0> to <1, 1, 0>."
                }, {
                    name:  "confidence",
                    valid: "cpov.isFloat(val)",
                    err:   "confidence must be a float."
                }, {
                    name:  "cylinderType",
                    valid: "cpov.isInt(val) && val > 0 && val < 5",
                    err:   "cylinderType must be an integer in the range (1 - 4)."
                }, {
                    name:  "direction",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "direction must be a VectorXYZ."
                }, {
                    name:  "focalPoint",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "focalPoint must be a VectorXYZ."
                }, {
                    name:  "location",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "location must be a VectorXYZ."
                }, {
                    name:  "lookAt",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "lookAt must be a VectorXYZ."
                }, {
                    name:  "right",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "right must be a VectorXYZ."
                }, {
                    name:  "sky",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "sky must be a VectorXYZ."
                }, {
                    name:  "up",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "up must be a VectorXYZ."
                }, {
                    name:  "variance",
                    valid: "cpov.isFloat(val)",
                    err:   "variance must be a float."
                }, {
                    name:  "vertAngle",
                    valid: "cpov.isInt(val)",
                    err:   "vertAngle must be an integer."
                }
            ]
        },

        cone: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "basePoint",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "basePoint must be a VectorXYZ."
                }, {
                    name:  "baseRadius",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "baseRadius must be a float."
                }, {
                    name:  "capPoint",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "capPoint must be a VectorXYZ."
                }, {
                    name:  "capRadius", //  type: "float",
                    req:   true,
                    valid: "",
                    err:   "capRadius"
                }, {
                    name:  "open", // type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "open must be a boolean."
                }
            ],
        },

        cylinder: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "basePoint",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "basePoint must be a VectorXYZ."
                }, {
                    name:  "capPoint",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "capPoint must be a VectorXYZ."
                }, {
                    name:  "radius", //    type: "float",
                    req:   true,
                    valid: "",
                    err:   "radius"
                }, {
                    name:  "open", //     type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "open must be a boolean."
                }, {
                    name:  "strength", // type: "float" },    // only used when the cylinder is a blob component
                    valid: "",
                    err:   "strength"
                }
            ],
        },

        heightField: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "source", // type: "mixed(string|SDLFunction)",
                    req:   true,
                    valid: "",
                    err:   "source"
                }, {
                    name:  "hfType", //     type: "string(exr|gif|hdr|iff|jpeg|pgm|png|pot|ppm|sys|tga|tiff)" },      // only used source is image instead of function
                    valid: "",
                    err:   "hfType"
                }, {
                    name:  "smooth", //     type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "smooth must be a boolean."
                }, {
                    name:  "waterLevel", // type: "float"   },
                    valid: "",
                    err:   "waterLevel"
                }, {
                    name:  "hierarchy", //  type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "hierarchy must be a boolean."
                }, {
                    name:  "gamma", //      type: "float"   },
                    valid: "",
                    err:   "gamma"
                }, {
                    name:  "premult", //    type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "premult must be a boolean."
                }
            ],
        },

        isoSurface: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "source", // type: "SDLFunction",
                    req:   true,
                    valid: "",
                    err:   "source"
                }, {
                    name:  "containedBy", // type: "mixed(Sphere|Box)" },
                    valid: "",
                    err:   "containedBy"
                }, {
                    name:  "threshold", //   type: "float" },
                    valid: "",
                    err:   "threshold"
                }, {
                    name:  "accuracy", //    type: "float" },
                    valid: "",
                    err:   "accuracy"
                }, {
                    name:  "maxGradient", // type: "float" },
                    valid: "",
                    err:   "maxGradient"
                }, {
                    name:  "evaluate", //    type: "@float[3]" },
                    valid: "",
                    err:   "evaluate"
                }, {
                    name:  "open", //        type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "open must be a boolean."
                }, {
                    name:  "maxTrace", //    type: "mixed(int|'all_intersections')" },
                    valid: "",
                    err:   "maxTrace"
                }
            ],
        },

        juliaFractal: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "type", // type: "string(quaternion:sqr|quaternion:cube|hypercomplex:sqr|hypercomplex:cube|hypercomplex:exp|hypercomplex:reciprocal|hypercomplex:sin|hypercomplex:asin|hypercomplex:sinh|hypercomplex:cos|hypercomplex:acos|hypercomplex:cosh|hypercomplex:acosh|hypercomplex:tan|hypercomplex:atan|hypercomplex:tanh|hypercomplex:atanh|hypercomplex:ln|hypercomplex:pwr)",
                    req:   true,
                    valid: "",
                    err:   "type"
                }, {
                    name:  "power", //     type: "VectorXY" },  // needed for hypercomplex:pwr -- come up with default
                    valid: "cpov.isClass(val, 'VectorXY')",
                    err:   "power must be a VectorXY."
                }, {
                    name:  "maxIter", //   type: "int" },
                    valid: "",
                    err:   "maxIter"
                }, {
                    name:  "precision", // type: "int" },
                    valid: "",
                    err:   "precision"
                }, {
                    name:  "slice",
                    valid: "cpov.isClass(val, 'VectorXYZW')",
                    err:   "slice must be a VectorXYZW."
                }, {
                    name:  "distance", //  type: "float" },
                    valid: "",
                    err:   "distance"
                }
            ],
        },

        lathe: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "type", //   type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline)",
                    req:   true,
                    valid: "",
                    err:   "type"
                }, {
                    name:  "points", // type: "@VectorXY[2-]",
                    req:   true,
                    valid: "",
                    err:   "points"
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        lightSource: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "location",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "location must be a VectorXYZ."
                }, {
                    name:  "color", //    type: "VectorRGB",
                    req:   true,
                    valid: "",
                    err:   "color"
                }, {
                    name:  "adaptive", //         type: "float",    test: ">=0" },
                    valid: "",
                    err:   "adaptive"
                }, {
                    name:  "areaIllumination", // type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "areaIllumination must be a boolean."
                }, {
                    name:  "areaLight", //        type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "areaLight must be a boolean."
                }, {
                    name:  "axis1",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "axis1 must be a VectorXYZ."
                }, {
                    name:  "axis2",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "axis2 must be a VectorXYZ."
                }, {
                    name:  "circular", //         type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "circular must be a boolean."
                }, {
                    name:  "fadeDistance", //     type: "float",    test: ">0" },
                    valid: "",
                    err:   "fadeDistance"
                }, {
                    name:  "fadePower", //        type: "float"     },
                    valid: "",
                    err:   "fadePower"
                }, {
                    name:  "falloff", //          type: "float",    test: "a<90" },
                    valid: "",
                    err:   "falloff"
                }, {
                    name:  "jitter", //           type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "jitter must be a boolean."
                }, {
                    name:  "looksLike", //        type: "Primitive" },
                    valid: "",
                    err:   "looksLike"
                }, {
                    name:  "mediaAttenuation", // type: "boolean"   }, // TODO
                    valid: "cpov.isBoolean(val)",
                    err:   "mediaAttenuation must be a boolean."
                }, {
                    name:  "mediaInteraction", // type: "boolean"   }, // TODO
                    valid: "cpov.isBoolean(val)",
                    err:   "mediaInteraction must be a boolean."
                }, {
                    name:  "orient", //           type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "orient must be a boolean."
                }, {
                    name:  "parallel", //         type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "parallel must be a boolean."
                }, {
                    name:  "pointAt",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "pointAt must be a VectorXYZ."
                }, {
                    name:  "projectedThrough", // type: "Primitive" },
                    valid: "",
                    err:   "projectedThrough"
                }, {
                    name:  "radius", //           type: "float",    test: "a<90" },
                    valid: "",
                    err:   "radius"
                }, {
                    name:  "shadowless", //       type: "boolean"   },
                    valid: "cpov.isBoolean(val)",
                    err:   "shadowless must be a boolean."
                }, {
                    name:  "size1", //            type: "float",    test: ">0" },
                    valid: "",
                    err:   "size1"
                }, {
                    name:  "size2", //            type: "float",    test: ">0" },
                    valid: "",
                    err:   "size2"
                }, {
                    name:  "tightness", //        type: "float",    test: "0-100" },
                    valid: "",
                    err:   "tightness"
                }, {
                    name:  "type", //             type: "string(spotlight|cylinder)" },
                    valid: "",
                    err:   "type"
                }
            ],
        },

        ovus: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
            {
                name:  "bottomRadius", // type: "float",
                    req:   true,
                valid: "",
                err:   "bottomRadius"
            }, {
                name:  "topRadius", //    type: "float",
                    req:   true,
                valid: "",
                err:   "topRadius"
            }
            ],

        },

        parametric: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "funcX", //  type: "SDLFunction",
                    req:   true,
                    valid: "",
                    err:   "funcX"
                }, {
                    name:  "funcY", //  type: "SDLFunction",
                    req:   true,
                    valid: "",
                    err:   "funcY"
                }, {
                    name:  "funcZ", //  type: "SDLFunction",
                    req:   true,
                    valid: "",
                    err:   "funcZ"
                }, {
                    name:  "uv1",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorUV')",
                    err:   "uv1 must be a VectorUV."
                }, {
                    name:  "uv2",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorUV')",
                    err:   "uv2 must be a VectorUV."
                }, {
                    name:  "containedBy", //     type: "mixed(Sphere|Box)" },
                    valid: "",
                    err:   "containedBy"
                }, {
                    name:  "maxGradient", //     type: "float" },
                    valid: "",
                    err:   "maxGradient"
                }, {
                    name:  "accuracy", //        type: "float" },
                    valid: "",
                    err:   "accuracy"
                }, {
                    name:  "precomputeDepth", // type: "int" },
                    valid: "",
                    err:   "precomputeDepth"
                }, {
                    name:  "precomputeX", //     type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "precomputeX must be a boolean."
                }, {
                    name:  "precomputeY", //     type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "precomputeY must be a boolean."
                }, {
                    name:  "precomputeZ", //     type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "precomputeZ must be a boolean."
                }
            ],
        },

        prism: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "type", //    type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline|linear_sweep|conic_sweep)",
                    req:   true,
                    valid: "",
                    err:   "type"
                }, {
                    name:  "height1", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "height1"
                }, {
                    name:  "height2", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "height2"
                }, {
                    name:  "points", //  type: "@VectorXY",
                    req:   true,
                    valid: "",
                    err:   "points"
                }, {
                    name:  "open", //  type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "open must be a boolean."
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        sphere: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "center",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "center must be a VectorXYZ."
                }, {
                    name:  "radius", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "radius"
                }, {
                    name:  "strength", // type: "float" },    // only used when used as a blob component
                    valid: "",
                    err:   "strength"
                }
            ],
        },

        sphereSweep: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "type", // type: "string(linear_spline|b_spline|cubic_spline)",
                    req:   true,
                    valid: "",
                    err:   "type"
                }, {
                    name:  "spheres", // type: "@Sphere[2-]",
                    req:   true,
                    valid: "",
                    err:   "spheres"
                }, {
                    name:  "tolerance", // type: "float" }
                    valid: "",
                    err:   "tolerance"
                }
            ],
        },

        superellipsoid: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "vector",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXY')",
                    err:   "vector must be a VectorXY."
                }
            ],

        },

        sor: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "points", // type: "@VectorXY[2-]",
                    req:   true,
                    valid: "",
                    err:   "points"
                }, {
                    name:  "open", //  type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "open must be a boolean."
                }, {
                    name:  "sturm", // type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        text: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "font", //        type: "string",
                    req:   true,
                    valid: "",
                    err:   "font"
                }, {
                    name:  "displayText", // type: "string",
                    req:   true,
                    valid: "",
                    err:   "displayText"
                }, {
                    name:  "thickness", //   type: "float",
                    req:   true,
                    valid: "",
                    err:   "thickness"
                }, {
                    name:  "offset", //      type: "float",
                    req:   true,
                    valid: "",
                    err:   "offset"
                }
            ],

        },

        torus: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "majorRadius", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "majorRadius"
                }, {
                    name:  "minorRadius", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "minorRadius"
                }, {
                    name:  "sturm", //       type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        bicubicPatch: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "type", //  type: "int(0|1)",
                    req:   true,
                    valid: "",
                    err:   "type"
                }, {
                    name:  "points", // type: "@VectorXYZ[16]",
                    req:   true,
                    valid: "",
                    err:   "points"
                }, {
                    name:  "uSteps", //   type: "int" },
                    valid: "",
                    err:   "uSteps"
                }, {
                    name:  "vSteps", //   type: "int" },
                    valid: "",
                    err:   "vSteps"
                }, {
                    name:  "flatness", // type: "float" },
                    valid: "",
                    err:   "flatness"
                }
            ],
        },

        disc: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "center",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "center must be a VectorXYZ."
                }, {
                    name:  "normal",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "normal must be a VectorXYZ."
                }, {
                    name:  "radius", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "radius"
                }, {
                    name:  "holeRadius", // type: "float" },
                    valid: "",
                    err:   "holeRadius"
                }
            ],
        },

        mesh: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "triangles", // type: "@Triangle[1-]",
                    req:   true,
                    valid: "",
                    err:   "triangles"
                }, {
                    name:  "insideVector",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "insideVector must be a VectorXYZ."
                }, {
                    name:  "hierarchy", //    type: "boolean" },
                    valid: "cpov.isBoolean(val)",
                    err:   "hierarchy must be a boolean."
                }
            ],
        },

    /*

    // Deferred pending further research

        mesh2: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [ ],

        },
    */

        polygon: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "points", // type: "@VectorXY[3-]",
                    req:   true,
                    valid: "",
                    err:   "points"
                }
            ],

        },

        triangle: {               // combines triangle and smooth_triangle
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "corner1",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "corner1 must be a VectorXYZ."
                }, {
                    name:  "corner2",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "corner2 must be a VectorXYZ."
                }, {
                    name:  "corner3",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "corner3 must be a VectorXYZ."
                }, {
                    name:  "smooth", //   type: "boolean" },    // if smooth and normal1...3 are defined, it's a smooth triangle
                    valid: "",
                    err:   "smooth"
                }, {
                    name:  "normal1",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "normal1 must be a VectorXYZ."
                }, {
                    name:  "normal2",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "normal2 must be a VectorXYZ."
                }, {
                    name:  "normal3",
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "normal3 must be a VectorXYZ."
                }, {
                    name:  "textures", // type: "@int" }
                    valid: "",
                    err:   "textures"
                }
            ],
        },

        plane: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "normal",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZ')",
                    err:   "normal must be a VectorXYZ."
                }, {
                    name:  "distance", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "distance"
                }
            ],

        },

        poly: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "coefficients",
                    req:   true,
                    valid: "cpov.isArrayOfFloats(val, 2, 35)",
                    err:   "coefficients must be an array of 2 to 35 floats."
                }, {
                    name:  "sturm",
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        cubic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "coefficients",
                    req:   true,
                    valid: "cpov.isArrayOfFloats(val, 20, 20)",
                    err:   "coefficients must be an array of 20 floats."
                }, {
                    name:  "sturm",
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        quartic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "coefficients",
                    req:   true,
                    valid: "cpov.isArrayOfFloats(val, 20, 20)",
                    err:   "coefficients must be an array of 20 floats."
                }, {
                    name:  "sturm",
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        polynomial: {                                             // this will require better understanding of the
            fixed: { finite: false, solid: true, csg: false },    // underlying maths than I currently have to validate
            mutable: [
                {
                    name:  "order",
                    req:   true,
                    valid: "cpov.isInt(val)",
                    err:   "order must be an integer."
                }, {
                    name:  "coefficients",
                    req:   true,
                    valid: "cpov.isClass(val, 'VectorXYZW')",
                    err:   "coefficients must be a VectorXYZW."
                }, {
                    name:  "sturm",
                    valid: "cpov.isBoolean(val)",
                    err:   "sturm must be a boolean."
                }
            ],
        },

        quadric: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "a",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "a must be a float."
                }, {
                    name:  "b",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "b must be a float."
                }, {
                    name:  "c",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "c must be a float."
                }, {
                    name:  "d",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "d must be a float."
                }, {
                    name:  "e",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "e must be a float."
                }, {
                    name:  "f",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "f must be a float."
                }, {
                    name:  "g",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "g must be a float."
                }, {
                    name:  "h",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "h must be a float."
                }, {
                    name:  "i",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "i must be a float."
                }, {
                    name:  "j",
                    req:   true,
                    valid: "cpov.isFloat(val)",
                    err:   "j must be a float."
                }
            ],

        },

        union: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects",
                    req:   true,
                    valid: "cpov.isArrayOfClass(val, 'Primitive')",
                    err:   "objects must be an array of Primitives."
                }, {
                    name:  "splitUnion",
                    valid: "cpov.isBoolean(val)",
                    err:   "splitUnion must be a boolean."
                }
            ]
        },

        intersection: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects",
                    valid: "cpov.isArrayOfClass(val, 'Primitive')",
                    err:   "objects must be an array of Primitives."
                }
            ],
        },

        difference: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "positiveObject",
                    req:   true,
                    valid: "cpov.isClass(val, 'Primitive')",
                    err:   "positiveObject must be a Primitive."
                }, {
                    name:  "negativeObjects",
                    valid: "cpov.isArrayOfClass(val, 'Primitive')",
                    err:   "negativeObjects must be an array of Primitives."
                }
            ],
        },

        merge: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects",
                    valid: "cpov.isArrayOfClass(val, 'Primitive')",
                    err:   "objects must be an array of Primitives."
                }
            ],
        },

    },

    //------------------------------------------------------------------------------
    // All (graphics) output file formats, mapped to textual descriptions.
    //------------------------------------------------------------------------------

    outputFileTypes: {
        "B": "BMP",
        "C": "TGA, RLE compression",
        "E": "OpenEXR HDR",
        "H": "Radiance HDR",
        "J": "JPEG",
        "N": "PNG",
        "P": "PPM",
        "S": "System default",
        "T": "TGA, uncompressed"
    },

    //------------------------------------------------------------------------------
    // List of geometric primitive type names.
    //------------------------------------------------------------------------------

    primitives: [ "bicubicPatch", "blob", "box", "camera", "cone", "cubic",
        "cylinder", "difference", "disc", "heightField", "intersection",
        "isoSurface", "juliaFractal", "lathe", "lightSource", "merge", "mesh", "ovus",
        "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
        "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
        "torus", "triangle", "union" ],

    //------------------------------------------------------------------------------
    // All supported return actions mapped to textual descriptions.
    //------------------------------------------------------------------------------

    returnActions: {
        "I":  "ignore code",
        "S":  "skip one step",
        "A":  "all steps skipped",
        "Q":  "quit POV-Ray immediately",
        "U":  "generate a user abort in POV-Ray",
        "F":  "generate a fatal error in POV-Ray",
        "-I": "[invert] ignore code",
        "-S": "[invert] skip one step",
        "-A": "[invert] all steps skipped",
        "-Q": "[invert] quit POV-Ray immediately",
        "-U": "[invert] generate a user abort in POV-Ray",
        "-F": "[invert] generate a fatal error in POV-Ray",
        "!I": "[invert] ignore code",
        "!S": "[invert] skip one step",
        "!A": "[invert] all steps skipped",
        "!Q": "[invert] quit POV-Ray immediately",
        "!U": "[invert] generate a user abort in POV-Ray",
        "!F": "[invert] generate a fatal error in POV-Ray",
    },

    //------------------------------------------------------------------------------
    // List of SDL keywords.
    //------------------------------------------------------------------------------

    sdlKeywords: [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
        "acos", "acosh", "adaptive", "adc_bailout", "agate", "agate_turb", "albedo",
        "all", "all_intersections", "alpha", "altitude", "always_sample", "ambient",
        "ambient_light", "angle", "aoi", "aperture", "append", "arc_angle",
        "area_illumination", "area_light", "array", "asc", "ascii", "asin", "asinh",
        "assumed_gamma", "atan", "atan2", "atand", "atanh", "autostop", "average",
        "b_spline", "background", "bezier_spline", "bicubic_patch", "bitwise_and",
        "bitwise_or", "bitwise_xor", "black_hole", "blob", "blue", "blur_samples",
        "bokeh", "bounded_by", "box", "boxed", "bozo", "break", "brick",
        "brick_size", "brightness", "brilliance", "bump_map", "bump_size", "bumps",
        "camera", "case", "caustics", "ceil", "cells", "charset", "checker", "chr",
        "circular", "clipped_by", "clock", "clock_delta", "clock_on", "collect",
        "color", "color_map", "colour", "colour_map", "component", "composite",
        "concat", "cone", "confidence", "conic_sweep", "conserve_energy",
        "contained_by", "control0", "control1", "coords", "cos", "cosh", "count",
        "crackle", "crand", "cube", "cubicwave", "cutaway_textures", "cylinder",
        "cylindrical", "datetime", "debug", "declare", "default", "defined",
        "degrees", "density", "density_file", "density_map", "dents", "deprecated",
        "df3", "difference", "diffuse", "dimension_size", "dimensions", "direction",
        "disc", "dispersion", "dispersion_samples", "dist_exp", "distance", "div",
        "double_illuminate", "eccentricity", "else", "elseif", "emission", "end",
        "error", "error_bound", "evaluate", "exp", "expand_thresholds", "exponent",
        "exterior", "extinction", "face_indices", "facets", "fade_color",
        "fade_colour", "fade_distance", "fade_power", "falloff", "falloff_angle",
        "false", "fclose", "file_exists", "filter", "final_clock", "final_frame",
        "finish", "fisheye", "flatness", "flip", "floor", "focal_point", "fog",
        "fog_alt", "fog_offset", "fog_type", "fopen", "for", "form", "frame_number",
        "frequency", "fresnel", "function", "gamma", "gather", "gif",
        "global_lights", "global_settings", "gradient", "granite", "gray",
        "gray_threshold", "green", "height_field", "hexagon", "hf_gray_16",
        "hierarchy", "hypercomplex", "hollow", "if", "ifdef", "iff", "ifndef",
        "image_height", "image_map", "image_pattern", "image_width", "importance",
        "include", "initial_clock", "initial_frame", "input_file_name", "inside",
        "inside_vector", "int", "interior", "interior_texture", "internal",
        "interpolate", "intersection", "intervals", "inverse", "ior", "irid",
        "irid_wavelength", "isosurface", "jitter", "jpeg", "julia", "julia_fractal",
        "lambda", "lathe", "leopard", "light_group", "light_source",
        "linear_spline", "linear_sweep", "ln", "load_file", "local", "location",
        "log", "look_at", "looks_like", "low_error_factor", "macro", "magnet",
        "major_radius", "mandel", "map_type", "marble", "material", "material_map",
        "matrix", "max", "maximum_reuse", "max_extent", "max_gradient",
        "max_intersections", "max_iteration", "max_sample", "max_trace",
        "max_trace_level", "media", "media_attenuation", "media_interaction",
        "merge", "mesh", "mesh2", "metallic", "method", "metric", "min",
        "min_extent", "minimum_reuse", "mm_per_unit", "mod", "mortar",
        "natural_spline", "nearest_count", "no", "no_bump_scale", "no_image",
        "no_radiosity", "no_reflection", "no_shadow", "noise_generator", "normal",
        "normal_indices", "normal_map", "normal_vectors", "now", "number_of_waves",
        "object", "octaves", "off", "offset", "omega", "omnimax", "on", "once",
        "onion", "open", "orient", "orientation", "orthographic", "ovus",
        "panoramic", "parallel", "parametric", "pass_through", "pattern",
        "pavement", "perspective", "pgm", "phase", "phong", "phong_size", "photons",
        "pi", "pigment", "pigment_map", "pigment_pattern", "planar", "plane", "png",
        "point_at", "poly", "polynomial", "poly_wave", "polygon", "pot", "pow",
        "ppm", "precision", "precompute", "premultiplied", "pretrace_end",
        "pretrace_start", "prism", "prod", "projected_through", "pwr",
        "quadratic_spline", "quadric", "quartic", "quaternion", "quick_color",
        "quick_colour", "quilted", "radial", "radians", "radiosity", "radius",
        "rainbow", "ramp_wave", "rand", "range", "ratio", "read", "reciprocal",
        "recursion_limit", "red", "reflection", "reflection_exponent", "refraction",
        "render", "repeat", "rgb", "rgbf", "rgbft", "rgbt", "right", "ripples",
        "rotate", "roughness", "samples", "save_file", "scale", "scallop_wave",
        "scattering", "seed", "select", "shadowless", "sin", "sine_wave", "sinh",
        "sint8", "sint16be", "sint16le", "sint32be", "sint32le", "size", "sky",
        "sky_sphere", "slice", "slope", "slope_map", "smooth", "smooth_triangle",
        "solid", "sor", "spacing", "specular", "sphere", "sphere_sweep",
        "spherical", "spiral1", "spiral2", "spline", "split_union", "spotlight",
        "spotted", "sqr", "sqrt", "square", "srgb", "srgbf", "srgbt", "srgbft",
        "statistics", "str", "strcmp", "strength", "strlen", "strlwr", "strupr",
        "sturm", "substr", "subsurface", "sum", "superellipsoid", "switch", "sys",
        "t", "tan", "tanh", "target", "text", "texture", "texture_list",
        "texture_map", "tga", "thickness", "threshold", "tiff", "tightness",
        "tile2", "tiles", "tiling", "tolerance", "toroidal", "torus", "trace",
        "transform", "translate", "translucency", "transmit", "triangle",
        "triangle_wave", "triangular", "true", "ttf", "turb_depth", "turbulence",
        "type", "u", "uint8", "uint16be", "uint16le", "u_steps", "ultra_wide_angle",
        "undef", "union", "up", "use_alpha", "use_color", "use_colour", "use_index",
        "utf8", "uv_indices", "uv_mapping", "uv_vectors", "v", "v_steps", "val",
        "variance", "vaxis_rotate", "vcross", "vdot", "version", "vertex_vectors",
        "vlength", "vnormalize", "vrotate", "vstr", "vturbulence", "warning",
        "warp", "water_level", "waves", "while", "width", "wood", "wrinkles",
        "write", "x", "y", "yes", "z" ],

};


//==============================================================================
// Returns a string consisting of stops copies of four space characters.
//==============================================================================

cpov.tab = function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//==============================================================================
// Prints an error message to console if permitted by the current verbosity
// level, and if the error is fatal, terminates the process.
//==============================================================================

cpov.error = function(level, message, location = "CEPHALOPOV") {

    switch(level) {
        case "fatal":
            if(!cpov.quietMode)
                console.log("[" + location + "]: " + message);
            cpov.process.exit(1);
            break;
        case "warn":
            if(!cpov.quietMode && cpov.verbosity >= 1)
                console.log("[" + location + "]: " + message);
            break;
        case "info":
            if(!cpov.quietMode && cpov.verbosity >= 2)
                console.log("[" + location + "]: " + message);
            break;
        case "debug":
            if(!cpov.quietMode && (cpov.verbosity >= 3 || cpov.debug))
                console.log("[" + location + "]: " + message);
            break;
    }

}


//==============================================================================
// Validation functions, mainly to be leveraged by generated classes.
//==============================================================================

cpov.isFloat = function(val) {
    return typeof val == "number" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfFloats = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number")
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isWithin = function(val, min, max) {
    return val >= min && val <= max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isBetween = function(val, min, max) {
    return val > min && val < max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInt = function(val) {
    return typeof val == "number" && val == Math.floor(val) ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfInts = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number" || val[i] != Math.floor(val[i]))
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isString = function(val) {
    return typeof val == "string" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNonEmptyString = function(val) {
    return typeof val == "string" && val.length ? true : false;
}

//------------------------------------------------------------------------------

cpov.isChar = function(val) {
    return typeof val == "string" && val.length == 1 ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInArray = function(val, array) {
    for(var i = 0; i < array.length; i++)
        if(array[i] === val)
            return true;
    return false;
}

//------------------------------------------------------------------------------

cpov.isKey = function(val, object) {
    return object[val] !== undefined ? true : false;
}

//------------------------------------------------------------------------------

cpov.isBoolean = function(val) {
    return typeof val == "boolean" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNull = function(val) {
    return val === null ? true : false;
}

//------------------------------------------------------------------------------

cpov.isClass = function(val, classname) {
    if(Array.isArray(classname)) {
        var okay = false;
        for(var c = 0; c < classname.length; c++) {
            if(Object.getPrototypeOf(val).constructor.name == classname[c]) {
                okay = true;
                break;
            }
        }
        return okay;
    }
    return Object.getPrototypeOf(val).constructor.name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfClass = function(val, classname) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            if(Object.getPrototypeOf(val).constructor.name != classname)
                return false;
        }
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------

cpov.inheritsFrom = function(val, classname) {
    return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfSubclass = function(val, classname) {
    if(!Array.isArray(val))
        return false;
    if(Array.isArray(classname)) {
        for(var i = 0; i < val.length) {
            var okay = false;
            for(var c = 0; c < classname.length; c++) {
                if(cpov.inheritsFrom(val, classname[i]) {
                    okay = true;
                    break;
                }
            }
            if(!okay) {
                return false;
            }
        }
    } else {
        for(var i = 0; i < val.length) {
            if(!cpov.inheritsFrom(val, classname)) {
                return false;
            }
        }
    }
    return true;
}

//==============================================================================

cpov.keysToTextList = function(obj) {
    var items = [ ];
    for(var k in obj)
        items.push(k);
    items[items.length - 1] = "or " + items[items.length - 1];
    return items.join(", ");
}


//==============================================================================
// Fly my pretties, fly! =======================================================
//==============================================================================

exports.cpov = cpov;
