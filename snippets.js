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



// BicubicPatch.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "BicubicPatch.toSDL", this);
	if(this.patch === null)
        cpov.error("fatal", "patch is undefined.", "BicubicPatch.toSDL", this);

    content.push(pad + "bicubic_patch {");
	content.push(ppad + "type " + this.type);
	if(this.uSteps !== null)
		content.push(ppad + "u_steps " + this.uSteps);
	if(this.vSteps !== null)
		content.push(ppad + "v_steps " + this.vSteps);
	if(this.flatness !== null)
		content.push(ppad + "flatness " + this.flatness);

	for(var row = 0; row < 4; row++) {
		var items = [ ];
		for(var col = 0; col < 4; col++) {
			items.push(this.points[row * 4 + col].toSDL());
		}
		content.push(ppad + items.join(", ") + (row == 3 ? "," : ""));
	}

    $Primitive.toSDL-postamble
}



// Blob.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.components === null)
        cpov.error("fatal", "components is undefined.", "Blob.toSDL", this);

    content.push(pad + "blob {");
	var components = this.components;
	if(cpov.isSDLFunction(components)) {
		content.push(ppad + this.components);
	} else { // array
		for(var i = 0; i < components.length; i++) {
			content.push(components[i].toSDL(stops + 1));
		}
	}
	if(this.hierarchy)
		content.push(ppad + "hierarchy on");
	if(this.sturm)
		content.push(ppad + "sturm");
	if(this.threshold !== null)
		content.push(ppad + "threshold " + this.threshold);

    $Primitive.toSDL-postamble
}



// Box.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.corner1 === null)
        cpov.error("fatal", "corner1 is undefined.", "Box.toSDL", this);
    if(this.corner2 === null)
        cpov.error("fatal", "corner2 is undefined.", "Box.toSDL", this);

    content.push(pad + "box {");
    content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());

    $Primitive.toSDL-postamble
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

    $Primitive.toSDL-preamble

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "Camera.toSDL", this);
    else if(this.type == "cylinder" && this.cylinderType === null)
        cpov.error("type is cylinder but cylinderType is undefined.", "Camera.toSDL", this);
    else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null)))
        cpov.error("The orthographic camera requires either angle or up and right to be defined.", "Camera.toSDL", this);

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

    $Primitive.toSDL-postamble
}



// Color.conBlock //------------------------------------------------------------

if(cpov.isClass(options, "Color")) { // copy
    options = { r: options.r, g: options.g, b: options.b, f: options.f, t: options.t, srgb: options.srgb };
}

if(Array.isArray(options)) {
    if(options.length < 3 || options.length > 6) {
        cpov.error("fatal", "When initializing a Color with an array, it must have three to six values.", "Color.constructor", this);
    } else {
        this.r = options[0];
        this.g = options[1];
        this.b = options[2];
        if(options.length > 3)
            this.f = options[3];
        if(options.length > 4)
            this.t = options[4];
        if(options.length > 5)
            this.srgb = options[5];
    }
} else if(typeof options == "object") {
    if(options.r === undefined || options.g === undefined || options.b === undefined)
        cpov.error("fatal", "When initializing a Color with an object, r, g, and b must be defined.", "Color.constructor", this);
    cpov.initObject(this, options);
} else {
    cpov.error("fatal", "Invalid initializer.", "Color.constructor", this);
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



// Color.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    stops = cpov.tab(stops);

    if(this.r === null)
        cpov.error("fatal", "r is undefined.", "Color.toSDL", this);
    if(this.g === null)
        cpov.error("fatal", "g is undefined.", "Color.toSDL", this);
    if(this.b === null)
        cpov.error("fatal", "b is undefined.", "Color.toSDL", this);

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



// Cone.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.basePoint === null)
        cpov.error("fatal", "basePoint is undefined.", "Cone.toSDL", this);
    if(this.baseRadius === null)
        cpov.error("fatal", "baseRadius is undefined.", "Cone.toSDL", this);
    if(this.capPoint === null)
        cpov.error("fatal", "capPoint is undefined.", "Cone.toSDL", this);
    if(this.capRadius === null)
        cpov.error("fatal", "capRadius is undefined.", "Cone.toSDL", this);

    content.push(pad + "cone {");
    content.push(ppad + this.basePoint.toSDL() + ", " + this.baseRadius + ", " + this.capPoint.toSDL() + ", " + this.capRadius);
    if(this.open)
        content.push(pad + "    open");

    $Primitive.toSDL-postamble
}



// Cubic.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.coefficients === null)
        cpov.error("fatal", "coefficients is undefined.", "Cubic.toSDL", this);

    content.push(pad + "cubic {");
    content.push(ppad + this.coefficients.join(", "));
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Cylinder.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.basePoint === null)
        cpov.error("fatal", "basePoint is undefined.", "Cylinder.toSDL", this);
    if(this.capPoint === null)
        cpov.error("fatal", "capPoint is undefined.", "Cylinder.toSDL", this);
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Cylinder.toSDL", this);

    content.push(pad + "cylinder {");
    content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
    if(this.open)
        content.push(pad + "    open");

    $Primitive.toSDL-postamble
}



