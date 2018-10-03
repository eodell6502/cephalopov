var cpov = require("./cpov.js").cpov;

//==============================================================================
// The GlobalSettings class manages the variables that will be output into the 
// SDL global_settings block.
//==============================================================================

class GlobalSettings {

    constructor(options) {

        // Mutable properties //

        this._adcBailout             = null;
        this._ambientLight           = null;
        this._assumedGamma           = null;
        this._charset                = null;
        this._iridWavelength         = null;
        this._maxIntersections       = null;
        this._maxTraceLevel          = null;
        this._mmPerUnit              = null;
        this._noiseGenerator         = null;
        this._numberOfWaves          = null;
        this._photon                 = null;
        this._photonAdcBailout       = null;
        this._photonAutostop         = null;
        this._photonCount            = null;
        this._photonExpandThresholds = null;
        this._photonGather           = null;
        this._photonJitter           = null;
        this._photonLoadFile         = null;
        this._photonMaxTraceLevel    = null;
        this._photonMedia            = null;
        this._photonRadius           = null;
        this._photonSaveFile         = null;
        this._photonSpacing          = null;
        this._radAdcBailout          = null;
        this._radAlwaysSample        = null;
        this._radBrightness          = null;
        this._radCount               = null;
        this._radErrorBound          = null;
        this._radGrayThreshold       = null;
        this._radiosity              = null;
        this._radLowErrorFactor      = null;
        this._radMaximumReuse        = null;
        this._radMaxSample           = null;
        this._radMinimumReuse        = null;
        this._radNearestCount        = null;
        this._radNormal              = null;
        this._radPretraceEnd         = null;
        this._radPretraceStart       = null;
        this._radRecursionLimit      = null;
        this._radSubsurface          = null;
        this._subRadiosity           = null;
        this._subSamples             = null;
        this._subsurface             = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get adcBailout() {
        if(typeof this._adcBailout == "function")
            return this._adcBailout();
        else if(typeof this._adcBailout == "string" && this._adcBailout.substr(0, 1) == "&")
            return this._adcBailout.substr(1);
        else
            return this._adcBailout;
    }

    set adcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._adcBailout = val;
        } else {
            cpov.error("fatal", "adcBailout must be a float greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get ambientLight() {
        if(typeof this._ambientLight == "function")
            return this._ambientLight();
        else if(typeof this._ambientLight == "string" && this._ambientLight.substr(0, 1) == "&")
            return this._ambientLight.substr(1);
        else
            return this._ambientLight;
    }

    set ambientLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB'))) {
            this._ambientLight = val;
        } else {
            cpov.error("fatal", "ambientLight must be a VectorRGB or VectorSRGB.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get assumedGamma() {
        if(typeof this._assumedGamma == "function")
            return this._assumedGamma();
        else if(typeof this._assumedGamma == "string" && this._assumedGamma.substr(0, 1) == "&")
            return this._assumedGamma.substr(1);
        else
            return this._assumedGamma;
    }

    set assumedGamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._assumedGamma = val;
        } else {
            cpov.error("fatal", "assumedGamma must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get charset() {
        if(typeof this._charset == "function")
            return this._charset();
        else if(typeof this._charset == "string" && this._charset.substr(0, 1) == "&")
            return this._charset.substr(1);
        else
            return this._charset;
    }

    set charset(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, ['ascii', 'utf8', 'sys']))) {
            this._charset = val;
        } else {
            cpov.error("fatal", "charset must be one of 'ascii', 'utf8', or 'sys'.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get iridWavelength() {
        if(typeof this._iridWavelength == "function")
            return this._iridWavelength();
        else if(typeof this._iridWavelength == "string" && this._iridWavelength.substr(0, 1) == "&")
            return this._iridWavelength.substr(1);
        else
            return this._iridWavelength;
    }

    set iridWavelength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB'))) {
            this._iridWavelength = val;
        } else {
            cpov.error("fatal", "iridWavelength must be a VectorRGB or VectorSRGB", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get maxIntersections() {
        if(typeof this._maxIntersections == "function")
            return this._maxIntersections();
        else if(typeof this._maxIntersections == "string" && this._maxIntersections.substr(0, 1) == "&")
            return this._maxIntersections.substr(1);
        else
            return this._maxIntersections;
    }

    set maxIntersections(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._maxIntersections = val;
        } else {
            cpov.error("fatal", "maxIntersections must be an integer greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get maxTraceLevel() {
        if(typeof this._maxTraceLevel == "function")
            return this._maxTraceLevel();
        else if(typeof this._maxTraceLevel == "string" && this._maxTraceLevel.substr(0, 1) == "&")
            return this._maxTraceLevel.substr(1);
        else
            return this._maxTraceLevel;
    }

    set maxTraceLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._maxTraceLevel = val;
        } else {
            cpov.error("fatal", "maxTraceLevel must be an integer greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get mmPerUnit() {
        if(typeof this._mmPerUnit == "function")
            return this._mmPerUnit();
        else if(typeof this._mmPerUnit == "string" && this._mmPerUnit.substr(0, 1) == "&")
            return this._mmPerUnit.substr(1);
        else
            return this._mmPerUnit;
    }

    set mmPerUnit(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._mmPerUnit = val;
        } else {
            cpov.error("fatal", "mmPerUnit must be a float greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get noiseGenerator() {
        if(typeof this._noiseGenerator == "function")
            return this._noiseGenerator();
        else if(typeof this._noiseGenerator == "string" && this._noiseGenerator.substr(0, 1) == "&")
            return this._noiseGenerator.substr(1);
        else
            return this._noiseGenerator;
    }

    set noiseGenerator(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.inArray(val, [1, 2, 3]))) {
            this._noiseGenerator = val;
        } else {
            cpov.error("fatal", "noiseGenerator must be an integer and one of 1, 2, or 3.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get numberOfWaves() {
        if(typeof this._numberOfWaves == "function")
            return this._numberOfWaves();
        else if(typeof this._numberOfWaves == "string" && this._numberOfWaves.substr(0, 1) == "&")
            return this._numberOfWaves.substr(1);
        else
            return this._numberOfWaves;
    }

    set numberOfWaves(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._numberOfWaves = val;
        } else {
            cpov.error("fatal", "numberOfWaves must be an integer greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photon() {
        if(typeof this._photon == "function")
            return this._photon();
        else if(typeof this._photon == "string" && this._photon.substr(0, 1) == "&")
            return this._photon.substr(1);
        else
            return this._photon;
    }

    set photon(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._photon = val;
        } else {
            cpov.error("fatal", "photon must be a boolean.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonAdcBailout() {
        if(typeof this._photonAdcBailout == "function")
            return this._photonAdcBailout();
        else if(typeof this._photonAdcBailout == "string" && this._photonAdcBailout.substr(0, 1) == "&")
            return this._photonAdcBailout.substr(1);
        else
            return this._photonAdcBailout;
    }

    set photonAdcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._photonAdcBailout = val;
        } else {
            cpov.error("fatal", "photonAdcBailout must be a float greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonAutostop() {
        if(typeof this._photonAutostop == "function")
            return this._photonAutostop();
        else if(typeof this._photonAutostop == "string" && this._photonAutostop.substr(0, 1) == "&")
            return this._photonAutostop.substr(1);
        else
            return this._photonAutostop;
    }

    set photonAutostop(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.within(val, 0, 1))) {
            this._photonAutostop = val;
        } else {
            cpov.error("fatal", "photonAutostop must be a float within the unit interval (0.0 - 1.0)", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonCount() {
        if(typeof this._photonCount == "function")
            return this._photonCount();
        else if(typeof this._photonCount == "string" && this._photonCount.substr(0, 1) == "&")
            return this._photonCount.substr(1);
        else
            return this._photonCount;
    }

    set photonCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._photonCount = val;
        } else {
            cpov.error("fatal", "photonCount must be an integer greater than or equal to zero", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonExpandThresholds() {
        if(typeof this._photonExpandThresholds == "function")
            return this._photonExpandThresholds();
        else if(typeof this._photonExpandThresholds == "string" && this._photonExpandThresholds.substr(0, 1) == "&")
            return this._photonExpandThresholds.substr(1);
        else
            return this._photonExpandThresholds;
    }

    set photonExpandThresholds(val) {
        if(cpov.isNullOrFunction(val) || (Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1]))) {
            this._photonExpandThresholds = val;
        } else {
            cpov.error("fatal", "photonExpandThresholds must be an array consisting of a float and and integer.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonGather() {
        if(typeof this._photonGather == "function")
            return this._photonGather();
        else if(typeof this._photonGather == "string" && this._photonGather.substr(0, 1) == "&")
            return this._photonGather.substr(1);
        else
            return this._photonGather;
    }

    set photonGather(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1])) {
            this._photonGather = val;
        } else {
            cpov.error("fatal", "photonGather must be an array of two integers greater than zero in ascending order.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonJitter() {
        if(typeof this._photonJitter == "function")
            return this._photonJitter();
        else if(typeof this._photonJitter == "string" && this._photonJitter.substr(0, 1) == "&")
            return this._photonJitter.substr(1);
        else
            return this._photonJitter;
    }

    set photonJitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._photonJitter = val;
        } else {
            cpov.error("fatal", "photonJitter must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonLoadFile() {
        if(typeof this._photonLoadFile == "function")
            return this._photonLoadFile();
        else if(typeof this._photonLoadFile == "string" && this._photonLoadFile.substr(0, 1) == "&")
            return this._photonLoadFile.substr(1);
        else
            return this._photonLoadFile;
    }

    set photonLoadFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._photonLoadFile = val;
        } else {
            cpov.error("fatal", "photonLoadFile must be a non-empty string.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonMaxTraceLevel() {
        if(typeof this._photonMaxTraceLevel == "function")
            return this._photonMaxTraceLevel();
        else if(typeof this._photonMaxTraceLevel == "string" && this._photonMaxTraceLevel.substr(0, 1) == "&")
            return this._photonMaxTraceLevel.substr(1);
        else
            return this._photonMaxTraceLevel;
    }

    set photonMaxTraceLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._photonMaxTraceLevel = val;
        } else {
            cpov.error("fatal", "photonMaxTraceLevel must be an integer greater than or equal to zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonMedia() {
        if(typeof this._photonMedia == "function")
            return this._photonMedia();
        else if(typeof this._photonMedia == "string" && this._photonMedia.substr(0, 1) == "&")
            return this._photonMedia.substr(1);
        else
            return this._photonMedia;
    }

    set photonMedia(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 2))) {
            this._photonMedia = val;
        } else {
            cpov.error("fatal", "photonMedia must be an array of two floats.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonRadius() {
        if(typeof this._photonRadius == "function")
            return this._photonRadius();
        else if(typeof this._photonRadius == "string" && this._photonRadius.substr(0, 1) == "&")
            return this._photonRadius.substr(1);
        else
            return this._photonRadius;
    }

    set photonRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 4, 4))) {
            this._photonRadius = val;
        } else {
            cpov.error("fatal", "photonRadius must be an array of four floats.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonSaveFile() {
        if(typeof this._photonSaveFile == "function")
            return this._photonSaveFile();
        else if(typeof this._photonSaveFile == "string" && this._photonSaveFile.substr(0, 1) == "&")
            return this._photonSaveFile.substr(1);
        else
            return this._photonSaveFile;
    }

    set photonSaveFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._photonSaveFile = val;
        } else {
            cpov.error("fatal", "photonSaveFile must be a non-empty string.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get photonSpacing() {
        if(typeof this._photonSpacing == "function")
            return this._photonSpacing();
        else if(typeof this._photonSpacing == "string" && this._photonSpacing.substr(0, 1) == "&")
            return this._photonSpacing.substr(1);
        else
            return this._photonSpacing;
    }

    set photonSpacing(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._photonSpacing = val;
        } else {
            cpov.error("fatal", "photonSpacing must be a float greater than zero.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radAdcBailout() {
        if(typeof this._radAdcBailout == "function")
            return this._radAdcBailout();
        else if(typeof this._radAdcBailout == "string" && this._radAdcBailout.substr(0, 1) == "&")
            return this._radAdcBailout.substr(1);
        else
            return this._radAdcBailout;
    }

    set radAdcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radAdcBailout = val;
        } else {
            cpov.error("fatal", "radAdcBailout must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radAlwaysSample() {
        if(typeof this._radAlwaysSample == "function")
            return this._radAlwaysSample();
        else if(typeof this._radAlwaysSample == "string" && this._radAlwaysSample.substr(0, 1) == "&")
            return this._radAlwaysSample.substr(1);
        else
            return this._radAlwaysSample;
    }

    set radAlwaysSample(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radAlwaysSample = val;
        } else {
            cpov.error("fatal", "radAlwaysSample must be a boolean.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radBrightness() {
        if(typeof this._radBrightness == "function")
            return this._radBrightness();
        else if(typeof this._radBrightness == "string" && this._radBrightness.substr(0, 1) == "&")
            return this._radBrightness.substr(1);
        else
            return this._radBrightness;
    }

    set radBrightness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radBrightness = val;
        } else {
            cpov.error("fatal", "radBrightness must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radCount() {
        if(typeof this._radCount == "function")
            return this._radCount();
        else if(typeof this._radCount == "string" && this._radCount.substr(0, 1) == "&")
            return this._radCount.substr(1);
        else
            return this._radCount;
    }

    set radCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1))) {
            this._radCount = val;
        } else {
            cpov.error("fatal", "radCount must be an array of one or two integers, both of which must be greater than or equal to one.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radErrorBound() {
        if(typeof this._radErrorBound == "function")
            return this._radErrorBound();
        else if(typeof this._radErrorBound == "string" && this._radErrorBound.substr(0, 1) == "&")
            return this._radErrorBound.substr(1);
        else
            return this._radErrorBound;
    }

    set radErrorBound(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radErrorBound = val;
        } else {
            cpov.error("fatal", "radErrorBound must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radGrayThreshold() {
        if(typeof this._radGrayThreshold == "function")
            return this._radGrayThreshold();
        else if(typeof this._radGrayThreshold == "string" && this._radGrayThreshold.substr(0, 1) == "&")
            return this._radGrayThreshold.substr(1);
        else
            return this._radGrayThreshold;
    }

    set radGrayThreshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(val, 0, 1))) {
            this._radGrayThreshold = val;
        } else {
            cpov.error("fatal", "radGrayThreshold must be a float in the unit interval (0.0 - 1.0).", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radiosity() {
        if(typeof this._radiosity == "function")
            return this._radiosity();
        else if(typeof this._radiosity == "string" && this._radiosity.substr(0, 1) == "&")
            return this._radiosity.substr(1);
        else
            return this._radiosity;
    }

    set radiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radiosity = val;
        } else {
            cpov.error("fatal", "radiosity must be a boolean.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radLowErrorFactor() {
        if(typeof this._radLowErrorFactor == "function")
            return this._radLowErrorFactor();
        else if(typeof this._radLowErrorFactor == "string" && this._radLowErrorFactor.substr(0, 1) == "&")
            return this._radLowErrorFactor.substr(1);
        else
            return this._radLowErrorFactor;
    }

    set radLowErrorFactor(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radLowErrorFactor = val;
        } else {
            cpov.error("fatal", "radLowErrorFactor must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radMaximumReuse() {
        if(typeof this._radMaximumReuse == "function")
            return this._radMaximumReuse();
        else if(typeof this._radMaximumReuse == "string" && this._radMaximumReuse.substr(0, 1) == "&")
            return this._radMaximumReuse.substr(1);
        else
            return this._radMaximumReuse;
    }

    set radMaximumReuse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMaximumReuse = val;
        } else {
            cpov.error("fatal", "radMaximumReuse must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radMaxSample() {
        if(typeof this._radMaxSample == "function")
            return this._radMaxSample();
        else if(typeof this._radMaxSample == "string" && this._radMaxSample.substr(0, 1) == "&")
            return this._radMaxSample.substr(1);
        else
            return this._radMaxSample;
    }

    set radMaxSample(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMaxSample = val;
        } else {
            cpov.error("fatal", "radMaxSample must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radMinimumReuse() {
        if(typeof this._radMinimumReuse == "function")
            return this._radMinimumReuse();
        else if(typeof this._radMinimumReuse == "string" && this._radMinimumReuse.substr(0, 1) == "&")
            return this._radMinimumReuse.substr(1);
        else
            return this._radMinimumReuse;
    }

    set radMinimumReuse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMinimumReuse = val;
        } else {
            cpov.error("fatal", "radMinimumReuse must be a float.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radNearestCount() {
        if(typeof this._radNearestCount == "function")
            return this._radNearestCount();
        else if(typeof this._radNearestCount == "string" && this._radNearestCount.substr(0, 1) == "&")
            return this._radNearestCount.substr(1);
        else
            return this._radNearestCount;
    }

    set radNearestCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 20))) {
            this._radNearestCount = val;
        } else {
            cpov.error("fatal", "radNearestCount must be an integer in the range 1-20.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radNormal() {
        if(typeof this._radNormal == "function")
            return this._radNormal();
        else if(typeof this._radNormal == "string" && this._radNormal.substr(0, 1) == "&")
            return this._radNormal.substr(1);
        else
            return this._radNormal;
    }

    set radNormal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radNormal = val;
        } else {
            cpov.error("fatal", "radNormal must be a boolean.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radPretraceEnd() {
        if(typeof this._radPretraceEnd == "function")
            return this._radPretraceEnd();
        else if(typeof this._radPretraceEnd == "string" && this._radPretraceEnd.substr(0, 1) == "&")
            return this._radPretraceEnd.substr(1);
        else
            return this._radPretraceEnd;
    }

    set radPretraceEnd(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(0, 1))) {
            this._radPretraceEnd = val;
        } else {
            cpov.error("fatal", "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radPretraceStart() {
        if(typeof this._radPretraceStart == "function")
            return this._radPretraceStart();
        else if(typeof this._radPretraceStart == "string" && this._radPretraceStart.substr(0, 1) == "&")
            return this._radPretraceStart.substr(1);
        else
            return this._radPretraceStart;
    }

    set radPretraceStart(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(0, 1))) {
            this._radPretraceStart = val;
        } else {
            cpov.error("fatal", "radPretraceStart must be a float in the unit interval (0.0 - 1.0)", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radRecursionLimit() {
        if(typeof this._radRecursionLimit == "function")
            return this._radRecursionLimit();
        else if(typeof this._radRecursionLimit == "string" && this._radRecursionLimit.substr(0, 1) == "&")
            return this._radRecursionLimit.substr(1);
        else
            return this._radRecursionLimit;
    }

    set radRecursionLimit(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 20))) {
            this._radRecursionLimit = val;
        } else {
            cpov.error("fatal", "radRecursionLimit must be an integer in the range 1-20.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get radSubsurface() {
        if(typeof this._radSubsurface == "function")
            return this._radSubsurface();
        else if(typeof this._radSubsurface == "string" && this._radSubsurface.substr(0, 1) == "&")
            return this._radSubsurface.substr(1);
        else
            return this._radSubsurface;
    }

    set radSubsurface(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radSubsurface = val;
        } else {
            cpov.error("fatal", "radSubsurface must be a boolean.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get subRadiosity() {
        if(typeof this._subRadiosity == "function")
            return this._subRadiosity();
        else if(typeof this._subRadiosity == "string" && this._subRadiosity.substr(0, 1) == "&")
            return this._subRadiosity.substr(1);
        else
            return this._subRadiosity;
    }

    set subRadiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._subRadiosity = val;
        } else {
            cpov.error("fatal", "subRadiosity must be a boolean", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get subSamples() {
        if(typeof this._subSamples == "function")
            return this._subSamples();
        else if(typeof this._subSamples == "string" && this._subSamples.substr(0, 1) == "&")
            return this._subSamples.substr(1);
        else
            return this._subSamples;
    }

    set subSamples(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 2, 2))) {
            this._subSamples = val;
        } else {
            cpov.error("fatal", "subSamples must be an array of two integers.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get subsurface() {
        if(typeof this._subsurface == "function")
            return this._subsurface();
        else if(typeof this._subsurface == "string" && this._subsurface.substr(0, 1) == "&")
            return this._subsurface.substr(1);
        else
            return this._subsurface;
    }

    set subsurface(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._subsurface = val;
        } else {
            cpov.error("fatal", "subsurface must be a boolean.", "GlobalSettings");
        }
    }


}

exports.GlobalSettings = GlobalSettings;


//==============================================================================
// The ImageOptions class manages the variables that will be output into .ini 
// files for each frame and which can, optionally, be emitted in the form of 
// command line switches.
//==============================================================================

class ImageOptions {

    constructor(options) {

        // Mutable properties //

        this._allConsole            = null;
        this._allFile               = null;
        this._antialias             = null;
        this._antialiasDepth        = null;
        this._antialiasGamma        = null;
        this._antialiasThreshold    = null;
        this._appendFile            = null;
        this._bitsPerColor          = null;
        this._bounding              = null;
        this._boundingMethod        = null;
        this._boundingThreshold     = null;
        this._bspBaseAccessCost     = null;
        this._bspChildAccessCost    = null;
        this._bspIsectCost          = null;
        this._bspMaxDepth           = null;
        this._bspMissChance         = null;
        this._continueTrace         = null;
        this._createIni             = null;
        this._debugConsole          = null;
        this._debugFile             = null;
        this._display               = null;
        this._displayGamma          = null;
        this._dither                = null;
        this._ditherMethod          = null;
        this._endColumn             = null;
        this._endRow                = null;
        this._exePath               = null;
        this._fatalConsole          = null;
        this._fatalErrorCommand     = null;
        this._fatalErrorReturn      = null;
        this._fatalFile             = null;
        this._fileGamma             = null;
        this._height                = null;
        this._highReproducibility   = null;
        this._includeHeader         = null;
        this._inputFileName         = null;
        this._jitter                = null;
        this._jitterAmount          = null;
        this._libraryPath           = null;
        this._maxImageBufferMemory  = null;
        this._outputAlpha           = null;
        this._outputFileName        = null;
        this._outputFileType        = null;
        this._outputToFile          = null;
        this._palette               = null;
        this._pauseWhenDone         = null;
        this._postFrameCommand      = null;
        this._postFrameReturn       = null;
        this._postSceneCommand      = null;
        this._postSceneReturn       = null;
        this._preFrameCommand       = null;
        this._preFrameReturn        = null;
        this._preSceneCommand       = null;
        this._preSceneReturn        = null;
        this._previewEndSize        = null;
        this._previewStartSize      = null;
        this._quality               = null;
        this._radiosityFileName     = null;
        this._radiosityFromFile     = null;
        this._radiosityToFile       = null;
        this._radiosityVainPretrace = null;
        this._removeBounds          = null;
        this._renderBlockSize       = null;
        this._renderBlockStep       = null;
        this._renderConsole         = null;
        this._renderFile            = null;
        this._renderPattern         = null;
        this._samplingMethod        = null;
        this._splitUnions           = null;
        this._startColumn           = null;
        this._startRow              = null;
        this._statisticConsole      = null;
        this._statisticFile         = null;
        this._testAbort             = null;
        this._testAbortCount        = null;
        this._userAbortCommand      = null;
        this._userAbortReturn       = null;
        this._verbose               = null;
        this._videoMode             = null;
        this._warningConsole        = null;
        this._warningFile           = null;
        this._warningLevel          = null;
        this._width                 = null;
        this._workThreads           = null;

        // Initialization //

        cpov.initObject(this, options);

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

    set workThreads(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 512)) {
            this._workThreads = val;
        } else {
            cpov.error("fatal", "workThreads must be an integer in the range (1 - 512).", "ImageOptions");
        }
    }


}

exports.ImageOptions = ImageOptions;


//==============================================================================
// The Primitive class implements parameters and functionality that are shared 
// across (nearly) all geometric primitives.
//==============================================================================

class Primitive {

    constructor(options) {

        // Mutable properties //

        this._active           = null;
        this._baseTransform    = null;
        this._boundedBy        = null;
        this._children         = null;
        this._clippedBy        = null;
        this._doubleIlluminate = null;
        this._finish           = null;
        this._frameBegin       = null;
        this._frameEnd         = null;
        this._hierarchy        = null;
        this._hollow           = null;
        this._id               = null;
        this._interior         = null;
        this._inverse          = null;
        this._material         = null;
        this._noImage          = null;
        this._noRadiosity      = null;
        this._noReflection     = null;
        this._normal           = null;
        this._noShadow         = null;
        this._parent           = null;
        this._photons          = null;
        this._radiosity        = null;
        this._serial           = null;
        this._texture          = null;
        this._transform        = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get active() {
        if(typeof this._active == "function")
            return this._active();
        else if(typeof this._active == "string" && this._active.substr(0, 1) == "&")
            return this._active.substr(1);
        else
            return this._active;
    }

    set active(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._active = val;
        } else {
            cpov.error("fatal", "active must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get baseTransform() {
        if(typeof this._baseTransform == "function")
            return this._baseTransform();
        else if(typeof this._baseTransform == "string" && this._baseTransform.substr(0, 1) == "&")
            return this._baseTransform.substr(1);
        else
            return this._baseTransform;
    }

    set baseTransform(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Matrix'))) {
            this._baseTransform = val;
        } else {
            cpov.error("fatal", "baseTransform must be a Matrix.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get boundedBy() {
        if(typeof this._boundedBy == "function")
            return this._boundedBy();
        else if(typeof this._boundedBy == "string" && this._boundedBy.substr(0, 1) == "&")
            return this._boundedBy.substr(1);
        else
            return this._boundedBy;
    }

    set boundedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom('Primitive') )) {
            this._boundedBy = val;
        } else {
            cpov.error("fatal", "boundedBy must be a Primitive.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get children() {
        if(typeof this._children == "function")
            return this._children();
        else if(typeof this._children == "string" && this._children.substr(0, 1) == "&")
            return this._children.substr(1);
        else
            return this._children;
    }

    set children(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfSubclass(val, 'Primitive'))) {
            this._children = val;
        } else {
            cpov.error("fatal", "children must be an array of Primitives.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get clippedBy() {
        if(typeof this._clippedBy == "function")
            return this._clippedBy();
        else if(typeof this._clippedBy == "string" && this._clippedBy.substr(0, 1) == "&")
            return this._clippedBy.substr(1);
        else
            return this._clippedBy;
    }

    set clippedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._clippedBy = val;
        } else {
            cpov.error("fatal", "clippedBy", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get doubleIlluminate() {
        if(typeof this._doubleIlluminate == "function")
            return this._doubleIlluminate();
        else if(typeof this._doubleIlluminate == "string" && this._doubleIlluminate.substr(0, 1) == "&")
            return this._doubleIlluminate.substr(1);
        else
            return this._doubleIlluminate;
    }

    set doubleIlluminate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._doubleIlluminate = val;
        } else {
            cpov.error("fatal", "doubleIlluminate must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get finish() {
        if(typeof this._finish == "function")
            return this._finish();
        else if(typeof this._finish == "string" && this._finish.substr(0, 1) == "&")
            return this._finish.substr(1);
        else
            return this._finish;
    }

    set finish(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Finish'))) {
            this._finish = val;
        } else {
            cpov.error("fatal", "finish must be a Finish.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get frameBegin() {
        if(typeof this._frameBegin == "function")
            return this._frameBegin();
        else if(typeof this._frameBegin == "string" && this._frameBegin.substr(0, 1) == "&")
            return this._frameBegin.substr(1);
        else
            return this._frameBegin;
    }

    set frameBegin(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameBegin = val;
        } else {
            cpov.error("fatal", "frameBegin must be a JavaScript function.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get frameEnd() {
        if(typeof this._frameEnd == "function")
            return this._frameEnd();
        else if(typeof this._frameEnd == "string" && this._frameEnd.substr(0, 1) == "&")
            return this._frameEnd.substr(1);
        else
            return this._frameEnd;
    }

    set frameEnd(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameEnd = val;
        } else {
            cpov.error("fatal", "frameEnd must be a JavaScript function.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get hollow() {
        if(typeof this._hollow == "function")
            return this._hollow();
        else if(typeof this._hollow == "string" && this._hollow.substr(0, 1) == "&")
            return this._hollow.substr(1);
        else
            return this._hollow;
    }

    set hollow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hollow = val;
        } else {
            cpov.error("fatal", "hollow must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get id() {
        if(typeof this._id == "function")
            return this._id();
        else if(typeof this._id == "string" && this._id.substr(0, 1) == "&")
            return this._id.substr(1);
        else
            return this._id;
    }

    set id(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._id = val;
        } else {
            cpov.error("fatal", "id must be a non-empty string.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get interior() {
        if(typeof this._interior == "function")
            return this._interior();
        else if(typeof this._interior == "string" && this._interior.substr(0, 1) == "&")
            return this._interior.substr(1);
        else
            return this._interior;
    }

    set interior(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Interior'))) {
            this._interior = val;
        } else {
            cpov.error("fatal", "interior must be an Interior.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get inverse() {
        if(typeof this._inverse == "function")
            return this._inverse();
        else if(typeof this._inverse == "string" && this._inverse.substr(0, 1) == "&")
            return this._inverse.substr(1);
        else
            return this._inverse;
    }

    set inverse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._inverse = val;
        } else {
            cpov.error("fatal", "inverse must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get material() {
        if(typeof this._material == "function")
            return this._material();
        else if(typeof this._material == "string" && this._material.substr(0, 1) == "&")
            return this._material.substr(1);
        else
            return this._material;
    }

    set material(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Material'))) {
            this._material = val;
        } else {
            cpov.error("fatal", "material must be a Material.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noImage() {
        if(typeof this._noImage == "function")
            return this._noImage();
        else if(typeof this._noImage == "string" && this._noImage.substr(0, 1) == "&")
            return this._noImage.substr(1);
        else
            return this._noImage;
    }

    set noImage(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noImage = val;
        } else {
            cpov.error("fatal", "noImage must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noRadiosity() {
        if(typeof this._noRadiosity == "function")
            return this._noRadiosity();
        else if(typeof this._noRadiosity == "string" && this._noRadiosity.substr(0, 1) == "&")
            return this._noRadiosity.substr(1);
        else
            return this._noRadiosity;
    }

    set noRadiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noRadiosity = val;
        } else {
            cpov.error("fatal", "noRadiosity must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noReflection() {
        if(typeof this._noReflection == "function")
            return this._noReflection();
        else if(typeof this._noReflection == "string" && this._noReflection.substr(0, 1) == "&")
            return this._noReflection.substr(1);
        else
            return this._noReflection;
    }

    set noReflection(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noReflection = val;
        } else {
            cpov.error("fatal", "noReflection must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noShadow() {
        if(typeof this._noShadow == "function")
            return this._noShadow();
        else if(typeof this._noShadow == "string" && this._noShadow.substr(0, 1) == "&")
            return this._noShadow.substr(1);
        else
            return this._noShadow;
    }

    set noShadow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noShadow = val;
        } else {
            cpov.error("fatal", "noShadow must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get parent() {
        if(typeof this._parent == "function")
            return this._parent();
        else if(typeof this._parent == "string" && this._parent.substr(0, 1) == "&")
            return this._parent.substr(1);
        else
            return this._parent;
    }

    set parent(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._parent = val;
        } else {
            cpov.error("fatal", "parent must be a Primitive.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get photons() {
        if(typeof this._photons == "function")
            return this._photons();
        else if(typeof this._photons == "string" && this._photons.substr(0, 1) == "&")
            return this._photons.substr(1);
        else
            return this._photons;
    }

    set photons(val) {
        if(true) { // FIXME
            this._photons = val;
        } else {
            cpov.error("fatal", "photons", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get radiosity() {
        if(typeof this._radiosity == "function")
            return this._radiosity();
        else if(typeof this._radiosity == "string" && this._radiosity.substr(0, 1) == "&")
            return this._radiosity.substr(1);
        else
            return this._radiosity;
    }

    set radiosity(val) {
        if(true) { // FIXME
            this._radiosity = val;
        } else {
            cpov.error("fatal", "radiosity", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get serial() {
        if(typeof this._serial == "function")
            return this._serial();
        else if(typeof this._serial == "string" && this._serial.substr(0, 1) == "&")
            return this._serial.substr(1);
        else
            return this._serial;
    }

    set serial(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._serial = val;
        } else {
            cpov.error("fatal", "serial must be an integer.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get texture() {
        if(typeof this._texture == "function")
            return this._texture();
        else if(typeof this._texture == "string" && this._texture.substr(0, 1) == "&")
            return this._texture.substr(1);
        else
            return this._texture;
    }

    set texture(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Texture'))) {
            this._texture = val;
        } else {
            cpov.error("fatal", "texture must be a Texture.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get transform() {
        if(typeof this._transform == "function")
            return this._transform();
        else if(typeof this._transform == "string" && this._transform.substr(0, 1) == "&")
            return this._transform.substr(1);
        else
            return this._transform;
    }

    set transform(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Matrix'))) {
            this._transform = val;
        } else {
            cpov.error("fatal", "transform must be a Matrix.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------
    // Generates SDL from parameters.
    //--------------------------------------------------------------------------
    
    function toSDL(stops = 0) {
    
        var pad = cpov.tab(stops);
        var contents = [ ];
    
        if(this.clippedBy !== null) {
            contents.push(pad + "clipped_by {");
            contents.push(this.clippedBy.toSDL(stops + 1));
            contents.push(pad + "}");
        }
    
        if(this.boundedBy !== null) {
            contents.push(pad + "bounded_by {");
            if(this.boundedBy === this.clippedBy) {
                contents.push(pad + "    clipped_by");
            } else {
                contents.push(this.boundedBy.toSDL(stops + 1));
            }
            contents.push(pad + "}");
        }
    
        if(this.noShadow)
            contents.push(pad + "no_shadow");
    
        if(this.noImage)
            contents.push(pad + "no_image");
    
        if(this.noRadiosity)
            contents.push(pad + "no_radiosity");
    
        if(this.noReflection)
            contents.push(pad + "no_reflection");
    
        if(this.inverse)
            contents.push(pad + "inverse");
    
        if(this.sturm)
            contents.push(pad + "sturm");
    
        if(this.hierarchy)
            contents.push(pad + "hierarchy");
    
        if(this.double_illuminate)
            contents.push(pad + "double_illuminate");
    
        if(this.hollow)
            contents.push(pad + "hollow");
    
        // TODO: interior
        // TODO: interior_texture
        // TODO: pigment
        // TODO: normal
        // TODO: finish
        // TODO: photons
        // TODO: radiosity
    
        if(this.transform !== undefined && this.transform !== null)
            contents.push(pad + this.transform.toSDL(stops + 1));
    
        return contents.join("\n");
    }



}

exports.Primitive = Primitive;


//==============================================================================
// Blob class
//==============================================================================

class Blob {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._components = null;
        this._threshold  = null;
        this._sturm      = null;
        this._hierarchy  = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Blob]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Blob]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Blob]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components();
        else if(typeof this._components == "string" && this._components.substr(0, 1) == "&")
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, ['Sphere', 'Cylinder']) && components.length)) {
            this._components = val;
        } else {
            cpov.error("fatal", "components must be an array of Spheres and/or Cylinders.", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold();
        else if(typeof this._threshold == "string" && this._threshold.substr(0, 1) == "&")
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Blob");
        }
    }


}

exports.Blob = Blob;


//==============================================================================
// Box class
//==============================================================================

class Box {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._corner1 = null;
        this._corner2 = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Box]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Box]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Box]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(typeof this._corner1 == "string" && this._corner1.substr(0, 1) == "&")
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Box");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(typeof this._corner2 == "string" && this._corner2.substr(0, 1) == "&")
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2", "Box");
        }
    }


}

exports.Box = Box;


//==============================================================================
// Camera class
//==============================================================================

class Camera {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._type         = null;
        this._angle        = null;
        this._apertureSize = null;
        this._blurSamples  = null;
        this._bokeh        = null;
        this._confidence   = null;
        this._cylinderType = null;
        this._direction    = null;
        this._focalPoint   = null;
        this._location     = null;
        this._lookAt       = null;
        this._right        = null;
        this._sky          = null;
        this._up           = null;
        this._variance     = null;
        this._vertAngle    = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Camera]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Camera]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Camera]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, ['perspective', 'orthographic', 'fisheye', 'ultra_wide_angle', 'omnimax', 'panoramic', 'spherical', 'cylinder', 'mesh_camera']))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of perspective, orthographic, fisheye, ultra_wide_angle, omnimax, panoramic, spherical, cylinder, or mesh_camera.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get angle() {
        if(typeof this._angle == "function")
            return this._angle();
        else if(typeof this._angle == "string" && this._angle.substr(0, 1) == "&")
            return this._angle.substr(1);
        else
            return this._angle;
    }

    set angle(val) {
        if(true) { // FIXME
            this._angle = val;
        } else {
            cpov.error("fatal", "angle", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get apertureSize() {
        if(typeof this._apertureSize == "function")
            return this._apertureSize();
        else if(typeof this._apertureSize == "string" && this._apertureSize.substr(0, 1) == "&")
            return this._apertureSize.substr(1);
        else
            return this._apertureSize;
    }

    set apertureSize(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._apertureSize = val;
        } else {
            cpov.error("fatal", "apertureSize must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get blurSamples() {
        if(typeof this._blurSamples == "function")
            return this._blurSamples();
        else if(typeof this._blurSamples == "string" && this._blurSamples.substr(0, 1) == "&")
            return this._blurSamples.substr(1);
        else
            return this._blurSamples;
    }

    set blurSamples(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0)) {
            this._blurSamples = val;
        } else {
            cpov.error("fatal", "blurSamples must be an array of two floats greater than or equal to zero.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get bokeh() {
        if(typeof this._bokeh == "function")
            return this._bokeh();
        else if(typeof this._bokeh == "string" && this._bokeh.substr(0, 1) == "&")
            return this._bokeh.substr(1);
        else
            return this._bokeh;
    }

    set bokeh(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0)) {
            this._bokeh = val;
        } else {
            cpov.error("fatal", "bokeh must be a VectorRGB in the range <0, 0, 0> to <1, 1, 0>.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get confidence() {
        if(typeof this._confidence == "function")
            return this._confidence();
        else if(typeof this._confidence == "string" && this._confidence.substr(0, 1) == "&")
            return this._confidence.substr(1);
        else
            return this._confidence;
    }

    set confidence(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._confidence = val;
        } else {
            cpov.error("fatal", "confidence must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get cylinderType() {
        if(typeof this._cylinderType == "function")
            return this._cylinderType();
        else if(typeof this._cylinderType == "string" && this._cylinderType.substr(0, 1) == "&")
            return this._cylinderType.substr(1);
        else
            return this._cylinderType;
    }

    set cylinderType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0 && val < 5)) {
            this._cylinderType = val;
        } else {
            cpov.error("fatal", "cylinderType must be an integer in the range (1 - 4).", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get direction() {
        if(typeof this._direction == "function")
            return this._direction();
        else if(typeof this._direction == "string" && this._direction.substr(0, 1) == "&")
            return this._direction.substr(1);
        else
            return this._direction;
    }

    set direction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._direction = val;
        } else {
            cpov.error("fatal", "direction must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get focalPoint() {
        if(typeof this._focalPoint == "function")
            return this._focalPoint();
        else if(typeof this._focalPoint == "string" && this._focalPoint.substr(0, 1) == "&")
            return this._focalPoint.substr(1);
        else
            return this._focalPoint;
    }

    set focalPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._focalPoint = val;
        } else {
            cpov.error("fatal", "focalPoint must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(typeof this._location == "string" && this._location.substr(0, 1) == "&")
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get lookAt() {
        if(typeof this._lookAt == "function")
            return this._lookAt();
        else if(typeof this._lookAt == "string" && this._lookAt.substr(0, 1) == "&")
            return this._lookAt.substr(1);
        else
            return this._lookAt;
    }

    set lookAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._lookAt = val;
        } else {
            cpov.error("fatal", "lookAt must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get right() {
        if(typeof this._right == "function")
            return this._right();
        else if(typeof this._right == "string" && this._right.substr(0, 1) == "&")
            return this._right.substr(1);
        else
            return this._right;
    }

    set right(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._right = val;
        } else {
            cpov.error("fatal", "right must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get sky() {
        if(typeof this._sky == "function")
            return this._sky();
        else if(typeof this._sky == "string" && this._sky.substr(0, 1) == "&")
            return this._sky.substr(1);
        else
            return this._sky;
    }

    set sky(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._sky = val;
        } else {
            cpov.error("fatal", "sky must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get up() {
        if(typeof this._up == "function")
            return this._up();
        else if(typeof this._up == "string" && this._up.substr(0, 1) == "&")
            return this._up.substr(1);
        else
            return this._up;
    }

    set up(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._up = val;
        } else {
            cpov.error("fatal", "up must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get variance() {
        if(typeof this._variance == "function")
            return this._variance();
        else if(typeof this._variance == "string" && this._variance.substr(0, 1) == "&")
            return this._variance.substr(1);
        else
            return this._variance;
    }

    set variance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._variance = val;
        } else {
            cpov.error("fatal", "variance must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get vertAngle() {
        if(typeof this._vertAngle == "function")
            return this._vertAngle();
        else if(typeof this._vertAngle == "string" && this._vertAngle.substr(0, 1) == "&")
            return this._vertAngle.substr(1);
        else
            return this._vertAngle;
    }

    set vertAngle(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vertAngle = val;
        } else {
            cpov.error("fatal", "vertAngle must be an integer.", "Camera");
        }
    }


}

exports.Camera = Camera;


//==============================================================================
// Cone class
//==============================================================================

class Cone {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._basePoint  = null;
        this._baseRadius = null;
        this._capPoint   = null;
        this._capRadius  = null;
        this._open       = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Cone]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Cone]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Cone]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(typeof this._basePoint == "string" && this._basePoint.substr(0, 1) == "&")
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get baseRadius() {
        if(typeof this._baseRadius == "function")
            return this._baseRadius();
        else if(typeof this._baseRadius == "string" && this._baseRadius.substr(0, 1) == "&")
            return this._baseRadius.substr(1);
        else
            return this._baseRadius;
    }

    set baseRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._baseRadius = val;
        } else {
            cpov.error("fatal", "baseRadius must be a float.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint();
        else if(typeof this._capPoint == "string" && this._capPoint.substr(0, 1) == "&")
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get capRadius() {
        if(typeof this._capRadius == "function")
            return this._capRadius();
        else if(typeof this._capRadius == "string" && this._capRadius.substr(0, 1) == "&")
            return this._capRadius.substr(1);
        else
            return this._capRadius;
    }

    set capRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._capRadius = val;
        } else {
            cpov.error("fatal", "capRadius must be a float.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cone");
        }
    }


}

exports.Cone = Cone;


//==============================================================================
// Cylinder class
//==============================================================================

class Cylinder {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._basePoint = null;
        this._capPoint  = null;
        this._radius    = null;
        this._open      = null;
        this._strength  = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Cylinder]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Cylinder]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Cylinder]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(typeof this._basePoint == "string" && this._basePoint.substr(0, 1) == "&")
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint();
        else if(typeof this._capPoint == "string" && this._capPoint.substr(0, 1) == "&")
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength();
        else if(typeof this._strength == "string" && this._strength.substr(0, 1) == "&")
            return this._strength.substr(1);
        else
            return this._strength;
    }

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float", "Cylinder");
        }
    }


}

exports.Cylinder = Cylinder;


//==============================================================================
// HeightField class
//==============================================================================

class HeightField {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._source     = null;
        this._hfType     = null;
        this._smooth     = null;
        this._waterLevel = null;
        this._hierarchy  = null;
        this._gamma      = null;
        this._premult    = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[HeightField]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[HeightField]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[HeightField]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(typeof this._source == "string" && this._source.substr(0, 1) == "&")
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val) || cpov.isString(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get hfType() {
        if(typeof this._hfType == "function")
            return this._hfType();
        else if(typeof this._hfType == "string" && this._hfType.substr(0, 1) == "&")
            return this._hfType.substr(1);
        else
            return this._hfType;
    }

    set hfType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, cpov.hfTypes))) {
            this._hfType = val;
        } else {
            cpov.error("fatal", "hfType must be one of exr, gif, hdr, iff, jpeg, pgm, png, pot, ppm, sys, tga, or tiff.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth();
        else if(typeof this._smooth == "string" && this._smooth.substr(0, 1) == "&")
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get waterLevel() {
        if(typeof this._waterLevel == "function")
            return this._waterLevel();
        else if(typeof this._waterLevel == "string" && this._waterLevel.substr(0, 1) == "&")
            return this._waterLevel.substr(1);
        else
            return this._waterLevel;
    }

    set waterLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._waterLevel = val;
        } else {
            cpov.error("fatal", "waterLevel must be a float.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get gamma() {
        if(typeof this._gamma == "function")
            return this._gamma();
        else if(typeof this._gamma == "string" && this._gamma.substr(0, 1) == "&")
            return this._gamma.substr(1);
        else
            return this._gamma;
    }

    set gamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._gamma = val;
        } else {
            cpov.error("fatal", "gamma must be a float.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get premult() {
        if(typeof this._premult == "function")
            return this._premult();
        else if(typeof this._premult == "string" && this._premult.substr(0, 1) == "&")
            return this._premult.substr(1);
        else
            return this._premult;
    }

    set premult(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._premult = val;
        } else {
            cpov.error("fatal", "premult must be a boolean.", "HeightField");
        }
    }


}

exports.HeightField = HeightField;


//==============================================================================
// IsoSurface class
//==============================================================================

class IsoSurface {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._source      = null;
        this._containedBy = null;
        this._threshold   = null;
        this._accuracy    = null;
        this._maxGradient = null;
        this._evaluate    = null;
        this._open        = null;
        this._maxTrace    = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[IsoSurface]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[IsoSurface]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[IsoSurface]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(typeof this._source == "string" && this._source.substr(0, 1) == "&")
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source must be an SDL function.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(typeof this._containedBy == "string" && this._containedBy.substr(0, 1) == "&")
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box'))) {
            this._containedBy = val;
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or a Box.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold();
        else if(typeof this._threshold == "string" && this._threshold.substr(0, 1) == "&")
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy();
        else if(typeof this._accuracy == "string" && this._accuracy.substr(0, 1) == "&")
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient();
        else if(typeof this._maxGradient == "string" && this._maxGradient.substr(0, 1) == "&")
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get evaluate() {
        if(typeof this._evaluate == "function")
            return this._evaluate();
        else if(typeof this._evaluate == "string" && this._evaluate.substr(0, 1) == "&")
            return this._evaluate.substr(1);
        else
            return this._evaluate;
    }

    set evaluate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 3, 3))) {
            this._evaluate = val;
        } else {
            cpov.error("fatal", "evaluate must be an array of three floats.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get maxTrace() {
        if(typeof this._maxTrace == "function")
            return this._maxTrace();
        else if(typeof this._maxTrace == "string" && this._maxTrace.substr(0, 1) == "&")
            return this._maxTrace.substr(1);
        else
            return this._maxTrace;
    }

    set maxTrace(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections'))) {
            this._maxTrace = val;
        } else {
            cpov.error("fatal", "maxTrace must be either an integer or 'allIntersections'.", "IsoSurface");
        }
    }


}

exports.IsoSurface = IsoSurface;


//==============================================================================
// JuliaFractal class
//==============================================================================

class JuliaFractal {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._type      = null;
        this._power     = null;
        this._maxIter   = null;
        this._precision = null;
        this._slice     = null;
        this._distance  = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[JuliaFractal]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[JuliaFractal]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[JuliaFractal]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inArray(val, cpov.juliaFractalTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of hypercomplex:acos, hypercomplex:acosh, hypercomplex:asin, hypercomplex:atan, hypercomplex:atanh, hypercomplex:cos, hypercomplex:cosh, hypercomplex:cube, hypercomplex:exp, hypercomplex:ln, hypercomplex:pwr, hypercomplex:reciprocal, hypercomplex:sin, hypercomplex:sinh, hypercomplex:sqr, hypercomplex:tan, hypercomplex:tanh, quaternion:cube, or quaternion:sqr.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get power() {
        if(typeof this._power == "function")
            return this._power();
        else if(typeof this._power == "string" && this._power.substr(0, 1) == "&")
            return this._power.substr(1);
        else
            return this._power;
    }

    set power(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXY'))) {
            this._power = val;
        } else {
            cpov.error("fatal", "power must be a VectorXY.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get maxIter() {
        if(typeof this._maxIter == "function")
            return this._maxIter();
        else if(typeof this._maxIter == "string" && this._maxIter.substr(0, 1) == "&")
            return this._maxIter.substr(1);
        else
            return this._maxIter;
    }

    set maxIter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._maxIter = val;
        } else {
            cpov.error("fatal", "maxIter must be an integer.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get precision() {
        if(typeof this._precision == "function")
            return this._precision();
        else if(typeof this._precision == "string" && this._precision.substr(0, 1) == "&")
            return this._precision.substr(1);
        else
            return this._precision;
    }

    set precision(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precision = val;
        } else {
            cpov.error("fatal", "precision must be an integer.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get slice() {
        if(typeof this._slice == "function")
            return this._slice();
        else if(typeof this._slice == "string" && this._slice.substr(0, 1) == "&")
            return this._slice.substr(1);
        else
            return this._slice;
    }

    set slice(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW'))) {
            this._slice = val;
        } else {
            cpov.error("fatal", "slice must be a VectorXYZW.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(typeof this._distance == "string" && this._distance.substr(0, 1) == "&")
            return this._distance.substr(1);
        else
            return this._distance;
    }

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "JuliaFractal");
        }
    }


}

exports.JuliaFractal = JuliaFractal;


//==============================================================================
// Lathe class
//==============================================================================

class Lathe {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._type   = null;
        this._points = null;
        this._sturm  = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Lathe]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Lathe]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Lathe]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.splineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'cubicSpline', 'linearSpline', or 'quadraticSpline'.", "Lathe");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of two or more VectorXY.", "Lathe");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Lathe");
        }
    }


}

