//------------------------------------------------------------------------------
// Definitions of parameters for primitive geometric objects.
//
// TODO: "mesh2" needs to be added once I understand it better.
//------------------------------------------------------------------------------

module.exports = {

    // TODO: need way to specify special methods, e.g., editing the components array

    bicubicPatch: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["BicubicPatch.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isInt(val) && (val == 0 || val == 1)",
                err:   "type must be either 0 or 1.",
                desc:  "This may be either 0 or 1. Type 0 reduces the amount of memory used to store the patch in memory at the cost of slower rendering. Type 1 does the reverse, consuming more memory but reducing the number of calculations required.",
                tname: "integer"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16)",
                err:   "points must be an array of 16 VectorXYZ.",
                desc:  "The <code>points</code> attribute is an array of 16 <code>VectorXYZ</code> points which define the 4 &mult; 4 array of control points that define the patch.",
                tname: "Array"
            }, {
                name:  "uSteps",
                valid: "cpov.isInt(val)",
                err:   "uSteps must be an integer.",
                desc:  "Defines the number of rows of triangles used to create the patch. Most patches can be acceptably rendered using 3 rows.",
                tname: "integer"
            }, {
                name:  "vSteps",
                valid: "cpov.isInt(val)",
                err:   "vSteps must be an integer.",
                desc:  "Defines the number of columns of triangles used to create the patch. Most patches can be acceptably rendered using 3 columns.",
                tname: "integer"
            }, {
                name:  "flatness",
                valid: "cpov.isFloat(val) && val >= 0 && val <= 1",
                err:   "flatness must be a float in the unit interval (0.0 - 1.0).",
                desc:  "If <code>flatness</code> is 0 (the default), the patch will be subdivided into only as many triangles as specified by <code>uSteps</code> and <code>vSteps</code>. Increasing it up to a maximum of 1.0 will encourage POV-Ray to automatically subdivide the patch into additional triangles as needed.",
                tname: "float"
            }
        ],
    },

    blob: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Blob.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:   "components",
                req:    true,
                child:  "array",
                valid:  "cpov.isArrayOfClass(val, ['Sphere', 'Cylinder'], 1, Infinity) && val.length",