// Difference.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.positiveObject === null)
        cpov.error("fatal", "positiveObject is undefined.", "Difference.toSDL", this);
    if(this.negativeObjects === null)
        cpov.error("fatal", "negativeObjects is undefined.", "Difference.toSDL", this);

    content.push(pad + "difference {");
    content.push(ppad + this.positiveObject.toSDL(stops + 1));
    for(var i = 0; i < this.negativeObjects.length; i++) {
        content.push(ppad + this.negativeObjects[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// Disc.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.center === null)
        cpov.error("fatal", "center is undefined.", "Disc.toSDL", this);
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Disc.toSDL", this);

    content.push(pad + "disc {");
    content.push(ppad + this.center.toSDL() + ", " + this.normal.toSDL() + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));

    $Primitive.toSDL-postamble
}



// GlobalSettings.toSDL //------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the SDL for GlobalSettings. Unlike other toSDL methods, this one
// does not take a stops argument because the SDL global_settings
// declaration always happens at the top level.
//--------------------------------------------------------------------------

toSDL() {
    var contents = [ ];

    contents.push("global_settings {");

    var params = {
        adcBailout: "adc_bailout",
        ambientLight: "ambient_light",
        assumedGamma: "assumed_gamma",
        iridWavelength: "irid_wavelength",
        charset: "charset",
        maxIntersections: "max_intersections",
        maxTraceLevel: "max_trace_level",
        mmPerUnit: "mm_per_unit",
        numberOfWaves: "number_of_waves",
        noiseGenerator: "noise_generator"
    };

    var radParams = {
        radAdcBailout: "adc_bailout",
        radAlwaysSample: "always_sample",
        radBrightness: "brightness",
        radCount: "count",
        radErrorBound: "error_bound",
        radGrayThreshold: "gray_threshold",
        radLowErrorFactor: "low_error_factor",
        radMaxSample: "max_sample",
        radMaximumReuse: "maximum_reuse",
        radMinimumReuse: "minimum_reuse",
        radNearestCount: "nearest_count",
        radNormal: "normal",
        radPretraceStart: "pretrace_start",
        radPretraceEnd: "pretrace_end",
        radRecursionLimit: "recursion_limit",
        radSubsurface: "subsurface"
    };

    var subParams = {
        subRadiosity: "radiosity",
        subSamples: "samples"
    };

    var photonParams = {
        photonSpacing: "spacing",
        photonCount: "count",
        photonGather: "gather",
        photonMedia: "media",
        photonJitter: "jitter",
        photonMaxTraceLevel: "max_trace_level",
        photonAdcBailout: "adc_bailout",
        photonSaveFile: "save_file",
        photonLoadFile: "load_file",
        photonAutostop: "autostop",
        photonExpandThresholds: "expand_thresholds",
        photonRadius: "radius"
    };

    for(var i in params) {
        if(this[i] !== null)
            contents.push("    " + params[i] + " " + this[i]);
    }

    if(this.radiosity) {
        contents.push("    radiosity {");
        for(var i in radParams) {
            if(this[i] !== null)
                contents.push("        " + radParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    if(this.subsurface) {
        contents.push("    subsurface {");
        for(var i in subParams) {
            if(this[i] !== null)
                contents.push("        " + subParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    if(this.photon) {
        contents.push("    photon {");
        for(var i in photonParams) {
            if(this[i] !== null)
                contents.push("        " + photonParams[i] + " " + this[i]);
        }
        contents.push("    }");
    }

    contents.push("}");

    return contents.join("\n");
}



// HeightField.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

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
        cpov.error("fatal", "Neither filename nor userFunc is defined.", "HeightField.toSDL", this);
    }

    if(this.smooth === true)
        content.push(pad + "    smooth");
    if(this.waterLevel !== null)
        content.push(pad + "    water_level " + this.waterLevel);

    $Primitive.toSDL-postamble
}



// ImageOptions.output //-------------------------------------------------------

//--------------------------------------------------------------------------
// Performs some aggregate tests on the final state of the image options,
// and if none are found, returns an object containing two members, ini
// and cli, corresponding to the contents of the ini file and the
// commandline version, respectively.
//--------------------------------------------------------------------------

output() {
    var ini     = [];
    var cli     = [];
    var iniWarn = [];
    var cliWarn = [];

    for(var opt in cpov.ioDef) {

        if(opt != "Width" && opt != "Height" && this[opt] === null)
            continue;

        switch(opt) {
            case "allConsole":
                if(this.allFile === null) {
                    ini.push("All_Console=" + this.allConsole);
                    cli.push((this.allConsole ? "+" : "-") + "GA");
                }
                break;
            case "allFile":
                ini.push("All_File=" + this.allFile);
                cli.push(
                    (this.allConsole === null || this.allConsole === false ? "-" : "+")
                    + "GA"
                    + (typeof this.allFile == "string" ? this.allFile : "")
                );
                break;
            case "antialias":
                ini.push("Antialias=" + (this.antialias ? "true" : "false"));
                if(this.antialiasThreshold === null) {
                    cli.push((this.antialias ? "+" : "-") + "A");
                }
                break;
            case "antialiasDepth":
                ini.push("Antialias_Depth=" + this.antialiasDepth);
                cli.push("+R" + this.antialiasDepth);
                break;
            case "antialiasGamma":
                ini.push("Antialias_Gamma=" + this.antialiasGamma);
                cli.push("+AG" + this.antialiasGamma);
                break;
            case "antialiasThreshold":
                ini.push("Antialias_Threshold=" + this.antialiasThreshold);
                cli.push((this.antialias ? "+" : "-") + "A" + this.antialiasThreshold);
                break;
            case "appendFile":
                ini.push("Append_File=" + (this.appendFile ? "true" : "false"));
                cli.push((this.appendFile ? "+" : "-") + "GP");
                break;
            case "bitsPerColor":
                ini.push("Bits_Per_Color=" + this.bitsPerColor);
                break;
            case "bounding":
                ini.push("Bounding=" + (this.bounding ? "true" : "false"));
                if(this.boundingThreshold === null) {
                    cli.push((this.bounding ? "+" : "-") + "MB");
                };
                break;
            case "boundingMethod":
                ini.push("Bounding_Method=" + this.boundingMethod);
                cli.push("+BM" + this.boundingMethod);
                break;
            case "boundingThreshold":
                ini.push("Bounding_Threshold=" + this.boundingThreshold);
                cli.push(
                    (this.bounding !== null || this.bounding ? "+" : "-")
                    + "MB" + this.boundingThreshold
                );
                break;
            case "bspBaseAccessCost":
                ini.push("BSP_BaseAccessCost=" + this.bspBaseAccessCost);
                break;
            case "bspChildAccessCost":
                ini.push("BSP_ChildAccessCost=" + this.bspChildAccessCost);
                break;
            case "bspIsectCost":
                ini.push("BSP_IsectCost=" + this.bspIsectCost);
                break;
            case "bspMaxDepth":
                ini.push("BSP_MaxDepth=" + this.bspMaxDepth);
                break;
            case "bspMissChance":
                ini.push("BSP_MissChance=" + this.bspMissChance);
                break;
            case "constants":
                break;
            case "continueTrace":
                ini.push("Continue_Trace=" + this.continueTrace);
                cli.push(this.continueTrace ? "+C" : "-C");
                break;
            case "createIni":
                if(typeof this.createIni == "boolean") {
                    ini.push("Create_Ini=" + (this.createIni ? "true" : "false"));
                } else {
                    ini.push("Create_Ini=" + this.createIni);
                    cli.push("+GI" + this.createIni);
                }
                break;
            case "debugConsole":
                if(this.allConsole === null)
                    ini.push("Debug_Console=" + this.debugConsole);
                if(this.debugFile === null && this.allFile === null)
                    cli.push((this.debugConsole ? "+" : "-") + "GD");
                break;
            case "debugFile":
                if(this.optAllFile === null) {
                    ini.push("Debug_File=" + this.debugFile);
                    cli.push(
                        (this.debugConsole === null || this.debugConsole === false ? "-" : "+")
                        + "GD"
                        + (typeof this.debugFile == "string" ? this.debugFile : "")
                    );
                }
                break;
            case "display":
                ini.push("Display=" + (this.display ? "true" : "false"));
                if(this.videoMode === null)
                    cli.push(this.display ? "+D" : "-D");
                break;
            case "displayGamma":
                ini_push("Display_Gamma=" + this.displayGamma);
                break;
            case "dither":
                ini.push("Dither=" + (this.dither ? "true" : "false"));
                if(this.ditherMethod === null)
                    cli.push((this.dither ? "+" : "-") + "TH");
                break;
            case "ditherMethod":
                ini.push("Dither_Method=" + this.ditherMethod);
                cli.push((this.dither ? "+" : "-") + "TH" + this.ditherMethod);
                break;
            case "endColumn":
                ini.push("End_Column=" + this.endColumn);
                cli.push("+EC" + this.endColumn);
                break;
            case "endRow":
                ini.push("End_Row=" + this.endRow);
                cli.push("+ER" + this.endRow);
                break;
            case "fatalConsole":
                if(this.allConsole === null)
                        ini.push("Fatal_Console=" + this.fatalConsole);
                if(this.fatalFile === null && this.allFile === null)
                    cli.push((this.fatalConsole ? "+" : "-") + "GF");
                break;
            case "fatalErrorCommand":
                ini.push("Fatal_Error_Command=" + this.fatalErrorCommand);
                break;
            case "fatalErrorReturn":
                ini.push("Fatal_Error_Return=" + this.fatalErrorReturn);
                break;
            case "fatalFile":
                if(this.optAllFile === null) {
                    ini.push("Fatal_File=" + this.fatalFile);
                    cli.push(
                        (this.fatalConsole === null || this.fatalConsole === false ? "-" : "+")
                        + "GF"
                        + (typeof this.fatalFile == "string" ? this.fatalFile : "")
                    );
                }
                break;
            case "fileGamma":
                ini.push("File_Gamma=" + this.fileGamma);
                break;
            case "height":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Height=" + this.height);
                cli.push("+H" + this.height);
                break;
            case "highReproducibility":
                ini.push("High_Reproducibility=" + (this.highReproducibility ? "true" : "false"));
                if(this.highReproducibility)
                    cli.push("+HR");
                break;
            case "includeHeader":
                ini.push("Include_Header=" + this.includeHeader);
                cli.push("+HI" + this.includeHeader);
                break;
            case "inputFileName":
                ini.push("Input_File_Name=" + this.inputFileName);
                cli.push("+I" + this.inputFileName);
                break;
            case "jitter":
                ini.push("Jitter=" + (this.jitter ? "true" : "false"));
                if(this.jitterAmount === null) {
                    cli.push((this.jitter ? "+" : "-") + "J");
                }
                break;
            case "jitterAmount":
                ini.push("Jitter_Amount=" + this.jitterAmount);
                cli.push((this.jitterAmount > 0 ? "+" : "-" ) + "J" + this.jitterAmount);
                break;
            case "libraryPath":
                ini.push("Library_Path=" + this.libraryPath);
                cli.push("+L" + this.libraryPath);
                break;
            case "maxImageBufferMemory":
                ini.push("Max_Image_Buffer_Memory=" + this.maxImageBufferMemory);
                cli.push("+MI" + this.maxImageBufferMemory);
                break;
            case "outputAlpha":
                ini.push("Output_Alpha=" + (this.outputAlpha ? "true" : "false"));
                cli.push((this.outputAlpha ? "+" : "-") + "UA");
                break;
            case "outputFileName":
                ini.push("Output_File_Name=" + this.outputFileName);
                cli.push("+O" + this.outputFileName);
                break;
            case "outputFileType":
                ini.push("Output_File_Type=" + this.outputFileType);
                cli.push(
                    ((this.outputToFile === null || this.outputToFile === false) ? "-" : "+")
                    + this.outputFileType
                    + (this.bitsPerColor === null ? "" : this.bitsPerColor)
                );
                break;
            case "outputToFile":
                if(this.outputFileType === null) {
                    ini.push("Output_to_File=" + (this.outputToFile ? "true" : "false"));
                    cli.push(this.outputToFile ? "+F" : "-F");
                }
                break;
            case "palette":
                ini.push("Palette=" + this.palette);
                if(this.videoMode !== null)
                    cli.push(
                        (this.display ? "+" : "-")
                        + "D"
                        + this.videoMode + this.palette
                    );
                break;
            case "pauseWhenDone":
                ini.push("Pause_When_Done=" + (this.pauseWhenDone ? "true" : "false"));
                cli.push(this.pauseWhenDone ? "+P" : "-P");
                break;
            case "postFrameCommand":
                ini.push("Post_Frame_Command=" + this.postFrameCommand);
                break;
            case "postFrameReturn":
                ini.push("Post_Frame_Return=" + this.postFrameReturn);
                break;
            case "postSceneCommand":
                ini.push("Post_Scene_Command=" + this.postSceneCommand);
                break;
            case "postSceneReturn":
                ini.push("Post_Scene_Return=" + this.postSceneReturn);
                break;
            case "preFrameCommand":
                ini.push("Pre_Frame_Command=" + this.preFrameCommand);
                break;
            case "preFrameReturn":
                ini.push("Pre_Frame_Return=" + this.preFrameReturn);
                break;
            case "preSceneCommand":
                ini.push("Pre_Scene_Command=" + this.postSceneCommand);
                break;
            case "preSceneReturn":
                ini.push("Pre_Scene_Return=" + this.preSceneReturn);
                break;
            case "previewEndSize":
                if(this.previewStartSize !== null) {
                    ini.push("Preview_End_Size=" + this.previewEndSize);
                    cli.push("+EP" + this.previewEndSize);
                }
                break;
            case "previewStartSize":
                ini.push("Preview_Start_Size=" + this.previewStartSize);
                cli.push("+SP" + this.previewStartSize);
                break;
            case "quality":
                ini.push("Quality=" + this.quality);
                cli.push("+Q" + this.quality);
                break;
            case "radiosityFileName":
                ini.push("Radiosity_File_Name=" + this.radiosityFileName);
                cli.push("+RF" + this.radiosityFileName);
                break;
            case "radiosityFromFile":
                ini.push("Radiosity_From_File=" + (this.radiosityFromFile ? "true" : "false"));
                if(this.radiosityFromFile)
                    cli.push("+RFI");
                break;
            case "radiosityToFile":
                ini.push("Radiosity_To_File=" + (this.radiosityToFile ? "true" : "false"));
                if(this.radiosityToFile)
                    cli.push("+RFO");
                break;
            case "radiosityVainPretrace":
                ini.push("Radiosity_Vain_Pretrace=" + (this.radiosityVainPretrace ? "true" : "false"));
                cli.push(this.radiosityVainPretrace ? "+RVP" : "-RVP");
                break;
            case "removeBounds":
                ini.push("Remove_Bounds=" + (this.removeBounds ? "true" : "false"));
                cli.push((this.removeBounds ? "+" : "-") + "UR");
                break;
            case "renderBlockSize":
                ini.push("Render_Block_Size=" + this.renderBlockSize);
                cli.push("+BS" + this.renderBlockSize);
                break;
            case "renderBlockStep":
                ini.push("Render_Block_Step=" + this.renderBlockStep);
                cli.push("+RS" + this.renderBlockStep);
                break;
            case "renderConsole":
                if(this.allConsole === null)
                    ini.push("Render_Console=" + this.renderConsole);
                if(this.renderFile === null && this.allFile === null)
                    cli.push((this.renderConsole ? "+" : "-") + "GR");
                    break;
            case "renderFile":
                if(this.optAllFile === null) {
                    ini.push("Render_File=" + this.renderFile);
                    cli.push(
                        (this.renderConsole === null || this.renderConsole === false ? "-" : "+")
                        + "GR"
                        + (typeof this.renderFile == "string" ? this.renderFile : "")
                    );
                }
                break;
            case "renderPattern":
                ini.push("Render_Pattern=" + this.renderPattern);
                cli.push("+RP" + this.renderPattern);
                break;
            case "samplingMethod":
                ini.push("Sampling_Method=" + this.samplingMethod);
                cli.push("+AM" + this.samplingMethod);
                break;
            case "splitUnions":
                ini.push("Split_Unions=" + (this.splitUnions ? "true" : "false"));
                cli.push((this.splitUnions ? "+" : "-") + "SU");
                break;
            case "startColumn":
                ini.push("Start_Column=" + this.startColumn);
                cli.push("+SC" + this.startColumn);
                break;
            case "startRow":
                ini.push("Start_Row=" + this.startRow);
                cli.push("+SR" + this.startRow);
                break;
            case "statisticConsole":
                if(this.allConsole === null)
                    ini.push("Statistic_Console=" + this.statisticConsole);
                if(this.statisticFile === null && this.allFile === null)
                    cli.push((this.statisticConsole ? "+" : "-") + "GS");
                break;
            case "statisticFile":
                if(this.optAllFile === null) {
                    ini.push("Statistic_File=" + this.statisticFile);
                    cli.push(
                        (this.statisticConsole === null || this.statisticConsole === false ? "-" : "+")
                        + "GS"
                        + (typeof this.statisticFile == "string" ? this.statisticFile : "")
                    );
                }
                break;
            case "testAbort":
                if(this.testAbortCount !== null) {
                    ini.push("Test_Abort=" + (this.testAbort ? "true" : "false"));
                    cli.push(this.testAbort ? "+X" : "-X");
                }
                break;
            case "testAbortCount":
                ini.push("Test_Abort_Count=" + this.testAbortCount);
                if(this.testAbort !== null)
                    cli.push((this.testAbort ? "+" : "-") + "X" + this.testAbortCount)
                else
                    cli.push("+X" + this.testAbortCount);
                break;
            case "userAbortCommand":
                ini.push("User_Abort_Command=" + this.userAbortCommand);
                break;
            case "userAbortReturn":
                ini.push("User_Abort_Return=" + this.userAbortReturn);
                break;
            case "verbose":
                ini.push("Verbose=" + (this.verbose ? "true" : "false"));
                cli.push(this.verbose ? "+V" : "-V");
                break;
            case "videoMode":
                ini.push("Video_Mode=" + this.videoMode);
                if(this.palette === null)
                    cli.push((this.videoMode ? "+" : "-") + "D" + this.videoMode);
                break;
            case "warningConsole":
                if(this.allConsole === null)
                    ini.push("Warning_Console=" + this.warningConsole);
                if(this.warningFile === null && this.allFile === null)
                    cli.push((this.warningConsole ? "+" : "-") + "GW");
                break;
            case "warningFile":
                if(this.optAllFile === null) {
                    ini.push("Warning_File=" + this.warningFile);
                    cli.push(
                        (this.warningConsole === null || this.warningConsole === false ? "-" : "+")
                        + "GW"
                        + (typeof this.warningFile == "string" ? this.warningFile : "")
                    );
                }
                break;
            case "warningLevel":
                ini.push("Warning_Level=" + this.warningLevel);
                cli.push("+WL" + this.warningLevel);
                break;
            case "width":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Width=" + this.width);
                cli.push("+W" + this.width);
                break;
            case "workThreads":
                ini.push("Work_Threads=" + this.workThreads);
                cli.push("+WT" + this.workThreads);
                break;
            default:
                break;
        }
    }

    cli.unshift(this.exePath === null ? "povray" : this.exePath);

    return { ini: ini.join("\n"), cli: cli.join(" ") };

}



// Intersection.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Intersection.toSDL", this);

    content.push(pad + "intersection {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// JuliaFractal.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "JuliaFractal.toSDL", this);
    if(this.juliaParam === null)
        cpov.error("fatal", "juliaParam is undefined.", "JuliaFractal.toSDL", this);
	if((this.slice !== null && this.distance === null) || (this.slice === null && this.distance !== null))
		cpov.error("fatal", "To use either, both slice and distance must be specified together.", "JuliaFractal.toSDL", this);

	var parts = this.type.split(/:/);

    content.push(pad + "julia_fractal {");
	content.push(ppad + this.juliaParam.toSDL());
	if(this.slice !== null)
		content.push(ppad + this.type.toSDL());
	content.push(ppad + parts[0]); // algebra type
	content.push(ppad + parts[1]); // function type
	if(this.maxIter !== null)
		content.push(ppad + "max_iteration " + this.maxIter);
	if(this.precision !== null)
		content.push(ppad + "precision " + this.precision);
	if(this.slice !== null)
		content.push(ppad + this.slice.toSDL() + ", " + this.distance);

    $Primitive.toSDL-postamble
}



// Lathe.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "Lathe.toSDL", this);
	if(this.points === null)
		cpov.error("fatal", "points is undefined.", "Lathe.toSDL", this);
	// TODO: add check for correct minimum number of points

    content.push(pad + "lathe {");
	content.push(ppad + cpov.splineTypes[this.type]);

	var items = [ ];
	for(var i = 0; i < this.points.length; i++)
		items.push(this.points[i].toSDL());
	content.push(ppad + items.join(", "));

	if(this.sturm)
		content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// LightSource.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.location === null)
        cpov.error("fatal", "location is undefined.", "LightSource.toSDL", this);
    if(this.color === null)
        cpov.error("fatal", "color is undefined.", "LightSource.toSDL", this);

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



// Matrix-methods //------------------------------------------------------------

//--------------------------------------------------------------------------
// Given another Matrix, that, returns a new Matrix this * that.
//--------------------------------------------------------------------------

xMatrix(that) {

    if(!cpov.isClass(that, "Matrix"))
        cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix", this);

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
        cpov.error("fatal", "point is not a VectorXYZ.", "Matrix.xPoint", this);

    return new VectorXYZ(
        this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
        this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
        this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
    );
}



// Matrix.conBlock //-----------------------------------------------------------

this._v01 = this._v02 = this._v10 = this._v12 = this._v20 = this._v21
	= this._v30 = this._v31 = this._v32 = 0;

this._v00 = this._v11 = this._v22 = 1; // scale identity

if(v00 == "scale") {

    this.v00 = v01; // x
    this.v11 = v02; // y
    this.v22 = v10; // z

} else if(v00 == "rotate") {

    // TODO
    cpov.error("fatal", "The rotate initializer is not implemented yet.", "Matrix.constructor", this);

} else if(v00 == "translate") {

    this.v30 = v01; // x
    this.v31 = v02; // y
    this.v32 = v10; // z

} else if(v00 == "skew") {

    // TODO
    cpov.error("fatal", "The skew initializer is not implemented yet.", "Matrix.constructor", this);

} else {

    this.v00 = v00;
    this.v01 = v01;
    this.v02 = v02;
    this.v10 = v10;
    this.v11 = v11;
    this.v12 = v12;
    this.v20 = v20;
    this.v21 = v21;
    this.v22 = v22;
    this.v30 = v30;
    this.v31 = v31;
    this.v32 = v32;

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



// Merge.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Merge.toSDL", this);

    content.push(pad + "merge {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// Ovus.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.topRadius === null)
        cpov.error("fatal", "topRadius is undefined.", "Ovus.toSDL", this);
    if(this.bottomRadius === null)
        cpov.error("fatal", "bottomRadius is undefined.", "Ovus.toSDL", this);

    content.push(pad + "ovus {");
    content.push(ppad + this.topRadius + ", " + this.bottomRadius);

    $Primitive.toSDL-postamble
}



// Parametric.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.funcX === null)
		cpov.error("fatal", "funcX is undefined.", "Parametric.toSDL", this);
	if(this.funcY === null)
		cpov.error("fatal", "funcY is undefined.", "Parametric.toSDL", this);
	if(this.funcZ === null)
		cpov.error("fatal", "funcZ is undefined.", "Parametric.toSDL", this);
	if(this.uv1 === null)
		cpov.error("fatal", "uv1 is undefined.", "Parametric.toSDL", this);
	if(this.uv2 === null)
		cpov.error("fatal", "uv2 is undefined.", "Parametric.toSDL", this);

	content.push(pad + "parametric {");
	content.push(ppad + this.funcX);
    content.push(ppad + this.funcY);
    content.push(ppad + this.funcZ);
    content.push(ppad + this.uv1.toSDL() + ", " + this.uv2.toSDL());

    if(this.containedBy)
        content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(stops + 2) + "\n}");
    if(this.maxGradient !== null)
        content.push(ppad + "max_gradient " + this.maxGradient);
    if(this.accuracy !== null)
        content.push(ppad + "accuracy " + this.accuracy);
    if(this.precomputeDepth && (this.precomputeX || this.precomputeY || this.precomputeZ)) {
        var items = [ ];
        if(this.precomputeX)
            items.push("x");
        if(this.precomputeY)
            items.push("y");
        if(this.precomputeZ)
            items.push("z");
        content.push(ppad + "precompute " + this.precomputeDepth + " " + items.join(", "));
    }

	$Primitive.toSDL-postamble

}



// Plane.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.normal === null)
		cpov.error("fatal", "normal is undefined.", "Sphere.toSDL", this);
	if(this.distance === null)
		cpov.error("fatal", "distance is undefined.", "Sphere.toSDL", this);

	content.push(pad + "plane {");
	content.push(ppad + this.normal.toSDL() + ", " + this.distance);

    $Primitive.toSDL-postamble

}



// Poly.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.order === null)
		cpov.error("fatal", "order is undefined.", "Poly.toSDL", this);
    if(this.coefficients === null)
        cpov.error("fatal", "coefficients is undefined.", "Poly.toSDL", this);

    var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;

    if(this.coefficients.length != ccnt)
        cpov.error("fatal", "A Poly of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Poly.toSDL", this);

	content.push(pad + "poly {");
    var items = this.coefficents.slice(0);
    items.unshift(this.order);
	content.push(ppad + this.items.join(", "));
    if(this.sturm)
        content.push(ppad + "sturm")

    $Primitive.toSDL-postamble

}



// Polygon.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.points === null)
		cpov.error("fatal", "points is undefined.", "Polygon.toSDL", this);
  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Polygon.toSDL", this);

	content.push(pad + "polygon {");
	content.push(ppad + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(points[i].toSDL());
    }
    content.push(ppad + items.join(", "));

    $Primitive.toSDL-postamble

}



// Primitive.conBlock //--------------------------------------------------------

this.active = true;
cpov.initObject(this, options);

// Create serial number and register with cpov object

cpov.objectSerial++;
this.serial = cpov.objectSerial;
cpov.serialMap[this.serial] = this;



// Primitive.copyCommonFrom //--------------------------------------------------

copyFrom(obj) {
    this.active           = obj.active;
    this.baseTransform    = obj.baseTransform;
    this.boundedBy        = obj.boundedBy;
    this.children         = obj.children;
    this.clippedBy        = obj.clippedBy;
    this.doubleIlluminate = obj.doubleIlluminate;
    this.finish           = obj.finish;
    this.frameBegin       = obj.frameBegin;
    this.frameEnd         = obj.frameEnd;
    this.hollow           = obj.hollow;
    this.id               = obj.id;
    this.interior         = obj.interior;
    this.inverse          = obj.inverse;
    this.material         = obj.material;
    this.noImage          = obj.noImage;
    this.noRadiosity      = obj.noRadiosity;
    this.noReflection     = obj.noReflection;
    this.noShadow         = obj.noShadow;
    this.parent           = obj.parent;
    this.photons          = obj.photons;
    this.radiosity        = obj.radiosity;
    this.serial           = obj.serial;
    this.texture          = obj.texture;
    this.transform        = obj.transform;
}

// Primitive.destroy //---------------------------------------------------------

destroy() {
    delete cpov.serialMap(this.serial);
    if(this.id)
        delete cpov.idMap(this.id);
}



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



// Primitive.toSDL-postamble //-------------------------------------------------

content.push(super.toSDL(stops + 1));
content.push(pad + "}");

return content.join("\n");



// Primitive.toSDL-preamble //--------------------------------------------------

if(!this.active)
    return "";

var pad     = cpov.tab(stops);
var ppad    = cpov.tab(stops + 1);
var content = [ ];



// Primitive.transform.get-set //-----------------------------------------------

//--------------------------------------------------------------------------
// CephaloPOV primitives differ from their SDL substrates in having an
// immutable baseTransform which is retained even as additional transforms
// are applied at runtime. The first time transform is read or written, we
// copy the baseTransform to transform and then perform the requested
// action.
//--------------------------------------------------------------------------

get transform() {

    if(this._transform === null) {
        if(this._baseTransform === null) {
            cpov.error("fatal", "transform cannot be read until baseTransform is set.", "Primitive.transform", this);
        } else {
            this.transform = this.baseTransform;
        }
    }

    if(typeof this._transform == "function")
        return this._transform();
    else if(typeof this._transform == "string" && this._transform.substr(0, 1) == "&")
        return this._transform.substr(1);
    else
        return this._transform;
}

set transform(val) {

    if(val === null) {                       // essentially the same as transformReset
        this._transform = null;
        return;
    }

    if(cpov.isSDLFunction(val)) {     // can't do math with SDL functions
        cpov.error("fatal", "transform cannot be an SDL function.", "Primitive.transform", this);
        return;
    }

    if(typeof val == "function") {
        val = val();
    }

    if(!cpov.isClass(val, "Matrix"))
        cpov.error("fatal", "transform value must evaluate to a Matrix.", "Primitive.transform", this);

    this._transform = val.xMatrix(this.transform);

}



// Prism.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.type === null)
		cpov.error("fatal", "type is undefined.", "Prism.toSDL", this);
    if(this.height1 === null)
        cpov.error("fatal", "height1 is undefined.", "Prism.toSDL", this);
    if(this.height2 === null)
        cpov.error("fatal", "height2 is undefined.", "Prism.toSDL", this);
	if(this.points === null)
		cpov.error("fatal", "points is undefined.", "Prism.toSDL", this);
  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Prism.toSDL", this);

	content.push(pad + "prism {");
    content.push(ppad + cpov.prismTypes(this.type));
    content.push(ppad + this.height1 + ", " + this.height2 + ", " + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(points[i].toSDL());
    }
    content.push(ppad + items.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble

}



// Quadric.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.coefficients === null)
        cpov.error("fatal", "coefficients is undefined.", "Quadric.toSDL", this);

    content.push(pad + "quartic {");
    content.push(
        ppad
        + "<" + this.coefficients[0] + ", " + this.coefficients[1] + ", " + this.coefficients[2] + ">, " +
        + "<" + this.coefficients[3] + ", " + this.coefficients[4] + ", " + this.coefficients[5] + ">, " +
        + "<" + this.coefficients[6] + ", " + this.coefficients[7] + ", " + this.coefficients[8] + ">, " +
        + this.coefficients[9]
    );

    $Primitive.toSDL-postamble
}