exports.Lathe = Lathe;


//==============================================================================
// LightSource class
//==============================================================================

class LightSource {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._location         = null;
        this._color            = null;
        this._adaptive         = null;
        this._areaIllumination = null;
        this._areaLight        = null;
        this._axis1            = null;
        this._axis2            = null;
        this._circular         = null;
        this._fadeDistance     = null;
        this._fadePower        = null;
        this._falloff          = null;
        this._jitter           = null;
        this._looksLike        = null;
        this._mediaAttenuation = null;
        this._mediaInteraction = null;
        this._orient           = null;
        this._parallel         = null;
        this._pointAt          = null;
        this._projectedThrough = null;
        this._radius           = null;
        this._shadowless       = null;
        this._size1            = null;
        this._size2            = null;
        this._tightness        = null;
        this._type             = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[LightSource]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[LightSource]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[LightSource]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(typeof this._location == "string" && this._location.substr(0, 1) == "&")
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get color() {
        if(typeof this._color == "function")
            return this._color();
        else if(typeof this._color == "string" && this._color.substr(0, 1) == "&")
            return this._color.substr(1);
        else
            return this._color;
    }

    set color(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB'))) {
            this._color = val;
        } else {
            cpov.error("fatal", "color must be a VectorRGB.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get adaptive() {
        if(typeof this._adaptive == "function")
            return this._adaptive();
        else if(typeof this._adaptive == "string" && this._adaptive.substr(0, 1) == "&")
            return this._adaptive.substr(1);
        else
            return this._adaptive;
    }

    set adaptive(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._adaptive = val;
        } else {
            cpov.error("fatal", "adaptive must be a float greater than or equal to zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get areaIllumination() {
        if(typeof this._areaIllumination == "function")
            return this._areaIllumination();
        else if(typeof this._areaIllumination == "string" && this._areaIllumination.substr(0, 1) == "&")
            return this._areaIllumination.substr(1);
        else
            return this._areaIllumination;
    }

    set areaIllumination(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaIllumination = val;
        } else {
            cpov.error("fatal", "areaIllumination must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get areaLight() {
        if(typeof this._areaLight == "function")
            return this._areaLight();
        else if(typeof this._areaLight == "string" && this._areaLight.substr(0, 1) == "&")
            return this._areaLight.substr(1);
        else
            return this._areaLight;
    }

    set areaLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaLight = val;
        } else {
            cpov.error("fatal", "areaLight must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get axis1() {
        if(typeof this._axis1 == "function")
            return this._axis1();
        else if(typeof this._axis1 == "string" && this._axis1.substr(0, 1) == "&")
            return this._axis1.substr(1);
        else
            return this._axis1;
    }

    set axis1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._axis1 = val;
        } else {
            cpov.error("fatal", "axis1 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get axis2() {
        if(typeof this._axis2 == "function")
            return this._axis2();
        else if(typeof this._axis2 == "string" && this._axis2.substr(0, 1) == "&")
            return this._axis2.substr(1);
        else
            return this._axis2;
    }

    set axis2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._axis2 = val;
        } else {
            cpov.error("fatal", "axis2 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get circular() {
        if(typeof this._circular == "function")
            return this._circular();
        else if(typeof this._circular == "string" && this._circular.substr(0, 1) == "&")
            return this._circular.substr(1);
        else
            return this._circular;
    }

    set circular(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._circular = val;
        } else {
            cpov.error("fatal", "circular must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get fadeDistance() {
        if(typeof this._fadeDistance == "function")
            return this._fadeDistance();
        else if(typeof this._fadeDistance == "string" && this._fadeDistance.substr(0, 1) == "&")
            return this._fadeDistance.substr(1);
        else
            return this._fadeDistance;
    }

    set fadeDistance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0.)) {
            this._fadeDistance = val;
        } else {
            cpov.error("fatal", "fadeDistance must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get fadePower() {
        if(typeof this._fadePower == "function")
            return this._fadePower();
        else if(typeof this._fadePower == "string" && this._fadePower.substr(0, 1) == "&")
            return this._fadePower.substr(1);
        else
            return this._fadePower;
    }

    set fadePower(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._fadePower = val;
        } else {
            cpov.error("fatal", "fadePower must be a float.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get falloff() {
        if(typeof this._falloff == "function")
            return this._falloff();
        else if(typeof this._falloff == "string" && this._falloff.substr(0, 1) == "&")
            return this._falloff.substr(1);
        else
            return this._falloff;
    }

    set falloff(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90.)) {
            this._falloff = val;
        } else {
            cpov.error("fatal", "falloff must be a float less than 90.", "LightSource");
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

    set jitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get looksLike() {
        if(typeof this._looksLike == "function")
            return this._looksLike();
        else if(typeof this._looksLike == "string" && this._looksLike.substr(0, 1) == "&")
            return this._looksLike.substr(1);
        else
            return this._looksLike;
    }

    set looksLike(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._looksLike = val;
        } else {
            cpov.error("fatal", "looksLike must be a Primitive.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get mediaAttenuation() {
        if(typeof this._mediaAttenuation == "function")
            return this._mediaAttenuation();
        else if(typeof this._mediaAttenuation == "string" && this._mediaAttenuation.substr(0, 1) == "&")
            return this._mediaAttenuation.substr(1);
        else
            return this._mediaAttenuation;
    }

    set mediaAttenuation(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaAttenuation = val;
        } else {
            cpov.error("fatal", "mediaAttenuation must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get mediaInteraction() {
        if(typeof this._mediaInteraction == "function")
            return this._mediaInteraction();
        else if(typeof this._mediaInteraction == "string" && this._mediaInteraction.substr(0, 1) == "&")
            return this._mediaInteraction.substr(1);
        else
            return this._mediaInteraction;
    }

    set mediaInteraction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaInteraction = val;
        } else {
            cpov.error("fatal", "mediaInteraction must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get orient() {
        if(typeof this._orient == "function")
            return this._orient();
        else if(typeof this._orient == "string" && this._orient.substr(0, 1) == "&")
            return this._orient.substr(1);
        else
            return this._orient;
    }

    set orient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._orient = val;
        } else {
            cpov.error("fatal", "orient must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get parallel() {
        if(typeof this._parallel == "function")
            return this._parallel();
        else if(typeof this._parallel == "string" && this._parallel.substr(0, 1) == "&")
            return this._parallel.substr(1);
        else
            return this._parallel;
    }

    set parallel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._parallel = val;
        } else {
            cpov.error("fatal", "parallel must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get pointAt() {
        if(typeof this._pointAt == "function")
            return this._pointAt();
        else if(typeof this._pointAt == "string" && this._pointAt.substr(0, 1) == "&")
            return this._pointAt.substr(1);
        else
            return this._pointAt;
    }

    set pointAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._pointAt = val;
        } else {
            cpov.error("fatal", "pointAt must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get projectedThrough() {
        if(typeof this._projectedThrough == "function")
            return this._projectedThrough();
        else if(typeof this._projectedThrough == "string" && this._projectedThrough.substr(0, 1) == "&")
            return this._projectedThrough.substr(1);
        else
            return this._projectedThrough;
    }

    set projectedThrough(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._projectedThrough = val;
        } else {
            cpov.error("fatal", "projectedThrough", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90)) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float less than 90.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get shadowless() {
        if(typeof this._shadowless == "function")
            return this._shadowless();
        else if(typeof this._shadowless == "string" && this._shadowless.substr(0, 1) == "&")
            return this._shadowless.substr(1);
        else
            return this._shadowless;
    }

    set shadowless(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._shadowless = val;
        } else {
            cpov.error("fatal", "shadowless must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get size1() {
        if(typeof this._size1 == "function")
            return this._size1();
        else if(typeof this._size1 == "string" && this._size1.substr(0, 1) == "&")
            return this._size1.substr(1);
        else
            return this._size1;
    }

    set size1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._size1 = val;
        } else {
            cpov.error("fatal", "size1 must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get size2() {
        if(typeof this._size2 == "function")
            return this._size2();
        else if(typeof this._size2 == "string" && this._size2.substr(0, 1) == "&")
            return this._size2.substr(1);
        else
            return this._size2;
    }

    set size2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._size2 = val;
        } else {
            cpov.error("fatal", "size2 must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get tightness() {
        if(typeof this._tightness == "function")
            return this._tightness();
        else if(typeof this._tightness == "string" && this._tightness.substr(0, 1) == "&")
            return this._tightness.substr(1);
        else
            return this._tightness;
    }

    set tightness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val <= 100)) {
            this._tightness = val;
        } else {
            cpov.error("fatal", "tightness must be a float in the range (0 - 100).", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val) && (val == 'spotlight' || val == 'cylinder'))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be either 'spotlight' or 'cylinder'.", "LightSource");
        }
    }


}

exports.LightSource = LightSource;


//==============================================================================
// Ovus class
//==============================================================================

class Ovus {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._bottomRadius = null;
        this._topRadius    = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Ovus]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Ovus]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Ovus]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get bottomRadius() {
        if(typeof this._bottomRadius == "function")
            return this._bottomRadius();
        else if(typeof this._bottomRadius == "string" && this._bottomRadius.substr(0, 1) == "&")
            return this._bottomRadius.substr(1);
        else
            return this._bottomRadius;
    }

