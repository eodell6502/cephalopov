//------------------------------------------------------------------------------
// Defines the types and validity tests for properties which are common to
// all primitive objects.
//------------------------------------------------------------------------------

module.exports = {
    desc: "The Primitive class implements parameters and functionality that are "
        + "shared across (nearly) all geometric primitives.",
    conArgs: false,
    conBlock: "Primitive.conBlock",
    snippets: [
        "Primitive.adopt",
        "Primitive.copyCommonFrom",
        "Primitive.destroy",
        "Primitive.disown",
		"Primitive.immutables",
        "Primitive.requiredParameterTest",
		"Primitive.resetTransform",
        "Primitive.snapshot",
        "Primitive.toSDL",
    ],
    mutable: [
        {
            name:  "active",
            valid: "cpov.isBoolean(val)",
            err:   "active must be a boolean.",
            desc:  "If <code>active == false</code>, it will not be output to the current .pov frame file. Defaults to <code>true</code>.",
            tname: "boolean"
        }, {
            name:  "baseTransform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "baseTransform must be a Matrix.",
            desc:  "The <code>baseTransform</code> attribute contains the \"default\" transformation of the object. As new transformations are applied, the original <code>baseTransform</code> remains unchanged, making it easy to revert to the original state by calling the <code>resetTransform</code> method.",
            tname: "Matrix"
        }, {
            name:  "boundedBy",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "boundedBy must be a Primitive.",
            desc:  "Defines a manual bounding volume for the object.",
            tname: "Primitive"
        }, {
            name:  "clippedBy",
            valid: "cpov.inheritsFrom(val, 'Primitive') && !cpov.isClass(val, ['bicubicPatch', 'disc', 'triangle', 'polygon', 'mesh', 'mesh2'])",
            err:   "clippedBy must be a solid Primitive.",
            desc:  "Specifies a solid <code>Primitive</code> that the object is clipped by in a manner similar to CSG intersection.",
            tname: "Primitive"
        }, {
            name:  "doubleIlluminate",
            valid: "cpov.isBoolean(val)",
            err:   "doubleIlluminate must be a boolean.",
            desc:  "If <code>true</code>, the object is illuminated on its shadow side.",
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
            desc:  "If defined, this function will be called at the beginning of a frame before output.",
            tname: "function"
        }, {
            name:  "frameEnd",
            valid: "typeof val == 'function'",
            err:   "frameEnd must be a JavaScript function.",
            desc:  "If defined, this function will be called at the end of a frame after output.",
            tname: "function"
        }, {
            name:  "hollow",
            valid: "cpov.isBoolean(val)",
            err:   "hollow must be a boolean.",
            desc:  "If <code>true</code>, this will make an otherwise solid primitive hollow. Has no effect on objects which are not solid.",
            tname: "boolean"
        }, {
            name:  "id",
            valid: "cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this)",
            err:   "id must be a unique, non-empty string.",
            desc:  "An optional, unique string which serves to identify an object. While you can pull objects out of <code>cpov.idMap</code> using this value, it is output in error messages, making it easier to find the offending object.",
            tname: "string"
        }, {
            name:  "interior",
            valid: "cpov.isClass(val, 'Interior')",
            err:   "interior must be an Interior.",
            desc:  "NIY",
            tname: "Interior"
        }, {
            name:  "inverse",
            valid: "cpov.isBoolean(val)",
            err:   "inverse must be a boolean.",
            desc:  "If <code>true</code>, the inside and outside of the solid object are swapped. For example, a hollow <code>Sphere</code> would consist of a spherical void in an infinite solid mass. This is mainly useful in CSG objects.",
            tname: "boolean"
        }, {
            name:  "material",
            valid: "cpov.isClass(val, 'Material')",
            err:   "material must be a Material.",
            desc:  "NIY",
            tname: "Material"
        }, {
            name:  "noImage",
            valid: "cpov.isBoolean(val)",
            err:   "noImage must be a boolean.",
            desc:  "If <code>true</code>, the object will be invisible to cameras, but it will still cast shadows and show up in reflections.",
            tname: "boolean"
        }, {
            name:  "noRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "noRadiosity must be a boolean.",
            desc:  "If <code>true</code>, the object will be invisible to radiosity rays.",
            tname: "boolean"
        }, {
            name:  "noReflection",
            valid: "cpov.isBoolean(val)",
            err:   "noReflection must be a boolean.",
            desc:  "If <code>true</code>, the object will not be visible in reflections.",
            tname: "boolean"
        }, {
            name:  "noShadow",
            valid: "cpov.isBoolean(val)",
            err:   "noShadow must be a boolean.",
            desc:  "If <code>true</code>, the object will not cast shadows.",
            tname: "boolean"
        }, {
            name:   "parent",
            valid:  "cpov.inheritsFrom(val, 'Primitive')",
            err:    "parent must be a Primitive.",
            custom: "Primitive.parent.get-set",
			dperm:  "RO",
            desc:   "This is a read-only reference to the parent object of which the current object is a component, e.g., <code>Blob</code>, <code>Mesh</code>, and CSG objects.",
            tname:  "Primitive"
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
            name:   "serial",
            valid:  "cpov.isInt(val) && cpov.isUnusedSerial(val, this)",
            err:    "serial must be an integer.",
            custom: "Primitive.serial.get-set",
            desc:   "This is a unique read-only integer serial number automatically assigned by CephaloPOV upon object creation. It is displayed in error messages, and objects can be looked up using <code>cpov.serialMap</code>.",
            tname:  "integer"
        }, {
            name:  "texture",
            // valid: "cpov.isClass(val, 'Texture')",         // Temporarily, we will fake having
            // err:   "texture must be a Texture."            // a texture subsystem by letting users
            valid: "cpov.isString(val)",                      // just stick an SDL string in its
            err:   "texture must be a string (for now).",     // place.
            desc:  "Pending implementation of CephaloPOV's texture subsystem, this is a literal SDL string which will be output as-is.",
            tname: "string"
        }, {
            name:   "transform",
            valid:  "cpov.isClass(val, 'Matrix')",
            err:    "transform must be a Matrix.",
            custom: "Primitive.transform.get-set",
            desc:   "This is a <code>Matrix</code> representing the current transformation state of the object, as distinct from <code>baseTransform</code>, which represents its original state. <code>Matrix</code> values assigned to the <code>transform</code> attribute are silently multiplied against its current value.",
            tname:  "Matrix"
        }
    ]
};
