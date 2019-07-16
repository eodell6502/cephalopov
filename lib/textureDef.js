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
        snippets: ["Finish.toSDL" ],
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
                desc:  "Controls the rate at which reflected light falls off by angle of incidence. Default is <code>1.0</code>.",
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
                desc:  "Enables specular reflection, where <code>1.0</code> produces complete saturation to the light's color in the center of the highlight. Default is <code>0.0</code>, and typical values fall in the interval <code>0.0 - 1.0</code>.",
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
                valid: "cpov.isFloat(val) && val != 0",
                err:   "specularRoughness must be a non-zero float.",
                desc:  "Determines the size of the specular highlight where values close to zero are smooth with small highlights and values close to <code>1.0</code> are rough with large highlights. The default is <code>0.05</code>. Must be non-zero, and values extremely close to zero may produce errors.",
                tname: "float",
            }, {
                name:  "metallic",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "metallic must be a float.",
                desc:  "Specifies the amount by which specular reflections are filtered by the color of the reflecting surface. Values are in the unit interval <code>0.0 - 1.0</code>.",
                tname: "float",
            }, {
                name:  "reflectMin",
                req:   false,
                valid: "cpov.isClassInstance(val, 'Color')",
                err:   "reflectMin must be a float.",
                desc:  "When supplied with <code>reflectMax</code>, sets the reflectivity for a ray parallel to the surface and causes reflectivity to vary by angle of incidence.",
                tname: "float",
            }, {
                name:  "reflectMax",
                req:   false,
                valid: "cpov.isClassInstance(val, 'Color')",
                err:   "reflectMax must be a Color.",
                desc:  "Enables specular reflection and sets the supplied color as a filter for reflected light. When used in conjunction with <code>ReflectMin</code> for variable reflectivity, it specifies the amount of reflected light for a ray perpendicular to the surface normal.",
                tname: "float",
            }, {
                name:  "reflectFresnel",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "When <code>true</code>, <code>reflectFresnel</code> causes the Fresnel reflectivity function to be used instead of standard reflection. This requires the interior index of reflection to be specified.",
                desc:  "TODO",
                tname: "boolean",
            }, {
                name:  "reflectFalloff",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectFalloff must be a float.",
                desc:  "Specifies the exponent determining how quickly reflectivity falls off.",
                tname: "float",
            }, {
                name:  "reflectExponent",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectExponent must be a float",
                desc:  "Adjusts relative brightness of reflections. Default is <code>1.0</code>.",
                tname: "float",
            }, {
                name:  "reflectMetallic",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "reflectMetallic must be a float",
                desc:  "Specifies the degree to which the surface color filters reflected light. Should be in the unit interval <code>0.0 - 1.0</code>.",
                tname: "float",
            }, {
                name:  "conserveEnergy",
                req:   false,
                valid: "cpov.isBoolean(val)",
                err:   "conserveEnergy must be a boolean.",
                desc:  "If <code>true</code>, calculates reflection in accordance with the law of conservation of energy, so light reflected is deducted from light transmitted.",
                tname: "boolean",
            }, {
                name:  "iridescence",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "iridescence must be a float.",
                desc:  "A float in the unit interval, <code>iridescence</code> specifies the amount that the thin film interference effect contributes to overall surface color. A good starting value is <code>0.25</code>.",
                tname: "float",
            }, {
                name:  "iridThickness",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "iridThickness must be a float.",
                desc:  "In effect, <code>iridThickness</code> controls the granularity of the turbulence produced by <code>iridTurbulence</code>. The default is <code>0.0</code>.",
                tname: "float",
            }, {
                name:  "iridTurbulence",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "iridTurbulence must be a float.",
                desc:  "Specifies the amount of turbulence to apply to the iridescence effect. Surface normal patterns will also affect the result.",
                tname: "float",
            },
        ],
    },
