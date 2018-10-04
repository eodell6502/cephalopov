// README //--------------------------------------------------------------------

/*

This file contains chunks of manually written code intended to be inserted into
the generated code produced by the codegen.js script. The code generator is
mainly intended to handle the reams of boilerplate and validation involved in
managing data that will be handled by POV-Ray. But it is far easier to write the
complex custom CephaloPOV methods by hand, and this snippets file makes it
relatively painless to integrate those methods with the code generation process.

Keys are defined by specially formatted comments and the values are the lines in
between those comments, with leading and trailing whitespace trimmed. The
comments are formatted thus:

         // Keyname // (anything after the second // is ignored)
         ^
         |
         +------------- first column

Note that the spaces on either side of the keyname are mandatory and that
there cannot be any spaces in the keyname itself.

*/


// Primitive.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Generates SDL from parameters.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

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
    // TODO: texture (real)

    if(this.texture)
        contents.push(pad + this.texture);

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



// Color.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    stops = cpov.tab(stops);

    if(this.r === null)
        cpov.error("fatal", "r is undefined.", "Color.toSDL");
    if(this.g === null)
        cpov.error("fatal", "g is undefined.", "Color.toSDL");
    if(this.b === null)
        cpov.error("fatal", "b is undefined.", "Color.toSDL");

    var form = (this.srgb ? "s" : "") + "rgb";
    var args = [this.r, this.g, this.b];

    if(this.f) {
        form += "f";
        args.push(this.f);
        if(this.t) {
            form += "t";
            args.push(this.t);
        }
    }

    return stops + form + " <" + args.join(", ") + ">";

}



// Box.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    if(this.corner1 === null)
        cpov.error("fatal", "corner1 is undefined.", "Box.toSDL");
    if(this.corner2 === null)
        cpov.error("fatal", "corner2 is undefined.", "Box.toSDL");

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    content.push(pad + "box {");
    content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Camera.toSDL //--------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//
// Cameras are not true primitives, but CephaloPOV makes sure they act like
// one in most instances. (TODO)
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "Camera.toSDL");

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    content.push(pad + "camera {");
    content.push(ppad + this.type + (this.type == "cylinder" ? " " + this.cylinderType : ""));
    if(this.location !== null)
        content.push(ppad + "location " + this.location.toSDL());
    if(this.right !== null)
        content.push(ppad + "right " + this.right.toSDL());
    if(this.up !== null)
        content.push(ppad + "up " + this.up.toSDL());
    if(this.direction !== null)
        content.push(ppad + "direction " + this.direction.toSDL());
    if(this.angle !== null)
        content.push(ppad + "angle " + this.angle);
    if(this.lookAt !== null)
        content.push(ppad + "look_at " + this.lookAt.toSDL());
    if(this.blurSamples !== null)
        content.push(ppad + "blur_samples " + this.blurSamples.join(", "));
    if(this.apertureSize !== null)
        content.push(ppad + "aperture_size " + this.apertureSize);
    if(this.focalPoint !== null)
        content.push(ppad + "focal_point " + this.focalPoint.toSDL());
    if(this.confidence !== null)
        content.push(ppad + "confidence " + this.confidence);
    if(this.variance !== null)
        content.push(ppad + "variance " + this.variance);
    if(this.bokeh !== null)
        content.push(ppad + "bokeh " + this.bokeh);
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}


