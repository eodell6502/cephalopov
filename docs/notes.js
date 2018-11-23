// This is mostly stuff that I've replaced but want to keep for future reference without
// having to sift through the git repo to find.

/*

 If we were to rotate an object 45 degrees around the Z axis, we would use the following statement:

            matrix < cos(a), sin(a), 0,
                    -sin(a), cos(a), 0,
                       0,      0,    1,
                       0,      0,    0 >

The course notes I found, taken from Mathematical Elements for Computer Graphics, 2ed,
Rogers and Adams, 1990, gives the following Z axis rotation (note the fourth,
invariant column):

        Rz = [ cos(a), -sin(a), 0, 0,
               sin(a),  cos(a), 0, 0,
                    0,       0, 1, 0,
                    0,       0, 0, 1 ]

I'll have to test to find out for sure, but I think the reversal of the signs of
the two sine functions is because the second source uses a right-handed coordinate
system while POV-Ray uses a left-handed system.

The other two rotation matrices in Rogers and Adams are as follows:

        Rx = [ 1,      0,       0, 0,
               0, cos(a), -sin(a), 0,
               0, sin(a),  cos(a), 0,
               0,      0,       0, 1 ]

        Ry  = [  cos(a), 0, sin(a), 0,
                      0, 1,      0, 0,
                -sin(a), 0, cos(a), 0,
                      0, 0,      0, 1 ]

*/


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



Matrix: {
    desc: false,
    conArgs: "v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32",
    conBlock: "Matrix.conBlock",
    snippets: ["Matrix.copy", "Matrix-methods"],
Init: true,
    mutable: [
        {
            name:  "v00",
            valid: "cpov.isFloat(val)",
            err:   "v00 must be a float."
        }, {
            name:  "v01",
            valid: "cpov.isFloat(val)",
            err:   "v01 must be a float."
        }, {
            name:  "v02",
            valid: "cpov.isFloat(val)",
            err:   "v02 must be a float."
        }, {
            name:  "v10",
            valid: "cpov.isFloat(val)",
            err:   "v10 must be a float."
        }, {
            name:  "v11",
            valid: "cpov.isFloat(val)",
            err:   "v11 must be a float."
        }, {
            name:  "v12",
            valid: "cpov.isFloat(val)",
            err:   "v12 must be a float."
        }, {
            name:  "v20",
            valid: "cpov.isFloat(val)",
            err:   "v20 must be a float."
        }, {
            name:  "v21",
            valid: "cpov.isFloat(val)",
            err:   "v21 must be a float."
        }, {
            name:  "v22",
            valid: "cpov.isFloat(val)",
            err:   "v22 must be a float."
        }, {
            name:  "v30",
            valid: "cpov.isFloat(val)",
            err:   "v30 must be a float."
        }, {
            name:  "v31",
            valid: "cpov.isFloat(val)",
            err:   "v31 must be a float."
        }, {
            name:  "v32",
            valid: "cpov.isFloat(val)",
            err:   "v32 must be a float."
        },
    ]
}


Atmospheric Effects

	Atmospheric media is a Media object not attached to any object, i.e., effectively
	attached to the scene. It has dependencies upon textures, so we're not getting out
	of implementing that first.

	background { color }  ... what it sounds like

		FOG:
		  fog { [FOG_IDENTIFIER] [FOG_ITEMS...] }
		FOG_ITEMS:
		  fog_type Fog_Type | distance Distance | COLOR |
		  turbulence <Turbulence> | turb_depth Turb_Depth |
		  omega Omega | lambda Lambda | octaves Octaves |
		  fog_offset Fog_Offset | fog_alt Fog_Alt |
		  up <Fog_Up> | TRANSFORMATION

	fog   ... there may be any number of fogs applied to a scene
		identifier ... unique string
		fog_type: 1 (constant) or 2	(ground) ... req'd
		distance float ... req'd
		(color) ... req'd
		turbulence float or VectorXYZ  -- see texture docs
			turb_depth ... float ... scales turbulence along the viewing ray
			omega ... float ... magic parameter
			lambda ... float ... magic parameter
			octaves ... int
		fog_offset ... float ... type 2 only, point at along up vector that fog begins to thin
		fog_alt ... float ... type 2 only, rate at which fog thins
		up ... VectorXYZ
		transform ... Matrix

			SKY_SPHERE:
			  sky_sphere { [SKY_SPHERE_IDENTIFIER] [SKY_SPHERE_ITEMS...] }
			SKY_SPHERE_ITEM:
			  PIGMENT | TRANSFORMATION | [emission]

	sky_sphere {
		identifier ... unique string
		pigment ... Pigment ... req'd
		transformation ... Matrix
		emission ... Color
	}

		RAINBOW:
		  rainbow { [RAINBOW_IDENTIFIER] [RAINBOW_ITEMS...] }
		RAINBOW_ITEM:
		  direction <Dir> | angle Angle | width Width |
		  distance Distance | COLOR_MAP | jitter Jitter | up <Up> |
		  arc_angle Arc_Angle | falloff_angle Falloff_Angle

	rainbow {
		identifier ... unique string
		direction ... VectorXYZ ... req'd
		distance ... float ... req'd
		angle ... float ... req'd
		width ... float ... req'd
		color_map ... ColorMap ... req'd
		jitter ... float
		up ... VectorXYZ
		arc_angle ... float
		falloff_angle ... float
	}