/*

PATTERN_MODIFIER:
  BLEND_MAP_MODIFIER | AGATE_MODIFIER | DENSITY_FILE_MODIFIER |
  QUILTED_MODIFIER | BRICK_MODIFIER | SLOPE_MODIFIER |
  noise_generator Number| turbulence <Amount> |
  octaves Count | omega Amount | lambda Amount |
  warp { [WARP_ITEMS...] } | TRANSFORMATION
[done]     BLEND_MAP_MODIFIER:
[done]       frequency Amount | phase Amount | ramp_wave | triangle_wave |
[done]       sine_wave | scallop_wave | cubic_wave | poly_wave [Exponent]
[done]     AGATE_MODIFIER:
[done]       agate_turb Value
BRICK_MODIFIER:
  brick_size Size | mortar Size
DENSITY_FILE_MODIFIER:
  interpolate Type
SLOPE_MODIFIERS:
  <Altitude>
  <Lo_slope,Hi_slope>
  <Lo_alt,Hi_alt>
QUILTED_MODIFIER:
  control0 Value | control1 Value
PIGMENT_MODIFIER:
  PATTERN_MODIFIER | COLOR_LIST | PIGMENT_LIST |
  color_map { COLOR_MAP_BODY } | colour_map { COLOR_MAP_BODY } |
  pigment_map{ PIGMENT_MAP_BODY } | quick_color COLOR |
  quick_colour COLOR
COLOR NORMAL_MODIFIER:
  PATTERN_MODIFIER | NORMAL_LIST |
  normal_map { NORMAL_MAP_BODY } | slope_map{ SLOPE_MAP_BODY } |
  bump_size Amount
TEXTURE_PATTERN_MODIFIER:
  PATTERN_MODIFIER | TEXTURE_LIST |
  texture_map{ TEXTURE_MAP_BODY }
DENSITY_MODIFIER:
  PATTERN_MODIFIER | DENSITY_LIST | COLOR_LIST |
  color_map { COLOR_MAP_BODY } | colour_map { COLOR_MAP_BODY } |
  density_map { DENSITY_MAP_BODY }

Defaults:

dist_exp        : 0
falloff         : 2.0
frequency       : 1.0
lambda          : 2.0
major_radius    : 1
map_type        : 0
noise_generator : 2
octaves         : 6
omega           : 0.5
orientation     : <0,0,1>
phase           : 0.0
poly_wave       : 1.0
strength        : 1.0
turbulence      : <0,0,0>


*/
    Pattern: {
        desc: false,
        conArgs: false,
        conBlock: false, // TODO
        snippets: ["Pattern.toSDL" ],
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.patternProps)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.patternProps) + ".",
                desc:  "Determines the pattern type.",       // TODO: emit list
                tname: "string",
            }, {
                name:  "frequency",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "frequency must be a float.",
                desc:  "Determines the number of times the items in a blend map repeat over one cycle of a pattern. The default is <code>1.0</code>.",
                tname: "float",
            }, {
                name:  "phase",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "phase must be a float.",
                desc:  "Shifts the start and end point of blend maps. The default is <code>0.0</code>.",
                tname: "float",
            }, {
                name:  "waveType",
                req:   false,
                valid: "cpov.isInArray(val, cpov.blendWaves)",
                err:   "waveType must be one of " + cpov.arrayToTextList(cpov.blendWaves) + ".",
                desc:  "Determines the wave form used in blend maps.",  // TODO: emit list
                tname: "string",
            }, {
                name:  "polyExponent",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "polyExponent must be a float.",
                desc:  "When a <code>poly</code> wave is used, this defines the exponent of its exponential curve. The default is <code>1.0</code>.",
                tname: "float",
            }, {
                name:  "agateTurbulence",
                req:   false,
                valid: "cpov.isFloat(val)",
                err:   "agateTurbulence must be a float.",
                desc:  "Adjusts the built-in turbulence specific to <code>agate</code> patterns.",
                tname: "float",
            }
            // brickSize
            // mortarSize
        ]
    },


};


