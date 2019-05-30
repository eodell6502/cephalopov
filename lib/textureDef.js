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

    Finish: {
        desc: false,
        conArgs: false,
        conBlock: false, // TODO
        snippets: [ ],   // TODO
        mutable: [
            {
                name:  "identifier",
                req:   false,
                valid: "cpov.isNonEmptyString(val)",
                err:   "identifier must be a non-empty string.",
                desc:  "An optional string which references an existing SDL declaration.",
                tname: "string",
            }, {
                name:  "ambient",
                req:   false,
                valid: "cpov.isClassInstance(val, 'Color')",
                err:   "ambient must be a Color.",
                desc:  "A <code>Color</code> object which controls the amount of ambient light used for the associated object.",
                tname: "Color",
            }, {
                name:  "diffuse",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "diffuse must be a float.",
                desc:  "Specifies the amount of direct light that is reflected via diffuse reflection",
                tname: "float",
            }, {
                name:  "diffuseAlbedo",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "diffuseAlbedo must be a boolean.",
                desc:  "When <code>diffuse</code> is specified, setting <code>boolean</code> to true causes <code>diffuse</code> to be interpreted as total diffuse/specular reflectance instead of peak reflectance.",
                tname: "boolean",
            }, {
                name:  "diffuseBack",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "diffuseBack must be a float.",
                desc:  "When <code>diffuse</code> is specified, <code>diffuseBack</code> specifies backside reflectance. For realistic results, the sum of both parameters should be between 0.0 and 1.0, and <code>diffuseBack</code> should be the smaller of the two.",
                tname: "float",
            }, {
                name:  "brilliance",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "brilliance must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "emission",
                req:   false,
                valid: "cpov.isClassInstance(val, 'Color')",
                err:   "emission must be a Color.",
                desc:  "Works much the same as <code>ambient</code> but in radiosity scenes where <code>ambient</code> is turned off.",
                tname: "Color",
            }, {
                name:  "crand",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "crand must be a float.",
                desc:  "Creates a grain effect similar to sand or concrete. Not suitable for animations.",
                tname: "float",
            }, {
                name:  "subsurface",
                req:   false,
                valid: "cpov.isClassInstance(val, 'Color')",
                err:   "subsurface must be a Color.",
                desc:  "Sets the translucency color for subsurface transport. In order for this to work, <code>cpov.globalSettings.subsurface</code> must be <code>true</code>.",
                tname: "Color",
            }, {
                name:  "phong",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "phong must be a float.",
                desc:  "Determines the amount of Phong highlighting. Defaults to 40.",
                tname: "float",
            }, {
                name:  "phongAlbedo",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "phongAlbedo must be a boolean",
                desc:  "If <code>true</code>, causes <code>phong</code> to be interpreted as total diffuse/specular reflectance instead of peak reflectance.",
                tname: "boolean",
            }, {
                name:  "phongSize",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "phongSize must be a float.",
                desc:  "Determines the size of the Phong highlight spot. Larger values are smaller and tighter; smaller values are larger and more diffuse.",
                tname: "float",
            }, {
                name:  "specular",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "specular must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "specularAlbedo",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "specularAlbedo must be a boolean.",
                desc:  "If <code>true</code>, causes <code>specular</code> to be interpreted as total diffuse/specular reflectance instead of peak reflectance.",
                tname: "boolean",
            }, {
                name:  "specularRoughness",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "specularRoughness must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "metallic",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "metallic must be a boolean.",
                desc:  "TODO",
                tname: "boolean",
            }, {
                name:  "reflectMin",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectMin must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "reflectMax",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectMax must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "reflectFresnel",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "reflectFresnel must be a float.",
                desc:  "TODO",
                tname: "boolean",
            }, {
                name:  "reflectFalloff",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectFalloff must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "reflectExponent",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectExponent must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "reflectMetallic",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectMetallic must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "conserveEnergy",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "conserveEnergy must be a boolean.",
                desc:  "TODO",
                tname: "boolean",
            }, {
                name:  "iridescence",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "iridescence must be a float.",
                desc:  "TODO",
                tname: "float",
            }, {
                name:  "iridTurbulence",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "iridTurbulence must be a float.",
                desc:  "TODO",
                tname: "float",
            },
        ],
    }

};


