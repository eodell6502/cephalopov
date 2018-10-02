var cpov = require("./cpov.js").cpov;

//==============================================================================
//==============================================================================

class GlobalSettings {

    constructor(objType, args) {
        super(args);

        this._adcBailout = null;
        this._ambientLight = null;
        this._assumedGamma = null;
        this._charset = null;
        this._iridWavelength = null;
        this._maxIntersections = null;
        this._maxTraceLevel = null;
        this._mmPerUnit = null;
        this._noiseGenerator = null;
        this._numberOfWaves = null;
        this._photon = null;
        this._photonAdcBailout = null;
        this._photonAutostop = null;
        this._photonCount = null;
        this._photonExpandThresholds = null;
        this._photonGather = null;
        this._photonJitter = null;
        this._photonLoadFile = null;
        this._photonMaxTraceLevel = null;
        this._photonMedia = null;
        this._photonRadius = null;
        this._photonSaveFile = null;
        this._photonSpacing = null;
        this._radAdcBailout = null;
        this._radAlwaysSample = null;
        this._radBrightness = null;
        this._radCount = null;
        this._radErrorBound = null;
        this._radGrayThreshold = null;
        this._radiosity = null;
        this._radLowErrorFactor = null;
        this._radMaximumReuse = null;
        this._radMaxSample = null;
        this._radMinimumReuse = null;
        this._radNearestCount = null;
        this._radNormal = null;
        this._radPretraceEnd = null;
        this._radPretraceStart = null;
        this._radRecursionLimit = null;
        this._radSubsurface = null;
        this._subRadiosity = null;
        this._subSamples = null;
        this._subsurface = null;
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

    //--------------------------------------------------------------------------

    set adcBailout(val) {
        if(cpov.isFloat(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set ambientLight(val) {
        if(cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB')) {
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

    //--------------------------------------------------------------------------

    set assumedGamma(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set charset(val) {
        if(cpov.isInArray(val, ['ascii', 'utf8', 'sys'])) {
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

    //--------------------------------------------------------------------------

    set iridWavelength(val) {
        if(cpov.isClass(val, 'VectorRGB') || cpov.isClass(val, 'VectorSRGB')) {
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

    //--------------------------------------------------------------------------

    set maxIntersections(val) {
        if(cpov.isInt(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set maxTraceLevel(val) {
        if(cpov.isInt(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set mmPerUnit(val) {
        if(cpov.isFloat(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set noiseGenerator(val) {
        if(cpov.isInt(val) && cpov.inArray(val, [1, 2, 3])) {
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

    //--------------------------------------------------------------------------

    set numberOfWaves(val) {
        if(cpov.isInt(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set photon(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set photonAdcBailout(val) {
        if(cpov.isFloat(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set photonAutostop(val) {
        if(cpov.isFloat(val) && cpov.within(val, 0, 1)) {
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

    //--------------------------------------------------------------------------

    set photonCount(val) {
        if(cpov.isInt(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set photonExpandThresholds(val) {
        if(Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])) {
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

    //--------------------------------------------------------------------------

    set photonGather(val) {
        if(cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]) {
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

    //--------------------------------------------------------------------------

    set photonJitter(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set photonLoadFile(val) {
        if(cpov.isNonEmptyString(val)) {
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

    //--------------------------------------------------------------------------

    set photonMaxTraceLevel(val) {
        if(cpov.isInt(val) && val >= 0) {
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

    //--------------------------------------------------------------------------

    set photonMedia(val) {
        if(cpov.isArrayOfFloats(val, 2, 2)) {
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

    //--------------------------------------------------------------------------

    set photonRadius(val) {
        if(cpov.isArrayOfFloats(val, 4, 4)) {
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

    //--------------------------------------------------------------------------

    set photonSaveFile(val) {
        if(cpov.isNonEmptyString(val)) {
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

    //--------------------------------------------------------------------------

    set photonSpacing(val) {
        if(cpov.isFloat(val) && val > 0) {
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

    //--------------------------------------------------------------------------

    set radAdcBailout(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radAlwaysSample(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set radBrightness(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radCount(val) {
        if(cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)) {
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

    //--------------------------------------------------------------------------

    set radErrorBound(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radGrayThreshold(val) {
        if(cpov.isFloat(val) && cpov.isWithin(val, 0, 1)) {
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

    //--------------------------------------------------------------------------

    set radiosity(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set radLowErrorFactor(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radMaximumReuse(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radMaxSample(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radMinimumReuse(val) {
        if(cpov.isFloat(val)) {
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

    //--------------------------------------------------------------------------

    set radNearestCount(val) {
        if(cpov.isInt(val) && cpov.isWithin(val, 1, 20)) {
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

    //--------------------------------------------------------------------------

    set radNormal(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set radPretraceEnd(val) {
        if(cpov.isFloat(val) && cpov.isWithin(0, 1)) {
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

    //--------------------------------------------------------------------------

    set radPretraceStart(val) {
        if(cpov.isFloat(val) && cpov.isWithin(0, 1)) {
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

    //--------------------------------------------------------------------------

    set radRecursionLimit(val) {
        if(cpov.isInt(val) && cpov.isWithin(val, 1, 20).) {
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

    //--------------------------------------------------------------------------

    set radSubsurface(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set subRadiosity(val) {
        if(cpov.isBoolean(val)) {
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

    //--------------------------------------------------------------------------

    set subSamples(val) {
        if(cpov.isArrayOfInts(val, 2, 2)) {
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

    //--------------------------------------------------------------------------

    set subsurface(val) {
        if(cpov.isBoolean(val)) {
            this._subsurface = val;
        } else {
            cpov.error("fatal", "subsurface must be a boolean.", "GlobalSettings");
        }
    }


}

exports.GlobalSettings = GlobalSettings;

