//[of]:License
/*

Copyright 2018 Eric O'Dell and subsequent contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
//[cf]
//[of]:Working Notes
/*

//[of]:README
CephaloPOV is the second version (and total rewrite) of a JavaScript wrapper
around the POV-Ray ray tracer. It exposes most of POV-Ray 3.71's features,
replacing the rest with its own versions, and adding a large and growing set of
additional, higher-level features.

The features replaced by CephaloPOV are mostly replaced out of necessity to
support new features, not because the native functionality is in any way
inadequate. The main changes are a radically different animation system and the
internalization of matrix transformations to enable relational calculations.

The output of CephaloPOV is one or more .ini and .pov files representing frames in an
animation. Objects created in CephaloPOV can also be output as POV-Ray macros for
use in hand-coded .pov files.

CephaloPOV runs as a commandline tool using Node. It can also be run inside a
browser.

The new features only scratch the surface of the possibilities, mainly because
of the primary author's limited knowledge of the necessary maths. Contributions
by more mathematically-skilled developers are welcome.

The design process for the initial version was pure waterfall. Further
development is by the spiral model. Specification and documentation comes before
implementation.

A major design goal is to make CephaloPOV smoothly interoperable with hand-coded
SDL, and at the same time to make knowledge of SDL unnecessary for users who
interact with POV-Ray exclusively through CephaloPOV. I believe this has been
(mostly) achieved, with the caveat that I have no plans to write a
CephaloPOV-centric version of POV-Ray's admirably copious documentation, which
should be more than adequate as-is.

There is a mailing list/Google Group devoted to CephaloPOV for both users and
developers. There are two rules:

    1. Don't be a jerk.
    2. Stay on topic.
//[cf]
//[of]:FAQ
Q. Does CephaloPOV expose all of the functionality of POV-Ray?

A. No. It exposes most of it, replacing some parts with its own implementations,
   and ignoring some parts that don't make sense within the context of a code
   generator built on top of SDL, but there are some features that haven't been
   wrapped (yet). POV-Ray is, after all, a hugely complex program that has been
   under continuous development for almost thirty years. We'll get there
   eventually.


Q. What functionality does CephaloPOV replace?

A. The animation system is the most obvious replacement. CephaloPOV implements a
   very different model in its place and leaves open the possibility of the user
   extending or replacing it. Even more fundamental but largely invisible is the
   replacement most of POV-Ray's native transformation matrices with a
   JavaScript implementation of the same.


Q. Isn't doing matrix math in JavaScript slower than doing it in C++?

A. Yes, it's a *lot* slower, but it's reasonably fast in Node and in current
   browsers. The generation of SDL frame files, even math-heavy ones, takes
   place far faster than POV-Ray can render them, so the performance hit from
   offloading the math to JavaScript isn't a practical problem. The benefit
   of the tradeoff is an entire class of geometric relations and other
   functionality that would be difficult to implement and use in SDL.


Q. Can I run CephaloPOV in a browser?

A. Yes. In fact, the initial development was done in a browser and the Node npm
   package came afterwards. It's a bit less convenient because of the file
   access restrictions imposed by the browser security model, but there are
   several workarounds that are reasonably easy to use if you can't install
   Node locally.


Q. How can I contribute?

A. The git repository is hosted at SourceForge, and you are welcome to submit
   pull requests. Before doing so, you should read the [contributors guidelines]
   and join the [development mailing list]. You should also familiarize yourself
   with the planned feature list in the [roadmap], though this is mainly to
   avoid duplication of effort -- new ideas are always welcome.

   You can also use CephaloPOV as a library for writing specialized SDL
   generators. Several of these are included as examples in the official
   distribution, and there are (as yet unrealized) plans for a separate
   collection of CephaloPOV-based utility programs.

   If you don't feel like contributing code, there are never enough beta testers
   or well-written bug reports, and the documentation can always use
   improvement.
//[cf]
//[of]:Raw TODO
I. Finish enumeration/epitome
II. World
    A. Types
    B. Camera
    C. Lights (basic)
    D. Textures
    E. Objects (plane, box, cylinder, sphere) + re-eval for complex objects
    F. CSG Objects (generic)
    G. Macro generation

Basic pigment textures

Camera [...partial...]
Transformation [...partial...]
Lights [...partial...]
Matrices [...partial...]
    Transforms.inc
Include Files
    colors.inc [...partial...] (see bottom of this comment)

Test routines


Identifiers

    * 40 chars
    * /[A-Za-z][A-Za-z0-9_]{0,39}/

    Keywords are all lowercase, so a capital letter avoids potential collisions

TODO: Comments -- add emitter

    // single line
    /* multi
        line */
/*

Numeric Expressions
Vector Expressions

    <a, b, c, d, e>

Color Expressions
TODO: User-Defined Functions
TODO: Strings
TODO: Arrays
TODO: Splines

--------------------------------------------------------------------------------

Defer ATMOSPHERIC EFFECTS until later

--------------------------------------------------------------------------------

Objects/CSG...
Texture...

Pattern...
Media...

*Colors.inc

Color-space conversions
Chars.inc
Consts.inc
Debug.inc
Finish.inc
Functions.inc
Glass.inc
Golds.inc
Logo.inc
...etc.
//[cf]
//[of]:Color manipulation macros TODO
// Color manipulation macros

// Takes Hue value as input, returns RGB vector.
#macro CH2RGB (HH)
   #local H = mod(HH, 360);
   #local H = (H < 0 ? H+360 : H);
   #switch (H)
      #range (0, 120)
         #local R = (120-  H) / 60;
         #local G = (  H-  0) / 60;
         #local B = 0;
      #break
      #range (120, 240)
         #local R = 0;
         #local G = (240-  H) / 60;
         #local B = (  H-120) / 60;
      #break
      #range (240, 360)
         #local R = (  H-240) / 60;
         #local G = 0;
         #local B = (360-  H) / 60;
      #break
   #end
   <min(R,1), min(G,1), min(B,1)>
#end

// Takes RGB vector, Max component, and Span as input,
// returns Hue value.
#macro CRGB2H (RGB, Max, Span)
   #local H = 0;
   #local R = RGB.red;
   #local G = RGB.green;
   #local B = RGB.blue;
   #if (Span>0)
      #local H = (
         + (R = Max & G != Max ? 0 + (G - B)/Span : 0)
         + (G = Max & B != Max ? 2 + (B - R)/Span : 0)
         + (B = Max & R != Max ? 4 + (R - G)/Span : 0)
      )*60;
   #end
   H
#end

// Converts a color in HSL color space to a color in RGB color space.
// Input:  < Hue, Saturation, Lightness, Filter, Transmit >
// Output: < Red, Green, Blue, Filter, Transmit >
#macro CHSL2RGB(Color)
   #local HSLFT = color Color;
   #local H = (HSLFT.red);
   #local S = (HSLFT.green);
   #local L = (HSLFT.blue);
   #local SatRGB = CH2RGB(H);
   #local Col = 2*S*SatRGB + (1-S)*<1,1,1>;
   #if (L<0.5)
      #local RGB = L*Col;
   #else
      #local RGB = (1-L)*Col + (2*L-1)*<1,1,1>;
   #end
   <RGB.red,RGB.green,RGB.blue,(HSLFT.filter),(HSLFT.transmit)>
#end

// Converts a color in RGB color space to a color in HSL color space.
// Input:  < Red, Green, Blue, Filter, Transmit >
// Output: < Hue, Saturation, Lightness, Filter, Transmit >
#macro CRGB2HSL(Color)
   #local RGBFT = color Color;
   #local R = (RGBFT.red);
   #local G = (RGBFT.green);
   #local B = (RGBFT.blue);
   #local Min = min(R,min(G,B));
   #local Max = max(R,max(G,B));
   #local Span = Max-Min;
   #local L = (Min+Max)/2;
   #local S = 0;
   #if( L!=0 & L!=1 )
      #local S = Span / ( L<0.5 ? (L*2) : (2-L*2) );
   #end
   #local H = CRGB2H (<R,G,B>, Max, Span);
   <H,S,L,(RGBFT.filter),(RGBFT.transmit)>
#end

// Converts a color in HSV color space to a color in RGB color space.
// Input:  < Hue, Saturation, Value, Filter, Transmit >
// Output: < Red, Green, Blue, Filter, Transmit >
#macro CHSV2RGB(Color)
   #local HSVFT = color Color;
   #local H = (HSVFT.red);
   #local S = (HSVFT.green);
   #local V = (HSVFT.blue);
   #local SatRGB = CH2RGB(H);
   #local RGB = ( ((1-S)*<1,1,1> + S*SatRGB) * V );
   <RGB.red,RGB.green,RGB.blue,(HSVFT.filter),(HSVFT.transmit)>
#end

// Converts a color in RGB color space to a color in HSV color space.
// Input:  < Red, Green, Blue, Filter, Transmit >
// Output: < Hue, Saturation, Value, Filter, Transmit >
#macro CRGB2HSV(Color)
   #local RGBFT = color Color;
   #local R = (RGBFT.red);
   #local G = (RGBFT.green);
   #local B = (RGBFT.blue);
   #local Min = min(R,min(G,B));
   #local Max = max(R,max(G,B));
   #local Span = Max-Min;
   #local H = CRGB2H (<R,G,B>, Max, Span);
   #local S = 0; #if (Max!=0) #local S = Span/Max; #end
   <H,S,Max,(RGBFT.filter),(RGBFT.transmit)>
#end

#version Colors_Inc_Temp;
#end
//[cf]
//[of]:Scene Graph notes
Master objects are defined relative to the origin. More precisely, the origin is
their primary point of articulation. In each frame, they are transformed to
their current frame-state.

Possibly, a relationship between A and B is stated in the form of B's point of
articulation relative to some explicit or implicit point in A. In its most basic
form, this would amount to free movement of B relative to its attachment point
to A. PSII could provide a set of standard constraints, e.g., ball joint, hinge,
track, etc., which could be built upon or supplanted by the user.

This suggests a separate assembly process for objects with moving parts, which
means that ordinary native CSG objects can go ahead just fine. Converting them
into master objects amounts to just positioning them appropriately relative to
the origin after construction.
//[cf]

//[of]:Advanced Features
In no particular order:

* Scene graph
* Spline calculations, including Catmull-Rom
* Color calculations from colors.inc, plus others from JS mixers
* Eric Haines' table of object intersections, collision detection
* Derivative relative points
* Callbacks in lieu of literal values
* SDL macro generation
* Stereo camera type
* Parametric type factory using predefined parameters
* Composite types
* Inclusion of all include types
* Level-of-Detail system
* Particle systems
//[cf]

TODO:

.clone
.materialize
Generate:
    Scene files .pov
    Ini files
    Shell script (.sh/.bat)



npm install -g sloc        ... cronify

Primitive.toString()
	add identifier/name, plus autogenerated defaults
    tie into subclass toString() methods
	add CSG parent reference
    respect active flag
Figure out Scene object
	object containing identifier: object relations

Full test of ImageOptions


*/
//[cf]
//[of]:$CP
var $CP = {

	config: {

	},

	currentScene: null;

//[of]:	Attributes
//[of]:.colors
//==============================================================================
// CephaloPOVified versions of the colors from colors.inc.
//==============================================================================

colors: {
    aquamarine:        new VectorColor(0.439216, 0.858824, 0.576471),
    bakersChoc:        new VectorColor(0.36, 0.20, 0.09),
    black:             new VectorColor(0, 0, 0),
    blue:              new VectorColor(0, 0, 1),
    blueViolet:        new VectorColor(0.62352, 0.372549, 0.623529),
    brass:             new VectorColor(0.71, 0.65, 0.26),
    brightGold:        new VectorColor(0.85, 0.85, 0.10),
    bronze2:           new VectorColor(0.65, 0.49, 0.24),
    bronze:            new VectorColor(0.55, 0.47, 0.14),
    brown:             new VectorColor(0.647059, 0.164706, 0.164706),
    cadetBlue:         new VectorColor(0.372549, 0.623529, 0.623529),
    clear:             new VectorColor(1, 1, 1, 1),
    coolCopper:        new VectorColor(0.85, 0.53, 0.10),
    copper:            new VectorColor(0.72, 0.45, 0.20),
    coral:             new VectorColor(1.0, 0.498039, 0.0),
    cornflowerBlue:    new VectorColor(0.258824, 0.258824, 0.435294),
    cyan:              new VectorColor(0, 1, 1),
    darkBrown:         new VectorColor(0.36, 0.25, 0.20),
    darkGreen:         new VectorColor(0.184314, 0.309804, 0.184314),
    darkOliveGreen:    new VectorColor(0.309804, 0.309804, 0.184314),
    darkOrchid:        new VectorColor(0.6, 0.196078, 0.8),
    darkPurple:        new VectorColor(0.53, 0.12, 0.47),
    darkSlateBlue:     new VectorColor(0.119608, 0.137255, 0.556863),
    darkSlateGray:     new VectorColor(0.184314, 0.309804, 0.309804),
    darkSlateGrey:     new VectorColor(0.184314, 0.309804, 0.309804),
    darkTan:           new VectorColor(0.59, 0.41, 0.31),
    darkTurquoise:     new VectorColor(0.439216, 0.576471, 0.858824),
    darkWood:          new VectorColor(0.52, 0.37, 0.26),
    dimGray:           new VectorColor(0.329412, 0.329412, 0.329412),
    dimGrey:           new VectorColor(0.329412, 0.329412, 0.329412),
    dkGreenCopper:     new VectorColor(0.29, 0.46, 0.43),
    dustyRose:         new VectorColor(0.52, 0.39, 0.39),
    feldspar:          new VectorColor(0.82, 0.57, 0.46),
    firebrick:         new VectorColor(0.556863, 0.137255, 0.137255),
    flesh:             new VectorColor(0.96, 0.80, 0.69),
    forestGreen:       new VectorColor(0.137255, 0.556863, 0.137255),
    gold:              new VectorColor(0.8, 0.498039, 0.196078),
    goldenrod:         new VectorColor(0.858824, 0.858824, 0.439216),
    gray05:            new VectorColor(0.05, 0.05, 0.05),
    gray10:            new VectorColor(0.10, 0.10, 0.10),
    gray15:            new VectorColor(0.15, 0.15, 0.15),
    gray20:            new VectorColor(0.20, 0.20, 0.20),
    gray25:            new VectorColor(0.25, 0.25, 0.25),
    gray30:            new VectorColor(0.30, 0.30, 0.30),
    gray35:            new VectorColor(0.35, 0.35, 0.35),
    gray40:            new VectorColor(0.40, 0.40, 0.40),
    gray45:            new VectorColor(0.45, 0.45, 0.45),
    gray50:            new VectorColor(0.50, 0.50, 0.50),
    gray55:            new VectorColor(0.55, 0.55, 0.55),
    gray60:            new VectorColor(0.60, 0.60, 0.60),
    gray65:            new VectorColor(0.65, 0.65, 0.65),
    gray70:            new VectorColor(0.70, 0.70, 0.70),
    gray75:            new VectorColor(0.75, 0.75, 0.75),
    gray80:            new VectorColor(0.80, 0.80, 0.80),
    gray85:            new VectorColor(0.85, 0.85, 0.85),
    gray90:            new VectorColor(0.90, 0.90, 0.90),
    gray95:            new VectorColor(0.95, 0.95, 0.95),
    gray:              new VectorColor(0.752941, 0.752941, 0.752941),
    grey05:            new VectorColor(0.05, 0.05, 0.05),
    grey10:            new VectorColor(0.10, 0.10, 0.10),
    grey15:            new VectorColor(0.15, 0.15, 0.15),
    grey20:            new VectorColor(0.20, 0.20, 0.20),
    grey25:            new VectorColor(0.25, 0.25, 0.25),
    grey30:            new VectorColor(0.30, 0.30, 0.30),
    grey35:            new VectorColor(0.35, 0.35, 0.35),
    grey40:            new VectorColor(0.40, 0.40, 0.40),
    grey45:            new VectorColor(0.45, 0.45, 0.45),
    grey50:            new VectorColor(0.50, 0.50, 0.50),
    grey55:            new VectorColor(0.55, 0.55, 0.55),
    grey60:            new VectorColor(0.60, 0.60, 0.60),
    grey65:            new VectorColor(0.65, 0.65, 0.65),
    grey70:            new VectorColor(0.70, 0.70, 0.70),
    grey75:            new VectorColor(0.75, 0.75, 0.75),
    grey80:            new VectorColor(0.80, 0.80, 0.80),
    grey85:            new VectorColor(0.85, 0.85, 0.85),
    grey90:            new VectorColor(0.90, 0.90, 0.90),
    grey95:            new VectorColor(0.95, 0.95, 0.95),
    grey:              new VectorColor(0.752941, 0.752941, 0.752941),
    green:             new VectorColor(0, 1, 0),
    greenCopper:       new VectorColor(0.32, 0.49, 0.46),
    greenYellow:       new VectorColor(0.576471, 0.858824, 0.439216),
    grey:              new VectorColor(0.752941, 0.752941, 0.752941),
    huntersGreen:      new VectorColor(0.13, 0.37, 0.31),
    indianRed:         new VectorColor(0.309804, 0.184314, 0.184314),
    khaki:             new VectorColor(0.623529, 0.623529, 0.372549),
    lightBlue:         new VectorColor(0.74902, 0.847059, 0.847059),
    lightGray:         new VectorColor(0.658824, 0.658824, 0.658824),
    lightGrey:         new VectorColor(0.658824, 0.658824, 0.658824),
    lightPurple:       new VectorColor(0.87, 0.58, 0.98),
    lightSteelBlue:    new VectorColor(0.560784, 0.560784, 0.737255),
    lightWood:         new VectorColor(0.91, 0.76, 0.65),
    limeGreen:         new VectorColor(0.196078, 0.8, 0.196078),
    magenta:           new VectorColor(1, 0, 1),
    mandarinOrange:    new VectorColor(0.89, 0.47, 0.20),
    maroon:            new VectorColor(0.556863, 0.137255, 0.419608),
    mediumAquamarine:  new VectorColor(0.196078, 0.8, 0.6),
    mediumBlue:        new VectorColor(0.196078, 0.196078, 0.8),
    mediumForestGreen: new VectorColor(0.419608, 0.556863, 0.137255),
    mediumGoldenrod:   new VectorColor(0.917647, 0.917647, 0.678431),
    mediumOrchid:      new VectorColor(0.576471, 0.439216, 0.858824),
    mediumSeaGreen:    new VectorColor(0.258824, 0.435294, 0.258824),
    mediumSlateBlue:   new VectorColor(0.498039, 0, 1.0),
    mediumSpringGreen: new VectorColor(0.498039, 1.0, 0),
    mediumTurquoise:   new VectorColor(0.439216, 0.858824, 0.858824),
    mediumVioletRed:   new VectorColor(0.858824, 0.439216, 0.576471),
    mediumWood:        new VectorColor(0.65, 0.50, 0.39),
    medPurple:         new VectorColor(0.73, 0.16, 0.96),
    mica:              new VectorColor(0, 0, 0),
    midnightBlue:      new VectorColor(0.184314, 0.184314, 0.309804),
    navy:              new VectorColor(0.137255, 0.137255, 0.556863),
    navyBlue:          new VectorColor(0.137255, 0.137255, 0.556863),
    neonBlue:          new VectorColor(0.30, 0.30, 1.00),
    neonPink:          new VectorColor(1.00, 0.43, 0.78),
    newMidnightBlue:   new VectorColor(0.00, 0.00, 0.61),
    newTan:            new VectorColor(0.92, 0.78, 0.62),
    oldGold:           new VectorColor(0.81, 0.71, 0.23),
    orange:            new VectorColor(1, 0.5, 0.0),
    orangeRed:         new VectorColor(1.0, 0.25, 0),
    orchid:            new VectorColor(0.858824, 0.439216, 0.858824),
    paleGreen:         new VectorColor(0.560784, 0.737255, 0.560784),
    pink:              new VectorColor(0.737255, 0.560784, 0.560784),
    plum:              new VectorColor(0.917647, 0.678431, 0.917647),
    quartz:            new VectorColor(0.85, 0.85, 0.95),
    red:               new VectorColor(1, 0, 0),
    richBlue:          new VectorColor(0.35, 0.35, 0.67),
    salmon:            new VectorColor(0.435294, 0.258824, 0.258824),
    scarlet:           new VectorColor(0.55, 0.09, 0.09),
    seaGreen:          new VectorColor(0.137255, 0.556863, 0.419608),
    semiSweetChoc:     new VectorColor(0.42, 0.26, 0.15),
    sienna:            new VectorColor(0.556863, 0.419608, 0.137255),
    silver:            new VectorColor(0.90, 0.91, 0.98),
    skyBlue:           new VectorColor(0.196078, 0.6, 0.8),
    slateBlue:         new VectorColor(0, 0.498039, 1.0),
    spicyPink:         new VectorColor(1.00, 0.11, 0.68),
    springGreen:       new VectorColor(0, 1.0, 0.498039),
    steelBlue:         new VectorColor(0.137255, 0.419608, 0.556863),
    summerSky:         new VectorColor(0.22, 0.69, 0.87),
    tan:               new VectorColor(0.858824, 0.576471, 0.439216),
    thistle:           new VectorColor(0.847059, 0.74902, 0.847059),
    turquoise:         new VectorColor(0.678431, 0.917647, 0.917647),
    veryDarkBrown:     new VectorColor(0.35, 0.16, 0.14),
    veryLightPurple:   new VectorColor(0.94, 0.81, 0.99),
    violet:            new VectorColor(0.309804, 0.184314, 0.309804),
    violetRed:         new VectorColor(0.8, 0.196078, 0.6),
    vLightGray:        new VectorColor(0.80, 0.80, 0.80),
    vLightGrey:        new VectorColor(0.80, 0.80, 0.80),
    wheat:             new VectorColor(0.847059, 0.847059, 0.74902),
    white:             new VectorColor(1, 1, 1),
    yellow:            new VectorColor(1, 1, 0),
    yellowGreen:       new VectorColor(0.6, 0.8, 0.196078),
},
//[cf]
//[of]:.ditherTypes
//==============================================================================
// Legal dither types mapped to textual descriptions.
//==============================================================================

ditherTypes: {
    "B2": "Bayer pattern 2x2",
    "B3": "Bayer pattern 3x3",
    "B4": "Bayer pattern 4x4",
    "D1": "Simple error diffusion 1D",
    "D2": "Simple error diffusion 2D",
    "FS": "Floyd-Steinberg error diffusion"
},
//[cf]
//[of]:.globalSettings
//==============================================================================
// Names of all global settings parameters.
//==============================================================================

globalSettings: [ "adcBailout", "ambientLight", "assumedGamma",
    "iridWavelength", "charset", "maxIntersections", "maxTraceLevel",
    "mmPerUnit", "numberOfWaves", "noiseGenerator", "radAdcBailout",
    "radAlwaysSample", "radBrightness", "radCount", "radErrorBound",
    "radGrayThreshold", "radiosity", "radLowErrorFactor", "radMaxSample",
    "radMaximumReuse", "radMinimumReuse", "radNearestCount", "radNormal",
    "radPretraceStart", "radPretraceEnd", "radRecursionLimit",
    "radSubsurface", "subRadiosity", "subSamples", "subsurface", "photon",
    "photonSpacing", "photonCount", "photonGather", "photonMedia",
    "photonJitter", "photonMaxTraceLevel", "photonAdcBailout",
    "photonSaveFile", "photonLoadFile", "photonAutostop",
    "photonExpandThresholds", "photonRadius" ],
//[cf]
//[of]:.hfTypes
//==============================================================================
// Legal values for HeightField.hfType
//==============================================================================

hfTypes: [ "exr", "gif", "hdr", "iff", "jpeg", "pgm", "png", "pot", "ppm", "sys", "tga", "tiff" ],
//[cf]
//[of]:.outputFileTypes
//==============================================================================
// All (graphics) output file types, mapped to textual descriptions.
//==============================================================================

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
//[cf]
//[of]:.optionList
//==============================================================================
// List of legal image options parameters.
//==============================================================================

optionList: [ "allConsole", "allFile", "antialias", "antialiasDepth", "antialiasGamma",
    "antialiasThreshold", "appendFile", "bitsPerColor", "bounding",
    "boundingMethod", "boundingThreshold", "bspBaseAccessCost",
    "bspChildAccessCost", "bspIsectCost", "bspMaxDepth", "bspMissChance",
    "constants", "continueTrace", "createIni", "debugConsole", "debugFile",
    "display", "displayGamma", "dither", "ditherMethod", "endColumn",
    "endRow", "fatalConsole", "fatalErrorCommand", "fatalErrorReturn",
    "fatalFile", "fileGamma", "height", "highReproducibility",
    "includeHeader", "inputFileName", "jitter", "jitterAmount", "libraryPath",
    "maxImageBufferMemory", "outputAlpha", "outputFileName", "outputFileType",
    "outputToFile", "palette", "pauseWhenDone", "postFrameCommand",
    "postFrameReturn", "postSceneCommand", "postSceneReturn",
    "preFrameCommand", "preFrameReturn", "preSceneCommand",
    "preSceneReturn", "previewEndSize", "previewStartSize", "quality",
    "radiosityFileName", "radiosityFromFile", "radiosityToFile",
    "radiosityVainPretrace", "removeBounds", "renderBlockSize",
    "renderBlockStep", "renderConsole", "renderFile", "renderPattern",
    "samplingMethod", "splitUnions", "startColumn", "startRow",
    "statisticConsole", "statisticFile", "testAbort", "testAbortCount",
    "userAbortCommand", "userAbortReturn", "verbose", "videoMode",
    "warningConsole", "warningFile", "warningLevel", "width", "workThreads" ],
//[cf]
//[of]:.returnActions
//==============================================================================
// All supported return actions mapped to textual descriptions.
//==============================================================================

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
//[cf]
//[of]:.sdlKeywords
//==============================================================================
// List of SDL keywords.
//==============================================================================

sdlKeywords: [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
    "acos", "acosh", "adaptive", "adc_bailout", "agate", "agate_turb",
    "albedo", "all", "all_intersections", "alpha", "altitude",
    "always_sample", "ambient", "ambient_light", "angle", "aoi", "aperture",
    "append", "arc_angle", "area_illumination", "area_light", "array", "asc",
    "ascii", "asin", "asinh", "assumed_gamma", "atan", "atan2", "atand",
    "atanh", "autostop", "average", "b_spline", "background",
    "bezier_spline", "bicubic_patch", "bitwise_and", "bitwise_or",
    "bitwise_xor", "black_hole", "blob", "blue", "blur_samples", "bokeh",
    "bounded_by", "box", "boxed", "bozo", "break", "brick", "brick_size",
    "brightness", "brilliance", "bump_map", "bump_size", "bumps", "camera",
    "case", "caustics", "ceil", "cells", "charset", "checker", "chr",
    "circular", "clipped_by", "clock", "clock_delta", "clock_on", "collect",
    "color", "color_map", "colour", "colour_map", "component", "composite",
    "concat", "cone", "confidence", "conic_sweep", "conserve_energy",
    "contained_by", "control0", "control1", "coords", "cos", "cosh",
    "count", "crackle", "crand", "cube", "cubicwave", "cutaway_textures",
    "cylinder", "cylindrical", "datetime", "debug", "declare", "default",
    "defined", "degrees", "density", "density_file", "density_map", "dents",
    "deprecated", "df3", "difference", "diffuse", "dimension_size", "dimensions",
    "direction", "disc", "dispersion", "dispersion_samples", "dist_exp",
    "distance", "div", "double_illuminate", "eccentricity", "else",
    "elseif", "emission", "end", "error", "error_bound", "evaluate", "exp",
    "expand_thresholds", "exponent", "exterior", "extinction",
    "face_indices", "facets", "fade_color", "fade_colour", "fade_distance",
    "fade_power", "falloff", "falloff_angle", "false", "fclose",
    "file_exists", "filter", "final_clock", "final_frame", "finish",
    "fisheye", "flatness", "flip", "floor", "focal_point", "fog", "fog_alt",
    "fog_offset", "fog_type", "fopen", "for", "form", "frame_number",
    "frequency", "fresnel", "function", "gamma", "gather", "gif",
    "global_lights", "global_settings", "gradient", "granite", "gray",
    "gray_threshold", "green", "height_field", "hexagon", "hf_gray_16",
    "hierarchy", "hypercomplex", "hollow", "if", "ifdef", "iff", "ifndef",
    "image_height", "image_map", "image_pattern", "image_width",
    "importance", "include", "initial_clock", "initial_frame",
    "input_file_name", "inside", "inside_vector", "int", "interior",
    "interior_texture", "internal", "interpolate", "intersection",
    "intervals", "inverse", "ior", "irid", "irid_wavelength", "isosurface",
    "jitter", "jpeg", "julia", "julia_fractal", "lambda", "lathe",
    "leopard", "light_group", "light_source", "linear_spline",
    "linear_sweep", "ln", "load_file", "local", "location", "log",
    "look_at", "looks_like", "low_error_factor", "macro", "magnet",
    "major_radius", "mandel", "map_type", "marble", "material",
    "material_map", "matrix", "max", "maximum_reuse", "max_extent",
    "max_gradient", "max_intersections", "max_iteration", "max_sample",
    "max_trace", "max_trace_level", "media", "media_attenuation",
    "media_interaction", "merge", "mesh", "mesh2", "metallic", "method",
    "metric", "min", "min_extent", "minimum_reuse", "mm_per_unit", "mod",
    "mortar", "natural_spline", "nearest_count", "no", "no_bump_scale",
    "no_image", "no_radiosity", "no_reflection", "no_shadow",
    "noise_generator", "normal", "normal_indices", "normal_map",
    "normal_vectors", "now", "number_of_waves", "object", "octaves", "off",
    "offset", "omega", "omnimax", "on", "once", "onion", "open", "orient",
    "orientation", "orthographic", "ovus", "panoramic", "parallel",
    "parametric", "pass_through", "pattern", "pavement", "perspective",
    "pgm", "phase", "phong", "phong_size", "photons", "pi", "pigment",
    "pigment_map", "pigment_pattern", "planar", "plane", "png", "point_at",
    "poly", "polynomial", "poly_wave", "polygon", "pot", "pow", "ppm",
    "precision", "precompute", "premultiplied", "pretrace_end",
    "pretrace_start", "prism", "prod", "projected_through", "pwr",
    "quadratic_spline", "quadric", "quartic", "quaternion", "quick_color",
    "quick_colour", "quilted", "radial", "radians", "radiosity", "radius",
    "rainbow", "ramp_wave", "rand", "range", "ratio", "read", "reciprocal",
    "recursion_limit", "red", "reflection", "reflection_exponent",
    "refraction", "render", "repeat", "rgb", "rgbf", "rgbft", "rgbt",
    "right", "ripples", "rotate", "roughness", "samples", "save_file",
    "scale", "scallop_wave", "scattering", "seed", "select", "shadowless",
    "sin", "sine_wave", "sinh", "sint8", "sint16be", "sint16le", "sint32be",
    "sint32le", "size", "sky", "sky_sphere", "slice", "slope", "slope_map",
    "smooth", "smooth_triangle", "solid", "sor", "spacing", "specular",
    "sphere", "sphere_sweep", "spherical", "spiral1", "spiral2", "spline",
    "split_union", "spotlight", "spotted", "sqr", "sqrt", "square", "srgb",
    "srgbf", "srgbt", "srgbft", "statistics", "str", "strcmp", "strength",
    "strlen", "strlwr", "strupr", "sturm", "substr", "subsurface", "sum",
    "superellipsoid", "switch", "sys", "t", "tan", "tanh", "target", "text",
    "texture", "texture_list", "texture_map", "tga", "thickness",
    "threshold", "tiff", "tightness", "tile2", "tiles", "tiling",
    "tolerance", "toroidal", "torus", "trace", "transform", "translate",
    "translucency", "transmit", "triangle", "triangle_wave", "triangular",
    "true", "ttf", "turb_depth", "turbulence", "type", "u", "uint8",
    "uint16be", "uint16le", "u_steps", "ultra_wide_angle", "undef", "union",
    "up", "use_alpha", "use_color", "use_colour", "use_index", "utf8",
    "uv_indices", "uv_mapping", "uv_vectors", "v", "v_steps", "val",
    "variance", "vaxis_rotate", "vcross", "vdot", "version",
    "vertex_vectors", "vlength", "vnormalize", "vrotate", "vstr",
    "vturbulence", "warning", "warp", "water_level", "waves", "while",
    "width", "wood", "wrinkles", "write", "x", "y", "yes", "z" ],
//[cf]
//[cf]
//[of]:	Methods
//[of]:.baseClassName(obj)
//==============================================================================
// Returns the name of obj's base class.
//==============================================================================

baseClassName: function(obj) {
    return Object.getPrototypeOf(obj.constructor).name;
},
//[cf]
//[of]:.className(obj)
//==============================================================================
// Returns the name of obj's class.
//==============================================================================

.className: function(obj) {
	return obj.constructor.name;
}
//[cf]
//[of]:.deg2rad(deg)
//==============================================================================
// Given an angle in degrees, returns its equivalent in radians.
//==============================================================================

deg2rad: function(deg) {
    return deg * (Math.PI / 180);
},
//[cf]
//[of]:.fileSerial(template, serial)
//==============================================================================
// Given a filename template, replaces the first contiguous sequence of '%' with
// serial zero-padded to the same length. 
//==============================================================================

fileSerial: function(template, serial) {
	return template.replace(/%+/, function(match) { return this.zeroPad(serial, match.length); }); 
},


//[cf]
//[of]:.inArray(a, k)
//==============================================================================
// Returns a boolean indicating whether value k is in array a.
//==============================================================================

inArray: function(a, k) {
    for(var i = 0; i < a.length; i++)
        if(a[i] === k)
            return true;
    return false;
},
//[cf]
//[of]:.prototypeName(obj)
//==============================================================================
// Returns the name of obj's prototype.
//==============================================================================

prototypeName: function(obj) {
    return Object.getPrototypeOf(obj).constructor.name;
},
//[cf]
//[of]:.rad2deg(rad)
//==============================================================================
// Given an angle in radians, returns its equivalent in degrees.
//==============================================================================

rad2deg: function(rad) {
    return rad * (180 / Math.PI);
},
//[cf]
//[of]:.tab(stops)
//==============================================================================
// Outputs a string with stops * 4 spaces. Used in output formatting.
//==============================================================================

tab: function(stops) {
    return new Array(stops).fill("    ").join("");
},
//[cf]
//[of]:.zeroPad(num, pad)
//==============================================================================
// Left-pads num with zeroes until it is pad characters wide. Does nothing if
// num is already greater than pad characters long.
//==============================================================================

zeroPad: function(num, pad) {
	var result = num.toString().split('');
	while(result.length < pad)
		result.unshift('0');
	return result.join('');
},


//[cf]
//[cf]

}
//[cf]
//[of]:ImageOptions
function ImageOptions(opt = { }) {
    this.opt = { };

    for(var k in opt) {
        if(!$CP.inArray($CP.optionList, k))
            throw new RangeError("[ImageOptions]: '" + k + "' is not a valid image option.");
        this[k] = opt[k];
    }

}