    set bottomRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bottomRadius = val;
        } else {
            cpov.error("fatal", "bottomRadius must be a float.", "Ovus");
        }
    }

    //--------------------------------------------------------------------------

    get topRadius() {
        if(typeof this._topRadius == "function")
            return this._topRadius();
        else if(typeof this._topRadius == "string" && this._topRadius.substr(0, 1) == "&")
            return this._topRadius.substr(1);
        else
            return this._topRadius;
    }

    set topRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._topRadius = val;
        } else {
            cpov.error("fatal", "topRadius must be a float.", "Ovus");
        }
    }


}

exports.Ovus = Ovus;


//==============================================================================
// Parametric class
//==============================================================================

class Parametric {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._funcX           = null;
        this._funcY           = null;
        this._funcZ           = null;
        this._uv1             = null;
        this._uv2             = null;
        this._containedBy     = null;
        this._maxGradient     = null;
        this._accuracy        = null;
        this._precomputeDepth = null;
        this._precomputeX     = null;
        this._precomputeY     = null;
        this._precomputeZ     = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Parametric]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Parametric]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Parametric]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get funcX() {
        if(typeof this._funcX == "function")
            return this._funcX();
        else if(typeof this._funcX == "string" && this._funcX.substr(0, 1) == "&")
            return this._funcX.substr(1);
        else
            return this._funcX;
    }

    set funcX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcX = val;
        } else {
            cpov.error("fatal", "funcX must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcY() {
        if(typeof this._funcY == "function")
            return this._funcY();
        else if(typeof this._funcY == "string" && this._funcY.substr(0, 1) == "&")
            return this._funcY.substr(1);
        else
            return this._funcY;
    }

    set funcY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcY = val;
        } else {
            cpov.error("fatal", "funcY must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcZ() {
        if(typeof this._funcZ == "function")
            return this._funcZ();
        else if(typeof this._funcZ == "string" && this._funcZ.substr(0, 1) == "&")
            return this._funcZ.substr(1);
        else
            return this._funcZ;
    }

    set funcZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcZ = val;
        } else {
            cpov.error("fatal", "funcZ must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv1() {
        if(typeof this._uv1 == "function")
            return this._uv1();
        else if(typeof this._uv1 == "string" && this._uv1.substr(0, 1) == "&")
            return this._uv1.substr(1);
        else
            return this._uv1;
    }

    set uv1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV'))) {
            this._uv1 = val;
        } else {
            cpov.error("fatal", "uv1 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv2() {
        if(typeof this._uv2 == "function")
            return this._uv2();
        else if(typeof this._uv2 == "string" && this._uv2.substr(0, 1) == "&")
            return this._uv2.substr(1);
        else
            return this._uv2;
    }

    set uv2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV'))) {
            this._uv2 = val;
        } else {
            cpov.error("fatal", "uv2 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(typeof this._containedBy == "string" && this._containedBy.substr(0, 1) == "&")
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box'))) {
            this._containedBy = val;
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or Box.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient();
        else if(typeof this._maxGradient == "string" && this._maxGradient.substr(0, 1) == "&")
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy();
        else if(typeof this._accuracy == "string" && this._accuracy.substr(0, 1) == "&")
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeDepth() {
        if(typeof this._precomputeDepth == "function")
            return this._precomputeDepth();
        else if(typeof this._precomputeDepth == "string" && this._precomputeDepth.substr(0, 1) == "&")
            return this._precomputeDepth.substr(1);
        else
            return this._precomputeDepth;
    }

    set precomputeDepth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precomputeDepth = val;
        } else {
            cpov.error("fatal", "precomputeDepth must be an integer.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeX() {
        if(typeof this._precomputeX == "function")
            return this._precomputeX();
        else if(typeof this._precomputeX == "string" && this._precomputeX.substr(0, 1) == "&")
            return this._precomputeX.substr(1);
        else
            return this._precomputeX;
    }

    set precomputeX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeX = val;
        } else {
            cpov.error("fatal", "precomputeX must be a boolean.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeY() {
        if(typeof this._precomputeY == "function")
            return this._precomputeY();
        else if(typeof this._precomputeY == "string" && this._precomputeY.substr(0, 1) == "&")
            return this._precomputeY.substr(1);
        else
            return this._precomputeY;
    }

    set precomputeY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeY = val;
        } else {
            cpov.error("fatal", "precomputeY must be a boolean.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeZ() {
        if(typeof this._precomputeZ == "function")
            return this._precomputeZ();
        else if(typeof this._precomputeZ == "string" && this._precomputeZ.substr(0, 1) == "&")
            return this._precomputeZ.substr(1);
        else
            return this._precomputeZ;
    }

    set precomputeZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeZ = val;
        } else {
            cpov.error("fatal", "precomputeZ must be a boolean.", "Parametric");
        }
    }


}

