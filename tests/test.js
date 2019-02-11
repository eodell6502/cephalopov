//==============================================================================
// This file contains unit/regression tests that output to regression.log, which
// can then be compared with the last known good copy thereof.
//==============================================================================

function main(cpov) {
    var testSerial = 0;
    var fp = new cpov.File("regression.log", "w");

    cpov.imageOptions.createIni = true;

    testHeader(fp, ++testSerial, "Preamble(s) and SDL include(s)");
    fp.write("Results appear in first frame file.\n");
    cpov.outputFrame();

    testHeader(fp, ++testSerial, "ImageOptions: all parameters at init");       imageOptionsTestAtInit(fp);
    testHeader(fp, ++testSerial, "ImageOptions: all parameters after init");    imageOptionsTestAfterInit(fp);
    testHeader(fp, ++testSerial, "GlobalSettings: all parameters at init");     globalSettingsTestAtInit(fp);
    testHeader(fp, ++testSerial, "GlobalSettings: all parameters after init");  globalSettingsTestAfterInit(fp);

	testHeader(fp, ++testSerial, "Box: minimal test");                          boxTestMinimum(fp);
    testHeader(fp, ++testSerial, "BicubicPatch: minimal test");                 bicubicPatchTestMinimum(fp);
    testHeader(fp, ++testSerial, "Blob: minimal test");                         blobTestMinimum(fp);
    testHeader(fp, ++testSerial, "Box: all (applicable) Primitive params");     boxTestAllParams(fp);
    testHeader(fp, ++testSerial, "Cone: minimal test");                         coneTestMinimum(fp);
    testHeader(fp, ++testSerial, "Cubic: minimal test");                        cubicTestMinimum(fp);
    testHeader(fp, ++testSerial, "Cylinder: minimal test");                     cylinderTestMinimum(fp);
    testHeader(fp, ++testSerial, "Disc: minimal test");                         discTestMinimum(fp);
    testHeader(fp, ++testSerial, "HeightField: minimal test");                  heightFieldTestMinimum(fp);
    testHeader(fp, ++testSerial, "IsoSurface: minimal test");                   isoSurfaceTestMinimum(fp);
    testHeader(fp, ++testSerial, "JuliaFractal: minimal test");                 juliaFractalTestMinimum(fp);
    testHeader(fp, ++testSerial, "Lathe: minimal test");                        latheTestMinimum(fp);
    testHeader(fp, ++testSerial, "Mesh: minimal test");                         meshTestMinimum(fp);
    testHeader(fp, ++testSerial, "Ovus: minimal test");                         ovusTestMinimum(fp);
    testHeader(fp, ++testSerial, "Parametric: minimal test");                   parametricTestMinimum(fp);
    testHeader(fp, ++testSerial, "Plane: minimal test");                        planeTestMinimum(fp);
    testHeader(fp, ++testSerial, "Poly: minimal test");                         polyTestMinimum(fp);
    testHeader(fp, ++testSerial, "Polygon: minimal test");                      polygonTestMinimum(fp);
    testHeader(fp, ++testSerial, "Polynomial: minimal test");                   polynomialTestMinimum(fp);
    testHeader(fp, ++testSerial, "Prism: minimal test");                        prismTestMinimum(fp);
    testHeader(fp, ++testSerial, "Quadric: minimal test");                      quadricTestMinimum(fp);
    testHeader(fp, ++testSerial, "Quartic: minimal test");                      quarticTestMinimum(fp);
    testHeader(fp, ++testSerial, "Sor: minimal test");                          sorTestMinimum(fp);
    testHeader(fp, ++testSerial, "Sphere: minimal test");                       sphereTestMinimum(fp);
    testHeader(fp, ++testSerial, "SphereSweep: minimal test");                  sphereSweepTestMinimum(fp);
    testHeader(fp, ++testSerial, "Superellipsoid: minimal test");               superellipsoidTestMinimum(fp);
    testHeader(fp, ++testSerial, "Text: minimal test");                         textTestMinimum(fp);
    testHeader(fp, ++testSerial, "Torus: minimal test");                        torusTestMinimum(fp);
    testHeader(fp, ++testSerial, "Triangle: minimal test");                     triangleTestMinimum(fp);

    testHeader(fp, ++testSerial, "Union: minimal test");                        unionTestMinimum(fp);
    testHeader(fp, ++testSerial, "Merge: minimal test");                        mergeTestMinimum(fp);
    testHeader(fp, ++testSerial, "Intersection: minimal test");                 intersectionTestMinimum(fp);
    testHeader(fp, ++testSerial, "Difference: minimal test");                   differenceTestMinimum(fp);

    testHeader(fp, ++testSerial, "LightSource: minimal test");                  lightSourceTestMinimum(fp);
    testHeader(fp, ++testSerial, "Camera: minimal test");                       cameraTestMinimum(fp);

    testHeader(fp, ++testSerial, "Vector* initializer tests");                  vectorInitializerTest(fp);
    testHeader(fp, ++testSerial, "Member Vector initializer tests");            memberVectorInitializerTest(fp);

    testHeader(fp, ++testSerial, "testStage corner test");                      testStageCornerTest(fp);
    testHeader(fp, ++testSerial, "testStage triplane test");                    testStageTriplaneTest(fp);

    testHeader(fp, ++testSerial, "Primitive/Sphere SDL wrapper test");          testPrimitiveWrappers(fp);

    testHeader(fp, ++testSerial, "Transform debug test #1");                    testTransformDebug1(fp);
    testHeader(fp, ++testSerial, "Transform scale/rotate/translate test");      testTransformSRT(fp);
    testHeader(fp, ++testSerial, "Primitive transformations test");             testPrimitiveTransformations(fp);
}

