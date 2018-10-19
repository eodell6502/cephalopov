var cpov = require("./cephalopov.js");

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

        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get adcBailout() {
        if(typeof this._adcBailout == "function")
            return this._adcBailout();
        else if(cpov.isSDLFunction(this._adcBailout))
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
        else if(cpov.isSDLFunction(this._ambientLight))
            return this._ambientLight.substr(1);
        else
            return this._ambientLight;
    }

    set ambientLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Color'))) {
            this._ambientLight = val;
        } else {
            cpov.error("fatal", "ambientLight must be a Color.", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get assumedGamma() {
        if(typeof this._assumedGamma == "function")
            return this._assumedGamma();
        else if(cpov.isSDLFunction(this._assumedGamma))
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
        else if(cpov.isSDLFunction(this._charset))
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
        else if(cpov.isSDLFunction(this._iridWavelength))
            return this._iridWavelength.substr(1);
        else
            return this._iridWavelength;
    }

    set iridWavelength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Color'))) {
            this._iridWavelength = val;
        } else {
            cpov.error("fatal", "iridWavelength must be a Color", "GlobalSettings");
        }
    }

    //--------------------------------------------------------------------------

    get maxIntersections() {
        if(typeof this._maxIntersections == "function")
            return this._maxIntersections();
        else if(cpov.isSDLFunction(this._maxIntersections))
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
        else if(cpov.isSDLFunction(this._maxTraceLevel))
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
        else if(cpov.isSDLFunction(this._mmPerUnit))
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
        else if(cpov.isSDLFunction(this._noiseGenerator))
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
        else if(cpov.isSDLFunction(this._numberOfWaves))
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
        else if(cpov.isSDLFunction(this._photon))
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
        else if(cpov.isSDLFunction(this._photonAdcBailout))
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
        else if(cpov.isSDLFunction(this._photonAutostop))
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
        else if(cpov.isSDLFunction(this._photonCount))
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
        else if(cpov.isSDLFunction(this._photonExpandThresholds))
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
        else if(cpov.isSDLFunction(this._photonGather))
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
        else if(cpov.isSDLFunction(this._photonJitter))
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
        else if(cpov.isSDLFunction(this._photonLoadFile))
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
        else if(cpov.isSDLFunction(this._photonMaxTraceLevel))
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
        else if(cpov.isSDLFunction(this._photonMedia))
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
        else if(cpov.isSDLFunction(this._photonRadius))
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
        else if(cpov.isSDLFunction(this._photonSaveFile))
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
        else if(cpov.isSDLFunction(this._photonSpacing))
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
        else if(cpov.isSDLFunction(this._radAdcBailout))
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
        else if(cpov.isSDLFunction(this._radAlwaysSample))
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
        else if(cpov.isSDLFunction(this._radBrightness))
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
        else if(cpov.isSDLFunction(this._radCount))
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
        else if(cpov.isSDLFunction(this._radErrorBound))
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
        else if(cpov.isSDLFunction(this._radGrayThreshold))
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
        else if(cpov.isSDLFunction(this._radiosity))
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
        else if(cpov.isSDLFunction(this._radLowErrorFactor))
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
        else if(cpov.isSDLFunction(this._radMaximumReuse))
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
        else if(cpov.isSDLFunction(this._radMaxSample))
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
        else if(cpov.isSDLFunction(this._radMinimumReuse))
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
        else if(cpov.isSDLFunction(this._radNearestCount))
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
        else if(cpov.isSDLFunction(this._radNormal))
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
        else if(cpov.isSDLFunction(this._radPretraceEnd))
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
        else if(cpov.isSDLFunction(this._radPretraceStart))
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
        else if(cpov.isSDLFunction(this._radRecursionLimit))
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
        else if(cpov.isSDLFunction(this._radSubsurface))
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
        else if(cpov.isSDLFunction(this._subRadiosity))
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
        else if(cpov.isSDLFunction(this._subSamples))
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
        else if(cpov.isSDLFunction(this._subsurface))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new GlobalSettings();

        newObj.adcBailout             = this.adcBailout;            
        newObj.ambientLight           = this.ambientLight;          
        newObj.assumedGamma           = this.assumedGamma;          
        newObj.charset                = this.charset;               
        newObj.iridWavelength         = this.iridWavelength;        
        newObj.maxIntersections       = this.maxIntersections;      
        newObj.maxTraceLevel          = this.maxTraceLevel;         
        newObj.mmPerUnit              = this.mmPerUnit;             
        newObj.noiseGenerator         = this.noiseGenerator;        
        newObj.numberOfWaves          = this.numberOfWaves;         
        newObj.photon                 = this.photon;                
        newObj.photonAdcBailout       = this.photonAdcBailout;      
        newObj.photonAutostop         = this.photonAutostop;        
        newObj.photonCount            = this.photonCount;           
        newObj.photonExpandThresholds = this.photonExpandThresholds;
        newObj.photonGather           = this.photonGather;          
        newObj.photonJitter           = this.photonJitter;          
        newObj.photonLoadFile         = this.photonLoadFile;        
        newObj.photonMaxTraceLevel    = this.photonMaxTraceLevel;   
        newObj.photonMedia            = this.photonMedia;           
        newObj.photonRadius           = this.photonRadius;          
        newObj.photonSaveFile         = this.photonSaveFile;        
        newObj.photonSpacing          = this.photonSpacing;         
        newObj.radAdcBailout          = this.radAdcBailout;         
        newObj.radAlwaysSample        = this.radAlwaysSample;       
        newObj.radBrightness          = this.radBrightness;         
        newObj.radCount               = this.radCount;              
        newObj.radErrorBound          = this.radErrorBound;         
        newObj.radGrayThreshold       = this.radGrayThreshold;      
        newObj.radiosity              = this.radiosity;             
        newObj.radLowErrorFactor      = this.radLowErrorFactor;     
        newObj.radMaximumReuse        = this.radMaximumReuse;       
        newObj.radMaxSample           = this.radMaxSample;          
        newObj.radMinimumReuse        = this.radMinimumReuse;       
        newObj.radNearestCount        = this.radNearestCount;       
        newObj.radNormal              = this.radNormal;             
        newObj.radPretraceEnd         = this.radPretraceEnd;        
        newObj.radPretraceStart       = this.radPretraceStart;      
        newObj.radRecursionLimit      = this.radRecursionLimit;     
        newObj.radSubsurface          = this.radSubsurface;         
        newObj.subRadiosity           = this.subRadiosity;          
        newObj.subSamples             = this.subSamples;            
        newObj.subsurface             = this.subsurface;            

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Returns the SDL for GlobalSettings. Unlike other toSDL methods, this one
    // does not take a stops argument because the SDL global_settings
    // declaration always happens at the top level.
    //--------------------------------------------------------------------------
    
    toSDL() {
        var contents = [ ];
    
        contents.push("global_settings {");
    
        var params = {
            adcBailout: "adc_bailout",
            ambientLight: "ambient_light",
            assumedGamma: "assumed_gamma",
            iridWavelength: "irid_wavelength",
            charset: "charset",
            maxIntersections: "max_intersections",
            maxTraceLevel: "max_trace_level",
            mmPerUnit: "mm_per_unit",
            numberOfWaves: "number_of_waves",
            noiseGenerator: "noise_generator"
        };
    
        var radParams = {
            radAdcBailout: "adc_bailout",
            radAlwaysSample: "always_sample",
            radBrightness: "brightness",
            radCount: "count",
            radErrorBound: "error_bound",
            radGrayThreshold: "gray_threshold",
            radLowErrorFactor: "low_error_factor",
            radMaxSample: "max_sample",
            radMaximumReuse: "maximum_reuse",
            radMinimumReuse: "minimum_reuse",
            radNearestCount: "nearest_count",
            radNormal: "normal",
            radPretraceStart: "pretrace_start",
            radPretraceEnd: "pretrace_end",
            radRecursionLimit: "recursion_limit",
            radSubsurface: "subsurface"
        };
    
        var subParams = {
            subRadiosity: "radiosity",
            subSamples: "samples"
        };
    
        var photonParams = {
            photonSpacing: "spacing",
            photonCount: "count",
            photonGather: "gather",
            photonMedia: "media",
            photonJitter: "jitter",
            photonMaxTraceLevel: "max_trace_level",
            photonAdcBailout: "adc_bailout",
            photonSaveFile: "save_file",
            photonLoadFile: "load_file",
            photonAutostop: "autostop",
            photonExpandThresholds: "expand_thresholds",
            photonRadius: "radius"
        };
    
        for(var i in params) {
            if(this[i] !== null)
                contents.push("    " + params[i] + " " + this[i]);
        }
    
        if(this.radiosity) {
            contents.push("    radiosity {");
            for(var i in radParams) {
                if(this[i] !== null)
                    contents.push("        " + radParams[i] + " " + this[i]);
            }
            contents.push("    }");
        }
    
        if(this.subsurface) {
            contents.push("    subsurface {");
            for(var i in subParams) {
                if(this[i] !== null)
                    contents.push("        " + subParams[i] + " " + this[i]);
            }
            contents.push("    }");
        }
    
        if(this.photon) {
            contents.push("    photon {");
            for(var i in photonParams) {
                if(this[i] !== null)
                    contents.push("        " + photonParams[i] + " " + this[i]);
            }
            contents.push("    }");
        }
    
        contents.push("}");
    
        return contents.join("\n");
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

        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get allConsole() {
        if(typeof this._allConsole == "function")
            return this._allConsole();
        else
            return this._allConsole;
    }

    set allConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._allConsole = val;
        } else {
            cpov.error("fatal", "allConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get allFile() {
        if(typeof this._allFile == "function")
            return this._allFile();
        else
            return this._allFile;
    }

    set allFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._allFile = val;
        } else {
            cpov.error("fatal", "allFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialias() {
        if(typeof this._antialias == "function")
            return this._antialias();
        else
            return this._antialias;
    }

    set antialias(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._antialias = val;
        } else {
            cpov.error("fatal", "antialias must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasDepth() {
        if(typeof this._antialiasDepth == "function")
            return this._antialiasDepth();
        else
            return this._antialiasDepth;
    }

    set antialiasDepth(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 9))) {
            this._antialiasDepth = val;
        } else {
            cpov.error("fatal", "antialiasDepth must be an integer in the range 1-9.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasGamma() {
        if(typeof this._antialiasGamma == "function")
            return this._antialiasGamma();
        else
            return this._antialiasGamma;
    }

    set antialiasGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._antialiasGamma = val;
        } else {
            cpov.error("fatal", "antialiasGamma must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get antialiasThreshold() {
        if(typeof this._antialiasThreshold == "function")
            return this._antialiasThreshold();
        else
            return this._antialiasThreshold;
    }

    set antialiasThreshold(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._antialiasThreshold = val;
        } else {
            cpov.error("fatal", "antialiasThreshold must be a float greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get appendFile() {
        if(typeof this._appendFile == "function")
            return this._appendFile();
        else
            return this._appendFile;
    }

    set appendFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._appendFile = val;
        } else {
            cpov.error("fatal", "appendFile must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bitsPerColor() {
        if(typeof this._bitsPerColor == "function")
            return this._bitsPerColor();
        else
            return this._bitsPerColor;
    }

    set bitsPerColor(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(5, 16))) {
            this._bitsPerColor = val;
        } else {
            cpov.error("fatal", "bitsPerColor must be an integer in the range 5-16.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bounding() {
        if(typeof this._bounding == "function")
            return this._bounding();
        else
            return this._bounding;
    }

    set bounding(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._bounding = val;
        } else {
            cpov.error("fatal", "bounding must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get boundingMethod() {
        if(typeof this._boundingMethod == "function")
            return this._boundingMethod();
        else
            return this._boundingMethod;
    }

    set boundingMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(1, 2))) {
            this._boundingMethod = val;
        } else {
            cpov.error("fatal", "boundingMethod must be either 1 or 2.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get boundingThreshold() {
        if(typeof this._boundingThreshold == "function")
            return this._boundingThreshold();
        else
            return this._boundingThreshold;
    }

    set boundingThreshold(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._boundingThreshold = val;
        } else {
            cpov.error("fatal", "boundingThreshold must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspBaseAccessCost() {
        if(typeof this._bspBaseAccessCost == "function")
            return this._bspBaseAccessCost();
        else
            return this._bspBaseAccessCost;
    }

    set bspBaseAccessCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspBaseAccessCost = val;
        } else {
            cpov.error("fatal", "bspBaseAccessCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspChildAccessCost() {
        if(typeof this._bspChildAccessCost == "function")
            return this._bspChildAccessCost();
        else
            return this._bspChildAccessCost;
    }

    set bspChildAccessCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspChildAccessCost = val;
        } else {
            cpov.error("fatal", "bspChildAccessCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspIsectCost() {
        if(typeof this._bspIsectCost == "function")
            return this._bspIsectCost();
        else
            return this._bspIsectCost;
    }

    set bspIsectCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspIsectCost = val;
        } else {
            cpov.error("fatal", "bspIsectCost must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspMaxDepth() {
        if(typeof this._bspMaxDepth == "function")
            return this._bspMaxDepth();
        else
            return this._bspMaxDepth;
    }

    set bspMaxDepth(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._bspMaxDepth = val;
        } else {
            cpov.error("fatal", "bspMaxDepth must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get bspMissChance() {
        if(typeof this._bspMissChance == "function")
            return this._bspMissChance();
        else
            return this._bspMissChance;
    }

    set bspMissChance(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspMissChance = val;
        } else {
            cpov.error("fatal", "bspMissChance must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get continueTrace() {
        if(typeof this._continueTrace == "function")
            return this._continueTrace();
        else
            return this._continueTrace;
    }

    set continueTrace(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._continueTrace = val;
        } else {
            cpov.error("fatal", "continueTrace must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get createIni() {
        if(typeof this._createIni == "function")
            return this._createIni();
        else
            return this._createIni;
    }

    set createIni(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._createIni = val;
        } else {
            cpov.error("fatal", "createIni must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get debugConsole() {
        if(typeof this._debugConsole == "function")
            return this._debugConsole();
        else
            return this._debugConsole;
    }

    set debugConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._debugConsole = val;
        } else {
            cpov.error("fatal", "debugConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get debugFile() {
        if(typeof this._debugFile == "function")
            return this._debugFile();
        else
            return this._debugFile;
    }

    set debugFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._debugFile = val;
        } else {
            cpov.error("fatal", "debugFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get display() {
        if(typeof this._display == "function")
            return this._display();
        else
            return this._display;
    }

    set display(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._display = val;
        } else {
            cpov.error("fatal", "display must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get displayGamma() {
        if(typeof this._displayGamma == "function")
            return this._displayGamma();
        else
            return this._displayGamma;
    }

    set displayGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB'))) {
            this._displayGamma = val;
        } else {
            cpov.error("fatal", "displayGamma must be either a float or the string 'sRGB'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get dither() {
        if(typeof this._dither == "function")
            return this._dither();
        else
            return this._dither;
    }

    set dither(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._dither = val;
        } else {
            cpov.error("fatal", "dither must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get ditherMethod() {
        if(typeof this._ditherMethod == "function")
            return this._ditherMethod();
        else
            return this._ditherMethod;
    }

    set ditherMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.ditherTypes))) {
            this._ditherMethod = val;
        } else {
            cpov.error("fatal", "ditherMethod must be one of 'B2', 'B3', 'B4', 'D1', 'D2', or 'FS'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get endColumn() {
        if(typeof this._endColumn == "function")
            return this._endColumn();
        else
            return this._endColumn;
    }

    set endColumn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._endColumn = val;
        } else {
            cpov.error("fatal", "endColumn must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get endRow() {
        if(typeof this._endRow == "function")
            return this._endRow();
        else
            return this._endRow;
    }

    set endRow(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._endRow = val;
        } else {
            cpov.error("fatal", "endRow must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get exePath() {
        if(typeof this._exePath == "function")
            return this._exePath();
        else
            return this._exePath;
    }

    set exePath(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._exePath = val;
        } else {
            cpov.error("fatal", "exePath must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalConsole() {
        if(typeof this._fatalConsole == "function")
            return this._fatalConsole();
        else
            return this._fatalConsole;
    }

    set fatalConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._fatalConsole = val;
        } else {
            cpov.error("fatal", "fatalConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorCommand() {
        if(typeof this._fatalErrorCommand == "function")
            return this._fatalErrorCommand();
        else
            return this._fatalErrorCommand;
    }

    set fatalErrorCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._fatalErrorCommand = val;
        } else {
            cpov.error("fatal", "fatalErrorCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorReturn() {
        if(typeof this._fatalErrorReturn == "function")
            return this._fatalErrorReturn();
        else
            return this._fatalErrorReturn;
    }

    set fatalErrorReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._fatalErrorReturn = val;
        } else {
            cpov.error("fatal", "fatalErrorReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fatalFile() {
        if(typeof this._fatalFile == "function")
            return this._fatalFile();
        else
            return this._fatalFile;
    }

    set fatalFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._fatalFile = val;
        } else {
            cpov.error("fatal", "fatalFile must be either a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get fileGamma() {
        if(typeof this._fileGamma == "function")
            return this._fileGamma();
        else
            return this._fileGamma;
    }

    set fileGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) || val === 'sRGB')) {
            this._fileGamma = val;
        } else {
            cpov.error("fatal", "fileGamma", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get height() {
        if(typeof this._height == "function")
            return this._height();
        else
            return this._height;
    }

    set height(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._height = val;
        } else {
            cpov.error("fatal", "height must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get highReproducibility() {
        if(typeof this._highReproducibility == "function")
            return this._highReproducibility();
        else
            return this._highReproducibility;
    }

    set highReproducibility(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._highReproducibility = val;
        } else {
            cpov.error("fatal", "highReproducibility must be a boolean", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get includeHeader() {
        if(typeof this._includeHeader == "function")
            return this._includeHeader();
        else
            return this._includeHeader;
    }

    set includeHeader(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._includeHeader = val;
        } else {
            cpov.error("fatal", "includeHeader must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get inputFileName() {
        if(typeof this._inputFileName == "function")
            return this._inputFileName();
        else
            return this._inputFileName;
    }

    set inputFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._inputFileName = val;
        } else {
            cpov.error("fatal", "inputFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get jitter() {
        if(typeof this._jitter == "function")
            return this._jitter();
        else
            return this._jitter;
    }

    set jitter(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get jitterAmount() {
        if(typeof this._jitterAmount == "function")
            return this._jitterAmount();
        else
            return this._jitterAmount;
    }

    set jitterAmount(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._jitterAmount = val;
        } else {
            cpov.error("fatal", "jitterAmount must be a float.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get libraryPath() {
        if(typeof this._libraryPath == "function")
            return this._libraryPath();
        else
            return this._libraryPath;
    }

    set libraryPath(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._libraryPath = val;
        } else {
            cpov.error("fatal", "libraryPath must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get maxImageBufferMemory() {
        if(typeof this._maxImageBufferMemory == "function")
            return this._maxImageBufferMemory();
        else
            return this._maxImageBufferMemory;
    }

    set maxImageBufferMemory(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._maxImageBufferMemory = val;
        } else {
            cpov.error("fatal", "maxImageBufferMemory must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputAlpha() {
        if(typeof this._outputAlpha == "function")
            return this._outputAlpha();
        else
            return this._outputAlpha;
    }

    set outputAlpha(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._outputAlpha = val;
        } else {
            cpov.error("fatal", "outputAlpha must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputFileName() {
        if(typeof this._outputFileName == "function")
            return this._outputFileName();
        else
            return this._outputFileName;
    }

    set outputFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._outputFileName = val;
        } else {
            cpov.error("fatal", "outputFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputFileType() {
        if(typeof this._outputFileType == "function")
            return this._outputFileType();
        else
            return this._outputFileType;
    }

    set outputFileType(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.outputFileTypes))) {
            this._outputFileType = val;
        } else {
            cpov.error("fatal", "outputFileType must be one of 'B', 'C', 'E', 'H', 'J', 'N', 'P', 'S', or 'T'", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get outputToFile() {
        if(typeof this._outputToFile == "function")
            return this._outputToFile();
        else
            return this._outputToFile;
    }

    set outputToFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._outputToFile = val;
        } else {
            cpov.error("fatal", "outputToFile must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get palette() {
        if(typeof this._palette == "function")
            return this._palette();
        else
            return this._palette;
    }

    set palette(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._palette = val;
        } else {
            cpov.error("fatal", "palette", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get pauseWhenDone() {
        if(typeof this._pauseWhenDone == "function")
            return this._pauseWhenDone();
        else
            return this._pauseWhenDone;
    }

    set pauseWhenDone(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._pauseWhenDone = val;
        } else {
            cpov.error("fatal", "pauseWhenDone must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postFrameCommand() {
        if(typeof this._postFrameCommand == "function")
            return this._postFrameCommand();
        else
            return this._postFrameCommand;
    }

    set postFrameCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._postFrameCommand = val;
        } else {
            cpov.error("fatal", "postFrameCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postFrameReturn() {
        if(typeof this._postFrameReturn == "function")
            return this._postFrameReturn();
        else
            return this._postFrameReturn;
    }

    set postFrameReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._postFrameReturn = val;
        } else {
            cpov.error("fatal", "postFrameReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postSceneCommand() {
        if(typeof this._postSceneCommand == "function")
            return this._postSceneCommand();
        else
            return this._postSceneCommand;
    }

    set postSceneCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._postSceneCommand = val;
        } else {
            cpov.error("fatal", "postSceneCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get postSceneReturn() {
        if(typeof this._postSceneReturn == "function")
            return this._postSceneReturn();
        else
            return this._postSceneReturn;
    }

    set postSceneReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._postSceneReturn = val;
        } else {
            cpov.error("fatal", "postSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preFrameCommand() {
        if(typeof this._preFrameCommand == "function")
            return this._preFrameCommand();
        else
            return this._preFrameCommand;
    }

    set preFrameCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._preFrameCommand = val;
        } else {
            cpov.error("fatal", "preFrameCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preFrameReturn() {
        if(typeof this._preFrameReturn == "function")
            return this._preFrameReturn();
        else
            return this._preFrameReturn;
    }

    set preFrameReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._preFrameReturn = val;
        } else {
            cpov.error("fatal", "preFrameReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preSceneCommand() {
        if(typeof this._preSceneCommand == "function")
            return this._preSceneCommand();
        else
            return this._preSceneCommand;
    }

    set preSceneCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._preSceneCommand = val;
        } else {
            cpov.error("fatal", "preSceneCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get preSceneReturn() {
        if(typeof this._preSceneReturn == "function")
            return this._preSceneReturn();
        else
            return this._preSceneReturn;
    }

    set preSceneReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._preSceneReturn = val;
        } else {
            cpov.error("fatal", "preSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get previewEndSize() {
        if(typeof this._previewEndSize == "function")
            return this._previewEndSize();
        else
            return this._previewEndSize;
    }

    set previewEndSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._previewEndSize = val;
        } else {
            cpov.error("fatal", "previewEndSize must be an integer greater than zero", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get previewStartSize() {
        if(typeof this._previewStartSize == "function")
            return this._previewStartSize();
        else
            return this._previewStartSize;
    }

    set previewStartSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._previewStartSize = val;
        } else {
            cpov.error("fatal", "previewStartSize must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get quality() {
        if(typeof this._quality == "function")
            return this._quality();
        else
            return this._quality;
    }

    set quality(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 11)) {
            this._quality = val;
        } else {
            cpov.error("fatal", "quality must be an integer in the range (0 - 11)", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityFileName() {
        if(typeof this._radiosityFileName == "function")
            return this._radiosityFileName();
        else
            return this._radiosityFileName;
    }

    set radiosityFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityFileName = val;
        } else {
            cpov.error("fatal", "radiosityFileName must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityFromFile() {
        if(typeof this._radiosityFromFile == "function")
            return this._radiosityFromFile();
        else
            return this._radiosityFromFile;
    }

    set radiosityFromFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityFromFile = val;
        } else {
            cpov.error("fatal", "radiosityFromFile must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityToFile() {
        if(typeof this._radiosityToFile == "function")
            return this._radiosityToFile();
        else
            return this._radiosityToFile;
    }

    set radiosityToFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radiosityToFile = val;
        } else {
            cpov.error("fatal", "radiosityToFile must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get radiosityVainPretrace() {
        if(typeof this._radiosityVainPretrace == "function")
            return this._radiosityVainPretrace();
        else
            return this._radiosityVainPretrace;
    }

    set radiosityVainPretrace(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._radiosityVainPretrace = val;
        } else {
            cpov.error("fatal", "radiosityVainPretrace must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get removeBounds() {
        if(typeof this._removeBounds == "function")
            return this._removeBounds();
        else
            return this._removeBounds;
    }

    set removeBounds(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._removeBounds = val;
        } else {
            cpov.error("fatal", "removeBounds must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockSize() {
        if(typeof this._renderBlockSize == "function")
            return this._renderBlockSize();
        else
            return this._renderBlockSize;
    }

    set renderBlockSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 4)) {
            this._renderBlockSize = val;
        } else {
            cpov.error("fatal", "renderBlockSize must be an integer greater than or equal to 4.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockStep() {
        if(typeof this._renderBlockStep == "function")
            return this._renderBlockStep();
        else
            return this._renderBlockStep;
    }

    set renderBlockStep(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._renderBlockStep = val;
        } else {
            cpov.error("fatal", "renderBlockStep must be an integer greater than or equal to 1.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderConsole() {
        if(typeof this._renderConsole == "function")
            return this._renderConsole();
        else
            return this._renderConsole;
    }

    set renderConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._renderConsole = val;
        } else {
            cpov.error("fatal", "renderConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderFile() {
        if(typeof this._renderFile == "function")
            return this._renderFile();
        else
            return this._renderFile;
    }

    set renderFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) && cpov.isNonEmptyString(val))) {
            this._renderFile = val;
        } else {
            cpov.error("fatal", "renderFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get renderPattern() {
        if(typeof this._renderPattern == "function")
            return this._renderPattern();
        else
            return this._renderPattern;
    }

    set renderPattern(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 5)) {
            this._renderPattern = val;
        } else {
            cpov.error("fatal", "renderPattern must be an integer in the range (0 - 5).", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get samplingMethod() {
        if(typeof this._samplingMethod == "function")
            return this._samplingMethod();
        else
            return this._samplingMethod;
    }

    set samplingMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 2)) {
            this._samplingMethod = val;
        } else {
            cpov.error("fatal", "samplingMethod must be an integer in the range (1 - 2).", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get splitUnions() {
        if(typeof this._splitUnions == "function")
            return this._splitUnions();
        else
            return this._splitUnions;
    }

    set splitUnions(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnions = val;
        } else {
            cpov.error("fatal", "splitUnions must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get startColumn() {
        if(typeof this._startColumn == "function")
            return this._startColumn();
        else
            return this._startColumn;
    }

    set startColumn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._startColumn = val;
        } else {
            cpov.error("fatal", "startColumn must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get startRow() {
        if(typeof this._startRow == "function")
            return this._startRow();
        else
            return this._startRow;
    }

    set startRow(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._startRow = val;
        } else {
            cpov.error("fatal", "startRow must be an integer greater than or equal to zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get statisticConsole() {
        if(typeof this._statisticConsole == "function")
            return this._statisticConsole();
        else
            return this._statisticConsole;
    }

    set statisticConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._statisticConsole = val;
        } else {
            cpov.error("fatal", "statisticConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get statisticFile() {
        if(typeof this._statisticFile == "function")
            return this._statisticFile();
        else
            return this._statisticFile;
    }

    set statisticFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean || cpov.isNonEmptyString(val))) {
            this._statisticFile = val;
        } else {
            cpov.error("fatal", "statisticFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get testAbort() {
        if(typeof this._testAbort == "function")
            return this._testAbort();
        else
            return this._testAbort;
    }

    set testAbort(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._testAbort = val;
        } else {
            cpov.error("fatal", "testAbort must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get testAbortCount() {
        if(typeof this._testAbortCount == "function")
            return this._testAbortCount();
        else
            return this._testAbortCount;
    }

    set testAbortCount(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._testAbortCount = val;
        } else {
            cpov.error("fatal", "testAbortCount must be an integer greater than or equal to one.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get userAbortCommand() {
        if(typeof this._userAbortCommand == "function")
            return this._userAbortCommand();
        else
            return this._userAbortCommand;
    }

    set userAbortCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._userAbortCommand = val;
        } else {
            cpov.error("fatal", "userAbortCommand must be a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get userAbortReturn() {
        if(typeof this._userAbortReturn == "function")
            return this._userAbortReturn();
        else
            return this._userAbortReturn;
    }

    set userAbortReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._userAbortReturn = val;
        } else {
            cpov.error("fatal", "userAbortReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get verbose() {
        if(typeof this._verbose == "function")
            return this._verbose();
        else
            return this._verbose;
    }

    set verbose(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._verbose = val;
        } else {
            cpov.error("fatal", "verbose must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get videoMode() {
        if(typeof this._videoMode == "function")
            return this._videoMode();
        else
            return this._videoMode;
    }

    set videoMode(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._videoMode = val;
        } else {
            cpov.error("fatal", "videoMode must be a single character.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningConsole() {
        if(typeof this._warningConsole == "function")
            return this._warningConsole();
        else
            return this._warningConsole;
    }

    set warningConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._warningConsole = val;
        } else {
            cpov.error("fatal", "warningConsole must be a boolean.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningFile() {
        if(typeof this._warningFile == "function")
            return this._warningFile();
        else
            return this._warningFile;
    }

    set warningFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._warningFile = val;
        } else {
            cpov.error("fatal", "warningFile must be a boolean or a non-empty string.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get warningLevel() {
        if(typeof this._warningLevel == "function")
            return this._warningLevel();
        else
            return this._warningLevel;
    }

    set warningLevel(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && (val == 0 || val == 5 || val == 10))) {
            this._warningLevel = val;
        } else {
            cpov.error("fatal", "warningLevel must be one of 0, 5, or 10.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get width() {
        if(typeof this._width == "function")
            return this._width();
        else
            return this._width;
    }

    set width(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._width = val;
        } else {
            cpov.error("fatal", "width must be an integer greater than zero.", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------

    get workThreads() {
        if(typeof this._workThreads == "function")
            return this._workThreads();
        else
            return this._workThreads;
    }

    set workThreads(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 512)) {
            this._workThreads = val;
        } else {
            cpov.error("fatal", "workThreads must be an integer in the range (1 - 512).", "ImageOptions");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new ImageOptions();

        newObj.allConsole            = this.allConsole;           
        newObj.allFile               = this.allFile;              
        newObj.antialias             = this.antialias;            
        newObj.antialiasDepth        = this.antialiasDepth;       
        newObj.antialiasGamma        = this.antialiasGamma;       
        newObj.antialiasThreshold    = this.antialiasThreshold;   
        newObj.appendFile            = this.appendFile;           
        newObj.bitsPerColor          = this.bitsPerColor;         
        newObj.bounding              = this.bounding;             
        newObj.boundingMethod        = this.boundingMethod;       
        newObj.boundingThreshold     = this.boundingThreshold;    
        newObj.bspBaseAccessCost     = this.bspBaseAccessCost;    
        newObj.bspChildAccessCost    = this.bspChildAccessCost;   
        newObj.bspIsectCost          = this.bspIsectCost;         
        newObj.bspMaxDepth           = this.bspMaxDepth;          
        newObj.bspMissChance         = this.bspMissChance;        
        newObj.continueTrace         = this.continueTrace;        
        newObj.createIni             = this.createIni;            
        newObj.debugConsole          = this.debugConsole;         
        newObj.debugFile             = this.debugFile;            
        newObj.display               = this.display;              
        newObj.displayGamma          = this.displayGamma;         
        newObj.dither                = this.dither;               
        newObj.ditherMethod          = this.ditherMethod;         
        newObj.endColumn             = this.endColumn;            
        newObj.endRow                = this.endRow;               
        newObj.exePath               = this.exePath;              
        newObj.fatalConsole          = this.fatalConsole;         
        newObj.fatalErrorCommand     = this.fatalErrorCommand;    
        newObj.fatalErrorReturn      = this.fatalErrorReturn;     
        newObj.fatalFile             = this.fatalFile;            
        newObj.fileGamma             = this.fileGamma;            
        newObj.height                = this.height;               
        newObj.highReproducibility   = this.highReproducibility;  
        newObj.includeHeader         = this.includeHeader;        
        newObj.inputFileName         = this.inputFileName;        
        newObj.jitter                = this.jitter;               
        newObj.jitterAmount          = this.jitterAmount;         
        newObj.libraryPath           = this.libraryPath;          
        newObj.maxImageBufferMemory  = this.maxImageBufferMemory; 
        newObj.outputAlpha           = this.outputAlpha;          
        newObj.outputFileName        = this.outputFileName;       
        newObj.outputFileType        = this.outputFileType;       
        newObj.outputToFile          = this.outputToFile;         
        newObj.palette               = this.palette;              
        newObj.pauseWhenDone         = this.pauseWhenDone;        
        newObj.postFrameCommand      = this.postFrameCommand;     
        newObj.postFrameReturn       = this.postFrameReturn;      
        newObj.postSceneCommand      = this.postSceneCommand;     
        newObj.postSceneReturn       = this.postSceneReturn;      
        newObj.preFrameCommand       = this.preFrameCommand;      
        newObj.preFrameReturn        = this.preFrameReturn;       
        newObj.preSceneCommand       = this.preSceneCommand;      
        newObj.preSceneReturn        = this.preSceneReturn;       
        newObj.previewEndSize        = this.previewEndSize;       
        newObj.previewStartSize      = this.previewStartSize;     
        newObj.quality               = this.quality;              
        newObj.radiosityFileName     = this.radiosityFileName;    
        newObj.radiosityFromFile     = this.radiosityFromFile;    
        newObj.radiosityToFile       = this.radiosityToFile;      
        newObj.radiosityVainPretrace = this.radiosityVainPretrace;
        newObj.removeBounds          = this.removeBounds;         
        newObj.renderBlockSize       = this.renderBlockSize;      
        newObj.renderBlockStep       = this.renderBlockStep;      
        newObj.renderConsole         = this.renderConsole;        
        newObj.renderFile            = this.renderFile;           
        newObj.renderPattern         = this.renderPattern;        
        newObj.samplingMethod        = this.samplingMethod;       
        newObj.splitUnions           = this.splitUnions;          
        newObj.startColumn           = this.startColumn;          
        newObj.startRow              = this.startRow;             
        newObj.statisticConsole      = this.statisticConsole;     
        newObj.statisticFile         = this.statisticFile;        
        newObj.testAbort             = this.testAbort;            
        newObj.testAbortCount        = this.testAbortCount;       
        newObj.userAbortCommand      = this.userAbortCommand;     
        newObj.userAbortReturn       = this.userAbortReturn;      
        newObj.verbose               = this.verbose;              
        newObj.videoMode             = this.videoMode;            
        newObj.warningConsole        = this.warningConsole;       
        newObj.warningFile           = this.warningFile;          
        newObj.warningLevel          = this.warningLevel;         
        newObj.width                 = this.width;                
        newObj.workThreads           = this.workThreads;          

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Performs some aggregate tests on the final state of the image options,
    // and if none are found, returns an object containing two members, ini
    // and cli, corresponding to the contents of the ini file and the
    // commandline version, respectively.
    //--------------------------------------------------------------------------
    
    output() {
        var ini     = [];
        var cli     = [];
        var iniWarn = [];
        var cliWarn = [];
    
        for(var opt in cpov.ioDef) {
    
            if(opt != "Width" && opt != "Height" && this[opt] === null)
                continue;
    
            switch(opt) {
                case "allConsole":
                    if(this.allFile === null) {
                        ini.push("All_Console=" + this.allConsole);
                        cli.push((this.allConsole ? "+" : "-") + "GA");
                    }
                    break;
                case "allFile":
                    ini.push("All_File=" + this.allFile);
                    cli.push(
                        (this.allConsole === null || this.allConsole === false ? "-" : "+")
                        + "GA"
                        + (typeof this.allFile == "string" ? this.allFile : "")
                    );
                    break;
                case "antialias":
                    ini.push("Antialias=" + (this.antialias ? "true" : "false"));
                    if(this.antialiasThreshold === null) {
                        cli.push((this.antialias ? "+" : "-") + "A");
                    }
                    break;
                case "antialiasDepth":
                    ini.push("Antialias_Depth=" + this.antialiasDepth);
                    cli.push("+R" + this.antialiasDepth);
                    break;
                case "antialiasGamma":
                    ini.push("Antialias_Gamma=" + this.antialiasGamma);
                    cli.push("+AG" + this.antialiasGamma);
                    break;
                case "antialiasThreshold":
                    ini.push("Antialias_Threshold=" + this.antialiasThreshold);
                    cli.push((this.antialias ? "+" : "-") + "A" + this.antialiasThreshold);
                    break;
                case "appendFile":
                    ini.push("Append_File=" + (this.appendFile ? "true" : "false"));
                    cli.push((this.appendFile ? "+" : "-") + "GP");
                    break;
                case "bitsPerColor":
                    ini.push("Bits_Per_Color=" + this.bitsPerColor);
                    break;
                case "bounding":
                    ini.push("Bounding=" + (this.bounding ? "true" : "false"));
                    if(this.boundingThreshold === null) {
                        cli.push((this.bounding ? "+" : "-") + "MB");
                    };
                    break;
                case "boundingMethod":
                    ini.push("Bounding_Method=" + this.boundingMethod);
                    cli.push("+BM" + this.boundingMethod);
                    break;
                case "boundingThreshold":
                    ini.push("Bounding_Threshold=" + this.boundingThreshold);
                    cli.push(
                        (this.bounding !== null || this.bounding ? "+" : "-")
                        + "MB" + this.boundingThreshold
                    );
                    break;
                case "bspBaseAccessCost":
                    ini.push("BSP_BaseAccessCost=" + this.bspBaseAccessCost);
                    break;
                case "bspChildAccessCost":
                    ini.push("BSP_ChildAccessCost=" + this.bspChildAccessCost);
                    break;
                case "bspIsectCost":
                    ini.push("BSP_IsectCost=" + this.bspIsectCost);
                    break;
                case "bspMaxDepth":
                    ini.push("BSP_MaxDepth=" + this.bspMaxDepth);
                    break;
                case "bspMissChance":
                    ini.push("BSP_MissChance=" + this.bspMissChance);
                    break;
                case "constants":
                    break;
                case "continueTrace":
                    ini.push("Continue_Trace=" + this.continueTrace);
                    cli.push(this.continueTrace ? "+C" : "-C");
                    break;
                case "createIni":
                    if(typeof this.createIni == "boolean") {
                        ini.push("Create_Ini=" + (this.createIni ? "true" : "false"));
                    } else {
                        ini.push("Create_Ini=" + this.createIni);
                        cli.push("+GI" + this.createIni);
                    }
                    break;
                case "debugConsole":
                    if(this.allConsole === null)
                        ini.push("Debug_Console=" + this.debugConsole);
                    if(this.debugFile === null && this.allFile === null)
                        cli.push((this.debugConsole ? "+" : "-") + "GD");
                    break;
                case "debugFile":
                    if(this.optAllFile === null) {
                        ini.push("Debug_File=" + this.debugFile);
                        cli.push(
                            (this.debugConsole === null || this.debugConsole === false ? "-" : "+")
                            + "GD"
                            + (typeof this.debugFile == "string" ? this.debugFile : "")
                        );
                    }
                    break;
                case "display":
                    ini.push("Display=" + (this.display ? "true" : "false"));
                    if(this.videoMode === null)
                        cli.push(this.display ? "+D" : "-D");
                    break;
                case "displayGamma":
                    ini_push("Display_Gamma=" + this.displayGamma);
                    break;
                case "dither":
                    ini.push("Dither=" + (this.dither ? "true" : "false"));
                    if(this.ditherMethod === null)
                        cli.push((this.dither ? "+" : "-") + "TH");
                    break;
                case "ditherMethod":
                    ini.push("Dither_Method=" + this.ditherMethod);
                    cli.push((this.dither ? "+" : "-") + "TH" + this.ditherMethod);
                    break;
                case "endColumn":
                    ini.push("End_Column=" + this.endColumn);
                    cli.push("+EC" + this.endColumn);
                    break;
                case "endRow":
                    ini.push("End_Row=" + this.endRow);
                    cli.push("+ER" + this.endRow);
                    break;
                case "fatalConsole":
                    if(this.allConsole === null)
                            ini.push("Fatal_Console=" + this.fatalConsole);
                    if(this.fatalFile === null && this.allFile === null)
                        cli.push((this.fatalConsole ? "+" : "-") + "GF");
                    break;
                case "fatalErrorCommand":
                    ini.push("Fatal_Error_Command=" + this.fatalErrorCommand);
                    break;
                case "fatalErrorReturn":
                    ini.push("Fatal_Error_Return=" + this.fatalErrorReturn);
                    break;
                case "fatalFile":
                    if(this.optAllFile === null) {
                        ini.push("Fatal_File=" + this.fatalFile);
                        cli.push(
                            (this.fatalConsole === null || this.fatalConsole === false ? "-" : "+")
                            + "GF"
                            + (typeof this.fatalFile == "string" ? this.fatalFile : "")
                        );
                    }
                    break;
                case "fileGamma":
                    ini.push("File_Gamma=" + this.fileGamma);
                    break;
                case "height":
                    if(this.width === null || this.height === null)
                        throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                    ini.push("Height=" + this.height);
                    cli.push("+H" + this.height);
                    break;
                case "highReproducibility":
                    ini.push("High_Reproducibility=" + (this.highReproducibility ? "true" : "false"));
                    if(this.highReproducibility)
                        cli.push("+HR");
                    break;
                case "includeHeader":
                    ini.push("Include_Header=" + this.includeHeader);
                    cli.push("+HI" + this.includeHeader);
                    break;
                case "inputFileName":
                    ini.push("Input_File_Name=" + this.inputFileName);
                    cli.push("+I" + this.inputFileName);
                    break;
                case "jitter":
                    ini.push("Jitter=" + (this.jitter ? "true" : "false"));
                    if(this.jitterAmount === null) {
                        cli.push((this.jitter ? "+" : "-") + "J");
                    }
                    break;
                case "jitterAmount":
                    ini.push("Jitter_Amount=" + this.jitterAmount);
                    cli.push((this.jitterAmount > 0 ? "+" : "-" ) + "J" + this.jitterAmount);
                    break;
                case "libraryPath":
                    ini.push("Library_Path=" + this.libraryPath);
                    cli.push("+L" + this.libraryPath);
                    break;
                case "maxImageBufferMemory":
                    ini.push("Max_Image_Buffer_Memory=" + this.maxImageBufferMemory);
                    cli.push("+MI" + this.maxImageBufferMemory);
                    break;
                case "outputAlpha":
                    ini.push("Output_Alpha=" + (this.outputAlpha ? "true" : "false"));
                    cli.push((this.outputAlpha ? "+" : "-") + "UA");
                    break;
                case "outputFileName":
                    ini.push("Output_File_Name=" + this.outputFileName);
                    cli.push("+O" + this.outputFileName);
                    break;
                case "outputFileType":
                    ini.push("Output_File_Type=" + this.outputFileType);
                    cli.push(
                        ((this.outputToFile === null || this.outputToFile === false) ? "-" : "+")
                        + this.outputFileType
                        + (this.bitsPerColor === null ? "" : this.bitsPerColor)
                    );
                    break;
                case "outputToFile":
                    if(this.outputFileType === null) {
                        ini.push("Output_to_File=" + (this.outputToFile ? "true" : "false"));
                        cli.push(this.outputToFile ? "+F" : "-F");
                    }
                    break;
                case "palette":
                    ini.push("Palette=" + this.palette);
                    if(this.videoMode !== null)
                        cli.push(
                            (this.display ? "+" : "-")
                            + "D"
                            + this.videoMode + this.palette
                        );
                    break;
                case "pauseWhenDone":
                    ini.push("Pause_When_Done=" + (this.pauseWhenDone ? "true" : "false"));
                    cli.push(this.pauseWhenDone ? "+P" : "-P");
                    break;
                case "postFrameCommand":
                    ini.push("Post_Frame_Command=" + this.postFrameCommand);
                    break;
                case "postFrameReturn":
                    ini.push("Post_Frame_Return=" + this.postFrameReturn);
                    break;
                case "postSceneCommand":
                    ini.push("Post_Scene_Command=" + this.postSceneCommand);
                    break;
                case "postSceneReturn":
                    ini.push("Post_Scene_Return=" + this.postSceneReturn);
                    break;
                case "preFrameCommand":
                    ini.push("Pre_Frame_Command=" + this.preFrameCommand);
                    break;
                case "preFrameReturn":
                    ini.push("Pre_Frame_Return=" + this.preFrameReturn);
                    break;
                case "preSceneCommand":
                    ini.push("Pre_Scene_Command=" + this.postSceneCommand);
                    break;
                case "preSceneReturn":
                    ini.push("Pre_Scene_Return=" + this.preSceneReturn);
                    break;
                case "previewEndSize":
                    if(this.previewStartSize !== null) {
                        ini.push("Preview_End_Size=" + this.previewEndSize);
                        cli.push("+EP" + this.previewEndSize);
                    }
                    break;
                case "previewStartSize":
                    ini.push("Preview_Start_Size=" + this.previewStartSize);
                    cli.push("+SP" + this.previewStartSize);
                    break;
                case "quality":
                    ini.push("Quality=" + this.quality);
                    cli.push("+Q" + this.quality);
                    break;
                case "radiosityFileName":
                    ini.push("Radiosity_File_Name=" + this.radiosityFileName);
                    cli.push("+RF" + this.radiosityFileName);
                    break;
                case "radiosityFromFile":
                    ini.push("Radiosity_From_File=" + (this.radiosityFromFile ? "true" : "false"));
                    if(this.radiosityFromFile)
                        cli.push("+RFI");
                    break;
                case "radiosityToFile":
                    ini.push("Radiosity_To_File=" + (this.radiosityToFile ? "true" : "false"));
                    if(this.radiosityToFile)
                        cli.push("+RFO");
                    break;
                case "radiosityVainPretrace":
                    ini.push("Radiosity_Vain_Pretrace=" + (this.radiosityVainPretrace ? "true" : "false"));
                    cli.push(this.radiosityVainPretrace ? "+RVP" : "-RVP");
                    break;
                case "removeBounds":
                    ini.push("Remove_Bounds=" + (this.removeBounds ? "true" : "false"));
                    cli.push((this.removeBounds ? "+" : "-") + "UR");
                    break;
                case "renderBlockSize":
                    ini.push("Render_Block_Size=" + this.renderBlockSize);
                    cli.push("+BS" + this.renderBlockSize);
                    break;
                case "renderBlockStep":
                    ini.push("Render_Block_Step=" + this.renderBlockStep);
                    cli.push("+RS" + this.renderBlockStep);
                    break;
                case "renderConsole":
                    if(this.allConsole === null)
                        ini.push("Render_Console=" + this.renderConsole);
                    if(this.renderFile === null && this.allFile === null)
                        cli.push((this.renderConsole ? "+" : "-") + "GR");
                        break;
                case "renderFile":
                    if(this.optAllFile === null) {
                        ini.push("Render_File=" + this.renderFile);
                        cli.push(
                            (this.renderConsole === null || this.renderConsole === false ? "-" : "+")
                            + "GR"
                            + (typeof this.renderFile == "string" ? this.renderFile : "")
                        );
                    }
                    break;
                case "renderPattern":
                    ini.push("Render_Pattern=" + this.renderPattern);
                    cli.push("+RP" + this.renderPattern);
                    break;
                case "samplingMethod":
                    ini.push("Sampling_Method=" + this.samplingMethod);
                    cli.push("+AM" + this.samplingMethod);
                    break;
                case "splitUnions":
                    ini.push("Split_Unions=" + (this.splitUnions ? "true" : "false"));
                    cli.push((this.splitUnions ? "+" : "-") + "SU");
                    break;
                case "startColumn":
                    ini.push("Start_Column=" + this.startColumn);
                    cli.push("+SC" + this.startColumn);
                    break;
                case "startRow":
                    ini.push("Start_Row=" + this.startRow);
                    cli.push("+SR" + this.startRow);
                    break;
                case "statisticConsole":
                    if(this.allConsole === null)
                        ini.push("Statistic_Console=" + this.statisticConsole);
                    if(this.statisticFile === null && this.allFile === null)
                        cli.push((this.statisticConsole ? "+" : "-") + "GS");
                    break;
                case "statisticFile":
                    if(this.optAllFile === null) {
                        ini.push("Statistic_File=" + this.statisticFile);
                        cli.push(
                            (this.statisticConsole === null || this.statisticConsole === false ? "-" : "+")
                            + "GS"
                            + (typeof this.statisticFile == "string" ? this.statisticFile : "")
                        );
                    }
                    break;
                case "testAbort":
                    if(this.testAbortCount !== null) {
                        ini.push("Test_Abort=" + (this.testAbort ? "true" : "false"));
                        cli.push(this.testAbort ? "+X" : "-X");
                    }
                    break;
                case "testAbortCount":
                    ini.push("Test_Abort_Count=" + this.testAbortCount);
                    if(this.testAbort !== null)
                        cli.push((this.testAbort ? "+" : "-") + "X" + this.testAbortCount)
                    else
                        cli.push("+X" + this.testAbortCount);
                    break;
                case "userAbortCommand":
                    ini.push("User_Abort_Command=" + this.userAbortCommand);
                    break;
                case "userAbortReturn":
                    ini.push("User_Abort_Return=" + this.userAbortReturn);
                    break;
                case "verbose":
                    ini.push("Verbose=" + (this.verbose ? "true" : "false"));
                    cli.push(this.verbose ? "+V" : "-V");
                    break;
                case "videoMode":
                    ini.push("Video_Mode=" + this.videoMode);
                    if(this.palette === null)
                        cli.push((this.videoMode ? "+" : "-") + "D" + this.videoMode);
                    break;
                case "warningConsole":
                    if(this.allConsole === null)
                        ini.push("Warning_Console=" + this.warningConsole);
                    if(this.warningFile === null && this.allFile === null)
                        cli.push((this.warningConsole ? "+" : "-") + "GW");
                    break;
                case "warningFile":
                    if(this.optAllFile === null) {
                        ini.push("Warning_File=" + this.warningFile);
                        cli.push(
                            (this.warningConsole === null || this.warningConsole === false ? "-" : "+")
                            + "GW"
                            + (typeof this.warningFile == "string" ? this.warningFile : "")
                        );
                    }
                    break;
                case "warningLevel":
                    ini.push("Warning_Level=" + this.warningLevel);
                    cli.push("+WL" + this.warningLevel);
                    break;
                case "width":
                    if(this.width === null || this.height === null)
                        throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                    ini.push("Width=" + this.width);
                    cli.push("+W" + this.width);
                    break;
                case "workThreads":
                    ini.push("Work_Threads=" + this.workThreads);
                    cli.push("+WT" + this.workThreads);
                    break;
                default:
                    break;
            }
        }
    
        cli.unshift(this.exePath === null ? "povray" : this.exePath);
    
        return { ini: ini.join("\n"), cli: cli.join(" ") };
    
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
        this._hollow           = null;
        this._id               = null;
        this._interior         = null;
        this._inverse          = null;
        this._material         = null;
        this._noImage          = null;
        this._noRadiosity      = null;
        this._noReflection     = null;
        this._noShadow         = null;
        this._parent           = null;
        this._photons          = null;
        this._radiosity        = null;
        this._serial           = null;
        this._texture          = null;
        this._transform        = null;

        // Snippet constructor block //

        this.active = true;
        cpov.initObject(this, options);
        
        // Create serial number and register with cpov object
        
        cpov.objectSerial++;
        this.serial = cpov.objectSerial;
        cpov.serialMap[this.serial] = this;
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get active() {
        if(typeof this._active == "function")
            return this._active();
        else if(cpov.isSDLFunction(this._active))
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
        else if(cpov.isSDLFunction(this._baseTransform))
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
        else if(cpov.isSDLFunction(this._boundedBy))
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
        else if(cpov.isSDLFunction(this._children))
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
        else if(cpov.isSDLFunction(this._clippedBy))
            return this._clippedBy.substr(1);
        else
            return this._clippedBy;
    }

    set clippedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._clippedBy = val;
        } else {
            cpov.error("fatal", "clippedBy must be a Primitive.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get doubleIlluminate() {
        if(typeof this._doubleIlluminate == "function")
            return this._doubleIlluminate();
        else if(cpov.isSDLFunction(this._doubleIlluminate))
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
        else if(cpov.isSDLFunction(this._finish))
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
        else if(cpov.isSDLFunction(this._frameBegin))
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
        else if(cpov.isSDLFunction(this._frameEnd))
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

    get hollow() {
        if(typeof this._hollow == "function")
            return this._hollow();
        else if(cpov.isSDLFunction(this._hollow))
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
        else if(cpov.isSDLFunction(this._id))
            return this._id.substr(1);
        else
            return this._id;
    }

    set id(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this))) {
            this._id = val;
        } else {
            cpov.error("fatal", "id must be a non-empty string.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get interior() {
        if(typeof this._interior == "function")
            return this._interior();
        else if(cpov.isSDLFunction(this._interior))
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
        else if(cpov.isSDLFunction(this._inverse))
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
        else if(cpov.isSDLFunction(this._material))
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
        else if(cpov.isSDLFunction(this._noImage))
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
        else if(cpov.isSDLFunction(this._noRadiosity))
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
        else if(cpov.isSDLFunction(this._noReflection))
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

    get noShadow() {
        if(typeof this._noShadow == "function")
            return this._noShadow();
        else if(cpov.isSDLFunction(this._noShadow))
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
        else if(cpov.isSDLFunction(this._parent))
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
        else if(cpov.isSDLFunction(this._photons))
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
        else if(cpov.isSDLFunction(this._radiosity))
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
        else if(cpov.isSDLFunction(this._serial))
            return this._serial.substr(1);
        else
            return this._serial;
    }

    set serial(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isUnusedSerial(val, this))) {
            this._serial = val;
        } else {
            cpov.error("fatal", "serial must be an integer.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get texture() {
        if(typeof this._texture == "function")
            return this._texture();
        else if(cpov.isSDLFunction(this._texture))
            return this._texture.substr(1);
        else
            return this._texture;
    }

    set texture(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val))) {
            this._texture = val;
        } else {
            cpov.error("fatal", "texture must be a string (for now).", "Primitive");
        }
    }

    //--------------------------------------------------------------------------
    // CephaloPOV primitives differ from their SDL substrates in having an
    // immutable baseTransform which is retained even as additional transforms
    // are applied at runtime. The first time transform is read or written, we
    // copy the baseTransform to transform and then perform the requested
    // action.
    //--------------------------------------------------------------------------
    
    get transform() {
    
        if(this._transform === null) {
            if(this._baseTransform === null) {
                return null;
                // cpov.error("fatal", "transform cannot be read until baseTransform is set.", "Primitive.transform", this);
            } else {
                this.transform = this.baseTransform;
            }
        }
    
        if(typeof this._transform == "function")
            return this._transform();
        else if(typeof this._transform == "string" && this._transform.substr(0, 1) == "&")
            return this._transform.substr(1);
        else
            return this._transform;
    }
    
    set transform(val) {
    
        if(val === null) {                       // essentially the same as transformReset
            this._transform = null;
            return;
        }
    
        if(cpov.isSDLFunction(val)) {     // can't do math with SDL functions
            cpov.error("fatal", "transform cannot be an SDL function.", "Primitive.transform", this);
            return;
        }
    
        if(typeof val == "function") {
            val = val();
        }
    
        if(!cpov.isClass(val, "Matrix"))
            cpov.error("fatal", "transform value must evaluate to a Matrix.", "Primitive.transform", this);
    
        this._transform = val.xMatrix(this.transform);
    
    }


    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Primitive();

        newObj.active           = this.active;          
        newObj.baseTransform    = this.baseTransform;   
        newObj.boundedBy        = this.boundedBy;       
        newObj.children         = this.children;        
        newObj.clippedBy        = this.clippedBy;       
        newObj.doubleIlluminate = this.doubleIlluminate;
        newObj.finish           = this.finish;          
        newObj.frameBegin       = this.frameBegin;      
        newObj.frameEnd         = this.frameEnd;        
        newObj.hollow           = this.hollow;          
        newObj.id               = this.id;              
        newObj.interior         = this.interior;        
        newObj.inverse          = this.inverse;         
        newObj.material         = this.material;        
        newObj.noImage          = this.noImage;         
        newObj.noRadiosity      = this.noRadiosity;     
        newObj.noReflection     = this.noReflection;    
        newObj.noShadow         = this.noShadow;        
        newObj.parent           = this.parent;          
        newObj.photons          = this.photons;         
        newObj.radiosity        = this.radiosity;       
        newObj.serial           = this.serial;          
        newObj.texture          = this.texture;         
        newObj.transform        = this.transform;       

        return newObj;
    }

    //------------------------------------------------------------------------------
    // Called on contained objects to aim their parent attributes at the container.
    // Intelligently handles singletons, arrays, and functions.
    //------------------------------------------------------------------------------
    
    adopt(val) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                this._adopt(val[i]);
            }
        } else {
            this._adopt(val);
        }
    }
    
    _adopt(val) {
        if(cpov.isSDLFunction(val)) {
            cpov.error("warn", "Cannot mark an SDL function as a child. You're on your own here.", "Primitive.adopt", this);
        } else if(typeof val == "function") {
            cpov.error("warn", "Cannot mark a JavaScript function as a child. You're on your own here.", "Primitive.adopt", this);
        } else if(cpov.inheritsFrom(val, "Primitive")) {
            val.parent = this;
        }
    }


    copyFrom(obj) {
        this.active           = obj.active;
        this.baseTransform    = obj.baseTransform;
        this.boundedBy        = obj.boundedBy;
        this.children         = obj.children;
        this.clippedBy        = obj.clippedBy;
        this.doubleIlluminate = obj.doubleIlluminate;
        this.finish           = obj.finish;
        this.frameBegin       = obj.frameBegin;
        this.frameEnd         = obj.frameEnd;
        this.hollow           = obj.hollow;
        this.id               = obj.id;
        this.interior         = obj.interior;
        this.inverse          = obj.inverse;
        this.material         = obj.material;
        this.noImage          = obj.noImage;
        this.noRadiosity      = obj.noRadiosity;
        this.noReflection     = obj.noReflection;
        this.noShadow         = obj.noShadow;
        this.parent           = obj.parent;
        this.photons          = obj.photons;
        this.radiosity        = obj.radiosity;
        this.serial           = obj.serial;
        this.texture          = obj.texture;
        this.transform        = obj.transform;
    }


    destroy() {
        delete cpov.serialMap(this.serial);
        if(this.id)
            delete cpov.idMap(this.id);
    }


    //--------------------------------------------------------------------------
    // Tests to see whether the required parameters for the class have been
    // filled prior to output. Aborts if not. There are currently (10/15/2018)
    // no required params for the Primitive base class; this is meant to be
    // called from the subclasses.
    //--------------------------------------------------------------------------
    
    requiredParameterTest(requiredParams) {
        var missing = [ ];
    
        for(var i = 0; i < requiredParams.length; i++) {
            if(this[requiredParams[i]] === null) {
                missing.push(requiredParams[i]);
            }
        }
    
        if(missing.length > 0) {
            cpov.error("fatal", "Missing required parameters: " + missing.join(", ")
                + ".", "Primitive.requiredParameterTest", this);
        }
    }


    //--------------------------------------------------------------------------
    // Generates SDL from parameters.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
    
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
        // TODO: texture (real)
    
        if(this.texture)
            contents.push(pad + this.texture);
    
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

class Blob extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._components = null;
        this._threshold  = null;
        this._sturm      = null;
        this._hierarchy  = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "components" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Blob]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components();
        else if(cpov.isSDLFunction(this._components))
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, ['Sphere', 'Cylinder']) && components.length)) {
            this._components = val;
            this.adopt(this._components);
        } else {
            cpov.error("fatal", "components must be an array of Spheres and/or Cylinders.", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold();
        else if(cpov.isSDLFunction(this._threshold))
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
        else if(cpov.isSDLFunction(this._sturm))
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
        else if(cpov.isSDLFunction(this._hierarchy))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Blob();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.components = this.components;
        newObj.threshold  = this.threshold; 
        newObj.sturm      = this.sturm;     
        newObj.hierarchy  = this.hierarchy; 

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.components === null)
            cpov.error("fatal", "components is undefined.", "Blob.toSDL", this);
    
        content.push(pad + "blob {");
    	var components = this.components;
    	if(cpov.isSDLFunction(components)) {
    		content.push(ppad + this.components);
    	} else { // array
    		for(var i = 0; i < components.length; i++) {
    			content.push(components[i].toSDL(stops + 1));
    		}
    	}
    	if(this.hierarchy)
    		content.push(ppad + "hierarchy on");
    	if(this.sturm)
    		content.push(ppad + "sturm");
    	if(this.threshold !== null)
    		content.push(ppad + "threshold " + this.threshold);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Blob = Blob;


//==============================================================================
// Box class
//==============================================================================

class Box extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._corner1 = null;
        this._corner2 = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "corner1", "corner2" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Box]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(cpov.isSDLFunction(this._corner1))
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Box");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(cpov.isSDLFunction(this._corner2))
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2", "Box");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Box();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.corner1 = this.corner1;
        newObj.corner2 = this.corner2;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.corner1 === null)
            cpov.error("fatal", "corner1 is undefined.", "Box.toSDL", this);
        if(this.corner2 === null)
            cpov.error("fatal", "corner2 is undefined.", "Box.toSDL", this);
    
        content.push(pad + "box {");
        content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Box = Box;


//==============================================================================
// Camera class
//==============================================================================

class Camera extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = true; 

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

        // Required parameters //

        this.requiredParams = [ "type" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Camera]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
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
        else if(cpov.isSDLFunction(this._angle))
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
        else if(cpov.isSDLFunction(this._apertureSize))
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
        else if(cpov.isSDLFunction(this._blurSamples))
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
        else if(cpov.isSDLFunction(this._bokeh))
            return this._bokeh.substr(1);
        else
            return this._bokeh;
    }

    set bokeh(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Color') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0)) {
            this._bokeh = val;
        } else {
            cpov.error("fatal", "bokeh must be a Color in the range <0, 0, 0> to <1, 1, 0>.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get confidence() {
        if(typeof this._confidence == "function")
            return this._confidence();
        else if(cpov.isSDLFunction(this._confidence))
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
        else if(cpov.isSDLFunction(this._cylinderType))
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
        else if(cpov.isSDLFunction(this._direction))
            return this._direction.substr(1);
        else
            return this._direction;
    }

    set direction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._direction = val;
        } else {
            cpov.error("fatal", "direction must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get focalPoint() {
        if(typeof this._focalPoint == "function")
            return this._focalPoint();
        else if(cpov.isSDLFunction(this._focalPoint))
            return this._focalPoint.substr(1);
        else
            return this._focalPoint;
    }

    set focalPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._focalPoint = val;
        } else {
            cpov.error("fatal", "focalPoint must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(cpov.isSDLFunction(this._location))
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get lookAt() {
        if(typeof this._lookAt == "function")
            return this._lookAt();
        else if(cpov.isSDLFunction(this._lookAt))
            return this._lookAt.substr(1);
        else
            return this._lookAt;
    }

    set lookAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._lookAt = val;
        } else {
            cpov.error("fatal", "lookAt must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get right() {
        if(typeof this._right == "function")
            return this._right();
        else if(cpov.isSDLFunction(this._right))
            return this._right.substr(1);
        else
            return this._right;
    }

    set right(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._right = val;
        } else {
            cpov.error("fatal", "right must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get sky() {
        if(typeof this._sky == "function")
            return this._sky();
        else if(cpov.isSDLFunction(this._sky))
            return this._sky.substr(1);
        else
            return this._sky;
    }

    set sky(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._sky = val;
        } else {
            cpov.error("fatal", "sky must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get up() {
        if(typeof this._up == "function")
            return this._up();
        else if(cpov.isSDLFunction(this._up))
            return this._up.substr(1);
        else
            return this._up;
    }

    set up(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._up = val;
        } else {
            cpov.error("fatal", "up must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get variance() {
        if(typeof this._variance == "function")
            return this._variance();
        else if(cpov.isSDLFunction(this._variance))
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
        else if(cpov.isSDLFunction(this._vertAngle))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Camera();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type         = this.type;        
        newObj.angle        = this.angle;       
        newObj.apertureSize = this.apertureSize;
        newObj.blurSamples  = this.blurSamples; 
        newObj.bokeh        = this.bokeh;       
        newObj.confidence   = this.confidence;  
        newObj.cylinderType = this.cylinderType;
        newObj.direction    = this.direction;   
        newObj.focalPoint   = this.focalPoint;  
        newObj.location     = this.location;    
        newObj.lookAt       = this.lookAt;      
        newObj.right        = this.right;       
        newObj.sky          = this.sky;         
        newObj.up           = this.up;          
        newObj.variance     = this.variance;    
        newObj.vertAngle    = this.vertAngle;   

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //
    // Cameras are not true primitives, but CephaloPOV makes sure they act like
    // one in most instances. (TODO)
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.type === null)
            cpov.error("fatal", "type is undefined.", "Camera.toSDL", this);
        else if(this.type == "cylinder" && this.cylinderType === null)
            cpov.error("type is cylinder but cylinderType is undefined.", "Camera.toSDL", this);
        else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null)))
            cpov.error("The orthographic camera requires either angle or up and right to be defined.", "Camera.toSDL", this);
    
        content.push(pad + "camera {");
        content.push(ppad + this.type + (this.type == "cylinder" ? " " + this.cylinderType : ""));
        if(this.location !== null)
            content.push(ppad + "location " + this.location.toSDL());
        if(this.right !== null)
            content.push(ppad + "right " + this.right.toSDL());
        if(this.up !== null)
            content.push(ppad + "up " + this.up.toSDL());
        if(this.direction !== null)
            content.push(ppad + "direction " + this.direction.toSDL());
        if(this.angle !== null)
            content.push(ppad + "angle " + this.angle);
        if(this.lookAt !== null)
            content.push(ppad + "look_at " + this.lookAt.toSDL());
        if(this.blurSamples !== null)
            content.push(ppad + "blur_samples " + this.blurSamples.join(", "));
        if(this.apertureSize !== null)
            content.push(ppad + "aperture_size " + this.apertureSize);
        if(this.focalPoint !== null)
            content.push(ppad + "focal_point " + this.focalPoint.toSDL());
        if(this.confidence !== null)
            content.push(ppad + "confidence " + this.confidence);
        if(this.variance !== null)
            content.push(ppad + "variance " + this.variance);
        if(this.bokeh !== null)
            content.push(ppad + "bokeh " + this.bokeh);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Camera = Camera;


//==============================================================================
// Cone class
//==============================================================================

class Cone extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._basePoint  = null;
        this._baseRadius = null;
        this._capPoint   = null;
        this._capRadius  = null;
        this._open       = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "basePoint", "baseRadius", "capPoint", "capRadius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Cone]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(cpov.isSDLFunction(this._basePoint))
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get baseRadius() {
        if(typeof this._baseRadius == "function")
            return this._baseRadius();
        else if(cpov.isSDLFunction(this._baseRadius))
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
        else if(cpov.isSDLFunction(this._capPoint))
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get capRadius() {
        if(typeof this._capRadius == "function")
            return this._capRadius();
        else if(cpov.isSDLFunction(this._capRadius))
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
        else if(cpov.isSDLFunction(this._open))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Cone();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.basePoint  = this.basePoint; 
        newObj.baseRadius = this.baseRadius;
        newObj.capPoint   = this.capPoint;  
        newObj.capRadius  = this.capRadius; 
        newObj.open       = this.open;      

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.basePoint === null)
            cpov.error("fatal", "basePoint is undefined.", "Cone.toSDL", this);
        if(this.baseRadius === null)
            cpov.error("fatal", "baseRadius is undefined.", "Cone.toSDL", this);
        if(this.capPoint === null)
            cpov.error("fatal", "capPoint is undefined.", "Cone.toSDL", this);
        if(this.capRadius === null)
            cpov.error("fatal", "capRadius is undefined.", "Cone.toSDL", this);
    
        content.push(pad + "cone {");
        content.push(ppad + this.basePoint.toSDL() + ", " + this.baseRadius + ", " + this.capPoint.toSDL() + ", " + this.capRadius);
        if(this.open)
            content.push(pad + "    open");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Cone = Cone;


//==============================================================================
// Cylinder class
//==============================================================================

class Cylinder extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._basePoint = null;
        this._capPoint  = null;
        this._radius    = null;
        this._open      = null;
        this._strength  = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "basePoint", "capPoint", "radius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Cylinder]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(cpov.isSDLFunction(this._basePoint))
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint();
        else if(cpov.isSDLFunction(this._capPoint))
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(cpov.isSDLFunction(this._radius))
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
        else if(cpov.isSDLFunction(this._open))
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
        else if(cpov.isSDLFunction(this._strength))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Cylinder();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.basePoint = this.basePoint;
        newObj.capPoint  = this.capPoint; 
        newObj.radius    = this.radius;   
        newObj.open      = this.open;     
        newObj.strength  = this.strength; 

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.basePoint === null)
            cpov.error("fatal", "basePoint is undefined.", "Cylinder.toSDL", this);
        if(this.capPoint === null)
            cpov.error("fatal", "capPoint is undefined.", "Cylinder.toSDL", this);
        if(this.radius === null)
            cpov.error("fatal", "radius is undefined.", "Cylinder.toSDL", this);
    
        content.push(pad + "cylinder {");
        content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
        if(this.open)
            content.push(pad + "    open");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Cylinder = Cylinder;


//==============================================================================
// HeightField class
//==============================================================================

class HeightField extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

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

        // Required parameters //

        this.requiredParams = [ "source" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[HeightField]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(cpov.isSDLFunction(this._source))
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val) || cpov.isString(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get hfType() {
        if(typeof this._hfType == "function")
            return this._hfType();
        else if(cpov.isSDLFunction(this._hfType))
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
        else if(cpov.isSDLFunction(this._smooth))
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
        else if(cpov.isSDLFunction(this._waterLevel))
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
        else if(cpov.isSDLFunction(this._hierarchy))
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
        else if(cpov.isSDLFunction(this._gamma))
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
        else if(cpov.isSDLFunction(this._premult))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new HeightField();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.source     = this.source;    
        newObj.hfType     = this.hfType;    
        newObj.smooth     = this.smooth;    
        newObj.waterLevel = this.waterLevel;
        newObj.hierarchy  = this.hierarchy; 
        newObj.gamma      = this.gamma;     
        newObj.premult    = this.premult;   

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        content.push(pad + "height_field {");
        if(this.userFunc !== null) {
            content.push(pad + "    function FieldResolution_X, FieldResolution_Y { " + this.userFunc + " }");
        } else if(this.filename !== null) {
            content.push(
                ppad
                + (this.hfType === null ? "" : (this.hfType + " "))
                + '"' + this.filename + '" '
                + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
                + (this.premultiplied === null ? "" : (this.premultiplied ? "on" : "off"))
            );
        } else {
            cpov.error("fatal", "Neither filename nor userFunc is defined.", "HeightField.toSDL", this);
        }
    
        if(this.smooth === true)
            content.push(pad + "    smooth");
        if(this.waterLevel !== null)
            content.push(pad + "    water_level " + this.waterLevel);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.HeightField = HeightField;


//==============================================================================
// IsoSurface class
//==============================================================================

class IsoSurface extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

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

        // Required parameters //

        this.requiredParams = [ "source" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[IsoSurface]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(cpov.isSDLFunction(this._source))
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source must be an SDL function.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(cpov.isSDLFunction(this._containedBy))
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
        else if(cpov.isSDLFunction(this._threshold))
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
        else if(cpov.isSDLFunction(this._accuracy))
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
        else if(cpov.isSDLFunction(this._maxGradient))
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
        else if(cpov.isSDLFunction(this._evaluate))
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
        else if(cpov.isSDLFunction(this._open))
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
        else if(cpov.isSDLFunction(this._maxTrace))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new IsoSurface();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.source      = this.source;     
        newObj.containedBy = this.containedBy;
        newObj.threshold   = this.threshold;  
        newObj.accuracy    = this.accuracy;   
        newObj.maxGradient = this.maxGradient;
        newObj.evaluate    = this.evaluate;   
        newObj.open        = this.open;       
        newObj.maxTrace    = this.maxTrace;   

        return newObj;
    }


}

exports.IsoSurface = IsoSurface;


//==============================================================================
// JuliaFractal class
//==============================================================================

class JuliaFractal extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._type       = null;
        this._juliaParam = null;
        this._power      = null;
        this._maxIter    = null;
        this._precision  = null;
        this._slice      = null;
        this._distance   = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "type", "juliaParam" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[JuliaFractal]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
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

    get juliaParam() {
        if(typeof this._juliaParam == "function")
            return this._juliaParam();
        else if(cpov.isSDLFunction(this._juliaParam))
            return this._juliaParam.substr(1);
        else
            return this._juliaParam;
    }

    set juliaParam(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val)))) {
            this._juliaParam = val;
        } else {
            cpov.error("fatal", "juliaParam must be a VectorXYZW.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get power() {
        if(typeof this._power == "function")
            return this._power();
        else if(cpov.isSDLFunction(this._power))
            return this._power.substr(1);
        else
            return this._power;
    }

    set power(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXY') || (val = cpov.convertToVector('VectorXY', val)))) {
            this._power = val;
        } else {
            cpov.error("fatal", "power must be a VectorXY.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get maxIter() {
        if(typeof this._maxIter == "function")
            return this._maxIter();
        else if(cpov.isSDLFunction(this._maxIter))
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
        else if(cpov.isSDLFunction(this._precision))
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
        else if(cpov.isSDLFunction(this._slice))
            return this._slice.substr(1);
        else
            return this._slice;
    }

    set slice(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val)))) {
            this._slice = val;
        } else {
            cpov.error("fatal", "slice must be a VectorXYZW.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(cpov.isSDLFunction(this._distance))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new JuliaFractal();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type       = this.type;      
        newObj.juliaParam = this.juliaParam;
        newObj.power      = this.power;     
        newObj.maxIter    = this.maxIter;   
        newObj.precision  = this.precision; 
        newObj.slice      = this.slice;     
        newObj.distance   = this.distance;  

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.type === null)
            cpov.error("fatal", "type is undefined.", "JuliaFractal.toSDL", this);
        if(this.juliaParam === null)
            cpov.error("fatal", "juliaParam is undefined.", "JuliaFractal.toSDL", this);
    	if((this.slice !== null && this.distance === null) || (this.slice === null && this.distance !== null))
    		cpov.error("fatal", "To use either, both slice and distance must be specified together.", "JuliaFractal.toSDL", this);
    
    	var parts = this.type.split(/:/);
    
        content.push(pad + "julia_fractal {");
    	content.push(ppad + this.juliaParam.toSDL());
    	if(this.slice !== null)
    		content.push(ppad + this.type.toSDL());
    	content.push(ppad + parts[0]); // algebra type
    	content.push(ppad + parts[1]); // function type
    	if(this.maxIter !== null)
    		content.push(ppad + "max_iteration " + this.maxIter);
    	if(this.precision !== null)
    		content.push(ppad + "precision " + this.precision);
    	if(this.slice !== null)
    		content.push(ppad + this.slice.toSDL() + ", " + this.distance);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.JuliaFractal = JuliaFractal;


//==============================================================================
// Lathe class
//==============================================================================

class Lathe extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._type   = null;
        this._points = null;
        this._sturm  = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "type", "points" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Lathe]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
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
        else if(cpov.isSDLFunction(this._points))
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
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Lathe();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type   = this.type;  
        newObj.points = this.points;
        newObj.sturm  = this.sturm; 

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.type === null)
            cpov.error("fatal", "type is undefined.", "Lathe.toSDL", this);
    	if(this.points === null)
    		cpov.error("fatal", "points is undefined.", "Lathe.toSDL", this);
    	// TODO: add check for correct minimum number of points
    
        content.push(pad + "lathe {");
    	content.push(ppad + cpov.splineTypes[this.type]);
    
    	var items = [ ];
    	for(var i = 0; i < this.points.length; i++)
    		items.push(this.points[i].toSDL());
    	content.push(ppad + items.join(", "));
    
    	if(this.sturm)
    		content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Lathe = Lathe;


//==============================================================================
// LightSource class
//==============================================================================

class LightSource extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

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

        // Required parameters //

        this.requiredParams = [ "location", "color" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[LightSource]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(cpov.isSDLFunction(this._location))
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get color() {
        if(typeof this._color == "function")
            return this._color();
        else if(cpov.isSDLFunction(this._color))
            return this._color.substr(1);
        else
            return this._color;
    }

    set color(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Color') || (val = cpov.convertToVector('Color', val)))) {
            this._color = val;
        } else {
            cpov.error("fatal", "color must be a Color.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get adaptive() {
        if(typeof this._adaptive == "function")
            return this._adaptive();
        else if(cpov.isSDLFunction(this._adaptive))
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
        else if(cpov.isSDLFunction(this._areaIllumination))
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
        else if(cpov.isSDLFunction(this._areaLight))
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
        else if(cpov.isSDLFunction(this._axis1))
            return this._axis1.substr(1);
        else
            return this._axis1;
    }

    set axis1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._axis1 = val;
        } else {
            cpov.error("fatal", "axis1 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get axis2() {
        if(typeof this._axis2 == "function")
            return this._axis2();
        else if(cpov.isSDLFunction(this._axis2))
            return this._axis2.substr(1);
        else
            return this._axis2;
    }

    set axis2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._axis2 = val;
        } else {
            cpov.error("fatal", "axis2 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get circular() {
        if(typeof this._circular == "function")
            return this._circular();
        else if(cpov.isSDLFunction(this._circular))
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
        else if(cpov.isSDLFunction(this._fadeDistance))
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
        else if(cpov.isSDLFunction(this._fadePower))
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
        else if(cpov.isSDLFunction(this._falloff))
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
        else if(cpov.isSDLFunction(this._jitter))
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
        else if(cpov.isSDLFunction(this._looksLike))
            return this._looksLike.substr(1);
        else
            return this._looksLike;
    }

    set looksLike(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._looksLike = val;
            this.adopt(this._looksLike);
        } else {
            cpov.error("fatal", "looksLike must be a Primitive.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get mediaAttenuation() {
        if(typeof this._mediaAttenuation == "function")
            return this._mediaAttenuation();
        else if(cpov.isSDLFunction(this._mediaAttenuation))
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
        else if(cpov.isSDLFunction(this._mediaInteraction))
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
        else if(cpov.isSDLFunction(this._orient))
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
        else if(cpov.isSDLFunction(this._parallel))
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
        else if(cpov.isSDLFunction(this._pointAt))
            return this._pointAt.substr(1);
        else
            return this._pointAt;
    }

    set pointAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._pointAt = val;
        } else {
            cpov.error("fatal", "pointAt must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get projectedThrough() {
        if(typeof this._projectedThrough == "function")
            return this._projectedThrough();
        else if(cpov.isSDLFunction(this._projectedThrough))
            return this._projectedThrough.substr(1);
        else
            return this._projectedThrough;
    }

    set projectedThrough(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._projectedThrough = val;
            this.adopt(this._projectedThrough);
        } else {
            cpov.error("fatal", "projectedThrough", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(cpov.isSDLFunction(this._radius))
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
        else if(cpov.isSDLFunction(this._shadowless))
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
        else if(cpov.isSDLFunction(this._size1))
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
        else if(cpov.isSDLFunction(this._size2))
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
        else if(cpov.isSDLFunction(this._tightness))
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
        else if(cpov.isSDLFunction(this._type))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new LightSource();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.location         = this.location;        
        newObj.color            = this.color;           
        newObj.adaptive         = this.adaptive;        
        newObj.areaIllumination = this.areaIllumination;
        newObj.areaLight        = this.areaLight;       
        newObj.axis1            = this.axis1;           
        newObj.axis2            = this.axis2;           
        newObj.circular         = this.circular;        
        newObj.fadeDistance     = this.fadeDistance;    
        newObj.fadePower        = this.fadePower;       
        newObj.falloff          = this.falloff;         
        newObj.jitter           = this.jitter;          
        newObj.looksLike        = this.looksLike;       
        newObj.mediaAttenuation = this.mediaAttenuation;
        newObj.mediaInteraction = this.mediaInteraction;
        newObj.orient           = this.orient;          
        newObj.parallel         = this.parallel;        
        newObj.pointAt          = this.pointAt;         
        newObj.projectedThrough = this.projectedThrough;
        newObj.radius           = this.radius;          
        newObj.shadowless       = this.shadowless;      
        newObj.size1            = this.size1;           
        newObj.size2            = this.size2;           
        newObj.tightness        = this.tightness;       
        newObj.type             = this.type;            

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.location === null)
            cpov.error("fatal", "location is undefined.", "LightSource.toSDL", this);
        if(this.color === null)
            cpov.error("fatal", "color is undefined.", "LightSource.toSDL", this);
    
        content.push(pad + "light_source {");
        content.push(ppad + this.location.toSDL() + ", " + this.color.toSDL());
    
        if(this.type !== null)
            content.push(ppad + this.type);
    
        if(this.type == "spotlight" || this.type == "cylindrical") {
            if(this.pointAt === null)
                throw new Error("[Light]: pointAt must be specified.");
            if(this.radius !== null)
                content.push(ppad + "radius " + this.radius);
            if(this.falloff !== null)
                content.push(ppad + "falloff " + this.falloff);
            if(this.tightness !== null)
                content.push(ppad + "tightness " + this.tightness);
        }
    
        if(this.parallel)
            content.push(ppad + "parallel");
    
        if(this.pointAt !== null)
            content.push(ppad + "point_at " + this.pointAt);
    
        if(this.areaLight) {
            if(this.axis1 === null || this.axis2 === null || this.size1 === null || this.size2 === null)
                throw new Error("[Light]: Area lights require axis1, axis2, size1, and size2 to be defined.");
            content.push(ppad + "area_light");
            content.push(ppad + this.axis1 + ", " + this.axis2 + ", " + this.size1 + ", " + this.size2);
            if(this.adaptive !== null)
                content.push(ppad + "adaptive " + this.adaptive);
            if(this.jitter)
                content.push(ppad + "jitter");
            if(this.circular)
                content.push(ppad + "circular");
            if(this.orient)
                content.push(ppad + "orient");
        }
    
        if(this.shadowless)
            content.push(ppad + "shadowless");
    
        // TODO: looksLike
        // TODO: projectedThrough
    
        if(this.fadeDistance !== null)
            content.push(ppad + "fade_distance " + this.fadeDistance);
        if(this.fadePower !== null)
            content.push(ppad + "fade_power " + this.fadePower);
    
        if(this.mediaInteraction === false)
            content.push(ppad + "media_interaction off");
        if(this.mediaAttenuation === true)
            content.push(ppad + "media_attenuation on");
    
        content.push(pad + "}");
    
        return content.join("\n");
    }



}

exports.LightSource = LightSource;


//==============================================================================
// Ovus class
//==============================================================================

class Ovus extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._bottomRadius = null;
        this._topRadius    = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "bottomRadius", "topRadius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Ovus]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get bottomRadius() {
        if(typeof this._bottomRadius == "function")
            return this._bottomRadius();
        else if(cpov.isSDLFunction(this._bottomRadius))
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
        else if(cpov.isSDLFunction(this._topRadius))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Ovus();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.bottomRadius = this.bottomRadius;
        newObj.topRadius    = this.topRadius;   

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.topRadius === null)
            cpov.error("fatal", "topRadius is undefined.", "Ovus.toSDL", this);
        if(this.bottomRadius === null)
            cpov.error("fatal", "bottomRadius is undefined.", "Ovus.toSDL", this);
    
        content.push(pad + "ovus {");
        content.push(ppad + this.topRadius + ", " + this.bottomRadius);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Ovus = Ovus;


//==============================================================================
// Parametric class
//==============================================================================

class Parametric extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

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

        // Required parameters //

        this.requiredParams = [ "funcX", "funcY", "funcZ", "uv1", "uv2" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Parametric]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get funcX() {
        if(typeof this._funcX == "function")
            return this._funcX();
        else if(cpov.isSDLFunction(this._funcX))
            return this._funcX.substr(1);
        else
            return this._funcX;
    }

    set funcX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcX = val;
        } else {
            cpov.error("fatal", "funcX must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcY() {
        if(typeof this._funcY == "function")
            return this._funcY();
        else if(cpov.isSDLFunction(this._funcY))
            return this._funcY.substr(1);
        else
            return this._funcY;
    }

    set funcY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcY = val;
        } else {
            cpov.error("fatal", "funcY must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcZ() {
        if(typeof this._funcZ == "function")
            return this._funcZ();
        else if(cpov.isSDLFunction(this._funcZ))
            return this._funcZ.substr(1);
        else
            return this._funcZ;
    }

    set funcZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcZ = val;
        } else {
            cpov.error("fatal", "funcZ must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv1() {
        if(typeof this._uv1 == "function")
            return this._uv1();
        else if(cpov.isSDLFunction(this._uv1))
            return this._uv1.substr(1);
        else
            return this._uv1;
    }

    set uv1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val)))) {
            this._uv1 = val;
        } else {
            cpov.error("fatal", "uv1 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv2() {
        if(typeof this._uv2 == "function")
            return this._uv2();
        else if(cpov.isSDLFunction(this._uv2))
            return this._uv2.substr(1);
        else
            return this._uv2;
    }

    set uv2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val)))) {
            this._uv2 = val;
        } else {
            cpov.error("fatal", "uv2 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(cpov.isSDLFunction(this._containedBy))
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box'))) {
            this._containedBy = val;
            this.adopt(this._containedBy);
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or Box.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient();
        else if(cpov.isSDLFunction(this._maxGradient))
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
        else if(cpov.isSDLFunction(this._accuracy))
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
        else if(cpov.isSDLFunction(this._precomputeDepth))
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
        else if(cpov.isSDLFunction(this._precomputeX))
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
        else if(cpov.isSDLFunction(this._precomputeY))
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
        else if(cpov.isSDLFunction(this._precomputeZ))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Parametric();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.funcX           = this.funcX;          
        newObj.funcY           = this.funcY;          
        newObj.funcZ           = this.funcZ;          
        newObj.uv1             = this.uv1;            
        newObj.uv2             = this.uv2;            
        newObj.containedBy     = this.containedBy;    
        newObj.maxGradient     = this.maxGradient;    
        newObj.accuracy        = this.accuracy;       
        newObj.precomputeDepth = this.precomputeDepth;
        newObj.precomputeX     = this.precomputeX;    
        newObj.precomputeY     = this.precomputeY;    
        newObj.precomputeZ     = this.precomputeZ;    

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
    	if(this.funcX === null)
    		cpov.error("fatal", "funcX is undefined.", "Parametric.toSDL", this);
    	if(this.funcY === null)
    		cpov.error("fatal", "funcY is undefined.", "Parametric.toSDL", this);
    	if(this.funcZ === null)
    		cpov.error("fatal", "funcZ is undefined.", "Parametric.toSDL", this);
    	if(this.uv1 === null)
    		cpov.error("fatal", "uv1 is undefined.", "Parametric.toSDL", this);
    	if(this.uv2 === null)
    		cpov.error("fatal", "uv2 is undefined.", "Parametric.toSDL", this);
    
    	content.push(pad + "parametric {");
    	content.push(ppad + this.funcX);
        content.push(ppad + this.funcY);
        content.push(ppad + this.funcZ);
        content.push(ppad + this.uv1.toSDL() + ", " + this.uv2.toSDL());
    
        if(this.containedBy)
            content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(stops + 2) + "\n}");
        if(this.maxGradient !== null)
            content.push(ppad + "max_gradient " + this.maxGradient);
        if(this.accuracy !== null)
            content.push(ppad + "accuracy " + this.accuracy);
        if(this.precomputeDepth && (this.precomputeX || this.precomputeY || this.precomputeZ)) {
            var items = [ ];
            if(this.precomputeX)
                items.push("x");
            if(this.precomputeY)
                items.push("y");
            if(this.precomputeZ)
                items.push("z");
            content.push(ppad + "precompute " + this.precomputeDepth + " " + items.join(", "));
        }
    
    	var superSDL = super.toSDL(stops + 1);
    	if(superSDL)
    	    content.push();
    	content.push(pad + "}");
    	
    	return content.join("\n");
    
    }



}

exports.Parametric = Parametric;


//==============================================================================
// Prism class
//==============================================================================

class Prism extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._type    = null;
        this._height1 = null;
        this._height2 = null;
        this._points  = null;
        this._open    = null;
        this._sturm   = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "type", "height1", "height2", "points" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Prism]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
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
        else if(cpov.isSDLFunction(this._height1))
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
        else if(cpov.isSDLFunction(this._height2))
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
        else if(cpov.isSDLFunction(this._points))
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
        else if(cpov.isSDLFunction(this._open))
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
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Prism();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type    = this.type;   
        newObj.height1 = this.height1;
        newObj.height2 = this.height2;
        newObj.points  = this.points; 
        newObj.open    = this.open;   
        newObj.sturm   = this.sturm;  

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
    	if(this.type === null)
    		cpov.error("fatal", "type is undefined.", "Prism.toSDL", this);
        if(this.height1 === null)
            cpov.error("fatal", "height1 is undefined.", "Prism.toSDL", this);
        if(this.height2 === null)
            cpov.error("fatal", "height2 is undefined.", "Prism.toSDL", this);
    	if(this.points === null)
    		cpov.error("fatal", "points is undefined.", "Prism.toSDL", this);
      	if(this.points.length < 3)
    		cpov.error("fatal", "points must contain at least three VectorXY.", "Prism.toSDL", this);
    
    	content.push(pad + "prism {");
        content.push(ppad + cpov.prismTypes(this.type));
        content.push(ppad + this.height1 + ", " + this.height2 + ", " + this.points.length + ",");
        var items = [ ];
        for(var i = 0; i < this.points.length; i++) {
            items.push(points[i].toSDL());
        }
        content.push(ppad + items.join(", "));
        if(this.open)
            content.push(ppad + "open");
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    
    }



}

exports.Prism = Prism;


//==============================================================================
// Sphere class
//==============================================================================

class Sphere extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._center   = null;
        this._radius   = null;
        this._strength = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "center", "radius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Sphere]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(cpov.isSDLFunction(this._center))
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Sphere");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(cpov.isSDLFunction(this._radius))
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
        else if(cpov.isSDLFunction(this._strength))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Sphere();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.center   = this.center;  
        newObj.radius   = this.radius;  
        newObj.strength = this.strength;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.center === null)
            cpov.error("fatal", "center is undefined.", "Sphere.toSDL", this);
        if(this.radius === null)
            cpov.error("fatal", "radius is undefined.", "Sphere.toSDL", this);
    
        content.push(pad + "sphere {");
        content.push(ppad + this.center.toSDL() + ", " + this.radius);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Sphere = Sphere;


//==============================================================================
// SphereSweep class
//==============================================================================

class SphereSweep extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._type      = null;
        this._spheres   = null;
        this._tolerance = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "type", "spheres" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[SphereSweep]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.internalSplineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'linearSpline', 'bezierSpline', or 'cubicSpline'.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get spheres() {
        if(typeof this._spheres == "function")
            return this._spheres();
        else if(cpov.isSDLFunction(this._spheres))
            return this._spheres.substr(1);
        else
            return this._spheres;
    }

    set spheres(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Sphere', 2, infinity))) {
            this._spheres = val;
            this.adopt(this._spheres);
        } else {
            cpov.error("fatal", "spheres must be an an array of two or more Sphere.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get tolerance() {
        if(typeof this._tolerance == "function")
            return this._tolerance();
        else if(cpov.isSDLFunction(this._tolerance))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new SphereSweep();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type      = this.type;     
        newObj.spheres   = this.spheres;  
        newObj.tolerance = this.tolerance;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.type === null)
            cpov.error("fatal", "type is undefined.", "SphereSweep.toSDL", this);
        if(this.spheres === null)
            cpov.error("fatal", "spheres is undefined.", "SphereSweep.toSDL", this);
        if(this.type == "linearSpline" && this.spheres.length < 2)
            cpov.error("fatal", "A linear spline requires at least two spheres.", "SphereSweep.toSDL", this);
        else if((this.type == "bezierSpline" || this.type == "cubicSpline") && this.spheres.length < 4)
            cpov.error("fatal", "Bezier and cubic splines require at least four spheres.", "SphereSweep.toSDL", this);
    
        content.push(pad + "sphere_sweep {");
        content.push(ppad + this.type);
        content.push(ppad + this.spheres.length + ",");
        var items = [ ];
        for(var i = 0; i < this.spheres.length; i++) {
            items.push(ppad + this.spheres[i].center.toSDL() + ", " + this.spheres[i].radius);
        }
        content.push(items.join(",\n"));
        if(this.tolerance !== null)
            content.push(ppad + "tolerance " + this.tolerance);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.SphereSweep = SphereSweep;


//==============================================================================
// Superellipsoid class
//==============================================================================

class Superellipsoid extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._e = null;
        this._n = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "e", "n" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Superellipsoid]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get e() {
        if(typeof this._e == "function")
            return this._e();
        else if(cpov.isSDLFunction(this._e))
            return this._e.substr(1);
        else
            return this._e;
    }

    set e(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._e = val;
        } else {
            cpov.error("fatal", "e must be a float.", "Superellipsoid");
        }
    }

    //--------------------------------------------------------------------------

    get n() {
        if(typeof this._n == "function")
            return this._n();
        else if(cpov.isSDLFunction(this._n))
            return this._n.substr(1);
        else
            return this._n;
    }

    set n(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._n = val;
        } else {
            cpov.error("fatal", "n must be a float.", "Superellipsoid");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Superellipsoid();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.e = this.e;
        newObj.n = this.n;

        return newObj;
    }


}

exports.Superellipsoid = Superellipsoid;


//==============================================================================
// Sor class
//==============================================================================

class Sor extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._points = null;
        this._open   = null;
        this._sturm  = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "points" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Sor]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(cpov.isSDLFunction(this._points))
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
        else if(cpov.isSDLFunction(this._open))
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
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Sor();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.points = this.points;
        newObj.open   = this.open;  
        newObj.sturm  = this.sturm; 

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.points === null)
            cpov.error("fatal", "points is undefined.", "Sor.toSDL", this);
        if(this.points.length < 2)
            cpov.error("fatal", "points must contain at least two VectorXY.", "Sor.toSDL", this);
    
        content.push(pad + "sor {");
        var items = [ this.points.length ];
        for(var i = 0; i < this.points.length; i++)
            items.push(this.points[i].toSDL());
        content.push(ppad + items.join(", "));
        if(this.open)
            content.push(ppad + "open");
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Sor = Sor;


//==============================================================================
// Text class
//==============================================================================

class Text extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._fontType    = null;
        this._font        = null;
        this._displayText = null;
        this._thickness   = null;
        this._offset      = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "fontType", "font", "displayText", "thickness", "offset" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Text]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get fontType() {
        if(typeof this._fontType == "function")
            return this._fontType();
        else if(cpov.isSDLFunction(this._fontType))
            return this._fontType.substr(1);
        else
            return this._fontType;
    }

    set fontType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.fontTypes))) {
            this._fontType = val;
        } else {
            cpov.error("fatal", "fontType must be one of 'ttf', or 'ttc'.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get font() {
        if(typeof this._font == "function")
            return this._font();
        else if(cpov.isSDLFunction(this._font))
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
        else if(cpov.isSDLFunction(this._displayText))
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
        else if(cpov.isSDLFunction(this._thickness))
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
        else if(cpov.isSDLFunction(this._offset))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Text();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.fontType    = this.fontType;   
        newObj.font        = this.font;       
        newObj.displayText = this.displayText;
        newObj.thickness   = this.thickness;  
        newObj.offset      = this.offset;     

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.fontType === null)
            cpov.error("fatal", "fontType is undefined.", "Text.toSDL", this);
        if(this.font === null)
            cpov.error("fatal", "font is undefined.", "Text.toSDL", this);
        if(this.displayText === null)
            cpov.error("fatal", "displayText is undefined.", "Text.toSDL", this);
        if(this.thickness === null)
            cpov.error("fatal", "thickness is undefined.", "Text.toSDL", this);
        if(this.offset === null)
            cpov.error("fatal", "offset is undefined.", "Text.toSDL", this);
    
        // TODO: Handle escaping of double quotes in this.displayText
    
        content.push(pad + "text {");
        content.push(ppad + this.fontType + " " + "\"" + this.font + "\"");
        content.push(ppad + this.thickness + ", " + this.offset);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Text = Text;


//==============================================================================
// Torus class
//==============================================================================

class Torus extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._majorRadius = null;
        this._minorRadius = null;
        this._sturm       = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "majorRadius", "minorRadius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Torus]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get majorRadius() {
        if(typeof this._majorRadius == "function")
            return this._majorRadius();
        else if(cpov.isSDLFunction(this._majorRadius))
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
        else if(cpov.isSDLFunction(this._minorRadius))
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
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Torus();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.majorRadius = this.majorRadius;
        newObj.minorRadius = this.minorRadius;
        newObj.sturm       = this.sturm;      

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.majorRadius === null)
            cpov.error("fatal", "majorRadius is undefined.", "Torus.toSDL", this);
        if(this.minorRadius === null)
            cpov.error("fatal", "minorRadius is undefined.", "Torus.toSDL", this);
    
        content.push(pad + "torus {");
        content.push(ppad + this.majorRadius + ", " + this.minorRadius);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    
    }



}

