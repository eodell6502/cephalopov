//------------------------------------------------------------------------------
// Definitions of parameters for texture-related classes.
//
//  GenMap +
//         |
//         +--ColorMap
//         +--PigmentMap
//         +--NormalMap
//         +--SlopeMap
//         +--TextureMap
//
//  BumpMap     }  These are their own creatures.
//  MaterialMap }
//
//------------------------------------------------------------------------------

/*

        superclass: "Primitive",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["BicubicPatch.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isInt(val) && (val == 0 || val == 1)",
                err:   "type must be either 0 or 1.",
                desc:  "This may be either 0 or 1. Type 0 reduces the amount of memory used to store the patch in memory at the cost of slower rendering. Type 1 does the reverse, consuming more memory but reducing the number of calculations required.",
                tname: "integer"


*/


module.exports = {

    genMap: {
        superclass: false,
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    colorMap: {
        superclass: "GenMap",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    pigmentMap: {
        superclass: "GenMap",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    normalMap: {
        superclass: "GenMap",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    slopeMap: {
        superclass: "GenMap",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    textureMap: {
        superclass: "GenMap",
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    bumpMap: {
        superclass: false,
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

    materialMap: {
        superclass: false,
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: false,
        mutable: [

        ]
    },

};