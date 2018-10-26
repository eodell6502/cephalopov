//------------------------------------------------------------------------------
// Defines the types and validity tests for properties which are common to
// all primitive objects.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The Primitive class implements parameters and functionality that are "
        + "shared across (nearly) all geometric primitives.",
    conArgs: false,
    conBlock: "Primitive.conBlock",
    snippets: [ "Primitive.adopt", "Primitive.copyCommonFrom", "Primitive.destroy", "Primitive.requiredParameterTest", "Primitive.toSDL" ],
    mutable: [
        {
            name:  "active",
            valid: "cpov.isBoolean(val)",
            err:   "active must be a boolean."
        }, {
            name:  "baseTransform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "baseTransform must be a Matrix."
        }, {
            name:  "boundedBy",
            valid: "cpov.inheritsFrom('Primitive') ",  // TODO: limit to actual allowable Primitives.
            err:   "boundedBy must be a Primitive."
        }, {
            name:  "children",
            valid: "cpov.isArrayOfSubclass(val, 'Primitive')",
            err:   "children must be an array of Primitives."
        }, {
            name:  "clippedBy",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "clippedBy must be a Primitive."
        }, {
            name:  "doubleIlluminate",
            valid: "cpov.isBoolean(val)",
            err:   "doubleIlluminate must be a boolean."
        }, {
            name:  "finish",
            valid: "cpov.isClass(val, 'Finish')",
            err:   "finish must be a Finish."
        }, {
            name:  "frameBegin",
            valid: "typeof val == 'function'",
            err:   "frameBegin must be a JavaScript function."
        }, {
            name:  "frameEnd",
            valid: "typeof val == 'function'",
            err:   "frameEnd must be a JavaScript function."
        }, {
            name:  "hollow",
            valid: "cpov.isBoolean(val)",
            err:   "hollow must be a boolean."
        }, {
            name:  "id",
            valid: "cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this)",
            err:   "id must be a unique, non-empty string."
        }, {
            name:  "interior",
            valid: "cpov.isClass(val, 'Interior')",
            err:   "interior must be an Interior."
        }, {
            name:  "inverse",
            valid: "cpov.isBoolean(val)",
            err:   "inverse must be a boolean."
        }, {
            name:  "material",
            valid: "cpov.isClass(val, 'Material')",
            err:   "material must be a Material."
        }, {
            name:  "noImage",
            valid: "cpov.isBoolean(val)",
            err:   "noImage must be a boolean."
        }, {
            name:  "noRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "noRadiosity must be a boolean."
        }, {
            name:  "noReflection",
            valid: "cpov.isBoolean(val)",
            err:   "noReflection must be a boolean."
        }, {
            name:  "noShadow",
            valid: "cpov.isBoolean(val)",
            err:   "noShadow must be a boolean."
        }, {
            name:  "parent",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "parent must be a Primitive."
        }, {
            name:  "photons", //          type: "Photons",    test: null }, TODO FIXME
            valid: "",
            err:   "photons"
        }, {
            name:  "radiosity", //        type: "Radiosity",  test: null }, TODO FIXME
            valid: "",
            err:   "radiosity"
        }, {
            name:  "serial",
            valid: "cpov.isInt(val) && cpov.isUnusedSerial(val, this)",
            err:   "serial must be an integer."
        }, {
            name:  "texture",
            // valid: "cpov.isClass(val, 'Texture')",         // Temporarily, we will fake having
            // err:   "texture must be a Texture."            // a texture subsystem by letting users
            valid: "cpov.isString(val)",                      // just stick an SDL string in its
            err: "texture must be a string (for now)."        // place.
        }, {
            name:  "transform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "transform must be a Matrix.",
            custom: "Primitive.transform.get-set"
        }
    ]
};
