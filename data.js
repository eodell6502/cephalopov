//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//==============================================================================

function ClassBuilder(name, fixed, mutable, superclass) {
    this.name       = name;
    this.superclass = superclass;
    this.fixed      = fixed;
    this.mutable    = mutable;
}

//==============================================================================
// Legal dither types mapped to textual descriptions.
//==============================================================================

ClassBuilder.prototype.ditherTypes = {
    "B2": "Bayer pattern 2x2",
    "B3": "Bayer pattern 3x3",
    "B4": "Bayer pattern 4x4",
    "D1": "Simple error diffusion 1D",
    "D2": "Simple error diffusion 2D",
    "FS": "Floyd-Steinberg error diffusion"
};

//==============================================================================
// Similar to objDef, gsDef defines the globalSettings parameters in order to
// centralize validation.
//==============================================================================

ClassBuilder.prototype.gsDef = {
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
};

//==============================================================================
// As with objDef and gsDef, ioDef defines the validation params for
// ImageOptions objects.
//==============================================================================

ClassBuilder.prototype.ioDef = {
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
};

//==============================================================================
// Defines the types and validity tests for properties which are common to all
// primitive objects.
//==============================================================================

ClassBuilder.prototype.objCommon = {
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
};

//==============================================================================
// Definitions of parameters for primitive geometric objects.
//
// TODO: "mesh2" needs to be added once I understand it better.
//==============================================================================

ClassBuilder.prototype.objDef = {

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

};

//==============================================================================
// All (graphics) output file formats, mapped to textual descriptions.
//==============================================================================

ClassBuilder.prototype.outputFile = {
    "B": "BMP",
    "C": "TGA, RLE compression",
    "E": "OpenEXR HDR",
    "H": "Radiance HDR",
    "J": "JPEG",
    "N": "PNG",
    "P": "PPM",
    "S": "System default",
    "T": "TGA, uncompressed"
};

//==============================================================================
// List of geometric primitive type names.
//==============================================================================

ClassBuilder.prototype.primitives = [ "bicubicPatch", "blob", "box", "camera", "cone", "cubic",
    "cylinder", "difference", "disc", "heightField", "intersection",
    "isoSurface", "juliaFractal", "lathe", "lightSource", "merge", "mesh", "ovus",
    "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
    "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
    "torus", "triangle", "union" ];

//==============================================================================
// All supported return actions mapped to textual descriptions.
//==============================================================================

ClassBuilder.prototype.returnActions = {
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
};

//==============================================================================
// List of SDL keywords.
//==============================================================================

ClassBuilder.prototype.sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
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
    "write", "x", "y", "yes", "z" ];




//==============================================================================
// Parses the type formats used in objDef, gsDef, ioDef, etc., and returns them
// as a convenient data structure. The results are cached.
//
// The formats follow the basic form:
//
//     @name(alternative1|alternative2)[m-n]
//
// where
//
//     @ ....... if present, indicates that an array is expected
//     [m] ..... array must have m elements
//     [m-n] ... array must have between m and n elements, inclusive
//     [m-] .... array must have at least m elements
//     [-n] .... array may not have more than n elements
//
// In general, the name portion will either be capitalized, indicating a
// geometric primitive, or lowercase, indicating a Javascript primitive type.
// Currently used pfmt.alternatives are:
//
//     Geometric primitives: Box, Cylinder, Sphere, Triangle, and the Vector*
//         pfmt.alternatives, as well as Primitive for any object with Primitive as its
//         superclass. While not a primitive, SDL functions can be (and
//         sometimes must be) wrapped in an SDLFunction object.
//
//     Javascript primitives: boolean, float, int (the result of
//         Number.floor(someFloat), and string.
//
//     Other: mixed(...|...) indicates any of the parenthesized pfmt.alternatives are valid,
//         e.g., mixed(string|SDLFunction). Single quoted "pfmt.alternatives" indicate a
//         literal string.
//
//         string(...|...) indicates any of the parenthesized literal strings.
//         Unlike with mixed(), the strings are not quoted.
//
//         list(a,b,...) indicates an array with the pfmt.alternatives listed the order in
//         which they must be given.
//
// Many pfmt.alternatives can be submitted in various shorthand forms, parallel to their
// initializers.
//
//     Vector* ... an array with the proper number of floats
//
// You may also pass a function returning the correct type, which will be
// evaluated in the context of the object to which it is assigned. Such
// functions should be free of side effects because they can be called at any
// time by CephaloPOV, not just when outputting SDL.
//
// Finally, strings containing SDL functions may be passed (almost) anywhere it
// is legal to do so in SDL. As a safeguard against type mishaps, those strings
// should begin with '&', which will be stripped before generating output. Since
// CephaloPOV does not presently contain an SDL parser and cannot therefore
// execute SDL functions internally, there are two big caveats:
//
//     1. If the attribute in question is used in calculations while CephaloPOV
//         is running, it will result in a fatal error.
//
//     2. CephaloPOV has no way of checking that the function returns the
//        correct type or even if it is syntactically correct SDL.
//
//==============================================================================

