#!/usr/bin/env node

//[of]:LICENSE
//##############################################################################
//# Copyright 2018 Eric O'Dell and subsequent contributors                     #
//#                                                                            #
//# Permission is hereby granted, free of charge, to any person obtaining a    #
//# copy of this software and associated documentation files (the              #
//# "Software"), to deal in the Software without restriction, including        #
//# without limitation the rights to use, copy, modify, merge, publish,        #
//# distribute, sublicense, and/or sell copies of the Software, and to         #
//# permit persons to whom the Software is furnished to do so, subject to      #
//# the following conditions:                                                  #
//#                                                                            #
//# The above copyright notice and this permission notice shall be included    #
//# in all copies or substantial portions of the Software.                     #
//#                                                                            #
//# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS    #
//# OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                 #
//# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.     #
//# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY       #
//# CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,       #
//# TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE          #
//# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                     #
//##############################################################################
//[cf]
//[of]:NOTES/SCRATCH
/*
Prototypes/Classes/Global Objects:----------------------------------------------

$CP                 -- CephaloPOV global object
File()              -- File I/O interface
ConfigObject(type) -- used for global settings and image options
Primitive(type)     -- wraps POV-Ray geometric primitives
VectorColor()
VectorUV()
VectorXY()
VectorXYZ()
VectorXYZW()

Functions/Methods:--------------------------------------------------------------

$CP._typeDescriptionTestDump() -- runs typeFormatDescription against the global objects utilizing type formats.
$CP.baseClassName(obj) -- returns name of obj's base class.
$CP.className(obj) -- returns obj's class name.
$CP.configHandler -- proxy handler for GlobalSettings and ImageOptions as ConfigObjects.
$CP.deg2rad(deg) -- given degrees, returns radians
$CP.factory -- object factory for ConfigObjects.
$CP.fileSerial(template, serial) -- returns filename template with first sequence of %'s replaced by zero-padded serial.
$CP.inArray(a, k) -- returns a boolean indicating whether element k appears in array a.
$CP.isFunctionOrNumber(val, objname, fieldname) -- tests whether val is a function, an &-SDL function, or a number/numeric string.
$CP.parseTypeFormat(fmt) -- parses a type format into a data structure.
$CP.primitiveHandler -- proxy handler for Primitives as ConfigObjects.
$CP.prototypeName(obj) -- returns name of obj's prototype.
$CP.rad2deg(rad) -- given radians, returns degrees
$CP.tab(stops) -- returns a string of 4 x stops spaces.
$CP.typeCoerce(type, val) -- if necessary and possible, converts val into type.
$CP.typeFormatDescription(fmt) -- given a parsed type format, returns a human-language description of it.
$CP.typeFormatTestError(fmt, val) -- given a type format, tests whether val complies with it.
$CP.valueTestError(test, val) -- runs test against val.
$CP.zeroTab(num, pad) -- returns num zero-padded to pad digits.

ConfigObject.proxify(handler) -- wraps object with the a Proxy handler.

Primitive.proxify() -- wraps object with primitiveHandler proxy.


There are a lot of compromises here where convenience is traded for type safety.

* Many parameters can be specified in multiple forms. For example, where a 3D
  vector is required, you can pass either a Vector3D object or a simple [x,y,z]
  JavaScript Array type. It is important to note that the Array will be
  automatically converted into a VectorXYZ by CephaloPOV, so if you read the
  value back, you'll get that instead of the original raw Array.

* In most places where it would be legal to do so in SDL, you can pass a string
  containing a user-defined SDL function. You should only do this where you
  don't expect CephaloPOV to be able to perform calculations with the
  parameter. This may change in the future, but it will require writing a
  parser for SDL functions, so don't hold your breath.

* This creates situations where CP has to assume you know what you're doing and
  cannot check a parameter for validity. So know what you're doing.

* Objects are implemented with a fair amount of ES6 black magic. To make this as
  painless as possible for users, object creation is handled by a factory
  method, $CP.obj(id, type, {named_args})

The underlying code is as generic as possible, in service of which goal the
bulk of the properties of (POV-Ray) objects are implemented in a data structure
that is easily maintainable and extendable. It's not meant to provide for an
exhaustive validation pass that can catch all conceivable errors in the generated
SDL, but it covers the majority of cases adequately.

    finite:   boolean indicating whether the object is finite, null for CSG
              containers because it is undecideable at present
    solid:    boolean indicating whether the object is solid
    csg:      boolean indicating whether the object is a CSG container
    required: ordered array of required arguments containing their names and pfmt.alternatives
    optional: as required, but for optional arguments

For details of the type argument, see the comment above $CP.typeFormatTestError.

It should be noted that the table-driven validation tests are designed to make
the code more compact and maintainable by eliminating tons of boilerplate code.
The tests themselves are not exhaustive, so you can certainly find a way to
break them if you try hard enough.

// Primitives should have handlers for CephaloPOV events.
// { name: "", type: ""},
// list of permitted/relevant object modifiers?
// output spec?









*/


//[cf]
//[of]:TODO
/*

$CP.typeCoerce:
	handle Vectors and simple Matrix types
	incorporate this into the Primitive set handler

Primitive:
    toSDL() -- box, cylinder, sphere, cone, plane
    Implement children, finish, interior, material, normal, parent, photons, pigment, radiosity, texture, transform

Scene
    Come up with generic SDL test include file

Output loop

Matrix
    rotate and skew

----------------

Vector: Allow entire vector to be produced by a JS or SDL function

restoreBaseTransform() / null handling for properties generally

ImageOptions
// TODO: boundingThreshold: convert zero to boolean on output
// TODO: constants: gets special handling
// TODO: endColumn: post check startColumn
// TODO: endRow: post check startRow
// TODO: startColumn: post check endColumn
// TODO: startRow: post check endRow


Docs to HTML
Feature and Maintenance tracks

Material
Texture
Interior
Camera


Cameras cannot be part of CSG unions, so come up with a way to link
a camera to an object so that transformations applied to the object
are automatically applied to the camera.

Node:
    Still operable without special changes in browser


*/
//[cf]

//[of]:% $CP
//##############################################################################
//# $CP is the master CephaloPOV object.
//##############################################################################

var $CP = {
    currentScene:   null,
    objectSerial:   0,
    inputFiles:     [ ],
    quietMode:      false,
    debugMode:      false,
    verbosity:      0,
    sdlIncludes:    { },
    outputBasename: null,
};
//[cf]
//[of]:* DEPENDENCIES
$CP.fs     = require("fs");
$CP.getopt = require("commander");
$CP.chalk  = require("chalk");

//[cf]
//[of]:D $CP.colorsInc
//==============================================================================
// CephaloPOVified versions of the colors from colors.inc.
//
// TODO: Port the SDL color management functions at the end of colors.inc
//==============================================================================

$CP.colorsInc = {
    aquamarine:        [0.439216, 0.858824, 0.576471],
    bakersChoc:        [0.36, 0.20, 0.09],
    black:             [0, 0, 0],
    blue:              [0, 0, 1],
    blueViolet:        [0.62352, 0.372549, 0.623529],
    brass:             [0.71, 0.65, 0.26],
    brightGold:        [0.85, 0.85, 0.10],
    bronze2:           [0.65, 0.49, 0.24],
    bronze:            [0.55, 0.47, 0.14],
    brown:             [0.647059, 0.164706, 0.164706],
    cadetBlue:         [0.372549, 0.623529, 0.623529],
    clear:             [1, 1, 1, 1],
    coolCopper:        [0.85, 0.53, 0.10],
    copper:            [0.72, 0.45, 0.20],
    coral:             [1.0, 0.498039, 0.0],
    cornflowerBlue:    [0.258824, 0.258824, 0.435294],
    cyan:              [0, 1, 1],
    darkBrown:         [0.36, 0.25, 0.20],
    darkGreen:         [0.184314, 0.309804, 0.184314],
    darkOliveGreen:    [0.309804, 0.309804, 0.184314],
    darkOrchid:        [0.6, 0.196078, 0.8],
    darkPurple:        [0.53, 0.12, 0.47],
    darkSlateBlue:     [0.119608, 0.137255, 0.556863],
    darkSlateGray:     [0.184314, 0.309804, 0.309804],
    darkSlateGrey:     [0.184314, 0.309804, 0.309804],
    darkTan:           [0.59, 0.41, 0.31],
    darkTurquoise:     [0.439216, 0.576471, 0.858824],
    darkWood:          [0.52, 0.37, 0.26],
    dimGray:           [0.329412, 0.329412, 0.329412],
    dimGrey:           [0.329412, 0.329412, 0.329412],
    dkGreenCopper:     [0.29, 0.46, 0.43],
    dustyRose:         [0.52, 0.39, 0.39],
    feldspar:          [0.82, 0.57, 0.46],
    firebrick:         [0.556863, 0.137255, 0.137255],
    flesh:             [0.96, 0.80, 0.69],
    forestGreen:       [0.137255, 0.556863, 0.137255],
    gold:              [0.8, 0.498039, 0.196078],
    goldenrod:         [0.858824, 0.858824, 0.439216],
    gray05:            [0.05, 0.05, 0.05],
    gray10:            [0.10, 0.10, 0.10],
    gray15:            [0.15, 0.15, 0.15],
    gray20:            [0.20, 0.20, 0.20],
    gray25:            [0.25, 0.25, 0.25],
    gray30:            [0.30, 0.30, 0.30],
    gray35:            [0.35, 0.35, 0.35],
    gray40:            [0.40, 0.40, 0.40],
    gray45:            [0.45, 0.45, 0.45],
    gray50:            [0.50, 0.50, 0.50],
    gray55:            [0.55, 0.55, 0.55],
    gray60:            [0.60, 0.60, 0.60],
    gray65:            [0.65, 0.65, 0.65],
    gray70:            [0.70, 0.70, 0.70],
    gray75:            [0.75, 0.75, 0.75],
    gray80:            [0.80, 0.80, 0.80],
    gray85:            [0.85, 0.85, 0.85],
    gray90:            [0.90, 0.90, 0.90],
    gray95:            [0.95, 0.95, 0.95],
    gray:              [0.752941, 0.752941, 0.752941],
    grey05:            [0.05, 0.05, 0.05],
    grey10:            [0.10, 0.10, 0.10],
    grey15:            [0.15, 0.15, 0.15],
    grey20:            [0.20, 0.20, 0.20],
    grey25:            [0.25, 0.25, 0.25],
    grey30:            [0.30, 0.30, 0.30],
    grey35:            [0.35, 0.35, 0.35],
    grey40:            [0.40, 0.40, 0.40],
    grey45:            [0.45, 0.45, 0.45],
    grey50:            [0.50, 0.50, 0.50],
    grey55:            [0.55, 0.55, 0.55],
    grey60:            [0.60, 0.60, 0.60],
    grey65:            [0.65, 0.65, 0.65],
    grey70:            [0.70, 0.70, 0.70],
    grey75:            [0.75, 0.75, 0.75],
    grey80:            [0.80, 0.80, 0.80],
    grey85:            [0.85, 0.85, 0.85],
    grey90:            [0.90, 0.90, 0.90],
    grey95:            [0.95, 0.95, 0.95],
    grey:              [0.752941, 0.752941, 0.752941],
    green:             [0, 1, 0],
    greenCopper:       [0.32, 0.49, 0.46],
    greenYellow:       [0.576471, 0.858824, 0.439216],
    grey:              [0.752941, 0.752941, 0.752941],
    huntersGreen:      [0.13, 0.37, 0.31],
    indianRed:         [0.309804, 0.184314, 0.184314],
    khaki:             [0.623529, 0.623529, 0.372549],
    lightBlue:         [0.74902, 0.847059, 0.847059],
    lightGray:         [0.658824, 0.658824, 0.658824],
    lightGrey:         [0.658824, 0.658824, 0.658824],
    lightPurple:       [0.87, 0.58, 0.98],
    lightSteelBlue:    [0.560784, 0.560784, 0.737255],
    lightWood:         [0.91, 0.76, 0.65],
    limeGreen:         [0.196078, 0.8, 0.196078],
    magenta:           [1, 0, 1],
    mandarinOrange:    [0.89, 0.47, 0.20],
    maroon:            [0.556863, 0.137255, 0.419608],
    mediumAquamarine:  [0.196078, 0.8, 0.6],
    mediumBlue:        [0.196078, 0.196078, 0.8],
    mediumForestGreen: [0.419608, 0.556863, 0.137255],
    mediumGoldenrod:   [0.917647, 0.917647, 0.678431],
    mediumOrchid:      [0.576471, 0.439216, 0.858824],
    mediumSeaGreen:    [0.258824, 0.435294, 0.258824],
    mediumSlateBlue:   [0.498039, 0, 1.0],
    mediumSpringGreen: [0.498039, 1.0, 0],
    mediumTurquoise:   [0.439216, 0.858824, 0.858824],
    mediumVioletRed:   [0.858824, 0.439216, 0.576471],
    mediumWood:        [0.65, 0.50, 0.39],
    medPurple:         [0.73, 0.16, 0.96],
    mica:              [0, 0, 0],
    midnightBlue:      [0.184314, 0.184314, 0.309804],
    navy:              [0.137255, 0.137255, 0.556863],
    navyBlue:          [0.137255, 0.137255, 0.556863],
    neonBlue:          [0.30, 0.30, 1.00],
    neonPink:          [1.00, 0.43, 0.78],
    newMidnightBlue:   [0.00, 0.00, 0.61],
    newTan:            [0.92, 0.78, 0.62],
    oldGold:           [0.81, 0.71, 0.23],
    orange:            [1, 0.5, 0.0],
    orangeRed:         [1.0, 0.25, 0],
    orchid:            [0.858824, 0.439216, 0.858824],
    paleGreen:         [0.560784, 0.737255, 0.560784],
    pink:              [0.737255, 0.560784, 0.560784],
    plum:              [0.917647, 0.678431, 0.917647],
    quartz:            [0.85, 0.85, 0.95],
    red:               [1, 0, 0],
    richBlue:          [0.35, 0.35, 0.67],
    salmon:            [0.435294, 0.258824, 0.258824],
    scarlet:           [0.55, 0.09, 0.09],
    seaGreen:          [0.137255, 0.556863, 0.419608],
    semiSweetChoc:     [0.42, 0.26, 0.15],
    sienna:            [0.556863, 0.419608, 0.137255],
    silver:            [0.90, 0.91, 0.98],
    skyBlue:           [0.196078, 0.6, 0.8],
    slateBlue:         [0, 0.498039, 1.0],
    spicyPink:         [1.00, 0.11, 0.68],
    springGreen:       [0, 1.0, 0.498039],
    steelBlue:         [0.137255, 0.419608, 0.556863],
    summerSky:         [0.22, 0.69, 0.87],
    tan:               [0.858824, 0.576471, 0.439216],
    thistle:           [0.847059, 0.74902, 0.847059],
    turquoise:         [0.678431, 0.917647, 0.917647],
    veryDarkBrown:     [0.35, 0.16, 0.14],
    veryLightPurple:   [0.94, 0.81, 0.99],
    violet:            [0.309804, 0.184314, 0.309804],
    violetRed:         [0.8, 0.196078, 0.6],
    vLightGray:        [0.80, 0.80, 0.80],
    vLightGrey:        [0.80, 0.80, 0.80],
    wheat:             [0.847059, 0.847059, 0.74902],
    white:             [1, 1, 1],
    yellow:            [1, 1, 0],
    yellowGreen:       [0.6, 0.8, 0.196078],
};
//[cf]
//[of]:D $CP.ditherTypes
//==============================================================================
// Legal dither types mapped to textual descriptions.
//==============================================================================