//[of]:Attributes/Mutators
//[of]:.allConsole
Object.defineProperty(ImageOptions.prototype, "allConsole", {
    get: function() {
        return this.opt.allConsole === undefined ? null : this.opt.allConsole;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: allConsole must be a boolean.");
        this.opt.allConsole = v;
    }
});
//[cf]
//[of]:.allFile
Object.defineProperty(ImageOptions.prototype, "allFile", {
    get: function() {
        return this.opt.allFile === undefined ? null : this.opt.allFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.allFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: allFile cannot be an empty string.");
            this.opt.allFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: allFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.antialias
Object.defineProperty(ImageOptions.prototype, "antialias", {
    get: function() {
        return this.opt.antialias === undefined ? null : this.opt.antialias;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: antialias must be a boolean.");
        this.opt.antialias = v;
    }
});
//[cf]
//[of]:.antialiasDepth
Object.defineProperty(ImageOptions.prototype, "antialiasDepth", {
    get: function() {
        return this.opt.antialiasDepth === undefined ? null : this.opt.antialiasDepth;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: antialiasDepth must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 9)
            throw new RangeError("[ImageOptions]: antialiasDepth must be an integer in the range 1-9.");
        this.opt.antialiasDepth = vv;
    }
});
//[cf]
//[of]:.antialiasGamma
Object.defineProperty(ImageOptions.prototype, "antialiasGamma", {
    get: function() {
        return this.opt.antialiasGamma === undefined ? null : this.opt.antialiasGamma;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: antialiasGamma must be a float.");
        this.opt.antialiasGamma = v;
    }
});
//[cf]
//[of]:.antialiasThreshold
Object.defineProperty(ImageOptions.prototype, "antialiasThreshold", {
    get: function() {
        return this.opt.antialiasThreshold === undefined ? null : this.opt.antialiasThreshold;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: antialiasThreshold must be a float.");
        if(v < 0)
            throw new RangeError("[ImageOptions]: antialiasThreshold must be >= 0.");
        this.opt.antialiasThreshold = v;
    }
});
//[cf]
//[of]:.appendFile
Object.defineProperty(ImageOptions.prototype, "appendFile", {
    get: function() {
        return this.opt.appendFile === undefined ? null : this.opt.appendFile;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: appendFile must be a boolean.");
        this.opt.appendFile = v;
    }
});
//[cf]
//[of]:.bitsPerColor
Object.defineProperty(ImageOptions.prototype, "bitsPerColor", {
    get: function() {
        return this.opt.bitsPerColor === undefined ? null : this.opt.bitsPerColor;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bitsPerColor must be a number.");
        var vv = Math.floor(v);
        if(vv < 5 || vv > 16)
            throw new RangeError("[ImageOptions]: bitsPerColor must be an integer in the range 5-16.");
        this.opt.bitsPerColor = vv;
    }
});
//[cf]
//[of]:.bounding
Object.defineProperty(ImageOptions.prototype, "bounding", {
    get: function() {
        return this.opt.bounding === undefined ? null : this.opt.bounding;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: bounding must be a boolean.");
        this.opt.bounding = v;
    }
});
//[cf]
//[of]:.boundingMethod
Object.defineProperty(ImageOptions.prototype, "boundingMethod", {
    get: function() {
        return this.opt.boundingMethod === undefined ? null : this.opt.boundingMethod;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: boundingMethod must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 2)
            throw new RangeError("[ImageOptions]: boundingMethod must be in the range 1-2.");
        this.opt.boundingMethod = vv;
    }
});
//[cf]
//[of]:.boundingThreshold
Object.defineProperty(ImageOptions.prototype, "boundingThreshold", {
    get: function() {
        return this.opt.boundingThreshold === undefined ? null : this.opt.boundingThreshold;
    },
    set: function(v) {
        if(typeof v == "boolean" && v == false) {
            this.opt.boundingThreashold = false;
        } else {
            if(typeof v != "number")
                throw new TypeError("[ImageOptions]: boundingThreshold must be either boolean false or an integer.");
            var vv = Math.floor(v);
            if(vv < 1)
                throw new RangeError("[ImageOptions]: boundingThreshold must be a positive integer.");
            this.boundingThreshold = vv;
        }
    }
});
//[cf]
//[of]:.bspBaseAccessCost
Object.defineProperty(ImageOptions.prototype, "bspBaseAccessCost", {
    get: function() {
        return this.opt.bspBaseAccessCost === undefined ? null : this.opt.bspBaseAccessCost;
    },
    set: function(v) {

        // TODO: read Eric Haines' article to understand what these mean.

        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bspBaseAccessCost must be a float.");
        this.opt.bspBaseAccessCost = v;
    }
});
//[cf]
//[of]:.bspChildAccessCost
Object.defineProperty(ImageOptions.prototype, "bspChildAccessCost", {
    get: function() {
        return this.opt.bspChildAccessCost === undefined ? null : this.opt.bspChildAccessCost;
    },
    set: function(v) {

        // TODO: read Eric Haines' article to understand what these mean.

        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bspChildAccessCost must be a float.");
        this.opt.bspChildAccessCost = v;
    }
});
//[cf]
//[of]:.bspIsectCost
Object.defineProperty(ImageOptions.prototype, "bspIsectCost", {
    get: function() {
        return this.opt.bspIsectCost === undefined ? null : this.opt.bspIsectCost;
    },
    set: function(v) {

        // TODO: read Eric Haines' article to understand what these mean.

        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bspIsectCost must be a float.");
        this.opt.bspIsectCost = v;
    }
});
//[cf]
//[of]:.bspMaxDepth
Object.defineProperty(ImageOptions.prototype, "bspMaxDepth", {
    get: function() {
        return this.opt.bspMaxDepth === undefined ? null : this.opt.bspMaxDepth;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bspMaxDepth must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1)
            throw new RangeError("[ImageOptions]: bspMaxDepth must be a positive integer.");
        this.opt.bspMaxDepth = vv;
    }
});
//[cf]
//[of]:.bspMissChance
Object.defineProperty(ImageOptions.prototype, "bspMissChance", {
    get: function() {
        return this.opt.bspMissChance === undefined ? null : this.opt.bspMissChance;
    },
    set: function(v) {

        // TODO: read Eric Haines' article to understand what these mean.

        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: bspMissChance must be a float.");
        this.opt.bspMissChance = v;
    }
});
//[cf]
//[of]:.continueTrace
Object.defineProperty(ImageOptions.prototype, "continueTrace", {
    get: function() {
        return this.opt.continueTrace === undefined ? null : this.opt.continueTrace;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: continueTrace must be a boolean.");
        this.opt.continueTrace = v;
    }
});
//[cf]
//[of]:.constants
Object.defineProperty(ImageOptions.prototype, "constants", {
    get: function() {
        return this.opt.constants === undefined ? null : this.opt.constants;
    },
    set: function(v) {
        if(this.opt.constants === undefined)
            this.opt.constants = { };
        for(var k in v) {
            if(typeof v[k] != "number")
                throw new TypeError("[ImageOptions]: Value of constants must be a float, '" + v[k] + "' given.");
            this.opt.constants[k] = v[k];
        }
    }
});
//[cf]
//[of]:.createIni
Object.defineProperty(ImageOptions.prototype, "createIni", {
    get: function() {
        return this.opt.createIni === undefined ? null : this.opt.createIni;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.createIni = v;
        } else {
            var vv = v.toString().trim();
            if(vv.length == 0) {
                throw new TypeError("[ImageOptions]: createIni must be either a boolean or a valid filename.");
            }
        }
    }
});
//[cf]
//[of]:.debugConsole
Object.defineProperty(ImageOptions.prototype, "debugConsole", {
    get: function() {
        return this.opt.debugConsole === undefined ? null : this.opt.debugConsole;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: debugConsole must be a boolean.");
        this.opt.debugConsole = v;
    }
});
//[cf]
//[of]:.debugFile
Object.defineProperty(ImageOptions.prototype, "debugFile", {
    get: function() {
        return this.opt.debugFile === undefined ? null : this.opt.debugFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.debugFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: debugFile cannot be an empty string.");
            this.opt.debugFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: debugFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.display
Object.defineProperty(ImageOptions.prototype, "display", {
    get: function() {
        return this.opt.display === undefined ? null : this.opt.display;
    },
    set: function(v) {
        if(typeof v == "boolean")
            this.opt.display = v;
        else
            throw new TypeError("[ImageOptions]: display must be a boolean.");
    }
});
//[cf]
//[of]:.displayGamma
Object.defineProperty(ImageOptions.prototype, "displayGamma", {
    get: function() {
        return this.opt.displayGamma === undefined ? null : this.opt.displayGamma;
    },
    set: function(v) {
        if(typeof v != "number" && !(typeof v == "string" && v == "sRGB"))
            throw new TypeError("[ImageOptions]: displayGamma must be a float.");
    }
});
//[cf]
//[of]:.dither
Object.defineProperty(ImageOptions.prototype, "dither", {
    get: function() {
        return this.opt.dither === undefined ? null : this.opt.dither;
    },
    set: function(v) {
        if(typeof v != boolean)
            throw new TypeError("[ImageOptions]: dither must be a boolean");
        this.opt.dither = v;
    }
});
//[cf]
//[of]:.ditherMethod
Object.defineProperty(ImageOptions.prototype, "ditherMethod", {
    get: function() {
        return this.opt.ditherMethod === undefined ? null : this.opt.ditherMethod;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: ditherMethod must be a string.");
        var vv = v.trim();
        if($CP.ditherTypes[vv] === undefined)
            throw new RangeError("[ImageOptions]: ditherMethod must be one of B2, B3, B4, D1, D2, or FS.");
        this.opt.ditherMethod = vv;
    }
});
//[cf]
//[of]:.endColumn
Object.defineProperty(ImageOptions.prototype, "endColumn", {
    get: function() {
        return this.opt.endColumn === undefined ? null : this.opt.endColumn;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: endColumn must be a number.");
        if(v < 0)
            throw new RangeError("[ImageOptions]: endColumn must be >= 0.");
        this.opt.endColumn = v > 1 ? Math.floor(v) : v;
    }
});
//[cf]
//[of]:.endRow
Object.defineProperty(ImageOptions.prototype, "endRow", {
    get: function() {
        return this.opt.endRow === undefined ? null : this.opt.endRow;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: endRow must be a number.");
        if(v < 0)
            throw new RangeError("[ImageOptions]: endRow must be >= 0.");
        this.opt.endRow = v > 1 ? Math.floor(v) : v;
    }
});
//[cf]
//[of]:.fatalConsole
Object.defineProperty(ImageOptions.prototype, "fatalConsole", {
    get: function() {
        return this.opt.fatalConsole === undefined ? null : this.opt.fatalConsole;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: fatalConsole must be a boolean.");
        this.opt.fatalConsole = v;
    }
});
//[cf]
//[of]:.fatalErrorCommand
Object.defineProperty(ImageOptions.prototype, "fatalErrorCommand", {
    get: function() {
        return this.opt.fatalErrorCommand === undefined ? null : this.opt.fatalErrorCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: fatalErrorCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: fatalErrorCommand cannot be an empty string.");
        this.opt.fatalErrorCommand = vv;
    }
});
//[cf]
//[of]:.fatalErrorReturn
Object.defineProperty(ImageOptions.prototype, "fatalErrorReturn", {
    get: function() {
        return this.opt.fatalErrorReturn === undefined ? null : this.opt.fatalErrorReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: fatalErrorReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid fatalErrorReturn value '" + vv + "'.");
        this.opt.fatalErrorReturn = vv;
    }
});
//[cf]
//[of]:.fatalFile
Object.defineProperty(ImageOptions.prototype, "fatalFile", {
    get: function() {
        return this.opt.fatalFile === undefined ? null : this.opt.fatalFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.fatalFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: fatalFile cannot be an empty string.");
            this.opt.fatalFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: fatalFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.fileGamma
Object.defineProperty(ImageOptions.prototype, "fileGamma", {
    get: function() {
        return this.opt.fileGamma === undefined ? null : this.opt.fileGamma;
    },
    set: function(v) {
        if(typeof v == "string") {
            var vv = v.trim();
            if(vv != "sRGB")
                throw new RangeError("[ImageOptions]: fileGamma must be either a float or 'sRGB'.");
            this.opt.fileGamma = vv;
        } else if(typeof v != "number") {
            throw new TypeError("[ImageOptions]: fileGamma must be either a float or 'sRGB'.");
        }
        this.opt.fileGamma = v;
    }
});
//[cf]
//[of]:.height
Object.defineProperty(ImageOptions.prototype, "height", {
    get: function() {
        return this.opt.height === undefined ? null : this.opt.height;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: height must be a number, '" + v + "' given.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: height must be greater than zero, " + vv + " given.");
        this.opt.height = vv;
    }
});
//[cf]
//[of]:.highReproducibility
Object.defineProperty(ImageOptions.prototype, "highReproducibility", {
    get: function() {
        return this.opt.highReproducibility === undefined ? null : this.opt.highReproducibility;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: highReproducibility must be a boolean.");
        this.opt.highReproducibility = v;
    }
});
//[cf]
//[of]:.includeHeader
Object.defineProperty(ImageOptions.prototype, "includeHeader", {
    get: function() {
        return this.opt.includeHeader === undefined ? null : this.opt.includeHeader;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: includeHeader must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: includeHeader must be a valid filename.");
        this.opt.includeHeader = vv;
    }
});
//[cf]
//[of]:.inputFileName
Object.defineProperty(ImageOptions.prototype, "inputFileName", {
    get: function() {
        return this.opt.inputFileName === undefined ? null : this.opt.inputFileName;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: inputFileName must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: inputFileName must be a valid filename.");
        this.opt.inputFileName = vv;
    }
});
//[cf]
//[of]:.jitter
Object.defineProperty(ImageOptions.prototype, "jitter", {
    get: function() {
        return this.opt.jitter === undefined ? null : this.opt.jitter;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: jitter must be a boolean.");
        this.opt.jitter = v;
    }
});
//[cf]
//[of]:.jitterAmount
Object.defineProperty(ImageOptions.prototype, "jitterAmount", {
    get: function() {
        return this.opt.jitterAmount === undefined ? null : this.opt.jitterAmount;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: jitterAmount must be a float.");
        this.opt.jitterAmount = v;
    }
});
//[cf]
//[of]:.libraryPath
Object.defineProperty(ImageOptions.prototype, "libraryPath", {
    get: function() {
        return this.opt.libraryPath === undefined ? null : this.opt.libraryPath;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: libraryPath must be a string.");
        var vv = v.trim().replace(/[\/\\]+$/);
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: libraryPath must be a valid pathname.");

        if(this.opt.libraryPath === undefined)
            this.opt.libraryPath = [ ];

        this.opt.libraryPath.push(vv);
    }
});
//[cf]
//[of]:.maxImageBufferMemory
Object.defineProperty(ImageOptions.prototype, "maxImageBufferMemory", {
    get: function() {
        return this.opt.maxImageBufferMemory === undefined ? null : this.opt.maxImageBufferMemory;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: maxImageBufferMemory must be a number, '" + v + "' given.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: maxImageBufferMemory must be greater than zero, " + vv + " given.");
        this.opt.maxImageBufferMemory = vv;
    }

});
//[cf]
//[of]:.outputAlpha
Object.defineProperty(ImageOptions.prototype, "outputAlpha", {
    get: function() {
        return this.opt.outputAlpha === undefined ? null : this.opt.outputAlpha;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: outputAlpha must be a boolean.");
        this.opt.outputAlpha = v;
    }
});
//[cf]
//[of]:.outputFileName
Object.defineProperty(ImageOptions.prototype, "outputFileName", {
    get: function() {
        return this.opt.outputFileName === undefined ? null : this.opt.outputFileName;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: outputFileName must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: outputFileName must be a valid filename.");
        this.opt.outputFileName = vv;
    }
});
//[cf]
//[of]:.outputFileType
Object.defineProperty(ImageOptions.prototype, "outputFileType", {
    get: function() {
        return this.opt.outputFileType === undefined ? null : this.opt.outputFileType;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: outputFileType must be a string.");
        var vv = v.trim();
        if(vv.length != 1)
            throw new RangeError("[ImageOptions]: outputFileType must be a single character.");
        if($CP.outputFileTypes[vv] === undefined)
            throw new RangeError("[ImageOptions]: outputFileType must be one of B, C, E, H, J, N, P, S, T.");
        this.opt.outputFileType = vv;
    }
});
//[cf]
//[of]:.outputToFile
Object.defineProperty(ImageOptions.prototype, "outputToFile", {
    get: function() {
        return this.opt.outputToFile === undefined ? null : this.opt.outputToFile;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: outputToFile must be a boolean.");
        this.opt.outputToFile = v;
    }
});
//[cf]
//[of]:.palette
Object.defineProperty(ImageOptions.prototype, "palette", {
    get: function() {
        return this.opt.palette === undefined ? null : this.opt.palette;
    },
    set: function(v) {
        if(typeof v != "string" && typeof v != "number")
            throw new TypeError("[ImageOptions]: palette must be a single number or character.");
        var vv = v.toString();
        if(vv.length != 1)
            throw new RangeError("[ImageOptions]: palette must be a single number or character.");
        this.opt.palette = vv;
    }
});
//[cf]
//[of]:.pauseWhenDone
Object.defineProperty(ImageOptions.prototype, "pauseWhenDone", {
    get: function() {
        return this.opt.pauseWhenDone === undefined ? null : this.opt.pauseWhenDone;
    },
    set: function(v) {
        if(typeof v == "boolean")
            this.opt.pauseWhenDone = v;
        else
            throw new TypeError("[ImageOptions]: pauseWhenDone must be a boolean.");
    }
});
//[cf]
//[of]:.postFrameCommand
Object.defineProperty(ImageOptions.prototype, "postFrameCommand", {
    get: function() {
        return this.opt.postFrameCommand === undefined ? null : this.opt.postFrameCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: postFrameCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: postFrameCommand cannot be an empty string.");
        this.opt.postFrameCommand = vv;
    }
});
//[cf]
//[of]:.postFrameReturn
Object.defineProperty(ImageOptions.prototype, "postFrameReturn", {
    get: function() {
        return this.opt.postFrameReturn === undefined ? null : this.opt.postFrameReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: postFrameReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid postFrameReturn value '" + vv + "'.");
        this.opt.postFrameReturn = vv;
    }
});
//[cf]
//[of]:.postSceneCommand
Object.defineProperty(ImageOptions.prototype, "postSceneCommand", {
    get: function() {
        return this.opt.postSceneCommand === undefined ? null : this.opt.postSceneCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: postSceneCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: postSceneCommand cannot be an empty string.");
        this.opt.postSceneCommand = vv;
    }
});
//[cf]
//[of]:.postSceneReturn
Object.defineProperty(ImageOptions.prototype, "postSceneReturn", {
    get: function() {
        return this.opt.postSceneReturn === undefined ? null : this.opt.postSceneReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: postSceneReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid postSceneReturn value '" + vv + "'.");
        this.opt.postSceneReturn = vv;
    }
});
//[cf]
//[of]:.preFrameCommand
Object.defineProperty(ImageOptions.prototype, "preFrameCommand", {
    get: function() {
        return this.opt.preFrameCommand === undefined ? null : this.opt.preFrameCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: preFrameCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: preFrameCommand cannot be an empty string.");
        this.opt.preFrameCommand = vv;
    }
});
//[cf]
//[of]:.preFrameReturn
Object.defineProperty(ImageOptions.prototype, "preFrameReturn", {
    get: function() {
        return this.opt.preFrameReturn === undefined ? null : this.opt.preFrameReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: preFrameReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid preFrameReturn value '" + vv + "'.");
        this.opt.preFrameReturn = vv;
    }
});
//[cf]
//[of]:.preSceneCommand
Object.defineProperty(ImageOptions.prototype, "preSceneCommand", {
    get: function() {
        return this.opt.preSceneCommand === undefined ? null : this.opt.preSceneCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: preSceneCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: preSceneCommand cannot be an empty string.");
        this.opt.preSceneCommand = vv;
    }
});
//[cf]
//[of]:.preSceneReturn
Object.defineProperty(ImageOptions.prototype, "preSceneReturn", {
    get: function() {
        return this.opt.preSceneReturn === undefined ? null : this.opt.preSceneReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: preSceneReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid preSceneReturn value '" + vv + "'.");
        this.opt.preSceneReturn = vv;
    }
});
//[cf]
//[of]:.previewEndSize
Object.defineProperty(ImageOptions.prototype, "previewEndSize", {
    get: function() {
        return this.opt.previewEndSize === undefined ? null : this.opt.previewEndSize;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: previewEndSize must be an integer.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: previewEndSize must be greater than zero");
        this.opt.previewEndSize = vv;
    }
});
//[cf]
//[of]:.previewStartSize
Object.defineProperty(ImageOptions.prototype, "previewStartSize", {
    get: function() {
        return this.opt.previewStartSize === undefined ? null : this.opt.previewStartSize;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: previewStartSize must be an integer.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: previewStartSize must be greater than zero");
        this.opt.previewStartSize = vv;
    }
});
//[cf]
//[of]:.quality
Object.defineProperty(ImageOptions.prototype, "quality", {
    get: function() {
        return this.opt.quality === undefined ? null : this.opt.quality;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: quality must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0 || vv > 11)
            throw new RangeError("[ImageOptions]: quality must be in the range 0-11.");
        this.opt.quality = vv;
    }
});
//[cf]
//[of]:.radiosityFileName
Object.defineProperty(ImageOptions.prototype, "radiosityFileName", {
    get: function() {
        return this.opt.radiosityFileName === undefined ? null : this.opt.radiosityFileName;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: radiosityFileName must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: radiosityFileName must be a valid filename.");
        this.opt.radiosityFileName = vv;
    }
});
//[cf]
//[of]:.radiosityFromFile
Object.defineProperty(ImageOptions.prototype, "radiosityFromFile", {
    get: function() {
        return this.opt.radiosityFromFile === undefined ? null : this.opt.radiosityFromFile;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: radiosityFromFile must be a boolean.");
        this.opt.radiosityFromFile = v;
    }
});
//[cf]
//[of]:.radiosityToFile
Object.defineProperty(ImageOptions.prototype, "radiosityToFile", {
    get: function() {
        return this.opt.radiosityToFile === undefined ? null : this.opt.radiosityToFile;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: radiosityToFile must be a boolean.");
        this.opt.radiosityToFile = v;
    }
});
//[cf]
//[of]:.radiosityVainPretrace
Object.defineProperty(ImageOptions.prototype, "radiosityVainPretrace", {
    get: function() {
        return this.opt.radiosityVainPretrace === undefined ? null : this.opt.radiosityVainPretrace;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: radiosityVainPretrace must be a boolean.");
        this.opt.radiosityVainPretrace = v;
    }
});
//[cf]
//[of]:.removeBounds
Object.defineProperty(ImageOptions.prototype, "removeBounds", {
    get: function() {
        return this.opt.removeBounds === undefined ? null : this.opt.removeBounds;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: removeBounds must be a boolean.");
        this.removeBounds = v;
    }
});
//[cf]
//[of]:.renderBlockSize
Object.defineProperty(ImageOptions.prototype, "renderBlockSize", {
    get: function() {
        return this.opt.renderBlockSize === undefined ? null : this.opt.renderBlockSize;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: renderBlockSize must be an integer.");
        var vv = Math.floor(v);
        if(vv < 4)
            throw new RangeError("[ImageOptions]: renderBlockSize must be >= 4.");
        this.opt.renderBlockSize = vv;
    }
});
//[cf]
//[of]:.renderBlockStep
Object.defineProperty(ImageOptions.prototype, "renderBlockStep", {
    get: function() {
        return this.opt.renderBlockStep === undefined ? null : this.opt.renderBlockStep;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: renderBlockStep must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1)
            throw new RangeError("[ImageOptions]: renderBlockStep must be >= 1.");
        this.opt.renderBlockStep = vv;
    }
});
//[cf]
//[of]:.renderConsole
Object.defineProperty(ImageOptions.prototype, "renderConsole", {
    get: function() {
        return this.opt.renderConsole === undefined ? null : this.opt.renderConsole;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: renderConsole must be a boolean.");
        this.opt.renderConsole = v;
    }
});
//[cf]
//[of]:.renderFile
Object.defineProperty(ImageOptions.prototype, "renderFile", {
    get: function() {
        return this.opt.renderFile === undefined ? null : this.opt.renderFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.renderFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: renderFile cannot be an empty string.");
            this.opt.renderFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: renderFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.renderPattern
Object.defineProperty(ImageOptions.prototype, "renderPattern", {
    get: function() {
        return this.opt.renderPattern === undefined ? null : this.opt.renderPattern;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: renderPattern must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0 || vv > 5)
            throw new RangeError("[ImageOptions]: renderPattern must be in the range 0-5.");
        this.opt.renderPattern = vv;
    }
});
//[cf]
//[of]:.samplingMethod
Object.defineProperty(ImageOptions.prototype, "samplingMethod", {
    get: function() {
        return this.opt.samplingMethod === undefined ? null : this.opt.samplingMethod;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: samplingMethod must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 2)
            throw new RangeError("[ImageOptions]: samplingMethod must be in the range 1-2.");
        this.opt.samplingMethod = vv;
    }
});
//[cf]
//[of]:.splitUnions
Object.defineProperty(ImageOptions.prototype, "splitUnions", {
    get: function() {
        return this.opt.splitUnions === undefined ? null : this.opt.splitUnions;
    },
    set: function(v) {
       if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: splitUnions must be a boolean.");
        this.splitUnions = v;
    }
});
//[cf]
//[of]:.startColumn
Object.defineProperty(ImageOptions.prototype, "startColumn", {
    get: function() {
        return this.opt.startColumn === undefined ? null : this.opt.startColumn;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: startColumn must be a number.");
        if(v < 0)
            throw new RangeError("[ImageOptions]: startColumn must be >= 0.");
        this.opt.startColumn = v > 1 ? Math.floor(v) : v;
    }
});
//[cf]
//[of]:.startRow
Object.defineProperty(ImageOptions.prototype, "startRow", {
    get: function() {
        return this.opt.startRow === undefined ? null : this.opt.startRow;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: startRow must be a number.");
        if(v < 0)
            throw new RangeError("[ImageOptions]: startRow must be >= 0.");
        this.opt.startRow = v > 1 ? Math.floor(v) : v;
    }
});
//[cf]
//[of]:.statisticConsole
Object.defineProperty(ImageOptions.prototype, "statisticConsole", {
    get: function() {
        return this.opt.statisticConsole === undefined ? null : this.opt.statisticConsole;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: statisticConsole must be a boolean.");
        this.opt.statisticConsole = v;
    }
});
//[cf]
//[of]:.statisticFile
Object.defineProperty(ImageOptions.prototype, "statisticFile", {
    get: function() {
        return this.opt.statisticFile === undefined ? null : this.opt.statisticFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.statisticFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: statisticFile cannot be an empty string.");
            this.opt.statisticFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: statisticFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.testAbort
Object.defineProperty(ImageOptions.prototype, "testAbort", {
    get: function() {
        return this.opt.testAbort === undefined ? null : this.opt.testAbort;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[ImageOptions]: testAbort must be a boolean.");
        this.opt.testAbort = v;
    }
});
//[cf]
//[of]:.testAbortCount
Object.defineProperty(ImageOptions.prototype, "testAbortCount", {
    get: function() {
        return this.opt.testAbortCount === undefined ? null : this.opt.testAbortCount;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: testAbortCount must be a number, '" + v + "' given.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: testAbortCount must be >= 1, " + vv + " given.");
    }
});
//[cf]
//[of]:.userAbortCommand
Object.defineProperty(ImageOptions.prototype, "userAbortCommand", {
    get: function() {
        return this.opt.userAbortCommand === undefined ? null : this.opt.userAbortCommand;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[ImageOptions]: userAbortCommand must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: userAbortCommand cannot be an empty string.");
        this.opt.userAbortCommand = vv;
    }
});
//[cf]
//[of]:.userAbortReturn
Object.defineProperty(ImageOptions.prototype, "userAbortReturn", {
    get: function() {
        return this.opt.userAbortReturn === undefined ? null : this.opt.userAbortReturn;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: userAbortReturn must be a string.");
        var vv = v.trim();
        if($CP.returnActions[vv] === undefined)
            throw new RangeError("[ImageOptions]: Invalid userAbortReturn value '" + vv + "'.");
        this.opt.userAbortReturn = vv;
    }
});
//[cf]
//[of]:.verbose
Object.defineProperty(ImageOptions.prototype, "verbose", {
    get: function() {
        return this.opt.verbose === undefined ? null : this.opt.verbose;
    },
    set: function(v) {
        if(typeof v == "boolean")
            this.opt.verbose = v;
        else
            throw new TypeError("[ImageOptions]: verbose must be a boolean.");
    }
});
//[cf]
//[of]:.videoMode
Object.defineProperty(ImageOptions.prototype, "videoMode", {
    get: function() {
        return this.opt.videoMode === undefined ? null : this.opt.videoMode;
    },
    set: function(v) {
        if(typeof v != "string" && typeof v != "number")
            throw new TypeError("[ImageOptions]: videoMode must be a single number or character.");
        var vv = v.toString();
        if(vv.length != 1)
            throw new RangeError("[ImageOptions]: videoMode must be a single number or character.");
        this.opt.videomode = vv;
    }
});
//[cf]
//[of]:.warningFile
Object.defineProperty(ImageOptions.prototype, "warningFile", {
    get: function() {
        return this.opt.warningFile === undefined ? null : this.opt.warningFile;
    },
    set: function(v) {
        if(typeof v == "boolean") {
            this.opt.warningFile = v;
        } else if(typeof v == "string") {
            var vv = v.trim();
            if(vv.length == 0)
                throw new RangeError("[ImageOptions]: warningFile cannot be an empty string.");
            this.opt.warningFile = vv;
        } else {
            throw new TypeError("[ImageOptions]: warningFile must be either a boolean or a valid filename.");
        }
    }
});
//[cf]
//[of]:.warningLevel
Object.defineProperty(ImageOptions.prototype, "warningLevel", {
    get: function() {
        return this.opt.warningLevel === undefined ? null : this.opt.warningLevel;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: warningLevel must be an integer.");
        var vv = Math.floor(v);
        if(vv != 0 && vv != 5 && vv != 10)
            throw new RangeError("[ImageOptions]: warningLevel must be 0, 5, or 10.");
        this.warningLevel = vv;
    }
});
//[cf]
//[of]:.width
Object.defineProperty(ImageOptions.prototype, "width", {
    get: function() {
        return this.opt.width === undefined ? null : this.opt.width;
    },
    set: function(v) {
        var vv = Math.floor(v);
        if(isNaN(vv))
            throw new TypeError("[ImageOptions]: width must be a number, '" + v + "' given.");
        if(vv < 1)
            throw new RangeError("[ImageOptions]: width must be greater than zero, " + vv + " given.");
        this.opt.width = vv;
    }
});
//[cf]
//[of]:.workThreads
Object.defineProperty(ImageOptions.prototype, "workThreads", {
    get: function() {
        return this.opt.workThreads === undefined ? null : this.opt.workThreads;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[ImageOptions]: workThreads must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 512)
            throw new RangeError("[ImageOptions]: workThreads must be in the range 1-512.");
        this.opt.workThreads = vv;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toJSON()
ImageOptions.prototype.toJSON = function() {
    return JSON.stringify(this.opt);
}
//[cf]
//[of]:.unset(opt)
ImageOptions.prototype.unset = function(opt) {
    delete this.opt[opt];
}
//[cf]
//[of]:.unsetAll(opt)
ImageOptions.prototype.unsetAll = function(opt) {
    this.opt = { };
}
//[cf]
//[of]:.validateAndOutput()
//------------------------------------------------------------------------------
// Performs some aggregate tests on the final state of the image options, and
// if none are found, returns an object containing two members, ini and cli,
// corresponding to the contents of the ini file and the commandline version,
// respectively.

ImageOptions.prototype.validateAndOutput = function() {
    var ini     = [];
    var cli     = [];
    var iniWarn = [];
    var cliWarn = [];

    for(var i = 0; i < $CP.optionList.length; i++) {

        var opt = $CP.optionList[i];

        if(opt != "Width" && opt != "Height" && this.opt[opt] === undefined)
            continue;

        switch(opt) {
            case "allConsole":
                if(this.opt.allFile === undefined) {
                    ini.push("All_Console=" + this.opt.allConsole);
                    cli.push((this.opt.allConsole ? "+" : "-") + "GA");
                }
                break;
            case "allFile":
                ini.push("All_File=" + this.opt.allFile);
                cli.push(
                    (this.opt.allConsole === undefined || this.opt.allConsole === false ? "-" : "+")
                    + "GA"
                    + (typeof this.optAllFile == "string" ? this.optAllFile : "")
                );
                break;
            case "antialias":
                ini.push("Antialias=" + (this.opt.antialias ? "true" : "false"));
                if(this.opt.antialiasThreshold === undefined) {
                    cli.push((this.opt.antialias ? "+" : "-") + "A");
                }
                break;
            case "antialiasDepth":
                ini.push("Antialias_Depth=" + this.opt.antialiasDepth);
                cli.push("+R" + this.opt.antialiasDepth);
                break;
            case "antialiasGamma":
                ini.push("Antialias_Gamma=" + this.opt.antialiasGamma);
                cli.push("+AG" + this.opt.antialiasGamma);
                break;
            case "antialiasThreshold":
                ini.push("Antialias_Threshold=" + this.opt.antialiasThreshold);
                cli.push((this.opt.antialias ? "+" : "-") + "A" + this.opt.antialiasThreshold);
                break;
            case "appendFile":
                ini.push("Append_File=" + (this.opt.appendFile ? "true" : "false"));
                cli.push((this.opt.appendFile ? "+" : "-") + "GP");
                break;
            case "bitsPerColor":
                ini.push("Bits_Per_Color=" + this.opt.bitsPerColor);
                break;
            case "bounding":
                ini.push("Bounding=" + (this.opt.bounding ? "true" : "false"));
                if(this.opt.boundingThreshold === undefined) {
                    cli.push((this.opt.bounding ? "+" : "-") + "MB");
                };
                break;
            case "boundingMethod":
                ini.push("Bounding_Method=" + this.opt.boundingMethod);
                cli.push("+BM" + this.opt.boundingMethod);
                break;
            case "boundingThreshold":
                ini.push("Bounding_Threshold=" + this.opt.boundingThreshold);
                cli.push(
                    (this.opt.bounding !== undefined || this.opt.bounding ? "+" : "-")
                    + "MB" + this.opt.boundingThreshold
                );
                break;
            case "bspBaseAccessCost":
                ini.push("BSP_BaseAccessCost=" + this.opt.bspBaseAccessCost);
                break;
            case "bspChildAccessCost":
                ini.push("BSP_ChildAccessCost=" + this.opt.bspChildAccessCost);
                break;
            case "bspIsectCost":
                ini.push("BSP_IsectCost=" + this.opt.bspIsectCost);
                break;
            case "bspMaxDepth":
                ini.push("BSP_MaxDepth=" + this.opt.bspMaxDepth);
                break;
            case "bspMissChance":
                ini.push("BSP_MissChance=" + this.opt.bspMissChance);
                break;
            case "constants":
                break;
            case "continueTrace":
                ini.push("Continue_Trace=" + this.opt.continueTrace);
                cli.push(this.opt.continueTrace ? "+C" : "-C");
                break;
            case "createIni":
                if(typeof this.opt.createIni == "boolean") {
                    ini.push("Create_Ini=" + (this.opt.createIni ? "true" : "false"));
                } else {
                    ini.push("Create_Ini=" + this.opt.createIni);
                    cli.push("+GI" + this.opt.createIni);
                }
                break;
            case "debugConsole":
                if(this.opt.allConsole === undefined)
                    ini.push("Debug_Console=" + this.opt.debugConsole);
                if(this.opt.debugFile === undefined && this.opt.allFile === undefined)
                    cli.push((this.opt.debugConsole ? "+" : "-") + "GD");
                break;
            case "debugFile":
                if(this.optAllFile === undefined) {
                    ini.push("Debug_File=" + this.opt.debugFile);
                    cli.push(
                        (this.opt.debugConsole === undefined || this.opt.debugConsole === false ? "-" : "+")
                        + "GD"
                        + (typeof this.opt.debugFile == "string" ? this.opt.debugFile : "")
                    );
                }
                break;
            case "display":
                ini.push("Display=" + (this.opt.display ? "true" : "false"));
                if(this.opt.videoMode === undefined)
                    cli.push(this.opt.display ? "+D" : "-D");
                break;
            case "displayGamma":
                ini_push("Display_Gamma=" + this.opt.displayGamma);
                break;
            case "dither":
                ini.push("Dither=" + (this.opt.dither ? "true" : "false"));
                if(this.opt.ditherMethod === undefined)
                    cli.push((this.opt.dither ? "+" : "-") + "TH");
                break;
            case "ditherMethod":
                ini.push("Dither_Method=" + this.opt.ditherMethod);
                cli.push((this.opt.dither ? "+" : "-") + "TH" + this.opt.ditherMethod);
                break;
            case "endColumn":
                ini.push("End_Column=" + this.opt.endColumn);
                cli.push("+EC" + this.opt.endColumn);
                break;
            case "endRow":
                ini.push("End_Row=" + this.opt.endRow);
                cli.push("+ER" + this.opt.endRow);
                break;
            case "fatalConsole":
                if(this.opt.allConsole === undefined)
                        ini.push("Fatal_Console=" + this.opt.fatalConsole);
                if(this.opt.fatalFile === undefined && this.opt.allFile === undefined)
                    cli.push((this.opt.fatalConsole ? "+" : "-") + "GF");
                break;
            case "fatalErrorCommand":
                ini.push("Fatal_Error_Command=" + this.opt.fatalErrorCommand);
                break;
            case "fatalErrorReturn":
                ini.push("Fatal_Error_Return=" + this.fatalErrorReturn);
                break;
            case "fatalFile":
                if(this.optAllFile === undefined) {
                    ini.push("Fatal_File=" + this.opt.fatalFile);
                    cli.push(
                        (this.opt.fatalConsole === undefined || this.opt.fatalConsole === false ? "-" : "+")
                        + "GF"
                        + (typeof this.opt.fatalFile == "string" ? this.opt.fatalFile : "")
                    );
                }
                break;
            case "fileGamma":
                ini.push("File_Gamma=" + this.opt.fileGamma);
                break;
            case "height":
                if(this.opt.width === undefined || this.opt.height === undefined)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Height=" + this.opt.height);
                cli.push("+H" + this.opt.height);
                break;
            case "highReproducibility":
                ini.push("High_Reproducibility=" + (this.opt.highReproducibility ? "true" : "false"));
                if(this.opt.highReproducibility)
                    cli.push("+HR");
                break;
            case "includeHeader":
                ini.push("Include_Header=" + this.opt.includeHeader);
                cli.push("+HI" + this.opt.includeHeader);
                break;
            case "inputFileName":
                ini.push("Input_File_Name=" + this.opt.inputFileName);
                cli.push("+I" + this.opt.inputFileName);
                break;
            case "jitter":
                ini.push("Jitter=" + (this.opt.jitter ? "true" : "false"));
                if(this.opt.jitterAmount === undefined) {
                    cli.push((this.opt.jitter ? "+" : "-") + "J");
                }
                break;
            case "jitterAmount":
                ini.push("Jitter_Amount=" + this.opt.jitterAmount);
                cli.push((this.opt.jitterAmount > 0 ? "+" : "-" ) + "J" + this.opt.jitterAmount);
                break;
            case "libraryPath":
                ini.push("Library_Path=" + this.opt.libraryPath);
                cli.push("+L" + this.opt.libraryPath);
                break;
            case "maxImageBufferMemory":
                ini.push("Max_Image_Buffer_Memory=" + this.opt.maxImageBufferMemory);
                cli.push("+MI" + this.opt.maxImageBufferMemory);
                break;
            case "outputAlpha":
                ini.push("Output_Alpha=" + (this.opt.outputAlpha ? "true" : "false"));
                cli.push((this.outputAlpha ? "+" : "-") + "UA");
                break;
            case "outputFileName":
                ini.push("Output_File_Name=" + this.opt.outputFileName);
                cli.push("+O" + this.opt.outputFileName);
                break;
            case "outputFileType":
                ini.push("Output_File_Type=" + this.opt.outputFileType);
                cli.push(
                    ((this.opt.outputToFile === undefined || this.opt.outputToFile === false) ? "-" : "+")
                    + this.opt.outputFileType
                    + (this.opt.bitsPerColor === undefined ? "" : this.opt.bitsPerColor)
                );
                break;
            case "outputToFile":
                if(this.opt.outputFileType === undefined) {
                    ini.push("Output_to_File=" + (this.opt.outputToFile ? "true" : "false"));
                    cli.push(this.opt.outputToFile ? "+F" : "-F");
                }
                break;
            case "palette":
                ini.push("Palette=" + this.opt.palette);
                if(this.opt.videoMode !== undefined)
                    cli.push(
                        (this.opt.display ? "+" : "-")
                        + "D"
                        + this.opt.videoMode + this.opt.palette
                    );
                break;
            case "pauseWhenDone":
                ini.push("Pause_When_Done=" + (this.opt.pauseWhenDone ? "true" : "false"));
                cli.push(this.opt.pauseWhenDone ? "+P" : "-P");
                break;
            case "postFrameCommand":
                ini.push("Post_Frame_Command=" + this.opt.postFrameCommand);
                break;
            case "postFrameReturn":
                ini.push("Post_Frame_Return=" + this.postFrameReturn);
                break;
            case "postSceneCommand":
                ini.push("Post_Scene_Command=" + this.opt.postSceneCommand);
                break;
            case "postSceneReturn":
                ini.push("Post_Scene_Return=" + this.postSceneReturn);
                break;
            case "preFrameCommand":
                ini.push("Pre_Frame_Command=" + this.opt.preFrameCommand);
                break;
            case "preFrameReturn":
                ini.push("Pre_Frame_Return=" + this.preFrameReturn);
                break;
            case "preSceneCommand":
                ini.push("Pre_Scene_Command=" + this.opt.postSceneCommand);
                break;
            case "preSceneReturn":
                ini.push("Pre_Scene_Return=" + this.preSceneReturn);
                break;
            case "previewEndSize":
                if(this.opt.previewStartSize !== undefined) {
                    ini.push("Preview_End_Size=" + this.opt.previewEndSize);
                    cli.push("+EP" + this.opt.previewEndSize);
                }
                break;
            case "previewStartSize":
                ini.push("Preview_Start_Size=" + this.opt.previewStartSize);
                cli.push("+SP" + this.opt.previewStartSize);
                break;
            case "quality":
                ini.push("Quality=" + this.opt.quality);
                cli.push("+Q" + this.opt.quality);
                break;
            case "radiosityFileName":
                ini.push("Radiosity_File_Name=" + this.opt.radiosityFileName);
                cli.push("+RF" + this.opt.radiosityFileName);
                break;
            case "radiosityFromFile":
                ini.push("Radiosity_From_File=" + (this.opt.radiosityFromFile ? "true" : "false"));
                if(this.opt.radiosityFromFile)
                    cli.push("+RFI");
                break;
            case "radiosityToFile":
                ini.push("Radiosity_To_File=" + (this.opt.radiosityToFile ? "true" : "false"));
                if(this.opt.radiosityToFile)
                    cli.push("+RFO");
                break;
            case "radiosityVainPretrace":
                ini.push("Radiosity_Vain_Pretrace=" + (this.opt.radiosityVainPretrace ? "true" : "false"));
                cli.push(this.opt.radiosityVainPretrace ? "+RVP" : "-RVP");
                break;
            case "removeBounds":
                ini.push("Remove_Bounds=" + (this.opt.removeBounds ? "true" : "false"));
                cli.push((this.opt.removeBounds ? "+" : "-") + "UR");
                break;
            case "renderBlockSize":
                ini.push("Render_Block_Size=" + this.opt.renderBlockSize);
                cli.push("+BS" + this.opt.renderBlockSize);
                break;
            case "renderBlockStep":
                ini.push("Render_Block_Step=" + this.opt.renderBlockStep);
                cli.push("+RS" + this.opt.renderBlockStep);
                break;
            case "renderConsole":
                if(this.opt.allConsole === undefined)
                    ini.push("Render_Console=" + this.opt.renderConsole);
                if(this.opt.renderFile === undefined && this.opt.allFile === undefined)
                    cli.push((this.opt.renderConsole ? "+" : "-") + "GR");
                    break;
            case "renderFile":
                if(this.optAllFile === undefined) {
                    ini.push("Render_File=" + this.opt.renderFile);
                    cli.push(
                        (this.opt.renderConsole === undefined || this.opt.renderConsole === false ? "-" : "+")
                        + "GR"
                        + (typeof this.opt.renderFile == "string" ? this.opt.renderFile : "")
                    );
                }
                break;
            case "renderPattern":
                ini.push("Render_Pattern=" + this.opt.renderPattern);
                cli.push("+RP" + this.opt.renderPattern);
                break;
            case "samplingMethod":
                ini.push("Sampling_Method=" + this.opt.samplingMethod);
                cli.push("+AM" + this.opt.samplingMethod);
                break;
            case "splitUnions":
                ini.push("Split_Unions=" + (this.opt.splitUnions ? "true" : "false"));
                cli.push((this.opt.splitUnions ? "+" : "-") + "SU");
                break;
            case "startColumn":
                ini.push("Start_Column=" + this.opt.startColumn);
                cli.push("+SC" + this.opt.startColumn);
                break;
            case "startRow":
                ini.push("Start_Row=" + this.opt.startRow);
                cli.push("+SR" + this.opt.startRow);
                break;
            case "statisticConsole":
                if(this.opt.allConsole === undefined)
                    ini.push("Statistic_Console=" + this.opt.statisticConsole);
                if(this.opt.statisticFile === undefined && this.opt.allFile === undefined)
                    cli.push((this.opt.statisticConsole ? "+" : "-") + "GS");
                break;
            case "statisticFile":
                if(this.optAllFile === undefined) {
                    ini.push("Statistic_File=" + this.opt.statisticFile);
                    cli.push(
                        (this.opt.statisticConsole === undefined || this.opt.statisticConsole === false ? "-" : "+")
                        + "GS"
                        + (typeof this.opt.statisticFile == "string" ? this.opt.statisticFile : "")
                    );
                }
                break;
            case "testAbort":
                if(this.opt.testAbortCount !== undefined) {
                    ini.push("Test_Abort=" + (this.opt.testAbort ? "true" : "false"));
                    cli.push(this.opt.testAbort ? "+X" : "-X");
                }
                break;
            case "testAbortCount":
                ini.push("Test_Abort_Count=" + this.opt.testAbortCount);
                if(this.opt.testAbort !== undefined)
                    cli.push((this.opt.testAbort ? "+" : "-") + "X" + this.opt.testAbortCount)
                else
                    cli.push("+X" + this.opt.testAbortCount);
                break;
            case "userAbortCommand":
                ini.push("User_Abort_Command=" + this.opt.userAbortCommand);
                break;
            case "userAbortReturn":
                ini.push("User_Abort_Return=" + this.userAbortReturn);
                break;
            case "verbose":
                ini.push("Verbose=" + (this.opt.verbose ? "true" : "false"));
                cli.push(this.opt.verbose ? "+V" : "-V");
                break;
            case "videoMode":
                ini.push("Video_Mode=" + this.opt.videoMode);
                if(this.opt.palette === undefined)
                    cli.push((this.opt.videoMode ? "+" : "-") + "D" + this.opt.videoMode);
                break;
            case "warningConsole":
                if(this.opt.allConsole === undefined)
                    ini.push("Warning_Console=" + this.opt.warningConsole);
                if(this.opt.warningFile === undefined && this.opt.allFile === undefined)
                    cli.push((this.opt.warningConsole ? "+" : "-") + "GW");
                break;
            case "warningFile":
                if(this.optAllFile === undefined) {
                    ini.push("Warning_File=" + this.opt.warningFile);
                    cli.push(
                        (this.opt.warningConsole === undefined || this.opt.warningConsole === false ? "-" : "+")
                        + "GW"
                        + (typeof this.opt.warningFile == "string" ? this.opt.warningFile : "")
                    );
                }
                break;
            case "warningLevel":
                ini.push("Warning_Level=" + this.opt.warningLevel);
                cli.push("+WL" + this.opt.warningLevel);
                break;
            case "width":
                if(this.opt.width === undefined || this.opt.height === undefined)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Width=" + this.opt.width);
                cli.push("+W" + this.opt.width);
                break;
            case "workThreads":
                ini.push("Work_Threads=" + this.opt.workThreads);
                cli.push("+WT" + this.opt.workThreads);
                break;
            default:
                break;
        }
    }

	cli.unshift("povray");

	return { ini: ini.join("\n"), cli: cli.join(" ") };

}
//[cf]
//[cf]



//[cf]
//[of]:VectorUV

function VectorUV(u, v) {
    this._u = u;
    this._v = v;
}

//[of]:Attributes/Mutators
//[of]:.u
Object.defineProperty(VectorUV.prototype, "u", {
    get: function() {
        return typeof this._u == "function" ? this._u() : this._u;
    },
    set: function(val) {
        this._u = val;
    }
});
//[cf]
//[of]:.v
Object.defineProperty(VectorUV.prototype, "v", {
    get: function() {
        return typeof this._v == "function" ? this._v() : this._v;
    },
    set: function(val) {
        this._v = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toString()
VectorUV.prototype.toString = function() {
    return "<" + this.u + ", " + this.v + ">";

}
//[cf]
//[cf]
//[cf]
//[of]:VectorXYZ
//==============================================================================

function VectorXYZ(x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z;
}

//[of]:Attributes/Mutators
//[of]:.x
Object.defineProperty(VectorXYZ.prototype, "x", {
    get: function() {
        return typeof this._x == "function" ? this._x() : this._x;
    },
    set: function(val) {
        this._x = val;
    }
});
//[cf]
//[of]:.y
Object.defineProperty(VectorXYZ.prototype, "y", {
    get: function() {
        return typeof this._y == "function" ? this._y() : this._y;
    },
    set: function(val) {
        this._y = val;
    }
});
//[cf]
//[of]:.z
Object.defineProperty(VectorXYZ.prototype, "z", {
    get: function() {
        return typeof this._z == "function" ? this._z() : this._z;
    },
    set: function(val) {
        this._z = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toString()
VectorXYZ.prototype.toString = function() {
    return "<" + this.x + ", " + this.y + ", " + this.z + ">";
}
//[cf]
//[cf]

//[cf]
//[of]:VectorRGB
function VectorColor(r, g, b, f, t, srgb) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._f = f;
    this._t = t;
    this._srgb = srgb === undefined ? false : srgb;
}

//[of]:Attributes/Mutators
//[of]:.r
Object.defineProperty(VectorColor.prototype, "r", {
    get: function() {
        return typeof this._r == "function" ? this._r() : this._r;
    },
    set: function(val) {
        this._r = val;
    }
});
//[cf]
//[of]:.g
Object.defineProperty(VectorColor.prototype, "g", {
    get: function() {
        return typeof this._g == "function" ? this._g() : this._g;
    },
    set: function(val) {
        this._g = val;
    }
});
//[cf]
//[of]:.b
Object.defineProperty(VectorColor.prototype, "b", {
    get: function() {
        return typeof this._b == "function" ? this._b() : this._b;
    },
    set: function(val) {
        this._b = val;
    }
});
//[cf]
//[of]:.f
Object.defineProperty(VectorColor.prototype, "f", {
    get: function() {
        return typeof this._f == "function" ? this._f() : this._f;
    },
    set: function(val) {
        this._f = val;
    }
});
//[cf]
//[of]:.t
Object.defineProperty(VectorColor.prototype, "t", {
    get: function() {
        return typeof this._t == "function" ? this._t() : this._t;
    },
    set: function(val) {
        this._t = val;
    }
});
//[cf]
//[of]:.srgb
Object.defineProperty(VectorColor.prototype, "srgb", {
    get: function() {
        return this._srgb;
    },
    set: function(val) {
        this._srbg = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toString(indent)
VectorColor.prototype.toString = function(indent) {
	var pad  = $CP.tab(indent);
    var form = (this.srbg ? "s" : "") + "rgb";
    var args = [this.r, this.g, this.b];

    if(this.f !== undefined) {
        form += "f";
        args.push(this.f);
    } else if(this.t !== undefined) {
        form += "t";
        args.push(this.t);
    }

    return pad + form + " <" + args.join(", ") + ">";

}
//[cf]
//[cf]
//[cf]
//[of]:File
//==============================================================================

// Output wrappers. For the time being, these will feed to the browser. The
// longer-term goal is to mimic the C Standard Library file i/o functions, but
// with the flexibility of the PHP wrappers. Right now, it just targets HTML
// elements.

// Currently, path should be an element selector beginning with "#". Supported
// modes are r, w, a.

function File(path, mode) {
    this.path   = path;
    this.mode   = mode;
    this.open   = false;
	this.idBase = null;

    if(path.substr(0, 1) != "#")
        throw new TypeError("[File]: Only HTML element output is currently supported.");

	this.path = path;
	this.idBase = path.substr(1).replace(/[^-A-Za-z0-9_]/g, "_");

    if(this.mode != "r" && this.mode != "w" && this.mode != "a")
        throw new RangeError("[File]: Only file modes r, w, and a are currently supported.");

    if(this.mode == "w") {

        if($(this.path).length) {
            $(this.path).html("");
        } else {
            $("body").append(
            	"<div class='file_label' id='" + this.idBase + "_label'>" + this.path.substr(1) + "</div>\n"
            	+ "<div class='file' id='" + this.idBase + "'></div>"
            );
        }
        this.open = true;

    } else if(mode == "r" || mode == "a") {

        if($("#" + this.idBase).length) {
            this.open = true;
        } else {
            throw new Error("[File]: " + this.path + " does not exist.");
        }

    }

}

//------------------------------------------------------------------------------
// Pulls the complete contents currently.

File.prototype.read = function() {
    if(!this.open)
        throw new Error("[File.read]: No file is currently open.");
    else if(this.mode != "r")
        throw new Error("[File.read]: File is not open for reading.");
    else
        return $("#" + this.idBase).html();
}

//------------------------------------------------------------------------------

File.prototype.write = function(data) {
    if(!this.open)
        throw new Error("[File.write]: No file is currently open.");
    else if(this.mode != "w" && this.mode != "a")
        throw new Error("[File.write]: File is not open for writing.");
    else
        $("#" + this.idBase).append(data);
}

//------------------------------------------------------------------------------

File.prototype.close = function() {
    this.open = false;
}
//[cf]
//[of]:GlobalSettings
function GlobalSettings(opt = { }) {
    this.opt = {
        assumedGamma: 1.0
    };

    for(var k in opt) {
        if(!$CP.inArray($CP.globalSettings, k))
            throw new RangeError("[GlobalSettings]: '" + k + "' is not a valid image option.");
        this[k] = opt[k];
    }
}

//[of]:Attributes/Mutators
//[of]:.adcBailout
Object.defineProperty(GlobalSettings.prototype, "adcBailout", {
    get: function() {
        return this.opt.adcBailout === undefined ? null : this.opt.adcBailout;
    },
    set: function(v) {
        if(typeof v !== "number")
            throw new TypeError("[GlobalSettings]: adcBailout must be a float.");
        if(v < 0)
            throw new RangeError("[GlobalSettings]: adcBailout must be >= 0.0");

        this.opt.adcBailout = v;
    }
});
//[cf]
//[of]:.ambientLight
Object.defineProperty(GlobalSettings.prototype, "ambientLight", {
    get: function() {
        return this.opt.ambientLight === undefined ? null : this.opt.ambientLight;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "VectorColor")
            throw new TypeError("[GlobalSettings]: ambientLight must be a VectorColor.");

        this.opt.ambientLight = v;
    }
});
//[cf]
//[of]:.assumedGamma
Object.defineProperty(GlobalSettings.prototype, "assumedGamma", {
    get: function() {
        return this.opt.assumedGamma === undefined ? null : this.opt.assumedGamma;
    },
    set: function(v) {
        if(typeof v !== "number")
            throw new TypeError("[GlobalSettings]: assumedGamma must be a float.");

        this.assumedGamma = v;
    }
});
//[cf]
//[of]:.charset
Object.defineProperty(GlobalSettings.prototype, "charset", {
    get: function() {
        return this.opt.charset === undefined ? null : this.opt.charset;
    },
    set: function(v) {
        if(typeof v !== "string")
            throw new TypeError("[GlobalSettings]: charset must be a string.");
        if(v != "ascii" && v != "utf8" && v != "sys")
            throw new RangeError("[GlobalSettings]: charset must be one of 'ascii', 'utf8', or 'sys'.");
        this.opt.charset = v;
    }
});
//[cf]
//[of]:.iridWavelength
Object.defineProperty(GlobalSettings.prototype, "iridWavelength", {
    get: function() {
        return this.opt.iridWavelength === undefined ? null : this.opt.iridWavelength;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "VectorColor")
            throw new TypeError("[GlobalSettings]: iridWavelength must be a VectorColor.");

        this.opt.iridWavelength = v;
    }
});
//[cf]
//[of]:.maxIntersections
Object.defineProperty(GlobalSettings.prototype, "maxIntersections", {
    get: function() {
        return this.opt.maxIntersections === undefined ? null : this.opt.maxIntersections;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: maxIntersections must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0)
            throw new RangeError("[GlobalSettings]: maxIntersections must be >= 0.");

        this.opt.maxIntersections = vv;
    }
});
//[cf]
//[of]:.maxTraceLevel
Object.defineProperty(GlobalSettings.prototype, "maxTraceLevel", {
    get: function() {
        return this.opt.maxTraceLevel === undefined ? null : this.opt.maxTraceLevel;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: maxTraceLevel must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0)
            throw new RangeError("[GlobalSettings]: maxTraceLevel must be >= 0.");

        this.opt.maxTraceLevel = vv;
    }
});
//[cf]
//[of]:.mmPerUnit
Object.defineProperty(GlobalSettings.prototype, "mmPerUnit", {
    get: function() {
        return this.opt.mmPerUnit === undefined ? null : this.opt.mmPerUnit;
    },
    set: function(v) {
        if(typeof v !== "number")
            throw new TypeError("[GlobalSettings]: mmPerUnit must be a float.");
        if(v <= 0.0)
            throw new RangeError("[GlobalSettings]: mmPerUnit must be > 0.");

        this.mmPerUnit = v;
    }
});
//[cf]
//[of]:.noiseGenerator
Object.defineProperty(GlobalSettings.prototype, "noiseGenerator", {
    get: function() {
        return this.opt.noiseGenerator === undefined ? null : this.opt.noiseGenerator;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: noiseGenerator must be an integer.");
        if(v != 1 && v != 2 && v != 3)
            throw new RangeError("[GlobalSettings]: noiseGenerator must be 1, 2, or 3.");
    }
});
//[cf]
//[of]:.numberOfWaves
Object.defineProperty(GlobalSettings.prototype, "numberOfWaves", {
    get: function() {
        return this.opt.numberOfWaves === undefined ? null : this.opt.numberOfWaves;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: numberOfWaves must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0)
            throw new RangeError("[GlobalSettings]: numberOfWaves must be >= 0.");

        this.opt.numberOfWaves = vv;
    }
});
//[cf]
//[of]:.photon
Object.defineProperty(GlobalSettings.prototype, "photon", {
    get: function() {
        return this.opt.photon === undefined ? null : this.opt.photon;
    },
    set: function(v) {
        if(typeof v !== "boolean")
            throw new TypeError("[GlobalSettings]: photon must be a boolean.");

        this.opt.photon = v;
    }
});
//[cf]
//[of]:.photonAdcBailout
Object.defineProperty(GlobalSettings.prototype, "photonAdcBailout", {
    get: function() {
        return this.opt.photonAdcBailout === undefined ? null : this.opt.photonAdcBailout;
    },
    set: function(v) {
        if(typeof v !== "number")
            throw new TypeError("[GlobalSettings]: photonAdcBailout must be a float.");
        if(v < 0)
            throw new RangeError("[GlobalSettings]: photonAdcBailout must be >= 0.0");

        this.opt.photonAdcBailout = v;

    }
});
//[cf]
//[of]:.photonAutostop
Object.defineProperty(GlobalSettings.prototype, "photonAutostop", {
    get: function() {
        return this.opt.photonAutostop === undefined ? null : this.opt.photonAutostop;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: photonAutostop must be an integer.");
        if(v < 0 || v > 1)
            throw new RangeError("[GlobalSettings]: photonAutostop must be in the range 0.0-1.0");

        this.opt.photonAutostop = v;
    }
});
//[cf]
//[of]:.photonExpandThresholds
Object.defineProperty(GlobalSettings.prototype, "photonExpandThresholds", {
    get: function() {
        return this.opt.photonExpandThresholds === undefined ? null : this.opt.photonExpandThresholds;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "Array" || v.length != 2)
            throw new TypeError("[GlobalSettings]: photonExpandThresholds must be an array of two elements.");
        if(typeof v[0] != "number" || typeof v[1] != "number")
            throw new TypeError("[GlobalSettings]: The elements of photonExpandThresholds must be a float and an integer.");
        // TODO: Add range check for values once better understood.

        this.opt.photonExpandThresholds = [ v[0], Math.floor(v[1]) ];
    }
});
//[cf]
//[of]:.photonCount
Object.defineProperty(GlobalSettings.prototype, "photonCount", {
    get: function() {
        return this.opt.photonCount === undefined ? null : this.opt.photonCount;
    },
    set: function(v) {
        if(this.opt.photonSpacing !== undefined)
            throw new Error("[GlobalSettings]: photonCount cannot be used with photonSpacing.");
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: photonCount must be an int.");
        if(v < 0)
            throw new RangeError("[GlobalSettings]: photonCount must be >= 0.");

        this.opt.photonCount = v;
    }
});
//[cf]
//[of]:.photonGather
Object.defineProperty(GlobalSettings.prototype, "photonGather", {
    get: function() {
        return this.opt.photonGather === undefined ? null : this.opt.photonGather;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "Array")
            throw new TypeError("[GlobalSettings]: photonGather must be an Array.");
        if(v.length != 2)
            throw new RangeError("[GlobalSettings]: photonGather must be an array of two elements.");
        if(typeof v[0] != "number" || typeof v[1] != "number")
            throw new TypeError("[GlobalSettings]: photonGather elements must be integers.");
        var vv = [ Math.floor(v[0]), Math.floor(v[1]) ];
        if(vv[0] < 0 || vv[1] < 0)
            throw new RangeError("[GlobalSettings]: photonGather's elements must both be > 0.");
        if(vv[0] > vv[1])
            throw new RangeError("[GlobalSettings]: photonGather's second element must be greater than or equal to its first element.");

        this.opt.photonGather = [ Math.floor(v[0]), Math.floor(v[1]) ];

    }
});
//[cf]
//[of]:.photonJitter
Object.defineProperty(GlobalSettings.prototype, "photonJitter", {
    get: function() {
        return this.opt.photonJitter === undefined ? null : this.opt.photonJitter;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: photonSpacing must be a float.");
        // TODO: Add range check for values once better understood.
        this.opt.photonJitter = v;
    }
});
//[cf]
//[of]:.photonLoadFile
Object.defineProperty(GlobalSettings.prototype, "photonLoadFile", {
    get: function() {
        return this.opt.photonLoadFile === undefined ? null : this.opt.photonLoadFile;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: photonLoadFile must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: photonLoadFile must be a valid filename.");

        this.opt.photonLoadFile = vv;
    }
});
//[cf]
//[of]:.photonMaxTraceLevel
Object.defineProperty(GlobalSettings.prototype, "photonMaxTraceLevel", {
    get: function() {
        return this.opt.photonMaxTraceLevel === undefined ? null : this.opt.photonMaxTraceLevel;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: photonMaxTraceLevel must be an integer.");
        var vv = Math.floor(v);
        if(vv < 0)
            throw new RangeError("[GlobalSettings]: photonMaxTraceLevel must be >= 0.");

        this.opt.photonMaxTraceLevel = vv;
    }
});
//[cf]
//[of]:.photonMedia
Object.defineProperty(GlobalSettings.prototype, "photonMedia", {
    get: function() {
        return this.opt.photonMedia === undefined ? null : this.opt.photonMedia;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "Array" || v.length < 1 || v.length > 2)
            throw new TypeError("[GlobalSettings]: photonMedia must be an array of one or two elements.");
        if(typeof v[0] != "number" || (v.length == 2 && typeof v[1] != "number"))
            throw new TypeError("[GlobalSettings]: The element(s) of photonMedia must be numbers.");
        // TODO: Add range checks for values once better understood.

        this.opt.photonMedia = v.slice(0);
    }
});
//[cf]
//[of]:.photonRadius
Object.defineProperty(GlobalSettings.prototype, "photonRadius", {
    get: function() {
        return this.opt.photonRadius === undefined ? null : this.opt.photonRadius;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "Array" || v.length != 4)
            throw new TypeError("[GlobalSettings]: photonRadius must be an array of four elements.");
        if(typeof v[0] != "number" || typeof v[1] != "number" || typeof v[2] != "number" || typeof v[3] != "number")
            throw new TypeError("[GlobalSettings]: The elements of photonRadius must be floats.");
        // TODO: Add range check for values once better understood.

        this.opt.photonExpandThresholds = [ v[0], Math.floor(v[1]) ];
    }

});
//[cf]
//[of]:.photonSaveFile
Object.defineProperty(GlobalSettings.prototype, "photonSaveFile", {
    get: function() {
        return this.opt.photonSaveFile === undefined ? null : this.opt.photonSaveFile;
    },
    set: function(v) {
        if(typeof v != "string")
            throw new TypeError("[ImageOptions]: photonSaveFile must be a string.");
        var vv = v.trim();
        if(vv.length == 0)
            throw new RangeError("[ImageOptions]: photonSaveFile must be a valid filename.");

        this.opt.photonSaveFile = vv;
    }
});
//[cf]
//[of]:.photonSpacing
Object.defineProperty(GlobalSettings.prototype, "photonSpacing", {
    get: function() {
        return this.opt.photonSpacing === undefined ? null : this.opt.photonSpacing;
    },
    set: function(v) {
        if(this.opt.photonCount !== undefined)
            throw new Error("[GlobalSettings]: photonSpacing cannot be used with photonCount.");
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: photonSpacing must be a float.");
        if(v <= 0)
            throw new RangeError("[GlobalSettings]: photonSpacing must be > 0.");

        this.opt.photonSpacing = v;
    }
});
//[cf]
//[of]:.radAdcBailout
Object.defineProperty(GlobalSettings.prototype, "radAdcBailout", {
    get: function() {
        return this.opt.radAdcBailout === undefined ? null : this.opt.radAdcBailout;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radAdcBailout must be a float.");

        this.opt.radAdcBailout = v;
    }
});
//[cf]
//[of]:.radAlwaysSample
Object.defineProperty(GlobalSettings.prototype, "radAlwaysSample", {
    get: function() {
        return this.opt.radAlwaysSample === undefined ? null : this.opt.radAlwaysSample;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[GlobalSettings]: radAlwaysSample must be a boolean.");

        this.opt.radAlwaysSample = v;
    }
});
//[cf]
//[of]:.radBrightness
Object.defineProperty(GlobalSettings.prototype, "radBrightness", {
    get: function() {
        return this.opt.radBrightness === undefined ? null : this.opt.radBrightness;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radBrightness must be a float.");

        this.opt.radBrightness = v;
    }
});
//[cf]
//[of]:.radCount
Object.defineProperty(GlobalSettings.prototype, "radCount", {
    get: function() {
        return this.opt.radCount === undefined ? null : this.opt.radCount;
    },
    set: function(v) {
        if(typeof v != "number" && $CP.prototypeName(v) != "Array")
            throw new TypeError("[GlobalSettings]: radCount must be an integer or an array of two integers.");
        if(typeof v == "number") {
            var vv = Math.floor(v);
            if(vv < 1)
                throw new RangeError("[GlobalSettings]: radCount must be an integer >= 1.");
        } else {
            if(v.length != 2)
                throw new RangeError("[GlobalSettings]: When given as an array, radCount must have exactly two elements.");
            var vv = [ Math.floor(v[0]), Math.floor(v[1]) ];
            if(vv[0] < 1 || vv[1] < 1)
                throw new RangeError("[GlobalSettings]: The elements of radCount must both be integers >= 1.");
        }

        this.opt.radCount = vv;
    }
});
//[cf]
//[of]:.radErrorBound
Object.defineProperty(GlobalSettings.prototype, "radErrorBound", {
    get: function() {
        return this.opt.radErrorBound === undefined ? null : this.opt.radErrorBound;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radErrorBound must be a float.");

        this.opt.radErrorBound = v;
    }
});
//[cf]
//[of]:.radGrayThreshold
Object.defineProperty(GlobalSettings.prototype, "radGrayThreshold", {
    get: function() {
        return this.opt.radGrayThreshold === undefined ? null : this.opt.radGrayThreshold;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radGrayThreshold must be a float.");
        if(v < 0 || v > 1)
            throw new RangeError("[GlobalSettings]: radGrayThreshold must be in the range 0.0-1.0");
        this.opt.radGrayThreshold = v;
    }
});
//[cf]
//[of]:.radiosity
Object.defineProperty(GlobalSettings.prototype, "radiosity", {
    get: function() {
        return this.opt.radiosity === undefined ? null : this.opt.radiosity;
    },
    set: function(v) {
        if(typeof v !== "boolean")
            throw new TypeError("[GlobalSettings]: radiosity must be a boolean.");

        this.opt.radiosity = v;
    }
});
//[cf]
//[of]:.radLowErrorFactor
Object.defineProperty(GlobalSettings.prototype, "radLowErrorFactor", {
    get: function() {
        return this.opt.radLowErrorFactor === undefined ? null : this.opt.radLowErrorFactor;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radLowErrorFactor must be a float.");

        this.opt.radLowErrorFactor = v;
    }
});
//[cf]
//[of]:.radMaximumReuse
Object.defineProperty(GlobalSettings.prototype, "radMaximumReuse", {
    get: function() {
        return this.opt.radMaximumReuse === undefined ? null : this.opt.radMaximumReuse;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radMaximumReuse must be a float.");

        this.opt.radMaximumReuse = v;
    }
});
//[cf]
//[of]:.radMaxSample
Object.defineProperty(GlobalSettings.prototype, "radMaxSample", {
    get: function() {
        return this.opt.radMaxSample === undefined ? null : this.opt.radMaxSample;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radMaxSample must be a float.");

        this.opt.radMaxSample = v;
    }
});
//[cf]
//[of]:.radMinimumReuse
Object.defineProperty(GlobalSettings.prototype, "radMinimumReuse", {
    get: function() {
        return this.opt.radMinimumReuse === undefined ? null : this.opt.radMinimumReuse;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radMinimumReuse must be a float.");

        this.opt.radMinimumReuse = v;
    }
});
//[cf]
//[of]:.radNearestCount
Object.defineProperty(GlobalSettings.prototype, "radNearestCount", {
    get: function() {
        return this.opt.radNearestCount === undefined ? null : this.opt.radNearestCount;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radNearestCount must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 20)
            throw new RangeError("[GlobalSettings]: radNearestCount must be an integer in the range 1-20.");

        this.opt.radNearestCount = vv;
    }
});
//[cf]
//[of]:.radNormal
Object.defineProperty(GlobalSettings.prototype, "radNormal", {
    get: function() {
        return this.opt.radNormal === undefined ? null : this.opt.radNormal;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[GlobalSettings]: radNormal must be a boolean.");

        this.opt.radNormal = v;
    }
});
//[cf]
//[of]:.radPretraceEnd
Object.defineProperty(GlobalSettings.prototype, "radPretraceEnd", {
    get: function() {
        return this.opt.radPretraceEnd === undefined ? null : this.opt.radPretraceEnd;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radPretraceEnd must be a float.");
        if(v < 0 || v > 1)
            throw new RangeError("[GlobalSettings]: radPretraceEnd must be in the range 0.0-1.0");

        this.opt.radPretraceEnd = v;
    }
});
//[cf]
//[of]:.radPretraceStart
Object.defineProperty(GlobalSettings.prototype, "radPretraceStart", {
    get: function() {
        return this.opt.radPretraceStart === undefined ? null : this.opt.radPretraceStart;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radPretraceStart must be a float.");
        if(v < 0 || v > 1)
            throw new RangeError("[GlobalSettings]: radPretraceStart must be in the range 0.0-1.0");

        this.opt.radPretraceStart = v;
    }
});
//[cf]
//[of]:.radRecursionLimit
Object.defineProperty(GlobalSettings.prototype, "radRecursionLimit", {
    get: function() {
        return this.opt.radRecursionLimit === undefined ? null : this.opt.radRecursionLimit;
    },
    set: function(v) {
        if(typeof v != "number")
            throw new TypeError("[GlobalSettings]: radRecursionLimit must be an integer.");
        var vv = Math.floor(v);
        if(vv < 1 || vv > 20)
            throw new RangeError("[GlobalSettings]: radRecursionLimit must be an integer in the range 1-20.");

        this.opt.radRecursionLimit = vv;

    }
});
//[cf]
//[of]:.radSubsurface
Object.defineProperty(GlobalSettings.prototype, "radSubsurface", {
    get: function() {
        return this.opt.radSubsurface === undefined ? null : this.opt.radSubsurface;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[GlobalSettings]: radSubsurface must be a boolean.");

        this.opt.radSubsurface = v;
    }
});
//[cf]
//[of]:.subSamples
Object.defineProperty(GlobalSettings.prototype, "subSamples", {
    get: function() {
        return this.opt.subSamples === undefined ? null : this.opt.subSamples;
    },
    set: function(v) {
        if($CP.prototypeName(v) != "Array")
            throw new TypeError("[GlobalSettings]: subSamples must be an Array.");
        if(v.length != 2)
            throw new RangeError("[GlobalSettings]: subSamples must be an array of two elements.");
        if(typeof v[0] != "number" || typeof v[1] != "number")
            throw new TypeError("[GlobalSettings]: subSamples elements must be integers.");

        this.opt.subSamples = [ Math.floor(v[0]), Math.floor(v[1]) ];
    }
});
//[cf]
//[of]:.subsurface
Object.defineProperty(GlobalSettings.prototype, "subsurface", {
    get: function() {
        return this.opt.subsurface === undefined ? null : this.opt.subsurface;
    },
    set: function(v) {
        if(typeof v !== "boolean")
            throw new TypeError("[GlobalSettings]: subsurface must be a boolean.");

        this.opt.subsurface = v;
    }
});
//[cf]
//[of]:.subRadiosity
Object.defineProperty(GlobalSettings.prototype, "subRadiosity", {
    get: function() {
        return this.opt.subRadiosity === undefined ? null : this.opt.subRadiosity;
    },
    set: function(v) {
        if(typeof v != "boolean")
            throw new TypeError("[GlobalSettings]: subRadiosity must be a boolean.");
        this.opt.subRadiosity = v;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toJSON()
GlobalSettings.prototype.toJSON = function() {
    return JSON.stringify(this.opt);
}
//[cf]
//[of]:.unset(opt)
GlobalSettings.prototype.unset = function(opt) {
    delete this.opt[opt];
}
//[cf]
//[of]:.unsetAll(opt)
GlobalSettings.prototype.unsetAll = function(opt) {
    this.opt = { };
}
//[cf]
//[of]:.validateAndOutput()
GlobalSettings.prototype.validateAndOutput = function() {
    var contents = [ ];

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
//[cf]
//[cf]
//[of]:Matrix
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

    if(v00 == "scale") {

        this._v00 = v01; // x
        this._v11 = v02; // y
        this._v22 = v03; // z

        this._v01 = this._v02 = this._v10 = this._v12 = this._v20 = this._v21
            = this._v30 = this._v31 = this._v32 = 0;

    } else if(v00 == "rotate") {

        // TODO

    } else if(v00 == "translate") {

        this._v00 = this._v11 = this._v22 = 1; // scale identity

        this._v30 = v01; // x
        this._v31 = v02; // y
        this._v32 = v03; // z

        this._v01 = this._v02 = this._v10 = this._v12 = this._v20 = this._v21 = 0;

    } else if(v00 == "skew") {

        // TODO

    } else {

        this._v00 = v00;
        this._v01 = v01;
        this._v02 = v02;
        this._v10 = v10;
        this._v11 = v11;
        this._v12 = v12;
        this._v20 = v20;
        this._v21 = v21;
        this._v22 = v22;
        this._v30 = v30;
        this._v31 = v31;
        this._v32 = v32;

    }
}


//[of]:Attributes/Mutators
//[of]:.v00
Object.defineProperty(Matrix.prototype, "v00", {
    get: function() {
        return typeof this._v00 == "function" ? this._v00() : this._v00;
    },
    set: function(val) {
        this._v00 = val;
    }
});
//[cf]
//[of]:.v01
Object.defineProperty(Matrix.prototype, "v01", {
    get: function() {
        return typeof this._v01 == "function" ? this._v01() : this._v01;
    },
    set: function(val) {
        this._v01 = val;
    }
});
//[cf]
//[of]:.v02
Object.defineProperty(Matrix.prototype, "v02", {
    get: function() {
        return typeof this._v02 == "function" ? this._v02() : this._v02;
    },
    set: function(val) {
        this._v02 = val;
    }
});
//[cf]
//[of]:.v10
Object.defineProperty(Matrix.prototype, "v10", {
    get: function() {
        return typeof this._v10 == "function" ? this._v10() : this._v10;
    },
    set: function(val) {
        this._v10 = val;
    }
});
//[cf]
//[of]:.v11
Object.defineProperty(Matrix.prototype, "v11", {
    get: function() {
        return typeof this._v11 == "function" ? this._v11() : this._v11;
    },
    set: function(val) {
        this._v11 = val;
    }
});
//[cf]
//[of]:.v12
Object.defineProperty(Matrix.prototype, "v12", {
    get: function() {
        return typeof this._v12 == "function" ? this._v12() : this._v12;
    },
    set: function(val) {
        this._v12 = val;
    }
});
//[cf]
//[of]:.v20
Object.defineProperty(Matrix.prototype, "v20", {
    get: function() {
        return typeof this._v20 == "function" ? this._v20() : this._v20;
    },
    set: function(val) {
        this._v20 = val;
    }
});
//[cf]
//[of]:.v21
Object.defineProperty(Matrix.prototype, "v21", {
    get: function() {
        return typeof this._v21 == "function" ? this._v21() : this._v21;
    },
    set: function(val) {
        this._v21 = val;
    }
});
//[cf]
//[of]:.v22
Object.defineProperty(Matrix.prototype, "v22", {
    get: function() {
        return typeof this._v22 == "function" ? this._v22() : this._v22;
    },
    set: function(val) {
        this._v22 = val;
    }
});
//[cf]
//[of]:.v30
Object.defineProperty(Matrix.prototype, "v30", {
    get: function() {
        return typeof this._v30 == "function" ? this._v30() : this._v30;
    },
    set: function(val) {
        this._v30 = val;
    }
});
//[cf]
//[of]:.v31
Object.defineProperty(Matrix.prototype, "v31", {
    get: function() {
        return typeof this._v31 == "function" ? this._v31() : this._v31;
    },
    set: function(val) {
        this._v31 = val;
    }
});
//[cf]
//[of]:.v32
Object.defineProperty(Matrix.prototype, "v32", {
    get: function() {
        return typeof this._v32 == "function" ? this._v32() : this._v32;
    },
    set: function(val) {
        this._v32 = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.apply(obj)
Matrix.prototype.apply = function(obj) {
    if(obj._transform === undefined)
        throw new TypeError("[Matrix]: Target object has no transform member.");
    obj._transform = this.xMatrix(obj._transform);
}
//[cf]
//[of]:.toString(indent = 0)
Matrix.prototype.toString = function(indent = 0) {
	var pad = $CP.tab(indent);

	return pad + "matrix <" + this.v00 + ", " + this.v01 + ", " + this.v02 + "\n"
		+ pad + "    " + this.v10 + ", " + this.v11 + ", " + this.v12 + "\n"
		+ pad + "    " + this.v20 + ", " + this.v21 + ", " + this.v22 + "\n"
		+ pad + "    " + this.v30 + ", " + this.v31 + ", " + this.v32 + ">";
}
//[cf]
//[of]:.xMatrix(that)
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
//[of]:.xPoint(point)
Matrix.prototype.xPoint = function(point) {
	return new VectorXYZ(
		this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
		this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
		this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
	);
}
//[cf]
//[cf]
//[cf]
//[of]:Camera
//==============================================================================
// TODO: mesh_camera
// TODO: normal

function Camera(opts) {
	this._type          = null;
	this._cylinderType  = null;
	this._location      = null;
	this._right         = null;
	this._up            = null;
	this._direction     = null;
	this._sky           = null;
	this._angle         = null;
	this._verticalAngle = null;
	this._lookAt        = null;
	this._blurSamples   = null;
	this._apertureSize  = null;
	this._focalPoint    = null;
	this._confidence    = null;
	this._variance      = null;
	this._bokeh         = null;
	this._normal        = null; // TODO
	this._transform     = null;


    if(opts === undefined)
        for(var i in opts)
            this[i] = opts[i];

}


//[of]:Attributes/Mutators
//[of]:.angle
Object.defineProperty(Camera.prototype, "angle", {
    get: function() {
        return this._angle;
    },
    set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: angle must be an integer.");
		this._angle = val;
    }
});
//[cf]
//[of]:.apertureSize
Object.defineProperty(Camera.prototype, "apertureSize", {
    get: function() {
        return this._apertureSize;
    },
    set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: apertureSize must be a float.");
		// TODO: Revisit validation after understanding this better
		this._apertureSize = val;
    }
});
//[cf]
//[of]:.blurSamples
Object.defineProperty(Camera.prototype, "blurSamples", {
    get: function() {
        return this._blurSamples;
    },
    set: function(val) {
		if(typeof val != "number" && $CP.prototypeName(val) != "Array")
			throw new TypeError("[Camera]: blurSamples must be a float or an array of two floats.");
		if(typeof val == "number") {
			var vv = Math.floor(val);
			if(val < 0)
				throw new RangeError("[Camera]: blurSamples must be >= 0.");
		} else {
			if(val.length != 2)
				throw new RangeError("[Camera]: When given as an array, blurSamples must have exactly two elements.");
			var vv = [Math.floor(val[0]), Math.floor(val[1])];
			if(vv[0] < 0 || vv[1] < 0)
				throw new RangeError("[Camera]: Both blurSamples elements must be >= 0.");
		}
		this._blurSamples = vv;
    }
});
//[cf]
//[of]:.bokeh
Object.defineProperty(Camera.prototype, "bokeh", {
    get: function() {
        return this._bokeh;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorColor")
			throw new TypeError("[Camera]: bokeh must be a VectorColor.");
		if(val.b != 0 || val.r < 0 || val.r > 1 || val.g < 0 || val.g > 1)
			throw new RangeError("[Camera]: bokeh must be in the range <0,0,0> to <1,1,0>.");
		this._bokeh = val;
    }
});
//[cf]
//[of]:.confidence
Object.defineProperty(Camera.prototype, "confidence", {
	get: function() {
		return this._confidence;
	},
	set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: confidence must be a float.");
		// TODO: Revisit validation after understanding this better
		this._confidence = val;
	}
});
//[cf]
//[of]:.cylinderType
Object.defineProperty(Camera.prototype, "cylinderType", {
    get: function() {
        return this._cylinderType;
    },
    set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: cylinderType must be an integer.");
		var vv = Math.floor(val);
		if(vv < 1 || vv > 4)
			throw new RangeError("[Camera]: cylinderType must be in the range 1-4.");
		this._cylinderType = vv;
    }
});
//[cf]
//[of]:.direction
Object.defineProperty(Camera.prototype, "direction", {
    get: function() {
        return this._direction;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: direction must be a VectorXYZ.");
		this._direction = val;
    }
});
//[cf]
//[of]:.focalPoint
Object.defineProperty(Camera.prototype, "focalPoint", {
    get: function() {
        return this._focalPoint;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: focalPoint must be a VectorXYZ.");
		this._focalPoint = val;
    }
});
//[cf]
//[of]:.location
Object.defineProperty(Camera.prototype, "location", {
    get: function() {
        return this._location;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: location must be a VectorXYZ.");
		this._location = val;
    }
});
//[cf]
//[of]:.lookAt
Object.defineProperty(Camera.prototype, "lookAt", {
    get: function() {
        return this._lookAt;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: lookAt must be a VectorXYZ.");
		this._lookAt = val;
    }
});
//[cf]
//[of]:.right
Object.defineProperty(Camera.prototype, "right", {
    get: function() {
        return this._right;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: right must be a VectorXYZ.");
		this._right = val;
    }
});
//[cf]
//[of]:.transform
Object.defineProperty(Camera.prototype, "transform", {
    get: function() {
        return this._transform;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "Matrix")
			throw new TypeError("[Camera]: transform must be a Matrix.");
		if(this._transform == null)
			this._transform = val;
    }
});
//[cf]
//[of]:.type
Object.defineProperty(Camera.prototype, "type", {
    get: function() {
        return this._type;
    },
    set: function(val) {
		if(val == "perspective" || val == "orthographic" || val == "fisheye"
			|| val == "ultra_wide_angle" || val == "omnimax"
			|| val == "panoramic" || val == "spherical" || val == "cylinder"
			|| val == "mesh_camera") {
			this._type = val;
		} else {
			throw new TypeError("[Camera]: Unknown camera type '" + val + "'.");
		}
    }
});
//[cf]
//[of]:.up
Object.defineProperty(Camera.prototype, "up", {
    get: function() {
        return this._up;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: up must be a VectorXYZ.");
		this._up = val;
    }
});
//[cf]
//[of]:.sky
Object.defineProperty(Camera.prototype, "sky", {
    get: function() {
        return this._sky;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "VectorXYZ")
			throw new TypeError("[Camera]: sky must be a VectorXYZ.");
		this._sky = val;
    }
});
//[cf]
//[of]:.variance
Object.defineProperty(Camera.prototype, "variance", {
    get: function() {
        return this._variance;
    },
    set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: variance must be a float.");
		// TODO: Revisit validation after understanding this better
		this._variance = val;
    }
});
//[cf]
//[of]:.vertAngle
Object.defineProperty(Camera.prototype, "vertAngle", {
    get: function() {
        return this._vertAngle;
    },
    set: function(val) {
		if(typeof val != "number")
			throw new TypeError("[Camera]: vertAngle must be an integer.");
		this._vertAngle = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toString(indent)
Camera.prototype.toString = function(indent) {
    var pad = $CP.tab(indent);
    var result = [ ];

    if(this.type === null) {
        throw new Error("[Camera]: Camera type is undefined.");
    } else if(this.type == "cylinder" && this.cylinderType === null) {
        throw new Error("[Camera]: Camera type is cylinder but cylinderType is undefined.");
    } else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null))) {
        throw new Error("[Camera]: The orthographic camera requires either angle or up and right to be defined.");
    }


    result.push(pad + "camera {");
    result.push(pad + "    " + this.type + (this.type == "cylinder" ? " " + this.cylinderType : ""));
    if(this.location !== null)
        result.push(pad + "    location " + this.location);
    if(this.right !== null)
        result.push(pad + "    right " + this.right);
    if(this.up !== null)
        result.push(pad + "    up " + this.up);
    if(this.direction !== null)
        result.push(pad + "    direction " + this.direction);
    // TODO: angle
    if(this.lookAt !== null)
        result.push(pad + "    look_at " + this.lookAt);
    // TODO: blurSamples
    if(this.apertureSize !== null)
        result.push(pad + "    aperture_size " + this.apertureSize);
    if(this.focalPoint !== null)
        result.push(pad + "    focal_point " + this.focalPoint);
    if(this.confidence !== null)
        result.push(pad + "    confidence " + this.confidence);
    if(this.variance !== null)
        result.push(pad + "    variance " + this.variance);
    if(this.bokeh !== null)
        result.push(pad + "    bokeh " + this.bokeh);
    if(this.transform !== null)
        result.push(this.transform.toString(indent + 1));

    return result.join("\n");
}
//[cf]
//[cf]
//[cf]
//[of]:Light
function Light() {

    this._location         = null;
    this._color            = null;
    this._type             = null;
    this._radius           = null;
    this._falloff          = null;
    this._tightness        = null;
    this._pointAt          = null;
    this._axis1            = null;
    this._axis2            = null;
    this._size1            = null;
    this._size2            = null;
    this._adaptive         = null;
    this._areaIllumination = null;
    this._jitter           = null;
    this._circular         = null;
    this._orient           = null;
    this._looksLike        = null;
    this._transform        = null;
    this._fadeDistance     = null;
    this._fadePower        = null;
    this._mediaAttenuation = null;
    this._mediaInteraction = null;
    this._projectedThrough = null;
    this._shadowless       = null;
    this._parallel         = null;
    this._areaLight        = null;

    if(opts === undefined)
        for(var i in opts)
            this[i] = opts[i];
}

//[of]:Attributes/Mutators
//[of]:.adaptive
Object.defineProperty(Light.prototype, "adaptive", {
    get: function() {
        return this._adaptive;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: adaptive must be a float.");
        if(val < 0)
            throw new TypeError("[Light]: adaptive must be >= 0.");
        this._adaptive = Math.floor(val);
    }
});
//[cf]
//[of]:.areaIllumination
Object.defineProperty(Light.prototype, "areaIllumination", {
    get: function() {
        return this._areaIllumination;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: areaIllumination must be a boolean.");
        this._areaIllumination = val;
    }
});
//[cf]
//[of]:.axis1
Object.defineProperty(Light.prototype, "axis1", {
    get: function() {
        return this._axis1;
    },
    set: function(val) {
        if(typeof val != "VectorXYZ")
            throw new TypeError("[Light]: axis1 must be a VectorXYZ");
        this._axis1 = val;
    }
});
//[cf]
//[of]:.axis2
Object.defineProperty(Light.prototype, "axis2", {
    get: function() {
        return this._axis2;
    },
    set: function(val) {
        if(typeof val != "VectorXYZ")
            throw new TypeError("[Light]: axis2 must be a VectorXYZ");
        this._axis2 = val;
    }
});
//[cf]
//[of]:.areaLight
Object.defineProperty(Light.prototype, "areaLight", {
    get: function() {
        return this._areaLight;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: areaLight must be a boolean.");
        this._areaLight = val;
    }
});
//[cf]
//[of]:.circular
Object.defineProperty(Light.prototype, "circular", {
    get: function() {
        return this._circular;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: circular must be a boolean.");
        this._circular = val;
    }
});
//[cf]
//[of]:.color
Object.defineProperty(Light.prototype, "color", {
    get: function() {
        return this._color;
    },
    set: function(val) {
        if(typeof val != "VectorColor")
            throw new TypeError("[Light]: color must be a VectorColor");
        this._location = val;
    }
});
//[cf]
//[of]:.fadeDistance
Object.defineProperty(Light.prototype, "fadeDistance", {
    get: function() {
        return this._fadeDistance;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: fadeDistance must be a float.");
        if(val <= 0)
            throw new TypeError("[Light]: fadeDistance must be > 0.");
        this._fadeDistance = val;
    }
});
//[cf]
//[of]:.fadePower
Object.defineProperty(Light.prototype, "fadePower", {
    get: function() {
        return this._fadePower;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: fadePower must be a float.");
        this._fadePower = val;
    }
});
//[cf]
//[of]:.falloff
Object.defineProperty(Light.prototype, "falloff", {
    get: function() {
        return this._falloff;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: falloff must be a float.");
        if(Math.abs(val) > 90)
            throw new RangeError("[Light]: falloff must be < 90 degrees.");
        this._falloff = val;
    }
});
//[cf]
//[of]:.jitter
Object.defineProperty(Light.prototype, "jitter", {
    get: function() {
        return this._jitter;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: jitter must be a boolean.");
        this._jitter = val;
    }
});
//[cf]
//[of]:.location
Object.defineProperty(Light.prototype, "location", {
    get: function() {
        return this._location;
    },
    set: function(val) {
        if(typeof val != "VectorXYZ")
            throw new TypeError("[Light]: location must be a VectorXYZ");
        this._location = val;
    }
});
//[cf]
//[of]:.looksLike
Object.defineProperty(Light.prototype, "looksLike", {
    get: function() {
        return this._looksLike;
    },
    set: function(val) {
        // TODO: Object
    }
});
//[cf]
//[of]:.orient
Object.defineProperty(Light.prototype, "orient", {
    get: function() {
        return this._orient;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: orient must be a boolean.");
        this._orient = val;
    }
});
//[cf]
//[of]:.parallel
Object.defineProperty(Light.prototype, "parallel", {
    get: function() {
        return this._parallel;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: parallel must be a boolean.");
        this._parallel = val;
    }
});
//[cf]
//[of]:.pointAt
Object.defineProperty(Light.prototype, "pointAt", {
    get: function() {
        return this._pointAt;
    },
    set: function(val) {
        if(typeof val != "VectorXYZ")
            throw new TypeError("[Light]: pointAt must be a VectorXYZ");
        this._pointAt = val;
    }
});
//[cf]
//[of]:.projectedThrough
Object.defineProperty(Light.prototype, "projectedThrough", {
    get: function() {
        return this._projectedThrough;
    },
    set: function(val) {
        // TODO: Objects
    }
});
//[cf]
//[of]:.radius
Object.defineProperty(Light.prototype, "radius", {
    get: function() {
        return this._radius;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: radius must be a float.");
        if(Math.abs(val) > 90)
            throw new RangeError("[Light]: radius must be < 90 degrees.");
        this._radius = val;
    }
});
//[cf]
//[of]:.shadowless
Object.defineProperty(Light.prototype, "shadowless", {
    get: function() {
        return this._shadowless;
    },
    set: function(val) {
        if(typeof val != "boolean")
            throw new TypeError("[Light]: shadowless must be a boolean.");
        this._shadowless = val;
    }
});
//[cf]
//[of]:.size1
Object.defineProperty(Light.prototype, "size1", {
    get: function() {
        return this._size1;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: size1 must be a float.");
        if(val < 1)
            throw new TypeError("[Light]: size1 must be > 0.");
        this._size1 = val;
    }
});
//[cf]
//[of]:.size2
Object.defineProperty(Light.prototype, "size2", {
    get: function() {
        return this._size2;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: size2 must be a float.");
        if(val < 1)
            throw new TypeError("[Light]: size2 must be > 0.");
        this._size2 = Math.floor(val);
    }
});
//[cf]
//[of]:.tightness
Object.defineProperty(Light.prototype, "tightness", {
    get: function() {
        return this._tightness;
    },
    set: function(val) {
        if(typeof val != "number")
            throw new TypeError("[Light]: tightness must be a float.");
        if(val < 0 || val > 100)
            throw new RangeError("[Light]: tightness must be in the range 0-100.");
        this._tightness = val;
    }
});
//[cf]
//[of]:.transform
Object.defineProperty(Light.prototype, "transform", {
    get: function() {
        return this._transform;
    },
    set: function(val) {
		if($CP.prototypeName(val) != "Matrix")
			throw new TypeError("[Light]: transform must be a Matrix.");
		if(this._transform == null)
			this._transform = val;
    }
});
//[cf]
//[of]:.type
Object.defineProperty(Light.prototype, "type", {
    get: function() {
        return this._type;
    },
    set: function(val) {
        if(typeof val != "string" && val !== null)
            throw new TypeError("[Light]: type must be a string or null.");
        if(val !== null && val != "spotlight" && val != "cylinder")
            throw new RangeError("[Light]: Invalid light type.");
        this._type = val;
    }
});
//[cf]
//[cf]
//[of]:Methods
//[of]:.toString(indent)
Light.prototype.toString = function(indent) {
    var pad = $CP.tab(indent);
    var result = [ ];

    result.push(pad + "light_source {");
    if(this.location === null)
        throw new Error("[Light]: location is unspecified.");
    if(this.color === null)
        throw new Error("[Light]: color is unspecified.");
    result.push(pad + "    " + this.location + ", " + this.color);

    if(this.type !== null)
        result.push(pad + "    " + this.type);

    if(this.type == "spotlight" || this.type == "cylindrical") {
        if(this.pointAt === null)
            throw new Error("[Light]: pointAt must be specified.");
        if(this.radius !== null)
            result.push(pad + "    radius " + this.radius);
        if(this.falloff !== null)
            result.push(pad + "    falloff " + this.falloff);
        if(this.tightness !== null)
            result.push(pad + "    tightness " + this.tightness);
    }

    if(this.parallel)
        result.push(pad + "    parallel");

    if(this.pointAt !== null)
        result.push(pad + "    point_at " + this.pointAt);

    if(this.areaLight) {
        if(this.axis1 === null || this.axis2 === null || this.size1 === null || this.size2 === null)
            throw new Error("[Light]: Area lights require axis1, axis2, size1, and size2 to be defined.");
        result.push(pad + "    area_light");
        result.push(pad + "    " + this.axis1 + ", " + this.axis2 + ", " + this.size1 + ", " + this.size2);
        if(this.adaptive !== null)
            result.push(pad + "    adaptive " + this.adaptive);
        if(this.jitter)
            result.push(pad + "    jitter");
        if(this.circular)
            result.push(pad + "    circular");
        if(this.orient)
            result.push(pad + "    orient");
    }

    if(this.shadowless)
        result.push(pad + "    shadowless");

    // TODO: looksLike
    // TODO: projectedThrough

    if(this.fadeDistance !== null)
        result.push(pad + "    fade_distance " + this.fadeDistance);
    if(this.fadePower !== null)
        result.push(pad + "    fade_power " + this.fadePower);

    if(this.mediaInteraction === false)
        result.push(pad + "    media_interaction off");
    if(this.mediaAttenuation === true)
        result.push(pad + "    media_attenuation on");

    result.push(pad + "}");

    return result.join("\n")
}
//[cf]
//[cf]
//[cf]
//[of]:Primitive
//==============================================================================
// The Primitive class is the base class for all objects -- in the POV-Ray sense
// of the word -- in CephaloPOV. CSG objects, on the other hand, are composite
// collections of Primitives. Articulated objects, in turn, are composites of
// CSG objects and Primitives held together by a scene graph.

/*

OBJECT_MODIFIER:
  clipped_by { UNTEXTURED_SOLID_OBJECT... } | If clipped_by and bounded_by use the same object,
  clipped_by { bounded_by }                 | specify bounded_by as "bounded_by { clipped_by }"
  bounded_by { UNTEXTURED_SOLID_OBJECT... } | or vice versa
  bounded_by { clipped_by }                 |
  no_shadow                  |
  no_image [ Bool ]          |
  no_radiosity [ Bool ]      |
  no_reflection [ Bool ]     |
  inverse                    |
  sturm [ Bool ]             |
  hierarchy [ Bool ]         |
  double_illuminate [ Bool ] |
  hollow  [ Bool ]           |
  interior { INTERIOR_ITEMS... }                        |
  material { [MATERIAL_IDENTIFIER][MATERIAL_ITEMS...] } |
  texture { TEXTURE_BODY }   |
  interior_texture { TEXTURE_BODY } |
  pigment { PIGMENT_BODY }   |
  normal { NORMAL_BODY }     |
  finish { FINISH_ITEMS... } |
  photons { PHOTON_ITEMS...}
  radiosity { RADIOSITY_ITEMS...}
  TRANSFORMATION

*/


//[of]:Primitive (base class)
//##############################################################################
//# The Primitive class is the base class for all POV objects. It is never used
//# directly.
//##############################################################################

class Primitive {

    constructor() {

		if($CP.currentScene === null)
			throw new Error("[Primitive]: Objects cannot be instantiated without a current scene.");

        this._boundedBy        = null;
        this._clippedBy        = null;
        this._doubleIlluminate = null;
        this._finish           = null;
        this._hierarchy        = null;
        this._hollow           = null;
        this._interior         = null;
        this._inverse          = null;
        this._material         = null;
        this._noImage          = null;
        this._noRadiosity      = null;
        this._noReflection     = null;
        this._normal           = null;
        this._noShadow         = null;
        this._photons          = null;
        this._pigment          = null;
        this._radiosity        = null;
        this._sturm            = null;
        this._texture          = null;
        this._transform        = null;
        
		this._active           = true;
		this._finite           = null;
		this._solid            = null;
		this._parent           = null; // reference to CSG parent object where applicable
		this._serial           = null;
		this._scene            = null;
		
		$CP.currentScene.addObject(this);
    }

//[of]:Attributes/Mutators
//[of]:active
//=============================================================================
// The active attribute is specific to CephaloPOV; it does not occur in SDL. An
// object where active == true is output to the frame file. If active is false, 
// the object will not be output. Inactive objects effectively do not exist in
// the current frame; they are not merely invisible. As such, they cannot
// participate in CSG operations. The default is true.
//=============================================================================

get active() {
	return this._active;
}

set active(val) {
	if(typeof active != "boolean")
		throw new TypeError("[Primitive]: active must be a boolean.");
		this._active = val;
}
//[cf]
//[of]:boundedBy
//=============================================================================
//=============================================================================

get boundedBy() {
    return this._boundedBy;
}

set boundedBy(val) {
    if($CP.baseClassName(v) != "FIXME")
        throw new TypeError("[Primitive]: The boundedBy attribute must be an SDL object.");
    this._boundedBy = val;
}
//[cf]
//[of]:clippedBy
//=============================================================================
//=============================================================================

get clippedBy() {
    return this._clippedBy;
}

set clippedBy(val) {
    if($CP.baseClassName(v) != "Primitive")
        throw new TypeError("[Primitive]: The clippedBy attribute must be an SDL object.");
    this._clippedBy = val;
}
//[cf]
//[of]:doubleIlluminate
//=============================================================================
//=============================================================================

get doubleIlluminate() {
    return this._doubleIlluminate;
}

set doubleIlluminate(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The doubleIlluminate attribute must be a boolean.");
    this._doubleIlluminate = val;
}
//[cf]
//[of]:finish
//=============================================================================
//=============================================================================

get finish() {
    return this._finish;
}

set finish(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The finish attribute must be a FIXME.");
    this._finish = val;
}
//[cf]
//[of]:hierarchy
//=============================================================================
//=============================================================================

get hierarchy() {
    return this._hierarchy;
}

set hierarchy(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The hierarchy attribute must be a boolean.");
    this._hierarchy = val;
}
//[cf]
//[of]:hollow
//=============================================================================
//=============================================================================

get hollow() {
    return this._hollow;
}

set hollow(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The hollow attribute must be a boolean.");
    this._hollow = val;
}
//[cf]
//[of]:interior
//=============================================================================
//=============================================================================

get interior() {
    return this._interior;
}

set interior(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The interior attribute must be a FIXME.");
    this._interior = val;
}
//[cf]
//[of]:inverse
//=============================================================================
//=============================================================================

get inverse() {
    return this._inverse;
}

set inverse(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The inverse attribute must be a boolean.");
    this._inverse = val;
}
//[cf]
//[of]:finite
//=============================================================================
// The finite attribute is a read-only boolean indicating whether the object
// primitive is finite. This is a convenience feature for writing conditional
// code in CephaloPOV; it is not an SDL keyword. For CSG objects, it is null,
// though this may change in the future.
//
// TODO: Implement finite in CSG objects.
//=============================================================================

get finite() {
    return this._finite;
}

set finite(val) {
	throw new Error("[Primitive]: The finite attribute is read-only.");
}
//[cf]
//[of]:material
//=============================================================================
//=============================================================================

get material() {
    return this._material;
}

set material(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The material attribute must be a FIXME.");
    this._material = val;
}
//[cf]
//[of]:noImage
//=============================================================================
//=============================================================================

get noImage() {
    return this._noImage;
}

set noImage(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The noImage attribute must be a boolean.");
    this._noImage = val;
}
//[cf]
//[of]:noRadiosity
//=============================================================================
//=============================================================================

get noRadiosity() {
    return this._noRadiosity;
}

set noRadiosity(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The noRadiosity attribute must be a boolean.");
    this._noRadiosity = val;
}
//[cf]
//[of]:noReflection
//=============================================================================
//=============================================================================

get noReflection() {
    return this._noReflection;
}

set noReflection(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The noReflection attribute must be a boolean.");
    this._noReflection = val;
}
//[cf]
//[of]:normal
//=============================================================================
//=============================================================================

get normal() {
    return this._normal;
}

set normal(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The normal attribute must be a FIXME.");
    this._normal = val;
}
//[cf]
//[of]:noShadow
//=============================================================================
//=============================================================================

get noShadow() {
    return this._noShadow;
}

set noShadow(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The noShadow attribute must be a boolean.");
    this._noShadow = val;
}
//[cf]
//[of]:parent
//=============================================================================
// The parent attribute is specific to CephaloPOV; it does not occur in SDL. It
// is null by default. When object primitives are combined into CSG objects,
// it will point to the parent CSG object. From the perspective of the API
// user, it is read-only.
//=============================================================================

get parent() {
	return this._parent;
}

set parent(val) {
	throw new Error("[Primitive]: The parent attribute is read-only.");
}
//[cf]
//[of]:photons
//=============================================================================
//=============================================================================

get photons() {
    return this._photons;
}

set photons(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The photons attribute must be a FIXME.");
    this._photons = val;
}
//[cf]
//[of]:pigment
//=============================================================================
//=============================================================================

get pigment() {
    return this._pigment;
}

set pigment(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The pigment attribute must be a FIXME.");
    this._pigment = val;
}
//[cf]
//[of]:solid
//=============================================================================
// The solid attribute is a read-only boolean indicating whether the object
// primitive is solid or not. It is a convenience feature for use in CephaloPOV
// conditions, not an SDL keyword. CSG objects are solid if and only if all of
// their constituent objects are also solid.
//=============================================================================

get solid() {
    return this._solid;
}

set solid(val) {
	throw new Error("[Primitive]: The solid attribute is read-only.");
}
//[cf]
//[of]:sturm
//=============================================================================
//=============================================================================

get sturm() {
    return this._sturm;
}

set sturm(val) {
    if($CP.prototypeName(v) != "boolean")
        throw new TypeError("[Primitive]: The sturm attribute must be a boolean.");
    this._sturm = val;
}
//[cf]
//[of]:texture
//=============================================================================
//=============================================================================

get texture() {
    return this._texture;
}

set texture(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The texture attribute must be a FIXME.");
    this._texture = val;
}
//[cf]
//[of]:transform
//=============================================================================
//=============================================================================

get transform() {
    return this._transform;
}

set transform(val) {
    if($CP.prototypeName(val) != "Matrix")
        throw new TypeError("[Primitive]: The transform attribute must be a Matrix.");
    this._transform = val;
}
//[cf]
//[of]:radiosity
//=============================================================================
//=============================================================================

get radiosity() {
    return this._radiosity;
}

set radiosity(val) {
    if($CP.prototypeName(v) != "FIXME")
        throw new TypeError("[Primitive]: The radiosity attribute must be a FIXME.");
    this._radiosity = val;
}
//[cf]
//[cf]
//[of]:Methods

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


}
//[cf]
//[of]:BicubicPatch (TODO)
//##############################################################################
//#
//##############################################################################

class BicubicPatch extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = false;
        this._finite = true;

    }

}
//[cf]
//[of]:Blob (TODO)
//##############################################################################
//#
//##############################################################################

class Blob extends Primitive {

    constructor(/* TODO */) {
        super();
        this._solid   = true;
        this._finite  = true;
    }

}
//[cf]
//[of]:Box
//##############################################################################
//#
//##############################################################################

class Box extends Primitive {

    constructor(corner1, corner2) {
        super();
        this._solid   = true;
        this._finite  = true;
        this._corner1 = corner1;
        this._corner2 = corner2;
    }

//[of]:Attributes/Mutators
//[of]:corner1
get corner1() {
    return this._corner1;
}

set corner1(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Box]: corner1 must be a VectorXYZ.");
    this._corner1 = val;
}
//[cf]
//[of]:corner2
get corner2() {
    return this._corner2;
}

set corner2(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Box]: corner2 must be a VectorXYZ.");
    this._corner2 = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "box {");
    content.push(pad + "    " + this.corner1 + ", " + this.corner2);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Cone
//##############################################################################
//#
//##############################################################################

class Cone extends Primitive {

    constructor(basePoint, baseRadius, capPoint, capRadius, open = true) {
        super();
        this._solid      = true;
        this._finite     = true;
        this._basePoint  = basePoint;
        this._baseRadius = baseRadius;
        this._capPoint   = capPoint;
        this._capRadius  = capRadius;
        this._open       = open;
    }

//[of]:Attributes/Mutators
//[of]:get basePoint
get basePoint() {
    return this._basePoint;
}

set basePoint(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Cone]: basePoint must be a VectorXYZ.");
    this._basePoint = val;
}
//[cf]
//[of]:get baseRadius
get baseRadius() {
    return this._baseRadius;
}

set baseRadius(val) {
    if(typeof val !== "number")
        throw new TypeError("[Cone]: baseRadius must be a float.");
    this._baseRadius = val;
}
//[cf]
//[of]:get capPoint
get capPoint() {
    return this._capPoint;
}

set capPoint(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Cone]: capPoint must be a VectorXYZ.");
    this._capPoint = val;
}
//[cf]
//[of]:get capRadius
get capRadius() {
    return this._capRadius;
}

set capRadius(val) {
    if(typeof val !== "number")
        throw new TypeError("[Cone]: capRadius must be a float.");
    this._capRadius = val;
}
//[cf]
//[of]:get open
get open() {
    return this._open;
}

set open(val) {
    if(typeof val != "boolean")
        throw new TypeError("[Cone]: open must be a boolean.");
    this._open = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "cone {");
    content.push(pad + "    " + this.basePoint + ", " + this.baseRadius + ", " + this.capPoint + ", " + this.capRadius);
    if(this.open)
        content.push(pad + "    open");
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Cubic (TODO)
//##############################################################################
//#
//##############################################################################

class Cubic extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = false;

    }

}
//[cf]
//[of]:Cylinder
//##############################################################################
//#
//##############################################################################

class Cylinder extends Primitive {

    constructor(basePoint, capPoint, radius, open = true) {
        super();
        this._solid      = true;
        this._finite     = true;
        this._basePoint  = basePoint;
        this._capPoint   = capPoint;
        this._radius     = radius;
        this._open       = open;
    }


//[of]:Attributes/Mutators
//[of]:basePoint
get basePoint() {
    return this._basePoint;
}

set basePoint(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Cylinder]: basePoint must be a VectorXYZ.");
    this._basePoint = val;
}
//[cf]
//[of]:capPoint
get capPoint() {
    return this._capPoint;
}

set capPoint(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Cylinder]: capPoint must be a VectorXYZ.");
    this._capPoint = val;
}
//[cf]
//[of]:open
get open() {
    return this._open;
}