Texture

Quoth the docs: The texture statement is an object modifier which describes what
the surface of an object looks like, i.e. its material. Textures are
combinations of pigments, normals, and finishes. Pigment is the color or pattern
of colors inherent in the material. Normal is a method of simulating various
patterns of bumps, dents, ripples or waves by modifying the surface normal
vector. Finish describes the reflective properties of a material.

TEXTURE:
  PLAIN_TEXTURE | PATTERNED_TEXTURE | LAYERED_TEXTURE
PLAIN_TEXTURE:
  texture {
    [TEXTURE_IDENTIFIER]
    [PNF_IDENTIFIER...]
    [PNF_ITEMS...]
    }
PNF_IDENTIFIER:
  PIGMENT_IDENTIFIER | NORMAL_IDENTIFIER | FINISH_IDENTIFIER
PNF_ITEMS:
  PIGMENT | NORMAL | FINISH | TRANSFORMATION
LAYERED_TEXTURE:
  NON_PATTERNED_TEXTURE...
PATTERNED_TEXTURE:
  texture {
    [PATTERNED_TEXTURE_ID]
    [TRANSFORMATIONS...]
    } |
  texture {
    PATTERN_TYPE
    [TEXTURE_PATTERN_MODIFIERS...]
    } |
  texture {
    tiles TEXTURE tile2 TEXTURE
    [TRANSFORMATIONS...]
    } |
  texture {
    material_map {
      BITMAP_TYPE "bitmap.ext"
      [MATERIAL_MODS...] TEXTURE... [TRANSFORMATIONS...]
      }
    }
TEXTURE_PATTERN_MODIFIER:
  PATTERN_MODIFIER | TEXTURE_LIST |
  texture_map { TEXTURE_MAP_BODY }


Interior [...]

Pigment

	PIGMENT:
	  pigment {
		[PIGMENT_IDENTIFIER]
		[PIGMENT_TYPE]
		[PIGMENT_MODIFIER...]
		}
	PIGMENT_TYPE:
	  PATTERN_TYPE | COLOR |
	  image_map {
		BITMAP_TYPE "bitmap.ext" [IMAGE_MAP_MODS...]
		}
	PIGMENT_MODIFIER:
	  PATTERN_MODIFIER | COLOR_LIST | PIGMENT_LIST |
	  color_map { COLOR_MAP_BODY } | colour_map { COLOR_MAP_BODY } |
	  pigment_map { PIGMENT_MAP_BODY } | quick_color COLOR |
	  quick_colour COLOR

pigment {
	identifier ... unique string    // we're going to bypass the SDL declarations and have an internal map for this
	color ... Color            ... yields a simple color pigment
	pattern ... "brick"   + 2 colors + pigment-modifiers
		        "checker" + 2 colors + pigment-modifiers
		        "hexagon" + 3 colors + pigment-modifiers
				"object"  + object + 2 colors
	quick_color ... Color // used for quick test renders
}

Class Hierarchy:

GenMap +
       |
       +--ColorMap
       +--PigmentMap
       +--NormalMap
       +--SlopeMap
       +--TextureMap

BumpMap     }  These are their own creatures.
MaterialMap }



ColorMap

	COLOR_MAP:
	  color_map { COLOR_MAP_BODY } | colour_map { COLOR_MAP_BODY }
	COLOR_MAP_BODY:
	  COLOR_MAP_IDENTIFIER | COLOR_MAP_ENTRY...
	COLOR_MAP_ENTRY:
	  [ Value COLOR ] |
	  [ Value_1, Value_2 color COLOR_1 color COLOR_2 ]

