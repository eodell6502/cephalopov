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
            err:   "active must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "baseTransform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "baseTransform must be a Matrix.",
            desc:  "TODO",
            tname: "Matrix"
        }, {
            name:  "boundedBy",
            valid: "cpov.inheritsFrom('Primitive') ",  // TODO: limit to actual allowable Primitives.
            err:   "boundedBy must be a Primitive.",
            desc:  "TODO",
            tname: "Primitive"
        }, {
            name:  "children",
            valid: "cpov.isArrayOfSubclass(val, 'Primitive')",
            err:   "children must be an array of Primitives.",
            desc:  "TODO",
            tname: "Array"
        }, {
            name:  "clippedBy",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "clippedBy must be a Primitive.",
            desc:  "TODO",
            tname: "Primitive"
        }, {
            name:  "doubleIlluminate",
            valid: "cpov.isBoolean(val)",
            err:   "doubleIlluminate must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "finish",
            valid: "cpov.isClass(val, 'Finish')",
            err:   "finish must be a Finish.",
            desc:  "TODO",
            tname: "Finish"
        }, {
            name:  "frameBegin",
            valid: "typeof val == 'function'",
            err:   "frameBegin must be a JavaScript function.",
            desc:  "TODO",
            tname: "function"
        }, {
            name:  "frameEnd",
            valid: "typeof val == 'function'",
            err:   "frameEnd must be a JavaScript function.",
            desc:  "TODO",
            tname: "function"
        }, {
            name:  "hollow",
            valid: "cpov.isBoolean(val)",
            err:   "hollow must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "id",
            valid: "cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this)",
            err:   "id must be a unique, non-empty string.",
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "interior",
            valid: "cpov.isClass(val, 'Interior')",
            err:   "interior must be an Interior.",
            desc:  "TODO",
            tname: "Interior"
        }, {
            name:  "inverse",
            valid: "cpov.isBoolean(val)",
            err:   "inverse must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "material",
            valid: "cpov.isClass(val, 'Material')",
            err:   "material must be a Material.",
            desc:  "TODO",
            tname: "Material"
        }, {
            name:  "noImage",
            valid: "cpov.isBoolean(val)",
            err:   "noImage must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "noRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "noRadiosity must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "noReflection",
            valid: "cpov.isBoolean(val)",
            err:   "noReflection must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "noShadow",
            valid: "cpov.isBoolean(val)",
            err:   "noShadow must be a boolean.",
            desc:  "TODO",
            tname: "boolean"
        }, {
            name:  "parent",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "parent must be a Primitive.",
            desc:  "TODO",
            tname: "Primitive"
        }, {
            name:  "photons", //          type: "Photons",    test: null }, TODO FIXME
            valid: "",
            err:   "photons",
            desc:  "TODO",
            tname: "TODO"
        }, {
            name:  "radiosity", //        type: "Radiosity",  test: null }, TODO FIXME
            valid: "",
            err:   "radiosity",
            desc:  "TODO",
            tname: "TOOD"
        }, {
            name:  "serial",
            valid: "cpov.isInt(val) && cpov.isUnusedSerial(val, this)",
            err:   "serial must be an integer.",
            desc:  "TODO",
            tname: "integer"
        }, {
            name:  "texture",
            // valid: "cpov.isClass(val, 'Texture')",         // Temporarily, we will fake having
            // err:   "texture must be a Texture."            // a texture subsystem by letting users
            valid: "cpov.isString(val)",                      // just stick an SDL string in its
            err:   "texture must be a string (for now).",     // place.
            desc:  "TODO",
            tname: "string"
        }, {
            name:  "transform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "transform must be a Matrix.",
            custom: "Primitive.transform.get-set",
            desc:  "TODO",
            tname: "Matrix"
        }
    ]
};