set open(val) {
    if(typeof val != "boolean")
        throw new TypeError("[Cylinder]: open must be a boolean.");
    this._open = val;
}
//[cf]
//[of]:radius
get radius() {
    return this._radius;
}

set radius(val) {
    if(typeof val !== "number")
        throw new TypeError("[Cylinder]: radius must be a float.");
    this._capRadius = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "cylinder {");
    content.push(pad + "    " + this.basePoint + ", " + this.capPoint + ", " + this.radius);
    if(this.open)
        content.push(pad + "    open");
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Disc
//##############################################################################
//#
//##############################################################################

class Disc extends Primitive {

    constructor(center, normal, radius, holeRadius = null) {
        super();
        this._solid      = false;
        this._finite     = true;
        this._center     = center;
        this._normal     = normal;
        this._radius     = radius;
        this._holeRadius = holeRadius;
    }

//[of]:Attributes/Mutators
//[of]:corner1
get corner1() {
    return this._center;
}

set center(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Disc]: center must be a VectorXYZ.");
    this._center = val;
}
//[cf]
//[of]:holeRadius
get holeRadius() {
    return this._holeRadius;
}

set holeRadius(val) {
    if(val !== null && typeof val != "number")
        throw new TypeError("[Disc]: holeRadius must be a float or null.");
    this._holeRadius = val;
}
//[cf]
//[of]:normal
get normal() {
    return this._normal;
}

