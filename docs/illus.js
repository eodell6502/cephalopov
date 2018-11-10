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

    var texture = "texture { pigment { color <1, 1, 0> }}";
    var stage = cpov.testStage("corner", 6);

    // Box //-------------------------------------------------------------------

    cpov.outputBase = "./docs/src/box_basic";
    stage[0].snapshot(); stage[1].snapshot();

    var obj = new Box({ corner1: [2,2,2], corner2: [-2, -2, -2], texture: texture });
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



}

module.exports = main;
