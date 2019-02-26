/*

Copyright 2018-2019 Eric O'Dell and subsequent contributors

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

module.exports = {

    VectorXY: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXY.conBlock",
        snippets: ["VectorXY.copy", "VectorXY.toSDL", "Primitive.requiredParameterTest", "Primitive.xset", "VectorXY.asArray"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float or a function returning a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float or a function returning a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorUV: {
        desc: false,
        conArgs: false,
        conBlock: "VectorUV.conBlock",
        snippets: ["VectorUV.copy", "VectorUV.toSDL", "Primitive.requiredParameterTest", "Primitive.xset", "VectorUV.asArray"],
        mutable: [
            {
                name:  "u",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "u must be a float or a function returning a float.",
                desc:  "The U coordinate of the vector.",
                tname: "float"
            }, {
                name:  "v",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "v must be a float or a function returning a float.",
                desc:  "The V coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorXYZ: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZ.conBlock",
        snippets: ["VectorXYZ.copy", "VectorXYZ.toSDL", "Primitive.requiredParameterTest", "Primitive.xset", "VectorXYZ.asArray"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float or a function returning a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float or a function returning a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float or a function returning a float.",
                desc:  "The Z coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    VectorXYZW: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZW.conBlock",
        snippets: ["VectorXYZW.copy", "VectorXYZW.toSDL", "Primitive.requiredParameterTest", "Primitive.xset", "VectorXYZW.asArray"],
        mutable: [
            {
                name:  "x",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "x must be a float or a function returning a float.",
                desc:  "The X coordinate of the vector.",
                tname: "float"
            }, {
                name:  "y",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "y must be a float or a function returning a float.",
                desc:  "The Y coordinate of the vector.",
                tname: "float"
            }, {
                name:  "z",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "z must be a float or a function returning a float.",
                desc:  "The Z coordinate of the vector.",
                tname: "float"
            }, {
                name:  "w",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "w must be a float or a function returning a float.",
                desc:  "The W coordinate of the vector.",
                tname: "float"
            },
        ],
    },

    Color: {
        desc: false,
        conArgs: false,
        conBlock: "Color.conBlock",
        snippets: ["Color.copy", "Color.toSDL", "Color.toPlainRGBVector", "Primitive.requiredParameterTest", "Primitive.xset"],
        mutable: [
            {
                name:  "r",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "r must be a float or a function returning a float.",
                desc:  "The red component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "g",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "g must be a float or a function returning a float.",
                desc:  "The green component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "b",
                req:   true,
                valid: "cpov.isFloat(val)",
                desc:  "b must be a float or a function returning a float",
                desc:  "The blue component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "f",
                valid: "cpov.isFloat(val)",
                err:   "f must be a float or a function returning a float.",
                desc:  "The filter component of the color, in the unit interval (0.0-1.0).",
                tname: "float"
            }, {
                name:  "t",
                valid: "cpov.isFloat(val)",
                err:   "t must be a float or a function returning a float.",
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