// Cone.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    if(this.basePoint === null)
        cpov.error("fatal", "basePoint is undefined.", "Cone.toSDL");
    if(this.baseRadius === null)
        cpov.error("fatal", "baseRadius is undefined.", "Cone.toSDL");
    if(this.capPoint === null)
        cpov.error("fatal", "capPoint is undefined.", "Cone.toSDL");
    if(this.capRadius === null)
        cpov.error("fatal", "capRadius is undefined.", "Cone.toSDL");

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    content.push(pad + "cone {");
    content.push(ppad + this.basePoint.toSDL() + ", " + this.baseRadius + ", " + this.capPoint.toSDL() + ", " + this.capRadius);
    if(this.open)
        content.push(pad + "    open");
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Cylinder.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.basePoint === null)
        cpov.error("fatal", "basePoint is undefined.", "Cylinder.toSDL");
    if(this.capPoint === null)
        cpov.error("fatal", "capPoint is undefined.", "Cylinder.toSDL");
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Cylinder.toSDL");

    content.push(pad + "cylinder {");
    content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
    if(this.open)
        content.push(pad + "    open");
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Disc.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.center === null)
        cpov.error("fatal", "center is undefined.", "Disc.toSDL");
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Disc.toSDL");

    content.push(pad + "disc {");
    content.push(ppad + this.center.toSDL() + ", " + this.normal.toSDL() + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Difference.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.positiveObject === null)
        cpov.error("fatal", "positiveObject is undefined.", "Difference.toSDL");
    if(this.negativeObjects === null)
        cpov.error("fatal", "negativeObjects is undefined.", "Difference.toSDL");

    content.push(pad + "difference {");
    content.push(ppad + this.positiveObject.toSDL(stops + 1));
    for(var i = 0; i < this.negativeObjects.length; i++) {
        content.push(ppad + this.negativeObjects[i].toSDL(stops + 1));
    }
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// HeightField.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    content.push(pad + "height_field {");
    if(this.userFunc !== null) {
        content.push(pad + "    function FieldResolution_X, FieldResolution_Y { " + this.userFunc + " }");
    } else if(this.filename !== null) {
        content.push(
            ppad
            + (this.hfType === null ? "" : (this.hfType + " "))
            + '"' + this.filename + '" '
            + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
            + (this.premultiplied === null ? "" : (this.premultiplied ? "on" : "off"))
        );
    } else {
        cpov.error("fatal", "Neither filename nor userFunc is defined.", "HeightField.toSDL");
    }

    if(this.smooth === true)
        content.push(pad + "    smooth");
    if(this.waterLevel !== null)
        content.push(pad + "    water_level " + this.waterLevel);
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Intersection.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Intersection.toSDL");

    content.push(pad + "intersection {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// LightSource.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.location === null)
        cpov.error("fatal", "location is undefined.", "LightSource.toSDL");
    if(this.color === null)
        cpov.error("fatal", "color is undefined.", "LightSource.toSDL");

    content.push(pad + "light_source {");
    content.push(ppad + this.location.toSDL() + ", " + this.color.toSDL());

    if(this.type !== null)
        content.push(ppad + this.type);

    if(this.type == "spotlight" || this.type == "cylindrical") {
        if(this.pointAt === null)
            throw new Error("[Light]: pointAt must be specified.");
        if(this.radius !== null)
            content.push(ppad + "radius " + this.radius);
        if(this.falloff !== null)
            content.push(ppad + "falloff " + this.falloff);
        if(this.tightness !== null)
            content.push(ppad + "tightness " + this.tightness);
    }

    if(this.parallel)
        content.push(ppad + "parallel");

    if(this.pointAt !== null)
        content.push(ppad + "point_at " + this.pointAt);

    if(this.areaLight) {
        if(this.axis1 === null || this.axis2 === null || this.size1 === null || this.size2 === null)
            throw new Error("[Light]: Area lights require axis1, axis2, size1, and size2 to be defined.");
        content.push(ppad + "area_light");
        content.push(ppad + this.axis1 + ", " + this.axis2 + ", " + this.size1 + ", " + this.size2);
        if(this.adaptive !== null)
            content.push(ppad + "adaptive " + this.adaptive);
        if(this.jitter)
            content.push(ppad + "jitter");
        if(this.circular)
            content.push(ppad + "circular");
        if(this.orient)
            content.push(ppad + "orient");
    }

    if(this.shadowless)
        content.push(ppad + "shadowless");

    // TODO: looksLike
    // TODO: projectedThrough

    if(this.fadeDistance !== null)
        content.push(ppad + "fade_distance " + this.fadeDistance);
    if(this.fadePower !== null)
        content.push(ppad + "fade_power " + this.fadePower);

    if(this.mediaInteraction === false)
        content.push(ppad + "media_interaction off");
    if(this.mediaAttenuation === true)
        content.push(ppad + "media_attenuation on");

    content.push(pad + "}");

    return content.join("\n");
}



