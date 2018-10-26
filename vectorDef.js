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
                err:   "x must be a float."
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
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
                err:   "u must be a float."
            }, {
                name:  "v",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "v must be a float."
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
                err:   "x must be a float."
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
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
                err:   "x must be a float."
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
            }, {
                name:  "w",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "w must be a float."
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
                err:   "r must be a float."
            }, {
                name:  "g",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "g must be a float."
            }, {
                name:  "b",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "b must be a float."
            }, {
                name:  "f",
                valid: "cpov.isFloat(val)",
                err:   "f must be a float."
            }, {
                name:  "t",
                valid: "cpov.isFloat(val)",
                err:   "t must be a float."
            }, {
                name:  "srgb",
                valid: "cpov.isBoolean(val)",
                err:   "srgb must be a boolean."
            },
        ],
    },

}
