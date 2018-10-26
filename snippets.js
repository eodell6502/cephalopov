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

    content.push(pad + "bicubic_patch {" + (this.id === null ? "" : " // " + this.id));
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
		content.push(ppad + items.join(", ") + (row != 3 ? "," : ""));
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

    content.push(pad + "blob {" + (this.id === null ? "" : " // " + this.id));
	if(this.threshold !== null)
		content.push(ppad + "threshold " + this.threshold);
    var components = this.components;
	if(cpov.isSDLFunction(components)) {
		content.push(ppad + this.components);
	} else { // array
		for(var i = 0; i < components.length; i++) {
			content.push(components[i].toSDL(stops + 1, true));
		}
	}
	if(this.hierarchy !== null)
		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));
	if(this.sturm)
		content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Box.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "box {" + (this.id === null ? "" : " // " + this.id));
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

    if(this.type == "cylinder" && this.cylinderType === null)
        cpov.error("type is cylinder but cylinderType is undefined.", "Camera.toSDL", this);
    else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null)))
        cpov.error("The orthographic camera requires either angle or up and right to be defined.", "Camera.toSDL", this);

    content.push(pad + "camera {" + (this.id === null ? "" : " // " + this.id));
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



// Color.toPlainRGBVector //----------------------------------------------------

//------------------------------------------------------------------------------
// Produces a minimal RGB vector literal -- <0.5, 0.2, 1.0> -- as is needed in
// globalSettings and other places.
//------------------------------------------------------------------------------