$CP.ditherTypes = {
    "B2": "Bayer pattern 2x2",
    "B3": "Bayer pattern 3x3",
    "B4": "Bayer pattern 4x4",
    "D1": "Simple error diffusion 1D",
    "D2": "Simple error diffusion 2D",
    "FS": "Floyd-Steinberg error diffusion"
};
//[cf]
//[of]:D $CP.gsDef
//==============================================================================
// Similar to objDef, gsDef defines the globalSettings parameters in order to
// centralize validation.
//==============================================================================

$CP.gsDef = {

    adcBailout:             { type: "float",                  test: ">=0"           },
    ambientLight:           { type: "VectorColor",            test: null            },
    assumedGamma:           { type: "float",                  test: null            },
    charset:                { type: "string(ascii|utf8|sys)", test: null            },
    iridWavelength:         { type: "VectorColor",            test: null            },
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
    photonMedia:            { type: "list(float,float)",      test: null            },
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
//[cf]
//[of]:D $CP.ioDef
//==============================================================================
// As with objDef and gsDef, ioDef defines the validation params for
// ImageOptions objects.
//==============================================================================

$CP.ioDef = {
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
//  constants:             { type: "",                          test: null },
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
    height:                { type: "int",                       test: ">0" },
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
    width:                 { type: "int",                       test: "1-" },
    workThreads:           { type: "int",                       test: "1-512" },
}
//[cf]
//[of]:D $CP.objCommon
//==============================================================================
// Defines the types and validity tests for properties which are common to all
// primitive objects.
//==============================================================================

$CP.objCommon = {
    active:           { type: "boolean",   test: null },  // CP internal/non-SDL
    baseTransform:    { type: "Matrix",    test: null },  // CP internal/non-SDL
    boundedBy:        { type: "Primitive", test: null },
//  children:         { type: "",          test: null },  // FIXME: CP internal/non-SDL, list of other primitives for CSG objects
    clippedBy:        { type: "Primitive", test: null },
    doubleIlluminate: { type: "boolean",   test: null },
    finish:           { type: "Finish",    test: null },
    hierarchy:        { type: "boolean",   test: null },
    hollow:           { type: "boolean",   test: null },
    interior:         { type: "Interior",  test: null },
    inverse:          { type: "boolean",   test: null },
    material:         { type: "Material",  test: null },
    noImage:          { type: "boolean",   test: null },
    noRadiosity:      { type: "boolean",   test: null },
    noReflection:     { type: "boolean",   test: null },
//  normal:           { type: "",          test: null },  // FIXME
    noShadow:         { type: "boolean",   test: null },
    parent:           { type: "Primitive", test: null },  // CP internal/non-SDL: ref to parent CSG object
//  photons:          { type: "",          test: null },  // FIXME
//  pigment:          { type: "",          test: null },  // FIXME
//  radiosity:        { type: "",          test: null },  // FIXME
    serial:           { type: "int",       test: null },  // CP internal/non-SDL, read-only
    scene:            { type: "Scene",     test: null },  // CP internal/non-SDL, reference to current scene
    sturm:            { type: "boolean",   test: null },
    texture:          { type: "Texture",   test: null },
    transform:        { type: "Matrix",    test: null },
}

//[cf]
//[of]:D $CP.objDef
//==============================================================================
// Definitions of parameters for primitive geometric objects.
//
// TODO: "mesh2" needs to be added once I understand it better.
//==============================================================================

$CP.objDef = {

    blob: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "components", type: "@mixed(Sphere|Cylinder)[1-]" }
        ],
        optional: [
            { name: "threshold", type: "float" },
            { name: "sturm",     type: "boolean" },
            { name: "hierarchy", type: "boolean" },
        ],
    },

    box: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "corner1", type: "VectorXYZ" },
            { name: "corner2", type: "VectorXYZ" }
        ],
        optional: [ ],
    },

    cone: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "basePoint",  type: "VectorXYZ" },
            { name: "baseRadius", type: "float" },
            { name: "capPoint",   type: "VectorXYZ" },
            { name: "capRadius",  type: "float" }
        ],
        optional: [
            { name: "open", type: "boolean" },
        ],
    },

    cylinder: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "basePoint", type: "VectorXYZ" },
            { name: "capPoint",  type: "VectorXYZ" },
            { name: "radius",    type: "float" }
        ],
        optional: [
            { name: "open",     type: "boolean" },
            { name: "strength", type: "float" },    // only used when the cylinder is a blob component
        ],
    },

    heightField: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "source", type: "mixed(string|SDLFunction)" }
        ],
        optional: [
            { name: "hfType",     type: "string(exr|gif|hdr|iff|jpeg|pgm|png|pot|ppm|sys|tga|tiff)" },      // only used source is image instead of function
            { name: "smooth",     type: "boolean" },
            { name: "waterLevel", type: "float"   },
            { name: "hierarchy",  type: "boolean" },
            { name: "gamma",      type: "float"   },
            { name: "premult",    type: "boolean" },
        ],
    },

    isoSurface: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "source", type: "SDLFunction" },
        ],
        optional: [
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
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "type", type: "string(quaternion:sqr|quaternion:cube|hypercomplex:sqr|hypercomplex:cube|hypercomplex:exp|hypercomplex:reciprocal|hypercomplex:sin|hypercomplex:asin|hypercomplex:sinh|hypercomplex:cos|hypercomplex:acos|hypercomplex:cosh|hypercomplex:acosh|hypercomplex:tan|hypercomplex:atan|hypercomplex:tanh|hypercomplex:atanh|hypercomplex:ln|hypercomplex:pwr)" },
        ],
        optional: [
            { name: "power",     type: "VectorXY" },  // needed for hypercomplex:pwr -- come up with default
            { name: "maxIter",   type: "int" },
            { name: "precision", type: "int" },
            { name: "slice",     type: "VectorXYZW" },
            { name: "distance",  type: "float" },
        ],
    },

    lathe: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "type",   type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline)" },
            { name: "points", type: "@VectorXY[2-]" }
        ],
        optional: [
            { name: "sturm", type: "boolean" }
        ],
    },

    lightSource: {
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "location", type: "VectorXYZ" },
            { name: "color",    type: "VectorRGB" },
        ],
        optional: [
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
            { name: "mediaAttenuation", type: ""          }, // TODO
            { name: "mediaInteraction", type: ""          }, // TODO
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
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "bottomRadius", type: "float" },
            { name: "topRadius",    type: "float" },
        ],
        optional: [ ],
    },

    parametric: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "funcX",  type: "SDLFunction" },
            { name: "funcY",  type: "SDLFunction" },
            { name: "funcZ",  type: "SDLFunction" },
            { name: "uv1",    type: "VectorUV" },
            { name: "uv2",    type: "VectorUV" },
        ],
        optional: [
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
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "type",    type: "string(linear_spline|quadratic_spline|cubic_spline|bezier_spline|linear_sweep|conic_sweep)" },
            { name: "height1", type: "float" },
            { name: "height2", type: "float" },
            { name: "points",  type: "@VectorXY" }
        ],
        optional: [
            { name: "open",  type: "boolean" },
            { name: "sturm", type: "boolean" }
        ],
    },

    sphere: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "center", type: "VectorXYZ" },
            { name: "radius", type: "float" },
        ],
        optional: [
            { name: "strength", type: "float" },    // only used when used as a blob component
        ],
    },

    sphereSweep: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "type", type: "string(linear_spline|b_spline|cubic_spline)" },
            { name: "spheres", type: "@Sphere[2-]" },


        ],
        optional: [
            { name: "tolerance", type: "float" }
        ],
    },

    superellipsoid: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "vector", type: "VectorXY" },
        ],
        optional: [ ],
    },

    sor: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "points", type: "@VectorXY[2-]" },
        ],
        optional: [
            { name: "open",  type: "boolean" },
            { name: "sturm", type: "boolean" },
        ],
    },

    text: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "font",        type: "string" },
            { name: "displayText", type: "string" },
            { name: "thickness",   type: "float" },
            { name: "offset",      type: "float" },
        ],
        optional: [ ],
    },

    torus: {
        finite: true,
        solid: true,
        csg: false,
        required: [
            { name: "majorRadius", type: "float" },
            { name: "minorRadius", type: "float" },
        ],
        optional: [
            { name: "sturm",       type: "boolean" },
        ],
    },

    bicubicPatch: {
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "type",  type: "int(0|1)" },
            { name: "points", type: "@VectorXYZ[16]" },
        ],
        optional: [
            { name: "uSteps",   type: "int" },
            { name: "vSteps",   type: "int" },
            { name: "flatness", type: "float" },
        ],
    },

    disc: {
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "center", type: "VectorXYZ" },
            { name: "normal", type: "VectorXYZ" },
            { name: "radius", type: "float" },
        ],
        optional: [
            { name: "holeRadius", type: "float" },
        ],
    },

    mesh: {
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "triangles", type: "@Triangle[1-]" },
        ],
        optional: [
            { name: "insideVector", type: "VectorXYZ" },
            { name: "hierarchy",    type: "boolean" },
        ],
    },

