
function main(cpov) {
    var testSerial = 0;
    var fp = new cpov.File("regression.log", "w");

    testHeader(fp, ++testSerial, "Box - basic");
    fp.write("Exec: new Box({ corner1: [0,0,0], corner2: [1,1,1]});\n\n");
	var box = new Box({ corner1: [0,0,0], corner2: [1,1,1]});
    fp.write(box.toSDL());
}


function testHeader(fp, serial, name) {
    if(serial > 1)
        fp.write("\n\n");
    fp.write(
        "//==============================================================================\n"
        + "// TEST #" + serial + ": " + name + "\n"
        + "//==============================================================================\n\n"
    );
}



module.exports = main;