// Merge.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Merge.toSDL");

    content.push(pad + "merge {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Ovus.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.topRadius === null)
        cpov.error("fatal", "topRadius is undefined.", "Ovus.toSDL");
    if(this.bottomRadius === null)
        cpov.error("fatal", "bottomRadius is undefined.", "Ovus.toSDL");

    content.push(pad + "ovus {");
    content.push(ppad + this.topRadius + ", " + this.bottomRadius);
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}


// Sphere.toSDL //--------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.center === null)
        cpov.error("fatal", "center is undefined.", "Sphere.toSDL");
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Sphere.toSDL");

    content.push(pad + "sphere {");
    content.push(ppad + this.center.toSDL() + ", " + this.radius);
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Torus.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.majorRadius === null)
        cpov.error("fatal", "majorRadius is undefined.", "Torus.toSDL");
    if(this.minorRadius === null)
        cpov.error("fatal", "minorRadius is undefined.", "Torus.toSDL");

    content.push(pad + "torus {");
    content.push(ppad + this.majorRadius + ", " + this.minorRadius);
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Triangle.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//
// The CephaloPOV Triangle object incorporates both the triangle and
// smooth_triangle types. If smooth is true and normal1-3 are defined, it
// will output a smooth_triangle. Otherwise a triangle is output.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.corner1 === null)
        cpov.error("fatal", "corner1 is undefined.", "Triangle.toSDL");
    if(this.corner2 === null)
        cpov.error("fatal", "corner2 is undefined.", "Triangle.toSDL");
    if(this.corner3 === null)
        cpov.error("fatal", "corner3 is undefined.", "Triangle.toSDL");

    if(this.smooth) {

        content.push(pad + "triangle {");
        content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL() + ", " + this.corner3.toSDL());
        content.push(super.toSDL(stops + 1));
        content.push(pad + "}");

    } else {

        if(this.normal1 === null)
            cpov.error("fatal", "normal1 is undefined.", "Triangle.toSDL");
        if(this.normal2 === null)
            cpov.error("fatal", "normal2 is undefined.", "Triangle.toSDL");
        if(this.normal3 === null)
            cpov.error("fatal", "normal3 is undefined.", "Triangle.toSDL");

        content.push(pad + "smooth_triangle {");
        content.push(ppad
            + this.corner1.toSDL() + ", " + this.normal1.toSDL() + ", "
            + this.corner2.toSDL() + ", " + this.normal2.toSDL() + ", "
            + this.corner3.toSDL() + ", " + this.normal3.toSDL());
        content.push(super.toSDL(stops + 1));
        content.push(pad + "}");

    }

    return content.join("\n");
}

// Union.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var content = [ ];

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Union.toSDL");

    content.push(pad + "merge {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }
    content.push(pad + "    split_union " + (this._splitUnion ? "on" : "off"));
    content.push(super.toSDL(stops + 1));
    content.push(pad + "}");

    return content.join("\n");
}



// Primitive.conBlock //-------------------------------------------------------

cpov.initObject(this, options);

// Create serial number and register with cpov object

cpov.objectSerial++;
this.serial = cpov.objectSerial;
cpov.serialMap[this.serial] = this;



// Matrix-methods //------------------------------------------------------------

//--------------------------------------------------------------------------
// Given another Matrix, that, returns a new Matrix this * that.
//--------------------------------------------------------------------------

