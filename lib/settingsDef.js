//------------------------------------------------------------------------------
// Definition of Settings parameter validations and error messages.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The Settings class is a singleton instantiated as cpov.settings that "
        + "manages CephaloPOV-specific settings as opposed to the POV-Ray settings "
        + "in cpov.imageOptions and cpov.globalSettings.",
    conArgs: false,
    conBlock: false,
    snippets: [ ],
    mutable: [
        {
            name:    "optionalLibraries",
            valid:   "cpov.isArrayOfNonEmptyStrings(val) || (Array.isArray(val) && val.length == 0)",
            err:     "optionalLibraries must be an array of non-empty strings or an empty array.",
            default: "[ ]",
            desc:    "Contains a list of names of optional libraries which will be loaded into cpov.optLib for use in user programs.",
            tname:   "[string]"
        },
    ]
};

