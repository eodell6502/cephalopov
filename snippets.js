// README //--------------------------------------------------------------------

/*

This file contains chunks of manually written code intended to be inserted into
the generated code produced by the codegen.js script. The code generator is
mainly intended to handle the reams of boilerplate and validation involved in
managing data that will be handled by POV-Ray. But it is far easier to write the
complex custom CephaloPOV methods by hand, and this snippets file makes it
relatively painless to integrate those methods with the code generation process.

*/

// Primitive.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Generates SDL from parameters.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    var pad = cpov.tab(stops);
    var contents = [ ];

    if(this.clippedBy !== null) {
        contents.push(pad + "clipped_by {");
        contents.push(this.clippedBy.toSDL(stops + 1));
        contents.push(pad + "}");
    }

    if(this.boundedBy !== null) {
        contents.push(pad + "bounded_by {");
        if(this.boundedBy === this.clippedBy) {
            contents.push(pad + "    clipped_by");
        } else {
            contents.push(this.boundedBy.toSDL(stops + 1));
        }
        contents.push(pad + "}");
    }

    if(this.noShadow)
        contents.push(pad + "no_shadow");

    if(this.noImage)
        contents.push(pad + "no_image");

    if(this.noRadiosity)
        contents.push(pad + "no_radiosity");

    if(this.noReflection)
        contents.push(pad + "no_reflection");

    if(this.inverse)
        contents.push(pad + "inverse");

    if(this.sturm)
        contents.push(pad + "sturm");

    if(this.hierarchy)
        contents.push(pad + "hierarchy");

    if(this.double_illuminate)
        contents.push(pad + "double_illuminate");

    if(this.hollow)
        contents.push(pad + "hollow");

    // TODO: interior
    // TODO: interior_texture
    // TODO: pigment
    // TODO: normal
    // TODO: finish
    // TODO: photons
    // TODO: radiosity

    if(this.transform !== undefined && this.transform !== null)
        contents.push(pad + this.transform.toSDL(stops + 1));

    return contents.join("\n");
}



// VectorXY.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXY.toSDL");
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXY.toSDL");

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ">";
}



// VectorUV.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.u === null)
        cpov.error("fatal", "u is undefined.", "VectorUV.toSDL");
    if(this.v === null)
        cpov.error("fatal", "v is undefined.", "VectorUV.toSDL");

    return cpov.tab(stops) + "<" + this.u + ", " + this.v + ">";
}



// VectorXYZ.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXYZ.toSDL");
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXYZ.toSDL");
    if(this.z === null)
        cpov.error("fatal", "z is undefined.", "VectorXYZ.toSDL");

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ">";
}



// VectorXYZW.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXYZW.toSDL");
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXYZW.toSDL");
    if(this.z === null)
        cpov.error("fatal", "z is undefined.", "VectorXYZW.toSDL");
    if(this.w === null)
        cpov.error("fatal", "w is undefined.", "VectorXYZW.toSDL");

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
}