exports.Torus = Torus;


//==============================================================================
// BicubicPatch class
//==============================================================================

class BicubicPatch extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._type     = null;
        this._points   = null;
        this._uSteps   = null;
        this._vSteps   = null;
        this._flatness = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "type", "points" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[BicubicPatch]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(cpov.isSDLFunction(this._type))
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
        else if(cpov.isSDLFunction(this._points))
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
        else if(cpov.isSDLFunction(this._uSteps))
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
        else if(cpov.isSDLFunction(this._vSteps))
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
        else if(cpov.isSDLFunction(this._flatness))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new BicubicPatch();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.type     = this.type;    
        newObj.points   = this.points;  
        newObj.uSteps   = this.uSteps;  
        newObj.vSteps   = this.vSteps;  
        newObj.flatness = this.flatness;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.type === null)
            cpov.error("fatal", "type is undefined.", "BicubicPatch.toSDL", this);
    	if(this.patch === null)
            cpov.error("fatal", "patch is undefined.", "BicubicPatch.toSDL", this);
    
        content.push(pad + "bicubic_patch {");
    	content.push(ppad + "type " + this.type);
    	if(this.uSteps !== null)
    		content.push(ppad + "u_steps " + this.uSteps);
    	if(this.vSteps !== null)
    		content.push(ppad + "v_steps " + this.vSteps);
    	if(this.flatness !== null)
    		content.push(ppad + "flatness " + this.flatness);
    
    	for(var row = 0; row < 4; row++) {
    		var items = [ ];
    		for(var col = 0; col < 4; col++) {
    			items.push(this.points[row * 4 + col].toSDL());
    		}
    		content.push(ppad + items.join(", ") + (row == 3 ? "," : ""));
    	}
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.BicubicPatch = BicubicPatch;


