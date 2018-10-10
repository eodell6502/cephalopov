#!/usr/bin/env node


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

//==============================================================================
// Given an angle in degrees, returns its equivalent in radians.
//==============================================================================

$CP.deg2rad = function(deg) {
    return deg * (Math.PI / 180);
}

//==============================================================================
// Given a filename template, replaces the first contiguous sequence of '%' with
// serial zero-padded to the same length.
//==============================================================================

$CP.fileSerial = function(template, serial) {
    return template.replace(/%+/, function(match) { return this.zeroPad(serial, match.length); });
}

//[cf]
//[of]:% Matrix
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