exports.Parametric = Parametric;


//==============================================================================
// Prism class
//==============================================================================

class Prism {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._type    = null;
        this._height1 = null;
        this._height2 = null;
        this._points  = null;
        this._open    = null;
        this._sturm   = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Prism]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Prism]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Prism]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.prismTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'conicSweep', 'cubicSpline', 'linearSpline', 'linearSweep', or 'quadraticSpline'.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get height1() {
        if(typeof this._height1 == "function")
            return this._height1();
        else if(typeof this._height1 == "string" && this._height1.substr(0, 1) == "&")
            return this._height1.substr(1);
        else
            return this._height1;
    }

    set height1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height1 = val;
        } else {
            cpov.error("fatal", "height1 must be a float.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get height2() {
        if(typeof this._height2 == "function")
            return this._height2();
        else if(typeof this._height2 == "string" && this._height2.substr(0, 1) == "&")
            return this._height2.substr(1);
        else
            return this._height2;
    }

    set height2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height2 = val;
        } else {
            cpov.error("fatal", "height2 must be a float", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of VectorXY.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Prism");
        }
    }


}

exports.Prism = Prism;


//==============================================================================
// Sphere class
//==============================================================================

class Sphere {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._center   = null;
        this._radius   = null;
        this._strength = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Sphere]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Sphere]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Sphere]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(typeof this._center == "string" && this._center.substr(0, 1) == "&")
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Sphere");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Sphere");
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength();
        else if(typeof this._strength == "string" && this._strength.substr(0, 1) == "&")
            return this._strength.substr(1);
        else
            return this._strength;
    }

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float.", "Sphere");
        }
    }


}

