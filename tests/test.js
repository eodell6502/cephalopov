/*

node ..\cpov.js -i d:\projects\CephaloPOV\tests\test.js -p d:\projects\CephaloPOV\tests\preamble1.sdl -p d:\projects\CephaloPOV\tests\preamble2.sdl -s colors.inc -s glass.inc

*/


function main(cpov) {
    var testSerial = 0;
    var fp = new cpov.File("regression.log", "w");

    testHeader(fp, ++testSerial, "Preamble(s) and SDL include(s)");
    fp.write("Results appear in first frame file.\n");
    cpov.outputFrame();

    testHeader(fp, ++testSerial, "ImageOptions: all parameters at init");
    imageOptionsTestAtInit(fp);

    testHeader(fp, ++testSerial, "ImageOptions: all parameters after init");
    imageOptionsTestAfterInit(fp);

}


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
        libraryPath: "c:\\dat\\lib",
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
        previewEndSize: 1,
        previewStartSize: 5,
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
    obj.libraryPath = "c:\\dat\\lib";
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
    obj.previewStartSize = 5;
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