xMatrix(that) {

    if(!cpov.isClass(that, "Matrix"))
        cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix");

    return new Matrix(
        /* v00 */ (this.v00 * that.v00 + this.v01 * that.v10 + this.v02 * that.v20),
        /* v01 */ (this.v00 * that.v01 + this.v01 * that.v11 + this.v02 * that.v21),
        /* v02 */ (this.v00 * that.v02 + this.v01 * that.v12 + this.v02 * that.v22),
        /* v10 */ (this.v10 * that.v00 + this.v11 * that.v10 + this.v12 * that.v20),
        /* v11 */ (this.v10 * that.v01 + this.v11 * that.v11 + this.v12 * that.v21),
        /* v12 */ (this.v10 * that.v02 + this.v11 * that.v12 + this.v12 * that.v22),
        /* v20 */ (this.v20 * that.v00 + this.v21 * that.v10 + this.v22 * that.v20),
        /* v21 */ (this.v20 * that.v01 + this.v21 * that.v11 + this.v22 * that.v21),
        /* v22 */ (this.v20 * that.v02 + this.v21 * that.v12 + this.v22 * that.v22),
        /* v30 */ (this.v30 * that.v00 + this.v31 * that.v10 + this.v32 * that.v20 + that.v30),
        /* v31 */ (this.v30 * that.v01 + this.v31 * that.v11 + this.v32 * that.v21 + that.v31),
        /* v32 */ (this.v30 * that.v02 + this.v31 * that.v12 + this.v32 * that.v22 + that.v32)
    );
}


//--------------------------------------------------------------------------
// Given a VectorXYZ, point, returns a new VectorXYZ this * point.
//--------------------------------------------------------------------------

xPoint(point) {

    if(!cpov.isClass(point, "VectorXYZ"))
        cpov.error("fatal", "point is not a VectorXYZ.", "Matrix.xPoint");

    return new VectorXYZ(
        this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
        this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
        this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
    );
}


//--------------------------------------------------------------------------
// Given a Primitive, applies this Matrix to its transform. If
// this.transform is null, multiplies itself by the baseTransform and stores
// the result in this.transform, unless this.baseTransform is null, in which
// case it exits with an error.
//--------------------------------------------------------------------------

apply(obj) {

    if(!cpov.inheritsFrom(obj, "Primitive")
        cpov.error("fatal", "obj is not a Primitive.", "Matrix.apply");

    if(obj.transform === null) {
        if(obj.baseTransform === null) {
            cpov.error("fatal", cpov.primitiveIdentifier(obj) + " does not have a baseTransform.", "Matrix.apply");
        } else {
            obj.transform = this.xMatrix(obj.baseTransform);
        }
    } else {
        obj.transform = this.xMatrix(obj.transform);
    }
}


// VectorXY.copy //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXY();
    that._x = this._x;
    that._y = this._y;

    return that;
}



// VectorUV.copy //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorUV();
    that._u = this._u;
    that._v = this._v;

    return that;
}



// VectorXYZ.copy //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXYZ();
    that._x = this._x;
    that._y = this._y;
    that._z = this._z;

    return that;
}



// VectorXYZW.copy //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXYZW();
    that._x = this._x;
    that._y = this._y;
    that._z = this._z;
    that._w = this._w;

    return that;
}



// Color.copy //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the color. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new Color();
    that._r    = this._r;
    that._g    = this._g;
    that._b    = this._b;
    that._f    = this._f;
    that._t    = this._t;
    that._srgb = this._srgb;

    return that;
}



// Matrix.copy //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the Matrix. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new Matrix();
    that._v00 = this._v00;
    that._v01 = this._v01;
    that._v02 = this._v02;
    that._v10 = this._v10;
    that._v11 = this._v11;
    that._v12 = this._v12;
    that._v20 = this._v20;
    that._v21 = this._v21;
    that._v22 = this._v22;
    that._v30 = this._v30;
    that._v31 = this._v31;
    that._v32 = this._v32;

    return that;
}