module.exports = main;

//------------------------------------------------------------------------------
// One-off debugging functions remain in here because they're still useful for
// detecting regressions after the bug has been fixed.
//------------------------------------------------------------------------------


//==============================================================================

function testPrimitiveTransformations(fp) {

    var sphere = new Sphere({ center: [0,0,0], radius: 2, transform: "none" });
    fp.write("INIT NONE:  " + sphere.transform.toSDL() + "\n");
    sphere.scale(2, 2, 2);
    fp.write("SCALED:     " + sphere.transform.toSDL() + "\n");
    sphere.rotate(90, 90, 90);
    fp.write("ROTATED:    " + sphere.transform.toSDL() + "\n");
    sphere.translate(3, 3, 3);
    fp.write("TRANSLATED: " + sphere.transform.toSDL() + "\n");
    sphere.skew({ yx: 1.5 });
    fp.write("SKEWED:     " + sphere.transform.toSDL() + "\n\n");
}


//==============================================================================

function testTransformSRT(fp) {

    var m = new Matrix("none");

    fp.write("INIT NONE:  " + m.toSDL() + "\n");
    m.scale(2, 2, 2);
    fp.write("SCALED:     " + m.toSDL() + "\n");
    m.rotate(90, 90, 90);
    fp.write("ROTATED:    " + m.toSDL() + "\n");
    m.translate(3, 3, 3);
    fp.write("TRANSLATED: " + m.toSDL() + "\n");
    m.skew({yx: 1.5});
    fp.write("SKEWED:     " + m.toSDL() + "\n\n");
}

//==============================================================================

function testTransformDebug1(fp) {
    var scale  = new Matrix("scale", 2, 2, 2);
    var rotate = new Matrix("rotate", 90, 90, 90);

    fp.write("SCALE RAW:  " + scale.toSDL() + "\n");
    fp.write("ROTATE RAW: " + rotate.toSDL() + "\n");

    var sphere = new Sphere({ center: [0,0,0], radius: 2, transform: rotate });
    sphere.transform = scale;
    fp.write("PRE INIT 2: " + sphere.transform.toSDL() + "\n");
    var sphere = new Sphere({ center: [0,0,0], radius: 2 });
    sphere.transform = rotate;
    fp.write("POST INIT 1: " + sphere.transform.toSDL() + "\n");
    sphere.transform = scale;
    fp.write("POST INIT 2: " + sphere.transform.toSDL() + "\n\n");

}


//==============================================================================

function testPrimitiveWrappers(fp) {
    var sphere = new Sphere({ center: [0,0,0], radius: 2 });
    sphere.SDLPrepend = "// This should be a comment before";
    sphere.SDLAppend = "// This should be a comment after";
    fp.write(sphere.toSDL() + "\n\n");
}

//==============================================================================

function testStageTriplaneTest(fp) {

    var result = cpov.testStage("triplane", 6);
    for(var i = 0; i < result.length; i++)
        fp.write(result[i].toSDL() + "\n");
    fp.write("\n");

}

//==============================================================================

function testStageCornerTest(fp) {

    var result = cpov.testStage("corner", 6);
    for(var i = 0; i < result.length; i++)
        fp.write(result[i].toSDL() + "\n");
    fp.write("\n");

}

//==============================================================================

function memberVectorInitializerTest(fp) {

    var box1 = new Box();
    box1.id = "box1";
    box1.corner1 = [ 0, 0, 0 ];
    box1.corner2 = [ 1, 1, 1 ];
    fp.write(box1.toSDL() + "\n\n");

    var box2 = new Box({corner1: [ 1, 1, 1 ], corner2: [ 2, 2, 2 ], id: "box2"});
    fp.write(box2.toSDL() + "\n\n");

}

//==============================================================================