//==============================================================================
// Disc class
//==============================================================================

class Disc extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._center     = null;
        this._normal     = null;
        this._radius     = null;
        this._holeRadius = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "center", "normal", "radius" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Disc]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(cpov.isSDLFunction(this._center))
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(cpov.isSDLFunction(this._normal))
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(cpov.isSDLFunction(this._radius))
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
        else if(cpov.isSDLFunction(this._holeRadius))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Disc();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.center     = this.center;    
        newObj.normal     = this.normal;    
        newObj.radius     = this.radius;    
        newObj.holeRadius = this.holeRadius;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.center === null)
            cpov.error("fatal", "center is undefined.", "Disc.toSDL", this);
        if(this.radius === null)
            cpov.error("fatal", "radius is undefined.", "Disc.toSDL", this);
    
        content.push(pad + "disc {");
        content.push(ppad + this.center.toSDL() + ", " + this.normal.toSDL() + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Disc = Disc;


//==============================================================================
// Mesh class
//==============================================================================

class Mesh extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._triangles    = null;
        this._insideVector = null;
        this._hierarchy    = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "triangles" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Mesh]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get triangles() {
        if(typeof this._triangles == "function")
            return this._triangles();
        else if(cpov.isSDLFunction(this._triangles))
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
        else if(cpov.isSDLFunction(this._insideVector))
            return this._insideVector.substr(1);
        else
            return this._insideVector;
    }

    set insideVector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._insideVector = val;
        } else {
            cpov.error("fatal", "insideVector must be a VectorXYZ.", "Mesh");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(cpov.isSDLFunction(this._hierarchy))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Mesh();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.triangles    = this.triangles;   
        newObj.insideVector = this.insideVector;
        newObj.hierarchy    = this.hierarchy;   

        return newObj;
    }


}

