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
                name:  "allConsole", //             type: "boolean",                   test: null },
                valid: "",
                err:   "allConsole"
            }, {
                name:  "allFile", //                type: "mixed(boolean|string)",     test: null },
                valid: "",
                err:   "allFile"
            }, {
                name:  "antialias", //              type: "boolean",                   test: null },
                valid: "",
                err:   "antialias"
            }, {
                name:  "antialiasDepth", //         type: "int",                       test: "1-9" },
                valid: "",
                err:   "antialiasDepth"
            }, {
                name:  "antialiasGamma", //         type: "float",                     test: null },
                valid: "",
                err:   "antialiasGamma"
            }, {
                name:  "antialiasThreshold", //     type: "float",                     test: ">=0" },
                valid: "",
                err:   "antialiasThreshold"
            }, {
                name:  "appendFile", //             type: "boolean",                   test: null },
                valid: "",
                err:   "appendFile"
            }, {
                name:  "bitsPerColor", //           type: "int",                       test: "5-16" },
                valid: "",
                err:   "bitsPerColor"
            }, {
                name:  "bounding", //               type: "boolean",                   test: null },
                valid: "",
                err:   "bounding"
            }, {
                name:  "boundingMethod", //         type: "int(1|2)",                  test: null },
                valid: "",
                err:   "boundingMethod"
            }, {
                name:  "boundingThreshold", //      type: "int",                       test: ">=0" },
                valid: "",
                err:   "boundingThreshold"
            }, {
                name:  "bspBaseAccessCost", //      type: "float",                     test: null },
                valid: "",
                err:   "bspBaseAccessCost"
            }, {
                name:  "bspChildAccessCost", //     type: "float",                     test: null },
                valid: "",
                err:   "bspChildAccessCost"
            }, {
                name:  "bspIsectCost", //           type: "float",                     test: null },
                valid: "",
                err:   "bspIsectCost"
            }, {
                name:  "bspMaxDepth", //            type: "int",                       test: ">0" },
                valid: "",
                err:   "bspMaxDepth"
            }, {
                name:  "bspMissChance", //          type: "float",                     test: null },
                valid: "",
                err:   "bspMissChance"
            }, {
                name:  "continueTrace", //          type: "boolean",                   test: null },
                valid: "",
                err:   "continueTrace"
            }, {
                name:  "createIni", //              type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "createIni"
            }, {
                name:  "debugConsole", //           type: "boolean",                   test: null },
                valid: "",
                err:   "debugConsole"
            }, {
                name:  "debugFile", //              type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "debugFile"
            }, {
                name:  "display", //                type: "boolean",                   test: null },
                valid: "",
                err:   "display"
            }, {
                name:  "displayGamma", //           type: "mixed(float|'sRGB')",       test: null },
                valid: "",
                err:   "displayGamma"
            }, {
                name:  "dither", //                 type: "boolean",                   test: null },
                valid: "",
                err:   "dither"
            }, {
                name:  "ditherMethod", //           type: "ditherType",                test: null },
                valid: "",
                err:   "ditherMethod"
            }, {
                name:  "endColumn", //              type: "int",                       test: "0-" },
                valid: "",
                err:   "endColumn"
            }, {
                name:  "endRow", //                 type: "int",                       test: "0-" },
                valid: "",
                err:   "endRow"
            }, {
                name:  "exePath", //                type: "string",                    test: "nonempty" },
                valid: "",
                err:   "exePath"
            }, {
                name:  "fatalConsole", //           type: "boolean",                   test: null },
                valid: "",
                err:   "fatalConsole"
            }, {
                name:  "fatalErrorCommand", //      type: "string",                    test: "nonempty" },
                valid: "",
                err:   "fatalErrorCommand"
            }, {
                name:  "fatalErrorReturn", //       type: "returnAction",              test: null },
                valid: "",
                err:   "fatalErrorReturn"
            }, {
                name:  "fatalFile", //              type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "fatalFile"
            }, {
                name:  "fileGamma", //              type: "mixed(float|'sRGB')",       test: null },
                valid: "",
                err:   "fileGamma"
            }, {
                name:  "height", //                 type: "int",                       test: ">0", default: 480 },
                valid: "",
                err:   "height"
            }, {
                name:  "highReproducibility", //    type: "boolean",                   test: null },
                valid: "",
                err:   "highReproducibility"
            }, {
                name:  "includeHeader", //          type: "string",                    test: "nonempty" },
                valid: "",
                err:   "includeHeader"
            }, {
                name:  "inputFileName", //          type: "string",                    test: "nonempty" },
                valid: "",
                err:   "inputFileName"
            }, {
                name:  "jitter", //                 type: "boolean",                   test: null },
                valid: "",
                err:   "jitter"
            }, {
                name:  "jitterAmount", //           type: "float",                     test: null },
                valid: "",
                err:   "jitterAmount"
            }, {
                name:  "libraryPath", //            type: "string",                    test: "nonempty" },
                valid: "",
                err:   "libraryPath"
            }, {
                name:  "maxImageBufferMemory", //   type: "int",                       test: ">0" },
                valid: "",
                err:   "maxImageBufferMemory"
            }, {
                name:  "outputAlpha", //            type: "boolean",                   test: null },
                valid: "",
                err:   "outputAlpha"
            }, {
                name:  "outputFileName", //         type: "string",                    test: "nonempty" },
                valid: "",
                err:   "outputFileName"
            }, {
                name:  "outputFileType", //         type: "string(B|C|E|H|J|N|P|S|T)", test: null },
                valid: "",
                err:   "outputFileType"
            }, {
                name:  "outputToFile", //           type: "boolean",                   test: null },
                valid: "",
                err:   "outputToFile"
            }, {
                name:  "palette", //                type: "char",                      test: null },
                valid: "",
                err:   "palette"
            }, {
                name:  "pauseWhenDone", //          type: "boolean",                   test: null },
                valid: "",
                err:   "pauseWhenDone"
            }, {
                name:  "postFrameCommand", //       type: "string",                    test: "nonempty" },
                valid: "",
                err:   "postFrameCommand"
            }, {
                name:  "postFrameReturn", //        type: "returnAction",              test: null },
                valid: "",
                err:   "postFrameReturn"
            }, {
                name:  "postSceneCommand", //       type: "string",                    test: "nonempty" },
                valid: "",
                err:   "postSceneCommand"
            }, {
                name:  "postSceneReturn", //        type: "returnAction",              test: null },
                valid: "",
                err:   "postSceneReturn"
            }, {
                name:  "preFrameCommand", //        type: "string",                    test: "nonempty" },
                valid: "",
                err:   "preFrameCommand"
            }, {
                name:  "preFrameReturn", //         type: "returnAction",              test: null },
                valid: "",
                err:   "preFrameReturn"
            }, {
                name:  "preSceneCommand", //        type: "string",                    test: "nonempty" },
                valid: "",
                err:   "preSceneCommand"
            }, {
                name:  "preSceneReturn", //         type: "returnAction",              test: null },
                valid: "",
                err:   "preSceneReturn"
            }, {
                name:  "previewEndSize", //         type: "int",                       test: ">0" },
                valid: "",
                err:   "previewEndSize"
            }, {
                name:  "previewStartSize", //       type: "int",                       test: ">0" },
                valid: "",
                err:   "previewStartSize"
            }, {
                name:  "quality", //                type: "int",                       test: "0-11" },
                valid: "",
                err:   "quality"
            }, {
                name:  "radiosityFileName", //      type: "string",                    test: "nonempty" },
                valid: "",
                err:   "radiosityFileName"
            }, {
                name:  "radiosityFromFile", //      type: "string",                    test: "nonempty" },
                valid: "",
                err:   "radiosityFromFile"
            }, {
                name:  "radiosityToFile", //        type: "string",                    test: "nonempty" },
                valid: "",
                err:   "radiosityToFile"
            }, {
                name:  "radiosityVainPretrace", //  type: "boolean",                   test: null },
                valid: "",
                err:   "radiosityVainPretrace"
            }, {
                name:  "removeBounds", //           type: "boolean",                   test: null },
                valid: "",
                err:   "removeBounds"
            }, {
                name:  "renderBlockSize", //        type: "int",                       test: "4-" },
                valid: "",
                err:   "renderBlockSize"
            }, {
                name:  "renderBlockStep", //        type: "int",                       test: "1-" },
                valid: "",
                err:   "renderBlockStep"
            }, {
                name:  "renderConsole", //          type: "boolean",                   test: null },
                valid: "",
                err:   "renderConsole"
            }, {
                name:  "renderFile", //             type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "renderFile"
            }, {
                name:  "renderPattern", //          type: "int",                       test: "0-5" },
                valid: "",
                err:   "renderPattern"
            }, {
                name:  "samplingMethod", //         type: "int",                       test: "1-2" },
                valid: "",
                err:   "samplingMethod"
            }, {
                name:  "splitUnions", //            type: "boolean",                   test: null },
                valid: "",
                err:   "splitUnions"
            }, {
                name:  "startColumn", //            type: "int",                       test: "0-" },
                valid: "",
                err:   "startColumn"
            }, {
                name:  "startRow", //               type: "int",                       test: "0-" },
                valid: "",
                err:   "startRow"
            }, {
                name:  "statisticConsole", //       type: "boolean",                   test: null },
                valid: "",
                err:   "statisticConsole"
            }, {
                name:  "statisticFile", //          type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "statisticFile"
            }, {
                name:  "testAbort", //              type: "boolean",                   test: null },
                valid: "",
                err:   "testAbort"
            }, {
                name:  "testAbortCount", //         type: "int",                       test: "1-" },
                valid: "",
                err:   "testAbortCount"
            }, {
                name:  "userAbortCommand", //       type: "string",                    test: "nonempty" },
                valid: "",
                err:   "userAbortCommand"
            }, {
                name:  "userAbortReturn", //        type: "returnAction",              test: null },
                valid: "",
                err:   "userAbortReturn"
            }, {
                name:  "verbose", //                type: "boolean",                   test: null },
                valid: "",
                err:   "verbose"
            }, {
                name:  "videoMode", //              type: "char",                      test: null },
                valid: "",
                err:   "videoMode"
            }, {
                name:  "warningConsole", //         type: "boolean",                   test: null },
                valid: "",
                err:   "warningConsole"
            }, {
                name:  "warningFile", //            type: "mixed(boolean|string)",     test: "nonempty" },
                valid: "",
                err:   "warningFile"
            }, {
                name:  "warningLevel", //           type: "int(0|5|10)",               test: null },
                valid: "",
                err:   "warningLevel"
            }, {
                name:  "width", //                  type: "int",                       test: ">0", default: 640 },
                valid: "",
                err:   "width"
            }, {
                name:  "workThreads", //            type: "int",                       test: "1-512" },
                valid: "",
                err:   "workThreads"
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
                name:  "active", //           type: "boolean",    test: null, default: true },  // CP internal/non-SDL
                valid: "",
                err:   "active"
            }, {
                name:  "baseTransform", //    type: "Matrix",     test: null },  // CP internal/non-SDL
                valid: "",
                err:   "baseTransform"
            }, {
                name:  "boundedBy", //        type: "Primitive",  test: null },
                valid: "",
                err:   "boundedBy"
            }, {
                name:  "children", //         type: "@Primitive", test: null },  // FIXME: CP internal/non-SDL, list of other primitives for CSG objects
                valid: "",
                err:   "children"
            }, {
                name:  "clippedBy", //        type: "Primitive",  test: null },
                valid: "",
                err:   "clippedBy"
            }, {
                name:  "doubleIlluminate", // type: "boolean",    test: null },
                valid: "",
                err:   "doubleIlluminate"
            }, {
                name:  "finish", //           type: "Finish",     test: null },
                valid: "",
                err:   "finish"
            }, {
                name:  "frameBegin", //       type: "function",   test: null },
                valid: "",
                err:   "frameBegin"
            }, {
                name:  "frameEnd", //         type: "function",   test: null },
                valid: "",
                err:   "frameEnd"
            }, {
                name:  "hierarchy", //        type: "boolean",    test: null },
                valid: "",
                err:   "hierarchy"
            }, {
                name:  "hollow", //           type: "boolean",    test: null },
                valid: "",
                err:   "hollow"
            }, {
                name:  "id", //               type: "String",     test: "nonempty" }, // CP internal/non-SDL: unique identifier
                valid: "",
                err:   "id"
            }, {
                name:  "interior", //         type: "Interior",   test: null },
                valid: "",
                err:   "interior"
            }, {
                name:  "inverse", //          type: "boolean",    test: null },
                valid: "",
                err:   "inverse"
            }, {
                name:  "material", //         type: "Material",   test: null },
                valid: "",
                err:   "material"
            }, {
                name:  "noImage", //          type: "boolean",    test: null },
                valid: "",
                err:   "noImage"
            }, {
                name:  "noRadiosity", //      type: "boolean",    test: null },
                valid: "",
                err:   "noRadiosity"
            }, {
                name:  "noReflection", //     type: "boolean",    test: null },
                valid: "",
                err:   "noReflection"
            }, {
                name:  "normal", //           type: "VectorXYZ",  test: null },
                valid: "",
                err:   "normal"
            }, {
                name:  "noShadow", //         type: "boolean",    test: null },
                valid: "",
                err:   "noShadow"
            }, {
                name:  "parent", //           type: "Primitive",  test: null },  // CP internal/non-SDL: ref to parent CSG object
                valid: "",
                err:   "parent"
            }, {
                name:  "photons", //          type: "Photons",    test: null },
                valid: "",
                err:   "photons"
            }, {
                name:  "radiosity", //        type: "Radiosity",  test: null },
                valid: "",
                err:   "radiosity"
            }, {
                name:  "serial", //           type: "int",        test: null },  // CP internal/non-SDL, read-only
                valid: "",
                err:   "serial"
            }, {
                name:  "scene", //            type: "Scene",      test: null },  // CP internal/non-SDL, reference to current scene
                valid: "",
                err:   "scene"
            }, {
                name:  "sturm", //            type: "boolean",    test: null },
                valid: "",
                err:   "sturm"
            }, {
                name:  "texture", //          type: "Texture",    test: null },
                valid: "",
                err:   "texture"
            }, {
                name:  "transform", //        type: "Matrix",     test: null },
                valid: "",
                err:   "transform"
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
                    name:  "components", // type: "@mixed(Sphere|Cylinder)[1-]",
                    req:   true,
                    valid: "",
                    req:   true,
                    err:   "components"
                }, {
                    name:  "threshold", // type: "float" },
                    valid: "",
                    err:   "threshold"
                }, {
                    name:  "sturm", //     type: "boolean" },
                    valid: "",
                    err:   "sturm"
                }, {
                    name:  "hierarchy", // type: "boolean" },
                    valid: "",
                    err:   "hierarchy"
                }
            ],
        },

        box: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "corner1", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "corner1"
                }, {
                    name:  "corner2", // type: "VectorXYZ", required: true }
                    valid: "",
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
                    valid: "",
                    err:   "type"
                }, {
                    name:  "angle", //        type: "FIXME" },
                    valid: "",
                    err:   "angle"
                }, {
                    name:  "apertureSize", // type: "float" },
                    valid: "",
                    err:   "apertureSize"
                }, {
                    name:  "blurSamples", //  type: "@float[2]" },  // TODO: needs test: both must be >= 0
                    valid: "",
                    err:   "blurSamples"
                }, {
                    name:  "bokeh", //        type: "VectorRGB" },  // TODO: needs test: must be in the range <0,0,0> to <1,1,0>
                    valid: "",
                    err:   "bokeh"
                }, {
                    name:  "confidence", //   type: "float" },
                    valid: "",
                    err:   "confidence"
                }, {
                    name:  "cylinderType", // type: "int(1|2|3|4)" },
                    valid: "",
                    err:   "cylinderType"
                }, {
                    name:  "direction", //    type: "VectorXYZ" },
                    valid: "",
                    err:   "direction"
                }, {
                    name:  "focalPoint", //   type: "VectorXYZ" },
                    valid: "",
                    err:   "focalPoint"
                }, {
                    name:  "location", //     type: "VectorXYZ" },
                    valid: "",
                    err:   "location"
                }, {
                    name:  "lookAt", //       type: "VectorXYZ" },
                    valid: "",
                    err:   "lookAt"
                }, {
                    name:  "right", //        type: "VectorXYZ" },
                    valid: "",
                    err:   "right"
                }, {
                    name:  "sky", //          type: "VectorXYZ" },
                    valid: "",
                    err:   "sky"
                }, {
                    name:  "up", //           type: "VectorXYZ" },
                    valid: "",
                    err:   "up"
                }, {
                    name:  "variance", //     type: "float" },
                    valid: "",
                    err:   "variance"
                }, {
                    name:  "vertAngle", //    type: "int" },
                    valid: "",
                    err:   "vertAngle"
                }
            ]
        },

        cone: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "basePoint", //  type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "basePoint"
                }, {
                    name:  "baseRadius", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "baseRadius"
                }, {
                    name:  "capPoint", //   type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "capPoint"
                }, {
                    name:  "capRadius", //  type: "float",
                    req:   true,
                    valid: "",
                    err:   "capRadius"
                }, {
                    name:  "open", // type: "boolean" },
                    valid: "",
                    err:   "open"
                }
            ],
        },

        cylinder: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "basePoint", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "basePoint"
                }, {
                    name:  "capPoint", //  type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "capPoint"
                }, {
                    name:  "radius", //    type: "float",
                    req:   true,
                    valid: "",
                    err:   "radius"
                }, {
                    name:  "open", //     type: "boolean" },
                    valid: "",
                    err:   "open"
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
                    valid: "",
                    err:   "smooth"
                }, {
                    name:  "waterLevel", // type: "float"   },
                    valid: "",
                    err:   "waterLevel"
                }, {
                    name:  "hierarchy", //  type: "boolean" },
                    valid: "",
                    err:   "hierarchy"
                }, {
                    name:  "gamma", //      type: "float"   },
                    valid: "",
                    err:   "gamma"
                }, {
                    name:  "premult", //    type: "boolean" },
                    valid: "",
                    err:   "premult"
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
                    valid: "",
                    err:   "open"
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
                    valid: "",
                    err:   "power"
                }, {
                    name:  "maxIter", //   type: "int" },
                    valid: "",
                    err:   "maxIter"
                }, {
                    name:  "precision", // type: "int" },
                    valid: "",
                    err:   "precision"
                }, {
                    name:  "slice", //     type: "VectorXYZW" },
                    valid: "",
                    err:   "slice"
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
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        lightSource: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                {
                    name:  "location", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "location"
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
                    valid: "",
                    err:   "areaIllumination"
                }, {
                    name:  "areaLight", //        type: "boolean"   },
                    valid: "",
                    err:   "areaLight"
                }, {
                    name:  "axis1", //            type: "VectorXYZ" },
                    valid: "",
                    err:   "axis1"
                }, {
                    name:  "axis2", //            type: "VectorXYZ" },
                    valid: "",
                    err:   "axis2"
                }, {
                    name:  "circular", //         type: "boolean"   },
                    valid: "",
                    err:   "circular"
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
                    valid: "",
                    err:   "jitter"
                }, {
                    name:  "looksLike", //        type: "Primitive" },
                    valid: "",
                    err:   "looksLike"
                }, {
                    name:  "mediaAttenuation", // type: "boolean"   }, // TODO
                    valid: "",
                    err:   "mediaAttenuation"
                }, {
                    name:  "mediaInteraction", // type: "boolean"   }, // TODO
                    valid: "",
                    err:   "mediaInteraction"
                }, {
                    name:  "orient", //           type: "boolean"   },
                    valid: "",
                    err:   "orient"
                }, {
                    name:  "parallel", //         type: "boolean"   },
                    valid: "",
                    err:   "parallel"
                }, {
                    name:  "pointAt", //          type: "VectorXYZ" },
                    valid: "",
                    err:   "pointAt"
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
                    valid: "",
                    err:   "shadowless"
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
                    name:  "uv1", //    type: "VectorUV",
                    req:   true,
                    valid: "",
                    err:   "uv1"
                }, {
                    name:  "uv2", //    type: "VectorUV",
                    req:   true,
                    valid: "",
                    err:   "uv2"
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
                    valid: "",
                    err:   "precomputeX"
                }, {
                    name:  "precomputeY", //     type: "boolean" },
                    valid: "",
                    err:   "precomputeY"
                }, {
                    name:  "precomputeZ", //     type: "boolean" },
                    valid: "",
                    err:   "precomputeZ"
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
                    valid: "",
                    err:   "open"
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        sphere: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                {
                    name:  "center", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "center"
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
                    name:  "vector", // type: "VectorXY",
                    req:   true,
                    valid: "",
                    err:   "vector"
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
                    valid: "",
                    err:   "open"
                }, {
                    name:  "sturm", // type: "boolean" },
                    valid: "",
                    err:   "sturm"
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
                    valid: "",
                    err:   "sturm"
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
                    name:  "center", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "center"
                }, {
                    name:  "normal", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "normal"
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
                    name:  "insideVector", // type: "VectorXYZ" },
                    valid: "",
                    err:   "insideVector"
                }, {
                    name:  "hierarchy", //    type: "boolean" },
                    valid: "",
                    err:   "hierarchy"
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
                    name:  "corner1", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "corner1"
                }, {
                    name:  "corner2", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "corner2"
                }, {
                    name:  "corner3", // type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "corner3"
                }, {
                    name:  "smooth", //   type: "boolean" },    // if smooth and normal1...3 are defined, it's a smooth triangle
                    valid: "",
                    err:   "smooth"
                }, {
                    name:  "normal1", //  type: "VectorXYZ" },
                    valid: "",
                    err:   "normal1"
                }, {
                    name:  "normal2", //  type: "VectorXYZ" },
                    valid: "",
                    err:   "normal2"
                }, {
                    name:  "normal3", //  type: "VectorXYZ" },
                    valid: "",
                    err:   "normal3"
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
                    name:  "normal", //   type: "VectorXYZ",
                    req:   true,
                    valid: "",
                    err:   "normal"
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
                    name:  "coefficients", // type: "@float[2-35]",
                    req:   true,
                    valid: "",
                    err:   "coefficients"
                }, {
                    name:  "sturm", // type: "boolean" },
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        cubic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "coefficients", // type: "@float[20]",
                    req:   true,
                    valid: "",
                    err:   "coefficients"
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        quartic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "coefficients", // type: "@float[20]",
                    req:   true,
                    valid: "",
                    err:   "coefficients"
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        polynomial: {                                             // this will require better understanding of the
            fixed: { finite: false, solid: true, csg: false },    // underlying maths than I currently have to validate
            mutable: [
                {
                    name:  "order", // type: "int",
                    req:   true,
                    valid: "",
                    err:   "order"
                }, {
                    name:  "coefficients", // type: "@VectorXYZW",
                    req:   true,
                    valid: "",
                    err:   "coefficients"
                }, {
                    name:  "sturm", // type: "boolean" }
                    valid: "",
                    err:   "sturm"
                }
            ],
        },

        quadric: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                {
                    name:  "a", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "a"
                }, {
                    name:  "b", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "b"
                }, {
                    name:  "c", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "c"
                }, {
                    name:  "d", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "d"
                }, {
                    name:  "e", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "e"
                }, {
                    name:  "f", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "f"
                }, {
                    name:  "g", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "g"
                }, {
                    name:  "h", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "h"
                }, {
                    name:  "i", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "i"
                }, {
                    name:  "j", // type: "float",
                    req:   true,
                    valid: "",
                    err:   "j"
                }
            ],

        },

        union: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects", // type: "@Primitive",
                    req:   true,
                    valid: "",
                    err:   "objects"
                }, {
                    name:  "splitUnion", // type: "boolean" }
                    valid: "",
                    err:   "splitUnion"
                }
            ]
        },

        intersection: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects", // type: "@Primitive", required: true }
                    valid: "",
                    err:   "objects"
                }
            ],
        },

        difference: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "positiveObject", // type: "Primitive"  ,
                    req:   true,
                    valid: "",
                    err:   "positiveObject"
                }, {
                    name:  "negativeObjects", // type: "@Primitive", required: true }
                    valid: "",
                    err:   "negativeObjects"
                }
            ],
        },

        merge: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                {
                    name:  "objects", // type: "@Primitive", required: true }
                    valid: "",
                    err:   "objects"
                }
            ],
        },

    },

    //------------------------------------------------------------------------------
    // All (graphics) output file formats, mapped to textual descriptions.
    //------------------------------------------------------------------------------

    outputFile: {
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
    return Object.getPrototypeOf(val).constructor.name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.inheritsFrom = function(val, classname) {
    return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
}


//==============================================================================
// Fly my pretties, fly! =======================================================
//==============================================================================

exports.cpov = cpov;