toPlainRGBVector(stops = 0) {

    stops = cpov.tab(stops);

    if(this.r === null)
        cpov.error("fatal", "r is undefined.", "Color.toSDL", this);
    if(this.g === null)
        cpov.error("fatal", "g is undefined.", "Color.toSDL", this);
    if(this.b === null)
        cpov.error("fatal", "b is undefined.", "Color.toSDL", this);

    return stops + " <" + this.r + ", " + this.g + ", " + this.b + ">";
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

    content.push(pad + "cone {" + (this.id === null ? "" : " // " + this.id));
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

    content.push(pad + "cubic {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + "< " + this.coefficients.join(", ") + " >");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Cylinder.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0, component = false) {

    $Primitive.toSDL-preamble

    if(component) {
        return pad + "cylinder { " + this.basePoint.toSDL() + ", "
            + this.capPoint.toSDL() + ", " + this.radius
            + (this.strength !== null ? ", " + this.strength : "")
            + " }";
    } else {
        content.push(pad + "cylinder {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
        if(this.open)
            content.push(pad + "    open");
        $Primitive.toSDL-postamble
    }
}



// Difference.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "difference {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.positiveComponent.toSDL(stops + 1));
    for(var i = 0; i < this.negativeComponents.length; i++) {
        content.push(ppad + this.negativeComponents[i].toSDL(stops + 1));
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

    content.push(pad + "disc {" + (this.id === null ? "" : " // " + this.id));
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

    if(this.photonSpacing !== null && this.photonCount !== null)
        cpov.error("fatal", "photonSpacing and photonCount cannot be defined simultaneously.", "GlobalSettings", this);

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
        if(this[i] !== null) {
            if(Array.isArray(this[i]))
                contents.push("    " + params[i] + " " + this[i].join(", "));
            else if(this[i].toPlainRGBVector === undefined)
                contents.push("    " + params[i] + " " + this[i]);
            else
                contents.push("    " + params[i] + " " + this[i].toPlainRGBVector());
        }
    }

    if(this.radiosity) {
        contents.push("    radiosity {");
        for(var i in radParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + radParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + radParams[i] + " " + this[i]);
            }
        }
        contents.push("    }");
    }

    if(this.subsurface) {
        contents.push("    subsurface {");
        for(var i in subParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + subParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + subParams[i] + " " + this[i]);
            }
        }
        contents.push("    }");
    }

    if(this.photon) {
        contents.push("    photon {");
        for(var i in photonParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + photonParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + photonParams[i] + " " + this[i]);
            }
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

    content.push(pad + "height_field {" + (this.id === null ? "" : " // " + this.id));
    if(cpov.isSDLFunction(this.source)) {
        content.push(pad + "    " + this.userFunc);
    } else {
        content.push(
            ppad
            + (this.hfType === null ? "" : (this.hfType + " "))
            + '"' + this.source + '" '
            + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
            + (this.premult === null ? "" : "premult " + (this.premult ? "on" : "off"))
        );
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

    for(var i = 0; i < cpov.ioDef.mutable.length; i++) {

        var opt = cpov.ioDef.mutable[i].name;

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
                ini.push("Display_Gamma=" + this.displayGamma);
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

    content.push(pad + "intersection {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(ppad + this.components[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// IsoSurface.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "isosurface {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.source);
    if(this.containedBy !== null)
        content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(2) + "\n" + ppad + "}");
    if(this.threshold !== null)
        content.push(ppad + "threshold " + this.threshold);
    if(this.accuracy !== null)
        content.push(ppad + "accuracy " + this.accuracy);
    if(this.maxGradient !== null)
        content.push(ppad + "max_gradient " + this.maxGradient);
    if(this.evaluate !== null)
        content.push(ppad + "evaluate " + this.evaluate.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.maxTrace !== null)
        content.push(ppad + "max_trace " + this.maxTrace);

    $Primitive.toSDL-postamble
}



// JuliaFractal.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if((this.slice !== null && this.distance === null) || (this.slice === null && this.distance !== null))
		cpov.error("fatal", "To use either, both slice and distance must be specified together.", "JuliaFractal.toSDL", this);

	var parts = this.type.split(/:/);

    content.push(pad + "julia_fractal {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.juliaParam.toSDL());
	content.push(ppad + parts[0]); // algebra type
	content.push(ppad + parts[1]); // function type
	if(this.maxIter !== null)
		content.push(ppad + "max_iteration " + this.maxIter);
	if(this.precision !== null)
		content.push(ppad + "precision " + this.precision);
	if(this.slice !== null)
		content.push(ppad + "slice " + this.slice.toSDL() + ", " + this.distance);

    $Primitive.toSDL-postamble
}



// Lathe.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	// TODO: add check for correct minimum number of points

    content.push(pad + "lathe {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + cpov.splineTypes[this.type]);

	var items = [ ];
	for(var i = 0; i < this.points.length; i++)
		items.push(this.points[i].toSDL());
	content.push(ppad + items.length + ", " + items.join(", "));

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

    content.push(pad + "light_source {" + (this.id === null ? "" : " // " + this.id));
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
        content.push(ppad + "point_at " + this.pointAt.toSDL());

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



// Matrix //--------------------------------------------------------------------

//==============================================================================
// Matrix class. This was originally generated along with the Vector/Color
// classes, but the need for efficient computation that I couldn't readily get
// from codegen made it easier to copy the original generated code over to
// the snippets file and use it as a starting point for a largely hand-coded
// class.
//
// FIXME: There is squat for validation in the constructor subroutines.
//==============================================================================

class Matrix {

    constructor(v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32) {

        // Initialization //

        this.raw = [ // private array representation
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			0, 0, 0
		];

		if(cpov.isArrayOfFloats(v00) && v00.length == 12) {

			this.raw = v00.slice(0);

		} else if(v00 == "scale") {

            this.raw[0] = v01; // x
            this.raw[4] = v02; // y
            this.raw[8] = v10; // z

        } else if(v00 == "rotate") {

			if(v01 != 0) {                             // X
				this.raw = Matrix._xMatrix(this.raw, [
					1,              0,             0,
					0,  Math.cos(v01), Math.sin(v01),
					0, -Math.sin(v01), Math.cos(v01),
					0,              0,             0
				]);
			}

			if(v02 != 0) {                             // Y
				this.raw = Matrix._xMatrix(this.raw, [
					Math.cos(v02), 0, -Math.sin(v02),
					0,             1,              0,
					Math.sin(v02), 0,  Math.cos(v02),
					0,             0,              0
				]);
			}

			if(v10 != 0) {                             // Z
				this.raw = Matrix._xMatrix(this.raw, [
					 Math.cos(v10), Math.sin(v10), 0,
					-Math.sin(v10), Math.cos(v10), 0,
								 0,             0, 1,
								 0,             0, 0
				]);
			}

        } else if(v00 == "translate") {

            this.raw[9]  = v01; // x
            this.raw[10] = v02; // y
            this.raw[11] = v10; // z

        } else if(v00 == "skew") {

            // Since there are six possible values for skew xforms as
			// opposed to three for the others, just taking them as a list
			// doesn't buy the user much. So instead, they pass an object
			// with the axis-pairs they're interested in as labels: yx, zx,
			// xy, zy, xz, and yz.

			this.raw[1] = v01.yx === undefined ? 0 : v01.yx;
			this.raw[2] = v01.zx === undefined ? 0 : v01.zx;
			this.raw[3] = v01.xy === undefined ? 0 : v01.xy;
			this.raw[5] = v01.zy === undefined ? 0 : v01.zy;
			this.raw[6] = v01.xz === undefined ? 0 : v01.xz;
			this.raw[7] = v01.yz === undefined ? 0 : v01.yz;

        } else {

            this.raw = [ v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31,
				v32 ];

        }


    }

    //--------------------------------------------------------------------------

    get v00() {
        if(typeof this.raw[0] == "function")
            return this.raw[0]();
        else if(cpov.isSDLFunction(this.raw[0]))
            return this.raw[0].substr(1);
        else
            return this.raw[0];
    }

    set v00(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[0] = val;
        } else {
            cpov.error("fatal", "v00 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v01() {
        if(typeof this.raw[1] == "function")
            return this.raw[1]();
        else if(cpov.isSDLFunction(this.raw[1]))
            return this.raw[1].substr(1);
        else
            return this.raw[1];
    }

    set v01(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[1] = val;
        } else {
            cpov.error("fatal", "v01 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v02() {
        if(typeof this.raw[2] == "function")
            return this.raw[2]();
        else if(cpov.isSDLFunction(this.raw[2]))
            return this.raw[2].substr(1);
        else
            return this.raw[2];
    }

    set v02(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[2] = val;
        } else {
            cpov.error("fatal", "v02 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v10() {
        if(typeof this.raw[3] == "function")
            return this.raw[3]();
        else if(cpov.isSDLFunction(this.raw[3]))
            return this.raw[3].substr(1);
        else
            return this.raw[3];
    }

    set v10(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[3] = val;
        } else {
            cpov.error("fatal", "v10 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v11() {
        if(typeof this.raw[4] == "function")
            return this.raw[4]();
        else if(cpov.isSDLFunction(this.raw[4]))
            return this.raw[4].substr(1);
        else
            return this.raw[4];
    }

    set v11(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[4] = val;
        } else {
            cpov.error("fatal", "v11 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v12() {
        if(typeof this.raw[5] == "function")
            return this.raw[5]();
        else if(cpov.isSDLFunction(this.raw[5]))
            return this.raw[5].substr(1);
        else
            return this.raw[5];
    }

    set v12(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[5] = val;
        } else {
            cpov.error("fatal", "v12 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v20() {
        if(typeof this.raw[6] == "function")
            return this.raw[6]();
        else if(cpov.isSDLFunction(this.raw[6]))
            return this.raw[6].substr(1);
        else
            return this.raw[6];
    }

    set v20(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[6] = val;
        } else {
            cpov.error("fatal", "v20 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v21() {
        if(typeof this.raw[7] == "function")
            return this.raw[7]();
        else if(cpov.isSDLFunction(this.raw[7]))
            return this.raw[7].substr(1);
        else
            return this.raw[7];
    }

    set v21(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[7] = val;
        } else {
            cpov.error("fatal", "v21 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v22() {
        if(typeof this.raw[8] == "function")
            return this.raw[8]();
        else if(cpov.isSDLFunction(this.raw[8]))
            return this.raw[8].substr(1);
        else
            return this.raw[8];
    }

    set v22(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[8] = val;
        } else {
            cpov.error("fatal", "v22 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v30() {
        if(typeof this.raw[9] == "function")
            return this.raw[9]();
        else if(cpov.isSDLFunction(this.raw[9]))
            return this.raw[9].substr(1);
        else
            return this.raw[9];
    }

    set v30(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[9] = val;
        } else {
            cpov.error("fatal", "v30 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v31() {
        if(typeof this.raw[10] == "function")
            return this.raw[10]();
        else if(cpov.isSDLFunction(this.raw[10]))
            return this.raw[10].substr(1);
        else
            return this.raw[10];
    }

    set v31(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[10] = val;
        } else {
            cpov.error("fatal", "v31 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v32() {
        if(typeof this.raw[11] == "function")
            return this.raw[11]();
        else if(cpov.isSDLFunction(this.raw[11]))
            return this.raw[11].substr(1);
        else
            return this.raw[11];
    }

    set v32(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[11] = val;
        } else {
            cpov.error("fatal", "v32 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        return new Matrix(this.raw);

    }

    //--------------------------------------------------------------------------
    // A private method for multiplying matrices in the form of arrays of 12
    // elements, returning the same.
    //--------------------------------------------------------------------------

    static _xMatrix(a, b) {
    	return [
            /* v00] */ (a[0] * b[0] + a[1]  * b[3] + a[2]  * b[6]),
            /* v01] */ (a[0] * b[1] + a[1]  * b[4] + a[2]  * b[7]),
            /* v02] */ (a[0] * b[2] + a[1]  * b[5] + a[2]  * b[8]),
            /* v10] */ (a[3] * b[0] + a[4]  * b[3] + a[5]  * b[6]),
            /* v11] */ (a[3] * b[1] + a[4]  * b[4] + a[5]  * b[7]),
            /* v12] */ (a[3] * b[2] + a[4]  * b[5] + a[5]  * b[8]),
            /* v20] */ (a[6] * b[0] + a[7]  * b[3] + a[8]  * b[6]),
            /* v21] */ (a[6] * b[1] + a[7]  * b[4] + a[8]  * b[7]),
            /* v22] */ (a[6] * b[2] + a[7]  * b[5] + a[8]  * b[8]),
            /* v30] */ (a[9] * b[0] + a[10] * b[3] + a[11] * b[6] + b[9]),
            /* v31] */ (a[9] * b[1] + a[10] * b[4] + a[11] * b[7] + b[10]),
            /* v32] */ (a[9] * b[2] + a[10] * b[5] + a[11] * b[8] + b[11])
    	];
    }

    //--------------------------------------------------------------------------
    // Given another Matrix, that, returns a new Matrix this * that.
    //--------------------------------------------------------------------------

    xMatrix(that) {

        if(!cpov.isClass(that, "Matrix"))
            cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix", this);

		return new Matrix(Matrix._xMatrix(this.raw, that.raw));
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

    //--------------------------------------------------------------------------
    // Produces the SDL representation of the Matrix.
    //--------------------------------------------------------------------------

    toSDL(stops = 0) {
        var pad = cpov.tab(stops);

        return pad + "matrix <" + [this.v00, this.v01, this.v02, this.v10, this.v11,
            this.v12, this.v20, this.v21, this.v22, this.v30, this.v31,
            this.v32 ].join(", ") + ">";
    }

}

exports.Matrix = Matrix;



// Merge.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "merge {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(ppad + this.components[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// Mesh.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "mesh {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.triangles.length; i++) {
        content.push(this.triangles[i].toSDL(1));
    }
    if(this.insideVector !== null)
        content.push(ppad + "inside_vector " + this.insideVector.toSDL());
	if(this.hierarchy !== null)
		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));

    $Primitive.toSDL-postamble
}



// Ovus.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "ovus {" + (this.id === null ? "" : " // " + this.id));
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

	content.push(pad + "parametric {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.funcX);
    content.push(ppad + this.funcY);
    content.push(ppad + this.funcZ);
    content.push(ppad + this.uv1.toSDL() + ", " + this.uv2.toSDL());

    if(this.containedBy)
        content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(stops + 2) + "\n" + ppad + "}");
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

	content.push(pad + "plane {" + (this.id === null ? "" : " // " + this.id));
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

    var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;

    if(this.coefficients.length != ccnt)
        cpov.error("fatal", "A Poly of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Poly.toSDL", this);

	content.push(pad + "poly {" + (this.id === null ? "" : " // " + this.id));
    var items = this.coefficients.slice(0);
	content.push(ppad + this.order + ", < " + items.join(", ") + " >");
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

  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Polygon.toSDL", this);

	content.push(pad + "polygon {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(this.points[i].toSDL());
    }
    content.push(ppad + items.join(", "));

    $Primitive.toSDL-postamble

}



// Polynomial.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;

    if(this.coefficients.length != ccnt)
        cpov.error("fatal", "A Polynomial of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Polynomial.toSDL", this);

	content.push(pad + "polynomial {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.order + ", ");
    var coefficients = [ ];
    for(var i = 0; i < this.coefficients.length; i++)
        coefficients.push(ppad + "xyz(" + this.coefficients[i].x + ", " + this.coefficients[i].y + ", " + this.coefficients[i].z + "):" + this.coefficients[i].w);
    content.push(coefficients.join(",\n"))
    if(this.sturm)
        content.push(ppad + "sturm")

    $Primitive.toSDL-postamble

}



// Primitive.adopt //-----------------------------------------------------------

//------------------------------------------------------------------------------
// Called on contained objects to aim their parent attributes at the container.
// Intelligently handles singletons, arrays, and functions.
//------------------------------------------------------------------------------

adopt(val) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            this._adopt(val[i]);
        }
    } else {
        this._adopt(val);
    }
}

_adopt(val) {
    if(cpov.isSDLFunction(val)) {
        cpov.error("warn", "Cannot mark an SDL function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(typeof val == "function") {
        cpov.error("warn", "Cannot mark a JavaScript function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(cpov.inheritsFrom(val, "Primitive")) {
        val.parent = this;
    }
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



// Primitive.requiredParameterTest //-------------------------------------------

//--------------------------------------------------------------------------
// Tests to see whether the required parameters for the class have been
// filled prior to output. Aborts if not. There are currently (10/15/2018)
// no required params for the Primitive base class; this is meant to be
// called from the subclasses.
//--------------------------------------------------------------------------

requiredParameterTest(requiredParams) {
    var missing = [ ];

    for(var i = 0; i < requiredParams.length; i++) {
        if(this[requiredParams[i]] === null) {
            missing.push(requiredParams[i]);
        }
    }

    if(missing.length > 0) {
        cpov.error("fatal", "Missing required parameters: " + missing.join(", ")
            + ".", "Primitive.requiredParameterTest", this);
    }
}



// Primitive.snapshot //--------------------------------------------------------

//--------------------------------------------------------------------------
// Copies current SDL representation of the object to the snapshot buffer.
//--------------------------------------------------------------------------

snapshot() {
    cpov.snapshots.push(this.toSDL());
}



// Primitive.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Generates SDL from parameters.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad = cpov.tab(stops);
    var content = [ ];

    if(this.clippedBy !== null) {
        content.push(pad + "clipped_by {");
        content.push(this.clippedBy.toSDL(stops + 1));
        content.push(pad + "}");
    }

    if(this.boundedBy !== null) {
        content.push(pad + "bounded_by {");
        if(this.boundedBy === this.clippedBy) {
            content.push(pad + "    clipped_by");
        } else {
            content.push(this.boundedBy.toSDL(stops + 1));
        }
        content.push(pad + "}");
    }

    if(this.noShadow)
        content.push(pad + "no_shadow");

    if(this.noImage)
        content.push(pad + "no_image");

    if(this.noRadiosity)
        content.push(pad + "no_radiosity");

    if(this.noReflection)
        content.push(pad + "no_reflection");

    if(this.inverse)
        content.push(pad + "inverse");

    if(this.double_illuminate)
        content.push(pad + "double_illuminate");

    if(this.hollow)
        content.push(pad + "hollow");

    // TODO: interior
    // TODO: interior_texture
    // TODO: texture (real)

    if(this.texture)
        content.push(pad + this.texture);

    // TODO: photons
    // TODO: radiosity

    if(this.transform !== undefined && this.transform !== null)
        content.push(this.transform.toSDL(stops));

    return content.join("\n");
}



// Primitive.toSDL-postamble //-------------------------------------------------

var superSDL = super.toSDL(stops + 1);
if(superSDL)
    content.push(superSDL);
content.push(pad + "}");

return content.join("\n");



// Primitive.toSDL-preamble //--------------------------------------------------

if(!this.active)
    return "";

super.requiredParameterTest(this.requiredParams);

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
            return null;
            // cpov.error("fatal", "transform cannot be read until baseTransform is set.", "Primitive.transform", this);
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

    if(this._baseTransform === null) {
        this._baseTransform = val;
        this._transform = val;
    } else {
        this._transform = val.xMatrix(this.transform);
    }

}



// Prism.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Prism.toSDL", this);

	content.push(pad + "prism {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + cpov.prismTypes[this.type]);
    content.push(ppad + this.height1 + ", " + this.height2 + ", " + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(this.points[i].toSDL());
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

    content.push(pad + "quadric {" + (this.id === null ? "" : " // " + this.id));
    content.push(
        ppad
        + "<" + this.coefficients[0] + ", " + this.coefficients[1] + ", " + this.coefficients[2] + ">, "
        + "<" + this.coefficients[3] + ", " + this.coefficients[4] + ", " + this.coefficients[5] + ">, "
        + "<" + this.coefficients[6] + ", " + this.coefficients[7] + ", " + this.coefficients[8] + ">, "
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

    content.push(pad + "quartic {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + "< " + this.coefficients.join(", ") + " >");
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

    content.push(pad + "sor {" + (this.id === null ? "" : " // " + this.id));
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
// any necessary attributes are undefined. This and the Cylinder.toSDL
// method take an optional second argument, component, which will emit code
// appropriate for a Blob component if true.
//--------------------------------------------------------------------------

toSDL(stops = 0, component = false) {

    $Primitive.toSDL-preamble

    if(component) {
        return pad + "sphere { " + this.center.toSDL() + ", " + this.radius
            + (this.strength !== null ? ", " + this.strength : "")
            + " }";
    } else {
        content.push(pad + "sphere {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.center.toSDL() + ", " + this.radius);
        $Primitive.toSDL-postamble
    }

}



// SphereSweep.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type == "linearSpline" && this.spheres.length < 2)
        cpov.error("fatal", "A linear spline requires at least two spheres.", "SphereSweep.toSDL", this);
    else if((this.type == "bezierSpline" || this.type == "cubicSpline") && this.spheres.length < 4)
        cpov.error("fatal", "Bezier and cubic splines require at least four spheres.", "SphereSweep.toSDL", this);

    content.push(pad + "sphere_sweep {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + cpov.internalSplineTypes[this.type]);
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

    content.push(pad + "superellipsoid {" + (this.id === null ? "" : " // " + this.id));
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

    // TODO: Handle escaping of double quotes in this.displayText

    content.push(pad + "text {" + (this.id === null ? "" : " // " + this.id));
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

    content.push(pad + "torus {" + (this.id === null ? "" : " // " + this.id));
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

    if(!this.smooth) {

        content.push(pad + "triangle {" + (this.id === null ? "" : " // " + this.id));
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

    content.push(pad + "union {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(ppad + this.components[i].toSDL(stops + 1));
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



