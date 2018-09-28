exports.cpov = cpov;

//==============================================================================
// The cpov object contains all of the data structures and generic methods in
// CephaloPOV that do not appear in other specialized classes.
//==============================================================================

var cpov = {

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
            { name: "adcBailout",              type: "float",                  test: ">=0"           },
            { name: "ambientLight",            type: "VectorRGB|VectorSRGB",   test: null            },
            { name: "assumedGamma",            type: "float",                  test: null            },
            { name: "charset",                 type: "string(ascii|utf8|sys)", test: null            },
            { name: "iridWavelength",          type: "VectorRGB|VectorSRGB",   test: null            },
            { name: "maxIntersections",        type: "int",                    test: ">=0"           },
            { name: "maxTraceLevel",           type: "int",                    test: ">=0"           },
            { name: "mmPerUnit",               type: "float",                  test: ">=0"           },
            { name: "noiseGenerator",          type: "int(1|2|3)",             test: null            },
            { name: "numberOfWaves",           type: "int",                    test: ">=0"           },
            { name: "photon",                  type: "boolean",                test: null            },
            { name: "photonAdcBailout",        type: "float",                  test: ">=0"           },
            { name: "photonAutostop",          type: "float",                  test: "unitInterval"  },
            { name: "photonCount",             type: "int",                    test: ">=0"           },  // TODO: cannot be used with photonSpacing
            { name: "photonExpandThresholds",  type: "list(float,int)",        test: null            },
            { name: "photonGather",            type: "@int[2]",                test: [">=0", "a<=b"] },
            { name: "photonJitter",            type: "float",                  test: null            },
            { name: "photonLoadFile",          type: "string",                 test: "nonempty"      },
            { name: "photonMaxTraceLevel",     type: "int",                    test: ">=0"           },
            { name: "photonMedia",             type: "@float[2]",              test: null            },
            { name: "photonRadius",            type: "@float[4]",              test: null            },
            { name: "photonSaveFile",          type: "string",                 test: "nonempty"      },
            { name: "photonSpacing",           type: "float",                  test: ">0"            }, // TODO: cannot be used with photonCount
            { name: "radAdcBailout",           type: "float",                  test: null            },
            { name: "radAlwaysSample",         type: "boolean",                test: null            },
            { name: "radBrightness",           type: "float",                  test: null            },
            { name: "radCount",                type: "@int[1-2]",              test: ">=1"           },
            { name: "radErrorBound",           type: "float",                  test: null            },
            { name: "radGrayThreshold",        type: "float",                  test: "unitInterval"  },
            { name: "radiosity",               type: "boolean",                test: null            },
            { name: "radLowErrorFactor",       type: "float",                  test: null            },
            { name: "radMaximumReuse",         type: "float",                  test: null            },
            { name: "radMaxSample",            type: "float",                  test: null            },
            { name: "radMinimumReuse",         type: "float",                  test: null            },
            { name: "radNearestCount",         type: "int",                    test: "1-20"          },
            { name: "radNormal",               type: "boolean",                test: null            },
            { name: "radPretraceEnd",          type: "float",                  test: "unitInterval"  },
            { name: "radPretraceStart",        type: "float",                  test: "unitInterval"  },
            { name: "radRecursionLimit",       type: "int",                    test: "1-20"          },
            { name: "radSubsurface",           type: "boolean",                test: null            },
            { name: "subRadiosity",            type: "boolean",                test: null            },
            { name: "subSamples",              type: "@int[2]",                test: null            },
            { name: "subsurface",              type: "boolean",                test: null            },
        ]
    },

    //--------------------------------------------------------------------------
    // Definition of imageOptions parameter validations and error messages.
    //--------------------------------------------------------------------------

    ioDef: {
        mutable: [
            { name: "allConsole",             type: "boolean",                   test: null },
            { name: "allFile",                type: "mixed(boolean|string)",     test: null },
            { name: "antialias",              type: "boolean",                   test: null },
            { name: "antialiasDepth",         type: "int",                       test: "1-9" },
            { name: "antialiasGamma",         type: "float",                     test: null },
            { name: "antialiasThreshold",     type: "float",                     test: ">=0" },
            { name: "appendFile",             type: "boolean",                   test: null },
            { name: "bitsPerColor",           type: "int",                       test: "5-16" },
            { name: "bounding",               type: "boolean",                   test: null },
            { name: "boundingMethod",         type: "int(1|2)",                  test: null },
            { name: "boundingThreshold",      type: "int",                       test: ">=0" },
            { name: "bspBaseAccessCost",      type: "float",                     test: null },
            { name: "bspChildAccessCost",     type: "float",                     test: null },
            { name: "bspIsectCost",           type: "float",                     test: null },
            { name: "bspMaxDepth",            type: "int",                       test: ">0" },
            { name: "bspMissChance",          type: "float",                     test: null },
            { name: "continueTrace",          type: "boolean",                   test: null },
            { name: "createIni",              type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "debugConsole",           type: "boolean",                   test: null },
            { name: "debugFile",              type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "display",                type: "boolean",                   test: null },
            { name: "displayGamma",           type: "mixed(float|'sRGB')",       test: null },
            { name: "dither",                 type: "boolean",                   test: null },
            { name: "ditherMethod",           type: "ditherType",                test: null },
            { name: "endColumn",              type: "int",                       test: "0-" },
            { name: "endRow",                 type: "int",                       test: "0-" },
            { name: "exePath",                type: "string",                    test: "nonempty" },
            { name: "fatalConsole",           type: "boolean",                   test: null },
            { name: "fatalErrorCommand",      type: "string",                    test: "nonempty" },
            { name: "fatalErrorReturn",       type: "returnAction",              test: null },
            { name: "fatalFile",              type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "fileGamma",              type: "mixed(float|'sRGB')",       test: null },
            { name: "height",                 type: "int",                       test: ">0", default: 480 },
            { name: "highReproducibility",    type: "boolean",                   test: null },
            { name: "includeHeader",          type: "string",                    test: "nonempty" },
            { name: "inputFileName",          type: "string",                    test: "nonempty" },
            { name: "jitter",                 type: "boolean",                   test: null },
            { name: "jitterAmount",           type: "float",                     test: null },
            { name: "libraryPath",            type: "string",                    test: "nonempty" },
            { name: "maxImageBufferMemory",   type: "int",                       test: ">0" },
            { name: "outputAlpha",            type: "boolean",                   test: null },
            { name: "outputFileName",         type: "string",                    test: "nonempty" },
            { name: "outputFileType",         type: "string(B|C|E|H|J|N|P|S|T)", test: null },
            { name: "outputToFile",           type: "boolean",                   test: null },
            { name: "palette",                type: "char",                      test: null },
            { name: "pauseWhenDone",          type: "boolean",                   test: null },
            { name: "postFrameCommand",       type: "string",                    test: "nonempty" },
            { name: "postFrameReturn",        type: "returnAction",              test: null },
            { name: "postSceneCommand",       type: "string",                    test: "nonempty" },
            { name: "postSceneReturn",        type: "returnAction",              test: null },
            { name: "preFrameCommand",        type: "string",                    test: "nonempty" },
            { name: "preFrameReturn",         type: "returnAction",              test: null },
            { name: "preSceneCommand",        type: "string",                    test: "nonempty" },
            { name: "preSceneReturn",         type: "returnAction",              test: null },
            { name: "previewEndSize",         type: "int",                       test: ">0" },
            { name: "previewStartSize",       type: "int",                       test: ">0" },
            { name: "quality",                type: "int",                       test: "0-11" },
            { name: "radiosityFileName",      type: "string",                    test: "nonempty" },
            { name: "radiosityFromFile",      type: "string",                    test: "nonempty" },
            { name: "radiosityToFile",        type: "string",                    test: "nonempty" },
            { name: "radiosityVainPretrace",  type: "boolean",                   test: null },
            { name: "removeBounds",           type: "boolean",                   test: null },
            { name: "renderBlockSize",        type: "int",                       test: "4-" },
            { name: "renderBlockStep",        type: "int",                       test: "1-" },
            { name: "renderConsole",          type: "boolean",                   test: null },
            { name: "renderFile",             type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "renderPattern",          type: "int",                       test: "0-5" },
            { name: "samplingMethod",         type: "int",                       test: "1-2" },
            { name: "splitUnions",            type: "boolean",                   test: null },
            { name: "startColumn",            type: "int",                       test: "0-" },
            { name: "startRow",               type: "int",                       test: "0-" },
            { name: "statisticConsole",       type: "boolean",                   test: null },
            { name: "statisticFile",          type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "testAbort",              type: "boolean",                   test: null },
            { name: "testAbortCount",         type: "int",                       test: "1-" },
            { name: "userAbortCommand",       type: "string",                    test: "nonempty" },
            { name: "userAbortReturn",        type: "returnAction",              test: null },
            { name: "verbose",                type: "boolean",                   test: null },
            { name: "videoMode",              type: "char",                      test: null },
            { name: "warningConsole",         type: "boolean",                   test: null },
            { name: "warningFile",            type: "mixed(boolean|string)",     test: "nonempty" },
            { name: "warningLevel",           type: "int(0|5|10)",               test: null },
            { name: "width",                  type: "int",                       test: ">0", default: 640 },
            { name: "workThreads",            type: "int",                       test: "1-512" },
        ]
    },

    //--------------------------------------------------------------------------
    // Defines the types and validity tests for properties which are common to
    // all primitive objects.
    //--------------------------------------------------------------------------

    objCommon: {
        mutable: [
            { name: "active",           type: "boolean",    test: null, default: true },  // CP internal/non-SDL
            { name: "baseTransform",    type: "Matrix",     test: null },  // CP internal/non-SDL
            { name: "boundedBy",        type: "Primitive",  test: null },
            { name: "children",         type: "@Primitive", test: null },  // FIXME: CP internal/non-SDL, list of other primitives for CSG objects
            { name: "clippedBy",        type: "Primitive",  test: null },
            { name: "doubleIlluminate", type: "boolean",    test: null },
            { name: "finish",           type: "Finish",     test: null },
            { name: "frameBegin",       type: "function",   test: null },
            { name: "frameEnd",         type: "function",   test: null },
            { name: "hierarchy",        type: "boolean",    test: null },
            { name: "hollow",           type: "boolean",    test: null },
            { name: "id",               type: "String",     test: "nonempty" }, // CP internal/non-SDL: unique identifier
            { name: "interior",         type: "Interior",   test: null },
            { name: "inverse",          type: "boolean",    test: null },
            { name: "material",         type: "Material",   test: null },
            { name: "noImage",          type: "boolean",    test: null },
            { name: "noRadiosity",      type: "boolean",    test: null },
            { name: "noReflection",     type: "boolean",    test: null },
            { name: "normal",           type: "VectorXYZ",  test: null },
            { name: "noShadow",         type: "boolean",    test: null },
            { name: "parent",           type: "Primitive",  test: null },  // CP internal/non-SDL: ref to parent CSG object
            { name: "photons",          type: "Photons",    test: null },
            { name: "radiosity",        type: "Radiosity",  test: null },
            { name: "serial",           type: "int",        test: null },  // CP internal/non-SDL, read-only
            { name: "scene",            type: "Scene",      test: null },  // CP internal/non-SDL, reference to current scene
            { name: "sturm",            type: "boolean",    test: null },
            { name: "texture",          type: "Texture",    test: null },
            { name: "transform",        type: "Matrix",     test: null },
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
                { name: "components", type: "@mixed(Sphere|Cylinder)[1-]", required: true },
                { name: "threshold", type: "float" },
                { name: "sturm",     type: "boolean" },
                { name: "hierarchy", type: "boolean" },
            ],
        },

        box: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "corner1", type: "VectorXYZ", required: true },
                { name: "corner2", type: "VectorXYZ", required: true }
            ],

        },

        //--------------------------------------------------------------------------
        // The camera type isn't really a primitive in SDL, but we're going to
        // treat it as one for most purposes and fake it in CSG objects.
        //--------------------------------------------------------------------------

        camera: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "type", type: "string(perspective|orthographic|fisheye|ultra_wide_angle|omnimax|panoramic|spherical|cylinder|mesh_camera)", required: true },
                { name: "angle",        type: "FIXME" },
                { name: "apertureSize", type: "float" },
                { name: "blurSamples",  type: "@float[2]" },  // TODO: needs test: both must be >= 0
                { name: "bokeh",        type: "VectorRGB" },  // TODO: needs test: must be in the range <0,0,0> to <1,1,0>
                { name: "confidence",   type: "float" },
                { name: "cylinderType", type: "int(1|2|3|4)" },
                { name: "direction",    type: "VectorXYZ" },
                { name: "focalPoint",   type: "VectorXYZ" },
                { name: "location",     type: "VectorXYZ" },
                { name: "lookAt",       type: "VectorXYZ" },
                { name: "right",        type: "VectorXYZ" },
                { name: "sky",          type: "VectorXYZ" },
                { name: "up",           type: "VectorXYZ" },
                { name: "variance",     type: "float" },
                { name: "vertAngle",    type: "int" },
            ]
        },

        cone: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "basePoint",  type: "VectorXYZ", required: true },
                { name: "baseRadius", type: "float", required: true },
                { name: "capPoint",   type: "VectorXYZ", required: true },
                { name: "capRadius",  type: "float", required: true },
                { name: "open", type: "boolean" },
            ],
        },

        cylinder: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "basePoint", type: "VectorXYZ", required: true },
                { name: "capPoint",  type: "VectorXYZ", required: true },
                { name: "radius",    type: "float", required: true },
                { name: "open",     type: "boolean" },
                { name: "strength", type: "float" },    // only used when the cylinder is a blob component
            ],
        },

        heightField: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "source", type: "mixed(string|SDLFunction)", required: true },
                { name: "hfType",     type: "string(exr|gif|hdr|iff|jpeg|pgm|png|pot|ppm|sys|tga|tiff)" },      // only used source is image instead of function
                { name: "smooth",     type: "boolean" },
                { name: "waterLevel", type: "float"   },
                { name: "hierarchy",  type: "boolean" },
                { name: "gamma",      type: "float"   },
                { name: "premult",    type: "boolean" },
            ],
        },

        isoSurface: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "source", type: "SDLFunction", required: true },
                { name: "containedBy", type: "mixed(Sphere|Box)" },
                { name: "threshold",   type: "float" },
                { name: "accuracy",    type: "float" },
                { name: "maxGradient", type: "float" },
                { name: "evaluate",    type: "@float[3]" },
                { name: "open",        type: "boolean" },
                { name: "maxTrace",    type: "mixed(int|'all_intersections')" },
            ],
        },

        juliaFractal: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "type", type: "string(quaternion:sqr|quaternion:cube|hypercomplex:sqr|hypercomplex:cube|hypercomplex:exp|hypercomplex:reciprocal|hypercomplex:sin|hypercomplex:asin|hypercomplex:sinh|hypercomplex:cos|hypercomplex:acos|hypercomplex:cosh|hypercomplex:acosh|hypercomplex:tan|hypercomplex:atan|hypercomplex:tanh|hypercomplex:atanh|hypercomplex:ln|hypercomplex:pwr)", required: true },
                { name: "power",     type: "VectorXY" },  // needed for hypercomplex:pwr -- come up with default
                { name: "maxIter",   type: "int" },
                { name: "precision", type: "int" },
                { name: "slice",     type: "VectorXYZW" },
                { name: "distance",  type: "float" },
            ],
        },

        lathe: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "type",   type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline)", required: true },
                { name: "points", type: "@VectorXY[2-]", required: true },
                { name: "sturm", type: "boolean" }
            ],
        },

        lightSource: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "location", type: "VectorXYZ", required: true },
                { name: "color",    type: "VectorRGB", required: true },
                { name: "adaptive",         type: "float",    test: ">=0" },
                { name: "areaIllumination", type: "boolean"   },
                { name: "areaLight",        type: "boolean"   },
                { name: "axis1",            type: "VectorXYZ" },
                { name: "axis2",            type: "VectorXYZ" },
                { name: "circular",         type: "boolean"   },
                { name: "fadeDistance",     type: "float",    test: ">0" },
                { name: "fadePower",        type: "float"     },
                { name: "falloff",          type: "float",    test: "a<90" },
                { name: "jitter",           type: "boolean"   },
                { name: "looksLike",        type: "Primitive" },
                { name: "mediaAttenuation", type: "boolean"   }, // TODO
                { name: "mediaInteraction", type: "boolean"   }, // TODO
                { name: "orient",           type: "boolean"   },
                { name: "parallel",         type: "boolean"   },
                { name: "pointAt",          type: "VectorXYZ" },
                { name: "projectedThrough", type: "Primitive" },
                { name: "radius",           type: "float",    test: "a<90" },
                { name: "shadowless",       type: "boolean"   },
                { name: "size1",            type: "float",    test: ">0" },
                { name: "size2",            type: "float",    test: ">0" },
                { name: "tightness",        type: "float",    test: "0-100" },
                { name: "type",             type: "string(spotlight|cylinder)" },
            ],
        },

        ovus: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "bottomRadius", type: "float", required: true },
                { name: "topRadius",    type: "float", required: true },
            ],

        },

        parametric: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "funcX",  type: "SDLFunction", required: true },
                { name: "funcY",  type: "SDLFunction", required: true },
                { name: "funcZ",  type: "SDLFunction", required: true },
                { name: "uv1",    type: "VectorUV", required: true },
                { name: "uv2",    type: "VectorUV", required: true },
                { name: "containedBy",     type: "mixed(Sphere|Box)" },
                { name: "maxGradient",     type: "float" },
                { name: "accuracy",        type: "float" },
                { name: "precomputeDepth", type: "int" },
                { name: "precomputeX",     type: "boolean" },
                { name: "precomputeY",     type: "boolean" },
                { name: "precomputeZ",     type: "boolean" },
            ],
        },

        prism: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "type",    type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline|linear_sweep|conic_sweep)", required: true },
                { name: "height1", type: "float", required: true },
                { name: "height2", type: "float", required: true },
                { name: "points",  type: "@VectorXY", required: true },
                { name: "open",  type: "boolean" },
                { name: "sturm", type: "boolean" }
            ],
        },

        sphere: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "center", type: "VectorXYZ", required: true },
                { name: "radius", type: "float", required: true },
                { name: "strength", type: "float" },    // only used when used as a blob component
            ],
        },

        sphereSweep: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "type", type: "string(linear_spline|b_spline|cubic_spline)", required: true },
                { name: "spheres", type: "@Sphere[2-]", required: true },
                { name: "tolerance", type: "float" }
            ],
        },

        superellipsoid: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "vector", type: "VectorXY", required: true },
            ],

        },

        sor: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "points", type: "@VectorXY[2-]", required: true },
                { name: "open",  type: "boolean" },
                { name: "sturm", type: "boolean" },
            ],
        },

        text: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "font",        type: "string", required: true },
                { name: "displayText", type: "string", required: true },
                { name: "thickness",   type: "float", required: true },
                { name: "offset",      type: "float", required: true },
            ],

        },

        torus: {
            fixed: { finite: true, solid: true, csg: false },
            mutable: [
                { name: "majorRadius", type: "float", required: true },
                { name: "minorRadius", type: "float", required: true },
                { name: "sturm",       type: "boolean" },
            ],
        },

        bicubicPatch: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "type",  type: "int(0|1)", required: true },
                { name: "points", type: "@VectorXYZ[16]", required: true },
            ],
            optional: [
                { name: "uSteps",   type: "int" },
                { name: "vSteps",   type: "int" },
                { name: "flatness", type: "float" },
            ],
        },

        disc: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "center", type: "VectorXYZ", required: true },
                { name: "normal", type: "VectorXYZ", required: true },
                { name: "radius", type: "float", required: true },
                { name: "holeRadius", type: "float" },
            ],
        },

        mesh: {
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "triangles", type: "@Triangle[1-]", required: true },
                { name: "insideVector", type: "VectorXYZ" },
                { name: "hierarchy",    type: "boolean" },
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
                { name: "points", type: "@VectorXY[3-]", required: true },
            ],

        },

        triangle: {               // combines triangle and smooth_triangle
            fixed: { finite: true, solid: false, csg: false },
            mutable: [
                { name: "corner1", type: "VectorXYZ", required: true },
                { name: "corner2", type: "VectorXYZ", required: true },
                { name: "corner3", type: "VectorXYZ", required: true },
                { name: "smooth",   type: "boolean" },    // if smooth and normal1...3 are defined, it's a smooth triangle
                { name: "normal1",  type: "VectorXYZ" },
                { name: "normal2",  type: "VectorXYZ" },
                { name: "normal3",  type: "VectorXYZ" },
                { name: "textures", type: "@int" }
            ],
        },

        plane: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                { name: "normal",   type: "VectorXYZ", required: true },
                { name: "distance", type: "float", required: true },
            ],

        },

        poly: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                { name: "coefficients", type: "@float[2-35]", required: true },
                { name: "sturm", type: "boolean" },
            ],
        },

        cubic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                { name: "coefficients", type: "@float[20]", required: true },
                { name: "sturm", type: "boolean" }
            ],
        },

        quartic: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                { name: "coefficients", type: "@float[20]", required: true },
                { name: "sturm", type: "boolean" }
            ],
        },

        polynomial: {                                             // this will require better understanding of the
            fixed: { finite: false, solid: true, csg: false },    // underlying maths than I currently have to validate
            mutable: [
                { name: "order", type: "int", required: true },
                { name: "coefficients", type: "@VectorXYZW", required: true },
                { name: "sturm", type: "boolean" }
            ],
        },

        quadric: {
            fixed: { finite: false, solid: true, csg: false },
            mutable: [
                { name: "a", type: "float", required: true },
                { name: "b", type: "float", required: true },
                { name: "c", type: "float", required: true },
                { name: "d", type: "float", required: true },
                { name: "e", type: "float", required: true },
                { name: "f", type: "float", required: true },
                { name: "g", type: "float", required: true },
                { name: "h", type: "float", required: true },
                { name: "i", type: "float", required: true },
                { name: "j", type: "float", required: true },
            ],

        },

        union: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                { name: "objects", type: "@Primitive", required: true },
                { name: "splitUnion", type: "boolean" }
            ]
        },

        intersection: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                { name: "objects", type: "@Primitive", required: true }
            ],
        },

        difference: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                { name: "positiveObject", type: "Primitive"  , required: true },
                { name: "negativeObjects", type: "@Primitive", required: true }
            ],
        },

        merge: {
            fixed: { finite: null, solid: true, csg: true },
            mutable: [
                { name: "objects", type: "@Primitive", required: true }
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

//------------------------------------------------------------------------------

cpov.tab = function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//==============================================================================
// Validation functions, mainly to be leveraged by generated classes.
//==============================================================================

function isFloat(val) {
    return typeof val == "number" ? true : false;
}

//------------------------------------------------------------------------------

function isArrayOfFloats(val, min, max) {
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

function isWithin(val, min, max) {
    return val >= min && val <= max ? true : false;
}

//------------------------------------------------------------------------------

function isBetween(val, min, max) {
    return val > min && val < max ? true : false;
}

//------------------------------------------------------------------------------

function isInt(val) {
    return typeof val == "number" && val == Math.floor(val) ? true : false;
}

//------------------------------------------------------------------------------

function isArrayOfInts(val, min, max) {
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

function isString(val) {
    return typeof val == "string" ? true : false;
}

//------------------------------------------------------------------------------

function isNonEmptyString(val) {
    return typeof val == "string" && val.length ? true : false;
}

//------------------------------------------------------------------------------

function isChar(val) {
    return typeof val == "string" && val.length == 1 ? true : false;
}

//------------------------------------------------------------------------------

function isInArray(val, array) {
    for(var i = 0; i < array.length; i++)
        if(array[i] === val)
            return true;
    return false;
}

//------------------------------------------------------------------------------

function isKey(val, object) {
    return object[val] !== undefined ? true : false;
}

//------------------------------------------------------------------------------

function isBoolean(val) {
    return typeof val == "boolean" ? true : false;
}

//------------------------------------------------------------------------------

function isNull(val) {
    return val === null ? true : false;
}

//------------------------------------------------------------------------------

function isClass(val, classname) {
    return Object.getPrototypeOf(val).constructor.name == classname ? true : false;
}

//------------------------------------------------------------------------------

function inheritsFrom(val, classname) {
    return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
}