set normal(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Disc]: normal must be a VectorXYZ.");
    this._normal = val;
}
//[cf]
//[of]:radius
get radius() {
    return this._radius;
}

set radius(val) {
    if(typeof val != "number")
        throw new TypeError("[Disc]: radius must be a float.");
    this._radius = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "disc {");
    content.push(pad + "    " + this.center + ", " + this.normal + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}

//[cf]
//[of]:Difference
//##############################################################################
//# The Difference class implements the CSG difference operation. The first
//# argument is a single positiveObject from which one or more negativeObjects
//# are subtracted. All objects must be solid. The resulting Difference object
//# will also be solid, but its finite status is (currently) ambiguous and will
//# remain null.
//##############################################################################

class Difference extends Primitive {

    constructor(positiveObject, ...negativeObjects) {
        super();
        this._solid           = true;

		if(negativeObjects === undefined || negativeObjects.length == 0)
			throw new RangeError("[Difference]: At least one negative object must be specified.");
        
        positiveObject.parent = this;
        this._positiveObject  = positiveObject;
        
        for(var i = 0; i < negativeObjects.length; i++)
        	negativeObjects[i].parent = this;
		this._negativeObjects = negativeObjects;
    }

//[of]:Attributes/Mutators
//[of]:negativeObjects
get negativeObjects() {
	return this._negativeObjects;
}

set negativeObjects(val) {
	for(var i = 0; i < val.length; i++) {
		if($CP.baseClassName(val[i]) != "Primitive")
			throw new TypeError("[Difference]: All negative objects must be subclasses of Primitive.");
		if(!val[i].solid)
			throw new TypeError("[Difference]: All negative objects must be solid.");
	}
	this._negativeObjects = val;
}
//[cf]
//[of]:positiveObject
get positiveObject() {
	return this._positiveObject;
}

set positiveObject(val) {
	if(val.solid === undefined || !val.solid)
		throw new TypeError("[Difference]: The positiveObject must be solid.");  	
	this._positiveObject = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
	var pad  = $CP.tab(indent);
	var content = [];
	
	content.push(pad + "difference {");
	content.push(pad + "    " + this._positiveObject.toString(indent + 1));
	for(var i = 0; i < this._negativeObjects.length; i++) {
		content.push(pad + "    " + this._negativeObjects[i].toString(indent + 1));
	}
	content.push(super.toString(indent + 1));
	content.push(pad + "}");
	
	return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:HeightField
//##############################################################################
//#
//##############################################################################

class HeightField extends Primitive { 

    constructor(filename, isFunc = false) {
        super();
        this._solid         = true;
        this._finite        = true;
        this._hfType        = null;
        this._filename      = null;
        this._smooth        = null;
        this._waterLevel    = null;
        this._gamma         = null;
        this._userFunc      = null;
        this._premultiplied = null;
        
        if(isFunc)
        	this._userFunc = filename;
       	else
       		this._filename = filename;
        
    }

//[of]:Attributes/Mutators
//[of]:filename
get filename() {
    return this._filename;
}

set filename(val) {
    if(typeof val !== "string")
        throw new TypeError("[HeightField]: filename must be a string.");
    if(val.length == 0)
    	throw new RangeError("[HeightField]: filename cannot be empty.");
    this._filename = val;
}
//[cf]
//[of]:gamma
get gamma() {
    return this._gamma;
}

set gamma(val) {
    if(typeof val !== "number")
        throw new TypeError("[HeightField]: gamma must be a float.");
    this._gamma = val;
}
//[cf]
//[of]:hfType
get hfType() {
	return this._hfType;
}

set hfType(val) {
	if(typeof val != "string")
		throw new TypeError("[HeightField]: hfType must be a string.");
	if(!$CP.inArray($CP.hfTypes, val) {
		throw new RangeError("[HeightField]: HfType must be one of " + $CP.hfTypes.join(", ") + ".");
	}
	this._hfType = val;
}
//[cf]
//[of]:premultiplied
get premultiplied() {
	return this._premultiplied;
}

set premultiplied(val) {
	if(typeof val != "boolean")
		throw new TypeError("[HeightField]: premultiplied must be a boolean.");
	this._premultiplied = val;
}
//[cf]
//[of]:smooth
get smooth() {
	return this._smooth;
}

set smooth(val) {
	if(typeof val != "boolean")
		throw new TypeError("[HeightField]: smooth must be a boolean.");
	this._smooth = val;
}
//[cf]
//[of]:userFunc
get userFunc() {
    return this._userFunc;
}

set userFunc(val) {
    if(typeof val !== "string")
        throw new TypeError("[HeightField]: userFunc must be a string.");
    if(val.length == 0)
    	throw new RangeError("[HeightField]: userFunc cannot be empty.");
    this._userFunc = val;
}
//[cf]
//[of]:waterLevel
get waterLevel() {
	return this._waterLevel;
}

set waterLevel(val) {
	if(typeof val != "number")
		throw new TypeError("[HeightField]: waterLevel must be a float.");
	if(val < 0 || val > 1)
		throw new RangeError("[HeightField]: waterLevel must be in the range 0.0 to 1.0");
	this._waterLevel = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
	var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "height_field {");
    if(this._userFunc !== null) {
    	content.push(pad + "    function FieldResolution_X, FieldResolution_Y { " + this.userFunc + " }});
    } else if(this._filename !== null) {
    	content.push(
    		pad + "    "
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
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Intersection
//##############################################################################
//# The Intersection class implements the CSG intersection operation. Its
//# arguments consist of two or more solid objects.
//##############################################################################

class Intersection extends Primitive {

    constructor(...objects) {
        super();
        this._solid   = true;

        for(var i = 0; i < objects.length; i++)
        	objects[i].parent = this;

        this._objects = objects;
    }
    
//[of]:Attributes/Mutators
//[of]:objects
get objects() {
	return this._objects;
}    

set objects(objs) {
	if(objs.length === undefined || objs.length < 2)
		throw new Error("[Intersection]: At least two objects must be supplied.");
	foreach(var i = 0; i < objs.length; i++) {
		if($CP.baseClassName(objs[i]) != "Primitive")
			throw new TypeError("[Intersection]: All components must be instances of a Primitive subclass.");
		if(!objs[i].solid)
			throw new TypeError("[Intersection]: All components must be solid objects.");
	}
	this._objects = objs;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
	var pad  = $CP.tab(indent);
	var content = [];
	
	content.push(pad + "intersection {");
	for(var i = 0; i < this._objects.length; i++) {
		content.push(pad + "    " + this._objects[i].toString(indent + 1));
	}
	content.push(super.toString(indent + 1));
	content.push(pad + "}");
	
	return content.join("\n");
}
//[cf]
//[cf]
    
}
//[cf]
//[of]:IsoSurface (TODO)
//##############################################################################
//#
//##############################################################################

class IsoSurface extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:JuliaFractal (TODO)
//##############################################################################
//#
//##############################################################################

class JuliaFractal extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Lathe (TODO)
//##############################################################################
//#
//##############################################################################

class Lathe extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Merge
//##############################################################################
//# The Merge class implements the CSG merge operation. Its arguments consist of 
//# two or more solid objects.
//##############################################################################

class Merge extends Primitive {

    constructor(...objects) {
        super();
        this._solid   = true;
        
        for(var i = 0; i < objects.length; i++)
        	objects[i].parent = this;
        
        this._objects = objects;
    }

//[of]:Attributes/Mutators
//[of]:objects
get objects() {
	return this._objects;
}    

set objects(objs) {
	if(objs.length === undefined || objs.length < 2)
		throw new Error("[Merge]: At least two objects must be supplied.");
	foreach(var i = 0; i < objs.length; i++) {
		if($CP.baseClassName(objs[i]) != "Primitive")
			throw new TypeError("[Merge]: All components must be instances of a Primitive subclass.");
		if(!objs[i].solid)
			throw new TypeError("[Merge]: All components must be solid objects.");
	}
	this._objects = objs;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
	var pad  = $CP.tab(indent);
	var content = [];
	
	content.push(pad + "merge {");
	for(var i = 0; i < this._objects.length; i++) {
		content.push(pad + "    " + this._objects[i].toString(indent + 1));
	}
	content.push(super.toString(indent + 1));
	content.push(pad + "}");
	
	return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Mesh (TODO)
//##############################################################################
//#
//##############################################################################

class Mesh extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = false;
        this._finite = true;

    }

}
//[cf]
//[of]:Mesh2 (TODO)
//##############################################################################
//#
//##############################################################################

class Mesh2 extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = false;
        this._finite = true;

    }

}
//[cf]
//[of]:Ovus
//##############################################################################
//#
//##############################################################################

class Ovus extends Primitive {

    constructor(topRadius, bottomRadius) {
        super();
        this._solid       = true;
        this._finite      = true;
        this.topRadius    = topRadius;
        this.bottomRadius = bottomRadius;
    }

//[of]:Attributes/Mutators
//[of]:topRadius
get topRadius() {
    return this._topRadius;
}

set topRadius(val) {
    if(typeof val != "number")
        throw new TypeError("[Ovus]: topRadius must be a float.");
    this._topRadius = val;
}
//[cf]
//[of]:bottomRadius
get bottomRadius() {
    return this._bottomRadius;
}

set bottomRadius(val) {
    if(typeof val != "number")
        throw new TypeError("[Ovus]: bottomRadius must be a float.");
    this._bottomRadius = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "ovus {");
    content.push(pad + "    " + this.topRadius + ", " + this.bottomRadius);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Parametric (TODO)
//##############################################################################
//#
//##############################################################################

class Parametric extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Plane
//##############################################################################
//#
//##############################################################################

class Plane extends Primitive {

    constructor(normal, distance) {
        super();
        this._solid    = true;
        this._finite   = false;
        this._normal   = normal;
        this._distance = distance;
    }


//[of]:Attributes/Mutators
//[of]:distance
get distance() {
    return this._distance;
}

set distance(val) {
    if(typeof val !== "number")
        throw new TypeError("[Plane]: distance must be a float.");
    this._distance = val;
}
//[cf]
//[of]:normal
get normal() {
    return this._normal;
}

set normal(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Sphere]: center must be a VectorXYZ.");
    this._center = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "sphere {");
    content.push(pad + "    " + this.center + ", " + this.radius);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Poly (TODO)
//##############################################################################
//#
//##############################################################################

class Poly extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = false;
    }

}
//[cf]
//[of]:Polygon (TODO)
//##############################################################################
//#
//##############################################################################

class Polygon extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = false;
        this._finite = true;

    }

}
//[cf]
//[of]:Polynomial (TODO)
//##############################################################################
//#
//##############################################################################

class Polynomial extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = false;

    }

}
//[cf]
//[of]:Prism (TODO)
//##############################################################################
//#
//##############################################################################

