//==============================================================================
// This CephaloPOV program generates the POV-Ray scripts for producing the
// illustrations for the documentation.
//==============================================================================


function main(cpov) {
    cpov.snapshotMode = true;
    cpov.imageOptions.height = 320;
    cpov.imageOptions.width  = 320;
    cpov.imageOptions.outputFileType = "N";
    cpov.imageOptions.createIni = true;
    cpov.imageOptions.outputAlpha = true;
    cpov.imageOptions.antialias = true;
    cpov.imageOptions.antialiasDepth = 9;
	cpov.globalSettings.ambientLight = [0.25, 0.25, 0.25];

    var texture = "texture { pigment { color <1, 1, 0> }}";
    var stage = cpov.testStage("corner", 6);

    // BicubicPatch //----------------------------------------------------------

    cpov.outputBase = "./docs/src/bicubicpatch_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new BicubicPatch({
		type: 0,
		flatness: 0.01,
		uSteps: 4,
		vSteps: 4,
		points: [
			[-2,  2, -2], [-2, -1, -1], [-2,  0, 0], [-2,  1, 1],
			[-1,  1, -2], [-1,  2, -1], [-1, -1, 0], [-1,  0, 1],
			[ 0,  0, -2], [ 0,  1, -1], [ 0,  2, 0], [ 0, -1, 1],
			[ 2, -1, -2], [ 2,  0, -1], [ 2,  1, 0], [ 2,  2, 1],
		],
		texture: texture
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Blob //------------------------------------------------------------------

    cpov.outputBase = "./docs/src/blob_basic";
    stage[0].snapshot(); stage[1].snapshot();



    var obj = new Blob({
		components: [
			new Sphere({ center: [-1.5, -1.5, -1.5], radius: 2, strength: 4 }),
			new Sphere({ center: [   0,    0,    0], radius: 2, strength: 4 }),
			new Sphere({ center: [ 1.5,  1.5,  1.5], radius: 2, strength: 4 }),
		],
		texture: texture
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Box //-------------------------------------------------------------------

    cpov.outputBase = "./docs/src/box_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Box({
		corner1: [2,2,2],
		corner2: [-2, -2, -2],
		texture: texture
	});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Cone //------------------------------------------------------------------

    cpov.outputBase = "./docs/src/cone_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Cone({
        basePoint: [0, -2, 0],
        baseRadius: 2,
        capPoint: [0, 2, 0],
        capRadius: 0,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

    // Cylinder //--------------------------------------------------------------

    cpov.outputBase = "./docs/src/cylinder_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Cylinder({
        basePoint: [0, -2, 0],
        capPoint: [0, 2, 0],
        radius: 2,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Disc //------------------------------------------------------------------

	cpov.outputBase = "./docs/src/disc_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Disc({
        center: [0, 0, 0],
		radius: 2,
		holeRadius: 1,
		normal: [0, 1, 0],
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// JuliaFractal //----------------------------------------------------------

	cpov.outputBase = "./docs/src/julia_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new JuliaFractal({
		juliaParam: [-0.083, 0.0, -0.83, -0.025],
		type: "quaternion:sqr",
		maxIter: 8,
		precision: 15,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Ovus //------------------------------------------------------------------

	cpov.outputBase = "./docs/src/ovus_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Ovus({
		bottomRadius: 2,
	    topRadius: 1,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Plane //----------------------------------------------------------------

	cpov.outputBase = "./docs/src/plane_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Plane({
		distance: 0,
		normal: [0, 1, 0],
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Polygon //--------------------------------------------------------------

	cpov.outputBase = "./docs/src/polygon_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Polygon({
		points: [[-2, 2], [2, 2], [2, -2], [-2, -2], [-2, 2], [-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]],
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Prism //-----------------------------------------------------------------

	cpov.outputBase = "./docs/src/prism_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Prism({
		height1: -2,
		height2: 2,
		type: "linearSpline",
		points: [[-2, 2], [2, 2], [2, -2], [-2, -2], [-2, 2], [-1, 1], [1, 1], [1, -1], [-1, -1], [-1, 1]],
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();


    // Sphere //----------------------------------------------------------------

    cpov.outputBase = "./docs/src/sphere_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Sphere({ center: [0,0,0], radius: 2, texture: texture});
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Superellipsoid //--------------------------------------------------------

	cpov.outputBase = "./docs/src/superellipsoid_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Superellipsoid({
		e: 0.25,
		n: 0.25,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

	// Torus //-----------------------------------------------------------------

	cpov.outputBase = "./docs/src/torus_basic";
    stage[0].snapshot(); stage[1].snapshot();

	var obj = new Torus({
		minorRadius: 0.5,
		majorRadius: 2,
        texture: texture
    });
    obj.snapshot();

    cpov.outputFrame();
    obj.destroy();

}


module.exports = main;
