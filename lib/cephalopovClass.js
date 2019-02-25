//==============================================================================
// This file defines the CephaloPOV class, which contains most of the glue logic
// and definitions that don't live in the Primitive classes. As a singleton, it
// is instantianted once as the global cpov object. Its main purpose is just to
// centralize a bunch of stuff that was scattered elsewhere and to fix a few
// scope resolution issues that were inconveniences in the original anonymous
// cpov object.
//==============================================================================

class CephaloPOV {

    constructor(options) {

        this.version = "0.0.2";

        //======================================================================
        // Module wrappers.
        //======================================================================

        this.fs      = require("fs");
        this.File    = require("./file.js");
        this.chalk   = require("chalk");
        this.process = require("process");
        this.wrap    = require("word-wrap"); // https://github.com/jonschlinkert/word-wrap
        this.os      = require("os");
        this.path    = require("path");

        //======================================================================
        // Miscellaneous definitions.
        //======================================================================

        //----------------------------------------------------------------------
        // List of camera types
        //----------------------------------------------------------------------

        this.cameraTypes = {
            perspective:    'perspective',
            orthographic:   'orthographic',
            fisheye:        'fisheye',
            ultraWideAngle: 'ultra_wide_angle',
            omnimax:        'omnimax',
            panoramic:      'panoramic',
            spherical:      'spherical',
            cylinder:       'cylinder',
            meshCamera:     'mesh_camera'
        };

        //----------------------------------------------------------------------
        // List of legal character sets for text strings.
        //----------------------------------------------------------------------

        this.charsets = [ 'ascii', 'utf8', 'sys' ];

        //----------------------------------------------------------------------
        // Cylindrical camera types
        //----------------------------------------------------------------------

        this.cylindricalCameraTypes = {
            1: "vertical cylinder, fixed viewpoint",
            2: "horizontal cylinder, fixed viewpoint",
            3: "vertical cylinder, viewpoint moves along the cylinder's axis",
            4: "horizontal cylinder, viewpoint moves along the cylinder's axis",
        };

        //----------------------------------------------------------------------
        // Meanings of debug modes.
        //----------------------------------------------------------------------

        this.debugModes = {
            0: "Debugging mode is turned off.",
            1: "Debugging mode is turned on.",
            2: "Debugging mode is turned on <em>and</em> fatal errors are ignored. This is mainly useful if you are modifying CephaloPOV itself."
        };

        //----------------------------------------------------------------------
        // Legal dither types mapped to textual descriptions.
        //----------------------------------------------------------------------

        this.ditherTypes = {
            "B2": "Bayer pattern 2x2",
            "B3": "Bayer pattern 3x3",
            "B4": "Bayer pattern 4x4",
            "D1": "Simple error diffusion 1D",
            "D2": "Simple error diffusion 2D",
            "FS": "Floyd-Steinberg error diffusion"
        };

        //----------------------------------------------------------------------
        // Legal font types mapped to textual descriptions.
        //----------------------------------------------------------------------

        this.fontTypes = {
            "ttf": "TrueType font",
            "ttc": "TrueType collection",
        };

        //----------------------------------------------------------------------
        // List of heightField image types
        //----------------------------------------------------------------------

        this.hfTypes = [ "exr", "gif", "hdr", "iff", "jpeg", "pgm", "png", "pot",
            "ppm", "sys", "tga", "tiff", ];

        //----------------------------------------------------------------------
        // Map of internal spline types to their SDL representations.
        //----------------------------------------------------------------------

        this.internalSplineTypes = {
            linearSpline: "linear_spline",
            bezierSpline: "b_spline",
            cubicSpline:  "cubic_spline"
        };

        //----------------------------------------------------------------------
        // List of juliaFractal types
        //----------------------------------------------------------------------

        this.juliaFractalTypes = [
            "hypercomplex:acos",
            "hypercomplex:acosh",
            "hypercomplex:asin",
            "hypercomplex:atan",
            "hypercomplex:atanh",
            "hypercomplex:cos",
            "hypercomplex:cosh",
            "hypercomplex:cube",
            "hypercomplex:exp",
            "hypercomplex:ln",
            "hypercomplex:pwr",
            "hypercomplex:reciprocal",
            "hypercomplex:sin",
            "hypercomplex:sinh",
            "hypercomplex:sqr",
            "hypercomplex:tan",
            "hypercomplex:tanh",
            "quaternion:cube",
            "quaternion:sqr",
        ];

        //----------------------------------------------------------------------
        // List of light types.
        //----------------------------------------------------------------------

        this.lightTypes = [
            "point",
            "spotlight",
            "cylinder"
        ];

        //----------------------------------------------------------------------
        // List of noise generators.
        //----------------------------------------------------------------------

        this.noiseGenerators = {
            1: "The original noise generator from POV-Ray 3.1 and earlier",
            2: "An improved noise generator with fewer artifacts",
            3: "Perlin noise",
        };


        //----------------------------------------------------------------------
        // Maps names to optional libraries that are not loaded at runtime by
        // default. Many of these are JS ports of POV-Ray's include libraries,
        // modified to work with CephaloPOV. Paths are relative to the
        // CephaloPOV install directory.
        //----------------------------------------------------------------------

        this.optionalLibraries = {
            "colors.inc": "lib/colorsInc.js"
        };

        //----------------------------------------------------------------------
        // All (graphics) output file formats, mapped to textual descriptions.
        //----------------------------------------------------------------------

        this.outputFileTypes = {
            "B": "BMP",
            "C": "TGA, RLE compression",
            "E": "OpenEXR HDR",
            "H": "Radiance HDR",
            "J": "JPEG",
            "N": "PNG",
            "P": "PPM",
            "S": "System default",
            "T": "TGA, uncompressed"
        };

        //----------------------------------------------------------------------
        // List of geometric primitive type names.
        //----------------------------------------------------------------------

        this.primitiveDefs = [ "bicubicPatch", "blob", "box", "camera", "cone",
            "cubic", "cylinder", "difference", "disc", "heightField",
            "intersection", "isoSurface", "juliaFractal", "lathe", "lightSource",
            "merge", "mesh", "ovus", "parametric", "plane", "poly", "polygon",
            "polynomial", "prism", "quadric", "quartic", "sor", "sphere",
            "sphereSweep", "superellipsoid", "text", "torus", "triangle", "union" ];

        //----------------------------------------------------------------------
        // Map of prism (spline) types to their SDL representations.
        //----------------------------------------------------------------------

        this.prismTypes = {
            bezierSpline:    "bezier_spline",
            conicSweep:      "conic_sweep",
            cubicSpline:     "cubic_spline",
            linearSpline:    "linear_spline",
            linearSweep:     "linear_sweep",
            quadraticSpline: "quadratic_spline",
        };

        //----------------------------------------------------------------------
        // List of rendering quality settings.
        //----------------------------------------------------------------------

        this.renderQuality = {
            0:   "Just show quick colors. Use full ambient lighting only. Quick colors are used only at 5 or below.",
            1:	 "Just show quick colors. Use full ambient lighting only. Quick colors are used only at 5 or below.",
            2:   "Show specified diffuse and ambient light.",
            3:	 "Show specified diffuse and ambient light.",
            4:	 "Render shadows, but no extended lights.",
            5:	 "Render shadows, including extended lights.",
            6:   "Compute texture patterns, compute photons.",
            7:	 "Compute texture patterns, compute photons.",
            8:	 "Compute reflected, refracted, and transmitted rays.",
            9:	 "Compute media, radiosity and subsurface light transport.",
            10:	 "Compute media, radiosity and subsurface light transport.",
            11:	 "Compute media, radiosity and subsurface light transport.",
        };

        //----------------------------------------------------------------------
        // All supported return actions mapped to textual descriptions.
        //----------------------------------------------------------------------

        this.returnActions = {
            "I":  "ignore code",
            "S":  "skip one step",
            "A":  "all steps skipped",
            "Q":  "quit POV-Ray immediately",
            "U":  "generate a user abort in POV-Ray",
            "F":  "generate a fatal error in POV-Ray",
            "-I": "[invert] ignore code",
            "-S": "[invert] skip one step",
            "-A": "[invert] all steps skipped",
            "-Q": "[invert] quit POV-Ray immediately",
            "-U": "[invert] generate a user abort in POV-Ray",
            "-F": "[invert] generate a fatal error in POV-Ray",
            "!I": "[invert] ignore code",
            "!S": "[invert] skip one step",
            "!A": "[invert] all steps skipped",
            "!Q": "[invert] quit POV-Ray immediately",
            "!U": "[invert] generate a user abort in POV-Ray",
            "!F": "[invert] generate a fatal error in POV-Ray",
        };

        //----------------------------------------------------------------------
        // Return actions listed without negations.
        //----------------------------------------------------------------------

        this.returnActionsRaw = {
            "I":  "ignore code",
            "S":  "skip one step",
            "A":  "all steps skipped",
            "Q":  "quit POV-Ray immediately",
            "U":  "generate a user abort in POV-Ray",
            "F":  "generate a fatal error in POV-Ray",
        };

        //----------------------------------------------------------------------
        // List of SDL keywords.
        //----------------------------------------------------------------------

        this.sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
            "acos", "acosh", "adaptive", "adc_bailout", "agate", "agate_turb", "albedo",
            "all", "all_intersections", "alpha", "altitude", "always_sample", "ambient",
            "ambient_light", "angle", "aoi", "aperture", "append", "arc_angle",
            "area_illumination", "area_light", "array", "asc", "ascii", "asin", "asinh",
            "assumed_gamma", "atan", "atan2", "atand", "atanh", "autostop", "average",
            "b_spline", "background", "bezier_spline", "bicubic_patch", "bitwise_and",
            "bitwise_or", "bitwise_xor", "black_hole", "blob", "blue", "blur_samples",
            "bokeh", "bounded_by", "box", "boxed", "bozo", "break", "brick",
            "brick_size", "brightness", "brilliance", "bump_map", "bump_size", "bumps",
            "camera", "case", "caustics", "ceil", "cells", "charset", "checker", "chr",
            "circular", "clipped_by", "clock", "clock_delta", "clock_on", "collect",
            "color", "color_map", "colour", "colour_map", "component", "composite",
            "concat", "cone", "confidence", "conic_sweep", "conserve_energy",
            "contained_by", "control0", "control1", "coords", "cos", "cosh", "count",
            "crackle", "crand", "cube", "cubicwave", "cutaway_textures", "cylinder",
            "cylindrical", "datetime", "debug", "declare", "default", "defined",
            "degrees", "density", "density_file", "density_map", "dents", "deprecated",
            "df3", "difference", "diffuse", "dimension_size", "dimensions", "direction",
            "disc", "dispersion", "dispersion_samples", "dist_exp", "distance", "div",
            "double_illuminate", "eccentricity", "else", "elseif", "emission", "end",
            "error", "error_bound", "evaluate", "exp", "expand_thresholds", "exponent",
            "exterior", "extinction", "face_indices", "facets", "fade_color",
            "fade_colour", "fade_distance", "fade_power", "falloff", "falloff_angle",
            "false", "fclose", "file_exists", "filter", "final_clock", "final_frame",
            "finish", "fisheye", "flatness", "flip", "floor", "focal_point", "fog",
            "fog_alt", "fog_offset", "fog_type", "fopen", "for", "form", "frame_number",
            "frequency", "fresnel", "function", "gamma", "gather", "gif",
            "global_lights", "global_settings", "gradient", "granite", "gray",
            "gray_threshold", "green", "height_field", "hexagon", "hf_gray_16",
            "hierarchy", "hypercomplex", "hollow", "if", "ifdef", "iff", "ifndef",
            "image_height", "image_map", "image_pattern", "image_width", "importance",
            "include", "initial_clock", "initial_frame", "input_file_name", "inside",
            "inside_vector", "int", "interior", "interior_texture", "internal",
            "interpolate", "intersection", "intervals", "inverse", "ior", "irid",
            "irid_wavelength", "isosurface", "jitter", "jpeg", "julia", "julia_fractal",
            "lambda", "lathe", "leopard", "light_group", "light_source",
            "linear_spline", "linear_sweep", "ln", "load_file", "local", "location",
            "log", "look_at", "looks_like", "low_error_factor", "macro", "magnet",
            "major_radius", "mandel", "map_type", "marble", "material", "material_map",
            "matrix", "max", "maximum_reuse", "max_extent", "max_gradient",
            "max_intersections", "max_iteration", "max_sample", "max_trace",
            "max_trace_level", "media", "media_attenuation", "media_interaction",
            "merge", "mesh", "mesh2", "metallic", "method", "metric", "min",
            "min_extent", "minimum_reuse", "mm_per_unit", "mod", "mortar",
            "natural_spline", "nearest_count", "no", "no_bump_scale", "no_image",
            "no_radiosity", "no_reflection", "no_shadow", "noise_generator", "normal",
            "normal_indices", "normal_map", "normal_vectors", "now", "number_of_waves",
            "object", "octaves", "off", "offset", "omega", "omnimax", "on", "once",
            "onion", "open", "orient", "orientation", "orthographic", "ovus",
            "panoramic", "parallel", "parametric", "pass_through", "pattern",
            "pavement", "perspective", "pgm", "phase", "phong", "phong_size", "photons",
            "pi", "pigment", "pigment_map", "pigment_pattern", "planar", "plane", "png",
            "point_at", "poly", "polynomial", "poly_wave", "polygon", "pot", "pow",
            "ppm", "precision", "precompute", "premultiplied", "pretrace_end",
            "pretrace_start", "prism", "prod", "projected_through", "pwr",
            "quadratic_spline", "quadric", "quartic", "quaternion", "quick_color",
            "quick_colour", "quilted", "radial", "radians", "radiosity", "radius",
            "rainbow", "ramp_wave", "rand", "range", "ratio", "read", "reciprocal",
            "recursion_limit", "red", "reflection", "reflection_exponent", "refraction",
            "render", "repeat", "rgb", "rgbf", "rgbft", "rgbt", "right", "ripples",
            "rotate", "roughness", "samples", "save_file", "scale", "scallop_wave",
            "scattering", "seed", "select", "shadowless", "sin", "sine_wave", "sinh",
            "sint8", "sint16be", "sint16le", "sint32be", "sint32le", "size", "sky",
            "sky_sphere", "slice", "slope", "slope_map", "smooth", "smooth_triangle",
            "solid", "sor", "spacing", "specular", "sphere", "sphere_sweep",
            "spherical", "spiral1", "spiral2", "spline", "split_union", "spotlight",
            "spotted", "sqr", "sqrt", "square", "srgb", "srgbf", "srgbt", "srgbft",
            "statistics", "str", "strcmp", "strength", "strlen", "strlwr", "strupr",
            "sturm", "substr", "subsurface", "sum", "superellipsoid", "switch", "sys",
            "t", "tan", "tanh", "target", "text", "texture", "texture_list",
            "texture_map", "tga", "thickness", "threshold", "tiff", "tightness",
            "tile2", "tiles", "tiling", "tolerance", "toroidal", "torus", "trace",
            "transform", "translate", "translucency", "transmit", "triangle",
            "triangle_wave", "triangular", "true", "ttf", "turb_depth", "turbulence",
            "type", "u", "uint8", "uint16be", "uint16le", "u_steps", "ultra_wide_angle",
            "undef", "union", "up", "use_alpha", "use_color", "use_colour", "use_index",
            "utf8", "uv_indices", "uv_mapping", "uv_vectors", "v", "v_steps", "val",
            "variance", "vaxis_rotate", "vcross", "vdot", "version", "vertex_vectors",
            "vlength", "vnormalize", "vrotate", "vstr", "vturbulence", "warning",
            "warp", "water_level", "waves", "while", "width", "wood", "wrinkles",
            "write", "x", "y", "yes", "z" ];

