var cpov = require("./cpov.js").cpov;

//==============================================================================
//==============================================================================

class ImageOptions {

    constructor(objType, args) {
        this._allConsole = null;
        this._allFile = null;
        this._antialias = null;
        this._antialiasDepth = null;
        this._antialiasGamma = null;
        this._antialiasThreshold = null;
        this._appendFile = null;
        this._bitsPerColor = null;
        this._bounding = null;
        this._boundingMethod = null;
        this._boundingThreshold = null;
        this._bspBaseAccessCost = null;
        this._bspChildAccessCost = null;
        this._bspIsectCost = null;
        this._bspMaxDepth = null;
        this._bspMissChance = null;
        this._continueTrace = null;
        this._createIni = null;
        this._debugConsole = null;
        this._debugFile = null;
        this._display = null;
        this._displayGamma = null;
        this._dither = null;
        this._ditherMethod = null;
        this._endColumn = null;
        this._endRow = null;
        this._exePath = null;
        this._fatalConsole = null;
        this._fatalErrorCommand = null;
        this._fatalErrorReturn = null;
        this._fatalFile = null;
        this._fileGamma = null;
        this._height = null;
        this._highReproducibility = null;
        this._includeHeader = null;
        this._inputFileName = null;
        this._jitter = null;
        this._jitterAmount = null;
        this._libraryPath = null;
        this._maxImageBufferMemory = null;
        this._outputAlpha = null;
        this._outputFileName = null;
        this._outputFileType = null;
        this._outputToFile = null;
        this._palette = null;
        this._pauseWhenDone = null;
        this._postFrameCommand = null;
        this._postFrameReturn = null;
        this._postSceneCommand = null;
        this._postSceneReturn = null;
        this._preFrameCommand = null;
        this._preFrameReturn = null;
        this._preSceneCommand = null;
        this._preSceneReturn = null;
        this._previewEndSize = null;
        this._previewStartSize = null;
        this._quality = null;
        this._radiosityFileName = null;
        this._radiosityFromFile = null;
        this._radiosityToFile = null;
        this._radiosityVainPretrace = null;
        this._removeBounds = null;
        this._renderBlockSize = null;
        this._renderBlockStep = null;
        this._renderConsole = null;
        this._renderFile = null;
        this._renderPattern = null;
        this._samplingMethod = null;
        this._splitUnions = null;
        this._startColumn = null;
        this._startRow = null;
        this._statisticConsole = null;
        this._statisticFile = null;
        this._testAbort = null;
        this._testAbortCount = null;
        this._userAbortCommand = null;
        this._userAbortReturn = null;
        this._verbose = null;
        this._videoMode = null;
        this._warningConsole = null;
        this._warningFile = null;
        this._warningLevel = null;
        this._width = null;
        this._workThreads = null;
    }

    //--------------------------------------------------------------------------

    get allConsole() {
        if(typeof this._allConsole == "function")
            return this._allConsole();
        else if(typeof this._allConsole == "string" && this._allConsole.substr(0, 1) == "&")
            return this._allConsole.substr(1);
        else
            return this._allConsole;
    }

    //--------------------------------------------------------------------------

