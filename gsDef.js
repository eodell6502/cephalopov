//------------------------------------------------------------------------------
// Definition of globalSettings parameter validations and error messages.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The GlobalSettings class manages the variables that will be output "
        + "into the SDL global_settings block.",
    conArgs: false,
    conBlock: false,
    snippets: ["GlobalSettings.toSDL"],
    mutable: [
        {
            name:  "adcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "adcBailout must be a float greater than or equal to zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "ambientLight",
            valid: "cpov.isClass(val, 'Color')",
            err:   "ambientLight must be a Color.",
            desc:  "TODO",
            tname: "Color"
        }, {
            name:  "assumedGamma",
            valid: "cpov.isFloat(val)",
            err:   "assumedGamma must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "charset",
            valid: "cpov.isInArray(val, ['ascii', 'utf8', 'sys'])",
            err:   "charset must be one of 'ascii', 'utf8', or 'sys'.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "iridWavelength",
            valid: "cpov.isClass(val, 'Color')",
            err:   "iridWavelength must be a Color",
            desc:  "TODO",
            tname: "Color"
        }, {
            name:  "maxIntersections",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxIntersections must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "maxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxTraceLevel must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "mmPerUnit",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "mmPerUnit must be a float greater than or equal to zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "noiseGenerator",
            valid: "cpov.isInt(val) && cpov.isInArray(val, [1, 2, 3])",
            err:   "noiseGenerator must be an integer and one of 1, 2, or 3.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "numberOfWaves",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "numberOfWaves must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "photon",
            valid: "cpov.isBoolean(val)",
            err:   "photon must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "photonAdcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "photonAdcBailout must be a float greater than or equal to zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonAutostop",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "photonAutostop must be a float within the unit interval (0.0 - 1.0)",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonCount",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonCount must be an integer greater than or equal to zero",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "photonExpandThresholds",
            valid: "Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])",
            err:   "photonExpandThresholds must be an array consisting of a float and and integer.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonGather",
            valid: "cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]",
            err:   "photonGather must be an array of two integers greater than zero in ascending order.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonJitter",
            valid: "cpov.isFloat(val)",
            err:   "photonJitter must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "photonLoadFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonLoadFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "photonMaxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonMaxTraceLevel must be an integer greater than or equal to zero.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "photonMedia",
            valid: "cpov.isArrayOfFloats(val, 2, 2)",
            err:   "photonMedia must be an array of two floats.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonRadius",
            valid: "cpov.isArrayOfFloats(val, 4, 4)",
            err:   "photonRadius must be an array of four floats.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "photonSaveFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonSaveFile must be a non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "photonSpacing",
            valid: "cpov.isFloat(val) && val > 0",
            err:   "photonSpacing must be a float greater than zero.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radAdcBailout",
            valid: "cpov.isFloat(val)",
            err:   "radAdcBailout must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radAlwaysSample",
            valid: "cpov.isBoolean(val)",
            err:   "radAlwaysSample must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "radBrightness",
            valid: "cpov.isFloat(val)",
            err:   "radBrightness must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radCount",
            valid: "cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)",
            err:   "radCount must be an array of one or two integers, both of which must be greater than or equal to one.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "radErrorBound",
            valid: "cpov.isFloat(val)",
            err:   "radErrorBound must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radGrayThreshold",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radGrayThreshold must be a float in the unit interval (0.0 - 1.0).",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radiosity",
            valid: "cpov.isBoolean(val)",
            err:   "radiosity must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "radLowErrorFactor",
            valid: "cpov.isFloat(val)",
            err:   "radLowErrorFactor must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radMaximumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMaximumReuse must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radMaxSample",
            valid: "cpov.isFloat(val)",
            err:   "radMaxSample must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radMinimumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMinimumReuse must be a float.",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radNearestCount",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radNearestCount must be an integer in the range 1-20.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "radNormal",
            valid: "cpov.isBoolean(val)",
            err:   "radNormal must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "radPretraceEnd",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radPretraceStart",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceStart must be a float in the unit interval (0.0 - 1.0)",
            desc:  "TODO",
            tname: "float"
        }, {
            name:  "radRecursionLimit",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radRecursionLimit must be an integer in the range 1-20.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "radSubsurface",
            valid: "cpov.isBoolean(val)",
            err:   "radSubsurface must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "subRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "subRadiosity must be a boolean",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "subSamples",
            valid: "cpov.isArrayOfInts(val, 2, 2)",
            err:   "subSamples must be an array of two integers.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "subsurface",
            valid: "cpov.isBoolean(val)",
            err:   "subsurface must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }
    ]
};

