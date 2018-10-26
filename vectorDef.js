module.exports = {
    VectorXY: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXY.conBlock",
        snippets: ["VectorXY.copy", "VectorXY.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            },
        ],
    },
    VectorUV: {
        desc: false,
        conArgs: false,
        conBlock: "VectorUV.conBlock",
        snippets: ["VectorUV.copy", "VectorUV.toSDL"],
        mutable: [
            {
                name:  "u",
                valid: "cpov.isFloat(val)",
                err:   "u must be a float."
            }, {
                name:  "v",
                valid: "cpov.isFloat(val)",
                err:   "v must be a float."
            },
        ],
    },
    VectorXYZ: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZ.conBlock",
        snippets: ["VectorXYZ.copy", "VectorXYZ.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
            },
        ],
    },
    VectorXYZW: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZW.conBlock",
        snippets: ["VectorXYZW.copy", "VectorXYZW.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
            }, {
                name:  "w",
                valid: "cpov.isFloat(val)",
                err:   "w must be a float."
            },
        ],
    },
    Color: {
        desc: false,
        conArgs: false,
        conBlock: "Color.conBlock",
        snippets: ["Color.copy", "Color.toSDL", "Color.toPlainRGBVector"],
        mutable: [
            {
                name:  "r",
                valid: "cpov.isFloat(val)",
                err:   "r must be a float."
            }, {
                name:  "g",
                valid: "cpov.isFloat(val)",
                err:   "g must be a float."
            }, {
                name:  "b",
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