//                custom: "Blob.components.get-set",
                err:    "components must be an array of Spheres and/or Cylinders.",
                desc:   "This is an array of <code>Sphere</code> and <code>Cylinders</code>, optionally with their <code>strength</code> attributes set.",
                tname:  "Array"
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold",
                desc:  "The <code>threshold</code> determines the field strength that distinguishes between the inside and outside of a <code>Blob</code>, i.e., <code>threshold</code> defines the surface of a <code>Blob</code>.",
                tname: "float"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "If <code>false</code>, turn off the internal bounding hierarchy.",
                tname: "hierarchy"
            }
        ],
    },

    box: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Box.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "corner1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner1 must be a VectorXYZ.",
                desc:  "The first of two opposite corners of the cube.",
                tname: "VectorXYZ"
            }, {
                name:  "corner2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner2 must be a VectorXYZ.",
                desc:  "The first of two opposite corners of the cube.",
                tname: "VectorXYZ"
            }
        ],

    },

    //--------------------------------------------------------------------------
    // The camera type isn't really a primitive in SDL, but we're going to
    // treat it as one for most purposes and fake it in CSG objects.
    //--------------------------------------------------------------------------

    camera: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Camera.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: true },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.cameraTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.cameraTypes) + ".",
                desc:  "Defines the type of the camera. The legal values are $keylist.cameraTypes",
                tname: "string"
            }, {
                name:  "angle", //        type: "FIXME" }, // TODO
                valid: "cpov.isFloat(val) && val > 0 && val <= 360",
                err:   "angle must be a float greater than zero and less than or equal to 360.",
                desc:  "Sets the width of the camera's viewing angle in degrees.",
                tname: "integer"
            }, {
                name:  "aperture",
                valid: "cpov.isFloat(val)",
                err:   "apertureSize must be a float.",
                desc:  "A non-zero value will enable simulated focal depth-of-field.",
                tname: "float"
            }, {
                name:  "blurSamples",
                valid: "cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0",
                err:   "blurSamples must be an array of two floats greater than or equal to zero.",
                desc:  "Specifies the minimum and maximum number of samples to be used when <code>aperture</code> is non-zero.",
                tname: "Array"
            }, {
                name:  "bokeh",
                valid: "cpov.isClass(val, 'Color') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0",
                err:   "bokeh must be a Color in the range <0, 0, 0> to <1, 1, 0>.",
                desc:  "Specifies the bokeh color.",
                tname: "Color"
            }, {
                name:  "confidence",
                valid: "cpov.isFloat(val) && val >= 0 && val < 1",
                err:   "confidence must be a float.",
                desc:  "Specifies the confidence interval that determines when enough samples have been taken when <code>aperture</code> is non-zero.",
                tname: "float"
            }, {
                name:  "cylinderType",
                valid: "cpov.isInt(val) && val > 0 && val < 5",
                err:   "cylinderType must be an integer in the range (1 - 4).",
                desc:  "If the cylinder camera type is used, <code>cyliderType</code> must be set with an integer in the range 1-4. These values correspond to $keylist.cylindricalCameraTypes",
                tname: "integer"
            }, {
                name:  "direction",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "direction must be a VectorXYZ.",
                desc:  "Sets the direction vector of the camera before it is moved by <code>lookAt</code> and any rotations. For most purposes, you will not need to set <code>direction</code>, but see the POV-Ray docs for <a href=\"http://povray.org/documentation/3.7.0/r3_4.html#r3_4_2_1_4\">more details</a>.",
                tname: "VectorXYZ"
            }, {
                name:  "focalPoint",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "focalPoint must be a VectorXYZ.",
                desc:  "Specifies the point at which the image is perfectly focused when <code>aperture</code> is non-zero.",
                tname: "VectorXYZ"
            }, {
                name:  "location",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "location must be a VectorXYZ.",
                desc:  "Specifies the location of the camera.",
                tname: "VectorXYZ"
            }, {
                name:  "lookAt",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "lookAt must be a VectorXYZ.",
                desc:  "Specifies the point at which the camera is aimed.",
                tname: "VectorXYZ"
            }, {
                name:  "right",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "right must be a VectorXYZ.",
                desc:  "Along with <code>up</code>, the <code>right</code> vector determines how POV-Ray calculates the aspect ratio of the image. By default, it is <code>[1.33, 0, 0]</code>. The cylindrical and orthographic cameras have different behaviors, for which see the <a href=\"http://povray.org/documentation/3.7.0/r3_4.html#r3_4_2_1_5\">POV-Ray docs</a>. It also determines the handedness of the coordinate system.",
                tname: "VectorXYZ"
            }, {
                name:  "sky",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "sky must be a VectorXYZ.",
                desc:  "Determines where \"up\" is for the camera. By default, this is [0, 1, 0].",
                tname: "VectorXYZ"
            }, {
                name:  "up",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "up must be a VectorXYZ.",
                desc:  "Along with <code>right</code>, the <code>up</code> vector determines how POV-Ray calculates the aspect ratio of the image. By default, it is <code>[0, 1, 0]</code>. The cylindrical and orthographic cameras have different behaviors, for which see the <a href=\"http://povray.org/documentation/3.7.0/r3_4.html#r3_4_2_1_5\">POV-Ray docs</a>.",
                tname: "VectorXYZ"
            }, {
                name:  "variance",
                valid: "cpov.isFloat(val)",
                err:   "variance must be a float.",
                desc:  "When <code>aperture</code> is non-zero, <code>variance</code> tells POV-Ray the value of the smallest displayable color difference. The default, 0.0078125, can produce fairly grainy images. To fix this, try a value around 0.00001.",
                tname: "float"
            }, {
                name:  "vertAngle",
                valid: "cpov.isInt(val)",
                err:   "vertAngle must be an integer.",
                desc:  "For the spherical camera, this defines the vertical angle of the viewing area while <code>angle</code> specifies the horizontal angle.",
                tname: "float"
            }
        ]
    },

    cone: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cone.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "basePoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "basePoint must be a VectorXYZ.",
                desc:  "Defines the location of the center of the cone's base end.",
                tname: "VectorXYZ"
            }, {
                name:  "baseRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "baseRadius must be a float.",
                desc:  "Defines the radius of the cone's base end.",
                tname: "float"
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ.",
                desc:  "Defines the location of the center of the cone's cap end.",
                tname: "VectorXYZ"
            }, {
                name:  "capRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "capRadius must be a float.",
                desc:  "Defines the radius of the cone's cap end. If this is non-zero, it technically ceases to be a cone and instead becomes a frustum.",
                tname: "float"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "If <code>true</code>, the base and the cap are left open, yielding a hollow cone.",
                tname: "boolean"
            }
        ],
    },

    cubic: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cubic.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 20, 20)",
                err:   "coefficients must be an array of 20 floats.",
                desc:  "An array of 20 floats that act as the coefficients of a third-order polynomial.",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    cylinder: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cylinder.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "basePoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "basePoint must be a VectorXYZ.",
                desc:  "Defines the center of the base end of the cylinder.",
                tname: "VectorXYZ"
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ.",
                desc:  "Defines the center of the cap end of the cylinder.",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "Defines the radius of the cylinder.",
                tname: "float"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "If <code>true</code>, the cap and base planes are are eliminating, yielding a hollow tube.",
                tname: "boolean"
            }, {
                name:  "strength", // only used when the cylinder is a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float",
                desc:  "Defines the field strength of the cylinder. This is only used when the cylinder is a component of a <code>Blob</code> object.",
                tname: "float"
            }
        ],
    },

    difference: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Difference.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:   "positiveComponent",
                child:  "scalar",
                req:    true,
                valid:  "cpov.inheritsFrom(val, 'Primitive')",
                err:    "positiveObject must be a Primitive.",
                desc:   "This is the single base object from which the object(s) in the <code>negativeComponents</code> array are subtracted.",
                tname:  "Primitive"
            }, {
                name:   "negativeComponents",
                child:  "array",
                req:    true,
                valid:  "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:    "negativeObjects must be an array of Primitives.",
                desc:   "This is an array of objects to subtract from the <code>positiveComponent</code>.",
                tname:  "Array"
            }
        ],
    },

    disc: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Disc.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "center",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "center must be a VectorXYZ.",
                desc:  "This is the center point of the disc.",
                tname: "VectorXYZ"
            }, {
                name:  "normal",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal must be a VectorXYZ.",
                desc:  "This defines the normal or orientation of the disc in space.",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "Defines the radius of the disc.",
                tname: "float"
            }, {
                name:  "holeRadius",
                valid: "cpov.isFloat(val)",
                err:   "holeRadius must be a float.",
                desc:  "If supplied and non-zero, defines the radius of the hole in the center of the disc.",
                tname: "float"
            }
        ],
    },

    heightField: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["HeightField.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "source",
                req:   true,
                valid: "cpov.isSDLFunction(val) || cpov.isString(val)",
                err:   "source",
                desc:  "Defines the source of the points that comprise the height field. This may be either an SDL function or the path to a graphics file.",
                tname: "SDL<br/>string"
            }, {
                name:  "hfType", // only used if source is image instead of function
                valid: "cpov.isInArray(val, cpov.hfTypes)",
                err:   "hfType must be one of " + cpov.arrayToTextList(cpov.hfTypes) + ".",
                desc:  "If <code>source</code> is a graphics file, the <code>hfType</code> attribute declares the file format, which must be one of $strlist.hfTypes.",
                tname: "string"
            }, {
                name:  "smooth",
                valid: "cpov.isBoolean(val)",
                err:   "smooth must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will manipulate the surface normals of the generated triangles to create a smoother-looking surface.",
                tname: "boolean"
            }, {
                name:  "waterLevel",
                valid: "cpov.isFloat(val) && val >= 0 && val <= 1",
                err:   "waterLevel must be a float in the unit interval (0.0 - 1.0).",
                desc:  "Defines the point below which the height field is hidden. This defaults to 0.0, which corresponds to the bottom of the height field, i.e., nothing is hidden. At the other extreme, 1.0 will cause the entire height field to be hidden. Note that this does not create a plane representing water; you'll have to do that manually.",
                tname: "float"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "If <code>false</code>, turn off the internal bounding hierarchy.",
                tname: "boolean"
            }, {
                name:  "gamma",
                valid: "cpov.isFloat(val) || val === \"sRGB\"",
                err:   "gamma must be a float.",
                desc:  "Defines the gamma value to be used in interpreting an image file. This may be either a float or the string <code>\"sRGB\"</code>.",
                tname: "float<br/>string"
            }, {
                name:  "premultiplied",
                valid: "cpov.isBoolean(val)",
                err:   "premult must be a boolean.",
                desc:  "Specifies whether the file is stored in premultiplied associated or non-premultiplied straight alpha format, overriding the file format specific default. This keyword has no effect on files without an alpha channel.",
                tname: "boolean"
            }
        ],
    },

    intersection: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Intersection.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:  "components",
                child: "scalar",
                req:   true,
                valid: "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives.",
                desc:  "An array of objects whose intersection will produce the resulting object.",
                tname: "Array"
            }
        ],
    },

    isoSurface: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["IsoSurface.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "source",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "source must be an SDL function.",
                desc:  "This is a string containing the SDL function code which defines the surface.",
                tname: "SDL"
            }, {
                name:  "containedBy",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or a Box.",
                desc:  "Defines a <code>Sphere</code> or <code>Box</code> which determines the portion of the (potentially infinite) surface that POV-Ray will render. By default, this is a <code>Box</code> with corners at <code>[1, 1, 1]</code> and <code>[-1, -1, -1]</code>.",
                tname: "Sphere<br/>Box"
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold",
                desc:  "The surface appears where the value of <code>source</code> equals this value, which defaults to 0.",
                tname: "float"
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float.",
                desc:  "Defines the amount of subdivision POV-Ray performs to find the surface, with lower values being more accurate. Defaults to 0.001.",
                tname: "float"
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float.",
                desc:  "Rendering will be faster if POV-Ray knows the maximum gradient of the <code>source</code> function. The <code>maxGradient</code> value defaults to 1.1, but if this too low, holes and other imperfections may appear, and POV-Ray will emit a warning telling you the maximum gradient it found so that you can manually update this value. Beware of raising the value beyond the actual maximum gradient, as this will slow down the render.",
                tname: "float"
            }, {
                name:  "evaluate",
                valid: "cpov.isArrayOfFloats(val, 3, 3)",
                err:   "evaluate must be an array of three floats.",
                desc:  "This is an array of three floats that optionally guides POV-Ray in dynamically adapting <code>maxGradient</code>. See the official POV-Ray documentation for <a href=\"specifies whether the file is stored in premultiplied associated or non-premultiplied straight alpha format, overriding the file format specific default. This keyword has no effect on files without an alpha channel.\">details.</a>",
                tname: "Array"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "If <code>true</cope>, the boundaries where the isosurface intersects with the <code>containedBy</code> object will be left open.",
                tname: "boolean"
            }, {
                name:  "maxTrace",
                valid: "cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections')",
                err:   "maxTrace must be either an integer or 'allIntersections'.",
                desc:  "When used as part of a CSG object, this determines the maximum number of surfaces to look for when constructing the final CSG object. By default, only the <code>containedBy</code> object is examined. For complete accuracy at the expense of speed, use the string <code>\"all_intersections\".",
                tname: "integer<br/>string"
            }
        ],
    },

    juliaFractal: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["JuliaFractal.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isInArray(val, cpov.juliaFractalTypes)",
                err:   "type must be one of " + cpov.arrayToTextList(cpov.juliaFractalTypes) + ".",
                desc:  "Specifies the type of julia fractal formula used. The legal values are: $strtable.juliaFractalTypes",
                tname: "string"
            }, {
                name:  "juliaParam",
				req:   true,
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "juliaParam must be a VectorXYZW.",
                desc:  "This is the standard julia parameter, <i>p</i>, in <i>f(h) + p</i>.",
                tname: "VectorXYZW"
            }, {
                name:  "power",
                valid: "cpov.isClass(val, 'VectorXY') || (val = cpov.convertToVector('VectorXY', val))",
                err:   "power must be a VectorXY.",
                desc:  "For the <code>hypercomplex:pwr</code> formula, this <code>VectorXY</code> contains the X and Y exponents used in the calculations. Has no effect on other formula types.",
                tname: "VectorXY"
            }, {
                name:  "maxIter",
                valid: "cpov.isInt(val)",
                err:   "maxIter must be an integer.",
                desc:  "Determines the number of iterations used to find the surface of the fractal, with higher values being more accurate but slower to render. The default is 20.",
                tname: "integer"
            }, {
                name:  "precision",
                valid: "cpov.isInt(val)",
                err:   "precision must be an integer.",
                desc:  "Determines the accuracy of the calculations for finding the surface of the julia set. The default is 20. Higher values result in greater accuracy but longer rendering times.",
                tname: "integer"
            }, {
                name:  "slice",
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "slice must be a VectorXYZW.",
                desc:  "Specifies the 3D slice through 4D space used to view the fractal.",
                tname: "VectorXYZW"
            }, {
                name:  "distance",
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float.",
                desc:  "Specifies the distance of the <code>slice</code> from the origin.",
                tname: "float"
            }
        ],
    },

    lathe: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Lathe.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.splineTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.splineTypes) + ".",
                desc:  "Determines the type of spline used to define the profile. Legal types are $strlist.",
                tname: "string"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity)",
                err:   "points must be an array of two or more VectorXY.",
                desc:  "An array of points defining the spline.",
                tname: "VectorXY"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    lightSource: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["LightSource.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "location",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "location must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "color",
                req:   true,
                valid: "cpov.isClass(val, 'Color') || (val = cpov.convertToVector('Color', val))",
                err:   "color must be a Color.",
                desc:  "TODO",
                tname: "Color"
            }, {
                name:  "adaptive",
                valid: "cpov.isFloat(val) && val >= 0",
                err:   "adaptive must be a float greater than or equal to zero.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "areaIllumination",
                valid: "cpov.isBoolean(val)",
                err:   "areaIllumination must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "areaLight",
                valid: "cpov.isBoolean(val)",
                err:   "areaLight must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "axis1",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "axis1 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "axis2",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "axis2 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "circular",
                valid: "cpov.isBoolean(val)",
                err:   "circular must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "fadeDistance",
                valid: "cpov.isFloat(val) && val > 0.",
                err:   "fadeDistance must be a float greater than zero.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "fadePower",
                valid: "cpov.isFloat(val)",
                err:   "fadePower must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "falloff",
                valid: "cpov.isFloat(val) && val < 90.",
                err:   "falloff must be a float less than 90.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "jitter",
                valid: "cpov.isBoolean(val)",
                err:   "jitter must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "looksLike", // TODO
                child: "scalar",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "looksLike must be a Primitive.",
                desc:  "TODO",
                tname: "Primitive"
            }, {
                name:  "mediaAttenuation", // TODO
                valid: "cpov.isBoolean(val)",
                err:   "mediaAttenuation must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "mediaInteraction", // TODO
                valid: "cpov.isBoolean(val)",
                err:   "mediaInteraction must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "orient",
                valid: "cpov.isBoolean(val)",
                err:   "orient must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "parallel",
                valid: "cpov.isBoolean(val)",
                err:   "parallel must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "pointAt",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "pointAt must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "projectedThrough",
                child: "scalar",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "projectedThrough",
                desc:  "TODO",
                tname: "Primitive"
            }, {
                name:  "radius",
                valid: "cpov.isFloat(val) && val < 90",
                err:   "radius must be a float less than 90.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "shadowless",
                valid: "cpov.isBoolean(val)",
                err:   "shadowless must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "size1",
                valid: "cpov.isFloat(val) && val > 0",
                err:   "size1 must be a float greater than zero.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "size2",
                valid: "cpov.isFloat(val) && val > 0",
                err:   "size2 must be a float greater than zero.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "tightness",
                valid: "cpov.isFloat(val) && val >= 0 && val <= 100",
                err:   "tightness must be a float in the range (0 - 100).",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "type",
                valid: "cpov.isString(val) && (val == 'spotlight' || val == 'cylinder')",
                err:   "type must be either 'spotlight' or 'cylinder'.",
                desc:  "TODO",
                tname: "string"
            }
        ],
    },

    merge: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Merge.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:   "components",
                child:  "array",
                req:    true,
                valid:  "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:    "objects must be an array of Primitives.",
                desc:   "An array of objects to merge.",
                tname:  "Array"
            }
        ],
    },

    mesh: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Mesh.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "triangles",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Triangle', 1, Infinity)",
                err:   "triangles",
                desc:  "The array of <code>Triangle</code>s comprising the mesh.",
                tname: "Array"
            }, {
                name:  "insideVector",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "insideVector must be a VectorXYZ.",
                desc:  "For the <code>Mesh</code> to be solid, it must be completely closed and have a defined <code>insideVector</code>.",
                tname: "VectorXYZ"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "If <code>false</code>, turn off the internal bounding hierarchy.",
                tname: "boolean"
            }
        ],
    },