exports.Mesh = Mesh;


//==============================================================================
// Polygon class
//==============================================================================

class Polygon extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._points = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "points" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Polygon]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(cpov.isSDLFunction(this._points))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Polygon();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.points = this.points;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
    	if(this.points === null)
    		cpov.error("fatal", "points is undefined.", "Polygon.toSDL", this);
      	if(this.points.length < 3)
    		cpov.error("fatal", "points must contain at least three VectorXY.", "Polygon.toSDL", this);
    
    	content.push(pad + "polygon {");
    	content.push(ppad + this.points.length + ",");
        var items = [ ];
        for(var i = 0; i < this.points.length; i++) {
            items.push(points[i].toSDL());
        }
        content.push(ppad + items.join(", "));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    
    }



}

exports.Polygon = Polygon;


//==============================================================================
// The Triangle class combines POV-Ray's triangle and smooth_triangle based on 
// the supplied parameters and the smooth flag.
//==============================================================================

class Triangle extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = true; 
        this._solid  = false;
        this._csg    = false;
        this._pseudo = false;

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

        // Required parameters //

        this.requiredParams = [ "corner1", "corner2", "corner3" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Triangle]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(cpov.isSDLFunction(this._corner1))
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(cpov.isSDLFunction(this._corner2))
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner3() {
        if(typeof this._corner3 == "function")
            return this._corner3();
        else if(cpov.isSDLFunction(this._corner3))
            return this._corner3.substr(1);
        else
            return this._corner3;
    }

    set corner3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner3 = val;
        } else {
            cpov.error("fatal", "corner3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth();
        else if(cpov.isSDLFunction(this._smooth))
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
        else if(cpov.isSDLFunction(this._normal1))
            return this._normal1.substr(1);
        else
            return this._normal1;
    }

    set normal1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal1 = val;
        } else {
            cpov.error("fatal", "normal1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal2() {
        if(typeof this._normal2 == "function")
            return this._normal2();
        else if(cpov.isSDLFunction(this._normal2))
            return this._normal2.substr(1);
        else
            return this._normal2;
    }

    set normal2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal2 = val;
        } else {
            cpov.error("fatal", "normal2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal3() {
        if(typeof this._normal3 == "function")
            return this._normal3();
        else if(cpov.isSDLFunction(this._normal3))
            return this._normal3.substr(1);
        else
            return this._normal3;
    }

    set normal3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal3 = val;
        } else {
            cpov.error("fatal", "normal3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get textures() {
        if(typeof this._textures == "function")
            return this._textures();
        else if(cpov.isSDLFunction(this._textures))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Triangle();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.corner1  = this.corner1; 
        newObj.corner2  = this.corner2; 
        newObj.corner3  = this.corner3; 
        newObj.smooth   = this.smooth;  
        newObj.normal1  = this.normal1; 
        newObj.normal2  = this.normal2; 
        newObj.normal3  = this.normal3; 
        newObj.textures = this.textures;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //
    // The CephaloPOV Triangle object incorporates both the triangle and
    // smooth_triangle types. If smooth is true and normal1-3 are defined, it
    // will output a smooth_triangle. Otherwise a triangle is output.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.corner1 === null)
            cpov.error("fatal", "corner1 is undefined.", "Triangle.toSDL", this);
        if(this.corner2 === null)
            cpov.error("fatal", "corner2 is undefined.", "Triangle.toSDL", this);
        if(this.corner3 === null)
            cpov.error("fatal", "corner3 is undefined.", "Triangle.toSDL", this);
    
        if(this.smooth) {
    
            content.push(pad + "triangle {");
            content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL() + ", " + this.corner3.toSDL());
    
        } else {
    
            if(this.normal1 === null)
                cpov.error("fatal", "normal1 is undefined.", "Triangle.toSDL", this);
            if(this.normal2 === null)
                cpov.error("fatal", "normal2 is undefined.", "Triangle.toSDL", this);
            if(this.normal3 === null)
                cpov.error("fatal", "normal3 is undefined.", "Triangle.toSDL", this);
    
            content.push(pad + "smooth_triangle {");
            content.push(ppad
                + this.corner1.toSDL() + ", " + this.normal1.toSDL() + ", "
                + this.corner2.toSDL() + ", " + this.normal2.toSDL() + ", "
                + this.corner3.toSDL() + ", " + this.normal3.toSDL());
    
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Triangle = Triangle;


//==============================================================================
// Plane class
//==============================================================================

class Plane extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._normal   = null;
        this._distance = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "normal", "distance" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Plane]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(cpov.isSDLFunction(this._normal))
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Plane");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(cpov.isSDLFunction(this._distance))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Plane();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.normal   = this.normal;  
        newObj.distance = this.distance;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
    	if(this.normal === null)
    		cpov.error("fatal", "normal is undefined.", "Sphere.toSDL", this);
    	if(this.distance === null)
    		cpov.error("fatal", "distance is undefined.", "Sphere.toSDL", this);
    
    	content.push(pad + "plane {");
    	content.push(ppad + this.normal.toSDL() + ", " + this.distance);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    
    }



}