/*

// Deferred pending further research

    mesh2: {
        finite: true,
        solid: false,
        csg: false,
        required: [ ],
        optional: [ ],
    },
*/

    polygon: {
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "points", type: "@VectorXY[3-]" },
        ],
        optional: [ ],
    },

    triangle: {               // combines triangle and smooth_triangle
        finite: true,
        solid: false,
        csg: false,
        required: [
            { name: "corner1", type: "VectorXYZ" },
            { name: "corner2", type: "VectorXYZ" },
            { name: "corner3", type: "VectorXYZ" },
        ],
        optional: [
            { name: "smooth",   type: "boolean" },    // if smooth and normal1...3 are defined, it's a smooth triangle
            { name: "normal1",  type: "VectorXYZ" },
            { name: "normal2",  type: "VectorXYZ" },
            { name: "normal3",  type: "VectorXYZ" },
            { name: "textures", type: "@int" }
        ],
    },

    plane: {
        finite: false,
        solid: true,
        csg: false,
        required: [
            { name: "normal",   type: "VectorXYZ" },
            { name: "distance", type: "float" },
        ],
        optional: [ ],
    },

    poly: {
        finite: false,
        solid: true,
        csg: false,
        required: [
            { name: "coefficients", type: "@float[2-35]" },
        ],
        optional: [
            { name: "sturm", type: "boolean" },
        ],
    },

    cubic: {
        finite: false,
        solid: true,
        csg: false,
        required: [
            { name: "coefficients", type: "@float[20]" },
        ],
        optional: [
            { name: "sturm", type: "boolean" }
        ],
    },

    quartic: {
        finite: false,
        solid: true,
        csg: false,
        required: [
            { name: "coefficients", type: "@float[20]" },
        ],
        optional: [
            { name: "sturm", type: "boolean" }
        ],
    },

    polynomial: {             // this will require better understanding of the
        finite: false,     // underlying maths than I currently have to validate
        solid: true,
        csg: false,
        required: [
            { name: "order", type: "int" },
            { name: "coefficients", type: "@VectorXYZW" }
        ],
        optional: [
            { name: "sturm", type: "boolean" }
        ],
    },

    quadric: {
        finite: false,
        solid: true,
        csg: false,
        required: [
            { name: "a", type: "float" },
            { name: "b", type: "float" },
            { name: "c", type: "float" },
            { name: "d", type: "float" },
            { name: "e", type: "float" },
            { name: "f", type: "float" },
            { name: "g", type: "float" },
            { name: "h", type: "float" },
            { name: "i", type: "float" },
            { name: "j", type: "float" },
        ],
        optional: [ ],
    },

    union: {
        finite: null,
        solid: true,
        csg: true,
        required: [
            { name: "objects", type: "@Primitive" }
        ],
        optional: [
            { name: "splitUnion", type: "boolean" }
        ]
    },

    intersection: {
        finite: null,
        solid: true,
        csg: true,
        required: [
            { name: "objects", type: "@Primitive" }
        ],
        optional: [ ]
    },

    difference: {
        finite: null,
        solid: true,
        csg: true,
        required: [
            { name: "positiveObject", type: "Primitive"   },
            { name: "negativeObjects", type: "@Primitive" }
        ],
        optional: [ ]
    },

    merge: {
        finite: null,
        solid: true,
        csg: true,
        required: [
            { name: "objects", type: "@Primitive" }
        ],
        optional: [ ]
    },

}
//[cf]
//[of]:D $CP.outputFile
//==============================================================================
// All (graphics) output file formats, mapped to textual descriptions.
//==============================================================================