// Quartic.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.coefficients === null)
        cpov.error("fatal", "coefficients is undefined.", "Quartic.toSDL", this);

    content.push(pad + "quartic {");
    content.push(ppad + this.coefficients.join(", "));
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Sor.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.points === null)
        cpov.error("fatal", "points is undefined.", "Sor.toSDL", this);
    if(this.points.length < 2)
        cpov.error("fatal", "points must contain at least two VectorXY.", "Sor.toSDL", this);

    content.push(pad + "sor {");
    var items = [ this.points.length ];
    for(var i = 0; i < this.points.length; i++)
        items.push(this.points[i].toSDL());
    content.push(ppad + items.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Sphere.toSDL //--------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.center === null)
        cpov.error("fatal", "center is undefined.", "Sphere.toSDL", this);
    if(this.radius === null)
        cpov.error("fatal", "radius is undefined.", "Sphere.toSDL", this);

    content.push(pad + "sphere {");
    content.push(ppad + this.center.toSDL() + ", " + this.radius);

    $Primitive.toSDL-postamble
}



// SphereSweep.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type === null)
        cpov.error("fatal", "type is undefined.", "SphereSweep.toSDL", this);
    if(this.spheres === null)
        cpov.error("fatal", "spheres is undefined.", "SphereSweep.toSDL", this);
    if(this.type == "linearSpline" && this.spheres.length < 2)
        cpov.error("fatal", "A linear spline requires at least two spheres.", "SphereSweep.toSDL", this);
    else if((this.type == "bezierSpline" || this.type == "cubicSpline") && this.spheres.length < 4)
        cpov.error("fatal", "Bezier and cubic splines require at least four spheres.", "SphereSweep.toSDL", this);

    content.push(pad + "sphere_sweep {");
    content.push(ppad + this.type);
    content.push(ppad + this.spheres.length + ",");
    var items = [ ];
    for(var i = 0; i < this.spheres.length; i++) {
        items.push(ppad + this.spheres[i].center.toSDL() + ", " + this.spheres[i].radius);
    }
    content.push(items.join(",\n"));
    if(this.tolerance !== null)
        content.push(ppad + "tolerance " + this.tolerance);

    $Primitive.toSDL-postamble
}