"You may use color_map with any patterns except brick, checker, hexagon, object and image_map."

color_map {
	[0.1 color Red ]      ... 2-256 entries
	[0.3 color Blue ]
	[0.8 color Cyan ]
}


PigmentMap:

This is basically the same as a color map, only using pigments instead of colors

	PIGMENT_MAP:
	  pigment_map { PIGMENT_MAP_BODY }
	PIGMENT_MAP_BODY:
	  PIGMENT_MAP_IDENTIFIER | PIGMENT_MAP_ENTRY...
	PIGMENT_MAP_ENTRY:
	  [ Value PIGMENT_BODY ]

The pigments in a pigment map may be pigment maps themselves or color maps or solid colors.
Image maps, however, cannot be used.

sphere {
  <0,1,2>, 2
  pigment {
    gradient x       //this is the PATTERN_TYPE
    pigment_map {
      [0.3 wood scale 0.2]
      [0.3 Jade]     //this is a pigment identifier
      [0.6 Jade]
      [0.9 marble turbulence 1]
      }
    }
  }


NormalMap:

Syntactically the same as color and pigment maps, only using normals instead.

	NORMAL_MAP:
	  normal_map { NORMAL_MAP_BODY }
	NORMAL_MAP_BODY:
	  NORMAL_MAP_IDENTIFIER | NORMAL_MAP_ENTRY...
	NORMAL_MAP_ENTRY:
	  [ Value NORMAL_BODY ]

normal {
  gradient x       //this is the PATTERN_TYPE
  normal_map {
    [0.3  bumps scale 2]
    [0.3  dents]
    [0.6  dents]
    [0.9  marble turbulence 1]
    }
  }


SlopeMap:

As before, but different data again

	SLOPE_MAP:
	  slope_map { SLOPE_MAP_BODY }
	SLOPE_MAP_BODY:
	  SLOPE_MAP_IDENTIFIER | SLOPE_MAP_ENTRY...
	SLOPE_MAP_ENTRY:
	  [ Value, <Height, Slope> ]

normal {
  gradient x             // this is the PATTERN_TYPE
  slope_map {
    [0   <0, 1>]   // start at bottom and slope up
    [0.5 <1, 1>]   // halfway through reach top still climbing
    [0.5 <1,-1>]   // abruptly slope down
    [1   <0,-1>]   // finish on down slope at bottom
    }
}


BumpMaps, on the other hand, are a completely different kind of creature.


TextureMap:

TEXTURE_MAP:
  texture_map { TEXTURE_MAP_BODY }
TEXTURE_MAP_BODY:
  TEXTURE_MAP_IDENTIFIER | TEXTURE_MAP_ENTRY...
TEXTURE_MAP_ENTRY:
  [ Value TEXTURE_BODY ]

texture {
  gradient x           //this is the PATTERN_TYPE
  texture_map {
    [0.3  pigment{Red} finish{phong 1}]
    [0.3  T_Wood11]    //this is a texture identifier
    [0.6  T_Wood11]
    [0.9  pigment{DMFWood4} finish{Shiny}]
    }
  }


MaterialMap:

Rather more ornate, but essentially a continuation of the map pattern.

MATERIAL_MAP:
  texture {
    material_map {
      BITMAP_TYPE "bitmap.ext"
      [BITMAP_MODS...] TEXTURE... [TRANSFORMATIONS...]
      }
    }
BITMAP_TYPE:
  exr | gif | hdr | iff | jpeg | pgm | png | ppm | sys | tga | tiff
BITMAP_MOD:
  map_type Type | once | interpolate Type

texture {
  material_map {
    png "povmap.png"
      texture {  //used with index 0
        pigment {color red 0.3 green 0.1 blue 1}
        normal  {ripples 0.85 frequency 10 }
        finish  {specular 0.75}
        scale 5
        }
      texture {  //used with index 1
        pigment {White}
        finish {
        ambient 0 diffuse 0
        reflection 0.9 specular 0.75
        }
      }
      // used with index 2
      texture {pigment{NeonPink} finish{Luminous}}
      texture {  //used with index 3
        pigment {
          gradient y
          color_map {
            [0.00 rgb < 1 , 0 , 0>]
            [0.33 rgb < 0 , 0 , 1>]
            [0.66 rgb < 0 , 1 , 0>]
            [1.00 rgb < 1 , 0 , 0>]
            }
          }
        finish{specular 0.75}
        scale 8
        }
    }
  scale 30
  translate <-15, -15, 0>
  }