exports.Plane = Plane;


//==============================================================================
// Poly class
//==============================================================================

class Poly extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._order        = null;
        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "order", "coefficients" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Poly]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get order() {
        if(typeof this._order == "function")
            return this._order();
        else if(cpov.isSDLFunction(this._order))
            return this._order.substr(1);
        else
            return this._order;
    }

    set order(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 2 && val <= 35)) {
            this._order = val;
        } else {
            cpov.error("fatal", "order must be an integer in the range (.", "Poly");
        }
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 1, Infinity))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of floats.", "Poly");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Poly();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.order        = this.order;       
        newObj.coefficients = this.coefficients;
        newObj.sturm        = this.sturm;       

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
    	if(this.order === null)
    		cpov.error("fatal", "order is undefined.", "Poly.toSDL", this);
        if(this.coefficients === null)
            cpov.error("fatal", "coefficients is undefined.", "Poly.toSDL", this);
    
        var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;
    
        if(this.coefficients.length != ccnt)
            cpov.error("fatal", "A Poly of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Poly.toSDL", this);
    
    	content.push(pad + "poly {");
        var items = this.coefficents.slice(0);
        items.unshift(this.order);
    	content.push(ppad + this.items.join(", "));
        if(this.sturm)
            content.push(ppad + "sturm")
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    
    }



}