// Superellipsoid.toSDL //------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.e === null)
        cpov.error("fatal", "e is undefined.", "Superellipsoid.toSDL", this);
    if(this.n === null)
        cpov.error("fatal", "n is undefined.", "Superellipsoid.toSDL", this);

    content.push(pad + "superellipsoid {");
    content.push(ppad + "<" + this.e + ", " + this.n + ">");

    $Primitive.toSDL-postamble
}



// Text.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.fontType === null)
        cpov.error("fatal", "fontType is undefined.", "Text.toSDL", this);
    if(this.font === null)
        cpov.error("fatal", "font is undefined.", "Text.toSDL", this);
    if(this.displayText === null)
        cpov.error("fatal", "displayText is undefined.", "Text.toSDL", this);
    if(this.thickness === null)
        cpov.error("fatal", "thickness is undefined.", "Text.toSDL", this);
    if(this.offset === null)
        cpov.error("fatal", "offset is undefined.", "Text.toSDL", this);

    // TODO: Handle escaping of double quotes in this.displayText

    content.push(pad + "text {");
    content.push(ppad + this.fontType + " " + "\"" + this.font + "\"");
    content.push(ppad + this.thickness + ", " + this.offset);

    $Primitive.toSDL-postamble
}



// Torus.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.majorRadius === null)
        cpov.error("fatal", "majorRadius is undefined.", "Torus.toSDL", this);
    if(this.minorRadius === null)
        cpov.error("fatal", "minorRadius is undefined.", "Torus.toSDL", this);

    content.push(pad + "torus {");
    content.push(ppad + this.majorRadius + ", " + this.minorRadius);

    $Primitive.toSDL-postamble

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

    $Primitive.toSDL-preamble

    if(this.corner1 === null)
        cpov.error("fatal", "corner1 is undefined.", "Triangle.toSDL", this);
    if(this.corner2 === null)
        cpov.error("fatal", "corner2 is undefined.", "Triangle.toSDL", this);
    if(this.corner3 === null)
        cpov.error("fatal", "corner3 is undefined.", "Triangle.toSDL", this);

    if(this.smooth) {

        content.push(pad + "triangle {");
        content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL() + ", " + this.corner3.toSDL());

    } else {

        if(this.normal1 === null)
            cpov.error("fatal", "normal1 is undefined.", "Triangle.toSDL", this);
        if(this.normal2 === null)
            cpov.error("fatal", "normal2 is undefined.", "Triangle.toSDL", this);
        if(this.normal3 === null)
            cpov.error("fatal", "normal3 is undefined.", "Triangle.toSDL", this);

        content.push(pad + "smooth_triangle {");
        content.push(ppad
            + this.corner1.toSDL() + ", " + this.normal1.toSDL() + ", "
            + this.corner2.toSDL() + ", " + this.normal2.toSDL() + ", "
            + this.corner3.toSDL() + ", " + this.normal3.toSDL());

    }

    $Primitive.toSDL-postamble
}



