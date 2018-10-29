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
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "TODO",
                tname: "TODO"
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
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "v",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "v must be a float.",
                desc:  "TODO",
                tname: "TODO"
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
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float.",
                desc:  "TODO",
                tname: "TODO"
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
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "w",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "w must be a float.",
                desc:  "TODO",
                tname: "TODO"
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
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "g",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "g must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "b",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "b must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "f",
                valid: "cpov.isFloat(val)",
                err:   "f must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "t",
                valid: "cpov.isFloat(val)",
                err:   "t must be a float.",
                desc:  "TODO",
                tname: "TODO"
            }, {
                name:  "srgb",
                valid: "cpov.isBoolean(val)",
                err:   "srgb must be a boolean.",
                desc:  "TODO",
                tname: "TODO"
            },
        ],
    },

}