exports.Poly = Poly;


//==============================================================================
// Cubic class
//==============================================================================

class Cubic extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Cubic]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(cpov.isSDLFunction(this._coefficients))
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
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Cubic();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.coefficients = this.coefficients;
        newObj.sturm        = this.sturm;       

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.coefficients === null)
            cpov.error("fatal", "coefficients is undefined.", "Cubic.toSDL", this);
    
        content.push(pad + "cubic {");
        content.push(ppad + this.coefficients.join(", "));
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Cubic = Cubic;


//==============================================================================
// Quartic class
//==============================================================================

class Quartic extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Quartic]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 35, 35))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 35 floats.", "Quartic");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Quartic();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.coefficients = this.coefficients;
        newObj.sturm        = this.sturm;       

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.coefficients === null)
            cpov.error("fatal", "coefficients is undefined.", "Quartic.toSDL", this);
    
        content.push(pad + "quartic {");
        content.push(ppad + this.coefficients.join(", "));
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Quartic = Quartic;


//==============================================================================
// Polynomial class
//==============================================================================

class Polynomial extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._order        = null;
        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "order", "coefficients" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Polynomial]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get order() {
        if(typeof this._order == "function")
            return this._order();
        else if(cpov.isSDLFunction(this._order))
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
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val)))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be a VectorXYZW.", "Polynomial");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(cpov.isSDLFunction(this._sturm))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Polynomial();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.order        = this.order;       
        newObj.coefficients = this.coefficients;
        newObj.sturm        = this.sturm;       

        return newObj;
    }


}

