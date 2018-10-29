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
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16)",
                err:   "points must be an array of 16 VectorXYZ.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "uSteps",
                valid: "cpov.isInt(val)",
                err:   "uSteps must be an integer.",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "vSteps",
                valid: "cpov.isInt(val)",
                err:   "vSteps must be an integer.",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "flatness",
                valid: "cpov.isFloat(val)",
                err:   "flatness must be a float.",
                desc:  "TODO",
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
                name:  "components",
                req:   true,
                child: "array",
                valid: "cpov.isClass(val, ['Sphere', 'Cylinder']) && val.length",
                err:   "components must be an array of Spheres and/or Cylinders.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "TODO",
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
                valid: "cpov.isInArray(val, ['perspective', 'orthographic', 'fisheye', 'ultra_wide_angle', 'omnimax', 'panoramic', 'spherical', 'cylinder', 'mesh_camera'])", // TODO: CamelCased versions
                err:   "type must be one of perspective, orthographic, fisheye, ultra_wide_angle, omnimax, panoramic, spherical, cylinder, or mesh_camera.",
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "angle", //        type: "FIXME" }, // TODO
                valid: "true",
                err:   "angle",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "apertureSize",
                valid: "cpov.isFloat(val)",
                err:   "apertureSize must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "blurSamples",
                valid: "cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0",
                err:   "blurSamples must be an array of two floats greater than or equal to zero.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "bokeh",
                valid: "cpov.isClass(val, 'Color') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0",
                err:   "bokeh must be a Color in the range <0, 0, 0> to <1, 1, 0>.",
                desc:  "TODO",
                tname: "Color"
            }, {
                name:  "confidence",
                valid: "cpov.isFloat(val)",
                err:   "confidence must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "cylinderType",
                valid: "cpov.isInt(val) && val > 0 && val < 5",
                err:   "cylinderType must be an integer in the range (1 - 4).",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "direction",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "direction must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "focalPoint",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "focalPoint must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "location",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "location must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "lookAt",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "lookAt must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "right",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "right must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "sky",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "sky must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "up",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "up must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "variance",
                valid: "cpov.isFloat(val)",
                err:   "variance must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "vertAngle",
                valid: "cpov.isInt(val)",
                err:   "vertAngle must be an integer.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "baseRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "baseRadius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "capRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "capRadius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "strength", // only used when the cylinder is a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float",
                desc:  "TODO",
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
                name:  "positiveComponent",
                child: "scalar",
                req:   true,
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "positiveObject must be a Primitive.",
                desc:  "TODO",
                tname: "Primitive"
            }, {
                name:  "negativeComponents",
                child: "array",
                req:   true,
                valid: "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:   "negativeObjects must be an array of Primitives.",
                desc:  "TODO",
                tname: "Array"
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
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "normal",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "holeRadius",
                valid: "cpov.isFloat(val)",
                err:   "holeRadius must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "SDL<br/>string"
            }, {
                name:  "hfType", // only used if source is image instead of function
                valid: "cpov.isInArray(val, cpov.hfTypes)",
                err:   "hfType must be one of " + cpov.arrayToTextList(cpov.hfTypes) + ".",
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "smooth",
                valid: "cpov.isBoolean(val)",
                err:   "smooth must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "waterLevel",
                valid: "cpov.isFloat(val)",
                err:   "waterLevel must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "gamma",
                valid: "cpov.isFloat(val)",
                err:   "gamma must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "premult",
                valid: "cpov.isBoolean(val)",
                err:   "premult must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "SDL"
            }, {
                name:  "containedBy",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or a Box.",
                desc:  "TODO",
                tname: "Sphere<br/>Box"
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "evaluate",
                valid: "cpov.isArrayOfFloats(val, 3, 3)",
                err:   "evaluate must be an array of three floats.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "maxTrace",
                valid: "cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections')",
                err:   "maxTrace must be either an integer or 'allIntersections'.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "juliaParam",
				req:   true,
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "juliaParam must be a VectorXYZW.",
                desc:  "TODO",
                tname: "VectorXYZW"
            }, {
                name:  "power",
                valid: "cpov.isClass(val, 'VectorXY') || (val = cpov.convertToVector('VectorXY', val))",
                err:   "power must be a VectorXY.",
                desc:  "TODO",
                tname: "VectorXY"
            }, {
                name:  "maxIter",
                valid: "cpov.isInt(val)",
                err:   "maxIter must be an integer.",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "precision",
                valid: "cpov.isInt(val)",
                err:   "precision must be an integer.",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "slice",
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "slice must be a VectorXYZW.",
                desc:  "TODO",
                tname: "VectorXYZW"
            }, {
                name:  "distance",
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity)",
                err:   "points must be an array of two or more VectorXY.",
                desc:  "TODO",
                tname: "VectorXY"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                name:  "components",
                child: "array",
                req:   true,
                valid: "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives.",
                desc:  "TODO",
                tname: "Array"
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
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "insideVector",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "insideVector must be a VectorXYZ.",
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "float"
        }, {
            name:  "topRadius",
            req:   true,
            valid: "cpov.isFloat(val)",
            err:   "topRadius must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "SDL"
            }, {
                name:  "funcY",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcY must be an SDL function.",
                desc:  "TODO",
                tname: "SDL"
            }, {
                name:  "funcZ",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcZ must be an SDL function.",
                desc:  "TODO",
                tname: "SDL"
            }, {
                name:  "uv1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv1 must be a VectorUV.",
                desc:  "TODO",
                tname: "VectorUV"
            }, {
                name:  "uv2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv2 must be a VectorUV.",
                desc:  "TODO",
                tname: "VectorUV"
            }, {
                name:  "containedBy",
                child: "scalar",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or Box.",
                desc:  "TODO",
                tname: "Sphere<br/>Box"
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "precomputeDepth",
                valid: "cpov.isInt(val)",
                err:   "precomputeDepth must be an integer.",
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "precomputeX",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeX must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "precomputeY",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeY must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "precomputeZ",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeZ must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "distance",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 1, Infinity)",
                err:   "coefficients must be an array of floats.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "integer"
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXYZW', 1, Infinity)",
                err:   "coefficients must be a VectorXYZW.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "height1",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height1 must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "height2",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height2 must be a float",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity)",
                err:   "points must be an array of VectorXY.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "VectorXYZ"
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "strength",    // only used when used as a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "spheres",
                child: "array",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Sphere', 2, Infinity)",
                err:   "spheres must be an an array of two or more Sphere.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "tolerance",
                valid: "cpov.isFloat(val)",
                err:   "tolerance must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "float"
            },
			{
                name:  "n",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "n must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "VectorXY"
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "font",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "font must be a non-empty string.",
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "displayText",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "displayText must be a non-empty string.",
                desc:  "TODO",
                tname: "string"
            }, {
                name:  "thickness",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "thickness must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "offset",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "offset must be a float.",
                desc:  "TODO",
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
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "minorRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "minorRadius must be a float.",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean.",
                desc:  "TODO",
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
                name:  "components",
                child: "scalar",
                req:   true,
                valid: "cpov.isArrayOfBaseClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives.",
                desc:  "TODO",
                tname: "Array"
            }, {
                name:  "splitUnion",
                valid: "cpov.isBoolean(val)",
                err:   "splitUnion must be a boolean.",
                desc:  "TODO",
                tname: "boolean"
            }
        ]
    },

};
