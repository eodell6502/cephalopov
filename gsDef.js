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
            err:   "adcBailout must be a float greater than or equal to zero."
        }, {
            name:  "ambientLight",
            valid: "cpov.isClass(val, 'Color')",
            err:   "ambientLight must be a Color."
        }, {
            name:  "assumedGamma",
            valid: "cpov.isFloat(val)",
            err:   "assumedGamma must be a float."
        }, {
            name:  "charset",
            valid: "cpov.isInArray(val, ['ascii', 'utf8', 'sys'])",
            err:   "charset must be one of 'ascii', 'utf8', or 'sys'."
        }, {
            name:  "iridWavelength",
            valid: "cpov.isClass(val, 'Color')",
            err:   "iridWavelength must be a Color"
        }, {
            name:  "maxIntersections",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxIntersections must be an integer greater than or equal to zero."
        }, {
            name:  "maxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxTraceLevel must be an integer greater than or equal to zero."
        }, {
            name:  "mmPerUnit",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "mmPerUnit must be a float greater than or equal to zero."
        }, {
            name:  "noiseGenerator",
            valid: "cpov.isInt(val) && cpov.isInArray(val, [1, 2, 3])",
            err:   "noiseGenerator must be an integer and one of 1, 2, or 3."
        }, {
            name:  "numberOfWaves",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "numberOfWaves must be an integer greater than or equal to zero."
        }, {
            name:  "photon",
            valid: "cpov.isBoolean(val)",
            err:   "photon must be a boolean."
        }, {
            name:  "photonAdcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "photonAdcBailout must be a float greater than or equal to zero."
        }, {
            name:  "photonAutostop",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "photonAutostop must be a float within the unit interval (0.0 - 1.0)"
        }, {
            name:  "photonCount",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonCount must be an integer greater than or equal to zero"
        }, {
            name:  "photonExpandThresholds",
            valid: "Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])",
            err:   "photonExpandThresholds must be an array consisting of a float and and integer."
        }, {
            name:  "photonGather",
            valid: "cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]",
            err:   "photonGather must be an array of two integers greater than zero in ascending order."
        }, {
            name:  "photonJitter",
            valid: "cpov.isFloat(val)",
            err:   "photonJitter must be a float."
        }, {
            name:  "photonLoadFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonLoadFile must be a non-empty string."
        }, {
            name:  "photonMaxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonMaxTraceLevel must be an integer greater than or equal to zero."
        }, {
            name:  "photonMedia",
            valid: "cpov.isArrayOfFloats(val, 2, 2)",
            err:   "photonMedia must be an array of two floats."
        }, {
            name:  "photonRadius",
            valid: "cpov.isArrayOfFloats(val, 4, 4)",
            err:   "photonRadius must be an array of four floats."
        }, {
            name:  "photonSaveFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonSaveFile must be a non-empty string."
        }, {
            name:  "photonSpacing",
            valid: "cpov.isFloat(val) && val > 0",
            err:   "photonSpacing must be a float greater than zero."
        }, {
            name:  "radAdcBailout",
            valid: "cpov.isFloat(val)",
            err:   "radAdcBailout must be a float."
        }, {
            name:  "radAlwaysSample",
            valid: "cpov.isBoolean(val)",
            err:   "radAlwaysSample must be a boolean."
        }, {
            name:  "radBrightness",
            valid: "cpov.isFloat(val)",
            err:   "radBrightness must be a float."
        }, {
            name:  "radCount",
            valid: "cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)",
            err:   "radCount must be an array of one or two integers, both of which must be greater than or equal to one."
        }, {
            name:  "radErrorBound",
            valid: "cpov.isFloat(val)",
            err:   "radErrorBound must be a float."
        }, {
            name:  "radGrayThreshold",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radGrayThreshold must be a float in the unit interval (0.0 - 1.0)."
        }, {
            name:  "radiosity",
            valid: "cpov.isBoolean(val)",
            err:   "radiosity must be a boolean."
        }, {
            name:  "radLowErrorFactor",
            valid: "cpov.isFloat(val)",
            err:   "radLowErrorFactor must be a float."
        }, {
            name:  "radMaximumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMaximumReuse must be a float."
        }, {
            name:  "radMaxSample",
            valid: "cpov.isFloat(val)",
            err:   "radMaxSample must be a float."
        }, {
            name:  "radMinimumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMinimumReuse must be a float."
        }, {
            name:  "radNearestCount",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radNearestCount must be an integer in the range 1-20."
        }, {
            name:  "radNormal",
            valid: "cpov.isBoolean(val)",
            err:   "radNormal must be a boolean."
        }, {
            name:  "radPretraceEnd",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)"
        }, {
            name:  "radPretraceStart",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radPretraceStart must be a float in the unit interval (0.0 - 1.0)"
        }, {
            name:  "radRecursionLimit",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radRecursionLimit must be an integer in the range 1-20."
        }, {
            name:  "radSubsurface",
            valid: "cpov.isBoolean(val)",
            err:   "radSubsurface must be a boolean."
        }, {
            name:  "subRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "subRadiosity must be a boolean"
        }, {
            name:  "subSamples",
            valid: "cpov.isArrayOfInts(val, 2, 2)",
            err:   "subSamples must be an array of two integers."
        }, {
            name:  "subsurface",
            valid: "cpov.isBoolean(val)",
            err:   "subsurface must be a boolean."
        }
    ]
};