exports.Polynomial = Polynomial;


//==============================================================================
// Quadric class
//==============================================================================

class Quadric extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = false;
        this._solid  = true; 
        this._csg    = false;
        this._pseudo = false;

        // Mutable properties //

        this._coefficients = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

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

    get pseudo() {
        return this._pseudo;
    }

    set pseudo(val) {
        throw new TypeError("[Quadric]: pseudo is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 10, 10))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 10 floats.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Quadric();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.coefficients = this.coefficients;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.coefficients === null)
            cpov.error("fatal", "coefficients is undefined.", "Quadric.toSDL", this);
    
        content.push(pad + "quartic {");
        content.push(
            ppad
            + "<" + this.coefficients[0] + ", " + this.coefficients[1] + ", " + this.coefficients[2] + ">, " +
            + "<" + this.coefficients[3] + ", " + this.coefficients[4] + ", " + this.coefficients[5] + ">, " +
            + "<" + this.coefficients[6] + ", " + this.coefficients[7] + ", " + this.coefficients[8] + ">, " +
            + this.coefficients[9]
        );
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Quadric = Quadric;


//==============================================================================
// Union class
//==============================================================================

class Union extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects    = null;
        this._splitUnion = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "objects" ];

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
        else if(cpov.isSDLFunction(this._objects))
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
            this.adopt(this._objects);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Union");
        }
    }

    //--------------------------------------------------------------------------

    get splitUnion() {
        if(typeof this._splitUnion == "function")
            return this._splitUnion();
        else if(cpov.isSDLFunction(this._splitUnion))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Union();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.objects    = this.objects;   
        newObj.splitUnion = this.splitUnion;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.objects === null)
            cpov.error("fatal", "objects is undefined.", "Union.toSDL", this);
    
        content.push(pad + "merge {");
        for(var i = 0; i < this.objects.length; i++) {
            content.push(ppad + this.objects[i].toSDL(stops + 1));
        }
        content.push(pad + "    split_union " + (this._splitUnion ? "on" : "off"));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Union = Union;


//==============================================================================
// Intersection class
//==============================================================================