    set allConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._allConsole = val;
        } else {
            cpov.error("fatal", "allConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get allFile() {
        if(typeof this._allFile == "function")
            return this._allFile();
        else if(typeof this._allFile == "string" && this._allFile.substr(0, 1) == "&")
            return this._allFile.substr(1);
        else
            return this._allFile;
    }

    //--------------------------------------------------------------------------

    set allFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._allFile = val;
        } else {
            cpov.error("fatal", "allFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialias() {
        if(typeof this._antialias == "function")
            return this._antialias();
        else if(typeof this._antialias == "string" && this._antialias.substr(0, 1) == "&")
            return this._antialias.substr(1);
        else
            return this._antialias;
    }

    //--------------------------------------------------------------------------

    set antialias(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._antialias = val;
        } else {
            cpov.error("fatal", "antialias must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasDepth() {
        if(typeof this._antialiasDepth == "function")
            return this._antialiasDepth();
        else if(typeof this._antialiasDepth == "string" && this._antialiasDepth.substr(0, 1) == "&")
            return this._antialiasDepth.substr(1);
        else
            return this._antialiasDepth;
    }

    //--------------------------------------------------------------------------

    set antialiasDepth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 9))) {
            this._antialiasDepth = val;
        } else {
            cpov.error("fatal", "antialiasDepth must be an integer in the range 1-9.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasGamma() {
        if(typeof this._antialiasGamma == "function")
            return this._antialiasGamma();
        else if(typeof this._antialiasGamma == "string" && this._antialiasGamma.substr(0, 1) == "&")
            return this._antialiasGamma.substr(1);
        else
            return this._antialiasGamma;
    }

    //--------------------------------------------------------------------------

    set antialiasGamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._antialiasGamma = val;
        } else {
            cpov.error("fatal", "antialiasGamma must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasThreshold() {
        if(typeof this._antialiasThreshold == "function")
            return this._antialiasThreshold();
        else if(typeof this._antialiasThreshold == "string" && this._antialiasThreshold.substr(0, 1) == "&")
            return this._antialiasThreshold.substr(1);
        else
            return this._antialiasThreshold;
    }

    //--------------------------------------------------------------------------

    set antialiasThreshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._antialiasThreshold = val;
        } else {
            cpov.error("fatal", "antialiasThreshold must be a float greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get appendFile() {
        if(typeof this._appendFile == "function")
            return this._appendFile();
        else if(typeof this._appendFile == "string" && this._appendFile.substr(0, 1) == "&")
            return this._appendFile.substr(1);
        else
            return this._appendFile;
    }

    //--------------------------------------------------------------------------

    set appendFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._appendFile = val;
        } else {
            cpov.error("fatal", "appendFile must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bitsPerColor() {
        if(typeof this._bitsPerColor == "function")
            return this._bitsPerColor();
        else if(typeof this._bitsPerColor == "string" && this._bitsPerColor.substr(0, 1) == "&")
            return this._bitsPerColor.substr(1);
        else
            return this._bitsPerColor;
    }

    //--------------------------------------------------------------------------

    set bitsPerColor(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(5, 16))) {
            this._bitsPerColor = val;
        } else {
            cpov.error("fatal", "bitsPerColor must be an integer in the range 5-16.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bounding() {
        if(typeof this._bounding == "function")
            return this._bounding();
        else if(typeof this._bounding == "string" && this._bounding.substr(0, 1) == "&")
            return this._bounding.substr(1);
        else
            return this._bounding;
    }

    //--------------------------------------------------------------------------

    set bounding(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._bounding = val;
        } else {
            cpov.error("fatal", "bounding must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get boundingMethod() {
        if(typeof this._boundingMethod == "function")
            return this._boundingMethod();
        else if(typeof this._boundingMethod == "string" && this._boundingMethod.substr(0, 1) == "&")
            return this._boundingMethod.substr(1);
        else
            return this._boundingMethod;
    }

    //--------------------------------------------------------------------------

    set boundingMethod(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(1, 2))) {
            this._boundingMethod = val;
        } else {
            cpov.error("fatal", "boundingMethod must be either 1 or 2.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get boundingThreshold() {
        if(typeof this._boundingThreshold == "function")
            return this._boundingThreshold();
        else if(typeof this._boundingThreshold == "string" && this._boundingThreshold.substr(0, 1) == "&")
            return this._boundingThreshold.substr(1);
        else
            return this._boundingThreshold;
    }

    //--------------------------------------------------------------------------

    set boundingThreshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._boundingThreshold = val;
        } else {
            cpov.error("fatal", "boundingThreshold must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspBaseAccessCost() {
        if(typeof this._bspBaseAccessCost == "function")
            return this._bspBaseAccessCost();
        else if(typeof this._bspBaseAccessCost == "string" && this._bspBaseAccessCost.substr(0, 1) == "&")
            return this._bspBaseAccessCost.substr(1);
        else
            return this._bspBaseAccessCost;
    }

    //--------------------------------------------------------------------------

    set bspBaseAccessCost(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bspBaseAccessCost = val;
        } else {
            cpov.error("fatal", "bspBaseAccessCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspChildAccessCost() {
        if(typeof this._bspChildAccessCost == "function")
            return this._bspChildAccessCost();
        else if(typeof this._bspChildAccessCost == "string" && this._bspChildAccessCost.substr(0, 1) == "&")
            return this._bspChildAccessCost.substr(1);
        else
            return this._bspChildAccessCost;
    }

    //--------------------------------------------------------------------------

    set bspChildAccessCost(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bspChildAccessCost = val;
        } else {
            cpov.error("fatal", "bspChildAccessCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspIsectCost() {
        if(typeof this._bspIsectCost == "function")
            return this._bspIsectCost();
        else if(typeof this._bspIsectCost == "string" && this._bspIsectCost.substr(0, 1) == "&")
            return this._bspIsectCost.substr(1);
        else
            return this._bspIsectCost;
    }

    //--------------------------------------------------------------------------

    set bspIsectCost(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bspIsectCost = val;
        } else {
            cpov.error("fatal", "bspIsectCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspMaxDepth() {
        if(typeof this._bspMaxDepth == "function")
            return this._bspMaxDepth();
        else if(typeof this._bspMaxDepth == "string" && this._bspMaxDepth.substr(0, 1) == "&")
            return this._bspMaxDepth.substr(1);
        else
            return this._bspMaxDepth;
    }

    //--------------------------------------------------------------------------

    set bspMaxDepth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._bspMaxDepth = val;
        } else {
            cpov.error("fatal", "bspMaxDepth must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspMissChance() {
        if(typeof this._bspMissChance == "function")
            return this._bspMissChance();
        else if(typeof this._bspMissChance == "string" && this._bspMissChance.substr(0, 1) == "&")
            return this._bspMissChance.substr(1);
        else
            return this._bspMissChance;
    }

    //--------------------------------------------------------------------------

    set bspMissChance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bspMissChance = val;
        } else {
            cpov.error("fatal", "bspMissChance must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get continueTrace() {
        if(typeof this._continueTrace == "function")
            return this._continueTrace();
        else if(typeof this._continueTrace == "string" && this._continueTrace.substr(0, 1) == "&")
            return this._continueTrace.substr(1);
        else
            return this._continueTrace;
    }

    //--------------------------------------------------------------------------

    set continueTrace(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._continueTrace = val;
        } else {
            cpov.error("fatal", "continueTrace must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get createIni() {
        if(typeof this._createIni == "function")
            return this._createIni();
        else if(typeof this._createIni == "string" && this._createIni.substr(0, 1) == "&")
            return this._createIni.substr(1);
        else
            return this._createIni;
    }

    //--------------------------------------------------------------------------

    set createIni(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._createIni = val;
        } else {
            cpov.error("fatal", "createIni must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get debugConsole() {
        if(typeof this._debugConsole == "function")
            return this._debugConsole();
        else if(typeof this._debugConsole == "string" && this._debugConsole.substr(0, 1) == "&")
            return this._debugConsole.substr(1);
        else
            return this._debugConsole;
    }

    //--------------------------------------------------------------------------

    set debugConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._debugConsole = val;
        } else {
            cpov.error("fatal", "debugConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get debugFile() {
        if(typeof this._debugFile == "function")
            return this._debugFile();
        else if(typeof this._debugFile == "string" && this._debugFile.substr(0, 1) == "&")
            return this._debugFile.substr(1);
        else
            return this._debugFile;
    }

    //--------------------------------------------------------------------------

    set debugFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._debugFile = val;
        } else {
            cpov.error("fatal", "debugFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get display() {
        if(typeof this._display == "function")
            return this._display();
        else if(typeof this._display == "string" && this._display.substr(0, 1) == "&")
            return this._display.substr(1);
        else
            return this._display;
    }

    //--------------------------------------------------------------------------

    set display(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._display = val;
        } else {
            cpov.error("fatal", "display must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get displayGamma() {
        if(typeof this._displayGamma == "function")
            return this._displayGamma();
        else if(typeof this._displayGamma == "string" && this._displayGamma.substr(0, 1) == "&")
            return this._displayGamma.substr(1);
        else
            return this._displayGamma;
    }

    //--------------------------------------------------------------------------

    set displayGamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB'))) {
            this._displayGamma = val;
        } else {
            cpov.error("fatal", "displayGamma must be either a float or the string 'sRGB'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get dither() {
        if(typeof this._dither == "function")
            return this._dither();
        else if(typeof this._dither == "string" && this._dither.substr(0, 1) == "&")
            return this._dither.substr(1);
        else
            return this._dither;
    }

    //--------------------------------------------------------------------------

    set dither(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._dither = val;
        } else {
            cpov.error("fatal", "dither must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get ditherMethod() {
        if(typeof this._ditherMethod == "function")
            return this._ditherMethod();
        else if(typeof this._ditherMethod == "string" && this._ditherMethod.substr(0, 1) == "&")
            return this._ditherMethod.substr(1);
        else
            return this._ditherMethod;
    }

    //--------------------------------------------------------------------------

    set ditherMethod(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.ditherTypes))) {
            this._ditherMethod = val;
        } else {
            cpov.error("fatal", "ditherMethod must be one of 'B2', 'B3', 'B4', 'D1', 'D2', or 'FS'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get endColumn() {
        if(typeof this._endColumn == "function")
            return this._endColumn();
        else if(typeof this._endColumn == "string" && this._endColumn.substr(0, 1) == "&")
            return this._endColumn.substr(1);
        else
            return this._endColumn;
    }

    //--------------------------------------------------------------------------

    set endColumn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._endColumn = val;
        } else {
            cpov.error("fatal", "endColumn must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get endRow() {
        if(typeof this._endRow == "function")
            return this._endRow();
        else if(typeof this._endRow == "string" && this._endRow.substr(0, 1) == "&")
            return this._endRow.substr(1);
        else
            return this._endRow;
    }

    //--------------------------------------------------------------------------

    set endRow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._endRow = val;
        } else {
            cpov.error("fatal", "endRow must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get exePath() {
        if(typeof this._exePath == "function")
            return this._exePath();
        else if(typeof this._exePath == "string" && this._exePath.substr(0, 1) == "&")
            return this._exePath.substr(1);
        else
            return this._exePath;
    }

    //--------------------------------------------------------------------------

    set exePath(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._exePath = val;
        } else {
            cpov.error("fatal", "exePath must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalConsole() {
        if(typeof this._fatalConsole == "function")
            return this._fatalConsole();
        else if(typeof this._fatalConsole == "string" && this._fatalConsole.substr(0, 1) == "&")
            return this._fatalConsole.substr(1);
        else
            return this._fatalConsole;
    }

    //--------------------------------------------------------------------------

    set fatalConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._fatalConsole = val;
        } else {
            cpov.error("fatal", "fatalConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorCommand() {
        if(typeof this._fatalErrorCommand == "function")
            return this._fatalErrorCommand();
        else if(typeof this._fatalErrorCommand == "string" && this._fatalErrorCommand.substr(0, 1) == "&")
            return this._fatalErrorCommand.substr(1);
        else
            return this._fatalErrorCommand;
    }

    //--------------------------------------------------------------------------

    set fatalErrorCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._fatalErrorCommand = val;
        } else {
            cpov.error("fatal", "fatalErrorCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorReturn() {
        if(typeof this._fatalErrorReturn == "function")
            return this._fatalErrorReturn();
        else if(typeof this._fatalErrorReturn == "string" && this._fatalErrorReturn.substr(0, 1) == "&")
            return this._fatalErrorReturn.substr(1);
        else
            return this._fatalErrorReturn;
    }

    //--------------------------------------------------------------------------

    set fatalErrorReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._fatalErrorReturn = val;
        } else {
            cpov.error("fatal", "fatalErrorReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalFile() {
        if(typeof this._fatalFile == "function")
            return this._fatalFile();
        else if(typeof this._fatalFile == "string" && this._fatalFile.substr(0, 1) == "&")
            return this._fatalFile.substr(1);
        else
            return this._fatalFile;
    }

    //--------------------------------------------------------------------------

    set fatalFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._fatalFile = val;
        } else {
            cpov.error("fatal", "fatalFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fileGamma() {
        if(typeof this._fileGamma == "function")
            return this._fileGamma();
        else if(typeof this._fileGamma == "string" && this._fileGamma.substr(0, 1) == "&")
            return this._fileGamma.substr(1);
        else
            return this._fileGamma;
    }

    //--------------------------------------------------------------------------

    set fileGamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) || val === 'sRGB')) {
            this._fileGamma = val;
        } else {
            cpov.error("fatal", "fileGamma", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get height() {
        if(typeof this._height == "function")
            return this._height();
        else if(typeof this._height == "string" && this._height.substr(0, 1) == "&")
            return this._height.substr(1);
        else
            return this._height;
    }

    //--------------------------------------------------------------------------

    set height(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._height = val;
        } else {
            cpov.error("fatal", "height must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get highReproducibility() {
        if(typeof this._highReproducibility == "function")
            return this._highReproducibility();
        else if(typeof this._highReproducibility == "string" && this._highReproducibility.substr(0, 1) == "&")
            return this._highReproducibility.substr(1);
        else
            return this._highReproducibility;
    }

    //--------------------------------------------------------------------------

    set highReproducibility(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._highReproducibility = val;
        } else {
            cpov.error("fatal", "highReproducibility must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get includeHeader() {
        if(typeof this._includeHeader == "function")
            return this._includeHeader();
        else if(typeof this._includeHeader == "string" && this._includeHeader.substr(0, 1) == "&")
            return this._includeHeader.substr(1);
        else
            return this._includeHeader;
    }

    //--------------------------------------------------------------------------

    set includeHeader(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._includeHeader = val;
        } else {
            cpov.error("fatal", "includeHeader must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get inputFileName() {
        if(typeof this._inputFileName == "function")
            return this._inputFileName();
        else if(typeof this._inputFileName == "string" && this._inputFileName.substr(0, 1) == "&")
            return this._inputFileName.substr(1);
        else
            return this._inputFileName;
    }

    //--------------------------------------------------------------------------

    set inputFileName(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._inputFileName = val;
        } else {
            cpov.error("fatal", "inputFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get jitter() {
        if(typeof this._jitter == "function")
            return this._jitter();
        else if(typeof this._jitter == "string" && this._jitter.substr(0, 1) == "&")
            return this._jitter.substr(1);
        else
            return this._jitter;
    }

    //--------------------------------------------------------------------------

    set jitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get jitterAmount() {
        if(typeof this._jitterAmount == "function")
            return this._jitterAmount();
        else if(typeof this._jitterAmount == "string" && this._jitterAmount.substr(0, 1) == "&")
            return this._jitterAmount.substr(1);
        else
            return this._jitterAmount;
    }

    //--------------------------------------------------------------------------

    set jitterAmount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._jitterAmount = val;
        } else {
            cpov.error("fatal", "jitterAmount must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get libraryPath() {
        if(typeof this._libraryPath == "function")
            return this._libraryPath();
        else if(typeof this._libraryPath == "string" && this._libraryPath.substr(0, 1) == "&")
            return this._libraryPath.substr(1);
        else
            return this._libraryPath;
    }

    //--------------------------------------------------------------------------

    set libraryPath(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._libraryPath = val;
        } else {
            cpov.error("fatal", "libraryPath must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get maxImageBufferMemory() {
        if(typeof this._maxImageBufferMemory == "function")
            return this._maxImageBufferMemory();
        else if(typeof this._maxImageBufferMemory == "string" && this._maxImageBufferMemory.substr(0, 1) == "&")
            return this._maxImageBufferMemory.substr(1);
        else
            return this._maxImageBufferMemory;
    }

    //--------------------------------------------------------------------------

    set maxImageBufferMemory(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._maxImageBufferMemory = val;
        } else {
            cpov.error("fatal", "maxImageBufferMemory must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputAlpha() {
        if(typeof this._outputAlpha == "function")
            return this._outputAlpha();
        else if(typeof this._outputAlpha == "string" && this._outputAlpha.substr(0, 1) == "&")
            return this._outputAlpha.substr(1);
        else
            return this._outputAlpha;
    }

    //--------------------------------------------------------------------------

    set outputAlpha(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._outputAlpha = val;
        } else {
            cpov.error("fatal", "outputAlpha must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputFileName() {
        if(typeof this._outputFileName == "function")
            return this._outputFileName();
        else if(typeof this._outputFileName == "string" && this._outputFileName.substr(0, 1) == "&")
            return this._outputFileName.substr(1);
        else
            return this._outputFileName;
    }

    //--------------------------------------------------------------------------

    set outputFileName(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._outputFileName = val;
        } else {
            cpov.error("fatal", "outputFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputFileType() {
        if(typeof this._outputFileType == "function")
            return this._outputFileType();
        else if(typeof this._outputFileType == "string" && this._outputFileType.substr(0, 1) == "&")
            return this._outputFileType.substr(1);
        else
            return this._outputFileType;
    }

    //--------------------------------------------------------------------------

    set outputFileType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.outputFileTypes))) {
            this._outputFileType = val;
        } else {
            cpov.error("fatal", "outputFileType must be one of 'B', 'C', 'E', 'H', 'J', 'N', 'P', 'S', or 'T'", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputToFile() {
        if(typeof this._outputToFile == "function")
            return this._outputToFile();
        else if(typeof this._outputToFile == "string" && this._outputToFile.substr(0, 1) == "&")
            return this._outputToFile.substr(1);
        else
            return this._outputToFile;
    }

    //--------------------------------------------------------------------------

    set outputToFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._outputToFile = val;
        } else {
            cpov.error("fatal", "outputToFile must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get palette() {
        if(typeof this._palette == "function")
            return this._palette();
        else if(typeof this._palette == "string" && this._palette.substr(0, 1) == "&")
            return this._palette.substr(1);
        else
            return this._palette;
    }

    //--------------------------------------------------------------------------

    set palette(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._palette = val;
        } else {
            cpov.error("fatal", "palette", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get pauseWhenDone() {
        if(typeof this._pauseWhenDone == "function")
            return this._pauseWhenDone();
        else if(typeof this._pauseWhenDone == "string" && this._pauseWhenDone.substr(0, 1) == "&")
            return this._pauseWhenDone.substr(1);
        else
            return this._pauseWhenDone;
    }

    //--------------------------------------------------------------------------

    set pauseWhenDone(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._pauseWhenDone = val;
        } else {
            cpov.error("fatal", "pauseWhenDone must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postFrameCommand() {
        if(typeof this._postFrameCommand == "function")
            return this._postFrameCommand();
        else if(typeof this._postFrameCommand == "string" && this._postFrameCommand.substr(0, 1) == "&")
            return this._postFrameCommand.substr(1);
        else
            return this._postFrameCommand;
    }

    //--------------------------------------------------------------------------

    set postFrameCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._postFrameCommand = val;
        } else {
            cpov.error("fatal", "postFrameCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postFrameReturn() {
        if(typeof this._postFrameReturn == "function")
            return this._postFrameReturn();
        else if(typeof this._postFrameReturn == "string" && this._postFrameReturn.substr(0, 1) == "&")
            return this._postFrameReturn.substr(1);
        else
            return this._postFrameReturn;
    }

    //--------------------------------------------------------------------------

    set postFrameReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._postFrameReturn = val;
        } else {
            cpov.error("fatal", "postFrameReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postSceneCommand() {
        if(typeof this._postSceneCommand == "function")
            return this._postSceneCommand();
        else if(typeof this._postSceneCommand == "string" && this._postSceneCommand.substr(0, 1) == "&")
            return this._postSceneCommand.substr(1);
        else
            return this._postSceneCommand;
    }

    //--------------------------------------------------------------------------

    set postSceneCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._postSceneCommand = val;
        } else {
            cpov.error("fatal", "postSceneCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postSceneReturn() {
        if(typeof this._postSceneReturn == "function")
            return this._postSceneReturn();
        else if(typeof this._postSceneReturn == "string" && this._postSceneReturn.substr(0, 1) == "&")
            return this._postSceneReturn.substr(1);
        else
            return this._postSceneReturn;
    }

    //--------------------------------------------------------------------------

    set postSceneReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._postSceneReturn = val;
        } else {
            cpov.error("fatal", "postSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preFrameCommand() {
        if(typeof this._preFrameCommand == "function")
            return this._preFrameCommand();
        else if(typeof this._preFrameCommand == "string" && this._preFrameCommand.substr(0, 1) == "&")
            return this._preFrameCommand.substr(1);
        else
            return this._preFrameCommand;
    }

    //--------------------------------------------------------------------------

    set preFrameCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._preFrameCommand = val;
        } else {
            cpov.error("fatal", "preFrameCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preFrameReturn() {
        if(typeof this._preFrameReturn == "function")
            return this._preFrameReturn();
        else if(typeof this._preFrameReturn == "string" && this._preFrameReturn.substr(0, 1) == "&")
            return this._preFrameReturn.substr(1);
        else
            return this._preFrameReturn;
    }

    //--------------------------------------------------------------------------

    set preFrameReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._preFrameReturn = val;
        } else {
            cpov.error("fatal", "preFrameReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preSceneCommand() {
        if(typeof this._preSceneCommand == "function")
            return this._preSceneCommand();
        else if(typeof this._preSceneCommand == "string" && this._preSceneCommand.substr(0, 1) == "&")
            return this._preSceneCommand.substr(1);
        else
            return this._preSceneCommand;
    }

    //--------------------------------------------------------------------------

    set preSceneCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._preSceneCommand = val;
        } else {
            cpov.error("fatal", "preSceneCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preSceneReturn() {
        if(typeof this._preSceneReturn == "function")
            return this._preSceneReturn();
        else if(typeof this._preSceneReturn == "string" && this._preSceneReturn.substr(0, 1) == "&")
            return this._preSceneReturn.substr(1);
        else
            return this._preSceneReturn;
    }

    //--------------------------------------------------------------------------

    set preSceneReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._preSceneReturn = val;
        } else {
            cpov.error("fatal", "preSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get previewEndSize() {
        if(typeof this._previewEndSize == "function")
            return this._previewEndSize();
        else if(typeof this._previewEndSize == "string" && this._previewEndSize.substr(0, 1) == "&")
            return this._previewEndSize.substr(1);
        else
            return this._previewEndSize;
    }

    //--------------------------------------------------------------------------

    set previewEndSize(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._previewEndSize = val;
        } else {
            cpov.error("fatal", "previewEndSize must be an integer greater than zero", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get previewStartSize() {
        if(typeof this._previewStartSize == "function")
            return this._previewStartSize();
        else if(typeof this._previewStartSize == "string" && this._previewStartSize.substr(0, 1) == "&")
            return this._previewStartSize.substr(1);
        else
            return this._previewStartSize;
    }

    //--------------------------------------------------------------------------

    set previewStartSize(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._previewStartSize = val;
        } else {
            cpov.error("fatal", "previewStartSize must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get quality() {
        if(typeof this._quality == "function")
            return this._quality();
        else if(typeof this._quality == "string" && this._quality.substr(0, 1) == "&")
            return this._quality.substr(1);
        else
            return this._quality;
    }

    //--------------------------------------------------------------------------

    set quality(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 11)) {
            this._quality = val;
        } else {
            cpov.error("fatal", "quality must be an integer in the range (0 - 11)", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityFileName() {
        if(typeof this._radiosityFileName == "function")
            return this._radiosityFileName();
        else if(typeof this._radiosityFileName == "string" && this._radiosityFileName.substr(0, 1) == "&")
            return this._radiosityFileName.substr(1);
        else
            return this._radiosityFileName;
    }

    //--------------------------------------------------------------------------

    set radiosityFileName(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityFileName = val;
        } else {
            cpov.error("fatal", "radiosityFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityFromFile() {
        if(typeof this._radiosityFromFile == "function")
            return this._radiosityFromFile();
        else if(typeof this._radiosityFromFile == "string" && this._radiosityFromFile.substr(0, 1) == "&")
            return this._radiosityFromFile.substr(1);
        else
            return this._radiosityFromFile;
    }

    //--------------------------------------------------------------------------

    set radiosityFromFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityFromFile = val;
        } else {
            cpov.error("fatal", "radiosityFromFile must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityToFile() {
        if(typeof this._radiosityToFile == "function")
            return this._radiosityToFile();
        else if(typeof this._radiosityToFile == "string" && this._radiosityToFile.substr(0, 1) == "&")
            return this._radiosityToFile.substr(1);
        else
            return this._radiosityToFile;
    }

    //--------------------------------------------------------------------------

    set radiosityToFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityToFile = val;
        } else {
            cpov.error("fatal", "radiosityToFile must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityVainPretrace() {
        if(typeof this._radiosityVainPretrace == "function")
            return this._radiosityVainPretrace();
        else if(typeof this._radiosityVainPretrace == "string" && this._radiosityVainPretrace.substr(0, 1) == "&")
            return this._radiosityVainPretrace.substr(1);
        else
            return this._radiosityVainPretrace;
    }

    //--------------------------------------------------------------------------

    set radiosityVainPretrace(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radiosityVainPretrace = val;
        } else {
            cpov.error("fatal", "radiosityVainPretrace must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get removeBounds() {
        if(typeof this._removeBounds == "function")
            return this._removeBounds();
        else if(typeof this._removeBounds == "string" && this._removeBounds.substr(0, 1) == "&")
            return this._removeBounds.substr(1);
        else
            return this._removeBounds;
    }

    //--------------------------------------------------------------------------

    set removeBounds(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._removeBounds = val;
        } else {
            cpov.error("fatal", "removeBounds must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockSize() {
        if(typeof this._renderBlockSize == "function")
            return this._renderBlockSize();
        else if(typeof this._renderBlockSize == "string" && this._renderBlockSize.substr(0, 1) == "&")
            return this._renderBlockSize.substr(1);
        else
            return this._renderBlockSize;
    }

    //--------------------------------------------------------------------------

    set renderBlockSize(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 4)) {
            this._renderBlockSize = val;
        } else {
            cpov.error("fatal", "renderBlockSize must be an integer greater than or equal to 4.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockStep() {
        if(typeof this._renderBlockStep == "function")
            return this._renderBlockStep();
        else if(typeof this._renderBlockStep == "string" && this._renderBlockStep.substr(0, 1) == "&")
            return this._renderBlockStep.substr(1);
        else
            return this._renderBlockStep;
    }

    //--------------------------------------------------------------------------

    set renderBlockStep(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._renderBlockStep = val;
        } else {
            cpov.error("fatal", "renderBlockStep must be an integer greater than or equal to 1.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderConsole() {
        if(typeof this._renderConsole == "function")
            return this._renderConsole();
        else if(typeof this._renderConsole == "string" && this._renderConsole.substr(0, 1) == "&")
            return this._renderConsole.substr(1);
        else
            return this._renderConsole;
    }

    //--------------------------------------------------------------------------

    set renderConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._renderConsole = val;
        } else {
            cpov.error("fatal", "renderConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderFile() {
        if(typeof this._renderFile == "function")
            return this._renderFile();
        else if(typeof this._renderFile == "string" && this._renderFile.substr(0, 1) == "&")
            return this._renderFile.substr(1);
        else
            return this._renderFile;
    }

    //--------------------------------------------------------------------------

    set renderFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) && cpov.isNonEmptyString(val))) {
            this._renderFile = val;
        } else {
            cpov.error("fatal", "renderFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderPattern() {
        if(typeof this._renderPattern == "function")
            return this._renderPattern();
        else if(typeof this._renderPattern == "string" && this._renderPattern.substr(0, 1) == "&")
            return this._renderPattern.substr(1);
        else
            return this._renderPattern;
    }

    //--------------------------------------------------------------------------

    set renderPattern(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 5)) {
            this._renderPattern = val;
        } else {
            cpov.error("fatal", "renderPattern must be an integer in the range (0 - 5).", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get samplingMethod() {
        if(typeof this._samplingMethod == "function")
            return this._samplingMethod();
        else if(typeof this._samplingMethod == "string" && this._samplingMethod.substr(0, 1) == "&")
            return this._samplingMethod.substr(1);
        else
            return this._samplingMethod;
    }

    //--------------------------------------------------------------------------

    set samplingMethod(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 2)) {
            this._samplingMethod = val;
        } else {
            cpov.error("fatal", "samplingMethod must be an integer in the range (1 - 2).", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get splitUnions() {
        if(typeof this._splitUnions == "function")
            return this._splitUnions();
        else if(typeof this._splitUnions == "string" && this._splitUnions.substr(0, 1) == "&")
            return this._splitUnions.substr(1);
        else
            return this._splitUnions;
    }

    //--------------------------------------------------------------------------

    set splitUnions(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnions = val;
        } else {
            cpov.error("fatal", "splitUnions must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get startColumn() {
        if(typeof this._startColumn == "function")
            return this._startColumn();
        else if(typeof this._startColumn == "string" && this._startColumn.substr(0, 1) == "&")
            return this._startColumn.substr(1);
        else
            return this._startColumn;
    }

    //--------------------------------------------------------------------------

    set startColumn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._startColumn = val;
        } else {
            cpov.error("fatal", "startColumn must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get startRow() {
        if(typeof this._startRow == "function")
            return this._startRow();
        else if(typeof this._startRow == "string" && this._startRow.substr(0, 1) == "&")
            return this._startRow.substr(1);
        else
            return this._startRow;
    }

    //--------------------------------------------------------------------------

    set startRow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._startRow = val;
        } else {
            cpov.error("fatal", "startRow must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get statisticConsole() {
        if(typeof this._statisticConsole == "function")
            return this._statisticConsole();
        else if(typeof this._statisticConsole == "string" && this._statisticConsole.substr(0, 1) == "&")
            return this._statisticConsole.substr(1);
        else
            return this._statisticConsole;
    }

    //--------------------------------------------------------------------------

    set statisticConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._statisticConsole = val;
        } else {
            cpov.error("fatal", "statisticConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get statisticFile() {
        if(typeof this._statisticFile == "function")
            return this._statisticFile();
        else if(typeof this._statisticFile == "string" && this._statisticFile.substr(0, 1) == "&")
            return this._statisticFile.substr(1);
        else
            return this._statisticFile;
    }

    //--------------------------------------------------------------------------

    set statisticFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean || cpov.isNonEmptyString(val))) {
            this._statisticFile = val;
        } else {
            cpov.error("fatal", "statisticFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get testAbort() {
        if(typeof this._testAbort == "function")
            return this._testAbort();
        else if(typeof this._testAbort == "string" && this._testAbort.substr(0, 1) == "&")
            return this._testAbort.substr(1);
        else
            return this._testAbort;
    }

    //--------------------------------------------------------------------------

    set testAbort(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._testAbort = val;
        } else {
            cpov.error("fatal", "testAbort must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get testAbortCount() {
        if(typeof this._testAbortCount == "function")
            return this._testAbortCount();
        else if(typeof this._testAbortCount == "string" && this._testAbortCount.substr(0, 1) == "&")
            return this._testAbortCount.substr(1);
        else
            return this._testAbortCount;
    }

    //--------------------------------------------------------------------------

    set testAbortCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._testAbortCount = val;
        } else {
            cpov.error("fatal", "testAbortCount must be an integer greater than or equal to one.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get userAbortCommand() {
        if(typeof this._userAbortCommand == "function")
            return this._userAbortCommand();
        else if(typeof this._userAbortCommand == "string" && this._userAbortCommand.substr(0, 1) == "&")
            return this._userAbortCommand.substr(1);
        else
            return this._userAbortCommand;
    }

    //--------------------------------------------------------------------------

    set userAbortCommand(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._userAbortCommand = val;
        } else {
            cpov.error("fatal", "userAbortCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get userAbortReturn() {
        if(typeof this._userAbortReturn == "function")
            return this._userAbortReturn();
        else if(typeof this._userAbortReturn == "string" && this._userAbortReturn.substr(0, 1) == "&")
            return this._userAbortReturn.substr(1);
        else
            return this._userAbortReturn;
    }

    //--------------------------------------------------------------------------

    set userAbortReturn(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._userAbortReturn = val;
        } else {
            cpov.error("fatal", "userAbortReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get verbose() {
        if(typeof this._verbose == "function")
            return this._verbose();
        else if(typeof this._verbose == "string" && this._verbose.substr(0, 1) == "&")
            return this._verbose.substr(1);
        else
            return this._verbose;
    }

    //--------------------------------------------------------------------------

    set verbose(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._verbose = val;
        } else {
            cpov.error("fatal", "verbose must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get videoMode() {
        if(typeof this._videoMode == "function")
            return this._videoMode();
        else if(typeof this._videoMode == "string" && this._videoMode.substr(0, 1) == "&")
            return this._videoMode.substr(1);
        else
            return this._videoMode;
    }

    //--------------------------------------------------------------------------

    set videoMode(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._videoMode = val;
        } else {
            cpov.error("fatal", "videoMode must be a single character.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningConsole() {
        if(typeof this._warningConsole == "function")
            return this._warningConsole();
        else if(typeof this._warningConsole == "string" && this._warningConsole.substr(0, 1) == "&")
            return this._warningConsole.substr(1);
        else
            return this._warningConsole;
    }

    //--------------------------------------------------------------------------

    set warningConsole(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._warningConsole = val;
        } else {
            cpov.error("fatal", "warningConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningFile() {
        if(typeof this._warningFile == "function")
            return this._warningFile();
        else if(typeof this._warningFile == "string" && this._warningFile.substr(0, 1) == "&")
            return this._warningFile.substr(1);
        else
            return this._warningFile;
    }

    //--------------------------------------------------------------------------

    set warningFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._warningFile = val;
        } else {
            cpov.error("fatal", "warningFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningLevel() {
        if(typeof this._warningLevel == "function")
            return this._warningLevel();
        else if(typeof this._warningLevel == "string" && this._warningLevel.substr(0, 1) == "&")
            return this._warningLevel.substr(1);
        else
            return this._warningLevel;
    }

    //--------------------------------------------------------------------------

    set warningLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && (val == 0 || val == 5 || val == 10))) {
            this._warningLevel = val;
        } else {
            cpov.error("fatal", "warningLevel must be one of 0, 5, or 10.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get width() {
        if(typeof this._width == "function")
            return this._width();
        else if(typeof this._width == "string" && this._width.substr(0, 1) == "&")
            return this._width.substr(1);
        else
            return this._width;
    }

    //--------------------------------------------------------------------------

    set width(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._width = val;
        } else {
            cpov.error("fatal", "width must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get workThreads() {
        if(typeof this._workThreads == "function")
            return this._workThreads();
        else if(typeof this._workThreads == "string" && this._workThreads.substr(0, 1) == "&")
            return this._workThreads.substr(1);
        else
            return this._workThreads;
    }

    //--------------------------------------------------------------------------

    set workThreads(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 512)) {
            this._workThreads = val;
        } else {
            cpov.error("fatal", "workThreads must be an integer in the range (1 - 512).", "ImageOptions");
        }
    }


}

exports.ImageOptions = ImageOptions;