class Prism extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Quadric (TODO)
//##############################################################################
//#
//##############################################################################

class Quadric extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = false;

    }

}
//[cf]
//[of]:Quartic (TODO)
//##############################################################################
//#
//##############################################################################

class Quartic extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = false;

    }

}
//[cf]
//[of]:Sphere
//##############################################################################
//#
//##############################################################################

class Sphere extends Primitive {

    constructor(center, radius) {
        super();
        this._solid  = true;
        this._finite = true;
        this._center = center;
        this._radius = radius;
    }

//[of]:Attributes/Mutators
//[of]:center()
get center() {
    return this._center;
}

set center(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Sphere]: center must be a VectorXYZ.");
    this._center = val;
}
//[cf]
//[of]:radius()
get radius() {
    return this._radius;
}

set radius(val) {
    if(typeof val !== "number")
        throw new TypeError("[Sphere]: radius must be a float.");
    this._capRadius = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "sphere {");
    content.push(pad + "    " + this.center + ", " + this.radius);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:SphereSweep (TODO)
//##############################################################################
//#
//##############################################################################

class SphereSweep extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Superquadric (TODO)
//##############################################################################
//#
//##############################################################################

class Superquadric extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:SurfaceOfRevolution (TODO)
//##############################################################################
//#
//##############################################################################