        //----------------------------------------------------------------------
        // Map of spline types to their SDL representations.
        //----------------------------------------------------------------------

        this.splineTypes = {
            bezierSpline:    "bezier_spline",
            cubicSpline:     "cubic_spline",
            linearSpline:    "linear_spline",
            quadraticSpline: "quadratic_spline",
        };

        //----------------------------------------------------------------------
        // List of POV-Ray warning levels.
        //----------------------------------------------------------------------

        this.warningLevels = {
             0: "Turn off all warnings.",
             5: "Turn off language version warnings.",
            10: "Turn on all warnings (default)."
        }

        // TODO:--

/*

        cpov.ioMutables = [ ];
        var tmp = require("./ioDef.js");
        for(var i = 0; i < tmp.mutable.length; i++) {
            cpov.ioMutables.push(tmp.mutable[i].name);
        }

        cpov.ioMutables    = require("./ioDef.js").mutable.keys();  // imageOptions
*/

    }


    //==========================================================================
    // Validation functions, mainly to be leveraged by generated classes.
    //==========================================================================

    inheritsFrom(val, classname) {
        return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
    }

    //--------------------------------------------------------------------------

    isArrayOfBaseClass(val, classname, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(!this.inheritsFrom(val[i], classname))
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    isArrayOfClass(val, classname, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(!this.isClassInstance(val[i], classname))
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    isArrayOfCSGOperands(val, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(val.csgOperand === undefined || val.csgOperand === false)
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    isArrayOfInts(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "number" || val[i] != Math.floor(val[i]))
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfFloats(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "number")
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfNonEmptyStrings(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "string" || val[i].length < 1)
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfStrings(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "string")
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfSubclass(val, classname) {
        if(!Array.isArray(val))
            return false;
        if(Array.isArray(classname)) {
            for(var i = 0; i < val.length; i++) {
                var okay = false;
                for(var c = 0; c < classname.length; c++) {
                    if(this.inheritsFrom(val, classname[i])) {
                        okay = true;
                        break;
                    }
                }
                if(!okay) {
                    return false;
                }
            }
        } else {
            for(var i = 0; i < val.length; i++) {
                if(!this.inheritsFrom(val, classname)) {
                    return false;
                }
            }
        }
        return true;
    }

    //--------------------------------------------------------------------------

    isBetween(val, min, max) {
        return val > min && val < max ? true : false;
    }

    //--------------------------------------------------------------------------

    isBoolean(val) {
        return typeof val == "boolean" ? true : false;
    }

    //--------------------------------------------------------------------------

    isChar(val) {
        return typeof val == "string" && val.length == 1 ? true : false;
    }

    //--------------------------------------------------------------------------
    // Returns true if val is a member of classname and false otherwise. Both
    // val and classname may be scalars or arrays.
    //--------------------------------------------------------------------------

    isClassInstance(val, classname) {
        if(!Array.isArray(val))
            val = [ val ];
        if(!Array.isArray(classname))
            classname = [ classname ];

        for(var v = 0; v < val.length; v++) {
            var okay = false;
            for(var c = 0; c < classname.length; c++) {
                try {
                    if(Object.getPrototypeOf(val[v]).constructor.name == classname[c]) {
                        okay = true;
                        break;
                    }
                } catch(e) {
                    return false;
                }
            }
            if(!okay)
                return false;
        }

        return true;
    }

    //--------------------------------------------------------------------------

    isCSGOperand(val) {
        if(val.csgOperand === undefined || val.csgOperand === false)
            return false;
        else
            return true;
    }

    //--------------------------------------------------------------------------

    isFloat(val) {
        return typeof val == "number" ? true : false;
    }

    //--------------------------------------------------------------------------

    isInArray(val, array) {
        for(var i = 0; i < array.length; i++)
            if(array[i] == val)
                return true;
        return false;
    }

    //--------------------------------------------------------------------------

    isInt(val) {
        return typeof val == "number" && val == Math.floor(val) ? true : false;
    }

    //--------------------------------------------------------------------------

    isKey(val, object) {
        return object[val] === undefined ? false : true;
    }

    //--------------------------------------------------------------------------

    isNonEmptyString(val) {
        return typeof val == "string" && val.length ? true : false;
    }

    //--------------------------------------------------------------------------

    isNull(val) {
        return val === null ? true : false;
    }

    //--------------------------------------------------------------------------

    isNullOrJSFunction(val) {
        return (val === null || typeof val == "function") ? true : false;
    }

    //--------------------------------------------------------------------------

    isNullOrFunction(val) {
        return (val === null || typeof val == "function" || this.isSDLFunction(val)) ? true : false;
    }

    //--------------------------------------------------------------------------

    isPowerOfTwo(val) {
        for(var i = 0; i < 65; i++)
            if(Math.pow(2, i) == val)
                return true;
        return false;
    }

    //--------------------------------------------------------------------------

    isSDLFunction(val) {
        return (typeof val == "string" && val.substr(0, 1) == "&") ? true : false;
    }

    //--------------------------------------------------------------------------

    isString(val) {
        return typeof val == "string" ? true : false;
    }

    //--------------------------------------------------------------------------

    isUnusedId(val, obj) {
        var result = (obj.id == val || this.idMap[val] === undefined) ? true : false;
        if(obj.id != val)
            delete this.idMap[obj.id];
        this.idMap[val] = obj;
        return result;
    }

    //--------------------------------------------------------------------------

    isUnusedSerial(val, obj) {
        var result = (obj.serial == val || this.serialMap[val] === undefined) ? true : false;
        if(obj.serial != val)
            delete this.serialMap[obj.serial];
        this.serialMap[val] = obj;
        return result;
    }

    //--------------------------------------------------------------------------

    isWithin(val, min, max) {
        return val >= min && val <= max ? true : false;
    }


    //==========================================================================
    // Conversion and formatting methods, also mainly used out in the provinces.
    //==========================================================================

    arrayToTextList(items) {
        var items = items.slice(0);
        items[items.length - 1] = "or " + items[items.length - 1];
        return items.join(", ");
    }

    //--------------------------------------------------------------------------
    // Used in setter validation to auto-convert convenience forms of vectors to
    // actual objects. The class constructors will terminate execution with a
    // fatal cpov.error message if the initializer is invalid or malformed.
    //--------------------------------------------------------------------------

    convertToVector(type, val) {

        switch(type) {
            case "VectorXY":
                val = new VectorXY(val);
                break;
            case "VectorUV":
                val = new VectorUV(val);
                break;
            case "VectorXYZ":
                val = new VectorXYZ(val);
                break;
            case "VectorXYZW":
                val = new VectorXYZW(val);
                break;
            case "Color":
                val = new Color(val);
                break;
            default:
                this.error("fatal", "System error, invalid type '" + type + "'.", "CephaloPOV.convertToVector");
        }

        return val;
    }

    //--------------------------------------------------------------------------
    // Analogous to convertToVector, convertToVectorArray attempts to convert
    // the convenient bare array forms of the named vector type to an equivalent
    // array of vector instances. If the bare arrays are malformed, the vector
    // constructor will terminate the script with a fatal error.
    //--------------------------------------------------------------------------

    convertToVectorArray(type, val) {

        switch(type) {
            case "VectorXY":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXY(val[i]);
                break;
            case "VectorUV":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorUV(val[i]);
                break;
            case "VectorXYZ":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXYZ(val[i]);
                break;
            case "VectorXYZW":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXYZW(val[i]);
                break;
            case "Color":
                for(var i = 0; i < val.length; i++)
                    val[i] = new Color(val[i]);
                break;
            default:
                this.error("fatal", "System error, invalid type '" + type + "'.", "CephaloPOV.convertToVectorArray");
        }

        return val;

    }

    //--------------------------------------------------------------------------
    // Given an angle in degrees, returns its equivalent in radians.
    //--------------------------------------------------------------------------

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    //--------------------------------------------------------------------------
    // Given a block of text in the form of a single string, preface each line
    // with the specified number of tab stops.
    //--------------------------------------------------------------------------

    indentTextBlock(block, stops) {
        block = block.split(/\n/);
        var tab = this.tab(stops);
        if(block[0] !== undefined)
            block[0] = tab + block[0];
        return block.join("\n" + tab);
    }

    //--------------------------------------------------------------------------

    keysToTextList(obj) {
        var items = [ ];
        for(var k in obj)
            items.push("'" + k + "'");
        return this.arrayToTextList(items);
    }

    //--------------------------------------------------------------------------
    // Returns n rounded to d decimal places.
    //--------------------------------------------------------------------------

    round(n, d) {
        n = Math.round(n * (d * 10)) / ( d * 10);
    }

    //--------------------------------------------------------------------------
    // Returns a string consisting of stops copies of four space characters.
    //--------------------------------------------------------------------------

    tab(stops) {
        if(stops)
            return new Array(stops).fill("    ").join("");
        else
            return "";
    }


    //==========================================================================
    // Miscellaneous common utilities.
    //==========================================================================

    //--------------------------------------------------------------------------
    // Walks through the contents of a config file and applies the settings.
    //--------------------------------------------------------------------------

    configApply(cfg) {
        if(cfg.imageOptions)
            for(var k in cfg.imageOptions)
                this.imageOptions[k] = cfg.imageOptions[k];
        if(cfg.globalSettings)
            for(var k in cfg.globalSettings)
                this.globalSettings[k] = cfg.globalSettings[k];
        if(cfg.settings)
            for(var k in cfg.settings)
                this.settings[k] = cfg.settings[k];
    }

    //--------------------------------------------------------------------------
    // Attempts to load, in order:
    //
    //     /etc/cpov/config.js ... the system config file
    //     ~/.cpov/config.js ..... the user config file
    //     project.config.js ..... the project config file, which is looked for in
    //                             the same location as the main include file
    //
    // These are all Node modules which export an object with two sub-objects,
    // imageOptions and globalSettings, whose members are assigned to the
    // corresponding cpov objects.
    //--------------------------------------------------------------------------

    configLoad(projectFile = null) {

        var fname = this.path.normalize("/etc/cpov/config.js");

        try {
            var cfg = require();
        } catch(e) {
            this.error("info", "Failed to load global config file " + fname, "CephaloPOV.configLoad", this);
        }

        if(cfg) {
            this.configApply(cfg);
            this.error("info", "Successfully loaded and applied global config file " + fname, "CephaloPOV.configLoad", this);
        }
        cfg = false;

        //--------------------------------------------------------------------------

        try {
            var fname = this.path.normalize(os.homedir() + "/cpov/config.js");
            var cfg = require(fname);
        } catch(e) {
            this.error("info", "Failed to load user config file " + fname, "CephaloPOV.configLoad", this);
        }

        if(cfg) {
            this.configApply(cfg);
            this.error("info", "Successfully loaded and applied user config file " + fname, "CephaloPOV.configLoad", this);
        }
        cfg = false;

        //--------------------------------------------------------------------------

        if(projectFile) {
            try {
                var fname = this.path.normalize(projectFile);
                var cfg = require(fname);
            } catch(e) {
                this.error("info", "Failed to load project config file " + fname, "CephaloPOV.configLoad", this);
            }
        } else {
            this.error("info", "Project config file not supplied.", "CephaloPOV.configLoad", this);
        }

        if(cfg) {
            this.configApply(cfg);
            this.error("info", "Successfully loaded and applied project config file " + fname, "CephaloPOV.configLoad", this);
        }
    }


    //--------------------------------------------------------------------------
    // Common initialization/load routine for objects. Given an object reference
    // and an object containing named attributes, attempts to assign them to the
    // corresponding object attributes. Attributes that do not exist will be
    // ignored. This routine is used where a conBlock is not defined.
    //--------------------------------------------------------------------------

    initObject(obj, vals) {
        for(var k in vals) {
            if(k == "serial")
                continue;
            if(obj[k] !== undefined && obj[k] === null) {
                obj[k] = vals[k];
            }
        }
    }

    //--------------------------------------------------------------------------
    // Prints an error message to console if permitted by the current verbosity
    // level, and if the error is fatal, terminates the process.
    //--------------------------------------------------------------------------

    error(level, message, location = "CEPHALOPOV", obj = null) {

        var instance = '';

        if(obj !== null && this.inheritsFrom(obj, "Primitive"))
            instance = " (" + this.primitiveDefIdentifier(obj) + ")";


        if(!this.settings.quietMode) {
            switch(level) {
                case "fatal":
                    console.log(this.chalk.bgRed.yellowBright("[" + location + "]") + this.chalk.redBright(" FATAL ERROR: ") + this.chalk.yellowBright(message + instance));
                    if(this.debugLog)
                        this.debugLog.write("[" + location + "] FATAL ERROR: " + message + instance + "\n");
                    break;
                case "warn":
                    if(this.settings.verbosity >= 1)
                        console.log(this.chalk.bgYellow.whiteBright("[" + location + "]") + this.chalk.yellowBright(" WARNING: ") + message + instance);
                    if(this.debugLog)
                        this.debugLog.write("[" + location + "] WARNING: " + message + instance + "\n");
                    break;
                case "info":
                    if(this.settings.verbosity >= 2)
                        console.log(this.chalk.bgGreen.whiteBright("[" + location + "]") + this.chalk.greenBright(" INFO: ") + message + instance);
                    if(this.debugLog)
                        this.debugLog.write("[" + location + "] INFO: " + message + instance + "\n");
                    break;
                case "debug":
                    if(this.settings.verbosity >= 3 || this.settings.debug)
                        console.log("[" + location + "] DEBUG: " + message + instance);
                    if(this.debugLog)
                        this.debugLog.write("[" + location + "] DEBUG: " + message + instance + "\n");
                    break;
            }
        }

        if(level == "fatal" && this.settings.debug < 2)
            this.process.exit(1);
    }

    //--------------------------------------------------------------------------
    // Reads from the supplied filename and returns an object whose keys are
    // defined by specially formatted comments in the file and whose values are
    // the lines in between those comments, with leading and trailing whitespace
    // trimmed. The comments are formatted thus:
    //
    //          // Keyname // (anything after the second // is ignored)
    //          ^
    //          |
    //          +------------- first column
    //
    // Note that the spaces on either side of the keyname are mandatory and that
    // there cannot be any spaces in the keyname itself.
    //--------------------------------------------------------------------------

    objectImport(filename) {
        var fp       = new this.File(filename, "r");
        var contents = fp.read().trim().split(/\n/);
        contents.push("");
        fp.close();

        var result   = { };
        var label    = null;
        var value    = [ ];
        var match    = null;

        for(var i = 0; i < contents.length; i++) {
            if(i == contents.length - 1 || (match = contents[i].match(/^\/\/ +(\S+) +\/\//))) {
                if(label) {
                    result[label] = value.join("\n").trim();
                }
                if(match && match[1]) {
                    label = match[1];
                    value = [ ];
                }
                continue;
            }
            value.push(contents[i]);
        }
        if(label) {
            result[label] = value.join("\n").trim();
        }

        return result;
    }

    //--------------------------------------------------------------------------
    // Simple commandline parser that supports short and long switches both with
    // and without arguments. Takes an optionMap like so:
    //
    //    var optionMap = {
    //        infile:     { short: "i", vals: [ ] },  // accumulates values
    //        outfiles:   { short: "o", vals: [ ] },
    //        preamble:   { short: "p", vals: [ ] },
    //        sdlinclude: { short: "s", vals: [ ] },
    //        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
    //        quietMode:  { short: "q", cnt: 0 },
    //        debug:      { short: "d", cnt: 0 },
    //        help:       { short: "h", cnt: 0 },
    //    }
    //
    // The keys of the optionMap are the long options, the short members in the
    // value objects are the short options. If a vals array is provided,
    // arguments to the switch are accumulated therein. If a cnt counter is
    // provided, the number of appearances of the switch are counted therein.
    // You can't do both.
    //
    // The optionMap is altered in place. Bails with a call to cpov.error if
    // malformed user input is encountered.
    //--------------------------------------------------------------------------

    parseCLI(optionMap) {

        var currentArg = null;

        for(var a = 2; a < process.argv.length; a++) {
            var item   = process.argv[a];
            var match  = item.match(/^(-+)?(\S+)/);
            var dashes = match[1] === undefined ? 0 : match[1].length;
            var arg    = match[2];

            if(dashes == 1) {

                if(arg.length > 1) {   // Just split composite simple args

                    var args = arg.split("");

                    for(var i = 0; i < args.length; i++) {
                        process.argv.splice(a + 1 + i, 0, "-" + args[i]);
                    }
                    continue;

                } else {  // Convert simple args to long args

                    var complex = null;
                    for(var i in optionMap) {
                        if(optionMap[i].short == arg) {
                            complex = i;
                            break;
                        }
                    }

                    if(complex === null) {
                        this.error("fatal", "Unknown commandline switch '-" + arg + "'", "CEPHALOPOV");
                    } else {
                        arg = complex;
                        dashes = 2;
                    }

                }

            }

            if(dashes == 2) {

                if(optionMap[arg] === undefined)
                    this.error("fatal", "Unknown commandline switch '--" + arg + "'", "CEPHALOPOV");

                currentArg = arg;

                if(optionMap[arg].cnt !== undefined)
                    optionMap[arg].cnt++;

                continue;

            }

            // If we get here, we're looking at an argument to a switch

            if(optionMap[currentArg] === undefined)
                this.error("fatal", "Invalid commandline argument '" + item + "' supplied without preceding switch.", "CEPHALOPOV");
            else if(optionMap[currentArg].vals === undefined)
                this.error("fatal", "Commandline switch --" + currentArg + "/-" + optionMap[currentArg].short + " does not take arguments.", "CEPHALOPOV");
            else
                optionMap[currentArg].vals.push(item);

        }

    }

    //--------------------------------------------------------------------------
    // Given a Primitive object, returns a string identifying it by serial and,
    // if available, id.
    //--------------------------------------------------------------------------

    primitiveDefIdentifier(obj) {
        var result = [ ];
        result.push("#" + obj.serial);
        if(obj.id !== null)
            result.push(obj.id);
        return result.join(":");
    }

    //--------------------------------------------------------------------------
    // Requires and returns the contents of one of the optional libraries that
    // ship with CephaloPOV. Some of these are ports of POV-Ray include files
    // and have the same names.
    //--------------------------------------------------------------------------

    requireOptLib(name) {

        if(this.optionalLibraries[name] === undefined)
            this.error("fatal", "There is no library \"" + name + "\" in the optional library collection.", "CephaloPOV.requireOptLib");

        try {
            var path = require.resolve("cephalopov");
            path = path.split(/[\/\\]+/);
            path.pop();
            path = path.join("/") + "/";
            var result = require(path + this.optionalLibraries[name]);
        } catch(e) {
            this.error("fatal", "Unable to open " + path + this.optionalLibraries[name], "CephaloPOV.requireOptLib");
        }

        return result;
    }

    //--------------------------------------------------------------------------
    // Takes a starting and ending Date objects and an optional number of units
    // of work, and returns an object containing the elapsed time in
    // milliseconds and seconds and the averages per unit:
    //
    //     { msecs: ?, secs: ?, avgMsecs: ?, avgSecs: ? }
    //--------------------------------------------------------------------------

    timerStats(start, end, units = 1) {
        var result = { };

        result.msecs    = end.getTime() - start.getTime();
        result.secs     = result.msecs / 1000;
        result.avgMsecs = this.round(result.msecs / units, 2);
        result.avgSecs  = this.round(result.secs / units, 2);
        result.secs     = this.round(result.secs, 2);

        return result;
    }

    //==========================================================================
    // These methods implement the core of the animation cycle.
    //==========================================================================

    //--------------------------------------------------------------------------
    // Terminates the animation. This happens immediately, i.e., any work done
    // in the current frame will not be output.
    //--------------------------------------------------------------------------

    endAnimation() {
        this.error("fatal", "Animation terminated at request of user program.", "CephaloPOV.endAnimation");
    }

    //--------------------------------------------------------------------------
    // When called by the user program, outputs a frame.
    //--------------------------------------------------------------------------

    outputFrame() {

        //--------------------------------------------------------------------------
        // Check for termination conditions.
        //--------------------------------------------------------------------------

        if(this.clockTime > this.endTime) {
            this.error("info", "Animation terminated normally because cpov.clockTime > cpov.endTime.", "CephaloPOV.outputFrame");
            this.error("debug", "cpov.clockTime == " + this.clockTime + ", cpov.endTime == " + this.endTime, "CephaloPOV.outputFrame");
            this.process.exit(0);
        }

        if(this.currentFrame > this.endFrame) {
            this.error("info", "Animation terminated normally because cpov.currentFrame > cpov.endFrame.", "CephaloPOV.outputFrame");
            this.error("debug", "cpov.currentFrame == " + this.currentFrame + ", cpov.endFrame == " + this.endFrame, "CephaloPOV.outputFrame");
            this.process.exit(0);
        }

        //--------------------------------------------------------------------------
        // Call the global frameBegin function if it exists.
        //--------------------------------------------------------------------------

        if(this.settings.frameBegin)
            this.settings.frameBegin(cpov);

        //--------------------------------------------------------------------------
        // Using cpov.serialMap, walk through all objects. For each object that is
        // active, call the frameBegin function if it exists.
        //--------------------------------------------------------------------------

        for(var serial in this.serialMap) {
            var obj = this.serialMap[serial];
            if(obj.active && obj.frameBegin) {
                this.error("debug", "Calling frameBegin on object serial " + serial + ".", "CephaloPOV.outputFrame", obj);
                obj.frameBegin(cpov);
            }
        }

        //--------------------------------------------------------------------------
        // Create the .ini file if within time and frame bounds.
        //--------------------------------------------------------------------------

        if(this.imageOptions.createIni === true && this.clockTime >= this.startTime && this.currentFrame >= this.startFrame) {
            var iniFile = new File(this.settings.outputBase + ".ini", "w", this.currentFrame);
            if(iniFile.open == false) {
                this.error("error", "Unable to open " + iniFile.path + " for writing.", "CephaloPOV.outputFrame", this);
            }

            var iniContent = this.imageOptions.output();

            iniFile.write(
                  ";;==========================================================================\n"
                + ";; INI FILE: " + iniFile.path + "\n"
                + ";; FRAME: " + this.currentFrame + "\n"
                + ";; CLOCK TIME: " + this.clockTime + "\n"
                + ";; CLI EQUIV: " + iniContent.cli + "\n"
                + ";;==========================================================================\n\n"
                + iniContent.ini + "\n\n"
            );
            iniFile.close();

            this.frameCount++;
        }

        //--------------------------------------------------------------------------
        // Create the .pov file if within time and frame bounds.
        //--------------------------------------------------------------------------

        if(this.clockTime >= this.startTime && this.currentFrame >= this.startFrame) {
            var povFile = new File(this.settings.outputBase + ".pov", "w", this.currentFrame);
            if(povFile.open == false) {
                this.error("error", "Unable to open " + povFile.path + " for writing.", "CephaloPOV.outputFrame", this);
            }

            povFile.write(
                  "//==========================================================================\n"
                + "// POV FILE: " + povFile.path + "\n"
                + "// FRAME: " + this.currentFrame + "\n"
                + "// CLOCK TIME: " + this.clockTime + "\n"
                + "//==========================================================================\n\n"
                + "#version 3.7;\n\n"
            );

            if(this.settings.preamble) {
                povFile.write(this.settings.preamble + "\n\n");
            }

            if(this.settings.sdlIncludes) {
                for(var i = 0; i < this.settings.sdlIncludes.length; i++) {
                    povFile.write("#include \"" + this.settings.sdlIncludes[i] + "\"\n");
                }
                povFile.write("\n");
            }

            //--------------------------------------------------------------------------
            // If we're in snapshot mode, we just dump the snapshots to the file and
            // then clear the snapshot buffer. Otherwise, we walk through all of the
            // (active) objects and call their .toSDL methods and write the output to
            // the file.
            //--------------------------------------------------------------------------

            if(this.settings.snapshotMode) {

                if(!this.snapshots.length) {
                    this.error("warn", "Snapshot buffer is empty.", "CephaloPOV.outputFrame");
                } else {
                    povFile.write(this.globalSettings.toSDL() + "\n\n");
                    povFile.write(this.snapshots.join("\n\n"));
                }

                this.snapshots = [ ];

            } else {

                for(var serial in this.serialMap) {
                    var obj = this.serialMap[serial];
                    if(obj.active && obj.parent === null) {
                        this.error("debug", "Calling toSDL on object serial " + serial + ".", "CephaloPOV.outputFrame", obj);
                        povFile.write("// Object" + (obj.id ? obj.id : " " ) + " #" + serial + "\n\n");
                        povFile.write(obj.toSDL() + "\n\n");
                    }
                }

            }

            povFile.close();
        }

        //--------------------------------------------------------------------------
        // Using cpov.serialMap, walk through all objects. For each object that is
        // active, call the frameEnd function if it exists.
        //--------------------------------------------------------------------------

        for(var serial in this.serialMap) {
            var obj = this.serialMap[serial];
            if(obj.active && obj.frameEnd) {
                this.error("debug", "Calling frameEnd on object serial " + serial + ".", "CephaloPOV.outputFrame", obj);
                obj.frameEnd(cpov);
            }
        }

        //--------------------------------------------------------------------------
        // Call the global frameEnd function if it exists.
        //--------------------------------------------------------------------------

        if(this.settings.frameEnd)
            this.settings.frameEnd(this);

        //--------------------------------------------------------------------------
        // Advance time and frame count.
        //--------------------------------------------------------------------------

        this.clockTime += this.tickVal;
        this.currentFrame++;

    }


    //------------------------------------------------------------------------------
    // When called, starts the animation loop and continues until one of the end
    // conditions is reached or the user program calls cpov.endAnimation.
    //------------------------------------------------------------------------------

    runAnimation() {
        var startAnim = new Date();

        while(true) {
            var frameCount = this.frameCount;
            var startFrame = new Date();
            this.outputFrame();
            var endFrame = new Date();
            var frameStats = this.timerStats(startFrame, endFrame, frameCount);

            if(frameCount == this.frameCount) {
                this.error("info", "Skipped frame " + (this.currentFrame - 1) + ".", "CephaloPOV.runAnimation");
            } else {
                this.error("info",
                    "Output frame " + (this.currentFrame - 1) + " in "
                    + frameStats.msecs + " msecs/" + frameStats.secs
                    + "secs.", "CephaloPOV.runAnimation");
            }

            var animStats = this.timerStats(startAnim, new Date(), frameCount);

            this.error("info",
                "Frames: " + frameCount + " in " + animStat.secs
                + " seconds, average seconds per frame: " + animStats.avgSecs
                + ", average frames per second: " + this.round(units / animStats.secs, 2)
                + ".", "CephaloPOV.runAnimation");
        }

        if(this.settings.makeShellScript)
            this.makeRenderScript();

        var endAnim = new Date();
    }


    //==========================================================================
    // This last stuff is almost certainly going to go somewhere else before
    // long, possibly in an optional library, but for now, it's camped out here
    // like a hipster novelist at Starbucks.
    //==========================================================================

    //--------------------------------------------------------------------------
    // Returns a group of objects that serve as one of several test/demo stages
    // for the documentation depending on the value of type. Supported types
    // are:
    //
    //     corner .... Three adjacent sides of a cube around one corner in the
    //                 same configuration as a corner reflector. Each face is
    //                 size units long and the perpendicular axis runs through
    //                 the centroid of the face.
    //
    //     triplane ... Three translucent planes intersect at the origin.
    //
    // The size argument determines the size of the planes.
    //
    // Cameras and lighting are automatically added. It is assumed -- i.e.,
    // you'll need to change camera.right -- that the image has a 1:1 aspect
    // ratio.
    //--------------------------------------------------------------------------

    testStage(type, size) {

        var h = size / 2;

        if(type == "corner") {

            var t = 0.1;        // thickness of boxes

            var components = [ ];

            // Panel boxes

            components.push(new Box({ corner1: [ -h - t, -h, h + t ],  corner2: [  h, -h - t, -h ], texture: "texture { pigment { color <0.75, 0.75, 0.75> }}", id: "panelBottom" }));
            components.push(new Box({ corner1: [ -h - t,  h, h + t ],  corner2: [ -h, -h - t, -h ], texture: "texture { pigment { color <0.75, 0.75, 0.75> }}", id: "panelLeft" }));
            components.push(new Box({ corner1: [ -h - t,  h, h + t ],  corner2: [  h, -h - t,  h ], texture: "texture { pigment { color <0.75, 0.75, 0.75> }}", id: "panelRight" }));

            // Grid

            for(var c = Math.floor(-h); c < h + t; c++) {
                var texture = c == 0 ? "texture { pigment { color <0.5, 0.0, 0.0> }}" : "texture { pigment { color <0.5, 0.5, 0.5> }}";
                components.push(new Cylinder({ radius: t/2, capPoint: [ -h, c, -h ], basePoint: [ -h, c, h ], texture: texture, id: "leftMajorGridA" + c }));
                components.push(new Cylinder({ radius: t/2, capPoint: [ -h, h, c ], basePoint: [ -h, -h, c ], texture: texture, id: "leftMajorGridB" + c }));
                components.push(new Cylinder({ radius: t/2, capPoint: [ -h, c, h ], basePoint: [  h, c, h ], texture: texture, id: "rightMajorGridA" + c }));
                components.push(new Cylinder({ radius: t/2, capPoint: [ c, h, h ], basePoint: [  c, -h, h ], texture: texture, id: "rightMajorGridB" + c }));
                components.push(new Cylinder({ radius: t/2, capPoint: [ -h, -h, c ], basePoint: [  h, -h, c ], texture: texture, id: "bottomMajorGridA" + c }));
                components.push(new Cylinder({ radius: t/2, capPoint: [ c, -h, h ], basePoint: [  c, -h, -h ], texture: texture, id: "bottomMajorGridB" + c }));
            }

            // Light

            components.push(new LightSource({ type: "point", color: [1.5,1.5,1.5], location: [ size * 0.75, size * 0.75, -size * 0.75 ], id: "light" }));

            var union = new Union({ components: components });

            var camera = new Camera({ type: "perspective", location: [ size * 1.7, size, -size * 1.7 ], lookAt: [0,-0.8,0], right: [1,0.05,0], angle: 38 });

            return [ union, camera ];

        } else if(type == "triplane") {

            var p = 0.01;       // thickness of boxes

            var xy = new Box({ corner1: [ -h, h,  p ],  corner2: [ h, -h, -p ] });
            var yz = new Box({ corner1: [ -p, h,  h ],  corner2: [ p, -h, -h ] });
            var xz = new Box({ corner1: [ -h, p, -h ],  corner2: [ h, -p,  h ] });

            var light  = new LightSource({ type: "point", color: [1,1,1], location: [ size, size, 0 ]});

            var union = new Union({ components: [xy, yz, xz, light] });
            union.texture = "texture { pigment { color <0.75, 0.75, 0.75> }}";

            var camera = new Camera({ type: "perspective", location: [ size * 1.7, size, -size * 1.7 ], lookAt: [0,-0.8,0], right: [1,0.05,0], angle: 38 });

            return [ union, camera ];

        } else {
            this.error("fatal", "Unsupported testStage type \"" + type + "\".", "CephaloPOV.testStage");
        }

    }

}

module.exports = CephaloPOV;