exports.Sphere = Sphere;


//==============================================================================
// SphereSweep class
//==============================================================================

class SphereSweep {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._type      = null;
        this._spheres   = null;
        this._tolerance = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[SphereSweep]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[SphereSweep]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[SphereSweep]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.internalSplineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'linearSpline', 'bSpline', or 'cubicSpline'.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get spheres() {
        if(typeof this._spheres == "function")
            return this._spheres();
        else if(typeof this._spheres == "string" && this._spheres.substr(0, 1) == "&")
            return this._spheres.substr(1);
        else
            return this._spheres;
    }

    set spheres(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Sphere', 2, infinity))) {
            this._spheres = val;
        } else {
            cpov.error("fatal", "spheres must be an an array of two or more Sphere.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get tolerance() {
        if(typeof this._tolerance == "function")
            return this._tolerance();
        else if(typeof this._tolerance == "string" && this._tolerance.substr(0, 1) == "&")
            return this._tolerance.substr(1);
        else
            return this._tolerance;
    }

    set tolerance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._tolerance = val;
        } else {
            cpov.error("fatal", "tolerance must be a float.", "SphereSweep");
        }
    }


}

exports.SphereSweep = SphereSweep;


//==============================================================================
// Superellipsoid class
//==============================================================================

class Superellipsoid {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._vector = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Superellipsoid]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Superellipsoid]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Superellipsoid]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get vector() {
        if(typeof this._vector == "function")
            return this._vector();
        else if(typeof this._vector == "string" && this._vector.substr(0, 1) == "&")
            return this._vector.substr(1);
        else
            return this._vector;
    }

    set vector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXY'))) {
            this._vector = val;
        } else {
            cpov.error("fatal", "vector must be a VectorXY.", "Superellipsoid");
        }
    }


}

