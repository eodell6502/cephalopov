module.exports = {

    VectorXY: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXY.conBlock",
        snippets: ["VectorXY.copy", "VectorXY.toSDL", "Primitive.requiredParameterTest"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorUV: {
        desc: false,
        conArgs: false,
        conBlock: "VectorUV.conBlock",
        snippets: ["VectorUV.copy", "VectorUV.toSDL", "Primitive.requiredParameterTest"],
        mutable: [
            {
                name:  "u",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "u must be a float.",
                desc:  "The U coordinate of the vector.",
                tname: "float"
            }, {
                name:  "v",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "v must be a float.",
                desc:  "The V coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorXYZ: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZ.conBlock",
        snippets: ["VectorXYZ.copy", "VectorXYZ.toSDL", "Primitive.requiredParameterTest"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float.",
                desc:  "The Z coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorXYZW: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZW.conBlock",
        snippets: ["VectorXYZW.copy", "VectorXYZW.toSDL", "Primitive.requiredParameterTest"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float.",
                desc:  "The Z coordinate of the vector.",
                tname: "float"
            }, {
                name:  "w",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "w must be a float.",
                desc:  "The W coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    Color: {
        desc: false,
        conArgs: false,
        conBlock: "Color.conBlock",
        snippets: ["Color.copy", "Color.toSDL", "Color.toPlainRGBVector", "Primitive.requiredParameterTest"],
        mutable: [
            {
                name:  "r",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "r must be a float.",
                desc:  "The red component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "g",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "g must be a float.",
                desc:  "The green component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "b",
                req:   true,
                valid: "cpov.isFloat(val)",
                desc:  "The blue component of the color, in the unit interval (0.0-1.0).",
                desc:  "TODO",
                tname: "float"
            }, {
                name:  "f",
                valid: "cpov.isFloat(val)",
                err:   "f must be a float.",
                desc:  "The filter component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "t",
                valid: "cpov.isFloat(val)",
                err:   "t must be a float.",
                desc:  "The transmit component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "srgb",
                valid: "cpov.isBoolean(val)",
                err:   "srgb must be a boolean.",
                desc:  "If <code>true</code>, specifies sRGB gamma values. This will produce an error when POV-Ray parses CephaloPOV's output if <code>cpov.globalSettings.assumedGamma</code> is not set.",
                tname: "float"
            },
        ],
    },

}