ClassBuilder.prototype.parseTypeFormat = function(fmt) {

    if(this.__ptfCache === undefined) {
        this.__ptfCache = { };
    } else if(this.__ptfCache[fmt] !== undefined) {
        return this.__ptfCache[fmt];
    }


    var result = { };

    var m = fmt.match(/^(@?)([A-Za-z]+)(\(([^\)]+)\))?(\[([-0-9]+)\])?/);
    if(!Array.isArray(m))
        throw new Error("[TypeFormat]: Invalid type format \"" + fmt + "\"");

    result.array        = m[1] == "@" ? true : false;
    result.name         = m[2];
    result.alternatives = m[4];
    result.range        = m[6];
    result.min          = null;
    result.max          = null;
    result.sequence     = null;

    if(result.name == "list") {
        result.sequence = result.alternatives.split(",");
        result.alternatives = null;
    } else if(result.alternatives !== undefined) {
        result.alternatives = result.alternatives.split("|");
    }

    if(result.range) {
        var m = result.range.match(/^([0-9]+)?(-?)([0-9]+)?/);
        result.range = true;
        if(m[2] == "-") {
            result.min = m[1] === undefined ? -Infinity : parseInt(m[1]);
            result.max = m[3] === undefined ? +Infinity : parseInt(m[3]);
        } else {
            result.min = m[1];
            result.max = m[1];
        }
    } else {
        result.range = false;
    }

    this.__ptfCache[fmt] = result;

    return result;
}


//==============================================================================
// Returns a natural-language description of the supplied (parsed) type format.
//==============================================================================

ClassBuilder.prototype.typeFormatDescription = function(fmt) {
    var contents = [];

    var initialVowels = "AEIOUaeiou";
    if(typeof fmt == "string")
        fmt = this.parseTypeFormat(fmt);

    if(fmt.array) {
        contents.push("an array of");
        if(fmt.range) {
            if(fmt.min == fmt.max) {
                contents.push("exactly " + fmt.max);
            } else if(fmt.min == -Infinity) {
                contents.push("up to " + fmt.max);
            } else if(fmt.max == +Infinity) {
                contents.push("at least " + fmt.min);
            } else {
                contents.push(fmt.min + " to " + fmt.max);
            }
        }
    }

    if(fmt.name == "mixed") {

        var tmp = fmt.alternatives.slice(0);
        tmp[tmp.length - 1] = "or " + tmp[tmp.length - 1];

        if(fmt.range) {
            for(var i = 0; i < tmp.length; tmp[i] += "s", i++);
        } else {
            contents.push("a");
        }

        if(tmp.length > 2) {
            contents.push(tmp.join(", "));
        } else {
            contents.push(tmp.join(" "));
        }

    } else if(fmt.name == "string") {
        if(fmt.alternatives) {
            if(fmt.range) {
                contents.push("strings");
            } else {
                contents.push("a string");
            }
            contents.push("containing one of ('" + fmt.alternatives.join("', '") + "')");
        } else {
            contents.push("a string");
        }

    } else if(fmt.name == "list") {

        contents.push("an array of the form [" + fmt.sequence.join(", ") + "]");

    } else {

        if(fmt.array) {
            contents.push(fmt.name + "s");
        } else {
            contents.push((initialVowels.indexOf(fmt.name.substr(0, 1)) == -1 ? "a" : "an") + " " + fmt.name);
        }

    }

    if(fmt.alternatives)
        contents.push("set to one of (" + fmt.alternatives.join(", ") + ")");

    return contents.join(" ");
}


//==============================================================================
// Tests an input value against a type format of the sort used in objDef and its
// siblings. If an error is found, it returns a string to include in the error
// message. Otherwise, it returns false.
//
// And yes, it's a clusterfuck that needs refactoring, but it will work for now.
//
// TODO: Support for initializers, Primitive validator
//
//==============================================================================