function vectorInitializerTest(fp) {

    var uv1 = new VectorUV();
    uv1.u = 0;
    uv1.v = 1;

    var uv2 = new VectorUV({ u: 2, v: 3 });

    var uv3 = new VectorUV([4, 5]);

    fp.write(uv1.toSDL() + " // UV setter\n\n");
    fp.write(uv2.toSDL() + " // UV object\n\n");
    fp.write(uv3.toSDL() + " // UV array\n\n");

    //--------------------------------------------------------------------------

    var xy1 = new VectorXY();
    xy1.x = 0;
    xy1.y = 1;

    var xy2 = new VectorXY({ x: 2, y: 3 });

    var xy3 = new VectorXY([4, 5]);

    fp.write(xy1.toSDL() + " // XY setter\n\n");
    fp.write(xy2.toSDL() + " // XY object\n\n");
    fp.write(xy3.toSDL() + " // XY array\n\n");

    //--------------------------------------------------------------------------

    var xyz1 = new VectorXYZ();
    xyz1.x = 0;
    xyz1.y = 1;
    xyz1.z = 2;

    var xyz2 = new VectorXYZ({ x: 3, y: 4, z: 5 });

    var xyz3 = new VectorXYZ([6, 7, 8]);

    fp.write(xyz1.toSDL() + " // XYZ setter\n\n");
    fp.write(xyz2.toSDL() + " // XYZ object\n\n");
    fp.write(xyz3.toSDL() + " // XYZ array\n\n");

    //--------------------------------------------------------------------------

    var xyzw1 = new VectorXYZW();
    xyzw1.x = 0;
    xyzw1.y = 1;
    xyzw1.z = 2;
    xyzw1.w = 3;

    var xyzw2 = new VectorXYZW({ x: 4, y: 5, z: 6, w: 7 });

    var xyzw3 = new VectorXYZW([8, 9, 10, 11]);

    fp.write(xyzw1.toSDL() + " // XYZW setter\n\n");
    fp.write(xyzw2.toSDL() + " // XYZW object\n\n");
    fp.write(xyzw3.toSDL() + " // XYZW array\n\n");

}


//==============================================================================

function cameraTestMinimum(fp) {

    var params = {
        type: "perspective",
        lookAt: new VectorXYZ({x: 0, y: 0, z: 0}),
        location: new VectorXYZ({x: 5, y: 5, z: 5}),
        id: "cameraTestMinimum"
    };

    var obj = new Camera(params);
    fp.write(obj.toSDL() + "\n\n");
}


//==============================================================================

function lightSourceTestMinimum(fp) {

    var params = {
        type: "point",
        location: new VectorXYZ({x: 1, y: 1, z: 1}),
        color: new Color({r: 1, g: 1, b: 1}),
        adaptive: 1,
        fadeDistance: 5.1,
        fadePower: 1.2,
        id: "point_lightSourceTestMinimum"
    };

    var obj = new LightSource(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function differenceTestMinimum(fp) {

    var params = {
        positiveComponent: new Box({ corner1: [0.5, 0.5, 0.5], corner2: [1.5, 1.5, 1.5] }),
        negativeComponents: [
            new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1] }),
            new Box({ corner1: [1, 1, 1], corner2: [2, 2, 2] })
        ],
        id: "differenceTestMinimum"
    };

    var obj = new Difference(params);
    fp.write(obj.toSDL() + "\n\n");
}


//==============================================================================

function intersectionTestMinimum(fp) {

    var params = {
        components: [
            new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1] }),
            new Box({ corner1: [0.5, 0.5, 0.5], corner2: [1.5, 1.5, 1.5] }),
            new Box({ corner1: [1, 1, 1], corner2: [2, 2, 2] })
        ],
        id: "intersectionTestMinimum"
    };

    var obj = new Intersection(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function intersectionTestMinimum(fp) {

    var params = {
        components: [
            new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1] }),
            new Box({ corner1: [0.5, 0.5, 0.5], corner2: [1.5, 1.5, 1.5] }),
            new Box({ corner1: [1, 1, 1], corner2: [2, 2, 2] })
        ],
        id: "intersectionTestMinimum"
    };

    var obj = new Intersection(params);
    fp.write(obj.toSDL() + "\n\n");
}


//==============================================================================

function mergeTestMinimum(fp) {

    var params = {
        components: [
            new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1] }),
            new Box({ corner1: [0.5, 0.5, 0.5], corner2: [1.5, 1.5, 1.5] }),
            new Box({ corner1: [1, 1, 1], corner2: [2, 2, 2] })
        ],
        id: "mergeTestMinimum"
    };

    var obj = new Merge(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function unionTestMinimum(fp) {

    var params = {
        components: [
            new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1] }),
            new Box({ corner1: [0.5, 0.5, 0.5], corner2: [1.5, 1.5, 1.5] }),
            new Box({ corner1: [1, 1, 1], corner2: [2, 2, 2] })
        ],
        splitUnion: true,
        id: "unionTestMinimum"
    };

    var obj = new Union(params);
    fp.write(obj.toSDL() + "\n\n");
}