class Intersection extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "objects" ];

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
        else if(cpov.isSDLFunction(this._objects))
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
            this.adopt(this._objects);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Intersection");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Intersection();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.objects = this.objects;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.objects === null)
            cpov.error("fatal", "objects is undefined.", "Intersection.toSDL", this);
    
        content.push(pad + "intersection {");
        for(var i = 0; i < this.objects.length; i++) {
            content.push(ppad + this.objects[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Intersection = Intersection;


//==============================================================================
// Difference class
//==============================================================================

class Difference extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._positiveObject  = null;
        this._negativeObjects = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "positiveObject", "negativeObjects" ];

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
        else if(cpov.isSDLFunction(this._positiveObject))
            return this._positiveObject.substr(1);
        else
            return this._positiveObject;
    }

    set positiveObject(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._positiveObject = val;
            this.adopt(this._positiveObject);
        } else {
            cpov.error("fatal", "positiveObject must be a Primitive.", "Difference");
        }
    }

    //--------------------------------------------------------------------------

    get negativeObjects() {
        if(typeof this._negativeObjects == "function")
            return this._negativeObjects();
        else if(cpov.isSDLFunction(this._negativeObjects))
            return this._negativeObjects.substr(1);
        else
            return this._negativeObjects;
    }

    set negativeObjects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._negativeObjects = val;
            this.adopt(this._negativeObjects);
        } else {
            cpov.error("fatal", "negativeObjects must be an array of Primitives.", "Difference");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Difference();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.positiveObject  = this.positiveObject; 
        newObj.negativeObjects = this.negativeObjects;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.positiveObject === null)
            cpov.error("fatal", "positiveObject is undefined.", "Difference.toSDL", this);
        if(this.negativeObjects === null)
            cpov.error("fatal", "negativeObjects is undefined.", "Difference.toSDL", this);
    
        content.push(pad + "difference {");
        content.push(ppad + this.positiveObject.toSDL(stops + 1));
        for(var i = 0; i < this.negativeObjects.length; i++) {
            content.push(ppad + this.negativeObjects[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
    }



}

exports.Difference = Difference;


//==============================================================================
// Merge class
//==============================================================================

class Merge extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite = null;
        this._solid  = true;
        this._csg    = true;

        // Mutable properties //

        this._objects = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "objects" ];

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
        else if(cpov.isSDLFunction(this._objects))
            return this._objects.substr(1);
        else
            return this._objects;
    }

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
            this.adopt(this._objects);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Merge");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Merge();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.objects = this.objects;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces SDL representation of the object. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
    
        if(this.objects === null)
            cpov.error("fatal", "objects is undefined.", "Merge.toSDL", this);
    
        content.push(pad + "merge {");
        for(var i = 0; i < this.objects.length; i++) {
            content.push(ppad + this.objects[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push();
        content.push(pad + "}");
        
        return content.join("\n");
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

        // Snippet constructor block //

        if(cpov.isClass(options, "VectorXY")) { // copy
            options = { x: options.x, y: options.y };
        }
        
        if(Array.isArray(options)) {
            if(options.length != 2) {
                cpov.error("fatal", "When initializing a VectorXY with an array, it must have exactly two values.", "VectorXY.constructor", this);
            } else {
                this.x = options[0];
                this.y = options[1];
            }
        } else if(typeof options == "object") {
            if(options.x === undefined || options.y === undefined)
                cpov.error("fatal", "When initializing a VectorXY with an object, x and y must be defined.", "VectorXY.constructor", this);
            cpov.initObject(this, options);
        } else {
            cpov.error("fatal", "Invalid initializer.", "VectorXY.constructor", this);
        }
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(cpov.isSDLFunction(this._x))
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
        else if(cpov.isSDLFunction(this._y))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new VectorXY();

        newObj.x = this.x;
        newObj.y = this.y;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces a copy of the vector. Does so quickly by directly copying
    // "private" members instead of going through get/set methods.
    //--------------------------------------------------------------------------
    
    copy() {
    
        var that = new VectorXY();
        that._x = this._x;
        that._y = this._y;
    
        return that;
    }


    //--------------------------------------------------------------------------
    // Produces SDL representation of the vector. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(this.x === null)
            cpov.error("fatal", "x is undefined.", "VectorXY.toSDL", this);
        if(this.y === null)
            cpov.error("fatal", "y is undefined.", "VectorXY.toSDL", this);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ">";
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

        // Snippet constructor block //

        if(cpov.isClass(options, "VectorUV")) { // copy
            options = { u: options.u, v: options.v };
        }
        
        if(Array.isArray(options)) {
            if(options.length != 2) {
                cpov.error("fatal", "When initializing a VectorUV with an array, it must have exactly two values.", "VectorUV.constructor", this);
            } else {
                this.u = options[0];
                this.v = options[1];
            }
        } else if(typeof options == "object") {
            if(options.u === undefined || options.v === undefined)
                cpov.error("fatal", "When initializing a VectorUV with an object, u and v must be defined.", "VectorUV.constructor", this);
            cpov.initObject(this, options);
        } else {
            cpov.error("fatal", "Invalid initializer.", "VectorUV.constructor", this);
        }
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get u() {
        if(typeof this._u == "function")
            return this._u();
        else if(cpov.isSDLFunction(this._u))
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
        else if(cpov.isSDLFunction(this._v))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new VectorUV();

        newObj.u = this.u;
        newObj.v = this.v;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces a copy of the vector. Does so quickly by directly copying
    // "private" members instead of going through get/set methods.
    //--------------------------------------------------------------------------
    
    copy() {
    
        var that = new VectorUV();
        that._u = this._u;
        that._v = this._v;
    
        return that;
    }


    //--------------------------------------------------------------------------
    // Produces SDL representation of the vector. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(this.u === null)
            cpov.error("fatal", "u is undefined.", "VectorUV.toSDL", this);
        if(this.v === null)
            cpov.error("fatal", "v is undefined.", "VectorUV.toSDL", this);
    
        return cpov.tab(stops) + "<" + this.u + ", " + this.v + ">";
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

        // Snippet constructor block //

        if(cpov.isClass(options, "VectorXYZ")) { // copy
            options = { x: options.x, y: options.y, z: options.z };
        }
        
        if(Array.isArray(options)) {
            if(options.length != 3) {
                cpov.error("fatal", "When initializing a VectorXYZ with an array, it must have exactly three values.", "VectorXYZ.constructor", this);
            } else {
                this.x = options[0];
                this.y = options[1];
                this.z = options[2];
            }
        } else if(typeof options == "object") {
            if(options.x === undefined || options.y === undefined || options.z === undefined)
                cpov.error("fatal", "When initializing a VectorXYZ with an object, x, y and z must be defined.", "VectorXYZ.constructor", this);
            cpov.initObject(this, options);
        } else {
            cpov.error("fatal", "Invalid initializer.", "VectorXYZ.constructor", this);
        }
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(cpov.isSDLFunction(this._x))
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
        else if(cpov.isSDLFunction(this._y))
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
        else if(cpov.isSDLFunction(this._z))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new VectorXYZ();

        newObj.x = this.x;
        newObj.y = this.y;
        newObj.z = this.z;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces a copy of the vector. Does so quickly by directly copying
    // "private" members instead of going through get/set methods.
    //--------------------------------------------------------------------------
    
    copy() {
    
        var that = new VectorXYZ();
        that._x = this._x;
        that._y = this._y;
        that._z = this._z;
    
        return that;
    }


    //--------------------------------------------------------------------------
    // Produces SDL representation of the vector. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(this.x === null)
            cpov.error("fatal", "x is undefined.", "VectorXYZ.toSDL", this);
        if(this.y === null)
            cpov.error("fatal", "y is undefined.", "VectorXYZ.toSDL", this);
        if(this.z === null)
            cpov.error("fatal", "z is undefined.", "VectorXYZ.toSDL", this);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ">";
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

        // Snippet constructor block //

        if(cpov.isClass(options, "VectorXYZW")) { // copy
            options = { x: options.x, y: options.y, z: options.z, w: options.w };
        }
        
        if(Array.isArray(options)) {
            if(options.length != 4) {
                cpov.error("fatal", "When initializing a VectorXYZW with an array, it must have exactly four values.", "VectorXYZW.constructor", this);
            } else {
                this.x = options[0];
                this.y = options[1];
                this.z = options[2];
                this.w = options[3];
            }
        } else if(typeof options == "object") {
            if(options.x === undefined || options.y === undefined || options.z === undefined || options.w === undefined)
                cpov.error("fatal", "When initializing a VectorXYZW with an object, x, y, z, and w must be defined.", "VectorXYZW.constructor", this);
            cpov.initObject(this, options);
        } else {
            cpov.error("fatal", "Invalid initializer.", "VectorXYZW.constructor", this);
        }
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x();
        else if(cpov.isSDLFunction(this._x))
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
        else if(cpov.isSDLFunction(this._y))
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
        else if(cpov.isSDLFunction(this._z))
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
        else if(cpov.isSDLFunction(this._w))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new VectorXYZW();

        newObj.x = this.x;
        newObj.y = this.y;
        newObj.z = this.z;
        newObj.w = this.w;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces a copy of the vector. Does so quickly by directly copying
    // "private" members instead of going through get/set methods.
    //--------------------------------------------------------------------------
    
    copy() {
    
        var that = new VectorXYZW();
        that._x = this._x;
        that._y = this._y;
        that._z = this._z;
        that._w = this._w;
    
        return that;
    }


    //--------------------------------------------------------------------------
    // Produces SDL representation of the vector. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(this.x === null)
            cpov.error("fatal", "x is undefined.", "VectorXYZW.toSDL", this);
        if(this.y === null)
            cpov.error("fatal", "y is undefined.", "VectorXYZW.toSDL", this);
        if(this.z === null)
            cpov.error("fatal", "z is undefined.", "VectorXYZW.toSDL", this);
        if(this.w === null)
            cpov.error("fatal", "w is undefined.", "VectorXYZW.toSDL", this);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
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

        // Snippet constructor block //

        if(cpov.isClass(options, "Color")) { // copy
            options = { r: options.r, g: options.g, b: options.b, f: options.f, t: options.t, srgb: options.srgb };
        }
        
        if(Array.isArray(options)) {
            if(options.length < 3 || options.length > 6) {
                cpov.error("fatal", "When initializing a Color with an array, it must have three to six values.", "Color.constructor", this);
            } else {
                this.r = options[0];
                this.g = options[1];
                this.b = options[2];
                if(options.length > 3)
                    this.f = options[3];
                if(options.length > 4)
                    this.t = options[4];
                if(options.length > 5)
                    this.srgb = options[5];
            }
        } else if(typeof options == "object") {
            if(options.r === undefined || options.g === undefined || options.b === undefined)
                cpov.error("fatal", "When initializing a Color with an object, r, g, and b must be defined.", "Color.constructor", this);
            cpov.initObject(this, options);
        } else {
            cpov.error("fatal", "Invalid initializer.", "Color.constructor", this);
        }
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get r() {
        if(typeof this._r == "function")
            return this._r();
        else if(cpov.isSDLFunction(this._r))
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
        else if(cpov.isSDLFunction(this._g))
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
        else if(cpov.isSDLFunction(this._b))
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
        else if(cpov.isSDLFunction(this._f))
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
        else if(cpov.isSDLFunction(this._t))
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
        else if(cpov.isSDLFunction(this._srgb))
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

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Color();

        newObj.r    = this.r;   
        newObj.g    = this.g;   
        newObj.b    = this.b;   
        newObj.f    = this.f;   
        newObj.t    = this.t;   
        newObj.srgb = this.srgb;

        return newObj;
    }

    //--------------------------------------------------------------------------
    // Produces a copy of the color. Does so quickly by directly copying
    // "private" members instead of going through get/set methods.
    //--------------------------------------------------------------------------
    
    copy() {
    
        var that = new Color();
        that._r    = this._r;
        that._g    = this._g;
        that._b    = this._b;
        that._f    = this._f;
        that._t    = this._t;
        that._srgb = this._srgb;
    
        return that;
    }


    //--------------------------------------------------------------------------
    // Produces SDL representation of the vector. Will terminate the program if
    // any necessary attributes are undefined.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        stops = cpov.tab(stops);
    
        if(this.r === null)
            cpov.error("fatal", "r is undefined.", "Color.toSDL", this);
        if(this.g === null)
            cpov.error("fatal", "g is undefined.", "Color.toSDL", this);
        if(this.b === null)
            cpov.error("fatal", "b is undefined.", "Color.toSDL", this);
    
        var form = (this.srgb ? "s" : "") + "rgb";
        var args = [this.r, this.g, this.b];
    
        if(this.f) {
            form += "f";
            args.push(this.f);
            if(this.t) {
                form += "t";
                args.push(this.t);
            }
        }
    
        return stops + form + " <" + args.join(", ") + ">";
    
    }



}

exports.Color = Color;


//==============================================================================
// Matrix class. This was originally generated along with the Vector/Color
// classes, but the need for efficient computation that I couldn't readily get
// from codegen made it easier to copy the original generated code over to
// the snippets file and use it as a starting point for a largely hand-coded
// class.
//
// FIXME: There is squat for validation in the constructor subroutines.
//==============================================================================

class Matrix {

    constructor(v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32) {

        // Initialization //

        this.raw = [ // private array representation
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			0, 0, 0
		];

		if(cpov.isArrayOfFloats(v00) && v00.length == 12) {

			this.raw = v00.slice(0);

		} else if(v00 == "scale") {

            this.raw[0] = v01; // x
            this.raw[4] = v02; // y
            this.raw[8] = v10; // z

        } else if(v00 == "rotate") {

			if(v01 != 0) {                             // X
				this.raw = Matrix._xMatrix(this.raw, [
					1,              0,             0,
					0,  Math.cos(v01), Math.sin(v01),
					0, -Math.sin(v01), Math.cos(v01),
					0,              0,             0
				]);
			}

			if(v02 != 0) {                             // Y
				this.raw = Matrix._xMatrix(this.raw, [
					Math.cos(v02), 0, -Math.sin(v02),
					0,             1,              0,
					Math.sin(v02), 0,  Math.cos(v02),
					0,             0,              0
				]);
			}

			if(v10 != 0) {                             // Z
				this.raw = Matrix._xMatrix(this.raw, [
					 Math.cos(v10), Math.sin(v10), 0,
					-Math.sin(v10), Math.cos(v10), 0,
								 0,             0, 1,
								 0,             0, 0
				]);
			}

        } else if(v00 == "translate") {

            this.raw[9]  = v01; // x
            this.raw[10] = v02; // y
            this.raw[11] = v10; // z

        } else if(v00 == "skew") {

            // Since there are six possible values for skew xforms as
			// opposed to three for the others, just taking them as a list
			// doesn't buy the user much. So instead, they pass an object
			// with the axis-pairs they're interested in as labels: yx, zx,
			// xy, zy, xz, and yz.

			this.raw[1] = v01.yx === undefined ? 0 : v01.yx;
			this.raw[2] = v01.zx === undefined ? 0 : v01.zx;
			this.raw[3] = v01.xy === undefined ? 0 : v01.xy;
			this.raw[5] = v01.zy === undefined ? 0 : v01.zy;
			this.raw[6] = v01.xz === undefined ? 0 : v01.xz;
			this.raw[7] = v01.yz === undefined ? 0 : v01.yz;

        } else {

            this.raw = [ v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31,
				v32 ];

        }


    }

    //--------------------------------------------------------------------------

    get v00() {
        if(typeof this.raw[0] == "function")
            return this.raw[0]();
        else if(cpov.isSDLFunction(this.raw[0]))
            return this.raw[0].substr(1);
        else
            return this.raw[0];
    }

    set v00(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[0] = val;
        } else {
            cpov.error("fatal", "v00 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v01() {
        if(typeof this.raw[1] == "function")
            return this.raw[1]();
        else if(cpov.isSDLFunction(this.raw[1]))
            return this.raw[1].substr(1);
        else
            return this.raw[1];
    }

    set v01(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[1] = val;
        } else {
            cpov.error("fatal", "v01 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v02() {
        if(typeof this.raw[2] == "function")
            return this.raw[2]();
        else if(cpov.isSDLFunction(this.raw[2]))
            return this.raw[2].substr(1);
        else
            return this.raw[2];
    }

    set v02(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[2] = val;
        } else {
            cpov.error("fatal", "v02 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v10() {
        if(typeof this.raw[3] == "function")
            return this.raw[3]();
        else if(cpov.isSDLFunction(this.raw[3]))
            return this.raw[3].substr(1);
        else
            return this.raw[3];
    }

    set v10(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[3] = val;
        } else {
            cpov.error("fatal", "v10 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v11() {
        if(typeof this.raw[4] == "function")
            return this.raw[4]();
        else if(cpov.isSDLFunction(this.raw[4]))
            return this.raw[4].substr(1);
        else
            return this.raw[4];
    }

    set v11(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[4] = val;
        } else {
            cpov.error("fatal", "v11 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v12() {
        if(typeof this.raw[5] == "function")
            return this.raw[5]();
        else if(cpov.isSDLFunction(this.raw[5]))
            return this.raw[5].substr(1);
        else
            return this.raw[5];
    }

    set v12(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[5] = val;
        } else {
            cpov.error("fatal", "v12 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v20() {
        if(typeof this.raw[6] == "function")
            return this.raw[6]();
        else if(cpov.isSDLFunction(this.raw[6]))
            return this.raw[6].substr(1);
        else
            return this.raw[6];
    }

    set v20(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[6] = val;
        } else {
            cpov.error("fatal", "v20 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v21() {
        if(typeof this.raw[7] == "function")
            return this.raw[7]();
        else if(cpov.isSDLFunction(this.raw[7]))
            return this.raw[7].substr(1);
        else
            return this.raw[7];
    }

    set v21(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[7] = val;
        } else {
            cpov.error("fatal", "v21 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v22() {
        if(typeof this.raw[8] == "function")
            return this.raw[8]();
        else if(cpov.isSDLFunction(this.raw[8]))
            return this.raw[8].substr(1);
        else
            return this.raw[8];
    }

    set v22(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[8] = val;
        } else {
            cpov.error("fatal", "v22 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v30() {
        if(typeof this.raw[9] == "function")
            return this.raw[9]();
        else if(cpov.isSDLFunction(this.raw[9]))
            return this.raw[9].substr(1);
        else
            return this.raw[9];
    }

    set v30(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[9] = val;
        } else {
            cpov.error("fatal", "v30 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v31() {
        if(typeof this.raw[10] == "function")
            return this.raw[10]();
        else if(cpov.isSDLFunction(this.raw[10]))
            return this.raw[10].substr(1);
        else
            return this.raw[10];
    }

    set v31(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[10] = val;
        } else {
            cpov.error("fatal", "v31 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v32() {
        if(typeof this.raw[11] == "function")
            return this.raw[11]();
        else if(cpov.isSDLFunction(this.raw[11]))
            return this.raw[11].substr(1);
        else
            return this.raw[11];
    }

    set v32(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this.raw[11] = val;
        } else {
            cpov.error("fatal", "v32 must be a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        return new Matrix(this.raw);

    }

    //--------------------------------------------------------------------------
    // A private method for multiplying matrices in the form of arrays of 12
    // elements, returning the same.
    //--------------------------------------------------------------------------

    static _xMatrix(a, b) {
    	return [
            /* v00] */ (a[0] * b[0] + a[1]  * b[3] + a[2]  * b[6]),
            /* v01] */ (a[0] * b[1] + a[1]  * b[4] + a[2]  * b[7]),
            /* v02] */ (a[0] * b[2] + a[1]  * b[5] + a[2]  * b[8]),
            /* v10] */ (a[3] * b[0] + a[4]  * b[3] + a[5]  * b[6]),
            /* v11] */ (a[3] * b[1] + a[4]  * b[4] + a[5]  * b[7]),
            /* v12] */ (a[3] * b[2] + a[4]  * b[5] + a[5]  * b[8]),
            /* v20] */ (a[6] * b[0] + a[7]  * b[3] + a[8]  * b[6]),
            /* v21] */ (a[6] * b[1] + a[7]  * b[4] + a[8]  * b[7]),
            /* v22] */ (a[6] * b[2] + a[7]  * b[5] + a[8]  * b[8]),
            /* v30] */ (a[9] * b[0] + a[10] * b[3] + a[11] * b[6] + b[9]),
            /* v31] */ (a[9] * b[1] + a[10] * b[4] + a[11] * b[7] + b[10]),
            /* v32] */ (a[9] * b[2] + a[10] * b[5] + a[11] * b[8] + b[11])
    	];
    }

    //--------------------------------------------------------------------------
    // Given another Matrix, that, returns a new Matrix this * that.
    //--------------------------------------------------------------------------

    xMatrix(that) {

        if(!cpov.isClass(that, "Matrix"))
            cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix", this);

		return new Matrix(Matrix._xMatrix(this.raw, that.raw));
    }

    //--------------------------------------------------------------------------
    // Given a VectorXYZ, point, returns a new VectorXYZ this * point.
    //--------------------------------------------------------------------------

    xPoint(point) {

        if(!cpov.isClass(point, "VectorXYZ"))
            cpov.error("fatal", "point is not a VectorXYZ.", "Matrix.xPoint", this);

        return new VectorXYZ(
            this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
            this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
            this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
        );
    }

    //--------------------------------------------------------------------------
    // Produces the SDL representation of the Matrix.
    //--------------------------------------------------------------------------

    toSDL(stops = 0) {
        var pad = cpov.tab(stops);

        return pad + "<" + [this.v00, this.v01, this.v02, this.v10, this.v11,
            this.v12, this.v20, this.v21, this.v22, this.v30, this.v31,
            this.v32 ].join(", ") + ">";
    }

}

exports.Matrix = Matrix;