class SurfaceOfRevolution extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:TextObject (TODO)
//##############################################################################
//#
//##############################################################################

class TextObject extends Primitive { // TODO

    constructor() {
        super();
        this._solid  = true;
        this._finite = true;
    }

}
//[cf]
//[of]:Torus
//##############################################################################
//#
//##############################################################################

class Torus extends Primitive {

    constructor(majorRadius, minorRadius) {
        super();
        this._solid      = true;
        this._finite     = true;
        this.majorRadius = majorRadius;
        this.minorRadius = minorRadius;
    }


//[of]:Attributes/Mutators
//[of]:majorRadius
get majorRadius() {
    return this._majorRadius;
}

set majorRadius(val) {
    if(typeof val != "number")
        throw new TypeError("[Torus]: majorRadius must be a float.");
    this._majorRadius = val;
}
//[cf]
//[of]:minorRadius
get minorRadius() {
    return this._minorRadius;
}

set minorRadius(val) {
    if(typeof val != "number")
        throw new TypeError("[Torus]: minorRadius must be a float.");
    this._minorRadius = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "torus {");
    content.push(pad + "    " + this.majorRadius + ", " + this.minorRadius);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Triangle
//##############################################################################
//#
//##############################################################################

class Triangle extends Primitive {

    constructor(corner1, corner2, corner3) {
        super();
        this._solid  = false;
        this._finite = true;
        this.corner1 = corner1;
        this.corner2 = corner2;
        this.corner3 = corner3;
    }

//[of]:Attributes/Mutators
//[of]:corner1
get corner1() {
    return this._corner1;
}

set corner1(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Triangle]: corner1 must be a VectorXYZ.");
    this._corner1 = val;
}
//[cf]
//[of]:corner2
get corner2() {
    return this._corner2;
}

set corner2(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Triangle]: corner2 must be a VectorXYZ.");
    this._corner2 = val;
}
//[cf]
//[of]:corner3
get corner3() {
    return this._corner3;
}

