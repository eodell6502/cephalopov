//==============================================================================
// Legal dither types mapped to textual descriptions.
//==============================================================================

var ditherTypes = {
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

var gsDef = {

    adcBailout:             { type: "float",                  test: ">=0"           },
    ambientLight:           { type: "VectorRGB|VectorSRGB",   test: null            },
    assumedGamma:           { type: "float",                  test: null            },
    charset:                { type: "string(ascii|utf8|sys)", test: null            },
    iridWavelength:         { type: "VectorRGB|VectorSRGB",   test: null            },
    maxIntersections:       { type: "int",                    test: ">=0"           },
    maxTraceLevel:          { type: "int",                    test: ">=0"           },
    mmPerUnit:              { type: "float",                  test: ">=0"           },
    noiseGenerator:         { type: "int(1|2|3)",             test: null            },
    numberOfWaves:          { type: "int",                    test: ">=0"           },
    photon:                 { type: "boolean",                test: null            },
    photonAdcBailout:       { type: "float",                  test: ">=0"           },
    photonAutostop:         { type: "float",                  test: "unitInterval"  },
    photonCount:            { type: "int",                    test: ">=0"           },  // TODO: cannot be used with photonSpacing
    photonExpandThresholds: { type: "list(float,int)",        test: null            },
    photonGather:           { type: "@int[2]",                test: [">=0", "a<=b"] },
    photonJitter:           { type: "float",                  test: null            },
    photonLoadFile:         { type: "string",                 test: "nonempty"      },
    photonMaxTraceLevel:    { type: "int",                    test: ">=0"           },
    photonMedia:            { type: "@float[2]",              test: null            },
    photonRadius:           { type: "@float[4]",              test: null            },
    photonSaveFile:         { type: "string",                 test: "nonempty"      },
    photonSpacing:          { type: "float",                  test: ">0"            }, // TODO: cannot be used with photonCount
    radAdcBailout:          { type: "float",                  test: null            },
    radAlwaysSample:        { type: "boolean",                test: null            },
    radBrightness:          { type: "float",                  test: null            },
    radCount:               { type: "@int[1-2]",              test: ">=1"           },
    radErrorBound:          { type: "float",                  test: null            },
    radGrayThreshold:       { type: "float",                  test: "unitInterval"  },
    radiosity:              { type: "boolean",                test: null            },
    radLowErrorFactor:      { type: "float",                  test: null            },
    radMaximumReuse:        { type: "float",                  test: null            },
    radMaxSample:           { type: "float",                  test: null            },
    radMinimumReuse:        { type: "float",                  test: null            },
    radNearestCount:        { type: "int",                    test: "1-20"          },
    radNormal:              { type: "boolean",                test: null            },
    radPretraceEnd:         { type: "float",                  test: "unitInterval"  },
    radPretraceStart:       { type: "float",                  test: "unitInterval"  },
    radRecursionLimit:      { type: "int",                    test: "1-20"          },
    radSubsurface:          { type: "boolean",                test: null            },
    subRadiosity:           { type: "boolean",                test: null            },
    subSamples:             { type: "@int[2]",                test: null            },
    subsurface:             { type: "boolean",                test: null            },
}
//==============================================================================
// As with objDef and gsDef, ioDef defines the validation params for
// ImageOptions objects.
//==============================================================================

var ioDef = {
    allConsole:            { type: "boolean",                   test: null },
    allFile:               { type: "mixed(boolean|string)",     test: null },
    antialias:             { type: "boolean",                   test: null },
    antialiasDepth:        { type: "int",                       test: "1-9" },
    antialiasGamma:        { type: "float",                     test: null },
    antialiasThreshold:    { type: "float",                     test: ">=0" },
    appendFile:            { type: "boolean",                   test: null },
    bitsPerColor:          { type: "int",                       test: "5-16" },
    bounding:              { type: "boolean",                   test: null },
    boundingMethod:        { type: "int(1|2)",                  test: null },
    boundingThreshold:     { type: "int",                       test: ">=0" },
    bspBaseAccessCost:     { type: "float",                     test: null },
    bspChildAccessCost:    { type: "float",                     test: null },
    bspIsectCost:          { type: "float",                     test: null },
    bspMaxDepth:           { type: "int",                       test: ">0" },
    bspMissChance:         { type: "float",                     test: null },
//  constants:             { type: "",                          test: null },   // not currently planning to implement; not useful in this context
    continueTrace:         { type: "boolean",                   test: null },
    createIni:             { type: "mixed(boolean|string)",     test: "nonempty" },
    debugConsole:          { type: "boolean",                   test: null },
    debugFile:             { type: "mixed(boolean|string)",     test: "nonempty" },
    display:               { type: "boolean",                   test: null },
    displayGamma:          { type: "mixed(float|'sRGB')",       test: null },
    dither:                { type: "boolean",                   test: null },
    ditherMethod:          { type: "ditherType",                test: null },
    endColumn:             { type: "int",                       test: "0-" },
    endRow:                { type: "int",                       test: "0-" },
    exePath:               { type: "string",                    test: "nonempty" },
    fatalConsole:          { type: "boolean",                   test: null },
    fatalErrorCommand:     { type: "string",                    test: "nonempty" },
    fatalErrorReturn:      { type: "returnAction",              test: null },
    fatalFile:             { type: "mixed(boolean|string)",     test: "nonempty" },
    fileGamma:             { type: "mixed(float|'sRGB')",       test: null },
    height:                { type: "int",                       test: ">0", default: 480 },
    highReproducibility:   { type: "boolean",                   test: null },
    includeHeader:         { type: "string",                    test: "nonempty" },
    inputFileName:         { type: "string",                    test: "nonempty" },
    jitter:                { type: "boolean",                   test: null },
    jitterAmount:          { type: "float",                     test: null },
    libraryPath:           { type: "string",                    test: "nonempty" },
    maxImageBufferMemory:  { type: "int",                       test: ">0" },
    outputAlpha:           { type: "boolean",                   test: null },
    outputFileName:        { type: "string",                    test: "nonempty" },
    outputFileType:        { type: "string(B|C|E|H|J|N|P|S|T)", test: null },
    outputToFile:          { type: "boolean",                   test: null },
    palette:               { type: "char",                      test: null },
    pauseWhenDone:         { type: "boolean",                   test: null },
    postFrameCommand:      { type: "string",                    test: "nonempty" },
    postFrameReturn:       { type: "returnAction",              test: null },
    postSceneCommand:      { type: "string",                    test: "nonempty" },
    postSceneReturn:       { type: "returnAction",              test: null },
    preFrameCommand:       { type: "string",                    test: "nonempty" },
    preFrameReturn:        { type: "returnAction",              test: null },
    preSceneCommand:       { type: "string",                    test: "nonempty" },
    preSceneReturn:        { type: "returnAction",              test: null },
    previewEndSize:        { type: "int",                       test: ">0" },
    previewStartSize:      { type: "int",                       test: ">0" },
    quality:               { type: "int",                       test: "0-11" },
    radiosityFileName:     { type: "string",                    test: "nonempty" },
    radiosityFromFile:     { type: "string",                    test: "nonempty" },
    radiosityToFile:       { type: "string",                    test: "nonempty" },
    radiosityVainPretrace: { type: "boolean",                   test: null },
    removeBounds:          { type: "boolean",                   test: null },
    renderBlockSize:       { type: "int",                       test: "4-" },
    renderBlockStep:       { type: "int",                       test: "1-" },
    renderConsole:         { type: "boolean",                   test: null },
    renderFile:            { type: "mixed(boolean|string)",     test: "nonempty" },
    renderPattern:         { type: "int",                       test: "0-5" },
    samplingMethod:        { type: "int",                       test: "1-2" },
    splitUnions:           { type: "boolean",                   test: null },
    startColumn:           { type: "int",                       test: "0-" },
    startRow:              { type: "int",                       test: "0-" },
    statisticConsole:      { type: "boolean",                   test: null },
    statisticFile:         { type: "mixed(boolean|string)",     test: "nonempty" },
    testAbort:             { type: "boolean",                   test: null },
    testAbortCount:        { type: "int",                       test: "1-" },
    userAbortCommand:      { type: "string",                    test: "nonempty" },
    userAbortReturn:       { type: "returnAction",              test: null },
    verbose:               { type: "boolean",                   test: null },
    videoMode:             { type: "char",                      test: null },
    warningConsole:        { type: "boolean",                   test: null },
    warningFile:           { type: "mixed(boolean|string)",     test: "nonempty" },
    warningLevel:          { type: "int(0|5|10)",               test: null },
    width:                 { type: "int",                       test: ">0", default: 640 },
    workThreads:           { type: "int",                       test: "1-512" },
}
//==============================================================================
// Defines the types and validity tests for properties which are common to all
// primitive objects.
//==============================================================================

var objCommon = {
    active:           { type: "boolean",    test: null, default: true },  // CP internal/non-SDL
    baseTransform:    { type: "Matrix",     test: null },  // CP internal/non-SDL
    boundedBy:        { type: "Primitive",  test: null },
    children:         { type: "@Primitive", test: null },  // FIXME: CP internal/non-SDL, list of other primitives for CSG objects
    clippedBy:        { type: "Primitive",  test: null },
    doubleIlluminate: { type: "boolean",    test: null },
    finish:           { type: "Finish",     test: null },
    frameBegin:       { type: "function",   test: null },
    frameEnd:         { type: "function",   test: null },
    hierarchy:        { type: "boolean",    test: null },
    hollow:           { type: "boolean",    test: null },
    id:               { type: "String",     test: "nonempty" }, // CP internal/non-SDL: unique identifier
    interior:         { type: "Interior",   test: null },
    inverse:          { type: "boolean",    test: null },
    material:         { type: "Material",   test: null },
    noImage:          { type: "boolean",    test: null },
    noRadiosity:      { type: "boolean",    test: null },
    noReflection:     { type: "boolean",    test: null },
    normal:           { type: "VectorXYZ",  test: null },
    noShadow:         { type: "boolean",    test: null },
    parent:           { type: "Primitive",  test: null },  // CP internal/non-SDL: ref to parent CSG object
    photons:          { type: "Photons",    test: null },
    radiosity:        { type: "Radiosity",  test: null },
    serial:           { type: "int",        test: null },  // CP internal/non-SDL, read-only
    scene:            { type: "Scene",      test: null },  // CP internal/non-SDL, reference to current scene
    sturm:            { type: "boolean",    test: null },
    texture:          { type: "Texture",    test: null },
    transform:        { type: "Matrix",     test: null },
}

//==============================================================================
// Definitions of parameters for primitive geometric objects.
//
// TODO: "mesh2" needs to be added once I understand it better.
//==============================================================================

var objDef = {

    // TODO: need way to specify special methods, e.g., editing the components array

    blob: {
        fixed: { finite: true, solid: true, csg: false },
        mutable: [
            { name: "components", type: "@mixed(Sphere|Cylinder)[1-]", required: true }
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

    polynomial: {             // this will require better understanding of the
        fixed: { finite: false,     // underlying maths than I currently have to validate solid: true, csg: false },
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

}
//==============================================================================
// All (graphics) output file formats, mapped to textual descriptions.
//==============================================================================

var outputFile = {
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
// List of geometric primitive type names. All primitives are actually
// instances of the Primitive prototype; their "type" in a CP context is the
// name in their _type attribute.
//==============================================================================

var primitives = [ "bicubicPatch", "blob", "box", "camera", "cone", "cubic",
    "cylinder", "difference", "disc", "heightField", "intersection",
    "isoSurface", "juliaFractal", "lathe", "lightSource", "merge", "mesh", "ovus",
    "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
    "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
    "torus", "triangle", "union" ];

//==============================================================================
// All supported return actions mapped to textual descriptions.
//==============================================================================

var returnActions = {
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

var sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
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
// Outputs a string with stops * 4 spaces. Used in output formatting.
//==============================================================================

function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//==============================================================================

function ClassBuilder(name, superclass = null) {
    this.name       = name;
    this.superclass = null;
}


ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = tab(1);
    var tab2 = tab(2);

    // Class opening -----------------------------------------------------------

    src.push("class " + this.name + (this.superclass ? (" extends " + this.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    src.push(
        tab1 + "constructor(...args) {\n"
        + tab2 + "super(args);\n"
        // TODO: custom code
        + tab1 + "}\n";
    );

    // Accessors and Mutators --------------------------------------------------

    // Class closing -----------------------------------------------------------

    src.push("\n}");

    return src.join("\n");
}