// Union.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.objects === null)
        cpov.error("fatal", "objects is undefined.", "Union.toSDL", this);

    content.push(pad + "merge {");
    for(var i = 0; i < this.objects.length; i++) {
        content.push(ppad + this.objects[i].toSDL(stops + 1));
    }
    content.push(pad + "    split_union " + (this._splitUnion ? "on" : "off"));

    $Primitive.toSDL-postamble
}



// VectorUV.conBlock //---------------------------------------------------------

if(cpov.isClass(options, "VectorUV")) { // copy
    options = { u: options.u, v: options.v };
}

if(Array.isArray(options)) {
    if(options.length != 2) {
        cpov.error("fatal", "When initializing a VectorUV with an array, it must have exactly two values.", "VectorUV.constructor", this);
    } else {
        this.u = options[0];
        this.v = options[1];
    }
} else if(typeof options == "object") {
    if(options.u === undefined || options.v === undefined)
        cpov.error("fatal", "When initializing a VectorUV with an object, u and v must be defined.", "VectorUV.constructor", this);
    cpov.initObject(this, options);
} else {
    cpov.error("fatal", "Invalid initializer.", "VectorUV.constructor", this);
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



// VectorUV.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.u === null)
        cpov.error("fatal", "u is undefined.", "VectorUV.toSDL", this);
    if(this.v === null)
        cpov.error("fatal", "v is undefined.", "VectorUV.toSDL", this);

    return cpov.tab(stops) + "<" + this.u + ", " + this.v + ">";
}