exports.Superellipsoid = Superellipsoid;


//==============================================================================
// Sor class
//==============================================================================

class Sor {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._points = null;
        this._open   = null;
        this._sturm  = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Sor]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Sor]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Sor]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of two or more VectorXY.", "Sor");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Sor");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Sor");
        }
    }


}

exports.Sor = Sor;


//==============================================================================
// Text class
//==============================================================================

class Text {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._font        = null;
        this._displayText = null;
        this._thickness   = null;
        this._offset      = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Text]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Text]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Text]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get font() {
        if(typeof this._font == "function")
            return this._font();
        else if(typeof this._font == "string" && this._font.substr(0, 1) == "&")
            return this._font.substr(1);
        else
            return this._font;
    }

    set font(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._font = val;
        } else {
            cpov.error("fatal", "font must be a non-empty string.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get displayText() {
        if(typeof this._displayText == "function")
            return this._displayText();
        else if(typeof this._displayText == "string" && this._displayText.substr(0, 1) == "&")
            return this._displayText.substr(1);
        else
            return this._displayText;
    }

    set displayText(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._displayText = val;
        } else {
            cpov.error("fatal", "displayText must be a non-empty string.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get thickness() {
        if(typeof this._thickness == "function")
            return this._thickness();
        else if(typeof this._thickness == "string" && this._thickness.substr(0, 1) == "&")
            return this._thickness.substr(1);
        else
            return this._thickness;
    }

    set thickness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._thickness = val;
        } else {
            cpov.error("fatal", "thickness must be a float.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get offset() {
        if(typeof this._offset == "function")
            return this._offset();
        else if(typeof this._offset == "string" && this._offset.substr(0, 1) == "&")
            return this._offset.substr(1);
        else
            return this._offset;
    }

    set offset(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._offset = val;
        } else {
            cpov.error("fatal", "offset must be a float.", "Text");
        }
    }


}

exports.Text = Text;


//==============================================================================
// Torus class
//==============================================================================

class Torus {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._majorRadius = null;
        this._minorRadius = null;
        this._sturm       = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Torus]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Torus]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Torus]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get majorRadius() {
        if(typeof this._majorRadius == "function")
            return this._majorRadius();
        else if(typeof this._majorRadius == "string" && this._majorRadius.substr(0, 1) == "&")
            return this._majorRadius.substr(1);
        else
            return this._majorRadius;
    }

    set majorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._majorRadius = val;
        } else {
            cpov.error("fatal", "majorRadius must be a float.", "Torus");
        }
    }

    //--------------------------------------------------------------------------

    get minorRadius() {
        if(typeof this._minorRadius == "function")
            return this._minorRadius();
        else if(typeof this._minorRadius == "string" && this._minorRadius.substr(0, 1) == "&")
            return this._minorRadius.substr(1);
        else
            return this._minorRadius;
    }

    set minorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._minorRadius = val;
        } else {
            cpov.error("fatal", "minorRadius must be a float.", "Torus");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Torus");
        }
    }


}