set corner3(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[Triangle]: corner3 must be a VectorXYZ.");
    this._corner3 = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "triangle {");
    content.push(pad + "    " + this.corner1 + ", " + this.corner2 + ", " + this.corner3);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:Union
//##############################################################################
//# The Union class implements the CSG union operation. Its arguments consist of 
//# two or more solid objects.
//##############################################################################

class Merge extends Primitive {

    constructor(...objects) {
        super();
        this._solid      = true;

		for(var i = 0; i < objects.length; i++)
        	objects[i].parent = this;

        this._objects    = objects;
        this._splitUnion = false;
    }

//[of]:Attributes/Mutators
//[of]:objects
get objects() {
	return this._objects;
}    

set objects(objs) {
	if(objs.length === undefined || objs.length < 2)
		throw new Error("[Union]: At least two objects must be supplied.");
	foreach(var i = 0; i < objs.length; i++) {
		if($CP.baseClassName(objs[i]) != "Primitive")
			throw new TypeError("[Union]: All components must be instances of a Primitive subclass.");
		if(!objs[i].solid)
			throw new TypeError("[Union]: All components must be solid objects.");
	}
	this._objects = objs;
}
//[cf]
//[of]:splitUnion
get splitUnion() {
	return this._splitUnion;
}

set splitUnion(val) {
	if(typeof val !== "boolean")
		throw new TypeError("[Union]: splitUnion must be a boolean.");
	this._splitUnion = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
	var pad  = $CP.tab(indent);
	var content = [];
	
	content.push(pad + "merge {");
	for(var i = 0; i < this._objects.length; i++) {
		content.push(pad + "    " + this._objects[i].toString(indent + 1));
	}
	content.push(pad + "    split_union " + (this._splitUnion ? "on" : "off"));
	content.push(super.toString(indent + 1));
	content.push(pad + "}");
	
	return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[of]:SmoothTriangle
//##############################################################################
//#
//##############################################################################

class SmoothTriangle extends Primitive {

    constructor(corner1, normal1, corner2, normal2, corner3, normal3) {
        super();
        this._solid  = false;
        this._finite = true;
		this._corner1 = corner1;
		this._normal1 = normal1;
		this._corner2 = corner2;
		this._normal2 = normal2;
		this._corner3 = corner3;
		this._normal3 = normal3;
    }

//[of]:Attributes/Mutators
//[of]:corner1
get corner1() {
    return this._corner1;
}

set corner1(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: corner1 must be a VectorXYZ.");
    this._corner1 = val;
}
//[cf]
//[of]:corner2
get corner2() {
    return this._corner2;
}

set corner2(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: corner2 must be a VectorXYZ.");
    this._corner2 = val;
}
//[cf]
//[of]:corner3
get corner3() {
    return this._corner3;
}

set corner3(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: corner3 must be a VectorXYZ.");
    this._corner3 = val;
}
//[cf]
//[of]:normal1
get normal1() {
    return this._normal1;
}

set normal1(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: normal1 must be a VectorXYZ.");
    this._normal1 = val;
}
//[cf]
//[of]:normal2
get normal2() {
    return this._normal2;
}

set normal2(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: normal2 must be a VectorXYZ.");
    this._normal2 = val;
}
//[cf]
//[of]:normal3
get normal3() {
    return this._normal3;
}

set normal3(val) {
    if($CP.prototypeName(val) != "VectorXYZ")
        throw new TypeError("[SmoothTriangle]: normal3 must be a VectorXYZ.");
    this._normal3 = val;
}
//[cf]
//[cf]
//[of]:Methods
//[of]:toString(indent)
toString(indent) {
    var pad  = $CP.tab(indent);
    var content = [];

    content.push(pad + "smooth_triangle {");
    content.push(pad + "    "
    	+ this.corner1 + ", " + this.normal1 + ", "
    	+ this.corner2 + ", " + this.normal2 + ", "
    	+ this.corner3 + ", " + this.normal3);
    content.push(super.toString(indent + 1));
    content.push(pad + "}");

    return content.join("\n");
}
//[cf]
//[cf]

}
//[cf]
//[cf]
//[of]:Scene
//==============================================================================
// The Scene object is a container for the various objects in a scene, as well
// as internal bookkeeping data.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

function Scene() {
	this._objSerial      = 0;                     // Incremented for each new object
	this._objDict        = new Map();             // Maps objects to their serials
	this._imageOptions   = new ImageOptions();
	this._globalSettings = new GlobalSettings();
	this._frame          = 0;                     // Current frame number
	this._activeCamera   = null;
	this._baseName       = null;                  // If set, this becomes the base name for all output files
	
	if($CP.currentScene === null)
		$CP.currentScene = this;
}

// Attributes/Mutators
//[of]:baseName
Object.defineProperty(Scene.prototype, "baseName", {
    get: function() {
        return this._baseName;
    },
    set: function(val) {
        if(typeof val != "string")
        	throw new TypeError("[Scene]: basename must be a string.");
        if(val.length == 0)
        	throw new RangeError("[Scene]: basename cannot be an empty string.");
       	this._baseName = val;
    }
});
//[cf]
//[of]:frame
Object.defineProperty(Scene.prototype, "frame", {
    get: function() {
        return this._frame;
    },
    set: function(val) {
        throw new Error("[Scene]: The frame attribute is read-only.");
    }
});
//[cf]
//[of]:globalSettings
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
//[cf]
//[of]:imageOptions
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


//[of]:addObject(obj)
Scene.prototype.addObject = function(obj) {
	obj._serial = this._objSerial;
	this._objDict[obj] = this._objSerial;
	this._objSerial++;
	obj._scene = this;
}
//[cf]
//[of]:makeCurrent()
Scene.prototype.makeCurrent = function() {
	$CP.currentScene = this;
}
//[cf]

Scene.prototype.nextFrame = function() {
	this._frame++;
	// TODO: Call object prepare callbacks
	// TODO: Call object update callbacks
}

//[cf]


//[of]:Tests
//==============================================================================
// These tests will likely move to a separate file before release. For now, they
// are included here for the sake of convenience. They are all essentially unit
// tests which produce output that will in turn be used in regression tests
// along with test renderings.

function CpTests() {
	this.outputSerial = 0;
	this.prefix = "#";
}

//------------------------------------------------------------------------------

CpTests.prototype.getOutputSerial = function() {
	return this.outputSerial++;
}

//------------------------------------------------------------------------------

CpTests.prototype.ImageOptions1 = function(testName) {
	var ini = new File(this.prefix + this.getOutputSerial() + "_ImageOptions1_ini_" + testName, "w");
	var cli = new File(this.prefix + this.getOutputSerial() + "_ImageOptions1_cli_" + testName, "w");

	var opt = new ImageOptions();

	opt.width  = 640;
	opt.height = 480;

	var result = opt.validateAndOutput();

	ini.write(result.ini); ini.close();
	cli.write(result.cli); cli.close();

	return true;
}
//[cf]