// VectorXY.conBlock //---------------------------------------------------------

if(cpov.isClass(options, "VectorXY")) { // copy
    options = { x: options.x, y: options.y };
}

if(Array.isArray(options)) {
    if(options.length != 2) {
        cpov.error("fatal", "When initializing a VectorXY with an array, it must have exactly two values.", "VectorXY.constructor", this);
    } else {
        this.x = options[0];
        this.y = options[1];
    }
} else if(typeof options == "object") {
    if(options.x === undefined || options.y === undefined)
        cpov.error("fatal", "When initializing a VectorXY with an object, x and y must be defined.", "VectorXY.constructor", this);
    cpov.initObject(this, options);
} else {
    cpov.error("fatal", "Invalid initializer.", "VectorXY.constructor", this);
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



// VectorXY.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXY.toSDL", this);
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXY.toSDL", this);

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ">";
}



// VectorXYZ.conBlock //--------------------------------------------------------

if(cpov.isClass(options, "VectorXYZ")) { // copy
    options = { x: options.x, y: options.y, z: options.z };
}

if(Array.isArray(options)) {
    if(options.length != 3) {
        cpov.error("fatal", "When initializing a VectorXYZ with an array, it must have exactly three values.", "VectorXYZ.constructor", this);
    } else {
        this.x = options[0];
        this.y = options[1];
        this.z = options[2];
    }
} else if(typeof options == "object") {
    if(options.x === undefined || options.y === undefined || options.z === undefined)
        cpov.error("fatal", "When initializing a VectorXYZ with an object, x, y and z must be defined.", "VectorXYZ.constructor", this);
    cpov.initObject(this, options);
} else {
    cpov.error("fatal", "Invalid initializer.", "VectorXYZ.constructor", this);
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



// VectorXYZ.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXYZ.toSDL", this);
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXYZ.toSDL", this);
    if(this.z === null)
        cpov.error("fatal", "z is undefined.", "VectorXYZ.toSDL", this);

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ">";
}