$CP.outputFile = {
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
//[cf]
//[of]:D $CP.primitives
//==============================================================================
// List of geometric primitive type names. All primitives are actually
// instances of the Primitive prototype; their "type" in a CP context is the
// name in their _type attribute.
//==============================================================================

$CP.primitives = [ "bicubicPatch", "blob", "box", "cone", "cubic",
    "cylinder", "difference", "disc", "heightField", "intersection",
    "isoSurface", "juliaFractal", "lathe", "merge", "mesh", "ovus",
    "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
    "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
    "torus", "triangle", "union" ];

//[cf]
//[of]:D $CP.returnActions
//==============================================================================
// All supported return actions mapped to textual descriptions.
//==============================================================================

$CP.returnActions = {
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
//[cf]
//[of]:D $CP.sdlKeywords
//==============================================================================
// List of SDL keywords.
//==============================================================================

$CP.sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
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
//[cf]

//[of]:F $CP.baseClassName(obj)
//==============================================================================
// Returns the name of obj's base class.
//==============================================================================

$CP.baseClassName = function(obj) {
    return Object.getPrototypeOf(obj.constructor).name;
}
//[cf]
//[of]:F $CP.className(obj)
//==============================================================================
// Returns the name of obj's class.
//==============================================================================

$CP.className = function(obj) {
    return obj.constructor.name;
}
//[cf]
//[of]:F $CP.deg2rad(deg)
//==============================================================================
// Given an angle in degrees, returns its equivalent in radians.
//==============================================================================

$CP.deg2rad = function(deg) {
    return deg * (Math.PI / 180);
}
//[cf]
//[of]:F $CP.errmsg(src, msg, severity, color)
//==============================================================================
// Generic console error message interface. Will not produce output if quiet
// mode is set.
//
// Output format is "[src]: msg"
//
// The severity arg can be one of "error", "warn", "info", or "debug". The
// default is "error".
//==============================================================================

$CP.errmsg = function(src, msg, severity) {
    if($CP.quietMode)
        return;

    var message = "[" + src + "]: " + msg;

    if(severity === undefined)
        severity = "info";

    switch(severity) {
        case "error":
            console.log($CP.chalk.bgRed.yellowBright(message));
            break;
        case "warn":
            console.log($CP.chalk.bgYellow.black(message));
            break;
        case "info":
            if($CP.verbosity)
                console.log($CP.chalk.greenBright(message));
            break;
        case "debug":
            if($CP.debugMode)
                console.log(message);
            break;
    }
}
//[cf]
//[of]:F $CP.factory(type, ...args)
//==============================================================================
// The object factory.
//==============================================================================

$CP.factory = function(type, ...args) {

    var origType = type;
    if($CP.objDef[type] !== undefined)
        type = "Primitive";


    switch(type) {

        case "VectorUV":
        case "VectorXY":
        case "VectorXYZ":
        case "VectorXYZW":
        case "VectorRGB":
        case "VectorSRGB":

            var subtype = type.substr(6);
            var obj = new Vector(subtype, args[0]).proxify();

            break;

        case "Matrix":

            if(args[0] == "scale" || args[0] == "translate") {
                var obj = new Matrix(args[0], args[1], args[2], args[3])
            } else if(args[0] == "rotate") {
                // TODO
            } else if(args[0] == "skew") {
                // TODO
            } else {
                var obj = new Matrix(args[0], args[1], args[2], args[3], args[4],
                    args[5], args[6], args[7], args[8], args[9], args[10], args[11]);
            }

            break;

        case "Primitive":

            if($CP.currentScene === null)
                throw new Error("[Primitive]: Objects cannot be instantiated without a current scene.");

            if(!$CP.inArray($CP.primitives, origType))
                throw new TypeError("[CEPHALOPOV]: Unknown primitive type '" + origType + "'. Legal values are: " + $CP.primitives.join(", ") + ".");

            var obj = new Primitive(origType).proxify();

            for(var i = 0; i < $CP.objDef[origType].required.length; i++) {
                obj[$CP.objDef[origType].required[i].name] = null;
            }
            for(var i = 0; i < $CP.objDef[origType].optional.length; i++) {
                obj[$CP.objDef[origType].optional[i].name] = null;
            }

            obj.serial = $CP.objectSerial++;
            obj.scene  = $CP.currentScene;
            obj.active = true;

            $CP.currentScene.addObject(obj);

            break;

        case 'GlobalSettings':

            var obj = new ConfigObject(type);

            for(var k in $CP.gsDef)
                obj._val[k] = null;
            obj = obj.proxify();
            break;

        case 'ImageOptions':

            var obj = new ConfigObject(type);
            for(var k in $CP.ioDef)
                obj._val[k] = null;
            obj = obj.proxify();
            break;

        case 'Scene':

            var obj = new Scene();
            break;

        default:
            throw new TypeError("[CEPHALOPOV]: The factory does not support type '" + type + "'.");
            break;

    }

    // TODO: walk args

    return obj;
}
//[cf]
//[of]:F $CP.fileSerial(template, serial)
//==============================================================================
// Given a filename template, replaces the first contiguous sequence of '%' with
// serial zero-padded to the same length.
//==============================================================================

$CP.fileSerial = function(template, serial) {
    return template.replace(/%+/, function(match) { return this.zeroPad(serial, match.length); });
}
//[cf]
//[of]:F $CP.forceVector(type, arg)
//==============================================================================
// Given a vector type, e.g., "VectorXYZ" and a valid initializer (array or
// object), returns a new vector. If arg is already a vector, the reference is
// returned instead, unless it is the wrong type of vector, in which case a
// TypeError is thrown.
//==============================================================================

$CP.forceVector = function(type, arg) {
    
    if($CP.prototypeName(arg) == "Vector") {
        if(arg.type == type)
            return arg;
        else
            throw new TypeError("[CEPHALOPOV]: " + arg.type + " passed where " + type + " expected.");
    }
    
    return $CP.factory(type, arg);
    
}
//[cf]
//[of]:F $CP.inArray(a, k)
//==============================================================================
// Returns a boolean indicating whether value k is in array a.
//==============================================================================

$CP.inArray = function(a, k) {
    if(a.length !== undefined)
        for(var i = 0; i < a.length; i++)
            if(a[i] === k)
                return true;
    return false;
}
//[cf]
//[of]:F $CP.init()
//==============================================================================
// CephaloPOV main loop.
//==============================================================================

$CP.init = function() {

    $CP.getopt
        .version("0.1.0")
        .option("-i, --input <file>", "input file (can be used multiple times)", function(val, memo) { memo.push(val); return memo; }, $CP.inputFiles)
        .option("-o, --output [name]", "output base name", function(v) { $CP.outputBasename = v.trim(); })
        .option("-s, --sdl <name>", "include SDL file (can be used multiple times)", function(val, memo) { memo[val] = null; return memo; }, $CP.sdlIncludes)
        .option("-D, --debug", "enable debugging mode", function() { $CP.debugMode = true; })
        .option("-v, --verbose", "increase verbosity", function() { return ++$CP.verbosity; })
        .option("-Q, --quiet", "suppress terminal output")
        .parse(process.argv);

    // Load SDL include files --------------------------------------------------

    for(var filename in $CP.sdlIncludes) {
        try {
            var file = new File(filename, "r");
        } catch(e) {
            $CP.errmsg("INIT", "Unable to open SDL include file '" + filename + "'.", "error");
            return;
        }
        $CP.sdlIncludes[filename] = file.read();
    }

    // Put $CP and other objects into global scope -----------------------------

    global.$CP = $CP;

    // Load and execute user programs ------------------------------------------

    if($CP.inputFiles.length == 0) {
        $CP.errmsg("INIT", "No input file(s) specified.", "error");
        return;
    }

    // TODO: Right now, these are loaded and executed immediately in sequence.
    // It may be useful to some people to load all files first and then hit a
    // single entry point.

    for(var i = 0; i < $CP.inputFiles.length; i++) {
        var prog = require($CP.inputFiles[i]);
    }
}
//[cf]
//[of]:F $CP.isFloat(val)
//==============================================================================
//==============================================================================

$CP.isFloat = function(val) {
    return (typeof val == "number") ? true : false;
}
//[cf]
//[of]:F $CP.isFunction(val)
//==============================================================================
//==============================================================================

$CP.isFunction = function(val) {
    return (typeof val == "function" || (typeof val == "string" && val.substr(0, 1) == "&")) ? true : false;
}
//[cf]
//[of]:F $CP.isFunctionOrBoolean(val, objname, fieldname)
//==============================================================================
// Tests whether val is a function, a &-prefixed SDL function, or a boolean.
// Returns the possibly val on success. On error, it throws a TypeError
// exception using objname for the standard prefix.
//==============================================================================

$CP.isFunctionOrNumber = function(val, objname, fieldname) {
    if(typeof val == "function")
        return val;
    if(typeof val == "string") {
        if(val.substr(0, 1) == "&")
            return val;
    }
    if(typeof val == "boolean")
        return val;

    throw new TypeError("[" + objname + "]: " + fieldname + " must be a boolean or a function returning a boolean.");
}
//[cf]
//[of]:F $CP.isFunctionOrNumber(val, objname, fieldname)
//==============================================================================
// Tests whether val is a function, a &-prefixed SDL function, or a number/
// numeric string. Returns the (possibly coerced) value on success. On error,
// it throws a TypeError exception using objname for the standard prefix.
//==============================================================================

$CP.isFunctionOrNumber = function(val, objname, fieldname) {
    if(typeof val == "function")
        return val;
    if(typeof val == "string") {
        if(val.substr(0, 1) == "&")
            return val;
        val = parseFloat(val);
        if(!isNaN(val))
            return val;
    }
    if(typeof val == "number")
        return val;

    throw new TypeError("[" + objname + "]: " + fieldname + " must be a number or a function returning a number.");
}
//[cf]
//[of]:F $CP.isInt(val)
//==============================================================================
//==============================================================================

$CP.isInt = function(val) {
    return (typeof val == "number" && val == Math.floor(val)) ? true : false;
}
//[cf]
//[of]:F $CP.materialize(val)
//==============================================================================
// If val is a function, returns its result. If val is a string containing an
// SDL function, i.e., it begins with "&", returns the naked SDL code. Otherwise
// returns val unchanged.
//==============================================================================

$CP.materialize = function(val) {
    if(typeof val == "function") {
        return val();
    } else if(typeof val == "string" && val.substr(0, 1) == "&") {
        return val.substr(1);
    } else {
        return val;
    }
}
//[cf]
//[of]:F $CP.parseTypeFormat(fmt)
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

$CP.parseTypeFormat = function(fmt) {

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
//[cf]
//[of]:F $CP.prototypeName(obj)
//==============================================================================
// Returns the name of obj's prototype.
//==============================================================================

$CP.prototypeName = function(obj) {
    return Object.getPrototypeOf(obj).constructor.name;
}
//[cf]
//[of]:F $CP.rad2deg(rad)
//==============================================================================
// Given an angle in radians, returns its equivalent in degrees.
//==============================================================================

$CP.rad2deg = function(rad) {
    return rad * (180 / Math.PI);
}
//[cf]
//[of]:F $CP.tab(stops)
//==============================================================================
// Outputs a string with stops * 4 spaces. Used in output formatting.
//==============================================================================

$CP.tab = function(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}
//[cf]
//[of]:F $CP.typeCoerce(type, val)
//==============================================================================
// Given a type name and a value, typeCoerce does the following:
//
//     1. If val is a JavaScript function (which we assume returns the
//        correct type), it is returned unaltered.
//     2. If val is a string beginning with "&", it is treated as an SDL
//        function and returned unaltered. (The "&" is stripped before output.)
//     3. If val is already of the correct type, it is returned unaltered.
//     4. If val is of a type that can be converted into the correct type, e.g.,
//        converting an array of three floats into a VectorXYZ, returns the
//        converted version. The object constructor is expected to perform the
//        conversion. If no such object prototype or class exists, a
//        RangeError is thrown.
//     5. If none of the above apply, throws a TypeError whose message is
//        intended for display to the user.
//==============================================================================

$CP.typeCoerce = function(type, val) {

    if((typeof val == "function")                                        // Javascript function
        || (typeof val == "string" && val.substr(0, 1) == "&")           // SDL function
        || (this.prototypeName(val) == "Primitive" && val.type == type)  // Primitive pseudo-subclass
        || (this.prototypeName(val) == type))                            // Object class
        return val;

    if(window[type] === undefined || typeof window[type] != "function")
        throw new RangeError("[CEPHALOPOV]: Internal error in $CP.typeCoerce.");

    var result;

    if(type == "string") {

		if(val.toSDL === undefined)
        	result = val.toString();
        else
        	result = val.toSDL();

    } else if(type == "int") {

        result = parseInt(val);
        if(isNaN(result)) {
            throw new RangeError("Unable to coerce " + val + " to int.");
        }

    } else if(type == "float") {

        result = parseFloat(val);
        if(isNaN(result)) {
            throw new RangeError("Unable to coerce " + val + " to float.");
        }

    } else if(type == "boolean") {

        result = val ? true : false;
        
    } else if(window[this.prototypeName(val)] !== undefined && typeof window[this.prototypeName(val)] == "function") {

        try {
            result = new window[this.prototypeName(val)](val);
        } catch(e) {
            throw e;
        }

    }

    return result;

}
//[cf]
//[of]:F $CP.typeFormatDescription(fmt)
//==============================================================================
// Returns a natural-language description of the supplied (parsed) type format.
//==============================================================================

$CP.typeFormatDescription = function(fmt) {
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
//[cf]
//[of]:F $CP.typeFormatTestError(fmt, val)
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


$CP.typeFormatTestError = function(fmt, val) {

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
//[cf]
//[of]:F $CP.valueTestError(test, val)
//==============================================================================
// Parses the test and applies it to val, returning false if no error and a
// string to be used in the error message if an error is found. Both test and
// val may be arrays. Available tests are:
//
//     "5-16", "4-", "-4" ... min-max ranges, inclusive
//     "nonempty" ........... tests a string for contents
//     "unitInterval" ....... 0.0-1.0
//     ">n" ................. greater than n
//     ">=n" ................ greater than or equal to n
//     "a<n" ................ absolute value less than n
//     "a<=b" ............... val[0] <= val[1]
//     null ................. no test
//==============================================================================

$CP.valueTestError = function(test, val) {

    if(test == null)
        return false;

    if(!Array.isArray(test))
        test = [ test ];
    if(!Array.isArray(val))
        val = [ val ];

    for(var t = 0; t < test.length; t++) {

        if(test[t] == "nonempty") {

            for(var v = 0; v < val.length; v++) {
                val[v] = val[v].toString();
                if(val[v].length == 0)
                    return "cannot be empty";
            }

        } else if(test[t] == "unitInterval") {

            for(var v = 0; v < val.length; v++) {
                val[v] = parseFloat(val[v]);
                if(val[v] < 0 || val[v] > 1)
                    return "must be in the unit interval 0.0-1.0";
            }

        } else if(test[t] == "a<=b") {

            if(!(val[0] <= val[1]))
                return "must be in ascending order by value";

        } else {

            var m = test[t].match(/^([0-9]+)?-([0-9]+)?/);
            if(m !== null) {
                var min = m[1] === undefined ? -Infinity : parseFloat(m[1]);
                var max = m[2] === undefined ? +Infinity : parseFloat(m[2]);

                for(var v = 0; v < val.length; v++) {
                    if(val[v] < min)
                        return "must be greater than or equal to " + min;
                    if(val[v] > max)
                        return "must be less than or equal to " + max;
                }
                continue;
            }

            var m = test[t].match(/^([a=<>]+)([0-9]+)/);
            if(m !== null) {
                var cmp = parseFloat(m[2]);
                for(var v = 0; v < val.length; v++) {
                    switch(m[1]) {
                        case ">":
                            if(!(val[v] > cmp))
                                return "must be greater than " + cmp;
                            break;
                        case ">=":
                            if(!(val[v] >= cmp))
                                return "must be greater than or equal to " + cmp;
                            break;
                        case "<":
                            if(!(val[v] < cmp))
                                return "must be less than " + cmp;
                            break;
                        case "<=":
                            if(!(val[v] >= cmp))
                                return "must be greater than or equal to " + cmp;
                            break;
                        case "a<":
                            if(!(Math.abs(val[v]) < cmp))
                                return "'s absolute value must be less than " + cmp;
                            break;
                        default:
                            throw new Error("[CEPHALOPOV]: Internal error in $CP.valueTestError");
                            break;
                    }
                }
                continue;
            }

            throw new Error("[CEPHALOPOV]: Internal error in $CP.valueFormatError");

        }

    }

    return false;
}
//[cf]
//[of]:F $CP.zeroPad(num, pad)
//==============================================================================
// Left-pads num with zeroes until it is pad characters wide. Does nothing if
// num is already greater than pad characters long.
//==============================================================================

$CP.zeroPad = function(num, pad) {
    var result = num.toString().split('');
    while(result.length < pad)
        result.unshift('0');
    return result.join('');
}
//[cf]

//[of]:% File(path, mode)
//==============================================================================
// File I/O wrappers. CephaloPOV doesn't do anything fancy with files presently,
// so just basic open, read, write, and close are supported. Other functionality
// will be added as needed.
//
//     path   ... full path to file
//     mode ..... the usual stdio modes, "r", "w", "a", etc.
//     serial ... Optional. If supplied, the first instance of /0+/ in the
//                filename will be replaced by this integer value, padded to
//                the same number of characters.
//
//==============================================================================

function File(path, mode, serial) {
    this.path   = path;
    this.mode   = mode;
    this.serial = serial === undefined ? null : serial;
    this.open   = false;
    this.handle = null;

    if(this.serial !== null) {
        var parts = this.path.split(/[\/\\]/);
        var match = parts[parts.length - 1].match(/0+/);
        if(match !== null) {
            parts[parts.length - 1] = parts[parts.length - 1].replace(/0+/, $CP.zeroPad(this.serial, match[0].length));
        }
        this.path = parts.join("/");
    }

    this.handle = $CP.fs.openSync(this.path, this.mode);
    if(this.handle)
        this.open = true;
}
//[cf]
//[of]:F File.read()
//------------------------------------------------------------------------------
// Pulls the complete contents currently.

File.prototype.read = function() {
    if(!this.open)
        throw new Error("[File.read]: No file is currently open.");
    return $CP.fs.readFileSync(this.handle).toString();
}
//[cf]
//[of]:F File.write(data)
File.prototype.write = function(data) {
    if(!this.open)
        throw new Error("[File.write]: No file is currently open.");
    $CP.fs.writeFileSync(this.handle, data);
}
//[cf]
//[of]:F File.close()
File.prototype.close = function() {
    $CP.fs.closeSync(this.handle);
    this.open   = false;
    this.handle = null;
}
//[cf]

//[of]:% ConfigObject(type)
//==============================================================================
// The ConfigObject type represents -- with help from a Proxy -- k/v config
// sets like ImageOptions and GlobalSettings.
//==============================================================================

function ConfigObject(type) {
    this._type    = type;
    this._subtype = null;
    this._val     = { };

    switch(type) {
        case "ImageOptions":
            this._defs = $CP.ioDef;
            break;
        case "GlobalSettings":
            this._defs = $CP.gsDef;
            break;
        default:
            throw new TypeError("[CEPHALOPOV]: ConfigObject type '" + type + "' does not exist.");
            break;
    }

}
//[cf]
//[of]:D ConfigObject.handler
//==============================================================================
// ConfigObject.prototype.handler provides the proxy handlers for
// GlobalSettings and ImageOptions as ConfigObjects, eliminating the need for
// an enormous amount of boilerplate accessor method and input validation code.
//==============================================================================

ConfigObject.prototype.handler = {
    get: function(target, property, receiver) {
        if(target._val[property] === undefined)
            return target[property];
        else
            return target._val[property];
    },
    set: function(target, property, value, receiver) {
        if(target._val[property] === undefined) {
            throw new ReferenceError("[" + target._type + "]: " + property + " is not a valid property.");
        } else {
            if($CP.typeFormatTestError(target._defs[property].type, value))
                throw new TypeError("[" + target._type + "]: " + property + " must be " + $CP.typeFormatDescription(target._defs[property].type));
            var msg;
            if(msg = $CP.valueTestError(target._defs[property].test, value))
                throw new RangeError("[" + target._type + "]: " + property + " " + msg);
            target._val[property] = value;
            return value;
        }

    },
}
//[cf]
//[of]:F ConfigObject.ioValidate()
//==============================================================================
// Performs some aggregate tests on the final state of the image options, and
// if none are found, returns an object containing two members, ini and cli,
// corresponding to the contents of the ini file and the commandline version,
// respectively.
//==============================================================================

ConfigObject.prototype.ioValidate = function() {
    var ini     = [];
    var cli     = [];
    var iniWarn = [];
    var cliWarn = [];

    for(var opt in $CP.ioDef) {

        if(opt != "Width" && opt != "Height" && this[opt] === null)
            continue;

        switch(opt) {
            case "allConsole":
                if(this.allFile === null) {
                    ini.push("All_Console=" + this.allConsole);
                    cli.push((this.allConsole ? "+" : "-") + "GA");
                }
                break;
            case "allFile":
                ini.push("All_File=" + this.allFile);
                cli.push(
                    (this.allConsole === null || this.allConsole === false ? "-" : "+")
                    + "GA"
                    + (typeof this.allFile == "string" ? this.allFile : "")
                );
                break;
            case "antialias":
                ini.push("Antialias=" + (this.antialias ? "true" : "false"));
                if(this.antialiasThreshold === null) {
                    cli.push((this.antialias ? "+" : "-") + "A");
                }
                break;
            case "antialiasDepth":
                ini.push("Antialias_Depth=" + this.antialiasDepth);
                cli.push("+R" + this.antialiasDepth);
                break;
            case "antialiasGamma":
                ini.push("Antialias_Gamma=" + this.antialiasGamma);
                cli.push("+AG" + this.antialiasGamma);
                break;
            case "antialiasThreshold":
                ini.push("Antialias_Threshold=" + this.antialiasThreshold);
                cli.push((this.antialias ? "+" : "-") + "A" + this.antialiasThreshold);
                break;
            case "appendFile":
                ini.push("Append_File=" + (this.appendFile ? "true" : "false"));
                cli.push((this.appendFile ? "+" : "-") + "GP");
                break;
            case "bitsPerColor":
                ini.push("Bits_Per_Color=" + this.bitsPerColor);
                break;
            case "bounding":
                ini.push("Bounding=" + (this.bounding ? "true" : "false"));
                if(this.boundingThreshold === null) {
                    cli.push((this.bounding ? "+" : "-") + "MB");
                };
                break;
            case "boundingMethod":
                ini.push("Bounding_Method=" + this.boundingMethod);
                cli.push("+BM" + this.boundingMethod);
                break;
            case "boundingThreshold":
                ini.push("Bounding_Threshold=" + this.boundingThreshold);
                cli.push(
                    (this.bounding !== null || this.bounding ? "+" : "-")
                    + "MB" + this.boundingThreshold
                );
                break;
            case "bspBaseAccessCost":
                ini.push("BSP_BaseAccessCost=" + this.bspBaseAccessCost);
                break;
            case "bspChildAccessCost":
                ini.push("BSP_ChildAccessCost=" + this.bspChildAccessCost);
                break;
            case "bspIsectCost":
                ini.push("BSP_IsectCost=" + this.bspIsectCost);
                break;
            case "bspMaxDepth":
                ini.push("BSP_MaxDepth=" + this.bspMaxDepth);
                break;
            case "bspMissChance":
                ini.push("BSP_MissChance=" + this.bspMissChance);
                break;
            case "constants":
                break;
            case "continueTrace":
                ini.push("Continue_Trace=" + this.continueTrace);
                cli.push(this.continueTrace ? "+C" : "-C");
                break;
            case "createIni":
                if(typeof this.createIni == "boolean") {
                    ini.push("Create_Ini=" + (this.createIni ? "true" : "false"));
                } else {
                    ini.push("Create_Ini=" + this.createIni);
                    cli.push("+GI" + this.createIni);
                }
                break;
            case "debugConsole":
                if(this.allConsole === null)
                    ini.push("Debug_Console=" + this.debugConsole);
                if(this.debugFile === null && this.allFile === null)
                    cli.push((this.debugConsole ? "+" : "-") + "GD");
                break;
            case "debugFile":
                if(this.optAllFile === null) {
                    ini.push("Debug_File=" + this.debugFile);
                    cli.push(
                        (this.debugConsole === null || this.debugConsole === false ? "-" : "+")
                        + "GD"
                        + (typeof this.debugFile == "string" ? this.debugFile : "")
                    );
                }
                break;
            case "display":
                ini.push("Display=" + (this.display ? "true" : "false"));
                if(this.videoMode === null)
                    cli.push(this.display ? "+D" : "-D");
                break;
            case "displayGamma":
                ini_push("Display_Gamma=" + this.displayGamma);
                break;
            case "dither":
                ini.push("Dither=" + (this.dither ? "true" : "false"));
                if(this.ditherMethod === null)
                    cli.push((this.dither ? "+" : "-") + "TH");
                break;
            case "ditherMethod":
                ini.push("Dither_Method=" + this.ditherMethod);
                cli.push((this.dither ? "+" : "-") + "TH" + this.ditherMethod);
                break;
            case "endColumn":
                ini.push("End_Column=" + this.endColumn);
                cli.push("+EC" + this.endColumn);
                break;
            case "endRow":
                ini.push("End_Row=" + this.endRow);
                cli.push("+ER" + this.endRow);
                break;
            case "fatalConsole":
                if(this.allConsole === null)
                        ini.push("Fatal_Console=" + this.fatalConsole);
                if(this.fatalFile === null && this.allFile === null)
                    cli.push((this.fatalConsole ? "+" : "-") + "GF");
                break;
            case "fatalErrorCommand":
                ini.push("Fatal_Error_Command=" + this.fatalErrorCommand);
                break;
            case "fatalErrorReturn":
                ini.push("Fatal_Error_Return=" + this.fatalErrorReturn);
                break;
            case "fatalFile":
                if(this.optAllFile === null) {
                    ini.push("Fatal_File=" + this.fatalFile);
                    cli.push(
                        (this.fatalConsole === null || this.fatalConsole === false ? "-" : "+")
                        + "GF"
                        + (typeof this.fatalFile == "string" ? this.fatalFile : "")
                    );
                }
                break;
            case "fileGamma":
                ini.push("File_Gamma=" + this.fileGamma);
                break;
            case "height":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Height=" + this.height);
                cli.push("+H" + this.height);
                break;
            case "highReproducibility":
                ini.push("High_Reproducibility=" + (this.highReproducibility ? "true" : "false"));
                if(this.highReproducibility)
                    cli.push("+HR");
                break;
            case "includeHeader":
                ini.push("Include_Header=" + this.includeHeader);
                cli.push("+HI" + this.includeHeader);
                break;
            case "inputFileName":
                ini.push("Input_File_Name=" + this.inputFileName);
                cli.push("+I" + this.inputFileName);
                break;
            case "jitter":
                ini.push("Jitter=" + (this.jitter ? "true" : "false"));
                if(this.jitterAmount === null) {
                    cli.push((this.jitter ? "+" : "-") + "J");
                }
                break;
            case "jitterAmount":
                ini.push("Jitter_Amount=" + this.jitterAmount);
                cli.push((this.jitterAmount > 0 ? "+" : "-" ) + "J" + this.jitterAmount);
                break;
            case "libraryPath":
                ini.push("Library_Path=" + this.libraryPath);
                cli.push("+L" + this.libraryPath);
                break;
            case "maxImageBufferMemory":
                ini.push("Max_Image_Buffer_Memory=" + this.maxImageBufferMemory);
                cli.push("+MI" + this.maxImageBufferMemory);
                break;
            case "outputAlpha":
                ini.push("Output_Alpha=" + (this.outputAlpha ? "true" : "false"));
                cli.push((this.outputAlpha ? "+" : "-") + "UA");
                break;
            case "outputFileName":
                ini.push("Output_File_Name=" + this.outputFileName);
                cli.push("+O" + this.outputFileName);
                break;
            case "outputFileType":
                ini.push("Output_File_Type=" + this.outputFileType);
                cli.push(
                    ((this.outputToFile === null || this.outputToFile === false) ? "-" : "+")
                    + this.outputFileType
                    + (this.bitsPerColor === null ? "" : this.bitsPerColor)
                );
                break;
            case "outputToFile":
                if(this.outputFileType === null) {
                    ini.push("Output_to_File=" + (this.outputToFile ? "true" : "false"));
                    cli.push(this.outputToFile ? "+F" : "-F");
                }
                break;
            case "palette":
                ini.push("Palette=" + this.palette);
                if(this.videoMode !== null)
                    cli.push(
                        (this.display ? "+" : "-")
                        + "D"
                        + this.videoMode + this.palette
                    );
                break;
            case "pauseWhenDone":
                ini.push("Pause_When_Done=" + (this.pauseWhenDone ? "true" : "false"));
                cli.push(this.pauseWhenDone ? "+P" : "-P");
                break;
            case "postFrameCommand":
                ini.push("Post_Frame_Command=" + this.postFrameCommand);
                break;
            case "postFrameReturn":
                ini.push("Post_Frame_Return=" + this.postFrameReturn);
                break;
            case "postSceneCommand":
                ini.push("Post_Scene_Command=" + this.postSceneCommand);
                break;
            case "postSceneReturn":
                ini.push("Post_Scene_Return=" + this.postSceneReturn);
                break;
            case "preFrameCommand":
                ini.push("Pre_Frame_Command=" + this.preFrameCommand);
                break;
            case "preFrameReturn":
                ini.push("Pre_Frame_Return=" + this.preFrameReturn);
                break;
            case "preSceneCommand":
                ini.push("Pre_Scene_Command=" + this.postSceneCommand);
                break;
            case "preSceneReturn":
                ini.push("Pre_Scene_Return=" + this.preSceneReturn);
                break;
            case "previewEndSize":
                if(this.previewStartSize !== null) {
                    ini.push("Preview_End_Size=" + this.previewEndSize);
                    cli.push("+EP" + this.previewEndSize);
                }
                break;
            case "previewStartSize":
                ini.push("Preview_Start_Size=" + this.previewStartSize);
                cli.push("+SP" + this.previewStartSize);
                break;
            case "quality":
                ini.push("Quality=" + this.quality);
                cli.push("+Q" + this.quality);
                break;
            case "radiosityFileName":
                ini.push("Radiosity_File_Name=" + this.radiosityFileName);
                cli.push("+RF" + this.radiosityFileName);
                break;
            case "radiosityFromFile":
                ini.push("Radiosity_From_File=" + (this.radiosityFromFile ? "true" : "false"));
                if(this.radiosityFromFile)
                    cli.push("+RFI");
                break;
            case "radiosityToFile":
                ini.push("Radiosity_To_File=" + (this.radiosityToFile ? "true" : "false"));
                if(this.radiosityToFile)
                    cli.push("+RFO");
                break;
            case "radiosityVainPretrace":
                ini.push("Radiosity_Vain_Pretrace=" + (this.radiosityVainPretrace ? "true" : "false"));
                cli.push(this.radiosityVainPretrace ? "+RVP" : "-RVP");
                break;
            case "removeBounds":
                ini.push("Remove_Bounds=" + (this.removeBounds ? "true" : "false"));
                cli.push((this.removeBounds ? "+" : "-") + "UR");
                break;
            case "renderBlockSize":
                ini.push("Render_Block_Size=" + this.renderBlockSize);
                cli.push("+BS" + this.renderBlockSize);
                break;
            case "renderBlockStep":
                ini.push("Render_Block_Step=" + this.renderBlockStep);
                cli.push("+RS" + this.renderBlockStep);
                break;
            case "renderConsole":
                if(this.allConsole === null)
                    ini.push("Render_Console=" + this.renderConsole);
                if(this.renderFile === null && this.allFile === null)
                    cli.push((this.renderConsole ? "+" : "-") + "GR");
                    break;
            case "renderFile":
                if(this.optAllFile === null) {
                    ini.push("Render_File=" + this.renderFile);
                    cli.push(
                        (this.renderConsole === null || this.renderConsole === false ? "-" : "+")
                        + "GR"
                        + (typeof this.renderFile == "string" ? this.renderFile : "")
                    );
                }
                break;
            case "renderPattern":
                ini.push("Render_Pattern=" + this.renderPattern);
                cli.push("+RP" + this.renderPattern);
                break;
            case "samplingMethod":
                ini.push("Sampling_Method=" + this.samplingMethod);
                cli.push("+AM" + this.samplingMethod);
                break;
            case "splitUnions":
                ini.push("Split_Unions=" + (this.splitUnions ? "true" : "false"));
                cli.push((this.splitUnions ? "+" : "-") + "SU");
                break;
            case "startColumn":
                ini.push("Start_Column=" + this.startColumn);
                cli.push("+SC" + this.startColumn);
                break;
            case "startRow":
                ini.push("Start_Row=" + this.startRow);
                cli.push("+SR" + this.startRow);
                break;
            case "statisticConsole":
                if(this.allConsole === null)
                    ini.push("Statistic_Console=" + this.statisticConsole);
                if(this.statisticFile === null && this.allFile === null)
                    cli.push((this.statisticConsole ? "+" : "-") + "GS");
                break;
            case "statisticFile":
                if(this.optAllFile === null) {
                    ini.push("Statistic_File=" + this.statisticFile);
                    cli.push(
                        (this.statisticConsole === null || this.statisticConsole === false ? "-" : "+")
                        + "GS"
                        + (typeof this.statisticFile == "string" ? this.statisticFile : "")
                    );
                }
                break;
            case "testAbort":
                if(this.testAbortCount !== null) {
                    ini.push("Test_Abort=" + (this.testAbort ? "true" : "false"));
                    cli.push(this.testAbort ? "+X" : "-X");
                }
                break;
            case "testAbortCount":
                ini.push("Test_Abort_Count=" + this.testAbortCount);
                if(this.testAbort !== null)
                    cli.push((this.testAbort ? "+" : "-") + "X" + this.testAbortCount)
                else
                    cli.push("+X" + this.testAbortCount);
                break;
            case "userAbortCommand":
                ini.push("User_Abort_Command=" + this.userAbortCommand);
                break;
            case "userAbortReturn":
                ini.push("User_Abort_Return=" + this.userAbortReturn);
                break;
            case "verbose":
                ini.push("Verbose=" + (this.verbose ? "true" : "false"));
                cli.push(this.verbose ? "+V" : "-V");
                break;
            case "videoMode":
                ini.push("Video_Mode=" + this.videoMode);
                if(this.palette === null)
                    cli.push((this.videoMode ? "+" : "-") + "D" + this.videoMode);
                break;
            case "warningConsole":
                if(this.allConsole === null)
                    ini.push("Warning_Console=" + this.warningConsole);
                if(this.warningFile === null && this.allFile === null)
                    cli.push((this.warningConsole ? "+" : "-") + "GW");
                break;
            case "warningFile":
                if(this.optAllFile === null) {
                    ini.push("Warning_File=" + this.warningFile);
                    cli.push(
                        (this.warningConsole === null || this.warningConsole === false ? "-" : "+")
                        + "GW"
                        + (typeof this.warningFile == "string" ? this.warningFile : "")
                    );
                }
                break;
            case "warningLevel":
                ini.push("Warning_Level=" + this.warningLevel);
                cli.push("+WL" + this.warningLevel);
                break;
            case "width":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Width=" + this.width);
                cli.push("+W" + this.width);
                break;
            case "workThreads":
                ini.push("Work_Threads=" + this.workThreads);
                cli.push("+WT" + this.workThreads);
                break;
            default:
                break;
        }
    }

    cli.unshift(this.exePath === null ? "povray" : this.exePath);

    return { ini: ini.join("\n"), cli: cli.join(" ") };

}
//[cf]
//[of]:F ConfigObject.proxify()
//==============================================================================
// Wraps the ConfigObject in a Proxy using ConfigObject.handler and returns
// the Proxy.
//==============================================================================

ConfigObject.prototype.proxify = function() {
    return new Proxy(this, this.handler);
}

//[cf]
//[of]:F ConfigObject.toCLI()
//==============================================================================
// Wrapper around the validate method to return only the CLI string.
//==============================================================================

ConfigObject.prototype.toCLI = function() {

    if(this._type == "GlobalSettings")
        throw new TypeError("[ConfigObject]: toCLI is a method for ImageOptions, not GlobalSettings. Did you mean toSDL?");

    return this.ioValidate()["cli"];
}
//[cf]
//[of]:F ConfigObject.toFileContents()
//==============================================================================
// Wrapper around the validate method to return only the .ini file contents.
//==============================================================================

ConfigObject.prototype.toIniFile = function() {

    if(this._type == "GlobalSettings")
        throw new TypeError("[ConfigObject]: toIniFile is a method for ImageOptions, not GlobalSettings. Did you mean toSDL?");

    return this.ioValidate()["ini"];

}

//[cf]
//[of]:F ConfigObject.toSDL()
//==============================================================================
// Returns the SDL for the object *if* the type is GlobalSettings. (ImageOptions
// produces either commandline flags or the contents of a .ini file, neither of
// which is SDL.) Unlike other toSDL methods, this one does not take a stops
// argument because the SDL global_settings declaration always happens at the
// top level.
//==============================================================================

ConfigObject.prototype.toSDL = function() {
    var contents = [ ];

    if(this._type == "ImageOptions")
        throw new TypeError("[ConfigObject]: toSDL is a method for GlobalSettings, not ImageOptions. Did you mean toCLI or toFileContents?");

    contents.push("global_settings {");

    var params = {
        adcBailout: "adc_bailout",
        ambientLight: "ambient_light",
        assumedGamma: "assumed_gamma",
        iridWavelength: "irid_wavelength",
        charset: "charset",
        maxIntersections: "max_intersections",
        maxTraceLevel: "max_trace_level",
        mmPerUnit: "mm_per_unit",
        numberOfWaves: "number_of_waves",
        noiseGenerator: "noise_generator"
    };

    var radParams = {
        radAdcBailout: "adc_bailout",
        radAlwaysSample: "always_sample",
        radBrightness: "brightness",
        radCount: "count",
        radErrorBound: "error_bound",
        radGrayThreshold: "gray_threshold",
        radLowErrorFactor: "low_error_factor",
        radMaxSample: "max_sample",
        radMaximumReuse: "maximum_reuse",
        radMinimumReuse: "minimum_reuse",
        radNearestCount: "nearest_count",
        radNormal: "normal",
        radPretraceStart: "pretrace_start",
        radPretraceEnd: "pretrace_end",
        radRecursionLimit: "recursion_limit",
        radSubsurface: "subsurface"
    };

    var subParams = {
        subRadiosity: "radiosity",
        subSamples: "samples"
    };

    var photonParams = {
        photonSpacing: "spacing",
        photonCount: "count",
        photonGather: "gather",
        photonMedia: "media",
        photonJitter: "jitter",
        photonMaxTraceLevel: "max_trace_level",
        photonAdcBailout: "adc_bailout",
        photonSaveFile: "save_file",
        photonLoadFile: "load_file",
        photonAutostop: "autostop",
        photonExpandThresholds: "expand_thresholds",
        photonRadius: "radius"
    };

    for(var i in params) {
        if(this[i] !== null)
            contents.push("    " + params[i] + " " + this[i]);
    }

    if(this.radiosity) {
        contents.push("    radiosity {");
        for(var i in radParams) {
            if(this[i] !== null)
                contents.push("        " + radParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    if(this.subsurface) {
        contents.push("    subsurface {");
        for(var i in subParams) {
            if(this[i] !== null)
                contents.push("        " + subParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    if(this.photon) {
        contents.push("    photon {");
        for(var i in photonParams) {
            if(this[i] !== null)
                contents.push("        " + photonParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    contents.push("}");

    return contents.join("\n");
}
//[cf]

//[of]:% Matrix
//==============================================================================
// These floats specify the elements of a 4 by 4 matrix with the fourth column
// implicitly set to <0,0,0,1>

// https://www.shipbrook.net/jeff/raytrace/matrix.html

// 00 01 02 xx  |  (00) YX  ZX  [0]   [] = implicit
// 10 11 12 xx  |   XY (11) ZY  [0]   () = scale xyz from top left
// 20 21 22 xx  |   XZ  YZ (22) [0]   {} = translate xyz from left
// 30 31 32 xx  |  {30}{31}{32} [1]   AB = skew A coord relative to B coord

// Rotation order: X axis, Y axis, Z axis
// Rotation involves trig funcs; see reference above

// Scale relative to origin                      }
// Rotations are relative to the axis            } normal order
// Translations are relative to current position }

// http://www.geocities.ws/evilsnack/matrix.html  (addl resources on parent page)

function Matrix(v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32) {

    this._v00 = this._v01 = this._v02 = this._v10 = this._v11 = this._v12
        = this._v20 = this._v21 = this._v22 = this._v30 = this._v31
        = this._v32 = 0;

    if(v00 == "scale") {

        this.v00 = v01; // x
        this.v11 = v02; // y
        this.v22 = v10; // z

    } else if(v00 == "rotate") {

        // TODO

    } else if(v00 == "translate") {

        this.v00 = this.v11 = this.v22 = 1; // scale identity

        this.v30 = v01; // x
        this.v31 = v02; // y
        this.v32 = v10; // z

    } else if(v00 == "skew") {

        // TODO

    } else {

        this.v00 = v00;
        this.v01 = v01;
        this.v02 = v02;
        this.v10 = v10;
        this.v11 = v11;
        this.v12 = v12;
        this.v20 = v20;
        this.v21 = v21;
        this.v22 = v22;
        this.v30 = v30;
        this.v31 = v31;
        this.v32 = v32;

    }
}

//[cf]
//[of]:F Matrix.v00-v32
//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v00", {
    get: function() {
        return typeof this._v00 == "function" ? this._v00() : this._v00;
    },
    set: function(val) {
        this._v00 = $CP.isFunctionOrNumber(val, "Matrix", "v00");
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v01", {
    get: function() {
        return typeof this._v01 == "function" ? this._v01() : this._v01;
    },
    set: function(val) {
        this._v01 = $CP.isFunctionOrNumber(val, "Matrix", "v01")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v02", {
    get: function() {
        return typeof this._v02 == "function" ? this._v02() : this._v02;
    },
    set: function(val) {
        this._v02 = $CP.isFunctionOrNumber(val, "Matrix", "v02");
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v10", {
    get: function() {
        return typeof this._v10 == "function" ? this._v10() : this._v10;
    },
    set: function(val) {
        this._v10 = $CP.isFunctionOrNumber(val, "Matrix", "v10")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v11", {
    get: function() {
        return typeof this._v11 == "function" ? this._v11() : this._v11;
    },
    set: function(val) {
        this._v11 = $CP.isFunctionOrNumber(val, "Matrix", "v11")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v12", {
    get: function() {
        return typeof this._v12 == "function" ? this._v12() : this._v12;
    },
    set: function(val) {
        this._v12 = $CP.isFunctionOrNumber(val, "Matrix", "v12")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v20", {
    get: function() {
        return typeof this._v20 == "function" ? this._v20() : this._v20;
    },
    set: function(val) {
        this._v20 = $CP.isFunctionOrNumber(val, "Matrix", "v20")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v21", {
    get: function() {
        return typeof this._v21 == "function" ? this._v21() : this._v21;
    },
    set: function(val) {
        this._v21 = $CP.isFunctionOrNumber(val, "Matrix", "v21")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v22", {
    get: function() {
        return typeof this._v22 == "function" ? this._v22() : this._v22;
    },
    set: function(val) {
        this._v22 = $CP.isFunctionOrNumber(val, "Matrix", "v22")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v30", {
    get: function() {
        return typeof this._v30 == "function" ? this._v30() : this._v30;
    },
    set: function(val) {
        this._v30 = $CP.isFunctionOrNumber(val, "Matrix", "v30")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v31", {
    get: function() {
        return typeof this._v31 == "function" ? this._v31() : this._v31;
    },
    set: function(val) {
        this._v31 = $CP.isFunctionOrNumber(val, "Matrix", "v31")
    }
});

//-----------------------------------------------------------------------------

Object.defineProperty(Matrix.prototype, "v32", {
    get: function() {
        return typeof this._v32 == "function" ? this._v32() : this._v32;
    },
    set: function(val) {
        this._v32 = $CP.isFunctionOrNumber(val, "Matrix", "v32")
    }
});
//[cf]
//[of]:F Matrix.apply(obj)
//------------------------------------------------------------------------------
// Multiplies obj by this, changing obj in place.
//------------------------------------------------------------------------------

Matrix.prototype.apply = function(obj) {
    if(obj.transform === undefined)
        throw new TypeError("[Matrix]: Target object has no transform member.");
    obj.transform = this.xMatrix(obj.transform);
}
//[cf]
//[of]:F Matrix.copy() [TODO]

//[cf]
//[of]:F Matrix.toSDL(stops)
Matrix.prototype.toSDL = function(stops) {
    var pad = $CP.tab(stops);

    return pad + "matrix <" + $CP.materialize(this.v00) + ", " + $CP.materialize(this.v01) + ", " + $CP.materialize(this.v02) + "\n"
        + pad + "    " + $CP.materialize(this.v10) + ", " + $CP.materialize(this.v11) + ", " + $CP.materialize(this.v12) + "\n"
        + pad + "    " + $CP.materialize(this.v20) + ", " + $CP.materialize(this.v21) + ", " + $CP.materialize(this.v22) + "\n"
        + pad + "    " + $CP.materialize(this.v30) + ", " + $CP.materialize(this.v31) + ", " + $CP.materialize(this.v32) + ">";
}
//[cf]
//[of]:F Matrix.xMatrix(that)
Matrix.prototype.xMatrix = function(that) {
    return new Matrix(
        /* v00 */ (this.v00 * that.v00 + this.v01 * that.v10 + this.v02 * that.v20),
        /* v01 */ (this.v00 * that.v01 + this.v01 * that.v11 + this.v02 * that.v21),
        /* v02 */ (this.v00 * that.v02 + this.v01 * that.v12 + this.v02 * that.v22),
        /* v10 */ (this.v10 * that.v00 + this.v11 * that.v10 + this.v12 * that.v20),
        /* v11 */ (this.v10 * that.v01 + this.v11 * that.v11 + this.v12 * that.v21),
        /* v12 */ (this.v10 * that.v02 + this.v11 * that.v12 + this.v12 * that.v22),
        /* v20 */ (this.v20 * that.v00 + this.v21 * that.v10 + this.v22 * that.v20),
        /* v21 */ (this.v20 * that.v01 + this.v21 * that.v11 + this.v22 * that.v21),
        /* v22 */ (this.v20 * that.v02 + this.v21 * that.v12 + this.v22 * that.v22),
        /* v30 */ (this.v30 * that.v00 + this.v31 * that.v10 + this.v32 * that.v20 + that.v30),
        /* v31 */ (this.v30 * that.v01 + this.v31 * that.v11 + this.v32 * that.v21 + that.v31),
        /* v32 */ (this.v30 * that.v02 + this.v31 * that.v12 + this.v32 * that.v22 + that.v32)
    );
}
//[cf]
//[of]:F Matrix.xPoint(point)
Matrix.prototype.xPoint = function(point) {
    return new VectorXYZ(
        this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
        this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
        this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
    );
}
//[cf]

//[of]:% Primitive(type)
//==============================================================================
// The Primitive type serves, along with the primitiveHandler proxy, as a
// wrapper around POV geometric object types.
//==============================================================================

function Primitive(type) {

    this._type    = "Primitive";
    this._subtype = type;
    this._val     = { };
    this._uval    = { };
    this._defs    = $CP.objDef[type];

}
//[cf]
//[of]:D Primitive.handler
//==============================================================================
// Primitive.prototype.handler provides the proxy handlers for the geometric
// Primitive type.
//==============================================================================

Primitive.prototype.handler = {

    get: function(target, property, receiver) {
        switch(property) {
            case "ptype":
                return target._subtype;
            case "solid":
                return target._defs.solid;
            case "finite":
                return target._defs.finite;
            case "csg":
                return target._defs.csg;
            case "toSDL":
                return target.toSDL;
            default:
                if(target._val[property] !== undefined)
                    return (typeof target._val[property] == "function" ? target._val[property]() : target._val[property]);
                else if(target._uval[property] !== undefined)
                    return (typeof target._uval[property] == "function" ? target._uval[property]() : target._uval[property]);
                else if(target[property] !== undefined)
                    return target[property];
                else
                    return undefined;
        }
    },

    set: function(target, property, value, receiver) {

        if(property == "ptype" || property == "solid" || property == "finite" || property == "csg" || property == "toSDL")
            throw new Error("[Primitive." + target._subtype + "]: " + property + " is read-only.");

        var type = target.propertyType(property);
        var test = target.propertyTest(property);
        var errmsg;

        if(type) {

            if($CP.typeFormatTestError(type, value))
                throw new TypeError("[Primitive." + target._subtype + "]: " + property + " must be " + $CP.typeFormatDescription(type) + ".");

            if(test != null && (errmsg = $CP.valueTestError(test, value)))
                throw new RangeError("[Primitive." + target._subtype + "]: " + property + errmsg + ".");

            if(property == "transform") {
                if(target._val.baseTransform === undefined) {
                    target._val.baseTransform = value;
                } else {
                    if($CP.isFunction(value) || $CP.isFunction(target._val.baseTransform)) {
                        target._val.transform = value;
                    } else if(target._val.transform === undefined) {
                        target._val.transform = target._val.baseTransform.xMatrix(value);
                    } else {
                        target._val.transform = target._val.transform.xMatrix(value);
                    }
                }
            } else {
                target._val[property] = value;
            }

        } else {
            target._uval[property] = value;
        }

        return value;
    },

}
//[cf]
//[of]:F Primitive.commonToSDL(stops)
Primitive.prototype.commonToSDL = function(stops = 0) {

    var pad = $CP.tab(stops);
    var contents = [ ];

    if(this.clippedBy !== undefined && this.clippedBy !== null) {
        contents.push(pad + "clipped_by {");
        contents.push(this.clippedBy.toSDL(stops + 1));
        contents.push(pad + "}");
    }

    if(this.boundedBy !== undefined && this.boundedBy !== null) {
        contents.push(pad + "bounded_by {");
        if(this.boundedBy === this.clippedBy) {
            contents.push(pad + "    clipped_by");
        } else {
            contents.push(this.boundedBy.toString(stops + 1));
        }
        contents.push(pad + "}");
    }

    if(this.noShadow)
        contents.push(pad + "no_shadow");

    if(this.noImage)
        contents.push(pad + "no_image");

    if(this.noRadiosity)
        contents.push(pad + "no_radiosity");

    if(this.noReflection)
        contents.push(pad + "no_reflection");

    if(this.inverse)
        contents.push(pad + "inverse");

    if(this.sturm)
        contents.push(pad + "sturm");

    if(this.hierarchy)
        contents.push(pad + "hierarchy");

    if(this.double_illuminate)
        contents.push(pad + "double_illuminate");

    if(this.hollow)
        contents.push(pad + "hollow");

    // TODO: interior
    // TODO: interior_texture
    // TODO: pigment
    // TODO: normal
    // TODO: finish
    // TODO: photons
    // TODO: radiosity

    if(this.transform !== undefined && this.transform !== null)
        contents.push(pad + this.transform.toSDL(stops + 1));

    return contents.join("\n");
}

//[cf]
//[of]:F Primitive.proxify()
//==============================================================================
// Returns the Primitive wrapped in the necessary proxy.
//==============================================================================

Primitive.prototype.proxify = function() {
    return new Proxy(this, this.handler);
}

//[cf]
//[of]:F Primitive.propertyTest(property)
//==============================================================================
// Returns the test of a (non-user-created) geometric primitive parameter. If it
// does not exist, null is returned.
//==============================================================================

Primitive.prototype.propertyTest = function(property) {
    for(var i = 0; i < this._defs.required.length; i++)
        if(this._defs.required[i].name == property && this._defs.required[i].test !== undefined)
            return this._defs.required[i].type;
    for(var i = 0; i < this._defs.optional.length; i++)
        if(this._defs.optional[i].name == property && this._defs.optional[i].test !== undefined)
            return this._defs.optional[i].type;
    if($CP.objCommon[property] !== undefined)
        return $CP.objCommon[property].test;
    return null;
}
//[cf]
//[of]:F Primitive.propertyType(property)
//==============================================================================
// Returns the type of a (non-user-created) geometric primitive parameter. If it
// does not exist, boolean false is returned.
//==============================================================================

Primitive.prototype.propertyType = function(property) {
    for(var i = 0; i < this._defs.required.length; i++)
        if(this._defs.required[i].name == property)
            return this._defs.required[i].type;
    for(var i = 0; i < this._defs.optional.length; i++)
        if(this._defs.optional[i].name == property)
            return this._defs.optional[i].type;
    if($CP.objCommon[property] !== undefined)
        return $CP.objCommon[property].type;
    return false;
}
//[cf]
//[of]:F Primitive.toSDL(stops) [WIP]
//==============================================================================
// Output to SDL happens here, mostly in a giant switch statement. The one
// exception is the output of parameters which are common to nearly all of the
// primitives, which is found in the commonSDL method.
//==============================================================================

Primitive.prototype.toSDL = function(stops = 0) {

    var pad     = $CP.tab(stops);
    var ppad    = $CP.tab(stops + 1);
    var content = [ ];

    switch(this.ptype) {

        case "bicubicPatch": //-------------------------------------------------
            // TODO
            break;

        case "blob": //---------------------------------------------------------
            // TODO
            break;

        case "box": //----------------------------------------------------------

            content.push(pad + "box {");
            content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "cone": //---------------------------------------------------------

            content.push(pad + "cone {");
            content.push(ppad + this.basePoint + ", " + this.baseRadius + ", " + this.capPoint + ", " + this.capRadius);
            if(this.open)
                content.push(pad + "    open");
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "cubic": //--------------------------------------------------------
            // TODO
            break;

        case "cylinder": //-----------------------------------------------------

            content.push(pad + "cylinder {");
            content.push(ppad + this.basePoint + ", " + this.capPoint + ", " + this.radius);
            if(this.open)
                content.push(pad + "    open");
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "disc": //--------------------------------------------------------

            content.push(pad + "disc {");
            content.push(ppad + this.center + ", " + this.normal + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "difference": //--------------------------------------------------

            content.push(pad + "difference {");
            content.push(ppad + this._positiveObject.toString(stops + 1));
            for(var i = 0; i < this._negativeObjects.length; i++) {
                content.push(ppad + this._negativeObjects[i].toString(stops + 1));
            }
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "heightField": //--------------------------------------------------

            content.push(pad + "height_field {");
            if(this._userFunc !== null) {
                content.push(pad + "    function FieldResolution_X, FieldResolution_Y { " + this.userFunc + " }");
            } else if(this._filename !== null) {
                content.push(
                    ppad
                    + (this.hfType === null ? "" : (this.hfType + " "))
                    + '"' + this.filename + '" '
                    + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
                    + (this.premultiplied === null ? "" : (this.premultiplied ? "on" : "off"))
                );
            } else {
                throw new Error("[HeightField]: Neither filename nor userFunc is defined.");
            }
            if(this.smooth === true)
                content.push(pad + "    smooth");
            if(this.waterLevel !== null)
                content.push(pad + "    water_level " + this._waterLevel);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "intersection": //-------------------------------------------------

            content.push(pad + "intersection {");
            for(var i = 0; i < this._objects.length; i++) {
                content.push(ppad + this._objects[i].toString(stops + 1));
            }
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "isoSurface": //---------------------------------------------------
            // TODO
            break;

        case "juliaFractal": //-------------------------------------------------
            // TODO
            break;

        case "lathe": //--------------------------------------------------------
            // TODO
            break;

        case "merge": //--------------------------------------------------------

            content.push(pad + "merge {");
            for(var i = 0; i < this._objects.length; i++) {
                content.push(ppad + this._objects[i].toString(stops + 1));
            }
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "mesh":
            // TODO
            break;

        case "mesh2":
            // TODO
            break;

        case "ovus": //---------------------------------------------------------

            content.push(pad + "ovus {");
            content.push(ppad + this.topRadius + ", " + this.bottomRadius);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "parametric":
            // TODO
            break;

        case "plane": //--------------------------------------------------------

            content.push(pad + "sphere {");
            content.push(ppad + this.center + ", " + this.radius);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "poly":
            // TODO
            break;

        case "polygon":
            // TODO
            break;

        case "polynomial":
            // TODO
            break;

        case "prism":
            // TODO
            break;

        case "quadric":
            // TODO
            break;

        case "quartic":
            // TODO
            break;

        case "sphere": //-------------------------------------------------------

            content.push(pad + "sphere {");
            content.push(ppad + this.center + ", " + this.radius);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "sphereSweep":
            // TODO
            break;

        case "superellipsoid":
            // TODO
            break;

        case "sor":
            // TODO
            break;

        case "text":
            // TODO
            break;

        case "torus": //--------------------------------------------------------

            content.push(pad + "torus {");
            content.push(ppad + this.majorRadius + ", " + this.minorRadius);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "triangle": //-----------------------------------------------------

            content.push(pad + "triangle {");
            content.push(ppad + this.corner1 + ", " + this.corner2 + ", " + this.corner3);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "union": //--------------------------------------------------------

            content.push(pad + "merge {");
            for(var i = 0; i < this._objects.length; i++) {
                content.push(ppad + this._objects[i].toString(stops + 1));
            }
            content.push(pad + "    split_union " + (this._splitUnion ? "on" : "off"));
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        case "smoothTriangle": //-----------------------------------------------

            content.push(pad + "smooth_triangle {");
            content.push(ppad
                + this.corner1 + ", " + this.normal1 + ", "
                + this.corner2 + ", " + this.normal2 + ", "
                + this.corner3 + ", " + this.normal3);
            content.push(this.commonToSDL(stops + 1));
            content.push(pad + "}");
            break;

        default: //-------------------------------------------------------------

            throw new Error("[CEPHALOPOV]: Unknown primitive object type '" + this.ptype + "'.");
            break;

    }

    return content.join("\n");

}
//[cf]

//[of]:% Scene
//==============================================================================
// The Scene object is a container for the various objects in a scene, as well
// as internal bookkeeping data.
//==============================================================================

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

function Scene() {
    this._objSerial      = 0;                     // Incremented for each new object
    this._objDict        = { };                   // Maps serials to their objects
    this._imageOptions   = $CP.factory("ImageOptions");
    this._globalSettings = $CP.factory("GlobalSettings");
    this._frame          = 0;                     // Current frame number
    this._activeCamera   = null;
    this._baseName       = null;                  // If set, this becomes the base name for all output files

    if($CP.currentScene === null)
        $CP.currentScene = this;
}

//------------------------------------------------------------------------------

Object.defineProperty(Scene.prototype, "baseName", {
    get: function() {
        return this._baseName;
    },
    set: function(val) {
        if(typeof val != "string" || val.length == 0)
            throw new TypeError("[Scene]: basename must be a non-empty string.");
        this._baseName = val;
    }
});

//------------------------------------------------------------------------------

Object.defineProperty(Scene.prototype, "frame", {
    get: function() {
        return this._frame;
    },
    set: function(val) {
        throw new Error("[Scene]: The frame attribute is read-only.");
    }
});

//------------------------------------------------------------------------------

Object.defineProperty(Scene.prototype, "globalSettings", {
    get: function() {
        return this._globalSettings;
    },
    set: function(val) {
        if($CP.prototypeName(val) !== "GlobalSettings")
            throw new TypeError("[Scene]: globalSettings must be an GlobalSettings object.");
        this._globalSettings = val;
    }
});

//------------------------------------------------------------------------------

Object.defineProperty(Scene.prototype, "imageOptions", {
    get: function() {
        return this._imageOptions;
    },
    set: function(val) {
        if($CP.prototypeName(val) !== "ImageOptions")
            throw new TypeError("[Scene]: imageOptions must be an ImageOptions object.");
        this._imageOptions = val;
    }
});



//[cf]
//[of]:F Scene.addObject(obj)
Scene.prototype.addObject = function(obj) {
    this._objDict[obj.serial] = obj;
}
//[cf]
//[of]:F Scene.makeCurrent()
Scene.prototype.makeCurrent = function() {
    $CP.currentScene = this;
}
//[cf]
//[of]:F Scene.nextFrame()
Scene.prototype.nextFrame = function() {
    this._frame++;
    // TODO: Call object prepare callbacks
    // TODO: Call object update callbacks
}
//[cf]

//[of]:F Vector(type, args)
function Vector(type, args) {

    if(typeof type != "string")
        throw new TypeError("[Vector]: type must be a string in the set (UV, XY, XYZ, XYZW, RGB, SRGB)");

    type = type.toLocaleUpperCase();

    if(this._def[type] === undefined)
        throw new TypeError("[Vector]: type must be a string in the set (UV, XY, XYZ, XYZW, RGB, SRGB)");

    this._type = type;
    this._val  = [ ];
    this._uval = [ ];


    for(var i = 0; i < this._def[type].max; i++) {
        this._val.push(null);
    }

    if(args === undefined) {

        return;

    } else if(Array.isArray(args)) {

        var min = this._def[type].min;
        var max = this._def[type].max;

        if(args.length < min || args.length > max) {
            throw new RangeError("[Vector" + type + "]: When initialized with an array, the array must have "
                + ( min == max ? ("exactly " + min ) : (min + " to " + max)) + " elements.");
        }

        for(var i = 0; i < args.length; i++) {
            if($CP.isFunctionOrNumber(args[i])) {
                this._val[i] = args[i];
            } else {
                throw new TypeError("[Vector" + type + "]: All initializer values must be floats or functions returning floats.");
            }
        }

    } else if(typeof args == "object") {

        var required = this._def[type].required;
        for(var i = 0; i < required.length; i++) {
            if(args[required[i]] === undefined) {
                throw new RangeError("[Vector" + type + "]: Required initializer '" + required[i] + "' is missing.");
            } else if(!$CP.isFunctionOrNumber(args[required[i]])) {
                throw new TypeError("[Vector" + type + "]: All initializer values must be floats or functions returning floats.");
            } else {
                this._val[i] = args[required[i]];
            }
        }

        var optional = this._def[type].optional;
        for(var i = 0; i < optional.length; i++) {
            if(args[optional[i]] === undefined) {
                // do nothing
            } else if(!$CP.isFunctionOrNumber(args[optional[i]])) {
                throw new TypeError("[Vector" + type + "]: All initializer values must be floats or functions returning floats.");
            } else {
                this._val[i + required.length] = args[optional[i]];
            }
        }

    }



}
//[cf]
//[of]:D Vector._def
Vector.prototype._def = {
    UV:   { min: 2, max: 2, required: [ 'u', 'v' ],           optional: [],           offsets: { u: 0, v: 1 } },
    XY:   { min: 2, max: 2, required: [ 'x', 'y' ],           optional: [],           offsets: { x: 0, y: 1 } },
    XYZ:  { min: 3, max: 3, required: [ 'x', 'y', 'z' ],      optional: [],           offsets: { x: 0, y: 1, z: 2 } },
    XYZW: { min: 4, max: 4, required: [ 'x', 'y', 'z', 'w' ], optional: [],           offsets: { x: 0, y: 1, z: 2, w: 3 } },
    RGB:  { min: 3, max: 5, required: [ 'r', 'g', 'b' ],      optional: [ 'f', 't' ], offsets: { r: 0, g: 1, b: 2, f: 3, t: 4 } },
    SRGB: { min: 3, max: 5, required: [ 'r', 'g', 'b' ],      optional: [ 'f', 't' ], offsets: { r: 0, g: 1, b: 2, f: 3, t: 4 } }
};
//[cf]
//[of]:D Vector.handler
Vector.prototype.handler = {
    get: function(target, property, receiver) {
        var proto = Object.getPrototypeOf(target);

        if(property == "type") {
            return "Vector" + target._type;
        } else if(property == "toSDL") {
            return target.toSDL;
        } else if(target._uval[property] !== undefined) {
            return target._uval[property];
        } else if(proto._def[target._type].offsets[property] === undefined) {
            return undefined;
        } else {
            var result = target._val[proto._def[target._type].offsets[property]];
            if(typeof result == "function")
                return result();
            else
                return result;
        }

    },
    set: function(target, property, value, receiver) {
        if(property == "type") {
            throw new Error("[Vector." + target._type + "]: type is read-only.");
        } else if(target._def[target._type].offsets[property] !== undefined) {
            if($CP.isFunctionOrNumber(value)) {
                target._val[target._def[target._type].offsets[property]] = value;
            } else {
                throw new TypeError("[Vector" + target._type + "]: " + property + " must be a float or a function returning a float.");
            }
        } else if(target._uval[property] !== undefined) {
            return target._uval[property];
        } else {
            return undefined;
        }

    },
}
//[cf]
//[of]:F Vector.proxify()
Vector.prototype.proxify = function() {
    return new Proxy(this, this.handler);
}
//[cf]
//[of]:F Vector.toSDL(stops)
//==============================================================================
// Returns the string representation of the vector in the final form that will
// appear in the .pov file. The stops argument is the number of tab stops to
// prepend to each line.
//==============================================================================

Vector.prototype.toSDL = function(stops) {

    stops = $CP.tab(stops);

    switch(this.type) {

        case "VectorUV":
            return stops + "<" + this.u + ", " + this.v + ">";
            break;

        case "VectorXY":
            return stops + "<" + this.x + ", " + this.y + ">";
            break;

        case "VectorXYZ":
            return stops + "<" + this.x + ", " + this.y + ", " + this.z + ">";
            break;

        case "VectorXYZW":
            return stops + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
            break;

        default: // RGB and SRGB

            var form = (this.type == "VectorSRGB" ? "s" : "") + "rgb";
            var args = [this.r, this.g, this.b];

            if(this.f !== null) {
                form += "f";
                args.push(this.f);
                if(this.t !== null) {
                    form += "t";
                    args.push(this.t);
                }
            }

            return stops + form + " <" + args.join(", ") + ">";

            break;
    }


}
//[cf]

//[of]:* INIT [WIP]
$CP.init();
//[cf]

/*
//[of]:toSDL code from prev version
// Generic/Common

toString(indent) {
    var pad = $CP.tab(indent);
    var contents = [ ];

    if(this._clippedBy !== null) {
        contents.push(pad + "clipped_by {");
        contents.push(this._clippedBy.toString(indent + 1));
        contents.push(pad + "}");
    }

    if(this._boundedBy !== null) {
        contents.push(pad + "bounded_by {");
        if(this._boundedBy === this._clippedBy) {
            contents.push(pad + "    clipped_by");
        } else {
            contents.push(this._boundedBy.toString(indent + 1));
        }
        contents.push(pad + "}");
    }

    if(this._noShadow)
        contents.push(pad + "no_shadow");

    if(this._noImage)
        contents.push(pad + "no_image");

    if(this._noRadiosity)
        contents.push(pad + "no_radiosity");

    if(this._noReflection)
        contents.push(pad + "no_reflection");

    if(this._inverse)
        contents.push(pad + "inverse");

    if(this._sturm)
        contents.push(pad + "sturm");

    if(this._hierarchy)
        contents.push(pad + "hierarchy");

    if(this._double_illuminate)
        contents.push(pad + "double_illuminate");

    if(this._hollow)
        contents.push(pad + "hollow");

    // TODO: interior
    // TODO: interior_texture
    // TODO: pigment
    // TODO: normal
    // TODO: finish
    // TODO: photons
    // TODO: radiosity

    if(this._transform !== null)
        contents.push(pad + this._transform.toString(indent + 1));

    return contents.join("\n");
}

//[cf]
*/