exports.Torus = Torus;


//==============================================================================
// BicubicPatch class
//==============================================================================

class BicubicPatch {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._type     = null;
        this._points   = null;
        this._uSteps   = null;
        this._vSteps   = null;
        this._flatness = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[BicubicPatch]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[BicubicPatch]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[BicubicPatch]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && (val == 0 || val == 1))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be either 0 or 1.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of 16 VectorXYZ.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get uSteps() {
        if(typeof this._uSteps == "function")
            return this._uSteps();
        else if(typeof this._uSteps == "string" && this._uSteps.substr(0, 1) == "&")
            return this._uSteps.substr(1);
        else
            return this._uSteps;
    }

    set uSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._uSteps = val;
        } else {
            cpov.error("fatal", "uSteps must be an integer.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get vSteps() {
        if(typeof this._vSteps == "function")
            return this._vSteps();
        else if(typeof this._vSteps == "string" && this._vSteps.substr(0, 1) == "&")
            return this._vSteps.substr(1);
        else
            return this._vSteps;
    }

    set vSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vSteps = val;
        } else {
            cpov.error("fatal", "vSteps must be an integer.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get flatness() {
        if(typeof this._flatness == "function")
            return this._flatness();
        else if(typeof this._flatness == "string" && this._flatness.substr(0, 1) == "&")
            return this._flatness.substr(1);
        else
            return this._flatness;
    }

    set flatness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._flatness = val;
        } else {
            cpov.error("fatal", "flatness must be a float.", "BicubicPatch");
        }
    }


}

exports.BicubicPatch = BicubicPatch;


//==============================================================================
// Disc class
//==============================================================================

class Disc {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._center     = null;
        this._normal     = null;
        this._radius     = null;
        this._holeRadius = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Disc]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Disc]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Disc]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(typeof this._center == "string" && this._center.substr(0, 1) == "&")
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get holeRadius() {
        if(typeof this._holeRadius == "function")
            return this._holeRadius();
        else if(typeof this._holeRadius == "string" && this._holeRadius.substr(0, 1) == "&")
            return this._holeRadius.substr(1);
        else
            return this._holeRadius;
    }

    set holeRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._holeRadius = val;
        } else {
            cpov.error("fatal", "holeRadius must be a float.", "Disc");
        }
    }


}

exports.Disc = Disc;


//==============================================================================
// Mesh class
//==============================================================================

class Mesh {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._triangles    = null;
        this._insideVector = null;
        this._hierarchy    = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Mesh]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Mesh]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Mesh]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get triangles() {
        if(typeof this._triangles == "function")
            return this._triangles();
        else if(typeof this._triangles == "string" && this._triangles.substr(0, 1) == "&")
            return this._triangles.substr(1);
        else
            return this._triangles;
    }

    set triangles(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Triangle', 1, Infinity))) {
            this._triangles = val;
        } else {
            cpov.error("fatal", "triangles", "Mesh");
        }
    }

    //--------------------------------------------------------------------------

    get insideVector() {
        if(typeof this._insideVector == "function")
            return this._insideVector();
        else if(typeof this._insideVector == "string" && this._insideVector.substr(0, 1) == "&")
            return this._insideVector.substr(1);
        else
            return this._insideVector;
    }

    set insideVector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._insideVector = val;
        } else {
            cpov.error("fatal", "insideVector must be a VectorXYZ.", "Mesh");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Mesh");
        }
    }


}

exports.Mesh = Mesh;


//==============================================================================
// Polygon class
//==============================================================================

class Polygon {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._points = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Polygon]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Polygon]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Polygon]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 3, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of three or more VectorXY.", "Polygon");
        }
    }


}

exports.Polygon = Polygon;


//==============================================================================
// Triangle class
//==============================================================================

class Triangle {

    constructor(options) {

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;

        // Mutable properties //

        this._corner1  = null;
        this._corner2  = null;
        this._corner3  = null;
        this._smooth   = null;
        this._normal1  = null;
        this._normal2  = null;
        this._normal3  = null;
        this._textures = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Triangle]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Triangle]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Triangle]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(typeof this._corner1 == "string" && this._corner1.substr(0, 1) == "&")
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(typeof this._corner2 == "string" && this._corner2.substr(0, 1) == "&")
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner3() {
        if(typeof this._corner3 == "function")
            return this._corner3();
        else if(typeof this._corner3 == "string" && this._corner3.substr(0, 1) == "&")
            return this._corner3.substr(1);
        else
            return this._corner3;
    }

    set corner3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner3 = val;
        } else {
            cpov.error("fatal", "corner3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth();
        else if(typeof this._smooth == "string" && this._smooth.substr(0, 1) == "&")
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal1() {
        if(typeof this._normal1 == "function")
            return this._normal1();
        else if(typeof this._normal1 == "string" && this._normal1.substr(0, 1) == "&")
            return this._normal1.substr(1);
        else
            return this._normal1;
    }

    set normal1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal1 = val;
        } else {
            cpov.error("fatal", "normal1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal2() {
        if(typeof this._normal2 == "function")
            return this._normal2();
        else if(typeof this._normal2 == "string" && this._normal2.substr(0, 1) == "&")
            return this._normal2.substr(1);
        else
            return this._normal2;
    }

    set normal2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal2 = val;
        } else {
            cpov.error("fatal", "normal2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal3() {
        if(typeof this._normal3 == "function")
            return this._normal3();
        else if(typeof this._normal3 == "string" && this._normal3.substr(0, 1) == "&")
            return this._normal3.substr(1);
        else
            return this._normal3;
    }

    set normal3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal3 = val;
        } else {
            cpov.error("fatal", "normal3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get textures() {
        if(typeof this._textures == "function")
            return this._textures();
        else if(typeof this._textures == "string" && this._textures.substr(0, 1) == "&")
            return this._textures.substr(1);
        else
            return this._textures;
    }

    set textures(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInt(val))) {
            this._textures = val;
        } else {
            cpov.error("fatal", "textures must be an array of integers.", "Triangle");
        }
    }


}

exports.Triangle = Triangle;


//==============================================================================
// Plane class
//==============================================================================

class Plane {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._normal   = null;
        this._distance = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Plane]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Plane]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Plane]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Plane");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(typeof this._distance == "string" && this._distance.substr(0, 1) == "&")
            return this._distance.substr(1);
        else
            return this._distance;
    }

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "Plane");
        }
    }


}

exports.Plane = Plane;


//==============================================================================
// Poly class
//==============================================================================

class Poly {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Poly]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Poly]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Poly]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 35))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 2 to 35 floats.", "Poly");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Poly");
        }
    }


}

exports.Poly = Poly;


//==============================================================================
// Cubic class
//==============================================================================

class Cubic {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Cubic]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Cubic]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Cubic]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 20, 20))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 20 floats.", "Cubic");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Cubic");
        }
    }


}

exports.Cubic = Cubic;


//==============================================================================
// Quartic class
//==============================================================================

class Quartic {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Quartic]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Quartic]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Quartic]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 20, 20))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 20 floats.", "Quartic");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Quartic");
        }
    }


}

exports.Quartic = Quartic;


//==============================================================================
// Polynomial class
//==============================================================================

class Polynomial {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._order        = null;
        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Polynomial]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Polynomial]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Polynomial]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get order() {
        if(typeof this._order == "function")
            return this._order();
        else if(typeof this._order == "string" && this._order.substr(0, 1) == "&")
            return this._order.substr(1);
        else
            return this._order;
    }

    set order(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._order = val;
        } else {
            cpov.error("fatal", "order must be an integer.", "Polynomial");
        }
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW'))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be a VectorXYZW.", "Polynomial");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Polynomial");
        }
    }


}

exports.Polynomial = Polynomial;


//==============================================================================
// Quadric class
//==============================================================================

class Quadric {

    constructor(options) {

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;

        // Mutable properties //

        this._a = null;
        this._b = null;
        this._c = null;
        this._d = null;
        this._e = null;
        this._f = null;
        this._g = null;
        this._h = null;
        this._i = null;
        this._j = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Quadric]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Quadric]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Quadric]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get a() {
        if(typeof this._a == "function")
            return this._a();
        else if(typeof this._a == "string" && this._a.substr(0, 1) == "&")
            return this._a.substr(1);
        else
            return this._a;
    }

    set a(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._a = val;
        } else {
            cpov.error("fatal", "a must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get b() {
        if(typeof this._b == "function")
            return this._b();
        else if(typeof this._b == "string" && this._b.substr(0, 1) == "&")
            return this._b.substr(1);
        else
            return this._b;
    }

    set b(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._b = val;
        } else {
            cpov.error("fatal", "b must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get c() {
        if(typeof this._c == "function")
            return this._c();
        else if(typeof this._c == "string" && this._c.substr(0, 1) == "&")
            return this._c.substr(1);
        else
            return this._c;
    }

    set c(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._c = val;
        } else {
            cpov.error("fatal", "c must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get d() {
        if(typeof this._d == "function")
            return this._d();
        else if(typeof this._d == "string" && this._d.substr(0, 1) == "&")
            return this._d.substr(1);
        else
            return this._d;
    }

    set d(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._d = val;
        } else {
            cpov.error("fatal", "d must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get e() {
        if(typeof this._e == "function")
            return this._e();
        else if(typeof this._e == "string" && this._e.substr(0, 1) == "&")
            return this._e.substr(1);
        else
            return this._e;
    }

    set e(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._e = val;
        } else {
            cpov.error("fatal", "e must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get f() {
        if(typeof this._f == "function")
            return this._f();
        else if(typeof this._f == "string" && this._f.substr(0, 1) == "&")
            return this._f.substr(1);
        else
            return this._f;
    }

    set f(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._f = val;
        } else {
            cpov.error("fatal", "f must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get g() {
        if(typeof this._g == "function")
            return this._g();
        else if(typeof this._g == "string" && this._g.substr(0, 1) == "&")
            return this._g.substr(1);
        else
            return this._g;
    }

    set g(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._g = val;
        } else {
            cpov.error("fatal", "g must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get h() {
        if(typeof this._h == "function")
            return this._h();
        else if(typeof this._h == "string" && this._h.substr(0, 1) == "&")
            return this._h.substr(1);
        else
            return this._h;
    }

    set h(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._h = val;
        } else {
            cpov.error("fatal", "h must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get i() {
        if(typeof this._i == "function")
            return this._i();
        else if(typeof this._i == "string" && this._i.substr(0, 1) == "&")
            return this._i.substr(1);
        else
            return this._i;
    }

    set i(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._i = val;
        } else {
            cpov.error("fatal", "i must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get j() {
        if(typeof this._j == "function")
            return this._j();
        else if(typeof this._j == "string" && this._j.substr(0, 1) == "&")
            return this._j.substr(1);
        else
            return this._j;
    }

    set j(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._j = val;
        } else {
            cpov.error("fatal", "j must be a float.", "Quadric");
        }
    }


}

exports.Quadric = Quadric;


//==============================================================================
// Union class
//==============================================================================

class Union {

    constructor(options) {

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects    = null;
        this._splitUnion = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Union]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Union]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Union]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Union");
        }
    }

    //--------------------------------------------------------------------------

    get splitUnion() {
        if(typeof this._splitUnion == "function")
            return this._splitUnion();
        else if(typeof this._splitUnion == "string" && this._splitUnion.substr(0, 1) == "&")
            return this._splitUnion.substr(1);
        else
            return this._splitUnion;
    }

    set splitUnion(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnion = val;
        } else {
            cpov.error("fatal", "splitUnion must be a boolean.", "Union");
        }
    }


}

exports.Union = Union;


//==============================================================================
// Intersection class
//==============================================================================

class Intersection {

    constructor(options) {

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Intersection]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Intersection]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Intersection]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Intersection");
        }
    }


}