// VectorXYZW.conBlock //-------------------------------------------------------

if(cpov.isClass(options, "VectorXYZW")) { // copy
    options = { x: options.x, y: options.y, z: options.z, w: options.w };
}

if(Array.isArray(options)) {
    if(options.length != 4) {
        cpov.error("fatal", "When initializing a VectorXYZW with an array, it must have exactly four values.", "VectorXYZW.constructor", this);
    } else {
        this.x = options[0];
        this.y = options[1];
        this.z = options[2];
        this.w = options[3];
    }
} else if(typeof options == "object") {
    if(options.x === undefined || options.y === undefined || options.z === undefined || options.w === undefined)
        cpov.error("fatal", "When initializing a VectorXYZW with an object, x, y, z, and w must be defined.", "VectorXYZW.constructor", this);
    cpov.initObject(this, options);
} else {
    cpov.error("fatal", "Invalid initializer.", "VectorXYZW.constructor", this);
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



// VectorXYZW.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(this.x === null)
        cpov.error("fatal", "x is undefined.", "VectorXYZW.toSDL", this);
    if(this.y === null)
        cpov.error("fatal", "y is undefined.", "VectorXYZW.toSDL", this);
    if(this.z === null)
        cpov.error("fatal", "z is undefined.", "VectorXYZW.toSDL", this);
    if(this.w === null)
        cpov.error("fatal", "w is undefined.", "VectorXYZW.toSDL", this);

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
}