/*

// Deferred pending further research

    mesh2: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [ ],

    },
*/

    ovus: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Ovus.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "bottomRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "bottomRadius must be a float.",
                desc:  "Sets the radius of the bottom sphere.",
                tname: "float"
            }, {
                name:  "topRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "topRadius must be a float.",
                desc:  "Sets the radius of the top sphere.",
                tname: "float"
            }
        ],

    },

    parametric: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Parametric.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "funcX",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcX must be an SDL function.",
                desc:  "Determines the X coordinate of the surface.",
                tname: "SDL"
            }, {
                name:  "funcY",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcY must be an SDL function.",
                desc:  "Determines the Y coordinate of the surface.",
                tname: "SDL"
            }, {
                name:  "funcZ",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcZ must be an SDL function.",
                desc:  "Determines the Z coordinate of the surface.",
                tname: "SDL"
            }, {
                name:  "uv1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv1 must be a VectorUV.",
                desc:  "Specifies one corner of the UV plane to which the surface is mapped.",
                tname: "VectorUV"
            }, {
                name:  "uv2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv2 must be a VectorUV.",
                desc:  "Specifies the other corner of the UV plane to which the surface is mapped.",
                tname: "VectorUV"
            }, {
                name:  "containedBy",
                child: "scalar",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or Box.",
                desc:  "Defines a <code>Sphere</code> or <code>Box</code> which determines the portion of the (potentially infinite) surface that POV-Ray will render. By default, this is a <code>Box</code> with corners at <code>[1, 1, 1]</code> and <code>[-1, -1, -1]</code>.",
                tname: "Sphere<br/>Box"
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float.",
                desc:  "Rendering will be faster if POV-Ray knows the maximum gradient of the surface functions. The <code>maxGradient</code> value defaults to 1.1, but if this too low, holes and other imperfections may appear, and POV-Ray will emit a warning telling you the maximum gradient it found so that you can manually update this value. Beware of raising the value beyond the actual maximum gradient, as this will slow down the render.",
                tname: "float"
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float.",
                desc:  "Defines the amount of subdivision POV-Ray performs to find the surface, with lower values being more accurate. Defaults to 0.001.",
                tname: "float"
            }, {
                name:  "precomputeDepth",
                valid: "cpov.isInt(val)",
                err:   "precomputeDepth must be an integer.",
                desc:  "If defined, <code>precomputeDepth</code> can speed up rendering at the expense of memory. The maximum value is 20. At least one of <code>precomputeX</code>, <code>precomputeY</code>, or <code>precomputeZ</code> must be <code>true</code>.",
                tname: "integer"
            }, {
                name:  "precomputeX",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeX must be a boolean.",
                desc:  "Enables precalculation of the X coordinate during subdivision of parametric surfaces. <code>precomputeDepth</code> must also be defined.",
                tname: "boolean"
            }, {
                name:  "precomputeY",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeY must be a boolean.",
                desc:  "Enables precalculation of the Y coordinate during subdivision of parametric surfaces. <code>precomputeDepth</code> must also be defined.",
                tname: "boolean"
            }, {
                name:  "precomputeZ",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeZ must be a boolean.",
                desc:  "Enables precalculation of the Z coordinate during subdivision of parametric surfaces. <code>precomputeDepth</code> must also be defined.",
                tname: "boolean"
            }
        ],
    },

    plane: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Plane.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "normal",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal must be a VectorXYZ.",
                desc:  "Defines the surface normal of the plane, i.e., a vector that points up perpendicularly from the surface of the plane.",
                tname: "VectorXYZ"
            }, {
                name:  "distance",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float.",
                desc:  "Specifies the distance the plane lies from the origin along the <code>normal</code> vector. This is multiplied by the normal, so if <code>distance</code> is 2 and <code>normal</code> is <code>[0, 2, 0]</code>, the plane will lie 4 units from the origin.",
                tname: "float"
            }
        ],

    },

    poly: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Poly.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "order",
                req:   true,
                valid: "cpov.isInt(val) && val >= 2 && val <= 35",
                err:   "order must be an integer in the range (2 - 35).",
                desc:  "Specifies the order of the polynomial. Must be in the range 2 to 35.",
                tname: "integer"
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 1, Infinity)",
                err:   "coefficients must be an array of floats.",
                desc:  "An array defining the coefficients of the polynomial. The number of coefficients required is equal to ((<code>order</code> + 1) * (<code>order</code> + 2) * (<code>order</code> + 3)) / 6.",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    polygon: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Polygon.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 3, Infinity)",
                err:   "points must be an array of three or more VectorXY.",
                desc:  "This is an array of at least three <code>VectorXY</code> objects defining the vertices of the polygon.",
                tname: "Array"
            }
        ],

    },

    polynomial: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Polynomial.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "order",
                req:   true,
                valid: "cpov.isInt(val)",
                err:   "order must be an integer.",
                desc:  "Specifies the order of the polynomial. Must be in the range 2 to 35.",
                tname: "integer"
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXYZW', 1, Infinity)",
                err:   "coefficients must be a VectorXYZW.",
                desc:  "An array of <code>VectorXYZW</code> defining the coefficients of the polynomial. The choice of <code>VectorXYZW</code> is a bit of a convenience hack as it doesn't encode a 4D cartesian point. Instead, the X, Y, and Z values specify the corresponding powers of the coefficient and W specifies the value. The members of the array can be specified in any order.",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    prism: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Prism.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.prismTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.prismTypes) + ".",
                desc:  "Specifies the spline type used for the prism. The legal values are $strlist.prismTypes.",
                tname: "string"
            }, {
                name:  "height1",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height1 must be a float.",
                desc:  "Specifies the Y coordinate of the top of the prism.",
                tname: "float"
            }, {
                name:  "height2",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height2 must be a float",
                desc:  "Specifies the Y coordinate of the bottom of the prism.",
                tname: "float"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity)",
                err:   "points must be an array of VectorXY.",
                desc:  "The array of spline points to be swept along the Y axis. This can specify multiple sub-shapes: to close a shape, simply repeat the first coordinate.",
                tname: "Array"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "If <code>true</code>, the top and bottom of the prism are left open.",
                tname: "boolean"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    quadric: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Quadric.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 10, 10)",
                err:   "coefficients must be an array of 10 floats.",
                desc:  "An array of 10 floats defining the coefficients of a second-order polynomial.",
                tname: "Array"
            }
        ],

    },

    quartic: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Quartic.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 35, 35)",
                err:   "coefficients must be an array of 35 floats.",
                desc:  "An array of floats defining the coefficients of a fourth-order polynomial.",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    sphere: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Sphere.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "center",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "center must be a VectorXYZ.",
                desc:  "Defines the center point of the sphere.",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "Specifies the radius of the sphere.",
                tname: "float"
            }, {
                name:  "strength",    // only used when used as a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float.",
                desc:  "If and only if the <code>Sphere</code> is being used as a blob component, <code>strength</code> is a float defining its field strength.",
                tname: "float"
            }
        ],
    },

    sphereSweep: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["SphereSweep.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.internalSplineTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.internalSplineTypes) + ".",
                desc:  "Sets the spline type to be used for the sweep. The legal values are $strlist.internalSplineTypes.",
                tname: "string"
            }, {
                name:  "spheres",
                child: "array",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Sphere', 2, Infinity)",
                err:   "spheres must be an an array of two or more Sphere.",
                desc:  "The array of <code>Sphere</code>s whose positions are interpolated to create the sweep.",
                tname: "Array"
            }, {
                name:  "tolerance",
                valid: "cpov.isFloat(val)",
                err:   "tolerance must be a float.",
                desc:  "Defines the depth tolerance used for intersection calculations. The default value, 0.000001, should be adequate in most cases. If imperfections appear on the surface of the sweep, try increasing it to 0.0001.",
                tname: "float"
            }
        ],
    },

    superellipsoid: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Superellipsoid.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "e",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "e must be a float.",
                desc:  "Defines the so-called <em>east-west</em> exponent.",
                tname: "float"
            },
			{
                name:  "n",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "n must be a float.",
                desc:  "Defines the so-called <em>north-south</em> exponent.",
                tname: "float"
            }
        ],

    },

    sor: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Sor.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity)",
                err:   "points must be an array of two or more VectorXY.",
                desc:  "An array of at least two points which define the open curve used to generate the surface.",
                tname: "VectorXY"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "If <code>true</code>, the base and the cap are left open, yielding a hollow surface of revolution.",
                tname: "boolean"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "boolean"
            }
        ],
    },

    text: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Text.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
			{
				name:  "fontType",
				req:   true,
				valid: "cpov.isKey(val, cpov.fontTypes)",
				err:   "fontType must be one of " + cpov.keysToTextList(cpov.fontTypes) + ".",
                desc:  "Specifies the file format of the font being used. Legal values are $strlist.fontTypes.",
                tname: "string"
            }, {
                name:  "font",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "font must be a non-empty string.",
                desc:  "The filename of the font.",
                tname: "string"
            }, {
                name:  "displayText",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "displayText must be a non-empty string.",
                desc:  "This contains the text to be rendered.",
                tname: "string"
            }, {
                name:  "thickness",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "thickness must be a float.",
                desc:  "Specifies the front-to-back thickness of the extruded character shapes.",
                tname: "float"
            }, {
                name:  "offset",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "offset must be a float.",
                desc:  "If defined, specifies extra space to be placed between characters.",
                tname: "float"
            }
        ],

    },

    torus: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Torus.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "majorRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "majorRadius must be a float.",
                desc:  "Defines the major radius of the torus, which is the circle along which the perpendicular circle defined by <code>minorRadius</code> is swept.",
                tname: "float"
            }, {
                name:  "minorRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "minorRadius must be a float.",
                desc:  "Defines the minor radius of the torus, which is the radius of its cross section.",
                tname: "float"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "If <code>true</code>, POV-Ray will use the slower but more accurate Sturmian root solver. Use this if the surface exhibits holes or other imperfections.",
                tname: "float"
            }
        ],
    },

    triangle: {               // combines triangle and smooth_triangle
        superclass: "Primitive",
        desc: "The Triangle class combines POV-Ray's triangle and smooth_triangle "
            + "based on the supplied parameters and the smooth flag.",
        conArgs: false,
        conBlock: false,
        snippets: ["Triangle.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "corner1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner1 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "corner2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner2 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "corner3",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner3 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "smooth", // if smooth and normal1...3 are defined, it's a smooth triangle
                valid: "cpov.isBoolean(val)",
                err:   "smooth must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "normal1",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal1 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "normal2",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal2 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "normal3",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal3 must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "textures",
                valid: "cpov.isArrayOfInt(val)",
                err:   "textures must be an array of integers.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }
        ],
    },

    union: {
        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Union.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:   "components",
                child:  "scalar",
                req:    true,
                valid:  "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:    "objects must be an array of Primitives.",
                desc:   "This is the array of objects to be combined by the CSG <code>Union</code>.",
                tname:  "Array"
            }, {
                name:  "splitUnion",
                valid: "cpov.isBoolean(val)",
                err:   "splitUnion must be a boolean.",
                desc:  "If the composite object lacks holes, setting <code>splitUnion</code> to <code>false</code> can speed up rendering. Defaults to <code>true</code>.",
                tname: "boolean"
            }
        ]
    },

};