exports.Intersection = Intersection;


//==============================================================================
// Difference class
//==============================================================================

class Difference {

    constructor(options) {

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._positiveObject  = null;
        this._negativeObjects = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Difference]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Difference]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Difference]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get positiveObject() {
        if(typeof this._positiveObject == "function")
            return this._positiveObject();
        else if(typeof this._positiveObject == "string" && this._positiveObject.substr(0, 1) == "&")
            return this._positiveObject.substr(1);
        else
            return this._positiveObject;
    }

    set positiveObject(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._positiveObject = val;
        } else {
            cpov.error("fatal", "positiveObject must be a Primitive.", "Difference");
        }
    }

    //--------------------------------------------------------------------------

    get negativeObjects() {
        if(typeof this._negativeObjects == "function")
            return this._negativeObjects();
        else if(typeof this._negativeObjects == "string" && this._negativeObjects.substr(0, 1) == "&")
            return this._negativeObjects.substr(1);
        else
            return this._negativeObjects;
    }

    set negativeObjects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._negativeObjects = val;
        } else {
            cpov.error("fatal", "negativeObjects must be an array of Primitives.", "Difference");
        }
    }


}

exports.Difference = Difference;


//==============================================================================
// Merge class
//==============================================================================

class Merge {

    constructor(options) {

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    set finite(val) {
        throw new TypeError("[Merge]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    set solid(val) {
        throw new TypeError("[Merge]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    set csg(val) {
        throw new TypeError("[Merge]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Merge");
        }
    }


}

exports.Merge = Merge;


//==============================================================================
// VectorXY class
//==============================================================================

class VectorXY {

    constructor(options) {

        // Mutable properties //

        this._x = null;
        this._y = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(typeof this._x == "string" && this._x.substr(0, 1) == "&")
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float.", "VectorXY");
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y();
        else if(typeof this._y == "string" && this._y.substr(0, 1) == "&")
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float.", "VectorXY");
        }
    }


}

exports.VectorXY = VectorXY;


//==============================================================================
// VectorUV class
//==============================================================================

class VectorUV {

    constructor(options) {

        // Mutable properties //

        this._u = null;
        this._v = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get u() {
        if(typeof this._u == "function")
            return this._u();
        else if(typeof this._u == "string" && this._u.substr(0, 1) == "&")
            return this._u.substr(1);
        else
            return this._u;
    }

    set u(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._u = val;
        } else {
            cpov.error("fatal", "u must be a float.", "VectorUV");
        }
    }

    //--------------------------------------------------------------------------

    get v() {
        if(typeof this._v == "function")
            return this._v();
        else if(typeof this._v == "string" && this._v.substr(0, 1) == "&")
            return this._v.substr(1);
        else
            return this._v;
    }

    set v(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v = val;
        } else {
            cpov.error("fatal", "v must be a float.", "VectorUV");
        }
    }


}

exports.VectorUV = VectorUV;


//==============================================================================
// VectorXYZ class
//==============================================================================

class VectorXYZ {

    constructor(options) {

        // Mutable properties //

        this._x = null;
        this._y = null;
        this._z = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(typeof this._x == "string" && this._x.substr(0, 1) == "&")
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float.", "VectorXYZ");
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y();
        else if(typeof this._y == "string" && this._y.substr(0, 1) == "&")
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float.", "VectorXYZ");
        }
    }

    //--------------------------------------------------------------------------

    get z() {
        if(typeof this._z == "function")
            return this._z();
        else if(typeof this._z == "string" && this._z.substr(0, 1) == "&")
            return this._z.substr(1);
        else
            return this._z;
    }

    set z(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._z = val;
        } else {
            cpov.error("fatal", "z must be a float.", "VectorXYZ");
        }
    }


}

exports.VectorXYZ = VectorXYZ;


//==============================================================================
// VectorXYZW class
//==============================================================================

class VectorXYZW {

    constructor(options) {

        // Mutable properties //

        this._x = null;
        this._y = null;
        this._z = null;
        this._w = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(typeof this._x == "string" && this._x.substr(0, 1) == "&")
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float.", "VectorXYZW");
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y();
        else if(typeof this._y == "string" && this._y.substr(0, 1) == "&")
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float.", "VectorXYZW");
        }
    }

    //--------------------------------------------------------------------------

    get z() {
        if(typeof this._z == "function")
            return this._z();
        else if(typeof this._z == "string" && this._z.substr(0, 1) == "&")
            return this._z.substr(1);
        else
            return this._z;
    }

    set z(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._z = val;
        } else {
            cpov.error("fatal", "z must be a float.", "VectorXYZW");
        }
    }

    //--------------------------------------------------------------------------

    get w() {
        if(typeof this._w == "function")
            return this._w();
        else if(typeof this._w == "string" && this._w.substr(0, 1) == "&")
            return this._w.substr(1);
        else
            return this._w;
    }

    set w(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._w = val;
        } else {
            cpov.error("fatal", "w must be a float.", "VectorXYZW");
        }
    }


}

exports.VectorXYZW = VectorXYZW;


//==============================================================================
// Color class
//==============================================================================

class Color {

    constructor(options) {

        // Mutable properties //

        this._r    = null;
        this._g    = null;
        this._b    = null;
        this._f    = null;
        this._t    = null;
        this._srgb = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get r() {
        if(typeof this._r == "function")
            return this._r();
        else if(typeof this._r == "string" && this._r.substr(0, 1) == "&")
            return this._r.substr(1);
        else
            return this._r;
    }

    set r(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._r = val;
        } else {
            cpov.error("fatal", "r must be a float.", "Color");
        }
    }

    //--------------------------------------------------------------------------

    get g() {
        if(typeof this._g == "function")
            return this._g();
        else if(typeof this._g == "string" && this._g.substr(0, 1) == "&")
            return this._g.substr(1);
        else
            return this._g;
    }

    set g(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._g = val;
        } else {
            cpov.error("fatal", "g must be a float.", "Color");
        }
    }

    //--------------------------------------------------------------------------

    get b() {
        if(typeof this._b == "function")
            return this._b();
        else if(typeof this._b == "string" && this._b.substr(0, 1) == "&")
            return this._b.substr(1);
        else
            return this._b;
    }

    set b(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._b = val;
        } else {
            cpov.error("fatal", "b must be a float.", "Color");
        }
    }

    //--------------------------------------------------------------------------

    get f() {
        if(typeof this._f == "function")
            return this._f();
        else if(typeof this._f == "string" && this._f.substr(0, 1) == "&")
            return this._f.substr(1);
        else
            return this._f;
    }

    set f(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._f = val;
        } else {
            cpov.error("fatal", "f must be a float.", "Color");
        }
    }

    //--------------------------------------------------------------------------

    get t() {
        if(typeof this._t == "function")
            return this._t();
        else if(typeof this._t == "string" && this._t.substr(0, 1) == "&")
            return this._t.substr(1);
        else
            return this._t;
    }

    set t(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._t = val;
        } else {
            cpov.error("fatal", "t must be a float.", "Color");
        }
    }

    //--------------------------------------------------------------------------

    get srgb() {
        if(typeof this._srgb == "function")
            return this._srgb();
        else if(typeof this._srgb == "string" && this._srgb.substr(0, 1) == "&")
            return this._srgb.substr(1);
        else
            return this._srgb;
    }

    set srgb(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._srgb = val;
        } else {
            cpov.error("fatal", "srgb must be a boolean.", "Color");
        }
    }


}

exports.Color = Color;


//==============================================================================
// Matrix class
//==============================================================================

class Matrix {

    constructor(options) {

        // Mutable properties //

        this._v00 = null;
        this._v01 = null;
        this._v02 = null;
        this._v10 = null;
        this._v11 = null;
        this._v12 = null;
        this._v20 = null;
        this._v21 = null;
        this._v22 = null;
        this._v30 = null;
        this._v31 = null;
        this._v32 = null;

        // Initialization //

        cpov.initObject(this, options);

    }

    //--------------------------------------------------------------------------

    get v00() {
        if(typeof this._v00 == "function")
            return this._v00();
        else if(typeof this._v00 == "string" && this._v00.substr(0, 1) == "&")
            return this._v00.substr(1);
        else
            return this._v00;
    }

    set v00(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v00 = val;
        } else {
            cpov.error("fatal", "v00 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v01() {
        if(typeof this._v01 == "function")
            return this._v01();
        else if(typeof this._v01 == "string" && this._v01.substr(0, 1) == "&")
            return this._v01.substr(1);
        else
            return this._v01;
    }

    set v01(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v01 = val;
        } else {
            cpov.error("fatal", "v01 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v02() {
        if(typeof this._v02 == "function")
            return this._v02();
        else if(typeof this._v02 == "string" && this._v02.substr(0, 1) == "&")
            return this._v02.substr(1);
        else
            return this._v02;
    }

    set v02(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v02 = val;
        } else {
            cpov.error("fatal", "v02 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v10() {
        if(typeof this._v10 == "function")
            return this._v10();
        else if(typeof this._v10 == "string" && this._v10.substr(0, 1) == "&")
            return this._v10.substr(1);
        else
            return this._v10;
    }

    set v10(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v10 = val;
        } else {
            cpov.error("fatal", "v10 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v11() {
        if(typeof this._v11 == "function")
            return this._v11();
        else if(typeof this._v11 == "string" && this._v11.substr(0, 1) == "&")
            return this._v11.substr(1);
        else
            return this._v11;
    }

    set v11(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v11 = val;
        } else {
            cpov.error("fatal", "v11 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v12() {
        if(typeof this._v12 == "function")
            return this._v12();
        else if(typeof this._v12 == "string" && this._v12.substr(0, 1) == "&")
            return this._v12.substr(1);
        else
            return this._v12;
    }

    set v12(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v12 = val;
        } else {
            cpov.error("fatal", "v12 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v20() {
        if(typeof this._v20 == "function")
            return this._v20();
        else if(typeof this._v20 == "string" && this._v20.substr(0, 1) == "&")
            return this._v20.substr(1);
        else
            return this._v20;
    }

    set v20(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v20 = val;
        } else {
            cpov.error("fatal", "v20 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v21() {
        if(typeof this._v21 == "function")
            return this._v21();
        else if(typeof this._v21 == "string" && this._v21.substr(0, 1) == "&")
            return this._v21.substr(1);
        else
            return this._v21;
    }

    set v21(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v21 = val;
        } else {
            cpov.error("fatal", "v21 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v22() {
        if(typeof this._v22 == "function")
            return this._v22();
        else if(typeof this._v22 == "string" && this._v22.substr(0, 1) == "&")
            return this._v22.substr(1);
        else
            return this._v22;
    }

    set v22(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v22 = val;
        } else {
            cpov.error("fatal", "v22 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v30() {
        if(typeof this._v30 == "function")
            return this._v30();
        else if(typeof this._v30 == "string" && this._v30.substr(0, 1) == "&")
            return this._v30.substr(1);
        else
            return this._v30;
    }

    set v30(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v30 = val;
        } else {
            cpov.error("fatal", "v30 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v31() {
        if(typeof this._v31 == "function")
            return this._v31();
        else if(typeof this._v31 == "string" && this._v31.substr(0, 1) == "&")
            return this._v31.substr(1);
        else
            return this._v31;
    }

    set v31(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v31 = val;
        } else {
            cpov.error("fatal", "v31 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v32() {
        if(typeof this._v32 == "function")
            return this._v32();
        else if(typeof this._v32 == "string" && this._v32.substr(0, 1) == "&")
            return this._v32.substr(1);
        else
            return this._v32;
    }

    set v32(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v32 = val;
        } else {
            cpov.error("fatal", "v32 must be a float.", "Matrix");
        }
    }


}

exports.Matrix = Matrix;


