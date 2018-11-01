miscDef = { };

//------------------------------------------------------------------------------
// Legal dither types mapped to textual descriptions.
//------------------------------------------------------------------------------

miscDef.ditherTypes = {
    "B2": "Bayer pattern 2x2",
    "B3": "Bayer pattern 3x3",
    "B4": "Bayer pattern 4x4",
    "D1": "Simple error diffusion 1D",
    "D2": "Simple error diffusion 2D",
    "FS": "Floyd-Steinberg error diffusion"
};


//------------------------------------------------------------------------------
// Legal font types mapped to textual descriptions.
//------------------------------------------------------------------------------

miscDef.fontTypes = {
	"ttf": "TrueType font",
	"ttc": "TrueType collection",
};

//------------------------------------------------------------------------------
// All (graphics) output file formats, mapped to textual descriptions.
//------------------------------------------------------------------------------

miscDef.outputFileTypes = {
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


//------------------------------------------------------------------------------
// List of geometric primitive type names.
//------------------------------------------------------------------------------

miscDef.primitiveDefs = [ "bicubicPatch", "blob", "box", "camera", "cone", "cubic",
    "cylinder", "difference", "disc", "heightField", "intersection",
    "isoSurface", "juliaFractal", "lathe", "lightSource", "merge", "mesh", "ovus",
    "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
    "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
    "torus", "triangle", "union" ];


//------------------------------------------------------------------------------
// All supported return actions mapped to textual descriptions.
//------------------------------------------------------------------------------

miscDef.returnActions = {
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


//------------------------------------------------------------------------------
// Map of internal spline types to their SDL representations.
//------------------------------------------------------------------------------

miscDef.internalSplineTypes = {
    linearSpline: "linear_spline",
    bezierSpline: "b_spline",
    cubicSpline:  "cubic_spline"
};


//------------------------------------------------------------------------------
// Map of prism (spline) types to their SDL representations.
//------------------------------------------------------------------------------

miscDef.prismTypes = {
    bezierSpline:    "bezier_spline",
    conicSweep:      "conic_sweep",
    cubicSpline:     "cubic_spline",
    linearSpline:    "linear_spline",
    linearSweep:     "linear_sweep",
    quadraticSpline: "quadratic_spline",
};


//------------------------------------------------------------------------------
// Map of spline types to their SDL representations.
//------------------------------------------------------------------------------

miscDef.splineTypes = {
    bezierSpline:    "bezier_spline",
    cubicSpline:     "cubicSpline",
    linearSpline:    "linear_spline",
    quadraticSpline: "quadratic_spline",
};


//------------------------------------------------------------------------------
// List of juliaFractal types
//------------------------------------------------------------------------------

miscDef.juliaFractalTypes = [
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


//------------------------------------------------------------------------------
// List of legal character sets for text strings.
//------------------------------------------------------------------------------

miscDef.charsets = [ 'ascii', 'utf8', 'sys' ];


//------------------------------------------------------------------------------
// List of noise generators.
//------------------------------------------------------------------------------

miscDef.noiseGenerators = {
    1: "The original noise generator from POV-Ray 3.1 and earlier",
    2: "An improved noise generator with fewer artifacts",
    3: "Perlin noise",
};

//------------------------------------------------------------------------------
// List of camera types
//------------------------------------------------------------------------------

miscDef.cameraTypes = {
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


//------------------------------------------------------------------------------
// Cylindrical camera types
//------------------------------------------------------------------------------

miscDef.cylindricalCameraTypes = {
    1: "vertical cylinder, fixed viewpoint",
    2: "horizontal cylinder, fixed viewpoint",
    3: "vertical cylinder, viewpoint moves along the cylinder's axis",
    4: "horizontal cylinder, viewpoint moves along the cylinder's axis",
};


//------------------------------------------------------------------------------
// List of heightField image types
//------------------------------------------------------------------------------

miscDef.hfTypes = [ "exr", "gif", "hdr", "iff", "jpeg", "pgm", "png", "pot",
    "ppm", "sys", "tga", "tiff", ];


//------------------------------------------------------------------------------
// List of POV-Ray warning levels.
//------------------------------------------------------------------------------

miscDef.warningLevels = {
     0: "Turn off all warnings.",
     5: "Turn off language version warnings.",
    10: "Turn on all warnings (default)."
}

//------------------------------------------------------------------------------
// List of SDL keywords.
//------------------------------------------------------------------------------

miscDef.sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
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

module.exports = miscDef;