//==============================================================================

function sphereSweepTestMinimum(fp) {

    var params = {
        type: "linearSpline",
		spheres: [ new Sphere({ center: [1, 2, 3], radius: 1.2 }), new Sphere({ center: [4, 5, 6], radius: 2.4 }) ],
		tolerance: 1.2,
        id: "sphereSweepTestMinimum"
    };

    var obj = new SphereSweep(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function sorTestMinimum(fp) {

    var params = {
        points: [ new VectorXY({x:0,y:0}), new VectorXY({x:1,y:1}), new VectorXY({x:0,y:2}) ],
        id: "sorTestMinimum"
    };

    var obj = new Sor(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function quarticTestMinimum(fp) {

    var params = {
        coefficients: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,2,122,23,24,25,26,27,28,29,30,31,32,33,34,35],
        id: "quarticTestMinimum"
    };

    var obj = new Quartic(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function quadricTestMinimum(fp) {

    var params = {
        coefficients: [1,2,3,4,5,6,7,8,9,10],
        id: "quadricTestMinimum"
    };

    var obj = new Quadric(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function polynomialTestMinimum(fp) {

    var params = {
        order: 2,
        coefficients: [
            new VectorXYZW({x:1,  y:10, z:2, w:1}),
            new VectorXYZW({x:2,  y:9,  z:4, w:2}),
            new VectorXYZW({x:3,  y:8,  z:6, w:1}),
            new VectorXYZW({x:4,  y:7,  z:8, w:2}),
            new VectorXYZW({x:5,  y:6,  z:6, w:1}),
            new VectorXYZW({x:6,  y:5,  z:4, w:2}),
            new VectorXYZW({x:7,  y:4,  z:2, w:1}),
            new VectorXYZW({x:8,  y:3,  z:0, w:2}),
            new VectorXYZW({x:9,  y:2,  z:2, w:1}),
            new VectorXYZW({x:10, y:1,  z:4, w:2}),
        ],
        sturm: true,
        id: "polynomialTestMinimum"
    };

    var obj = new Polynomial(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function polyTestMinimum(fp) {

    var params = {
        order: 3,
        coefficients: [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0 ],
        sturm: true,
        id: "polyTestMinimum"
    };

    var obj = new Poly(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function parametricTestMinimum(fp) {

    var box = new Box({corner1: [0,0,0], corner2: [1,1,1]});

    var params = {
        funcX: "&foo",
        funcY: "&bar",
        funcZ: "&baz",
        uv1: new VectorUV({u:0, v:0}),
        uv2: new VectorUV({u:1, v:1}),
        containedBy: box,
        maxGradient: 1.2,
        accuracy: 1.3,
        precomputeDepth: 4,
        precomputeX: true,
        precomputeY: true,
        precomputeZ: true,
        id: "parametricTestMinimum"
    };

    var obj = new Parametric(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function meshTestMinimum(fp) {

    var a = new VectorXYZ({x:0, y:0, z:0});
    var b = new VectorXYZ({x:0, y:1, z:0});
    var c = new VectorXYZ({x:0, y:0, z:1});
    var d = new VectorXYZ({x:2, y:2, z:2});

    var triangle1 = new Triangle({corner1: a, corner2: b, corner3: c});
    var triangle2 = new Triangle({corner1: d, corner2: b, corner3: c});

    var params = {
        triangles: [triangle1, triangle2],
        insideVector: new VectorXYZ({x:0, y:1, z:0}),
        hierarchy: true,
        id: "meshTestMinimum"
    };

    var obj = new Mesh(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function latheTestMinimum(fp) {

    var params = {
        type: "linearSpline",
        points: [ new VectorXY({x:0, y:0}), new VectorXY({x:1, y:1}), new VectorXY({x:0, y:1}) ],
        sturm: true,
        id: "latheTestMinimum"
    };

    var obj = new Lathe(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function isoSurfaceTestMinimum(fp) {

    var params = {
        source: "&foo",
        containedBy: new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1]}),
        threshold: 1.0,
        accuracy: 1.2,
        maxGradient: 1.3,
        evaluate: [ 2.0, 2.1, 2.2 ],
        open: true,
        maxTrace: "allIntersections",
        id: "isoSurfaceTestMinimum"
    };

    var obj = new IsoSurface(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function cubicTestMinimum(fp) {

    var params = {
        coefficients: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
        sturm: true,
        id: "cubicTestMinimum"
    };

    var obj = new Cubic(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function blobTestMinimum(fp) {

    var sphere   = new Sphere({ center: new VectorXYZ({ x: 0, y: 0, z: 0 }), radius: 1.0, strength: 1.2 });
    var cylinder = new Cylinder({ basePoint: new VectorXYZ({ x: 1, y: 1, z: 1 }), capPoint: new VectorXYZ({ x: 2, y: 2, z: 2 }), radius: 2.0, strength: 1.8 });

    var params = {
        components: [sphere, cylinder],
        threshold: 1.0,
        sturm: true,
        hierarchy: true,
        id: "blobTestMinimum"
    };

    var obj = new Blob(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function bicubicPatchTestMinimum(fp) {
    var params = {
        type: 1,
        points: [
            new VectorXYZ({ x: 1, y: 1, z: 1 }),
            new VectorXYZ({ x: 2, y: 1, z: 2 }),
            new VectorXYZ({ x: 3, y: 1, z: 5 }),
            new VectorXYZ({ x: 4, y: 1, z: 2 }),
            new VectorXYZ({ x: 1, y: 2, z: 1 }),
            new VectorXYZ({ x: 2, y: 2, z: 7 }),
            new VectorXYZ({ x: 3, y: 2, z: 3 }),
            new VectorXYZ({ x: 4, y: 2, z: 2 }),
            new VectorXYZ({ x: 1, y: 3, z: 2 }),
            new VectorXYZ({ x: 2, y: 3, z: 5 }),
            new VectorXYZ({ x: 3, y: 3, z: 4 }),
            new VectorXYZ({ x: 4, y: 3, z: 1 }),
            new VectorXYZ({ x: 1, y: 4, z: 2 }),
            new VectorXYZ({ x: 2, y: 4, z: 4 }),
            new VectorXYZ({ x: 3, y: 4, z: 7 }),
            new VectorXYZ({ x: 4, y: 4, z: 1 }),
        ],
        flatness: 1.0,
        uSteps: 32,
        vSteps: 32,
        id: "bicubicPatchTestMinimum"
    };

    var obj = new BicubicPatch(params);
    fp.write(obj.toSDL() + "\n\n");

}

//==============================================================================

function heightFieldTestMinimum(fp) {
    var params = {
        source: "foo.png",
        hfType: "png",
        smooth: true,
        waterLevel: 0.2,
        hierarchy: true,
        gamma: 1.2,
        premult: true,
        id: "heightFieldTestMinimum"
    };

    var obj = new HeightField(params);
    fp.write(obj.toSDL() + "\n\n");

}

//==============================================================================

function textTestMinimum(fp) {
    var params = {
        fontType: "ttf",
        font: "Arial",
        displayText: "POV-Ray rules!",
        thickness: 1,
        offset: 1.2,
        id: "textTestMinimum"
    };

    var obj = new Text(params);
    fp.write(obj.toSDL() + "\n\n");

}



//==============================================================================

function polygonTestMinimum(fp) {
    var params = {
        points: [ new VectorXY({ x: 0, y: 0 }), new VectorXY({ x: 1, y: 1 }), new VectorXY({ x: 1 , y: 0 }) ],
        id: "polygonTestMinimum"
    };

    var obj = new Polygon(params);
    fp.write(obj.toSDL() + "\n\n");

}


//==============================================================================

function triangleTestMinimum(fp) {
    var params = {
        corner1: new VectorXYZ({ x: 0, y: 0, z: 0 }),
        corner2: new VectorXYZ({ x: 1, y: 0, z: 0 }),
        corner3: new VectorXYZ({ x: 1, y: 1, z: 0 }),
        id: "triangleTestMinimum"
    };

    var obj = new Triangle(params);
    fp.write(obj.toSDL() + "\n\n");

    params.normal1 = new VectorXYZ({ x: 0, y: 1, z: 0 });
    params.normal2 = new VectorXYZ({ x: 1, y: 1, z: 0 });
    params.normal3 = new VectorXYZ({ x: 0, y: 1, z: 1 });
    params.smooth = true;
    params.id = "smoothTriangleTestMinimum"

    var obj = new Triangle(params);
    fp.write(obj.toSDL() + "\n\n");
}

//==============================================================================

function torusTestMinimum(fp) {
    var params = {
        majorRadius: 20,
        minorRadius: 4,
        sturm: true,
        id: "torusTestMinimum"
    };

    var torus = new Torus(params);

    fp.write(torus.toSDL() + "\n\n");
}

//==============================================================================

function superellipsoidTestMinimum(fp) {
    var params = {
        e: 5,
        n: 4,
        id: "superellipsoidTestMinimum"
    };

    var superellipsoid = new Superellipsoid(params);

    fp.write(superellipsoid.toSDL() + "\n\n");
}


//==============================================================================

function sphereTestMinimum(fp) {
    var params = {
        center: new VectorXYZ({ x: 0, y: 5, z: 15 }),
        radius: 12,
        id: "sphereTestMinimum"
    };

    var sphere = new Sphere(params);

    fp.write(sphere.toSDL() + "\n\n");
}

//==============================================================================

function prismTestMinimum(fp) {
    var params = {
        type: "linearSpline",
        height1: 0,
        height2: 0,
        points: [ new VectorXY({ x: 0, y: 0 }), new VectorXY({ x: 1, y: 1 }), new VectorXY({ x: 1 , y: 0 }) ],
        open: true,
        sturm: true,
        id: "prismTestMinimum"
    };

    var prism = new Prism(params);

    fp.write(prism.toSDL() + "\n\n");
}

//==============================================================================

function juliaFractalTestMinimum(fp) {
    var params = {
        type: "hypercomplex:reciprocal",
        juliaParam: new VectorXYZW({ x: 1, y: 2, z: 3, w: 4 }),
        power: new VectorXY({ x: 2, y: 3 }),
        maxIter: 2500,
        precision: 5,
        slice: new VectorXYZW({ x: 1.1, y: 2.2, z: 3.3, w: 4.4 }),
        distance: 2.1,
        id: "juliaFractalMinimum"
    };

    var juliaFractal = new JuliaFractal(params);

    fp.write(juliaFractal.toSDL() + "\n\n");
}

//==============================================================================

function planeTestMinimum(fp) {
    var params = {
        normal: new VectorXYZ({ x: 1, y: 0, z: 0 }),
        distance: 22,
        id: "planeTestMinimum"
    };

    var plane = new Plane(params);

    fp.write(plane.toSDL() + "\n\n");
}

//==============================================================================

function ovusTestMinimum(fp) {
    var params = {
        bottomRadius: 10,
        topRadius: 5,
        id: "ovusTestMinimum"
    };

    var ovus = new Ovus(params);

    fp.write(ovus.toSDL() + "\n\n");
}

//==============================================================================

function discTestMinimum(fp) {
    var params = {
        center: new VectorXYZ({x: 3, y: 4, z: 5}),
        normal: new VectorXYZ({x: 0, y: 1, z: 0}),
        radius: 5,
        holeRadius: 10,
        id: "discTestMinimum"
    };

    var disc = new Disc(params);

    fp.write(disc.toSDL() + "\n\n");
}


//==============================================================================

function cylinderTestMinimum(fp) {
    var params = {
        basePoint: new VectorXYZ({ x: 0, y: 0, z: 0 }),
        radius: 5,
        capPoint: new VectorXYZ({ x: 1, y: 2, z: 3 }),
        open: true,
        id: "cylinderTestMinimum"
    };

    var cylinder = new Cylinder(params);

    fp.write(cylinder.toSDL() + "\n\n");
}

//==============================================================================

function coneTestMinimum(fp) {

    var params = {
        basePoint: new VectorXYZ({ x: 0, y: 0, z: 0 }),
        baseRadius: 5,
        capPoint: new VectorXYZ({ x: 1, y: 2, z: 3 }),
        capRadius: 0,
        open: true,
        id: "coneTestMinimum"
    };

    var cone = new Cone(params);

    fp.write(cone.toSDL() + "\n\n");
}


//==============================================================================

function boxTestAllParams(fp) {

    var xform = new Matrix("scale", 1, 2, 3);

    var params = {
        corner1: [0, 0, 0],
        corner2: [1, 1, 1],
        transform: xform,
        doubleIlluminate: true,
        hollow: true,
        inverse: true,
        noImage: true,
        noRadiosity: true,
        noReflection: true,
        noShadow: true,
        id: "commonParamTest"
    };

    var box = new Box(params);

    fp.write(box.toSDL() + "\n\n");
}

//==============================================================================

function boxTestMinimum(fp) {
    var boxArray  = new Box({ corner1: [0, 0, 0], corner2: [1, 1, 1], id: "BoxArray" });
    var corner1 = new VectorXYZ({ x: 2, y: 3, z: 4 });
    var corner2 = new VectorXYZ({ x: 5, y: 6, z: 7 });
    var boxVector = new Box({ corner1: corner1, corner2: corner2, id: "BoxVector"});

    fp.write(boxArray.toSDL() + "\n\n");
    fp.write(boxVector.toSDL() + "\n");
}


//==============================================================================

function imageOptionsTestAtInit(fp) {

    var options = {
        allConsole: true,
        allFile: "poof",
        antialias: true,
        antialiasDepth: 5,
        antialiasGamma: 1.81,
        antialiasThreshold: 2.2,
        appendFile: true,
        bitsPerColor: 8,
        bounding: true,
        boundingMethod: 1,
        boundingThreshold: 5,
        bspBaseAccessCost: 1.3,
        bspChildAccessCost: 2.4,
        bspIsectCost: 3.5,
        bspMaxDepth: 9,
        bspMissChance: 0.03,
        continueTrace: true,
        createIni: "piddle.ini",
        debugConsole: false,
        debugFile: true,
        display: true,
        displayGamma: 'sRGB',
        dither: false,
        ditherMethod: 'FS',
        endColumn: 256,
        endRow: 256,
        exePath: "c:\\bin\\povray.exe",
        fatalConsole: true,
        fatalErrorCommand: "dir",
        fatalErrorReturn: "I",
        fatalFile: false,
        fileGamma: 1.2,
        height: 480,
        highReproducibility: false,
        includeHeader: "foop",
        inputFileName: "blarp.pov",
        jitter: true,
        jitterAmount: 1.5,
        libraryPath: ["c:\\dat\\lib"],
        maxImageBufferMemory: 2500000,
        outputAlpha: true,
        outputFileName: "squink.png",
        outputFileType: "S",
        outputToFile: true,
        palette: "X",
        pauseWhenDone: false,
        postFrameCommand: "dir c:\\",
        postFrameReturn: "-S",
        postSceneCommand: "dir foo",
        postSceneReturn: "Q",
        preFrameCommand: "dir d:\\",
        preFrameReturn: "A",
        preSceneCommand: "dir d:\\prog",
        preSceneReturn: "!F",
        previewEndSize: 2,
        previewStartSize: 4,
        quality: 11,
        radiosityFileName: "rfoo",
        radiosityFromFile: "rbar",
        radiosityToFile: "rbaz",
        radiosityVainPretrace: false,
        removeBounds: false,
        renderBlockSize: 4,
        renderBlockStep: 1,
        renderConsole: true,
        renderFile: "blart",
        renderPattern: 4,
        samplingMethod: 2,
        splitUnions: false,
        startColumn: 32,
        startRow: 32,
        statisticConsole: true,
        statisticFile: "stats.log",
        testAbort: false,
        testAbortCount: 2,
        userAbortCommand: "dir manama",
        userAbortReturn: "-F",
        verbose: true,
        videoMode: "Y",
        warningConsole: true,
        warningFile: "warn.txt",
        warningLevel: 5,
        width: 640,
        workThreads: 8,
    };

    var obj = new ImageOptions(options);
    var result = obj.output();

    fp.write("CLI string: " + result.cli + "\n\n");
    fp.write("INI file:\n\n" + result.ini + "\n");
}


//==============================================================================

function imageOptionsTestAfterInit(fp) {

    var obj = new ImageOptions();

    obj.allConsole = true;
    obj.allFile = "poof";
    obj.antialias = true;
    obj.antialiasDepth = 5;
    obj.antialiasGamma = 1.81;
    obj.antialiasThreshold = 2.2;
    obj.appendFile = true;
    obj.bitsPerColor = 8;
    obj.bounding = true;
    obj.boundingMethod = 1;
    obj.boundingThreshold = 5;
    obj.bspBaseAccessCost = 1.3;
    obj.bspChildAccessCost = 2.4;
    obj.bspIsectCost = 3.5;
    obj.bspMaxDepth = 9;
    obj.bspMissChance = 0.03;
    obj.continueTrace = true;
    obj.createIni = "piddle.ini";
    obj.debugConsole = false;
    obj.debugFile = true;
    obj.display = true;
    obj.displayGamma = 'sRGB';
    obj.dither = false;
    obj.ditherMethod = 'FS';
    obj.endColumn = 256;
    obj.endRow = 256;
    obj.exePath = "c:\\bin\\povray.exe";
    obj.fatalConsole = true;
    obj.fatalErrorCommand = "dir";
    obj.fatalErrorReturn = "I";
    obj.fatalFile = false;
    obj.fileGamma = 1.2;
    obj.height = 480;
    obj.highReproducibility = false;
    obj.includeHeader = "foop";
    obj.inputFileName = "blarp.pov";
    obj.jitter = true;
    obj.jitterAmount = 1.5;
    obj.libraryPath = ["c:\\dat\\lib"];
    obj.maxImageBufferMemory = 2500000;
    obj.outputAlpha = true;
    obj.outputFileName = "squink.png";
    obj.outputFileType = "S";
    obj.outputToFile = true;
    obj.palette = "X";
    obj.pauseWhenDone = false;
    obj.postFrameCommand = "dir c:\\";
    obj.postFrameReturn = "-S";
    obj.postSceneCommand = "dir foo";
    obj.postSceneReturn = "Q";
    obj.preFrameCommand = "dir d:\\";
    obj.preFrameReturn = "A";
    obj.preSceneCommand = "dir d:\\prog";
    obj.preSceneReturn = "!F";
    obj.previewEndSize = 1;
    obj.previewStartSize = 8;
    obj.quality = 11;
    obj.radiosityFileName = "rfoo";
    obj.radiosityFromFile = "rbar";
    obj.radiosityToFile = "rbaz";
    obj.radiosityVainPretrace = false;
    obj.removeBounds = false;
    obj.renderBlockSize = 4;
    obj.renderBlockStep = 1;
    obj.renderConsole = true;
    obj.renderFile = "blart";
    obj.renderPattern = 4;
    obj.samplingMethod = 2;
    obj.splitUnions = false;
    obj.startColumn = 32;
    obj.startRow = 32;
    obj.statisticConsole = true;
    obj.statisticFile = "stats.log";
    obj.testAbort = false;
    obj.testAbortCount = 2;
    obj.userAbortCommand = "dir manama";
    obj.userAbortReturn = "-F";
    obj.verbose = true;
    obj.videoMode = "Y";
    obj.warningConsole = true;
    obj.warningFile = "warn.txt";
    obj.warningLevel = 5;
    obj.width = 640;
    obj.workThreads = 8;

    var result = obj.output();

    fp.write("CLI string: " + result.cli + "\n\n");
    fp.write("INI file:\n\n" + result.ini + "\n");
}


//==============================================================================

function globalSettingsTestAtInit(fp) {

    var someColor = new Color({ r: 1.0, g: 1.0, b: 0.0 });

    var options = {
        adcBailout: 5.0,
        ambientLight: someColor,
        assumedGamma: .15,
        charset: 'utf8',
        iridWavelength: someColor,
        maxIntersections: 5,
        maxTraceLevel: 6,
        mmPerUnit: 0.1,
        noiseGenerator: 2,
        numberOfWaves: 2,
        photon: true,
        photonAdcBailout: 4.5,
        photonAutostop: 0.54,
        photonCount: 66,
        photonExpandThresholds: [ 0.1, 6 ],
        photonGather: [5, 8],
        photonJitter: 1.2,
        photonLoadFile: "foo",
        photonMaxTraceLevel: 4,
        photonMedia: [5, 0.222],
        photonRadius: [1.2, 6, 0.02, -1.2],
        photonSaveFile: "bar",
        photonSpacing: null,
        radAdcBailout: 1.2,
        radAlwaysSample: false,
        radBrightness: 0.6,
        radCount: [1, 2],
        radErrorBound: 6.2,
        radGrayThreshold: 0.26,
        radiosity: true,
        radLowErrorFactor: 2,
        radMaximumReuse: 5.0,
        radMaxSample: 0.12,
        radMinimumReuse: 2.1,
        radNearestCount: 15,
        radNormal: true,
        radPretraceEnd: 0.2,
        radPretraceStart: 0.8,
        radRecursionLimit: 5,
        radSubsurface: true,
        subRadiosity: true,
        subSamples: [7, 19],
        subsurface: true
    };

    var gs = new GlobalSettings(options);
    fp.write(gs.toSDL() + "\n");

}


//==============================================================================

function globalSettingsTestAfterInit(fp) {

    var gs = new GlobalSettings();

    var someColor = new Color({ r: 1.0, g: 1.0, b: 0.0 });

    gs.adcBailout = 5.0;
    gs.ambientLight = someColor;
    gs.assumedGamma = .15;
    gs.charset = 'utf8';
    gs.iridWavelength = someColor;
    gs.maxIntersections = 5;
    gs.maxTraceLevel = 6;
    gs.mmPerUnit = 0.1;
    gs.noiseGenerator = 2;
    gs.numberOfWaves = 2;
    gs.photon = true;
    gs.photonAdcBailout = 4.5;
    gs.photonAutostop = 0.54;
    gs.photonCount = 66;
    gs.photonExpandThresholds = [ 0.1, 6 ];
    gs.photonGather = [5, 8];
    gs.photonJitter = 1.2;
    gs.photonLoadFile = "foo";
    gs.photonMaxTraceLevel = 4;
    gs.photonMedia = [5, 0.222];
    gs.photonRadius = [1.2, 6, 0.02, -1.2];
    gs.photonSaveFile = "bar";
    gs.photonSpacing = null;
    gs.radAdcBailout = 1.2;
    gs.radAlwaysSample = false;
    gs.radBrightness = 0.6;
    gs.radCount = [1, 2];
    gs.radErrorBound = 6.2;
    gs.radGrayThreshold = 0.26;
    gs.radiosity = true;
    gs.radLowErrorFactor = 2;
    gs.radMaximumReuse = 5.0;
    gs.radMaxSample = 0.12;
    gs.radMinimumReuse = 2.1;
    gs.radNearestCount = 15;
    gs.radNormal = true;
    gs.radPretraceEnd = 0.2;
    gs.radPretraceStart = 0.8;
    gs.radRecursionLimit = 5;
    gs.radSubsurface = true;
    gs.subRadiosity = true;
    gs.subSamples = [7, 19];
    gs.subsurface = true


    fp.write(gs.toSDL() + "\n");

}



//==============================================================================

function testHeader(fp, serial, name) {
    if(serial > 1)
        fp.write("\n\n");
    fp.write(
        "//==============================================================================\n"
        + "// TEST #" + serial + ": " + name + "\n"
        + "//==============================================================================\n\n"
    );
}