/* TODO Verify:


Primitive
SDLFunction
mixed(Sphere|Box)
mixed(string|SDLFunction)

*/


ClassBuilder.prototype.typeFormatTestError = function(fmt, val) {

    if(val === null)
        return false;

    if(typeof fmt == "string")
        var pfmt = this.parseTypeFormat(fmt);
    else
        var pfmt = fmt;

    // Is this an Array, and if so, does it have the correct number of elements?

    if(pfmt.array) {
        if(!Array.isArray(val) || (pfmt.range && (val.length < pfmt.min || val.length > pfmt.max))) {
            return true;
        }
    } else {
        val = [ val ];
    }

    // Actual type and aggregate type tests ------------------------------------

    if(pfmt.name == "float") {

        if(pfmt.alternatives) {

            for(var i = 0; i < pfmt.alternatives.length; i++)
                pfmt.alternatives[i] = parseFloat(pfmt.alternatives[i]);

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && (!this.isFloat(val[i]) || !this.inArray(pfmt.alternatives, val[i]))) {
                    return true;
                }
            }

        } else {

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && !this.isFloat(val[i])) {
                    return true;
                }
            }

        }


    } else if(pfmt.name == "int") {

        if(pfmt.alternatives) {

            for(var i = 0; i < pfmt.alternatives.length; i++)
                pfmt.alternatives[i] = parseFloat(pfmt.alternatives[i]);

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && (!this.isInt(val[i]) || !this.inArray(pfmt.alternatives, val[i]))) {
                    return true;
                }
            }

        } else {

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && !this.isInt(val[i])) {
                    return true;
                }
            }

        }

    } else if(pfmt.name == "string") {

        if(pfmt.alternatives) {

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && (typeof val[i] != "string" || !this.inArray(pfmt.alternatives, val[i]))) {
                    return true;
                }
            }

        } else {

            for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && typeof val[i] != "string") {
                    return true;
                }
            }

        }

	} else if(pfmt.name.substr(0, 6) == "Vector") {

		    for(var i = 0; i < val.length; i++) {
                if(!this.isFunction(val[i]) && val[i].type != pfmt.name) {
                    return true;
                }
            }

    } else if(pfmt.name == "mixed") {

        for(var i = 0; i < val.length; i++) {
            if(val[i] === null                                                                                // null is always valid as a way of emptying a property
                || this.isFunction(val[i])                                                                    // Functions are always valid values
                || (this.inArray(pfmt.alternatives, typeof val[i]))                                           // Okay if the value type matches one of the alternatives.
                || (typeof val[i] == "string" && this.inArray(pfmt.alternatives, "'" + val[i] + "'"))         // Okay if we're looking for one of the string literals and the value matches
                || (this.isInt(val[i]) && this.inArray(pfmt.alternatives, "int"))                             // Okay if we're looking for an int and the value is a whole number
                || (this.isFloat(val[i]) && this.inArray(pfmt.alternatives, "float"))                         // Okay if we're looking for a float and the value is any number
                || this.inArray(pfmt.alternatives, this.prototypeName(val[i]))                                // Okay if the value's prototype name matches one of the alternatives
                || (val[i]._subtype !== undefined && (val[i]._subtype === null || this.inArray(pfmt.alternatives, val[i]._subtype))))  // Okay if the value is a Primitive and the subtype matches one of the alternatives
                continue;
            else
                return true;
        }

    } else if(pfmt.name == "list") {

        val = val[0];

        for(var i = 0; i < val.length; i++) {
            if((val[i] === null                                                                                                  // null is always valid as a way of emptying a property
                || this.isFunction(val[i])                                                                                       // Functions are always valid values
                || (pfmt.sequence[i].substr(0, 1) == "'" && val[i] == pfmt.sequence[i].substr(1, pfmt.sequence[i].length - 2))   // Okay if we're looking for one of the string literals and the value matches
                || (pfmt.sequence[i] == typeof val[i])                                                                           // Okay if the value type matches
                || (this.isInt(val[i]) && pfmt.sequence[i] == "int")                                                             // Okay if we're looking for an int and the value is a whole number
                || (this.isFloat(val[i]) && pfmt.sequence[i] == "float")                                                         // Okay if we're looking for a float and the value is any number
                || (pfmt.sequence[i] == this.prototypeName(val[i]))                                                              // Okay if the prototype matches
                || (val[i]._subtype !== undefined && (val[i]._subtype === null || this.inArray(pfmt.alternatives, val[i]._subtype)))))  // Okay if it's a Primitive and the subtype matches
                continue;
            else
                return true;
        }

    } else {

        for(var i = 0; i < val.length; i++) {
            if(val[i] === null                                       // null is always valid as a way of emptying a property
                || this.isFunction(val[i])                           // Functions are always valid values
                || (pfmt.name == typeof val[i])                      // Okay if the value type matches
                || (pfmt.name == "int" && this.isInt(val[i]))        // Okay if we're looking for an int and the value is a whole number
                || (pfmt.name == "float" && this.isFloat(val[i]))    // Okay if we're looking for a float and the value is any number
                || (pfmt.name == "char" && typeof val[i] == "string" && val[i].length == 1) // Okay if we're looking for a char and the value is a single-character string
                || (pfmt.name == "returnAction" && $CP.returnActions[val[i]] !== undefined) // Okay if a valid returnAction
                || (pfmt.name == "ditherType" && $CP.ditherTypes[val[i]] !== undefined)     // Okay if a valid ditherType
                || (val[i] && pfmt.name == this.prototypeName(val[i]))         // Okay if the prototype matches
                || (val[i]._subtype !== undefined && (val[i]._subtype === null || this.inArray(pfmt.alternatives, val[i]._subtype))))   // Okay if it's a Primitive and the subtype matches
                continue;
            else
                return true;
        }

    }

    return false;
}



//==============================================================================
// Outputs a string with stops * 4 spaces. Used in output formatting.
//==============================================================================

ClassBuilder.prototype.tab = function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//------------------------------------------------------------------------------
// Returns validation code for use in toString().
//------------------------------------------------------------------------------

ClassBuilder.prototype.validator = function(varname, type, stops) {
	var pfmt = this.parseTypeFormat(type);
}


//==============================================================================
// Returns the name of obj's prototype/class.
//==============================================================================

ClassBuilder.prototype.prototypeName = function(obj) {
    return Object.getPrototypeOf(obj).constructor.name;
}

ClassBuilder.prototype.className = ClassBuilder.prototype.prototypeName;


//==============================================================================
// Returns the name of obj's base class.
//==============================================================================

ClassBuilder.prototype.baseClassName = function(obj) {
    return Object.getPrototypeOf(obj.constructor).name;
}


//------------------------------------------------------------------------------
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = this.tab(1);
    var tab2 = this.tab(2);

    // Class opening -----------------------------------------------------------

    src.push("class " + this.name + (this.superclass ? (" extends " + this.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    src.push(tab1 + "constructor(objType, args) {\n"
        + tab2 + "super(args);\n");

    // Fixed properties --------------------------------------------------------

    if(this.fixed) {
        for(var i in this.fixed) {
            src.push(tab2 + "this._" + i + " = " + this.fixed[i] + ";");
        }
    }

    // Mutable properties ------------------------------------------------------

    if(this.mutable) {
        for(var i = 0; i < this.mutable.length; i++) {
            if(this.mutable[i].type.substr(0, 1) == '@') {
                var init = "[ ]";
            } else {
                var init = "null";
            }
            src.push(tab2 + "this._" + this.mutable[i].name + " = " + init + ";");
        }
    }

    src.push(tab1 + "}\n");

    // Accessors and Mutators --------------------------------------------------

    if(this.fixed) {
        for(var i in this.fixed) {
            src.push(
                tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + i + "(val) {\n"
                + tab2 + "throw new TypeError(\"[" + this.name + "]: " + i + " is a read-only property.\");\n"
                + tab1 + "}\n"
            );
        }
    }

    if(this.mutable) {
        for(var i = 0; i < this.mutable.length; i++) {
            var item = this.mutable[i];
            src.push(
                tab1 + "get " + item.name + "() {\n"
                + tab2 + "return this._" + item.name + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + item.name + "(val) {\n"
                + tab2 + "// TODO\n"
                + tab1 + "}\n"
            );
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");

    return src.join("\n");
}


function allTypesAndTests() {
    var types = { };
    var tests = { };

    var table = ClassBuilder.prototype.gsDef;
    for(var section in table) {
        var subset = table[section];
        for(var i = 0; i < subset.length; i++) {
            if(types[subset[i].type] === undefined) {
                types[subset[i].type] = 1;
            } else {
                types[subset[i].type]++;
            }
            if(tests[subset[i].test] === undefined) {
                tests[subset[i].test] = 1;
            } else {
                tests[subset[i].test]++;
            }
        }
    }

    console.log(types);
    console.log(tests);
}


