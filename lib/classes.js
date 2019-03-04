/*

Copyright 2018-2019 Eric O'Dell and subsequent contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


//==============================================================================
// The Settings class is a singleton instantiated as cpov.settings that manages 
// CephaloPOV-specific settings as opposed to the POV-Ray settings in 
// cpov.imageOptions and cpov.globalSettings.
//==============================================================================

class Settings {

    constructor(options) {

        // Mutable properties //

        this._debug        = null;      
        this._frameBegin   = null;      
        this._frameEnd     = null;      
        this._infile       = null;      
        this._outputBase   = "cpov0000";
        this._preamble     = null;      
        this._quietMode    = false;     
        this._sdlIncludes  = null;      
        this._snapshotMode = false;     
        this._verbosity    = 1;         

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get debug() {
        if(typeof this._debug == "function")
            return this._debug(cpov, this);
        else if(cpov.isSDLFunction(this._debug))
            return this._debug.substr(1);
        else
            return this._debug;
    }

    set debug(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 0, 2))) {
            this._debug = val;
        } else {
            cpov.error("fatal", "debug must be an integer in the range 0-2.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get frameBegin() {
        if(typeof this._frameBegin == "function")
            return this._frameBegin(cpov, this);
        else if(cpov.isSDLFunction(this._frameBegin))
            return this._frameBegin.substr(1);
        else
            return this._frameBegin;
    }

    set frameBegin(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNullOrFunction(val))) {
            this._frameBegin = val;
        } else {
            cpov.error("fatal", "frameBegin must be either null or a function.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get frameEnd() {
        if(typeof this._frameEnd == "function")
            return this._frameEnd(cpov, this);
        else if(cpov.isSDLFunction(this._frameEnd))
            return this._frameEnd.substr(1);
        else
            return this._frameEnd;
    }

    set frameEnd(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNullOrFunction(val))) {
            this._frameEnd = val;
        } else {
            cpov.error("fatal", "frameEnd must be either null or a function.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get infile() {
        if(typeof this._infile == "function")
            return this._infile(cpov, this);
        else if(cpov.isSDLFunction(this._infile))
            return this._infile.substr(1);
        else
            return this._infile;
    }

    set infile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._infile = val;
        } else {
            cpov.error("fatal", "infile must be a non-empty string.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get outputBase() {
        if(typeof this._outputBase == "function")
            return this._outputBase(cpov, this);
        else if(cpov.isSDLFunction(this._outputBase))
            return this._outputBase.substr(1);
        else
            return this._outputBase;
    }

    set outputBase(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._outputBase = val;
        } else {
            cpov.error("fatal", "outputBase must be a non-empty string.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get preamble() {
        if(typeof this._preamble == "function")
            return this._preamble(cpov, this);
        else if(cpov.isSDLFunction(this._preamble))
            return this._preamble.substr(1);
        else
            return this._preamble;
    }

    set preamble(val) {
        if(cpov.isNullOrFunction(val) || (val === null || cpov.isString(val))) {
            this._preamble = val;
        } else {
            cpov.error("fatal", "preamble must be a string or null.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get quietMode() {
        if(typeof this._quietMode == "function")
            return this._quietMode(cpov, this);
        else if(cpov.isSDLFunction(this._quietMode))
            return this._quietMode.substr(1);
        else
            return this._quietMode;
    }

    set quietMode(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._quietMode = val;
        } else {
            cpov.error("fatal", "quietMode must be a boolean", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get sdlIncludes() {
        if(typeof this._sdlIncludes == "function")
            return this._sdlIncludes(cpov, this);
        else if(cpov.isSDLFunction(this._sdlIncludes))
            return this._sdlIncludes.substr(1);
        else
            return this._sdlIncludes;
    }

    set sdlIncludes(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfNonEmptyStrings(val))) {
            this._sdlIncludes = val;
        } else {
            cpov.error("fatal", "sdlIncludes must be an array of one or more SDL include files.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get snapshotMode() {
        if(typeof this._snapshotMode == "function")
            return this._snapshotMode(cpov, this);
        else if(cpov.isSDLFunction(this._snapshotMode))
            return this._snapshotMode.substr(1);
        else
            return this._snapshotMode;
    }

    set snapshotMode(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._snapshotMode = val;
        } else {
            cpov.error("fatal", "snapshotMode must be a boolean", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------

    get verbosity() {
        if(typeof this._verbosity == "function")
            return this._verbosity(cpov, this);
        else if(cpov.isSDLFunction(this._verbosity))
            return this._verbosity.substr(1);
        else
            return this._verbosity;
    }

    set verbosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 0, 4))) {
            this._verbosity = val;
        } else {
            cpov.error("fatal", "verbosity must be an integer in the range 0-4.", "Settings", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Settings();

        newObj.debug        = this.debug;       
        newObj.frameBegin   = this.frameBegin;  
        newObj.frameEnd     = this.frameEnd;    
        newObj.infile       = this.infile;      
        newObj.outputBase   = this.outputBase;  
        newObj.preamble     = this.preamble;    
        newObj.quietMode    = this.quietMode;   
        newObj.sdlIncludes  = this.sdlIncludes; 
        newObj.snapshotMode = this.snapshotMode;
        newObj.verbosity    = this.verbosity;   

        return newObj;
    }

    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }



}

exports.Settings = Settings;


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
            return this._adcBailout(cpov, this);
        else if(cpov.isSDLFunction(this._adcBailout))
            return this._adcBailout.substr(1);
        else
            return this._adcBailout;
    }

    set adcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._adcBailout = val;
        } else {
            cpov.error("fatal", "adcBailout must be a float greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get ambientLight() {
        if(typeof this._ambientLight == "function")
            return this._ambientLight(cpov, this);
        else if(cpov.isSDLFunction(this._ambientLight))
            return this._ambientLight.substr(1);
        else
            return this._ambientLight;
    }

    set ambientLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Color') || (val = new Color(val)))) {
            this._ambientLight = val;
        } else {
            cpov.error("fatal", "ambientLight must be a Color.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get assumedGamma() {
        if(typeof this._assumedGamma == "function")
            return this._assumedGamma(cpov, this);
        else if(cpov.isSDLFunction(this._assumedGamma))
            return this._assumedGamma.substr(1);
        else
            return this._assumedGamma;
    }

    set assumedGamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._assumedGamma = val;
        } else {
            cpov.error("fatal", "assumedGamma must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get charset() {
        if(typeof this._charset == "function")
            return this._charset(cpov, this);
        else if(cpov.isSDLFunction(this._charset))
            return this._charset.substr(1);
        else
            return this._charset;
    }

    set charset(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, cpov.charsets))) {
            this._charset = val;
        } else {
            cpov.error("fatal", "charset must be one of 'ascii', 'utf8', or 'sys'.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get iridWavelength() {
        if(typeof this._iridWavelength == "function")
            return this._iridWavelength(cpov, this);
        else if(cpov.isSDLFunction(this._iridWavelength))
            return this._iridWavelength.substr(1);
        else
            return this._iridWavelength;
    }

    set iridWavelength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Color'))) {
            this._iridWavelength = val;
        } else {
            cpov.error("fatal", "iridWavelength must be a Color", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxIntersections() {
        if(typeof this._maxIntersections == "function")
            return this._maxIntersections(cpov, this);
        else if(cpov.isSDLFunction(this._maxIntersections))
            return this._maxIntersections.substr(1);
        else
            return this._maxIntersections;
    }

    set maxIntersections(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._maxIntersections = val;
        } else {
            cpov.error("fatal", "maxIntersections must be an integer greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxTraceLevel() {
        if(typeof this._maxTraceLevel == "function")
            return this._maxTraceLevel(cpov, this);
        else if(cpov.isSDLFunction(this._maxTraceLevel))
            return this._maxTraceLevel.substr(1);
        else
            return this._maxTraceLevel;
    }

    set maxTraceLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 256)) {
            this._maxTraceLevel = val;
        } else {
            cpov.error("fatal", "maxTraceLevel must be an integer greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get mmPerUnit() {
        if(typeof this._mmPerUnit == "function")
            return this._mmPerUnit(cpov, this);
        else if(cpov.isSDLFunction(this._mmPerUnit))
            return this._mmPerUnit.substr(1);
        else
            return this._mmPerUnit;
    }

    set mmPerUnit(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._mmPerUnit = val;
        } else {
            cpov.error("fatal", "mmPerUnit must be a float greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get noiseGenerator() {
        if(typeof this._noiseGenerator == "function")
            return this._noiseGenerator(cpov, this);
        else if(cpov.isSDLFunction(this._noiseGenerator))
            return this._noiseGenerator.substr(1);
        else
            return this._noiseGenerator;
    }

    set noiseGenerator(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isInArray(val, [1, 2, 3]))) {
            this._noiseGenerator = val;
        } else {
            cpov.error("fatal", "noiseGenerator must be an integer and one of 1, 2, or 3.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get numberOfWaves() {
        if(typeof this._numberOfWaves == "function")
            return this._numberOfWaves(cpov, this);
        else if(cpov.isSDLFunction(this._numberOfWaves))
            return this._numberOfWaves.substr(1);
        else
            return this._numberOfWaves;
    }

    set numberOfWaves(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._numberOfWaves = val;
        } else {
            cpov.error("fatal", "numberOfWaves must be an integer greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photon() {
        if(typeof this._photon == "function")
            return this._photon(cpov, this);
        else if(cpov.isSDLFunction(this._photon))
            return this._photon.substr(1);
        else
            return this._photon;
    }

    set photon(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._photon = val;
        } else {
            cpov.error("fatal", "photon must be a boolean.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonAdcBailout() {
        if(typeof this._photonAdcBailout == "function")
            return this._photonAdcBailout(cpov, this);
        else if(cpov.isSDLFunction(this._photonAdcBailout))
            return this._photonAdcBailout.substr(1);
        else
            return this._photonAdcBailout;
    }

    set photonAdcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._photonAdcBailout = val;
        } else {
            cpov.error("fatal", "photonAdcBailout must be a float greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonAutostop() {
        if(typeof this._photonAutostop == "function")
            return this._photonAutostop(cpov, this);
        else if(cpov.isSDLFunction(this._photonAutostop))
            return this._photonAutostop.substr(1);
        else
            return this._photonAutostop;
    }

    set photonAutostop(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(val, 0, 1))) {
            this._photonAutostop = val;
        } else {
            cpov.error("fatal", "photonAutostop must be a float within the unit interval (0.0 - 1.0)", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonCount() {
        if(typeof this._photonCount == "function")
            return this._photonCount(cpov, this);
        else if(cpov.isSDLFunction(this._photonCount))
            return this._photonCount.substr(1);
        else
            return this._photonCount;
    }

    set photonCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._photonCount = val;
        } else {
            cpov.error("fatal", "photonCount must be an integer greater than or equal to zero", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonExpandThresholds() {
        if(typeof this._photonExpandThresholds == "function")
            return this._photonExpandThresholds(cpov, this);
        else if(cpov.isSDLFunction(this._photonExpandThresholds))
            return this._photonExpandThresholds.substr(1);
        else
            return this._photonExpandThresholds;
    }

    set photonExpandThresholds(val) {
        if(cpov.isNullOrFunction(val) || (Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isWithin(val[0], 0, 1) && cpov.isInt(val[1]))) {
            this._photonExpandThresholds = val;
        } else {
            cpov.error("fatal", "photonExpandThresholds must be an array consisting of a float in the unit interval (0.0 - 1.0) and and integer.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonGather() {
        if(typeof this._photonGather == "function")
            return this._photonGather(cpov, this);
        else if(cpov.isSDLFunction(this._photonGather))
            return this._photonGather.substr(1);
        else
            return this._photonGather;
    }

    set photonGather(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1])) {
            this._photonGather = val;
        } else {
            cpov.error("fatal", "photonGather must be an array of two integers greater than zero in ascending order.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonJitter() {
        if(typeof this._photonJitter == "function")
            return this._photonJitter(cpov, this);
        else if(cpov.isSDLFunction(this._photonJitter))
            return this._photonJitter.substr(1);
        else
            return this._photonJitter;
    }

    set photonJitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._photonJitter = val;
        } else {
            cpov.error("fatal", "photonJitter must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonLoadFile() {
        if(typeof this._photonLoadFile == "function")
            return this._photonLoadFile(cpov, this);
        else if(cpov.isSDLFunction(this._photonLoadFile))
            return this._photonLoadFile.substr(1);
        else
            return this._photonLoadFile;
    }

    set photonLoadFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._photonLoadFile = val;
        } else {
            cpov.error("fatal", "photonLoadFile must be a non-empty string.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonMaxTraceLevel() {
        if(typeof this._photonMaxTraceLevel == "function")
            return this._photonMaxTraceLevel(cpov, this);
        else if(cpov.isSDLFunction(this._photonMaxTraceLevel))
            return this._photonMaxTraceLevel.substr(1);
        else
            return this._photonMaxTraceLevel;
    }

    set photonMaxTraceLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._photonMaxTraceLevel = val;
        } else {
            cpov.error("fatal", "photonMaxTraceLevel must be an integer greater than or equal to zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonMedia() {
        if(typeof this._photonMedia == "function")
            return this._photonMedia(cpov, this);
        else if(cpov.isSDLFunction(this._photonMedia))
            return this._photonMedia.substr(1);
        else
            return this._photonMedia;
    }

    set photonMedia(val) {
        if(cpov.isNullOrFunction(val) || (Array.isArray(val) && val.length == 2 && cpov.isInt(val[0]) && cpov.isFloat(val[1]))) {
            this._photonMedia = val;
        } else {
            cpov.error("fatal", "photonMedia must be an array of an integer and a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonRadius() {
        if(typeof this._photonRadius == "function")
            return this._photonRadius(cpov, this);
        else if(cpov.isSDLFunction(this._photonRadius))
            return this._photonRadius.substr(1);
        else
            return this._photonRadius;
    }

    set photonRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 4, 4))) {
            this._photonRadius = val;
        } else {
            cpov.error("fatal", "photonRadius must be an array of four floats.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonSaveFile() {
        if(typeof this._photonSaveFile == "function")
            return this._photonSaveFile(cpov, this);
        else if(cpov.isSDLFunction(this._photonSaveFile))
            return this._photonSaveFile.substr(1);
        else
            return this._photonSaveFile;
    }

    set photonSaveFile(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._photonSaveFile = val;
        } else {
            cpov.error("fatal", "photonSaveFile must be a non-empty string.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get photonSpacing() {
        if(typeof this._photonSpacing == "function")
            return this._photonSpacing(cpov, this);
        else if(cpov.isSDLFunction(this._photonSpacing))
            return this._photonSpacing.substr(1);
        else
            return this._photonSpacing;
    }

    set photonSpacing(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._photonSpacing = val;
        } else {
            cpov.error("fatal", "photonSpacing must be a float greater than zero.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radAdcBailout() {
        if(typeof this._radAdcBailout == "function")
            return this._radAdcBailout(cpov, this);
        else if(cpov.isSDLFunction(this._radAdcBailout))
            return this._radAdcBailout.substr(1);
        else
            return this._radAdcBailout;
    }

    set radAdcBailout(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radAdcBailout = val;
        } else {
            cpov.error("fatal", "radAdcBailout must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radAlwaysSample() {
        if(typeof this._radAlwaysSample == "function")
            return this._radAlwaysSample(cpov, this);
        else if(cpov.isSDLFunction(this._radAlwaysSample))
            return this._radAlwaysSample.substr(1);
        else
            return this._radAlwaysSample;
    }

    set radAlwaysSample(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radAlwaysSample = val;
        } else {
            cpov.error("fatal", "radAlwaysSample must be a boolean.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radBrightness() {
        if(typeof this._radBrightness == "function")
            return this._radBrightness(cpov, this);
        else if(cpov.isSDLFunction(this._radBrightness))
            return this._radBrightness.substr(1);
        else
            return this._radBrightness;
    }

    set radBrightness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radBrightness = val;
        } else {
            cpov.error("fatal", "radBrightness must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radCount() {
        if(typeof this._radCount == "function")
            return this._radCount(cpov, this);
        else if(cpov.isSDLFunction(this._radCount))
            return this._radCount.substr(1);
        else
            return this._radCount;
    }

    set radCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1))) {
            this._radCount = val;
        } else {
            cpov.error("fatal", "radCount must be an array of one or two integers, both of which must be greater than or equal to one.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radErrorBound() {
        if(typeof this._radErrorBound == "function")
            return this._radErrorBound(cpov, this);
        else if(cpov.isSDLFunction(this._radErrorBound))
            return this._radErrorBound.substr(1);
        else
            return this._radErrorBound;
    }

    set radErrorBound(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radErrorBound = val;
        } else {
            cpov.error("fatal", "radErrorBound must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radGrayThreshold() {
        if(typeof this._radGrayThreshold == "function")
            return this._radGrayThreshold(cpov, this);
        else if(cpov.isSDLFunction(this._radGrayThreshold))
            return this._radGrayThreshold.substr(1);
        else
            return this._radGrayThreshold;
    }

    set radGrayThreshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(val, 0, 1))) {
            this._radGrayThreshold = val;
        } else {
            cpov.error("fatal", "radGrayThreshold must be a float in the unit interval (0.0 - 1.0).", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radiosity() {
        if(typeof this._radiosity == "function")
            return this._radiosity(cpov, this);
        else if(cpov.isSDLFunction(this._radiosity))
            return this._radiosity.substr(1);
        else
            return this._radiosity;
    }

    set radiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radiosity = val;
        } else {
            cpov.error("fatal", "radiosity must be a boolean.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radLowErrorFactor() {
        if(typeof this._radLowErrorFactor == "function")
            return this._radLowErrorFactor(cpov, this);
        else if(cpov.isSDLFunction(this._radLowErrorFactor))
            return this._radLowErrorFactor.substr(1);
        else
            return this._radLowErrorFactor;
    }

    set radLowErrorFactor(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radLowErrorFactor = val;
        } else {
            cpov.error("fatal", "radLowErrorFactor must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radMaximumReuse() {
        if(typeof this._radMaximumReuse == "function")
            return this._radMaximumReuse(cpov, this);
        else if(cpov.isSDLFunction(this._radMaximumReuse))
            return this._radMaximumReuse.substr(1);
        else
            return this._radMaximumReuse;
    }

    set radMaximumReuse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMaximumReuse = val;
        } else {
            cpov.error("fatal", "radMaximumReuse must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radMaxSample() {
        if(typeof this._radMaxSample == "function")
            return this._radMaxSample(cpov, this);
        else if(cpov.isSDLFunction(this._radMaxSample))
            return this._radMaxSample.substr(1);
        else
            return this._radMaxSample;
    }

    set radMaxSample(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMaxSample = val;
        } else {
            cpov.error("fatal", "radMaxSample must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radMinimumReuse() {
        if(typeof this._radMinimumReuse == "function")
            return this._radMinimumReuse(cpov, this);
        else if(cpov.isSDLFunction(this._radMinimumReuse))
            return this._radMinimumReuse.substr(1);
        else
            return this._radMinimumReuse;
    }

    set radMinimumReuse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radMinimumReuse = val;
        } else {
            cpov.error("fatal", "radMinimumReuse must be a float.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radNearestCount() {
        if(typeof this._radNearestCount == "function")
            return this._radNearestCount(cpov, this);
        else if(cpov.isSDLFunction(this._radNearestCount))
            return this._radNearestCount.substr(1);
        else
            return this._radNearestCount;
    }

    set radNearestCount(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 20))) {
            this._radNearestCount = val;
        } else {
            cpov.error("fatal", "radNearestCount must be an integer in the range 1-20.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radNormal() {
        if(typeof this._radNormal == "function")
            return this._radNormal(cpov, this);
        else if(cpov.isSDLFunction(this._radNormal))
            return this._radNormal.substr(1);
        else
            return this._radNormal;
    }

    set radNormal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radNormal = val;
        } else {
            cpov.error("fatal", "radNormal must be a boolean.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radPretraceEnd() {
        if(typeof this._radPretraceEnd == "function")
            return this._radPretraceEnd(cpov, this);
        else if(cpov.isSDLFunction(this._radPretraceEnd))
            return this._radPretraceEnd.substr(1);
        else
            return this._radPretraceEnd;
    }

    set radPretraceEnd(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(val, 0, 1))) {
            this._radPretraceEnd = val;
        } else {
            cpov.error("fatal", "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radPretraceStart() {
        if(typeof this._radPretraceStart == "function")
            return this._radPretraceStart(cpov, this);
        else if(cpov.isSDLFunction(this._radPretraceStart))
            return this._radPretraceStart.substr(1);
        else
            return this._radPretraceStart;
    }

    set radPretraceStart(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && cpov.isWithin(val, 0, 1))) {
            this._radPretraceStart = val;
        } else {
            cpov.error("fatal", "radPretraceStart must be a float in the unit interval (0.0 - 1.0)", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radRecursionLimit() {
        if(typeof this._radRecursionLimit == "function")
            return this._radRecursionLimit(cpov, this);
        else if(cpov.isSDLFunction(this._radRecursionLimit))
            return this._radRecursionLimit.substr(1);
        else
            return this._radRecursionLimit;
    }

    set radRecursionLimit(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 20))) {
            this._radRecursionLimit = val;
        } else {
            cpov.error("fatal", "radRecursionLimit must be an integer in the range 1-20.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get radSubsurface() {
        if(typeof this._radSubsurface == "function")
            return this._radSubsurface(cpov, this);
        else if(cpov.isSDLFunction(this._radSubsurface))
            return this._radSubsurface.substr(1);
        else
            return this._radSubsurface;
    }

    set radSubsurface(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._radSubsurface = val;
        } else {
            cpov.error("fatal", "radSubsurface must be a boolean.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get subRadiosity() {
        if(typeof this._subRadiosity == "function")
            return this._subRadiosity(cpov, this);
        else if(cpov.isSDLFunction(this._subRadiosity))
            return this._subRadiosity.substr(1);
        else
            return this._subRadiosity;
    }

    set subRadiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._subRadiosity = val;
        } else {
            cpov.error("fatal", "subRadiosity must be a boolean", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get subSamples() {
        if(typeof this._subSamples == "function")
            return this._subSamples(cpov, this);
        else if(cpov.isSDLFunction(this._subSamples))
            return this._subSamples.substr(1);
        else
            return this._subSamples;
    }

    set subSamples(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInts(val, 2, 2))) {
            this._subSamples = val;
        } else {
            cpov.error("fatal", "subSamples must be an array of two integers.", "GlobalSettings", this);
        }
    }

    //--------------------------------------------------------------------------

    get subsurface() {
        if(typeof this._subsurface == "function")
            return this._subsurface(cpov, this);
        else if(cpov.isSDLFunction(this._subsurface))
            return this._subsurface.substr(1);
        else
            return this._subsurface;
    }

    set subsurface(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._subsurface = val;
        } else {
            cpov.error("fatal", "subsurface must be a boolean.", "GlobalSettings", this);
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
    
        if(this.photonSpacing !== null && this.photonCount !== null)
            cpov.error("fatal", "photonSpacing and photonCount cannot be defined simultaneously.", "GlobalSettings", this);
    
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
            if(this[i] !== null) {
                if(Array.isArray(this[i]))
                    contents.push("    " + params[i] + " " + this[i].join(", "));
                else if(this[i].toPlainRGBVector === undefined)
                    contents.push("    " + params[i] + " " + this[i]);
                else
                    contents.push("    " + params[i] + " " + this[i].toPlainRGBVector());
            }
        }
    
        if(this.radiosity) {
            contents.push("    radiosity {");
            for(var i in radParams) {
                if(this[i] !== null) {
                   if(Array.isArray(this[i]))
                        contents.push("        " + radParams[i] + " " + this[i].join(", "));
                   else
                        contents.push("        " + radParams[i] + " " + this[i]);
                }
            }
            contents.push("    }");
        }
    
        if(this.subsurface) {
            contents.push("    subsurface {");
            for(var i in subParams) {
                if(this[i] !== null) {
                   if(Array.isArray(this[i]))
                        contents.push("        " + subParams[i] + " " + this[i].join(", "));
                   else
                        contents.push("        " + subParams[i] + " " + this[i]);
                }
            }
            contents.push("    }");
        }
    
        if(this.photon) {
            contents.push("    photon {");
            for(var i in photonParams) {
                if(this[i] !== null) {
                   if(Array.isArray(this[i]))
                        contents.push("        " + photonParams[i] + " " + this[i].join(", "));
                   else
                        contents.push("        " + photonParams[i] + " " + this[i]);
                }
            }
            contents.push("    }");
        }
    
        contents.push("}");
    
        return contents.join("\n");
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
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

        this._allConsole          = null;
        this._allFile             = null;
        this._antialias           = null;
        this._antialiasDepth      = null;
        this._antialiasGamma      = null;
        this._antialiasThreshold  = null;
        this._appendFile          = null;
        this._bitsPerColor        = null;
        this._bounding            = null;
        this._boundingMethod      = null;
        this._boundingThreshold   = null;
        this._bspBaseAccessCost   = null;
        this._bspChildAccessCost  = null;
        this._bspIsectCost        = null;
        this._bspMaxDepth         = null;
        this._bspMissChance       = null;
        this._debugConsole        = null;
        this._debugFile           = null;
        this._display             = null;
        this._displayGamma        = null;
        this._dither              = null;
        this._ditherMethod        = null;
        this._endColumn           = null;
        this._endRow              = null;
        this._exePath             = null;
        this._fatalConsole        = null;
        this._fatalErrorCommand   = null;
        this._fatalErrorReturn    = null;
        this._fatalFile           = null;
        this._fileGamma           = null;
        this._height              = null;
        this._highReproducibility = null;
        this._includeHeaders      = null;
        this._inputFileName       = null;
        this._jitter              = null;
        this._jitterAmount        = null;
        this._libraryPath         = null;
        this._maxImageBuffer      = null;
        this._outputAlpha         = null;
        this._outputFileName      = null;
        this._outputFileType      = null;
        this._outputToFile        = null;
        this._palette             = null;
        this._pauseWhenDone       = null;
        this._postSceneCommand    = null;
        this._postSceneReturn     = null;
        this._preSceneCommand     = null;
        this._preSceneReturn      = null;
        this._previewEndSize      = null;
        this._previewStartSize    = null;
        this._quality             = null;
        this._radFileName         = null;
        this._radFromFile         = null;
        this._radToFile           = null;
        this._radVainPretrace     = null;
        this._removeBounds        = null;
        this._renderBlockSize     = null;
        this._renderBlockStep     = null;
        this._renderConsole       = null;
        this._renderFile          = null;
        this._renderPattern       = null;
        this._samplingMethod      = null;
        this._splitUnions         = null;
        this._startColumn         = null;
        this._startRow            = null;
        this._statisticConsole    = null;
        this._statisticFile       = null;
        this._testAbort           = null;
        this._testAbortCount      = null;
        this._userAbortCommand    = null;
        this._userAbortReturn     = null;
        this._verbose             = null;
        this._videoMode           = null;
        this._warningConsole      = null;
        this._warningFile         = null;
        this._warningLevel        = null;
        this._width               = null;
        this._workThreads         = null;

        // Mutable list //

        this._mutableList = [ "allConsole", "allFile", "antialias", "antialiasDepth", "antialiasGamma", "antialiasThreshold", "appendFile", "bitsPerColor", "bounding", "boundingMethod", "boundingThreshold", "bspBaseAccessCost", "bspChildAccessCost", "bspIsectCost", "bspMaxDepth", "bspMissChance", "debugConsole", "debugFile", "display", "displayGamma", "dither", "ditherMethod", "endColumn", "endRow", "exePath", "fatalConsole", "fatalErrorCommand", "fatalErrorReturn", "fatalFile", "fileGamma", "height", "highReproducibility", "includeHeaders", "inputFileName", "jitter", "jitterAmount", "libraryPath", "maxImageBuffer", "outputAlpha", "outputFileName", "outputFileType", "outputToFile", "palette", "pauseWhenDone", "postSceneCommand", "postSceneReturn", "preSceneCommand", "preSceneReturn", "previewEndSize", "previewStartSize", "quality", "radFileName", "radFromFile", "radToFile", "radVainPretrace", "removeBounds", "renderBlockSize", "renderBlockStep", "renderConsole", "renderFile", "renderPattern", "samplingMethod", "splitUnions", "startColumn", "startRow", "statisticConsole", "statisticFile", "testAbort", "testAbortCount", "userAbortCommand", "userAbortReturn", "verbose", "videoMode", "warningConsole", "warningFile", "warningLevel", "width", "workThreads" ];

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "height", "width" ];

    }

    //--------------------------------------------------------------------------

    get allConsole() {
        if(typeof this._allConsole == "function")
            return this._allConsole(cpov, this);
        else
            return this._allConsole;
    }

    set allConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._allConsole = val;
        } else {
            cpov.error("fatal", "allConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get allFile() {
        if(typeof this._allFile == "function")
            return this._allFile(cpov, this);
        else
            return this._allFile;
    }

    set allFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._allFile = val;
        } else {
            cpov.error("fatal", "allFile must be either a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get antialias() {
        if(typeof this._antialias == "function")
            return this._antialias(cpov, this);
        else
            return this._antialias;
    }

    set antialias(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._antialias = val;
        } else {
            cpov.error("fatal", "antialias must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get antialiasDepth() {
        if(typeof this._antialiasDepth == "function")
            return this._antialiasDepth(cpov, this);
        else
            return this._antialiasDepth;
    }

    set antialiasDepth(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 9))) {
            this._antialiasDepth = val;
        } else {
            cpov.error("fatal", "antialiasDepth must be an integer in the range 1-9.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get antialiasGamma() {
        if(typeof this._antialiasGamma == "function")
            return this._antialiasGamma(cpov, this);
        else
            return this._antialiasGamma;
    }

    set antialiasGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._antialiasGamma = val;
        } else {
            cpov.error("fatal", "antialiasGamma must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get antialiasThreshold() {
        if(typeof this._antialiasThreshold == "function")
            return this._antialiasThreshold(cpov, this);
        else
            return this._antialiasThreshold;
    }

    set antialiasThreshold(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._antialiasThreshold = val;
        } else {
            cpov.error("fatal", "antialiasThreshold must be a float greater than or equal to zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get appendFile() {
        if(typeof this._appendFile == "function")
            return this._appendFile(cpov, this);
        else
            return this._appendFile;
    }

    set appendFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._appendFile = val;
        } else {
            cpov.error("fatal", "appendFile must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bitsPerColor() {
        if(typeof this._bitsPerColor == "function")
            return this._bitsPerColor(cpov, this);
        else
            return this._bitsPerColor;
    }

    set bitsPerColor(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 5, 16))) {
            this._bitsPerColor = val;
        } else {
            cpov.error("fatal", "bitsPerColor must be an integer in the range 5-16.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bounding() {
        if(typeof this._bounding == "function")
            return this._bounding(cpov, this);
        else
            return this._bounding;
    }

    set bounding(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._bounding = val;
        } else {
            cpov.error("fatal", "bounding must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get boundingMethod() {
        if(typeof this._boundingMethod == "function")
            return this._boundingMethod(cpov, this);
        else
            return this._boundingMethod;
    }

    set boundingMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isWithin(val, 1, 2))) {
            this._boundingMethod = val;
        } else {
            cpov.error("fatal", "boundingMethod must be either 1 or 2.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get boundingThreshold() {
        if(typeof this._boundingThreshold == "function")
            return this._boundingThreshold(cpov, this);
        else
            return this._boundingThreshold;
    }

    set boundingThreshold(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._boundingThreshold = val;
        } else {
            cpov.error("fatal", "boundingThreshold must be an integer greater than or equal to zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bspBaseAccessCost() {
        if(typeof this._bspBaseAccessCost == "function")
            return this._bspBaseAccessCost(cpov, this);
        else
            return this._bspBaseAccessCost;
    }

    set bspBaseAccessCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspBaseAccessCost = val;
        } else {
            cpov.error("fatal", "bspBaseAccessCost must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bspChildAccessCost() {
        if(typeof this._bspChildAccessCost == "function")
            return this._bspChildAccessCost(cpov, this);
        else
            return this._bspChildAccessCost;
    }

    set bspChildAccessCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspChildAccessCost = val;
        } else {
            cpov.error("fatal", "bspChildAccessCost must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bspIsectCost() {
        if(typeof this._bspIsectCost == "function")
            return this._bspIsectCost(cpov, this);
        else
            return this._bspIsectCost;
    }

    set bspIsectCost(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspIsectCost = val;
        } else {
            cpov.error("fatal", "bspIsectCost must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bspMaxDepth() {
        if(typeof this._bspMaxDepth == "function")
            return this._bspMaxDepth(cpov, this);
        else
            return this._bspMaxDepth;
    }

    set bspMaxDepth(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._bspMaxDepth = val;
        } else {
            cpov.error("fatal", "bspMaxDepth must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get bspMissChance() {
        if(typeof this._bspMissChance == "function")
            return this._bspMissChance(cpov, this);
        else
            return this._bspMissChance;
    }

    set bspMissChance(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._bspMissChance = val;
        } else {
            cpov.error("fatal", "bspMissChance must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get debugConsole() {
        if(typeof this._debugConsole == "function")
            return this._debugConsole(cpov, this);
        else
            return this._debugConsole;
    }

    set debugConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._debugConsole = val;
        } else {
            cpov.error("fatal", "debugConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get debugFile() {
        if(typeof this._debugFile == "function")
            return this._debugFile(cpov, this);
        else
            return this._debugFile;
    }

    set debugFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._debugFile = val;
        } else {
            cpov.error("fatal", "debugFile must be either a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get display() {
        if(typeof this._display == "function")
            return this._display(cpov, this);
        else
            return this._display;
    }

    set display(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._display = val;
        } else {
            cpov.error("fatal", "display must be a boolean", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get displayGamma() {
        if(typeof this._displayGamma == "function")
            return this._displayGamma(cpov, this);
        else
            return this._displayGamma;
    }

    set displayGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB'))) {
            this._displayGamma = val;
        } else {
            cpov.error("fatal", "displayGamma must be either a float or the string 'sRGB'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get dither() {
        if(typeof this._dither == "function")
            return this._dither(cpov, this);
        else
            return this._dither;
    }

    set dither(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._dither = val;
        } else {
            cpov.error("fatal", "dither must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get ditherMethod() {
        if(typeof this._ditherMethod == "function")
            return this._ditherMethod(cpov, this);
        else
            return this._ditherMethod;
    }

    set ditherMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.ditherTypes))) {
            this._ditherMethod = val;
        } else {
            cpov.error("fatal", "ditherMethod must be one of 'B2', 'B3', 'B4', 'D1', 'D2', or 'FS'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get endColumn() {
        if(typeof this._endColumn == "function")
            return this._endColumn(cpov, this);
        else
            return this._endColumn;
    }

    set endColumn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._endColumn = val;
        } else {
            cpov.error("fatal", "endColumn must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get endRow() {
        if(typeof this._endRow == "function")
            return this._endRow(cpov, this);
        else
            return this._endRow;
    }

    set endRow(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._endRow = val;
        } else {
            cpov.error("fatal", "endRow must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get exePath() {
        if(typeof this._exePath == "function")
            return this._exePath(cpov, this);
        else
            return this._exePath;
    }

    set exePath(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._exePath = val;
        } else {
            cpov.error("fatal", "exePath must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get fatalConsole() {
        if(typeof this._fatalConsole == "function")
            return this._fatalConsole(cpov, this);
        else
            return this._fatalConsole;
    }

    set fatalConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._fatalConsole = val;
        } else {
            cpov.error("fatal", "fatalConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorCommand() {
        if(typeof this._fatalErrorCommand == "function")
            return this._fatalErrorCommand(cpov, this);
        else
            return this._fatalErrorCommand;
    }

    set fatalErrorCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._fatalErrorCommand = val;
        } else {
            cpov.error("fatal", "fatalErrorCommand must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get fatalErrorReturn() {
        if(typeof this._fatalErrorReturn == "function")
            return this._fatalErrorReturn(cpov, this);
        else
            return this._fatalErrorReturn;
    }

    set fatalErrorReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._fatalErrorReturn = val;
        } else {
            cpov.error("fatal", "fatalErrorReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get fatalFile() {
        if(typeof this._fatalFile == "function")
            return this._fatalFile(cpov, this);
        else
            return this._fatalFile;
    }

    set fatalFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._fatalFile = val;
        } else {
            cpov.error("fatal", "fatalFile must be either a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get fileGamma() {
        if(typeof this._fileGamma == "function")
            return this._fileGamma(cpov, this);
        else
            return this._fileGamma;
    }

    set fileGamma(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) || val === 'sRGB')) {
            this._fileGamma = val;
        } else {
            cpov.error("fatal", "fileGamma must be either a float or the string 'sRGB'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get height() {
        if(typeof this._height == "function")
            return this._height(cpov, this);
        else
            return this._height;
    }

    set height(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._height = val;
        } else {
            cpov.error("fatal", "height must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get highReproducibility() {
        if(typeof this._highReproducibility == "function")
            return this._highReproducibility(cpov, this);
        else
            return this._highReproducibility;
    }

    set highReproducibility(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._highReproducibility = val;
        } else {
            cpov.error("fatal", "highReproducibility must be a boolean", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get includeHeaders() {
        if(typeof this._includeHeaders == "function")
            return this._includeHeaders(cpov, this);
        else
            return this._includeHeaders;
    }

    set includeHeaders(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isArrayOfNonEmptyStrings(val, 0, Infinity))) {
            this._includeHeaders = val;
        } else {
            cpov.error("fatal", "includeHeader must be an array of non-empty strings.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get inputFileName() {
        if(typeof this._inputFileName == "function")
            return this._inputFileName(cpov, this);
        else
            return this._inputFileName;
    }

    set inputFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._inputFileName = val;
        } else {
            cpov.error("fatal", "inputFileName must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get jitter() {
        if(typeof this._jitter == "function")
            return this._jitter(cpov, this);
        else
            return this._jitter;
    }

    set jitter(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get jitterAmount() {
        if(typeof this._jitterAmount == "function")
            return this._jitterAmount(cpov, this);
        else
            return this._jitterAmount;
    }

    set jitterAmount(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val))) {
            this._jitterAmount = val;
        } else {
            cpov.error("fatal", "jitterAmount must be a float.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get libraryPath() {
        if(typeof this._libraryPath == "function")
            return this._libraryPath(cpov, this);
        else
            return this._libraryPath;
    }

    set libraryPath(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isArrayOfNonEmptyStrings(val, 1, Infinity))) {
            this._libraryPath = val;
        } else {
            cpov.error("fatal", "libraryPath must be an array of one or more non-empty strings.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxImageBuffer() {
        if(typeof this._maxImageBuffer == "function")
            return this._maxImageBuffer(cpov, this);
        else
            return this._maxImageBuffer;
    }

    set maxImageBuffer(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._maxImageBuffer = val;
        } else {
            cpov.error("fatal", "maxImageBuffer must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get outputAlpha() {
        if(typeof this._outputAlpha == "function")
            return this._outputAlpha(cpov, this);
        else
            return this._outputAlpha;
    }

    set outputAlpha(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._outputAlpha = val;
        } else {
            cpov.error("fatal", "outputAlpha must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get outputFileName() {
        if(typeof this._outputFileName == "function")
            return this._outputFileName(cpov, this);
        else
            return this._outputFileName;
    }

    set outputFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._outputFileName = val;
        } else {
            cpov.error("fatal", "outputFileName must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get outputFileType() {
        if(typeof this._outputFileType == "function")
            return this._outputFileType(cpov, this);
        else
            return this._outputFileType;
    }

    set outputFileType(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.outputFileTypes))) {
            this._outputFileType = val;
        } else {
            cpov.error("fatal", "outputFileType must be one of 'B', 'C', 'E', 'H', 'J', 'N', 'P', 'S', or 'T'", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get outputToFile() {
        if(typeof this._outputToFile == "function")
            return this._outputToFile(cpov, this);
        else
            return this._outputToFile;
    }

    set outputToFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._outputToFile = val;
        } else {
            cpov.error("fatal", "outputToFile must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get palette() {
        if(typeof this._palette == "function")
            return this._palette(cpov, this);
        else
            return this._palette;
    }

    set palette(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._palette = val;
        } else {
            cpov.error("fatal", "palette must be a single character.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get pauseWhenDone() {
        if(typeof this._pauseWhenDone == "function")
            return this._pauseWhenDone(cpov, this);
        else
            return this._pauseWhenDone;
    }

    set pauseWhenDone(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._pauseWhenDone = val;
        } else {
            cpov.error("fatal", "pauseWhenDone must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get postSceneCommand() {
        if(typeof this._postSceneCommand == "function")
            return this._postSceneCommand(cpov, this);
        else
            return this._postSceneCommand;
    }

    set postSceneCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._postSceneCommand = val;
        } else {
            cpov.error("fatal", "postSceneCommand must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get postSceneReturn() {
        if(typeof this._postSceneReturn == "function")
            return this._postSceneReturn(cpov, this);
        else
            return this._postSceneReturn;
    }

    set postSceneReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._postSceneReturn = val;
        } else {
            cpov.error("fatal", "postSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get preSceneCommand() {
        if(typeof this._preSceneCommand == "function")
            return this._preSceneCommand(cpov, this);
        else
            return this._preSceneCommand;
    }

    set preSceneCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._preSceneCommand = val;
        } else {
            cpov.error("fatal", "preSceneCommand must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get preSceneReturn() {
        if(typeof this._preSceneReturn == "function")
            return this._preSceneReturn(cpov, this);
        else
            return this._preSceneReturn;
    }

    set preSceneReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._preSceneReturn = val;
        } else {
            cpov.error("fatal", "preSceneReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get previewEndSize() {
        if(typeof this._previewEndSize == "function")
            return this._previewEndSize(cpov, this);
        else
            return this._previewEndSize;
    }

    set previewEndSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isPowerOfTwo(val) && val > 0)) {
            this._previewEndSize = val;
        } else {
            cpov.error("fatal", "previewEndSize must be an integer that is both a power of two and greater than zero", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get previewStartSize() {
        if(typeof this._previewStartSize == "function")
            return this._previewStartSize(cpov, this);
        else
            return this._previewStartSize;
    }

    set previewStartSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isPowerOfTwo(val) && val > 0)) {
            this._previewStartSize = val;
        } else {
            cpov.error("fatal", "previewStartSize must be an integer that is both a power of two and greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get quality() {
        if(typeof this._quality == "function")
            return this._quality(cpov, this);
        else
            return this._quality;
    }

    set quality(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 11)) {
            this._quality = val;
        } else {
            cpov.error("fatal", "quality must be an integer in the range (0 - 11)", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get radFileName() {
        if(typeof this._radFileName == "function")
            return this._radFileName(cpov, this);
        else
            return this._radFileName;
    }

    set radFileName(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._radFileName = val;
        } else {
            cpov.error("fatal", "radFileName must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get radFromFile() {
        if(typeof this._radFromFile == "function")
            return this._radFromFile(cpov, this);
        else
            return this._radFromFile;
    }

    set radFromFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._radFromFile = val;
        } else {
            cpov.error("fatal", "radFromFile must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get radToFile() {
        if(typeof this._radToFile == "function")
            return this._radToFile(cpov, this);
        else
            return this._radToFile;
    }

    set radToFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._radToFile = val;
        } else {
            cpov.error("fatal", "radToFile must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get radVainPretrace() {
        if(typeof this._radVainPretrace == "function")
            return this._radVainPretrace(cpov, this);
        else
            return this._radVainPretrace;
    }

    set radVainPretrace(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._radVainPretrace = val;
        } else {
            cpov.error("fatal", "radVainPretrace must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get removeBounds() {
        if(typeof this._removeBounds == "function")
            return this._removeBounds(cpov, this);
        else
            return this._removeBounds;
    }

    set removeBounds(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._removeBounds = val;
        } else {
            cpov.error("fatal", "removeBounds must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockSize() {
        if(typeof this._renderBlockSize == "function")
            return this._renderBlockSize(cpov, this);
        else
            return this._renderBlockSize;
    }

    set renderBlockSize(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 4)) {
            this._renderBlockSize = val;
        } else {
            cpov.error("fatal", "renderBlockSize must be an integer greater than or equal to 4.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get renderBlockStep() {
        if(typeof this._renderBlockStep == "function")
            return this._renderBlockStep(cpov, this);
        else
            return this._renderBlockStep;
    }

    set renderBlockStep(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._renderBlockStep = val;
        } else {
            cpov.error("fatal", "renderBlockStep must be an integer greater than or equal to 1.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get renderConsole() {
        if(typeof this._renderConsole == "function")
            return this._renderConsole(cpov, this);
        else
            return this._renderConsole;
    }

    set renderConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._renderConsole = val;
        } else {
            cpov.error("fatal", "renderConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get renderFile() {
        if(typeof this._renderFile == "function")
            return this._renderFile(cpov, this);
        else
            return this._renderFile;
    }

    set renderFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._renderFile = val;
        } else {
            cpov.error("fatal", "renderFile must be a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get renderPattern() {
        if(typeof this._renderPattern == "function")
            return this._renderPattern(cpov, this);
        else
            return this._renderPattern;
    }

    set renderPattern(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 0 && val <= 5)) {
            this._renderPattern = val;
        } else {
            cpov.error("fatal", "renderPattern must be an integer in the range (0 - 5).", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get samplingMethod() {
        if(typeof this._samplingMethod == "function")
            return this._samplingMethod(cpov, this);
        else
            return this._samplingMethod;
    }

    set samplingMethod(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 2)) {
            this._samplingMethod = val;
        } else {
            cpov.error("fatal", "samplingMethod must be an integer in the range (1 - 2).", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get splitUnions() {
        if(typeof this._splitUnions == "function")
            return this._splitUnions(cpov, this);
        else
            return this._splitUnions;
    }

    set splitUnions(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnions = val;
        } else {
            cpov.error("fatal", "splitUnions must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get startColumn() {
        if(typeof this._startColumn == "function")
            return this._startColumn(cpov, this);
        else
            return this._startColumn;
    }

    set startColumn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._startColumn = val;
        } else {
            cpov.error("fatal", "startColumn must be an integer greater than or equal to zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get startRow() {
        if(typeof this._startRow == "function")
            return this._startRow(cpov, this);
        else
            return this._startRow;
    }

    set startRow(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._startRow = val;
        } else {
            cpov.error("fatal", "startRow must be an integer greater than or equal to zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get statisticConsole() {
        if(typeof this._statisticConsole == "function")
            return this._statisticConsole(cpov, this);
        else
            return this._statisticConsole;
    }

    set statisticConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._statisticConsole = val;
        } else {
            cpov.error("fatal", "statisticConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get statisticFile() {
        if(typeof this._statisticFile == "function")
            return this._statisticFile(cpov, this);
        else
            return this._statisticFile;
    }

    set statisticFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean || cpov.isNonEmptyString(val))) {
            this._statisticFile = val;
        } else {
            cpov.error("fatal", "statisticFile must be a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get testAbort() {
        if(typeof this._testAbort == "function")
            return this._testAbort(cpov, this);
        else
            return this._testAbort;
    }

    set testAbort(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._testAbort = val;
        } else {
            cpov.error("fatal", "testAbort must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get testAbortCount() {
        if(typeof this._testAbortCount == "function")
            return this._testAbortCount(cpov, this);
        else
            return this._testAbortCount;
    }

    set testAbortCount(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1)) {
            this._testAbortCount = val;
        } else {
            cpov.error("fatal", "testAbortCount must be an integer greater than or equal to one.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get userAbortCommand() {
        if(typeof this._userAbortCommand == "function")
            return this._userAbortCommand(cpov, this);
        else
            return this._userAbortCommand;
    }

    set userAbortCommand(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isNonEmptyString(val))) {
            this._userAbortCommand = val;
        } else {
            cpov.error("fatal", "userAbortCommand must be a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get userAbortReturn() {
        if(typeof this._userAbortReturn == "function")
            return this._userAbortReturn(cpov, this);
        else
            return this._userAbortReturn;
    }

    set userAbortReturn(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isKey(val, cpov.returnActions))) {
            this._userAbortReturn = val;
        } else {
            cpov.error("fatal", "userAbortReturn must be one of 'I', 'S', 'A', 'Q', 'U', 'F', '-I', '-S', '-A', '-Q', '-U', '-F', '!I', '!S', '!A', '!Q', '!U', or '!F'.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get verbose() {
        if(typeof this._verbose == "function")
            return this._verbose(cpov, this);
        else
            return this._verbose;
    }

    set verbose(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._verbose = val;
        } else {
            cpov.error("fatal", "verbose must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get videoMode() {
        if(typeof this._videoMode == "function")
            return this._videoMode(cpov, this);
        else
            return this._videoMode;
    }

    set videoMode(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isString(val) && val.length == 1)) {
            this._videoMode = val;
        } else {
            cpov.error("fatal", "videoMode must be a single character.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get warningConsole() {
        if(typeof this._warningConsole == "function")
            return this._warningConsole(cpov, this);
        else
            return this._warningConsole;
    }

    set warningConsole(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val))) {
            this._warningConsole = val;
        } else {
            cpov.error("fatal", "warningConsole must be a boolean.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get warningFile() {
        if(typeof this._warningFile == "function")
            return this._warningFile(cpov, this);
        else
            return this._warningFile;
    }

    set warningFile(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isBoolean(val) || cpov.isNonEmptyString(val))) {
            this._warningFile = val;
        } else {
            cpov.error("fatal", "warningFile must be a boolean or a non-empty string.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get warningLevel() {
        if(typeof this._warningLevel == "function")
            return this._warningLevel(cpov, this);
        else
            return this._warningLevel;
    }

    set warningLevel(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && cpov.isKey(val, cpov.warningLevels))) {
            this._warningLevel = val;
        } else {
            cpov.error("fatal", "warningLevel must be one of 0, 5, or 10.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get width() {
        if(typeof this._width == "function")
            return this._width(cpov, this);
        else
            return this._width;
    }

    set width(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val > 0)) {
            this._width = val;
        } else {
            cpov.error("fatal", "width must be an integer greater than zero.", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------

    get workThreads() {
        if(typeof this._workThreads == "function")
            return this._workThreads(cpov, this);
        else
            return this._workThreads;
    }

    set workThreads(val) {
        if(cpov.isNullOrJSFunction(val) || (cpov.isInt(val) && val >= 1 && val <= 512)) {
            this._workThreads = val;
        } else {
            cpov.error("fatal", "workThreads must be an integer in the range (1 - 512).", "ImageOptions", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new ImageOptions();

        newObj.allConsole          = this.allConsole;         
        newObj.allFile             = this.allFile;            
        newObj.antialias           = this.antialias;          
        newObj.antialiasDepth      = this.antialiasDepth;     
        newObj.antialiasGamma      = this.antialiasGamma;     
        newObj.antialiasThreshold  = this.antialiasThreshold; 
        newObj.appendFile          = this.appendFile;         
        newObj.bitsPerColor        = this.bitsPerColor;       
        newObj.bounding            = this.bounding;           
        newObj.boundingMethod      = this.boundingMethod;     
        newObj.boundingThreshold   = this.boundingThreshold;  
        newObj.bspBaseAccessCost   = this.bspBaseAccessCost;  
        newObj.bspChildAccessCost  = this.bspChildAccessCost; 
        newObj.bspIsectCost        = this.bspIsectCost;       
        newObj.bspMaxDepth         = this.bspMaxDepth;        
        newObj.bspMissChance       = this.bspMissChance;      
        newObj.debugConsole        = this.debugConsole;       
        newObj.debugFile           = this.debugFile;          
        newObj.display             = this.display;            
        newObj.displayGamma        = this.displayGamma;       
        newObj.dither              = this.dither;             
        newObj.ditherMethod        = this.ditherMethod;       
        newObj.endColumn           = this.endColumn;          
        newObj.endRow              = this.endRow;             
        newObj.exePath             = this.exePath;            
        newObj.fatalConsole        = this.fatalConsole;       
        newObj.fatalErrorCommand   = this.fatalErrorCommand;  
        newObj.fatalErrorReturn    = this.fatalErrorReturn;   
        newObj.fatalFile           = this.fatalFile;          
        newObj.fileGamma           = this.fileGamma;          
        newObj.height              = this.height;             
        newObj.highReproducibility = this.highReproducibility;
        newObj.includeHeaders      = this.includeHeaders;     
        newObj.inputFileName       = this.inputFileName;      
        newObj.jitter              = this.jitter;             
        newObj.jitterAmount        = this.jitterAmount;       
        newObj.libraryPath         = this.libraryPath;        
        newObj.maxImageBuffer      = this.maxImageBuffer;     
        newObj.outputAlpha         = this.outputAlpha;        
        newObj.outputFileName      = this.outputFileName;     
        newObj.outputFileType      = this.outputFileType;     
        newObj.outputToFile        = this.outputToFile;       
        newObj.palette             = this.palette;            
        newObj.pauseWhenDone       = this.pauseWhenDone;      
        newObj.postSceneCommand    = this.postSceneCommand;   
        newObj.postSceneReturn     = this.postSceneReturn;    
        newObj.preSceneCommand     = this.preSceneCommand;    
        newObj.preSceneReturn      = this.preSceneReturn;     
        newObj.previewEndSize      = this.previewEndSize;     
        newObj.previewStartSize    = this.previewStartSize;   
        newObj.quality             = this.quality;            
        newObj.radFileName         = this.radFileName;        
        newObj.radFromFile         = this.radFromFile;        
        newObj.radToFile           = this.radToFile;          
        newObj.radVainPretrace     = this.radVainPretrace;    
        newObj.removeBounds        = this.removeBounds;       
        newObj.renderBlockSize     = this.renderBlockSize;    
        newObj.renderBlockStep     = this.renderBlockStep;    
        newObj.renderConsole       = this.renderConsole;      
        newObj.renderFile          = this.renderFile;         
        newObj.renderPattern       = this.renderPattern;      
        newObj.samplingMethod      = this.samplingMethod;     
        newObj.splitUnions         = this.splitUnions;        
        newObj.startColumn         = this.startColumn;        
        newObj.startRow            = this.startRow;           
        newObj.statisticConsole    = this.statisticConsole;   
        newObj.statisticFile       = this.statisticFile;      
        newObj.testAbort           = this.testAbort;          
        newObj.testAbortCount      = this.testAbortCount;     
        newObj.userAbortCommand    = this.userAbortCommand;   
        newObj.userAbortReturn     = this.userAbortReturn;    
        newObj.verbose             = this.verbose;            
        newObj.videoMode           = this.videoMode;          
        newObj.warningConsole      = this.warningConsole;     
        newObj.warningFile         = this.warningFile;        
        newObj.warningLevel        = this.warningLevel;       
        newObj.width               = this.width;              
        newObj.workThreads         = this.workThreads;        

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
    
        for(var i = 0; i < this._mutableList.length; i++) {
    
            var opt = this._mutableList[i];
    
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
                    ini.push("Bounding_Threshold=" + (this.boundingThreshold ? this.boundingThreshold : "false"));
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
                    ini.push("Display_Gamma=" + this.displayGamma);
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
                    if(this.startColumn !== null && this.endColumn <= this.startColumn)
                        cpov.error("fatal", "endColumn must be greater than startColumn.", "ImageOptions");
    
                    ini.push("End_Column=" + this.endColumn);
                    cli.push("+EC" + this.endColumn);
                    break;
    
                case "endRow":
                    if(this.startRow !== null && this.endRow <= this.startRow)
                        cpov.error("fatal", "endRow must be greater than startRow.", "ImageOptions");
    
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
    
                case "includeHeaders":
                    for(var h = 0; h < this.includeHeaders.length; h++) {
                        ini.push("Include_Header=" + this.includeHeaders[h]);
                        cli.push("+HI" + this.includeHeaders[h]);
                    }
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
                    for(var j = 0; j < this.libraryPath.length; j++) {
                        ini.push("Library_Path=" + this.libraryPath[j]);
                        cli.push("+L" + this.libraryPath[j]);
                    }
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
                    if(this.endColumn !== null && this.endColumn <= this.startColumn)
                        cpov.error("fatal", "endColumn must be greater than startColumn.", "ImageOptions");
    
                    ini.push("Start_Column=" + this.startColumn);
                    cli.push("+SC" + this.startColumn);
                    break;
    
                case "startRow":
                    if(this.endRow !== null && this.endRow <= this.startRow)
                        cpov.error("fatal", "endRow must be greater than startRow.", "ImageOptions");
    
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


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
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
        this._SDLPrepend       = null;
        this._SDLAppend        = null;
        this._satellites       = null;
        this._serial           = null;
        this._texture          = null;
        this._transform        = null;

        // Snippet constructor block //

        this.active = true;
        this.transform = new Matrix("none");
        cpov.initObject(this, options);
        
        // Create serial number and register with cpov object
        
        cpov.objectSerial++;
        this._serial = cpov.objectSerial;
        cpov.serialMap[this.serial] = this;
        
        
        // Required parameters //

        this.requiredParams = [ ];

    }

    //--------------------------------------------------------------------------

    get active() {
        if(typeof this._active == "function")
            return this._active(cpov, this);
        else if(cpov.isSDLFunction(this._active))
            return this._active.substr(1);
        else
            return this._active;
    }

    set active(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._active = val;
        } else {
            cpov.error("fatal", "active must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get baseTransform() {
        if(typeof this._baseTransform == "function")
            return this._baseTransform(cpov, this);
        else if(cpov.isSDLFunction(this._baseTransform))
            return this._baseTransform.substr(1);
        else
            return this._baseTransform;
    }

    set baseTransform(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Matrix'))) {
            this._baseTransform = val;
        } else {
            cpov.error("fatal", "baseTransform must be a Matrix.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get boundedBy() {
        if(typeof this._boundedBy == "function")
            return this._boundedBy(cpov, this);
        else if(cpov.isSDLFunction(this._boundedBy))
            return this._boundedBy.substr(1);
        else
            return this._boundedBy;
    }

    set boundedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._boundedBy = val;
        } else {
            cpov.error("fatal", "boundedBy must be a Primitive.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get clippedBy() {
        if(typeof this._clippedBy == "function")
            return this._clippedBy(cpov, this);
        else if(cpov.isSDLFunction(this._clippedBy))
            return this._clippedBy.substr(1);
        else
            return this._clippedBy;
    }

    set clippedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive') && !cpov.isClassInstance(val, ['bicubicPatch', 'disc', 'triangle', 'polygon', 'mesh', 'mesh2']))) {
            this._clippedBy = val;
        } else {
            cpov.error("fatal", "clippedBy must be a solid Primitive.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get doubleIlluminate() {
        if(typeof this._doubleIlluminate == "function")
            return this._doubleIlluminate(cpov, this);
        else if(cpov.isSDLFunction(this._doubleIlluminate))
            return this._doubleIlluminate.substr(1);
        else
            return this._doubleIlluminate;
    }

    set doubleIlluminate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._doubleIlluminate = val;
        } else {
            cpov.error("fatal", "doubleIlluminate must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get finish() {
        if(typeof this._finish == "function")
            return this._finish(cpov, this);
        else if(cpov.isSDLFunction(this._finish))
            return this._finish.substr(1);
        else
            return this._finish;
    }

    set finish(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Finish'))) {
            this._finish = val;
        } else {
            cpov.error("fatal", "finish must be a Finish.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get frameBegin() {
        if(typeof this._frameBegin == "function")
            return this._frameBegin(cpov, this);
        else if(cpov.isSDLFunction(this._frameBegin))
            return this._frameBegin.substr(1);
        else
            return this._frameBegin;
    }

    set frameBegin(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameBegin = val;
        } else {
            cpov.error("fatal", "frameBegin must be a JavaScript function.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get frameEnd() {
        if(typeof this._frameEnd == "function")
            return this._frameEnd(cpov, this);
        else if(cpov.isSDLFunction(this._frameEnd))
            return this._frameEnd.substr(1);
        else
            return this._frameEnd;
    }

    set frameEnd(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameEnd = val;
        } else {
            cpov.error("fatal", "frameEnd must be a JavaScript function.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get hollow() {
        if(typeof this._hollow == "function")
            return this._hollow(cpov, this);
        else if(cpov.isSDLFunction(this._hollow))
            return this._hollow.substr(1);
        else
            return this._hollow;
    }

    set hollow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hollow = val;
        } else {
            cpov.error("fatal", "hollow must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get id() {
        if(typeof this._id == "function")
            return this._id(cpov, this);
        else if(cpov.isSDLFunction(this._id))
            return this._id.substr(1);
        else
            return this._id;
    }

    set id(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this))) {
            this._id = val;
        } else {
            cpov.error("fatal", "id must be a unique, non-empty string.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get interior() {
        if(typeof this._interior == "function")
            return this._interior(cpov, this);
        else if(cpov.isSDLFunction(this._interior))
            return this._interior.substr(1);
        else
            return this._interior;
    }

    set interior(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Interior'))) {
            this._interior = val;
        } else {
            cpov.error("fatal", "interior must be an Interior.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get inverse() {
        if(typeof this._inverse == "function")
            return this._inverse(cpov, this);
        else if(cpov.isSDLFunction(this._inverse))
            return this._inverse.substr(1);
        else
            return this._inverse;
    }

    set inverse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._inverse = val;
        } else {
            cpov.error("fatal", "inverse must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get material() {
        if(typeof this._material == "function")
            return this._material(cpov, this);
        else if(cpov.isSDLFunction(this._material))
            return this._material.substr(1);
        else
            return this._material;
    }

    set material(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Material'))) {
            this._material = val;
        } else {
            cpov.error("fatal", "material must be a Material.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get noImage() {
        if(typeof this._noImage == "function")
            return this._noImage(cpov, this);
        else if(cpov.isSDLFunction(this._noImage))
            return this._noImage.substr(1);
        else
            return this._noImage;
    }

    set noImage(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noImage = val;
        } else {
            cpov.error("fatal", "noImage must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get noRadiosity() {
        if(typeof this._noRadiosity == "function")
            return this._noRadiosity(cpov, this);
        else if(cpov.isSDLFunction(this._noRadiosity))
            return this._noRadiosity.substr(1);
        else
            return this._noRadiosity;
    }

    set noRadiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noRadiosity = val;
        } else {
            cpov.error("fatal", "noRadiosity must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get noReflection() {
        if(typeof this._noReflection == "function")
            return this._noReflection(cpov, this);
        else if(cpov.isSDLFunction(this._noReflection))
            return this._noReflection.substr(1);
        else
            return this._noReflection;
    }

    set noReflection(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noReflection = val;
        } else {
            cpov.error("fatal", "noReflection must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get noShadow() {
        if(typeof this._noShadow == "function")
            return this._noShadow(cpov, this);
        else if(cpov.isSDLFunction(this._noShadow))
            return this._noShadow.substr(1);
        else
            return this._noShadow;
    }

    set noShadow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noShadow = val;
        } else {
            cpov.error("fatal", "noShadow must be a boolean.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------
    
    get parent() {
        if(typeof this._parent == "function")
            return this._parent(cpov, this);
        else if(cpov.isSDLFunction(this._parent))
            return this._parent.substr(1);
        else
            return this._parent;
    }
    
    set parent(val) {
        cpov.error("fatal", "parent is read-only.", "Primitive", this);
    }


    //--------------------------------------------------------------------------

    get photons() {
        if(typeof this._photons == "function")
            return this._photons(cpov, this);
        else if(cpov.isSDLFunction(this._photons))
            return this._photons.substr(1);
        else
            return this._photons;
    }

    set photons(val) {
        if(true) { // FIXME
            this._photons = val;
        } else {
            cpov.error("fatal", "photons", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get radiosity() {
        if(typeof this._radiosity == "function")
            return this._radiosity(cpov, this);
        else if(cpov.isSDLFunction(this._radiosity))
            return this._radiosity.substr(1);
        else
            return this._radiosity;
    }

    set radiosity(val) {
        if(true) { // FIXME
            this._radiosity = val;
        } else {
            cpov.error("fatal", "radiosity", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get SDLPrepend() {
        if(typeof this._SDLPrepend == "function")
            return this._SDLPrepend(cpov, this);
        else if(cpov.isSDLFunction(this._SDLPrepend))
            return this._SDLPrepend.substr(1);
        else
            return this._SDLPrepend;
    }

    set SDLPrepend(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val))) {
            this._SDLPrepend = val;
        } else {
            cpov.error("fatal", "val must be a string.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------

    get SDLAppend() {
        if(typeof this._SDLAppend == "function")
            return this._SDLAppend(cpov, this);
        else if(cpov.isSDLFunction(this._SDLAppend))
            return this._SDLAppend.substr(1);
        else
            return this._SDLAppend;
    }

    set SDLAppend(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val))) {
            this._SDLAppend = val;
        } else {
            cpov.error("fatal", "val must be a string.", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------
    
    get satellites() {
        if(typeof this._satellites == "function")
            return this._satellites(cpov, this);
        else if(cpov.isSDLFunction(this._satellites))
            return this._satellites.substr(1);
        else
            return this._satellites;
    }
    
    set satellites(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, "Primitive", 0, Infinity))) {
            this._satellites = val;
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i]._parent = this;
            }
        } else {
            cpov.error("fatal", "satellites must be an array of Primitives.", "Primitive", this);
        }
    }


    //--------------------------------------------------------------------------
    
    get serial() {
        if(typeof this._serial == "function")
            return this._serial(cpov, this);
        else if(cpov.isSDLFunction(this._serial))
            return this._serial.substr(1);
        else
            return this._serial;
    }
    
    set serial(val) {
        cpov.error("fatal", "The serial attribute is read-only.", "Primitive", this);
    }


    //--------------------------------------------------------------------------

    get texture() {
        if(typeof this._texture == "function")
            return this._texture(cpov, this);
        else if(cpov.isSDLFunction(this._texture))
            return this._texture.substr(1);
        else
            return this._texture;
    }

    set texture(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val))) {
            this._texture = val;
        } else {
            cpov.error("fatal", "texture must be a string (for now).", "Primitive", this);
        }
    }

    //--------------------------------------------------------------------------
    // CephaloPOV objects have two associated transformation matrices, transform
    // and baseTransform. The transform Matrix is what is emitted when the toSDL
    // method is called. It is also the Matrix to which subsequent
    // transformations are applied. If transform is not set (i.e., it is null)
    // when it is accessed, baseTransform is copied to it first. Conversely, if
    // transform is set before baseTransform, baseTransform will be set at the
    // same time. The transformReset method may be called to copy baseTransform
    // to transform when needed.
    //
    // The intended function of baseTransform is to serve as a default state,
    // particularly for complex objects which will be reused.
    //
    // Important: To perform operations on a transform, it is necessary that it
    // be an actual Matrix. You *can* assign an SDL function to the transforms,
    // but operations at the JS level will of course croak with an error. (If
    // you're not performing operations on it, no worries.) If a transform is JS
    // function returning a Matrix or a Matrix whose elements are JS functions,
    // it will be converted to an array of floats first.
    //
    // Extension (2/20/2019): Primitives now have a satellites attribute, which
    // is an array of other Primitives that will have the same transformations
    // applied to them as to the parent. This has the effect of keeping the
    // satellites in the same relation to the parent as at the time of their
    // definition. Mainly intended for Cameras, but there's no reason it
    // couldn't be used for other objects, though Union and Merge CSG operations
    // are probably better.
    //--------------------------------------------------------------------------
    
    get transform() {
    
        if(this._transform === null) {
            if(this._baseTransform === null) {
                return null;
            } else if(typeof this._baseTransform == "function") {
                this._transform = this._baseTransform;
            } else {
                this._transform.copyFrom(this._baseTransform);
            }
        }
    
        if(typeof this._transform == "function")
            return this._transform(cpov, this);
        else
            return this._transform;
    }
    
    set transform(val) {
    
        if(val === null) {
            this._transform = this.baseTransform;
            return;
        }
    
        if(val == "none")
            val = new Matrix("none");
    
        if(!cpov.isClassInstance(val, "Matrix") && !cpov.isNullOrFunction(val))
            cpov.error("fatal", "transform value must be a Matrix, JavaScript function, or SDL function", "Primitive.transform", this);
    
        if(this._baseTransform === null) {
            this._baseTransform = val;
            this._transform = val;
        } else {
            var val = new Matrix(val.reify());
            this._transform = this.transform.xMatrix(val);
        }
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].transform = val;
            }
        }
    
    }


    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Primitive();

        newObj.active           = this.active;          
        newObj.baseTransform    = this.baseTransform;   
        newObj.boundedBy        = this.boundedBy;       
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
        newObj.SDLPrepend       = this.SDLPrepend;      
        newObj.SDLAppend        = this.SDLAppend;       
        newObj.satellites       = this.satellites;      
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
            val._parent = this;
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
        delete cpov.serialMap[this.serial];
        if(this.id)
            delete cpov.idMap[this.id];
    }


    //------------------------------------------------------------------------------
    // Called on formerly contained objects to set their parent attribute to null.
    // Intelligently handles singletons, arrays, and functions.
    //------------------------------------------------------------------------------
    
    disown(val) {
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
            val._parent = null;
        }
    }


    //--------------------------------------------------------------------------
    
    get finite() {
    	return this._finite;
    }
    
    set finite(val) {
    	cpov.error("fatal", "finite is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
    }
    
    //--------------------------------------------------------------------------
    
    get solid() {
    	return this._solid;
    }
    
    set solid(val) {
    	cpov.error("fatal", "solid is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
    }
    
    //--------------------------------------------------------------------------
    
    get csg() {
    	return this._csg;
    }
    
    set csg(val) {
    	cpov.error("fatal", "csg is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
    }
    
    //--------------------------------------------------------------------------
    
    get csgOperand() {
    	return this._csgOperand;
    }
    
    set csgOperand(val) {
    	cpov.error("fatal", "csgOperand is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    resetTransform() {
        this._transform = new Matrix(this._baseTransform);
    }


    //--------------------------------------------------------------------------
    // Copies current SDL representation of the object to the snapshot buffer.
    //--------------------------------------------------------------------------
    
    snapshot() {
        cpov.snapshots.push(this.toSDL());
    }


    //--------------------------------------------------------------------------
    // Generates SDL from parameters.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0) {
    
        if(!this.active)
            return "";
    
        var pad = cpov.tab(stops);
        var content = [ ];
    
        if(this.clippedBy !== null) {
            content.push(pad + "clipped_by {");
            content.push(this.clippedBy.toSDL(stops + 1));
            content.push(pad + "}");
        }
    
        if(this.boundedBy !== null) {
            content.push(pad + "bounded_by {");
            if(this.boundedBy === this.clippedBy) {
                content.push(pad + "    clipped_by");
            } else {
                content.push(this.boundedBy.toSDL(stops + 1));
            }
            content.push(pad + "}");
        }
    
        if(this.noShadow)
            content.push(pad + "no_shadow");
    
        if(this.noImage)
            content.push(pad + "no_image");
    
        if(this.noRadiosity)
            content.push(pad + "no_radiosity");
    
        if(this.noReflection)
            content.push(pad + "no_reflection");
    
        if(this.inverse)
            content.push(pad + "inverse");
    
        if(this.double_illuminate)
            content.push(pad + "double_illuminate");
    
        if(this.hollow)
            content.push(pad + "hollow");
    
        // TODO: interior
        // TODO: interior_texture
        // TODO: texture (real)
    
        if(this.texture)
            content.push(pad + this.texture);
    
        // TODO: photons
        // TODO: radiosity
    
        if(this.transform !== undefined && this.transform !== null && !this.transform.isIdentityMatrix())
            content.push(this.transform.toSDL(stops));
    
        return content.join("\n");
    }


    //--------------------------------------------------------------------------
    // This set of four methods, rotate, scale, skew, and translate, are
    // convenience methods for applying transformations to Primitives. They all
    // call the corresponding Matrix methods after checking that the transform
    // member has been initialized.
    //--------------------------------------------------------------------------
    
    rotate(x, y, z) {
        if(this.transform === null)
            cpov.error("fatal", "Cannot perform rotation on uninitialized transform.", "Primitive.rotate", this);
        this.transform.rotate(x, y, z);
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].rotate(x, y, z);
            }
        }
    }
    
    scale(x, y, z) {
        if(this.transform === null)
            cpov.error("fatal", "Cannot perform scale on uninitialized transform.", "Primitive.scale", this);
        this.transform.scale(x, y, z);
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].scale(x, y, z);
            }
        }
    }
    
    skew(pairs) {
        if(this.transform === null)
            cpov.error("fatal", "Cannot perform skew on uninitialized transform.", "Primitive.skew", this);
        this.transform.skew(pairs);
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].skew(x, y, z);
            }
        }
    }
    
    translate(x, y, z) {
        if(this.transform === null)
            cpov.error("fatal", "Cannot perform translation on uninitialized transform.", "Primitive.translate", this);
        this.transform.translate(x, y, z);
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].translate(x, y, z);
            }
        }
    }


    //--------------------------------------------------------------------------
    // CephaloPOV objects have two associated transformation matrices, transform
    // and baseTransform. The transform Matrix is what is emitted when the toSDL
    // method is called. It is also the Matrix to which subsequent
    // transformations are applied. If transform is not set (i.e., it is null)
    // when it is accessed, baseTransform is copied to it first. Conversely, if
    // transform is set before baseTransform, baseTransform will be set at the
    // same time. The transformReset method may be called to copy baseTransform
    // to transform when needed.
    //
    // The intended function of baseTransform is to serve as a default state,
    // particularly for complex objects which will be reused.
    //
    // Important: To perform operations on a transform, it is necessary that it
    // be an actual Matrix. You *can* assign an SDL function to the transforms,
    // but operations at the JS level will of course croak with an error. (If
    // you're not performing operations on it, no worries.) If a transform is JS
    // function returning a Matrix or a Matrix whose elements are JS functions,
    // it will be converted to an array of floats first.
    //
    // Extension (2/20/2019): Primitives now have a satellites attribute, which
    // is an array of other Primitives that will have the same transformations
    // applied to them as to the parent. This has the effect of keeping the
    // satellites in the same relation to the parent as at the time of their
    // definition. Mainly intended for Cameras, but there's no reason it
    // couldn't be used for other objects, though Union and Merge CSG operations
    // are probably better.
    //--------------------------------------------------------------------------
    
    get transform() {
    
        if(this._transform === null) {
            if(this._baseTransform === null) {
                return null;
            } else if(typeof this._baseTransform == "function") {
                this._transform = this._baseTransform;
            } else {
                this._transform.copyFrom(this._baseTransform);
            }
        }
    
        if(typeof this._transform == "function")
            return this._transform(cpov, this);
        else
            return this._transform;
    }
    
    set transform(val) {
    
        if(val === null) {
            this._transform = this.baseTransform;
            return;
        }
    
        if(val == "none")
            val = new Matrix("none");
    
        if(!cpov.isClassInstance(val, "Matrix") && !cpov.isNullOrFunction(val))
            cpov.error("fatal", "transform value must be a Matrix, JavaScript function, or SDL function", "Primitive.transform", this);
    
        if(this._baseTransform === null) {
            this._baseTransform = val;
            this._transform = val;
        } else {
            var val = new Matrix(val.reify());
            this._transform = this.transform.xMatrix(val);
        }
    
        // Apply the transformation to any satellites... (FIXME: DRY this out)
    
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                this._satellites[i].transform = val;
            }
        }
    
    }


    //--------------------------------------------------------------------------
    // The accessors for baseTransform are much simpler than for transform. Any
    // legal value -- Matrix, JS function, SDL function, or "none" -- can be
    // stuffed into it, and except for "none", they are returned unchanged.
    //--------------------------------------------------------------------------
    
    get baseTransform() {
        return this._baseTransform;
    }
    
    set baseTransform(val) {
        if(cpov.isClassInstance(val, "Matrix") || typeof val == "function" || cpov.isSDLFunction(val))
            this._baseTransform = val;
        else if(val == "none")
            this._baseTransform = new Matrix("none");
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }



}

exports.Primitive = Primitive;


//==============================================================================
// BicubicPatch class
//==============================================================================

class BicubicPatch extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && (val == 0 || val == 1))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be either 0 or 1.", "BicubicPatch", this);
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points(cpov, this);
        else if(cpov.isSDLFunction(this._points))
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16) || (val = cpov.convertToVectorArray('VectorXYZ', val)))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of 16 VectorXYZ.", "BicubicPatch", this);
        }
    }

    //--------------------------------------------------------------------------

    get uSteps() {
        if(typeof this._uSteps == "function")
            return this._uSteps(cpov, this);
        else if(cpov.isSDLFunction(this._uSteps))
            return this._uSteps.substr(1);
        else
            return this._uSteps;
    }

    set uSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._uSteps = val;
        } else {
            cpov.error("fatal", "uSteps must be an integer.", "BicubicPatch", this);
        }
    }

    //--------------------------------------------------------------------------

    get vSteps() {
        if(typeof this._vSteps == "function")
            return this._vSteps(cpov, this);
        else if(cpov.isSDLFunction(this._vSteps))
            return this._vSteps.substr(1);
        else
            return this._vSteps;
    }

    set vSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vSteps = val;
        } else {
            cpov.error("fatal", "vSteps must be an integer.", "BicubicPatch", this);
        }
    }

    //--------------------------------------------------------------------------

    get flatness() {
        if(typeof this._flatness == "function")
            return this._flatness(cpov, this);
        else if(cpov.isSDLFunction(this._flatness))
            return this._flatness.substr(1);
        else
            return this._flatness;
    }

    set flatness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val <= 1)) {
            this._flatness = val;
        } else {
            cpov.error("fatal", "flatness must be a float in the unit interval (0.0 - 1.0).", "BicubicPatch", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "bicubic_patch {" + (this.id === null ? "" : " // " + this.id));
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
    		content.push(ppad + items.join(", ") + (row != 3 ? "," : ""));
    	}
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.BicubicPatch = BicubicPatch;


//==============================================================================
// Blob class
//==============================================================================

class Blob extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get components() {
        if(typeof this._components == "function")
            return this._components(cpov, this);
        else if(cpov.isSDLFunction(this._components))
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, ['Sphere', 'Cylinder'], 1, Infinity) && val.length)) {
            this._components = val;
            this.adopt(this._components);
        } else {
            cpov.error("fatal", "components must be an array of Spheres and/or Cylinders.", "Blob", this);
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold(cpov, this);
        else if(cpov.isSDLFunction(this._threshold))
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "Blob", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Blob", this);
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy(cpov, this);
        else if(cpov.isSDLFunction(this._hierarchy))
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Blob", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "blob {" + (this.id === null ? "" : " // " + this.id));
    	if(this.threshold !== null)
    		content.push(ppad + "threshold " + this.threshold);
        var components = this.components;
    	if(cpov.isSDLFunction(components)) {
    		content.push(ppad + this.components);
    	} else { // array
    		for(var i = 0; i < components.length; i++) {
    			content.push(components[i].toSDL(stops + 1, true));
    		}
    	}
    	if(this.hierarchy !== null)
    		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));
    	if(this.sturm)
    		content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._corner1 = null;
        this._corner2 = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "corner1", "corner2" ];

    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1(cpov, this);
        else if(cpov.isSDLFunction(this._corner1))
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Box", this);
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2(cpov, this);
        else if(cpov.isSDLFunction(this._corner2))
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2 must be a VectorXYZ.", "Box", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "box {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._type         = null;
        this._angle        = null;
        this._aperture     = null;
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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.cameraTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'perspective', 'orthographic', 'fisheye', 'ultraWideAngle', 'omnimax', 'panoramic', 'spherical', 'cylinder', or 'meshCamera'.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get angle() {
        if(typeof this._angle == "function")
            return this._angle(cpov, this);
        else if(cpov.isSDLFunction(this._angle))
            return this._angle.substr(1);
        else
            return this._angle;
    }

    set angle(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0 && val <= 360)) {
            this._angle = val;
        } else {
            cpov.error("fatal", "angle must be a float greater than zero and less than or equal to 360.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get aperture() {
        if(typeof this._aperture == "function")
            return this._aperture(cpov, this);
        else if(cpov.isSDLFunction(this._aperture))
            return this._aperture.substr(1);
        else
            return this._aperture;
    }

    set aperture(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._aperture = val;
        } else {
            cpov.error("fatal", "apertureSize must be a float.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get blurSamples() {
        if(typeof this._blurSamples == "function")
            return this._blurSamples(cpov, this);
        else if(cpov.isSDLFunction(this._blurSamples))
            return this._blurSamples.substr(1);
        else
            return this._blurSamples;
    }

    set blurSamples(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0)) {
            this._blurSamples = val;
        } else {
            cpov.error("fatal", "blurSamples must be an array of two floats greater than or equal to zero.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get bokeh() {
        if(typeof this._bokeh == "function")
            return this._bokeh(cpov, this);
        else if(cpov.isSDLFunction(this._bokeh))
            return this._bokeh.substr(1);
        else
            return this._bokeh;
    }

    set bokeh(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Color') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0)) {
            this._bokeh = val;
        } else {
            cpov.error("fatal", "bokeh must be a Color in the range <0, 0, 0> to <1, 1, 0>.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get confidence() {
        if(typeof this._confidence == "function")
            return this._confidence(cpov, this);
        else if(cpov.isSDLFunction(this._confidence))
            return this._confidence.substr(1);
        else
            return this._confidence;
    }

    set confidence(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val < 1)) {
            this._confidence = val;
        } else {
            cpov.error("fatal", "confidence must be a float.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get cylinderType() {
        if(typeof this._cylinderType == "function")
            return this._cylinderType(cpov, this);
        else if(cpov.isSDLFunction(this._cylinderType))
            return this._cylinderType.substr(1);
        else
            return this._cylinderType;
    }

    set cylinderType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0 && val < 5)) {
            this._cylinderType = val;
        } else {
            cpov.error("fatal", "cylinderType must be an integer in the range (1 - 4).", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get direction() {
        if(typeof this._direction == "function")
            return this._direction(cpov, this);
        else if(cpov.isSDLFunction(this._direction))
            return this._direction.substr(1);
        else
            return this._direction;
    }

    set direction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._direction = val;
        } else {
            cpov.error("fatal", "direction must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get focalPoint() {
        if(typeof this._focalPoint == "function")
            return this._focalPoint(cpov, this);
        else if(cpov.isSDLFunction(this._focalPoint))
            return this._focalPoint.substr(1);
        else
            return this._focalPoint;
    }

    set focalPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._focalPoint = val;
        } else {
            cpov.error("fatal", "focalPoint must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location(cpov, this);
        else if(cpov.isSDLFunction(this._location))
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get lookAt() {
        if(typeof this._lookAt == "function")
            return this._lookAt(cpov, this);
        else if(cpov.isSDLFunction(this._lookAt))
            return this._lookAt.substr(1);
        else
            return this._lookAt;
    }

    set lookAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._lookAt = val;
        } else {
            cpov.error("fatal", "lookAt must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get right() {
        if(typeof this._right == "function")
            return this._right(cpov, this);
        else if(cpov.isSDLFunction(this._right))
            return this._right.substr(1);
        else
            return this._right;
    }

    set right(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._right = val;
        } else {
            cpov.error("fatal", "right must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get sky() {
        if(typeof this._sky == "function")
            return this._sky(cpov, this);
        else if(cpov.isSDLFunction(this._sky))
            return this._sky.substr(1);
        else
            return this._sky;
    }

    set sky(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._sky = val;
        } else {
            cpov.error("fatal", "sky must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get up() {
        if(typeof this._up == "function")
            return this._up(cpov, this);
        else if(cpov.isSDLFunction(this._up))
            return this._up.substr(1);
        else
            return this._up;
    }

    set up(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._up = val;
        } else {
            cpov.error("fatal", "up must be a VectorXYZ.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get variance() {
        if(typeof this._variance == "function")
            return this._variance(cpov, this);
        else if(cpov.isSDLFunction(this._variance))
            return this._variance.substr(1);
        else
            return this._variance;
    }

    set variance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._variance = val;
        } else {
            cpov.error("fatal", "variance must be a float.", "Camera", this);
        }
    }

    //--------------------------------------------------------------------------

    get vertAngle() {
        if(typeof this._vertAngle == "function")
            return this._vertAngle(cpov, this);
        else if(cpov.isSDLFunction(this._vertAngle))
            return this._vertAngle.substr(1);
        else
            return this._vertAngle;
    }

    set vertAngle(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vertAngle = val;
        } else {
            cpov.error("fatal", "vertAngle must be an integer.", "Camera", this);
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
        newObj.aperture     = this.aperture;    
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        if(this.type == "cylinder" && this.cylinderType === null)
            cpov.error("type is cylinder but cylinderType is undefined.", "Camera.toSDL", this);
        else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null)))
            cpov.error("The orthographic camera requires either angle or up and right to be defined.", "Camera.toSDL", this);
    
        content.push(pad + "camera {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + cpov.cameraTypes[this.type] + (this.type == "cylinder" ? " " + this.cylinderType : ""));
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
        if(this.aperture !== null) {
            content.push(ppad + "aperture " + this.aperture);
            if(this.blurSamples !== null)
                content.push(ppad + "blur_samples " + this.blurSamples.join(", "));
            if(this.focalPoint !== null)
                content.push(ppad + "focal_point " + this.focalPoint.toSDL());
            if(this.confidence !== null)
                content.push(ppad + "confidence " + this.confidence);
            if(this.variance !== null)
                content.push(ppad + "variance " + this.variance);
            if(this.bokeh !== null)
                content.push(ppad + "bokeh " + this.bokeh);
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint(cpov, this);
        else if(cpov.isSDLFunction(this._basePoint))
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cone", this);
        }
    }

    //--------------------------------------------------------------------------

    get baseRadius() {
        if(typeof this._baseRadius == "function")
            return this._baseRadius(cpov, this);
        else if(cpov.isSDLFunction(this._baseRadius))
            return this._baseRadius.substr(1);
        else
            return this._baseRadius;
    }

    set baseRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._baseRadius = val;
        } else {
            cpov.error("fatal", "baseRadius must be a float.", "Cone", this);
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint(cpov, this);
        else if(cpov.isSDLFunction(this._capPoint))
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cone", this);
        }
    }

    //--------------------------------------------------------------------------

    get capRadius() {
        if(typeof this._capRadius == "function")
            return this._capRadius(cpov, this);
        else if(cpov.isSDLFunction(this._capRadius))
            return this._capRadius.substr(1);
        else
            return this._capRadius;
    }

    set capRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._capRadius = val;
        } else {
            cpov.error("fatal", "capRadius must be a float.", "Cone", this);
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open(cpov, this);
        else if(cpov.isSDLFunction(this._open))
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cone", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "cone {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.basePoint.toSDL() + ", " + this.baseRadius + ", " + this.capPoint.toSDL() + ", " + this.capRadius);
        if(this.open)
            content.push(pad + "    open");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Cone = Cone;


//==============================================================================
// Cubic class
//==============================================================================

class Cubic extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients(cpov, this);
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 20, 20))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 20 floats.", "Cubic", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Cubic", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "cubic {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + "< " + this.coefficients.join(", ") + " >");
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Cubic = Cubic;


//==============================================================================
// Cylinder class
//==============================================================================

class Cylinder extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint(cpov, this);
        else if(cpov.isSDLFunction(this._basePoint))
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cylinder", this);
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint(cpov, this);
        else if(cpov.isSDLFunction(this._capPoint))
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cylinder", this);
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius(cpov, this);
        else if(cpov.isSDLFunction(this._radius))
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Cylinder", this);
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open(cpov, this);
        else if(cpov.isSDLFunction(this._open))
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cylinder", this);
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength(cpov, this);
        else if(cpov.isSDLFunction(this._strength))
            return this._strength.substr(1);
        else
            return this._strength;
    }

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float", "Cylinder", this);
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
    
    toSDL(stops = 0, component = false) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        if(component) {
            return pad + "cylinder { " + this.basePoint.toSDL() + ", "
                + this.capPoint.toSDL() + ", " + this.radius
                + (this.strength !== null ? ", " + this.strength : "")
                + " }";
        } else {
            content.push(pad + "cylinder {" + (this.id === null ? "" : " // " + this.id));
            content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
            if(this.open)
                content.push(pad + "    open");
            var superSDL = super.toSDL(stops + 1);
            if(superSDL)
                content.push(superSDL);
            content.push(pad + "}");
            
            if(this.SDLAppend !== null)
                content.push("\n" + this.SDLAppend);
            
            // Emit satellites
            
            if(Array.isArray(this._satellites) && this._satellites.length > 0) {
                for(var i = 0; i < this._satellites.length; i++) {
                    content.push(this._satellites[i].toSDL(stops));
                }
            }
            
            return content.join("\n");
        }
    }



}

exports.Cylinder = Cylinder;


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

        this._positiveComponent  = null;
        this._negativeComponents = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "positiveComponent", "negativeComponents" ];

    }

    //--------------------------------------------------------------------------

    get positiveComponent() {
        if(typeof this._positiveComponent == "function")
            return this._positiveComponent(cpov, this);
        else if(cpov.isSDLFunction(this._positiveComponent))
            return this._positiveComponent.substr(1);
        else
            return this._positiveComponent;
    }

    set positiveComponent(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._positiveComponent = val;
            this.adopt(this._positiveComponent);
        } else {
            cpov.error("fatal", "positiveObject must be a Primitive.", "Difference", this);
        }
    }

    //--------------------------------------------------------------------------

    get negativeComponents() {
        if(typeof this._negativeComponents == "function")
            return this._negativeComponents(cpov, this);
        else if(cpov.isSDLFunction(this._negativeComponents))
            return this._negativeComponents.substr(1);
        else
            return this._negativeComponents;
    }

    set negativeComponents(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, 'Primitive'))) {
            this._negativeComponents = val;
            this.adopt(this._negativeComponents);
        } else {
            cpov.error("fatal", "negativeObjects must be an array of Primitives.", "Difference", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Difference();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.positiveComponent  = this.positiveComponent; 
        newObj.negativeComponents = this.negativeComponents;

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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "difference {" + (this.id === null ? "" : " // " + this.id));
        content.push(this.positiveComponent.toSDL(stops + 1));
        for(var i = 0; i < this.negativeComponents.length; i++) {
            content.push(this.negativeComponents[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Difference = Difference;


//==============================================================================
// Disc class
//==============================================================================

class Disc extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

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

    get center() {
        if(typeof this._center == "function")
            return this._center(cpov, this);
        else if(cpov.isSDLFunction(this._center))
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Disc", this);
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal(cpov, this);
        else if(cpov.isSDLFunction(this._normal))
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Disc", this);
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius(cpov, this);
        else if(cpov.isSDLFunction(this._radius))
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Disc", this);
        }
    }

    //--------------------------------------------------------------------------

    get holeRadius() {
        if(typeof this._holeRadius == "function")
            return this._holeRadius(cpov, this);
        else if(cpov.isSDLFunction(this._holeRadius))
            return this._holeRadius.substr(1);
        else
            return this._holeRadius;
    }

    set holeRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._holeRadius = val;
        } else {
            cpov.error("fatal", "holeRadius must be a float.", "Disc", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "disc {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.center.toSDL() + ", " + this.normal.toSDL() + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Disc = Disc;


//==============================================================================
// HeightField class
//==============================================================================

class HeightField extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._source        = null;
        this._hfType        = null;
        this._smooth        = null;
        this._waterLevel    = null;
        this._hierarchy     = null;
        this._gamma         = null;
        this._premultiplied = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "source" ];

    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source(cpov, this);
        else if(cpov.isSDLFunction(this._source))
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val) || cpov.isString(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get hfType() {
        if(typeof this._hfType == "function")
            return this._hfType(cpov, this);
        else if(cpov.isSDLFunction(this._hfType))
            return this._hfType.substr(1);
        else
            return this._hfType;
    }

    set hfType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, cpov.hfTypes))) {
            this._hfType = val;
        } else {
            cpov.error("fatal", "hfType must be one of exr, gif, hdr, iff, jpeg, pgm, png, pot, ppm, sys, tga, or tiff.", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth(cpov, this);
        else if(cpov.isSDLFunction(this._smooth))
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get waterLevel() {
        if(typeof this._waterLevel == "function")
            return this._waterLevel(cpov, this);
        else if(cpov.isSDLFunction(this._waterLevel))
            return this._waterLevel.substr(1);
        else
            return this._waterLevel;
    }

    set waterLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val <= 1)) {
            this._waterLevel = val;
        } else {
            cpov.error("fatal", "waterLevel must be a float in the unit interval (0.0 - 1.0).", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy(cpov, this);
        else if(cpov.isSDLFunction(this._hierarchy))
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get gamma() {
        if(typeof this._gamma == "function")
            return this._gamma(cpov, this);
        else if(cpov.isSDLFunction(this._gamma))
            return this._gamma.substr(1);
        else
            return this._gamma;
    }

    set gamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) || val === "sRGB")) {
            this._gamma = val;
        } else {
            cpov.error("fatal", "gamma must be a float.", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------

    get premultiplied() {
        if(typeof this._premultiplied == "function")
            return this._premultiplied(cpov, this);
        else if(cpov.isSDLFunction(this._premultiplied))
            return this._premultiplied.substr(1);
        else
            return this._premultiplied;
    }

    set premultiplied(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._premultiplied = val;
        } else {
            cpov.error("fatal", "premult must be a boolean.", "HeightField", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new HeightField();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.source        = this.source;       
        newObj.hfType        = this.hfType;       
        newObj.smooth        = this.smooth;       
        newObj.waterLevel    = this.waterLevel;   
        newObj.hierarchy     = this.hierarchy;    
        newObj.gamma         = this.gamma;        
        newObj.premultiplied = this.premultiplied;

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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "height_field {" + (this.id === null ? "" : " // " + this.id));
        if(cpov.isSDLFunction(this.source)) {
            content.push(pad + "    " + this.userFunc);
        } else {
            content.push(
                ppad
                + (this.hfType === null ? "" : (this.hfType + " "))
                + '"' + this.source + '" '
                + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
                + (this.premultiplied === null ? "" : "premultiplied " + (this.premultiplied ? "on" : "off"))
            );
        }
    
        if(this.smooth === true)
            content.push(pad + "    smooth");
        if(this.waterLevel !== null)
            content.push(pad + "    water_level " + this.waterLevel);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.HeightField = HeightField;


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

        this._components = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "components" ];

    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components(cpov, this);
        else if(cpov.isSDLFunction(this._components))
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, 'Primitive'))) {
            this._components = val;
            this.adopt(this._components);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Intersection", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Intersection();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.components = this.components;

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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "intersection {" + (this.id === null ? "" : " // " + this.id));
        for(var i = 0; i < this.components.length; i++) {
            content.push(this.components[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Intersection = Intersection;


//==============================================================================
// IsoSurface class
//==============================================================================

class IsoSurface extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get source() {
        if(typeof this._source == "function")
            return this._source(cpov, this);
        else if(cpov.isSDLFunction(this._source))
            return this._source.substr(1);
        else
            return this._source;
    }

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source must be an SDL function.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy(cpov, this);
        else if(cpov.isSDLFunction(this._containedBy))
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Sphere') || cpov.isClassInstance(val, 'Box'))) {
            this._containedBy = val;
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or a Box.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold(cpov, this);
        else if(cpov.isSDLFunction(this._threshold))
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy(cpov, this);
        else if(cpov.isSDLFunction(this._accuracy))
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient(cpov, this);
        else if(cpov.isSDLFunction(this._maxGradient))
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get evaluate() {
        if(typeof this._evaluate == "function")
            return this._evaluate(cpov, this);
        else if(cpov.isSDLFunction(this._evaluate))
            return this._evaluate.substr(1);
        else
            return this._evaluate;
    }

    set evaluate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 3, 3))) {
            this._evaluate = val;
        } else {
            cpov.error("fatal", "evaluate must be an array of three floats.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open(cpov, this);
        else if(cpov.isSDLFunction(this._open))
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "IsoSurface", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxTrace() {
        if(typeof this._maxTrace == "function")
            return this._maxTrace(cpov, this);
        else if(cpov.isSDLFunction(this._maxTrace))
            return this._maxTrace.substr(1);
        else
            return this._maxTrace;
    }

    set maxTrace(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections'))) {
            this._maxTrace = val;
        } else {
            cpov.error("fatal", "maxTrace must be either an integer or 'allIntersections'.", "IsoSurface", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "isosurface {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.source);
        if(this.containedBy !== null)
            content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(2) + "\n" + ppad + "}");
        if(this.threshold !== null)
            content.push(ppad + "threshold " + this.threshold);
        if(this.accuracy !== null)
            content.push(ppad + "accuracy " + this.accuracy);
        if(this.maxGradient !== null)
            content.push(ppad + "max_gradient " + this.maxGradient);
        if(this.evaluate !== null)
            content.push(ppad + "evaluate " + this.evaluate.join(", "));
        if(this.open)
            content.push(ppad + "open");
        if(this.maxTrace !== null)
            content.push(ppad + "max_trace " + this.maxTrace);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, cpov.juliaFractalTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of hypercomplex:acos, hypercomplex:acosh, hypercomplex:asin, hypercomplex:atan, hypercomplex:atanh, hypercomplex:cos, hypercomplex:cosh, hypercomplex:cube, hypercomplex:exp, hypercomplex:ln, hypercomplex:pwr, hypercomplex:reciprocal, hypercomplex:sin, hypercomplex:sinh, hypercomplex:sqr, hypercomplex:tan, hypercomplex:tanh, quaternion:cube, or quaternion:sqr.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get juliaParam() {
        if(typeof this._juliaParam == "function")
            return this._juliaParam(cpov, this);
        else if(cpov.isSDLFunction(this._juliaParam))
            return this._juliaParam.substr(1);
        else
            return this._juliaParam;
    }

    set juliaParam(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val)))) {
            this._juliaParam = val;
        } else {
            cpov.error("fatal", "juliaParam must be a VectorXYZW.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get power() {
        if(typeof this._power == "function")
            return this._power(cpov, this);
        else if(cpov.isSDLFunction(this._power))
            return this._power.substr(1);
        else
            return this._power;
    }

    set power(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXY') || (val = cpov.convertToVector('VectorXY', val)))) {
            this._power = val;
        } else {
            cpov.error("fatal", "power must be a VectorXY.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxIter() {
        if(typeof this._maxIter == "function")
            return this._maxIter(cpov, this);
        else if(cpov.isSDLFunction(this._maxIter))
            return this._maxIter.substr(1);
        else
            return this._maxIter;
    }

    set maxIter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._maxIter = val;
        } else {
            cpov.error("fatal", "maxIter must be an integer.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get precision() {
        if(typeof this._precision == "function")
            return this._precision(cpov, this);
        else if(cpov.isSDLFunction(this._precision))
            return this._precision.substr(1);
        else
            return this._precision;
    }

    set precision(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precision = val;
        } else {
            cpov.error("fatal", "precision must be an integer.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get slice() {
        if(typeof this._slice == "function")
            return this._slice(cpov, this);
        else if(cpov.isSDLFunction(this._slice))
            return this._slice.substr(1);
        else
            return this._slice;
    }

    set slice(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val)))) {
            this._slice = val;
        } else {
            cpov.error("fatal", "slice must be a VectorXYZW.", "JuliaFractal", this);
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance(cpov, this);
        else if(cpov.isSDLFunction(this._distance))
            return this._distance.substr(1);
        else
            return this._distance;
    }

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "JuliaFractal", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
    	if((this.slice !== null && this.distance === null) || (this.slice === null && this.distance !== null))
    		cpov.error("fatal", "To use either, both slice and distance must be specified together.", "JuliaFractal.toSDL", this);
    
    	var parts = this.type.split(/:/);
    
        content.push(pad + "julia_fractal {" + (this.id === null ? "" : " // " + this.id));
    	content.push(ppad + this.juliaParam.toSDL());
    	content.push(ppad + parts[0]); // algebra type
        if(this.type == "hypercomplex:pwr") {
            if(this.power === null) {
                cpov.error("fatal", "For JuliaFractal type \"hypercomplex:pwr\", power must be defined.", "JuliaFractal.toSDL", this);
            } else {
                content.push(ppad + "pwr(" + this.power.x + ", " + this.power.y + ")");
            }
        } else {
        	content.push(ppad + parts[1]); // function type
        }
    	if(this.maxIter !== null)
    		content.push(ppad + "max_iteration " + this.maxIter);
    	if(this.precision !== null)
    		content.push(ppad + "precision " + this.precision);
    	if(this.slice !== null)
    		content.push(ppad + "slice " + this.slice.toSDL() + ", " + this.distance);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.splineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'cubicSpline', 'linearSpline', or 'quadraticSpline'.", "Lathe", this);
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points(cpov, this);
        else if(cpov.isSDLFunction(this._points))
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity) || (val = cpov.convertToVectorArray('VectorXY', val)))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of VectorXY.", "Lathe", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Lathe", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
    	if(this.type == "linearSpline" && this.points.length < 2)
            cpov.error("fatal", "A linear spline requires at least two points.", "Lathe.toSDL", this);
       	else if(this.type == "quadraticSpline" && this.points.length < 3)
            cpov.error("fatal", "A quadratic spline requires at least three points.", "Lathe.toSDL", this);
       	else if(this.type == "cubicSpline" && this.points.length < 4)
            cpov.error("fatal", "A quadratic spline requires at least four points.", "Lathe.toSDL", this);
       	else if(this.type == "bezierSpline" && this.points.length < 4)
            cpov.error("fatal", "A quadratic spline requires at least four points.", "Lathe.toSDL", this);
    
        content.push(pad + "lathe {" + (this.id === null ? "" : " // " + this.id));
    	content.push(ppad + cpov.splineTypes[this.type]);
    
    	var items = [ ];
    	for(var i = 0; i < this.points.length; i++)
    		items.push(this.points[i].toSDL());
    	content.push(ppad + items.length + ", " + items.join(", "));
    
    	if(this.sturm)
    		content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = true; 

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

        this.requiredParams = [ "location", "color", "type" ];

    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location(cpov, this);
        else if(cpov.isSDLFunction(this._location))
            return this._location.substr(1);
        else
            return this._location;
    }

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get color() {
        if(typeof this._color == "function")
            return this._color(cpov, this);
        else if(cpov.isSDLFunction(this._color))
            return this._color.substr(1);
        else
            return this._color;
    }

    set color(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Color') || (val = cpov.convertToVector('Color', val)))) {
            this._color = val;
        } else {
            cpov.error("fatal", "color must be a Color.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get adaptive() {
        if(typeof this._adaptive == "function")
            return this._adaptive(cpov, this);
        else if(cpov.isSDLFunction(this._adaptive))
            return this._adaptive.substr(1);
        else
            return this._adaptive;
    }

    set adaptive(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._adaptive = val;
        } else {
            cpov.error("fatal", "adaptive must be an integer greater than or equal to zero.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get areaIllumination() {
        if(typeof this._areaIllumination == "function")
            return this._areaIllumination(cpov, this);
        else if(cpov.isSDLFunction(this._areaIllumination))
            return this._areaIllumination.substr(1);
        else
            return this._areaIllumination;
    }

    set areaIllumination(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaIllumination = val;
        } else {
            cpov.error("fatal", "areaIllumination must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get areaLight() {
        if(typeof this._areaLight == "function")
            return this._areaLight(cpov, this);
        else if(cpov.isSDLFunction(this._areaLight))
            return this._areaLight.substr(1);
        else
            return this._areaLight;
    }

    set areaLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaLight = val;
        } else {
            cpov.error("fatal", "areaLight must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get axis1() {
        if(typeof this._axis1 == "function")
            return this._axis1(cpov, this);
        else if(cpov.isSDLFunction(this._axis1))
            return this._axis1.substr(1);
        else
            return this._axis1;
    }

    set axis1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._axis1 = val;
        } else {
            cpov.error("fatal", "axis1 must be a VectorXYZ.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get axis2() {
        if(typeof this._axis2 == "function")
            return this._axis2(cpov, this);
        else if(cpov.isSDLFunction(this._axis2))
            return this._axis2.substr(1);
        else
            return this._axis2;
    }

    set axis2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._axis2 = val;
        } else {
            cpov.error("fatal", "axis2 must be a VectorXYZ.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get circular() {
        if(typeof this._circular == "function")
            return this._circular(cpov, this);
        else if(cpov.isSDLFunction(this._circular))
            return this._circular.substr(1);
        else
            return this._circular;
    }

    set circular(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._circular = val;
        } else {
            cpov.error("fatal", "circular must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get fadeDistance() {
        if(typeof this._fadeDistance == "function")
            return this._fadeDistance(cpov, this);
        else if(cpov.isSDLFunction(this._fadeDistance))
            return this._fadeDistance.substr(1);
        else
            return this._fadeDistance;
    }

    set fadeDistance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0.)) {
            this._fadeDistance = val;
        } else {
            cpov.error("fatal", "fadeDistance must be a float greater than zero.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get fadePower() {
        if(typeof this._fadePower == "function")
            return this._fadePower(cpov, this);
        else if(cpov.isSDLFunction(this._fadePower))
            return this._fadePower.substr(1);
        else
            return this._fadePower;
    }

    set fadePower(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._fadePower = val;
        } else {
            cpov.error("fatal", "fadePower must be a float.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get falloff() {
        if(typeof this._falloff == "function")
            return this._falloff(cpov, this);
        else if(cpov.isSDLFunction(this._falloff))
            return this._falloff.substr(1);
        else
            return this._falloff;
    }

    set falloff(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90.)) {
            this._falloff = val;
        } else {
            cpov.error("fatal", "falloff must be a float less than 90.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get jitter() {
        if(typeof this._jitter == "function")
            return this._jitter(cpov, this);
        else if(cpov.isSDLFunction(this._jitter))
            return this._jitter.substr(1);
        else
            return this._jitter;
    }

    set jitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get looksLike() {
        if(typeof this._looksLike == "function")
            return this._looksLike(cpov, this);
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
            cpov.error("fatal", "looksLike must be a Primitive.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get mediaAttenuation() {
        if(typeof this._mediaAttenuation == "function")
            return this._mediaAttenuation(cpov, this);
        else if(cpov.isSDLFunction(this._mediaAttenuation))
            return this._mediaAttenuation.substr(1);
        else
            return this._mediaAttenuation;
    }

    set mediaAttenuation(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaAttenuation = val;
        } else {
            cpov.error("fatal", "mediaAttenuation must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get mediaInteraction() {
        if(typeof this._mediaInteraction == "function")
            return this._mediaInteraction(cpov, this);
        else if(cpov.isSDLFunction(this._mediaInteraction))
            return this._mediaInteraction.substr(1);
        else
            return this._mediaInteraction;
    }

    set mediaInteraction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaInteraction = val;
        } else {
            cpov.error("fatal", "mediaInteraction must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get orient() {
        if(typeof this._orient == "function")
            return this._orient(cpov, this);
        else if(cpov.isSDLFunction(this._orient))
            return this._orient.substr(1);
        else
            return this._orient;
    }

    set orient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._orient = val;
        } else {
            cpov.error("fatal", "orient must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get parallel() {
        if(typeof this._parallel == "function")
            return this._parallel(cpov, this);
        else if(cpov.isSDLFunction(this._parallel))
            return this._parallel.substr(1);
        else
            return this._parallel;
    }

    set parallel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._parallel = val;
        } else {
            cpov.error("fatal", "parallel must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get pointAt() {
        if(typeof this._pointAt == "function")
            return this._pointAt(cpov, this);
        else if(cpov.isSDLFunction(this._pointAt))
            return this._pointAt.substr(1);
        else
            return this._pointAt;
    }

    set pointAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._pointAt = val;
        } else {
            cpov.error("fatal", "pointAt must be a VectorXYZ.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get projectedThrough() {
        if(typeof this._projectedThrough == "function")
            return this._projectedThrough(cpov, this);
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
            cpov.error("fatal", "projectedThrough", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius(cpov, this);
        else if(cpov.isSDLFunction(this._radius))
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90)) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float less than 90.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get shadowless() {
        if(typeof this._shadowless == "function")
            return this._shadowless(cpov, this);
        else if(cpov.isSDLFunction(this._shadowless))
            return this._shadowless.substr(1);
        else
            return this._shadowless;
    }

    set shadowless(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._shadowless = val;
        } else {
            cpov.error("fatal", "shadowless must be a boolean.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get size1() {
        if(typeof this._size1 == "function")
            return this._size1(cpov, this);
        else if(cpov.isSDLFunction(this._size1))
            return this._size1.substr(1);
        else
            return this._size1;
    }

    set size1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._size1 = val;
        } else {
            cpov.error("fatal", "size1 must be an integer greater than or equal to zero.", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get size2() {
        if(typeof this._size2 == "function")
            return this._size2(cpov, this);
        else if(cpov.isSDLFunction(this._size2))
            return this._size2.substr(1);
        else
            return this._size2;
    }

    set size2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 0)) {
            this._size2 = val;
        } else {
            cpov.error("fatal", "undefined", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get tightness() {
        if(typeof this._tightness == "function")
            return this._tightness(cpov, this);
        else if(cpov.isSDLFunction(this._tightness))
            return this._tightness.substr(1);
        else
            return this._tightness;
    }

    set tightness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val <= 100)) {
            this._tightness = val;
        } else {
            cpov.error("fatal", "tightness must be a float in the range (0 - 100).", "LightSource", this);
        }
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val) && (cpov.isInArray(val, cpov.lightTypes)))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of point, spotlight, or cylinder.", "LightSource", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "light_source {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.location.toSDL() + ", " + this.color.toSDL());
    
        if(this.type !== null && this.type != "point")
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
            content.push(ppad + "point_at " + this.pointAt.toSDL());
    
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

        this._components = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "components" ];

    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components(cpov, this);
        else if(cpov.isSDLFunction(this._components))
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, 'Primitive'))) {
            this._components = val;
            this.adopt(this._components);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Merge", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Merge();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.components = this.components;

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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "merge {" + (this.id === null ? "" : " // " + this.id));
        for(var i = 0; i < this.components.length; i++) {
            content.push(this.components[i].toSDL(stops + 1));
        }
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Merge = Merge;


//==============================================================================
// Mesh class
//==============================================================================

class Mesh extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

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

    get triangles() {
        if(typeof this._triangles == "function")
            return this._triangles(cpov, this);
        else if(cpov.isSDLFunction(this._triangles))
            return this._triangles.substr(1);
        else
            return this._triangles;
    }

    set triangles(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Triangle', 1, Infinity))) {
            this._triangles = val;
        } else {
            cpov.error("fatal", "triangles", "Mesh", this);
        }
    }

    //--------------------------------------------------------------------------

    get insideVector() {
        if(typeof this._insideVector == "function")
            return this._insideVector(cpov, this);
        else if(cpov.isSDLFunction(this._insideVector))
            return this._insideVector.substr(1);
        else
            return this._insideVector;
    }

    set insideVector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._insideVector = val;
        } else {
            cpov.error("fatal", "insideVector must be a VectorXYZ.", "Mesh", this);
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy(cpov, this);
        else if(cpov.isSDLFunction(this._hierarchy))
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Mesh", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "mesh {" + (this.id === null ? "" : " // " + this.id));
        for(var i = 0; i < this.triangles.length; i++) {
            content.push(this.triangles[i].toSDL(1));
        }
        if(this.insideVector !== null)
            content.push(ppad + "inside_vector " + this.insideVector.toSDL());
    	if(this.hierarchy !== null)
    		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Mesh = Mesh;


//==============================================================================
// Ovus class
//==============================================================================

class Ovus extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._bottomRadius = null;
        this._topRadius    = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "bottomRadius", "topRadius" ];

    }

    //--------------------------------------------------------------------------

    get bottomRadius() {
        if(typeof this._bottomRadius == "function")
            return this._bottomRadius(cpov, this);
        else if(cpov.isSDLFunction(this._bottomRadius))
            return this._bottomRadius.substr(1);
        else
            return this._bottomRadius;
    }

    set bottomRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bottomRadius = val;
        } else {
            cpov.error("fatal", "bottomRadius must be a float.", "Ovus", this);
        }
    }

    //--------------------------------------------------------------------------

    get topRadius() {
        if(typeof this._topRadius == "function")
            return this._topRadius(cpov, this);
        else if(cpov.isSDLFunction(this._topRadius))
            return this._topRadius.substr(1);
        else
            return this._topRadius;
    }

    set topRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._topRadius = val;
        } else {
            cpov.error("fatal", "topRadius must be a float.", "Ovus", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "ovus {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.bottomRadius + ", " + this.topRadius);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get funcX() {
        if(typeof this._funcX == "function")
            return this._funcX(cpov, this);
        else if(cpov.isSDLFunction(this._funcX))
            return this._funcX.substr(1);
        else
            return this._funcX;
    }

    set funcX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcX = val;
        } else {
            cpov.error("fatal", "funcX must be an SDL function.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get funcY() {
        if(typeof this._funcY == "function")
            return this._funcY(cpov, this);
        else if(cpov.isSDLFunction(this._funcY))
            return this._funcY.substr(1);
        else
            return this._funcY;
    }

    set funcY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcY = val;
        } else {
            cpov.error("fatal", "funcY must be an SDL function.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get funcZ() {
        if(typeof this._funcZ == "function")
            return this._funcZ(cpov, this);
        else if(cpov.isSDLFunction(this._funcZ))
            return this._funcZ.substr(1);
        else
            return this._funcZ;
    }

    set funcZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSDLFunction(val))) {
            this._funcZ = val;
        } else {
            cpov.error("fatal", "funcZ must be an SDL function.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get uv1() {
        if(typeof this._uv1 == "function")
            return this._uv1(cpov, this);
        else if(cpov.isSDLFunction(this._uv1))
            return this._uv1.substr(1);
        else
            return this._uv1;
    }

    set uv1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val)))) {
            this._uv1 = val;
        } else {
            cpov.error("fatal", "uv1 must be a VectorUV.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get uv2() {
        if(typeof this._uv2 == "function")
            return this._uv2(cpov, this);
        else if(cpov.isSDLFunction(this._uv2))
            return this._uv2.substr(1);
        else
            return this._uv2;
    }

    set uv2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val)))) {
            this._uv2 = val;
        } else {
            cpov.error("fatal", "uv2 must be a VectorUV.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy(cpov, this);
        else if(cpov.isSDLFunction(this._containedBy))
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'Sphere') || cpov.isClassInstance(val, 'Box'))) {
            this._containedBy = val;
            this.adopt(this._containedBy);
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or Box.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient(cpov, this);
        else if(cpov.isSDLFunction(this._maxGradient))
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy(cpov, this);
        else if(cpov.isSDLFunction(this._accuracy))
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get precomputeDepth() {
        if(typeof this._precomputeDepth == "function")
            return this._precomputeDepth(cpov, this);
        else if(cpov.isSDLFunction(this._precomputeDepth))
            return this._precomputeDepth.substr(1);
        else
            return this._precomputeDepth;
    }

    set precomputeDepth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precomputeDepth = val;
        } else {
            cpov.error("fatal", "precomputeDepth must be an integer.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get precomputeX() {
        if(typeof this._precomputeX == "function")
            return this._precomputeX(cpov, this);
        else if(cpov.isSDLFunction(this._precomputeX))
            return this._precomputeX.substr(1);
        else
            return this._precomputeX;
    }

    set precomputeX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeX = val;
        } else {
            cpov.error("fatal", "precomputeX must be a boolean.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get precomputeY() {
        if(typeof this._precomputeY == "function")
            return this._precomputeY(cpov, this);
        else if(cpov.isSDLFunction(this._precomputeY))
            return this._precomputeY.substr(1);
        else
            return this._precomputeY;
    }

    set precomputeY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeY = val;
        } else {
            cpov.error("fatal", "precomputeY must be a boolean.", "Parametric", this);
        }
    }

    //--------------------------------------------------------------------------

    get precomputeZ() {
        if(typeof this._precomputeZ == "function")
            return this._precomputeZ(cpov, this);
        else if(cpov.isSDLFunction(this._precomputeZ))
            return this._precomputeZ.substr(1);
        else
            return this._precomputeZ;
    }

    set precomputeZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeZ = val;
        } else {
            cpov.error("fatal", "precomputeZ must be a boolean.", "Parametric", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
    	content.push(pad + "parametric {" + (this.id === null ? "" : " // " + this.id));
    	content.push(ppad + this.funcX);
        content.push(ppad + this.funcY);
        content.push(ppad + this.funcZ);
        content.push(ppad + this.uv1.toSDL() + ", " + this.uv2.toSDL());
    
        if(this.containedBy)
            content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(stops + 2) + "\n" + ppad + "}");
        if(this.maxGradient !== null)
            content.push(ppad + "max_gradient " + this.maxGradient);
        if(this.accuracy !== null)
            content.push(ppad + "accuracy " + this.accuracy);
        if(this.precomputeDepth) {
            if(this.precomputeX || this.precomputeY || this.precomputeZ) {
                var items = [ ];
                if(this.precomputeX)
                    items.push("x");
                if(this.precomputeY)
                    items.push("y");
                if(this.precomputeZ)
                    items.push("z");
                content.push(ppad + "precompute " + this.precomputeDepth + " " + items.join(", "));
            } else {
                cpov.error("fatal", "When using precomputeDepth, at least one of precomputeX, precomputeY, or precomputeZ must also be defined.", "Parametric.toSDL", this);
            }
        }
    
    	var superSDL = super.toSDL(stops + 1);
    	if(superSDL)
    	    content.push(superSDL);
    	content.push(pad + "}");
    	
    	if(this.SDLAppend !== null)
    	    content.push("\n" + this.SDLAppend);
    	
    	// Emit satellites
    	
    	if(Array.isArray(this._satellites) && this._satellites.length > 0) {
    	    for(var i = 0; i < this._satellites.length; i++) {
    	        content.push(this._satellites[i].toSDL(stops));
    	    }
    	}
    	
    	return content.join("\n");
    
    }



}

exports.Parametric = Parametric;


//==============================================================================
// Plane class
//==============================================================================

class Plane extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._normal   = null;
        this._distance = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "normal", "distance" ];

    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal(cpov, this);
        else if(cpov.isSDLFunction(this._normal))
            return this._normal.substr(1);
        else
            return this._normal;
    }

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Plane", this);
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance(cpov, this);
        else if(cpov.isSDLFunction(this._distance))
            return this._distance.substr(1);
        else
            return this._distance;
    }

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "Plane", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
    	content.push(pad + "plane {" + (this.id === null ? "" : " // " + this.id));
    	content.push(ppad + this.normal.toSDL() + ", " + this.distance);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get order() {
        if(typeof this._order == "function")
            return this._order(cpov, this);
        else if(cpov.isSDLFunction(this._order))
            return this._order.substr(1);
        else
            return this._order;
    }

    set order(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val >= 2 && val <= 35)) {
            this._order = val;
        } else {
            cpov.error("fatal", "order must be an integer in the range (2 - 35).", "Poly", this);
        }
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients(cpov, this);
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 1, Infinity))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of floats.", "Poly", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Poly", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;
    
        if(this.coefficients.length != ccnt)
            cpov.error("fatal", "A Poly of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Poly.toSDL", this);
    
    	content.push(pad + "poly {" + (this.id === null ? "" : " // " + this.id));
        var items = this.coefficients.slice(0);
    	content.push(ppad + this.order + ", < " + items.join(", ") + " >");
        if(this.sturm)
            content.push(ppad + "sturm")
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    
    }



}

exports.Poly = Poly;


//==============================================================================
// Polygon class
//==============================================================================

class Polygon extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._points = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "points" ];

    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points(cpov, this);
        else if(cpov.isSDLFunction(this._points))
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 3, Infinity) || (val = cpov.convertToVectorArray("VectorXY", val)))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of three or more VectorXY.", "Polygon", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
      	if(this.points.length < 3)
    		cpov.error("fatal", "points must contain at least three VectorXY.", "Polygon.toSDL", this);
    
    	content.push(pad + "polygon {" + (this.id === null ? "" : " // " + this.id));
    	content.push(ppad + this.points.length + ",");
        var items = [ ];
        for(var i = 0; i < this.points.length; i++) {
            items.push(this.points[i].toSDL());
        }
        content.push(ppad + items.join(", "));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    
    }



}

exports.Polygon = Polygon;


//==============================================================================
// Polynomial class
//==============================================================================

class Polynomial extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get order() {
        if(typeof this._order == "function")
            return this._order(cpov, this);
        else if(cpov.isSDLFunction(this._order))
            return this._order.substr(1);
        else
            return this._order;
    }

    set order(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._order = val;
        } else {
            cpov.error("fatal", "order must be an integer.", "Polynomial", this);
        }
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients(cpov, this);
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXYZW', 1, Infinity) || (val = cpov.convertToVectorArray("VectorXYZW", val)))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be a VectorXYZW.", "Polynomial", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Polynomial", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;
    
        /* // FIXME
        if(this.coefficients.length != ccnt)
            cpov.error("fatal", "A Polynomial of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Polynomial.toSDL", this);
        */
    
    	content.push(pad + "polynomial {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.order + ", ");
        var coefficients = [ ];
        for(var i = 0; i < this.coefficients.length; i++)
            coefficients.push(ppad + "xyz(" + this.coefficients[i].x + ", " + this.coefficients[i].y + ", " + this.coefficients[i].z + "):" + this.coefficients[i].w);
        content.push(coefficients.join(",\n"))
        if(this.sturm)
            content.push(ppad + "sturm")
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    
    }



}

exports.Polynomial = Polynomial;


//==============================================================================
// Prism class
//==============================================================================

class Prism extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.prismTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'conicSweep', 'cubicSpline', 'linearSpline', 'linearSweep', or 'quadraticSpline'.", "Prism", this);
        }
    }

    //--------------------------------------------------------------------------

    get height1() {
        if(typeof this._height1 == "function")
            return this._height1(cpov, this);
        else if(cpov.isSDLFunction(this._height1))
            return this._height1.substr(1);
        else
            return this._height1;
    }

    set height1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height1 = val;
        } else {
            cpov.error("fatal", "height1 must be a float.", "Prism", this);
        }
    }

    //--------------------------------------------------------------------------

    get height2() {
        if(typeof this._height2 == "function")
            return this._height2(cpov, this);
        else if(cpov.isSDLFunction(this._height2))
            return this._height2.substr(1);
        else
            return this._height2;
    }

    set height2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height2 = val;
        } else {
            cpov.error("fatal", "height2 must be a float", "Prism", this);
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points(cpov, this);
        else if(cpov.isSDLFunction(this._points))
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity) || (val = cpov.convertToVectorArray("VectorXY", val)))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of VectorXY.", "Prism", this);
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open(cpov, this);
        else if(cpov.isSDLFunction(this._open))
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Prism", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Prism", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
      	if(this.points.length < 3)
    		cpov.error("fatal", "points must contain at least three VectorXY.", "Prism.toSDL", this);
    
    	content.push(pad + "prism {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + cpov.prismTypes[this.type]);
        content.push(ppad + this.height1 + ", " + this.height2 + ", " + this.points.length + ",");
        var items = [ ];
        for(var i = 0; i < this.points.length; i++) {
            items.push(this.points[i].toSDL());
        }
        content.push(ppad + items.join(", "));
        if(this.open)
            content.push(ppad + "open");
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    
    }



}

exports.Prism = Prism;


//==============================================================================
// Quadric class
//==============================================================================

class Quadric extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._coefficients = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients(cpov, this);
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 10, 10))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 10 floats.", "Quadric", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "quadric {" + (this.id === null ? "" : " // " + this.id));
        content.push(
            ppad
            + "<" + this.coefficients[0] + ", " + this.coefficients[1] + ", " + this.coefficients[2] + ">, "
            + "<" + this.coefficients[3] + ", " + this.coefficients[4] + ", " + this.coefficients[5] + ">, "
            + "<" + this.coefficients[6] + ", " + this.coefficients[7] + ", " + this.coefficients[8] + ">, "
            + this.coefficients[9]
        );
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Quadric = Quadric;


//==============================================================================
// Quartic class
//==============================================================================

class Quartic extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = false;
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._coefficients = null;
        this._sturm        = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "coefficients" ];

    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients(cpov, this);
        else if(cpov.isSDLFunction(this._coefficients))
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 35, 35))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 35 floats.", "Quartic", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Quartic", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "quartic {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + "< " + this.coefficients.join(", ") + " >");
        if(this.sturm)
            content.push(ppad + "sturm");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Quartic = Quartic;


//==============================================================================
// Sphere class
//==============================================================================

class Sphere extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get center() {
        if(typeof this._center == "function")
            return this._center(cpov, this);
        else if(cpov.isSDLFunction(this._center))
            return this._center.substr(1);
        else
            return this._center;
    }

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Sphere", this);
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius(cpov, this);
        else if(cpov.isSDLFunction(this._radius))
            return this._radius.substr(1);
        else
            return this._radius;
    }

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Sphere", this);
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength(cpov, this);
        else if(cpov.isSDLFunction(this._strength))
            return this._strength.substr(1);
        else
            return this._strength;
    }

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float.", "Sphere", this);
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
    // any necessary attributes are undefined. This and the Cylinder.toSDL
    // method take an optional second argument, component, which will emit code
    // appropriate for a Blob component if true.
    //--------------------------------------------------------------------------
    
    toSDL(stops = 0, component = false) {
    
        if(!this.active)
            return "";
        
        super.requiredParameterTest(this.requiredParams);
        
        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        if(component) {
            return pad + "sphere { " + this.center.toSDL() + ", " + this.radius
                + (this.strength !== null ? ", " + this.strength : "")
                + " }";
        } else {
            content.push(pad + "sphere {" + (this.id === null ? "" : " // " + this.id));
            content.push(ppad + this.center.toSDL() + ", " + this.radius);
            var superSDL = super.toSDL(stops + 1);
            if(superSDL)
                content.push(superSDL);
            content.push(pad + "}");
            
            if(this.SDLAppend !== null)
                content.push("\n" + this.SDLAppend);
            
            // Emit satellites
            
            if(Array.isArray(this._satellites) && this._satellites.length > 0) {
                for(var i = 0; i < this._satellites.length; i++) {
                    content.push(this._satellites[i].toSDL(stops));
                }
            }
            
            return content.join("\n");
        }
    
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get type() {
        if(typeof this._type == "function")
            return this._type(cpov, this);
        else if(cpov.isSDLFunction(this._type))
            return this._type.substr(1);
        else
            return this._type;
    }

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.internalSplineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'linearSpline', 'bezierSpline', or 'cubicSpline'.", "SphereSweep", this);
        }
    }

    //--------------------------------------------------------------------------

    get spheres() {
        if(typeof this._spheres == "function")
            return this._spheres(cpov, this);
        else if(cpov.isSDLFunction(this._spheres))
            return this._spheres.substr(1);
        else
            return this._spheres;
    }

    set spheres(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Sphere', 2, Infinity))) {
            this._spheres = val;
            this.adopt(this._spheres);
        } else {
            cpov.error("fatal", "spheres must be an an array of two or more Sphere.", "SphereSweep", this);
        }
    }

    //--------------------------------------------------------------------------

    get tolerance() {
        if(typeof this._tolerance == "function")
            return this._tolerance(cpov, this);
        else if(cpov.isSDLFunction(this._tolerance))
            return this._tolerance.substr(1);
        else
            return this._tolerance;
    }

    set tolerance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._tolerance = val;
        } else {
            cpov.error("fatal", "tolerance must be a float.", "SphereSweep", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        if(this.type == "linearSpline" && this.spheres.length < 2)
            cpov.error("fatal", "A linear spline requires at least two spheres.", "SphereSweep.toSDL", this);
        else if((this.type == "bezierSpline" || this.type == "cubicSpline") && this.spheres.length < 4)
            cpov.error("fatal", "Bezier and cubic splines require at least four spheres.", "SphereSweep.toSDL", this);
    
        content.push(pad + "sphere_sweep {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + cpov.internalSplineTypes[this.type]);
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
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

        // Mutable properties //

        this._e = null;
        this._n = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "e", "n" ];

    }

    //--------------------------------------------------------------------------

    get e() {
        if(typeof this._e == "function")
            return this._e(cpov, this);
        else if(cpov.isSDLFunction(this._e))
            return this._e.substr(1);
        else
            return this._e;
    }

    set e(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._e = val;
        } else {
            cpov.error("fatal", "e must be a float.", "Superellipsoid", this);
        }
    }

    //--------------------------------------------------------------------------

    get n() {
        if(typeof this._n == "function")
            return this._n(cpov, this);
        else if(cpov.isSDLFunction(this._n))
            return this._n.substr(1);
        else
            return this._n;
    }

    set n(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._n = val;
        } else {
            cpov.error("fatal", "n must be a float.", "Superellipsoid", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "superellipsoid {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + "<" + this.e + ", " + this.n + ">");
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get points() {
        if(typeof this._points == "function")
            return this._points(cpov, this);
        else if(cpov.isSDLFunction(this._points))
            return this._points.substr(1);
        else
            return this._points;
    }

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity) || (val = cpov.convertToVectorArray('VectorXY', val)))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of two or more VectorXY.", "Sor", this);
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open(cpov, this);
        else if(cpov.isSDLFunction(this._open))
            return this._open.substr(1);
        else
            return this._open;
    }

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Sor", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Sor", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "sor {" + (this.id === null ? "" : " // " + this.id));
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
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get fontType() {
        if(typeof this._fontType == "function")
            return this._fontType(cpov, this);
        else if(cpov.isSDLFunction(this._fontType))
            return this._fontType.substr(1);
        else
            return this._fontType;
    }

    set fontType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.fontTypes))) {
            this._fontType = val;
        } else {
            cpov.error("fatal", "fontType must be one of 'ttf', or 'ttc'.", "Text", this);
        }
    }

    //--------------------------------------------------------------------------

    get font() {
        if(typeof this._font == "function")
            return this._font(cpov, this);
        else if(cpov.isSDLFunction(this._font))
            return this._font.substr(1);
        else
            return this._font;
    }

    set font(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._font = val;
        } else {
            cpov.error("fatal", "font must be a non-empty string.", "Text", this);
        }
    }

    //--------------------------------------------------------------------------

    get displayText() {
        if(typeof this._displayText == "function")
            return this._displayText(cpov, this);
        else if(cpov.isSDLFunction(this._displayText))
            return this._displayText.substr(1);
        else
            return this._displayText;
    }

    set displayText(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._displayText = val;
        } else {
            cpov.error("fatal", "displayText must be a non-empty string.", "Text", this);
        }
    }

    //--------------------------------------------------------------------------

    get thickness() {
        if(typeof this._thickness == "function")
            return this._thickness(cpov, this);
        else if(cpov.isSDLFunction(this._thickness))
            return this._thickness.substr(1);
        else
            return this._thickness;
    }

    set thickness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._thickness = val;
        } else {
            cpov.error("fatal", "thickness must be a float.", "Text", this);
        }
    }

    //--------------------------------------------------------------------------

    get offset() {
        if(typeof this._offset == "function")
            return this._offset(cpov, this);
        else if(cpov.isSDLFunction(this._offset))
            return this._offset.substr(1);
        else
            return this._offset;
    }

    set offset(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._offset = val;
        } else {
            cpov.error("fatal", "offset must be a float.", "Text", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        // TODO: Handle escaping of double quotes in this.displayText
    
        content.push(pad + "text {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.fontType + " " + "\"" + this.font + "\" \"" + this.displayText.replace(/"/g, "\\\"") + "\"");
        content.push(ppad + this.thickness + ", " + this.offset);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
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

        this._finite     = true; 
        this._solid      = true; 
        this._csg        = false;
        this._csgOperand = false;

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

    get majorRadius() {
        if(typeof this._majorRadius == "function")
            return this._majorRadius(cpov, this);
        else if(cpov.isSDLFunction(this._majorRadius))
            return this._majorRadius.substr(1);
        else
            return this._majorRadius;
    }

    set majorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._majorRadius = val;
        } else {
            cpov.error("fatal", "majorRadius must be a float.", "Torus", this);
        }
    }

    //--------------------------------------------------------------------------

    get minorRadius() {
        if(typeof this._minorRadius == "function")
            return this._minorRadius(cpov, this);
        else if(cpov.isSDLFunction(this._minorRadius))
            return this._minorRadius.substr(1);
        else
            return this._minorRadius;
    }

    set minorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._minorRadius = val;
        } else {
            cpov.error("fatal", "minorRadius must be a float.", "Torus", this);
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm(cpov, this);
        else if(cpov.isSDLFunction(this._sturm))
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Torus", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "torus {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.majorRadius + ", " + this.minorRadius);
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    
    }



}

exports.Torus = Torus;


//==============================================================================
// The Triangle class combines POV-Ray's triangle and smooth_triangle based on 
// the supplied parameters and the smooth flag.
//==============================================================================

class Triangle extends Primitive {

    constructor(options) {

        // Superclass constructor //

        super(options);

        // Immutable properties //

        this._finite     = true; 
        this._solid      = false;
        this._csg        = false;
        this._csgOperand = false;

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

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1(cpov, this);
        else if(cpov.isSDLFunction(this._corner1))
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2(cpov, this);
        else if(cpov.isSDLFunction(this._corner2))
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get corner3() {
        if(typeof this._corner3 == "function")
            return this._corner3(cpov, this);
        else if(cpov.isSDLFunction(this._corner3))
            return this._corner3.substr(1);
        else
            return this._corner3;
    }

    set corner3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._corner3 = val;
        } else {
            cpov.error("fatal", "corner3 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth(cpov, this);
        else if(cpov.isSDLFunction(this._smooth))
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get normal1() {
        if(typeof this._normal1 == "function")
            return this._normal1(cpov, this);
        else if(cpov.isSDLFunction(this._normal1))
            return this._normal1.substr(1);
        else
            return this._normal1;
    }

    set normal1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal1 = val;
        } else {
            cpov.error("fatal", "normal1 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get normal2() {
        if(typeof this._normal2 == "function")
            return this._normal2(cpov, this);
        else if(cpov.isSDLFunction(this._normal2))
            return this._normal2.substr(1);
        else
            return this._normal2;
    }

    set normal2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal2 = val;
        } else {
            cpov.error("fatal", "normal2 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get normal3() {
        if(typeof this._normal3 == "function")
            return this._normal3(cpov, this);
        else if(cpov.isSDLFunction(this._normal3))
            return this._normal3.substr(1);
        else
            return this._normal3;
    }

    set normal3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClassInstance(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val)))) {
            this._normal3 = val;
        } else {
            cpov.error("fatal", "normal3 must be a VectorXYZ.", "Triangle", this);
        }
    }

    //--------------------------------------------------------------------------

    get textures() {
        if(typeof this._textures == "function")
            return this._textures(cpov, this);
        else if(cpov.isSDLFunction(this._textures))
            return this._textures.substr(1);
        else
            return this._textures;
    }

    set textures(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInt(val))) {
            this._textures = val;
        } else {
            cpov.error("fatal", "textures must be an array of integers.", "Triangle", this);
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        if(!this.smooth) {
    
            content.push(pad + "triangle {" + (this.id === null ? "" : " // " + this.id));
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
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Triangle = Triangle;


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

        this._components = null;
        this._splitUnion = null;

        // Initialization //

        cpov.initObject(this, options);

        // Required parameters //

        this.requiredParams = [ "components" ];

    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components(cpov, this);
        else if(cpov.isSDLFunction(this._components))
            return this._components.substr(1);
        else
            return this._components;
    }

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, 'Primitive'))) {
            this._components = val;
            this.adopt(this._components);
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Union", this);
        }
    }

    //--------------------------------------------------------------------------

    get splitUnion() {
        if(typeof this._splitUnion == "function")
            return this._splitUnion(cpov, this);
        else if(cpov.isSDLFunction(this._splitUnion))
            return this._splitUnion.substr(1);
        else
            return this._splitUnion;
    }

    set splitUnion(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnion = val;
        } else {
            cpov.error("fatal", "splitUnion must be a boolean.", "Union", this);
        }
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        var newObj = new Union();

        newObj.copyCommonFrom(this); // copy Primitive attributes
        newObj.components = this.components;
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
        
        if(this.SDLPrepend !== null)
            content.push(this.SDLPrepend + "\n");
    
        content.push(pad + "union {" + (this.id === null ? "" : " // " + this.id));
        for(var i = 0; i < this.components.length; i++) {
            content.push(this.components[i].toSDL(stops + 1));
        }
    
        var splitUnion = this._splitUnion !== null ? this._splitUnion : cpov.imageOptions.splitUnions;
    
        content.push(pad + "    split_union " + (splitUnion ? "on" : "off"));
    
        var superSDL = super.toSDL(stops + 1);
        if(superSDL)
            content.push(superSDL);
        content.push(pad + "}");
        
        if(this.SDLAppend !== null)
            content.push("\n" + this.SDLAppend);
        
        // Emit satellites
        
        if(Array.isArray(this._satellites) && this._satellites.length > 0) {
            for(var i = 0; i < this._satellites.length; i++) {
                content.push(this._satellites[i].toSDL(stops));
            }
        }
        
        return content.join("\n");
    }



}

exports.Union = Union;


//==============================================================================
// VectorXY class
//==============================================================================

class VectorXY {

    constructor(options) {

        // Mutable properties //

        this._x = null;
        this._y = null;

        // Snippet constructor block //

        if(options !== undefined) {
            if(cpov.isClassInstance(options, "VectorXY")) { // copy
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
        }
        
        
        // Required parameters //

        this.requiredParams = [ "x", "y" ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x(cpov, this);
        else if(cpov.isSDLFunction(this._x))
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float or a function returning a float.", "VectorXY", this);
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y(cpov, this);
        else if(cpov.isSDLFunction(this._y))
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float or a function returning a float.", "VectorXY", this);
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
    
        this.requiredParameterTest(this.requiredParams);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ">";
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }


    //--------------------------------------------------------------------------
    // Returns the VectorXY as an array [x, y] based on mode, which may be one
    // of:
    //
    //     normal ... This is the default. Returns an array in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------
    
    asArray(mode = "normal") {
    
        var result = [ ];
        var source = [ this._x, this._y ];
    
        switch(mode) {
    
            case "normal":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else
                        result[i] = source[i];
                }
                break;
    
            case "literal":
                result = source;
                break;
    
            case "calc":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        return null;
                    else
                        result[i] = source[i];
                }
                break;
    
            case "sdl":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        result[i] = source[i].substr(1);
                    else
                        result[i] = source[i];
                }
                break;
    
            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXY.asArray", this);
                break;
        }
    
        return result;
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

        if(options !== undefined) {
            if(cpov.isClassInstance(options, "VectorUV")) { // copy
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
        }
        
        
        // Required parameters //

        this.requiredParams = [ "u", "v" ];

    }

    //--------------------------------------------------------------------------

    get u() {
        if(typeof this._u == "function")
            return this._u(cpov, this);
        else if(cpov.isSDLFunction(this._u))
            return this._u.substr(1);
        else
            return this._u;
    }

    set u(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._u = val;
        } else {
            cpov.error("fatal", "u must be a float or a function returning a float.", "VectorUV", this);
        }
    }

    //--------------------------------------------------------------------------

    get v() {
        if(typeof this._v == "function")
            return this._v(cpov, this);
        else if(cpov.isSDLFunction(this._v))
            return this._v.substr(1);
        else
            return this._v;
    }

    set v(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._v = val;
        } else {
            cpov.error("fatal", "v must be a float or a function returning a float.", "VectorUV", this);
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
    
        this.requiredParameterTest(this.requiredParams);
    
        return cpov.tab(stops) + "<" + this.u + ", " + this.v + ">";
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }


    //--------------------------------------------------------------------------
    // Returns the VectorUV as an array [u, v] based on mode, which may be one
    // of:
    //
    //     normal ... This is the default. Returns an array in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------
    
    asArray(mode = "normal") {
    
        var result = [ ];
        var source = [ this._u, this._v ];
    
        switch(mode) {
    
            case "normal":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else
                        result[i] = source[i];
                }
                break;
    
            case "literal":
                result = source;
                break;
    
            case "calc":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        return null;
                    else
                        result[i] = source[i];
                }
                break;
    
            case "sdl":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        result[i] = source[i].substr(1);
                    else
                        result[i] = source[i];
                }
                break;
    
            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorUV.asArray", this);
                break;
        }
    
        return result;
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

        if(options !== undefined) {
            if(cpov.isClassInstance(options, "VectorXYZ")) { // copy
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
        }
        
        
        // Required parameters //

        this.requiredParams = [ "x", "y", "z" ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x(cpov, this);
        else if(cpov.isSDLFunction(this._x))
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float or a function returning a float.", "VectorXYZ", this);
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y(cpov, this);
        else if(cpov.isSDLFunction(this._y))
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float or a function returning a float.", "VectorXYZ", this);
        }
    }

    //--------------------------------------------------------------------------

    get z() {
        if(typeof this._z == "function")
            return this._z(cpov, this);
        else if(cpov.isSDLFunction(this._z))
            return this._z.substr(1);
        else
            return this._z;
    }

    set z(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._z = val;
        } else {
            cpov.error("fatal", "z must be a float or a function returning a float.", "VectorXYZ", this);
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
    
        this.requiredParameterTest(this.requiredParams);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ">";
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }


    //--------------------------------------------------------------------------
    // Returns the VectorXYZ as an array [x,y,z] based on mode, which may be one
    // of:
    //
    //     normal ... This is the default. Returns an array in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------
    
    asArray(mode = "normal") {
    
        var result = [ ];
        var source = [ this._x, this._y, this._z ];
    
        switch(mode) {
    
            case "normal":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else
                        result[i] = source[i];
                }
                break;
    
            case "literal":
                result = source;
                break;
    
            case "calc":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        return null;
                    else
                        result[i] = source[i];
                }
                break;
    
            case "sdl":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        result[i] = source[i].substr(1);
                    else
                        result[i] = source[i];
                }
                break;
    
            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXYZ.asArray", this);
                break;
        }
    
        return result;
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

        if(options !== undefined) {
            if(cpov.isClassInstance(options, "VectorXYZW")) { // copy
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
        }
        
        
        // Required parameters //

        this.requiredParams = [ "x", "y", "z", "w" ];

    }

    //--------------------------------------------------------------------------

    get x() {
        if(typeof this._x == "function")
            return this._x(cpov, this);
        else if(cpov.isSDLFunction(this._x))
            return this._x.substr(1);
        else
            return this._x;
    }

    set x(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._x = val;
        } else {
            cpov.error("fatal", "x must be a float or a function returning a float.", "VectorXYZW", this);
        }
    }

    //--------------------------------------------------------------------------

    get y() {
        if(typeof this._y == "function")
            return this._y(cpov, this);
        else if(cpov.isSDLFunction(this._y))
            return this._y.substr(1);
        else
            return this._y;
    }

    set y(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._y = val;
        } else {
            cpov.error("fatal", "y must be a float or a function returning a float.", "VectorXYZW", this);
        }
    }

    //--------------------------------------------------------------------------

    get z() {
        if(typeof this._z == "function")
            return this._z(cpov, this);
        else if(cpov.isSDLFunction(this._z))
            return this._z.substr(1);
        else
            return this._z;
    }

    set z(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._z = val;
        } else {
            cpov.error("fatal", "z must be a float or a function returning a float.", "VectorXYZW", this);
        }
    }

    //--------------------------------------------------------------------------

    get w() {
        if(typeof this._w == "function")
            return this._w(cpov, this);
        else if(cpov.isSDLFunction(this._w))
            return this._w.substr(1);
        else
            return this._w;
    }

    set w(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._w = val;
        } else {
            cpov.error("fatal", "w must be a float or a function returning a float.", "VectorXYZW", this);
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
    
        this.requiredParameterTest(this.requiredParams);
    
        return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }


    //--------------------------------------------------------------------------
    // Returns the VectorXYZW as an array [x,y,z,w] based on mode, which may be
    // one of:
    //
    //     normal ... This is the default. Returns an array in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------
    
    asArray(mode = "normal") {
    
        var result = [ ];
        var source = [ this._x, this._y, this._z, this._w ];
    
        switch(mode) {
    
            case "normal":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else
                        result[i] = source[i];
                }
                break;
    
            case "literal":
                result = source;
                break;
    
            case "calc":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        return null;
                    else
                        result[i] = source[i];
                }
                break;
    
            case "sdl":
                for(var i = 0; i < source.length; i++) {
                    if(typeof source[i] == "function")
                        result[i] = source[i](cpov, this);
                    else if(cpov.isSDLFunction(source[i]))
                        result[i] = source[i].substr(1);
                    else
                        result[i] = source[i];
                }
                break;
    
            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXYZ.asArray", this);
                break;
        }
    
        return result;
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

        if(options !== undefined) {
            if(cpov.isClassInstance(options, "Color")) { // copy
                options = {
                    r: options.r === undefined ? null : options.r,
                    g: options.g === undefined ? null : options.g,
                    b: options.b === undefined ? null : options.b,
                    f: options.f === undefined ? null : options.f,
                    t: options.t === undefined ? null : options.t,
                    srgb: options.srgb === undefined ? null : options.srgb
                };
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
        }
        
        
        // Required parameters //

        this.requiredParams = [ "r", "g", "b" ];

    }

    //--------------------------------------------------------------------------

    get r() {
        if(typeof this._r == "function")
            return this._r(cpov, this);
        else if(cpov.isSDLFunction(this._r))
            return this._r.substr(1);
        else
            return this._r;
    }

    set r(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._r = val;
        } else {
            cpov.error("fatal", "r must be a float or a function returning a float.", "Color", this);
        }
    }

    //--------------------------------------------------------------------------

    get g() {
        if(typeof this._g == "function")
            return this._g(cpov, this);
        else if(cpov.isSDLFunction(this._g))
            return this._g.substr(1);
        else
            return this._g;
    }

    set g(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._g = val;
        } else {
            cpov.error("fatal", "g must be a float or a function returning a float.", "Color", this);
        }
    }

    //--------------------------------------------------------------------------

    get b() {
        if(typeof this._b == "function")
            return this._b(cpov, this);
        else if(cpov.isSDLFunction(this._b))
            return this._b.substr(1);
        else
            return this._b;
    }

    set b(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._b = val;
        } else {
            cpov.error("fatal", "undefined", "Color", this);
        }
    }

    //--------------------------------------------------------------------------

    get f() {
        if(typeof this._f == "function")
            return this._f(cpov, this);
        else if(cpov.isSDLFunction(this._f))
            return this._f.substr(1);
        else
            return this._f;
    }

    set f(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._f = val;
        } else {
            cpov.error("fatal", "f must be a float or a function returning a float.", "Color", this);
        }
    }

    //--------------------------------------------------------------------------

    get t() {
        if(typeof this._t == "function")
            return this._t(cpov, this);
        else if(cpov.isSDLFunction(this._t))
            return this._t.substr(1);
        else
            return this._t;
    }

    set t(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._t = val;
        } else {
            cpov.error("fatal", "t must be a float or a function returning a float.", "Color", this);
        }
    }

    //--------------------------------------------------------------------------

    get srgb() {
        if(typeof this._srgb == "function")
            return this._srgb(cpov, this);
        else if(cpov.isSDLFunction(this._srgb))
            return this._srgb.substr(1);
        else
            return this._srgb;
    }

    set srgb(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._srgb = val;
        } else {
            cpov.error("fatal", "srgb must be a boolean.", "Color", this);
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
    
        this.requiredParameterTest(this.requiredParams);
    
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


    //------------------------------------------------------------------------------
    // Produces a minimal RGB vector literal -- <0.5, 0.2, 1.0> -- as is needed in
    // globalSettings and other places.
    //------------------------------------------------------------------------------
    
    toPlainRGBVector(stops = 0) {
    
        stops = cpov.tab(stops);
    
        if(this.r === null)
            cpov.error("fatal", "r is undefined.", "Color.toSDL", this);
        if(this.g === null)
            cpov.error("fatal", "g is undefined.", "Color.toSDL", this);
        if(this.b === null)
            cpov.error("fatal", "b is undefined.", "Color.toSDL", this);
    
        return stops + " <" + this.r + ", " + this.g + ", " + this.b + ">";
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
                + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
        }
    }


    //------------------------------------------------------------------------------
    // Sets multiple attributes at once using an object.
    //------------------------------------------------------------------------------
    
    xset(vals) {
    	cpov.initObject(this, vals);
    }



}

exports.Color = Color;


//==============================================================================
// Matrix class. This was originally generated along with the Vector/Color
// classes, but the need for efficient computation that I couldn't readily get
// from codegen made it easier to copy the original generated code over to
// the snippets file and use it as a starting point for a largely hand-coded
// class.
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

		if(v00 == "none") // identity matrix
			return;

        if(cpov.isClassInstance(v00, "Matrix")) {  // make a copy of an existing Matrix
            for(var i = 0; i < 12; i++) {
                this.raw[i] = v00.raw[i];
            }
        }

		if(Array.isArray(v01)) {
            for(var i = 0; i < v01.length; i++) {
                if(!(cpov.isNullOrFunction(v01[i]) || cpov.isFloat(v01[i])))
                    cpov.error("fatal", "When given as an array, v01 must be an array of three floats.", "Matrix", this);
            }
			v10 = v01[2]; v02 = v01[1]; v01 = v01[0];
		}


		if(cpov.isArrayOfFloats(v00) && v00.length == 12) {

			this.raw = v00.slice(0);

		} else if(v00 == "scale") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                this.raw[0] = v01; // x
                this.raw[4] = v02; // y
                this.raw[8] = v10; // z

            } else {
                cpov.error("fatal", "All arguments to \"scale\" short form must be floats or functions returning floats.", "Matrix", this);
            }

        } else if(v00 == "rotate") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                if(v01 != 0) {                             // X
                    this.raw = Matrix._xMatrix(this.raw, [
                        1,              0,             0,
                        0,  Math.cos(cpov.deg2rad(v01)), Math.sin(cpov.deg2rad(v01)),
                        0, -Math.sin(cpov.deg2rad(v01)), Math.cos(cpov.deg2rad(v01)),
                        0,              0,             0
                    ]);
                }

                if(v02 != 0) {                             // Y
                    this.raw = Matrix._xMatrix(this.raw, [
                        Math.cos(cpov.deg2rad(v02)), 0, -Math.sin(cpov.deg2rad(v02)),
                        0,             1,              0,
                        Math.sin(cpov.deg2rad(v02)), 0,  Math.cos(cpov.deg2rad(v02)),
                        0,             0,              0
                    ]);
                }

                if(v10 != 0) {                             // Z
                    this.raw = Matrix._xMatrix(this.raw, [
                         Math.cos(cpov.deg2rad(v10)), Math.sin(cpov.deg2rad(v10)), 0,
                        -Math.sin(cpov.deg2rad(v10)), Math.cos(cpov.deg2rad(v10)), 0,
                                     0,             0, 1,
                                     0,             0, 0
                    ]);
                }

            } else {
                cpov.error("fatal", "All arguments to \"rotate\" short form must be floats or functions returning floats.", "Matrix", this);
            }

        } else if(v00 == "translate") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                this.raw[9]  = v01; // x
                this.raw[10] = v02; // y
                this.raw[11] = v10; // z

            } else {
                cpov.error("fatal", "All arguments to \"translate\" short form must be floats or functions returning floats.", "Matrix", this);
            }

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

            var vals = [ v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32 ];

            for(var i = 0; i < vals.length; i++) {
                if(!(cpov.isNullOrFunction(vals[i]) || cpov.isFloat(vals[i])))
                    cpov.error("fatal", "All arguments to full form of constructor must be floats or functions returning floats.", "Matrix", this);
            }

            this.raw = vals;

        }


    }

    //--------------------------------------------------------------------------

    get v00() {
        if(typeof this.raw[0] == "function")
            return this.raw[0](cpov, this);
        else if(cpov.isSDLFunction(this.raw[0]))
            return this.raw[0].substr(1);
        else
            return this.raw[0];
    }

    set v00(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[0] = val;
        } else {
            cpov.error("fatal", "v00 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v01() {
        if(typeof this.raw[1] == "function")
            return this.raw[1](cpov, this);
        else if(cpov.isSDLFunction(this.raw[1]))
            return this.raw[1].substr(1);
        else
            return this.raw[1];
    }

    set v01(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[1] = val;
        } else {
            cpov.error("fatal", "v01 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v02() {
        if(typeof this.raw[2] == "function")
            return this.raw[2](cpov, this);
        else if(cpov.isSDLFunction(this.raw[2]))
            return this.raw[2].substr(1);
        else
            return this.raw[2];
    }

    set v02(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[2] = val;
        } else {
            cpov.error("fatal", "v02 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v10() {
        if(typeof this.raw[3] == "function")
            return this.raw[3](cpov, this);
        else if(cpov.isSDLFunction(this.raw[3]))
            return this.raw[3].substr(1);
        else
            return this.raw[3];
    }

    set v10(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[3] = val;
        } else {
            cpov.error("fatal", "v10 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v11() {
        if(typeof this.raw[4] == "function")
            return this.raw[4](cpov, this);
        else if(cpov.isSDLFunction(this.raw[4]))
            return this.raw[4].substr(1);
        else
            return this.raw[4];
    }

    set v11(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[4] = val;
        } else {
            cpov.error("fatal", "v11 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v12() {
        if(typeof this.raw[5] == "function")
            return this.raw[5](cpov, this);
        else if(cpov.isSDLFunction(this.raw[5]))
            return this.raw[5].substr(1);
        else
            return this.raw[5];
    }

    set v12(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[5] = val;
        } else {
            cpov.error("fatal", "v12 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v20() {
        if(typeof this.raw[6] == "function")
            return this.raw[6](cpov, this);
        else if(cpov.isSDLFunction(this.raw[6]))
            return this.raw[6].substr(1);
        else
            return this.raw[6];
    }

    set v20(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[6] = val;
        } else {
            cpov.error("fatal", "v20 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v21() {
        if(typeof this.raw[7] == "function")
            return this.raw[7](cpov, this);
        else if(cpov.isSDLFunction(this.raw[7]))
            return this.raw[7].substr(1);
        else
            return this.raw[7];
    }

    set v21(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[7] = val;
        } else {
            cpov.error("fatal", "v21 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v22() {
        if(typeof this.raw[8] == "function")
            return this.raw[8](cpov, this);
        else if(cpov.isSDLFunction(this.raw[8]))
            return this.raw[8].substr(1);
        else
            return this.raw[8];
    }

    set v22(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[8] = val;
        } else {
            cpov.error("fatal", "v22 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v30() {
        if(typeof this.raw[9] == "function")
            return this.raw[9](cpov, this);
        else if(cpov.isSDLFunction(this.raw[9]))
            return this.raw[9].substr(1);
        else
            return this.raw[9];
    }

    set v30(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[9] = val;
        } else {
            cpov.error("fatal", "v30 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v31() {
        if(typeof this.raw[10] == "function")
            return this.raw[10](cpov, this);
        else if(cpov.isSDLFunction(this.raw[10]))
            return this.raw[10].substr(1);
        else
            return this.raw[10];
    }

    set v31(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[10] = val;
        } else {
            cpov.error("fatal", "v31 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v32() {
        if(typeof this.raw[11] == "function")
            return this.raw[11](cpov, this);
        else if(cpov.isSDLFunction(this.raw[11]))
            return this.raw[11].substr(1);
        else
            return this.raw[11];
    }

    set v32(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[11] = val;
        } else {
            cpov.error("fatal", "v32 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------
    // Returns the contents of this.raw based on mode, which may be one of:
    //
    //     normal ... This is the default. Returns a copy of this.raw in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------

    asArray(mode = "normal") {

        var result = [ ];

        switch(mode) {

            case "normal":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else
                        result[i] = this.raw[i];
                }
                break;

            case "literal":
                for(var i = 0; i < 12; i++) {
                    result[i] = this.raw[i];
                }
                break;

            case "calc":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else if(cpov.isSDLFunction(this.raw[i]))
                        return null;
                    else
                        result[i] = this.raw[i];
                }
                break;

            case "sdl":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else if(cpov.isSDLFunction(this.raw[i]))
                        result[i] = this.raw[i].substr(1);
                    else
                        result[i] = this.raw[i];
                }
                break;

            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "Matrix.asArray", this);
                break;
        }

        return result;
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        return new Matrix(this.raw);

    }

    //--------------------------------------------------------------------------
    // Copies the values of that to this. Performs no conversions.
    //--------------------------------------------------------------------------

    copyFrom(that) {
        for(var i = 0; i < 12; i++)
            this.raw[i] = that.raw[i];
    }

    //--------------------------------------------------------------------------
    // Returns a boolean indicating whether the current value of this.raw is the
    // same as the initial identity matrix. This only checks for numeric values;
    // if raw is a function returning an identity matrix, it will still return
    // false.
    //--------------------------------------------------------------------------

    isIdentityMatrix() {
        var ident = [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ];

        for(var i = 0; i < 12; i++) {
            if(this.raw[i] !== ident[i])
                return false;
        }
        return true;
    }

    //--------------------------------------------------------------------------
    // Convenience method for applying a rotation to the current Matrix. If
    // y and z are undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    rotate(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("rotate", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for scaling the current Matrix. If y and z are
    // undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    scale(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("scale", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for skewing the current Matrix. As with the short-
    // hand version for initializing a skew matrix, the single argument is an
    // object with the desired axis pairs.
    //--------------------------------------------------------------------------

    skew(pairs) {
        var that = new Matrix("skew", pairs);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for scaling the current Matrix. If y and z are
    // undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    translate(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("translate", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Returns a copy of the raw array with any JS function members converted
    // into numbers. Will produce a fatal error if any of the members yield
    // non-numeric results.
    //--------------------------------------------------------------------------

    reify() {
        var result = [ ];

        for(var i = 0; i < 12; i++) {
            if(typeof this.raw[i] == "function") {
                var tmp = this.raw[i](cpov, this);
                if(typeof tmp != "number")
                    cpov.error("fatal", "Matrix elements must evaluate to floats.", "Matrix.reify", this);
                result[i] = tmp;
            } else if(typeof this.raw[i] == "number") {
                result[i] = this.raw[i];
            } else {
                cpov.error("fatal", "Matrix elements must evaluate to floats.", "Matrix.reify", this);
            }
        }
        return result;
    }

    //--------------------------------------------------------------------------
    // A private method for multiplying matrices in the form of arrays of 12
    // elements, returning the same.
    //--------------------------------------------------------------------------

    static _xMatrix(a, b) {

        if(cpov.isSDLFunction(a) || cpov.isSDLFunction(b))
            cpov.error("fatal", "Cannot perform JS math operations on SDL functions.", "Matrix._xMatrix", this);

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

        if(!cpov.isClassInstance(that, "Matrix"))
            cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix", this);

        var a = this.asArray("calc");
        var b = that.asArray("calc");

        var badObj = false;
        if(b === null)
            badObj = that;
        if(a === null)
            badObj = this;
        if(badObj)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xMatrix", badObj);

		return new Matrix(Matrix._xMatrix(a, b));
    }

    //--------------------------------------------------------------------------
    // Given a VectorXYZ, point, returns a new VectorXYZ this * point.
    //--------------------------------------------------------------------------

    xPoint(point) {

        if(!cpov.isClassInstance(point, "VectorXYZ"))
            cpov.error("fatal", "point is not a VectorXYZ.", "Matrix.xPoint", this);

        var m = this.asArray("calc");
        if(m === null)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xPoint", this);

        var v = point.asArray("calc");
        if(v === null)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xPoint", this);

        return new VectorXYZ(
            m[0] * v[0] + m[3] * v[1] + m[6] * v[2] + m[9],
            m[1] * v[0] + m[4] * v[1] + m[7] * v[2] + m[10],
            m[2] * v[0] + m[5] * v[1] + m[8] * v[2] + m[11]
        );

/*
        return new VectorXYZ(
            this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
            this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
            this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
        );
*/
    }

    //--------------------------------------------------------------------------
	// Sets multiple attributes at once using an object.
	//--------------------------------------------------------------------------

	xset(vals) {
		cpov.initObject(this, vals);
	}

    //--------------------------------------------------------------------------
    // Produces the SDL representation of the Matrix.
    //--------------------------------------------------------------------------

    toSDL(stops = 0) {
        var pad = cpov.tab(stops);

        var m = this.asArray("sdl");

        return pad + "matrix <" + m.join(", ") + ">";
    }

}

exports.Matrix = Matrix;


//--------------------------------------------------------------------------
// GenMap and its subclasses are gathered together here because this is a
// case in which the classes are nearly identical and mostly exist for the
// purpose of type-checking.
//
// The data for the entries attribute consists of an array of 2-256 entries
// following the general form
//
//      [ idx, data ]
//
// where idx is a float and data is the locally relevant type or a type that
// can be automatically converted into the relevant type. Prior to assignment,
// the elements are sorted by idx, which need not be unique.
//--------------------------------------------------------------------------

class GenMap {

    constructor(options) {
        cpov.initObject(this, options);
        this._entries   = null;
    }

    get entries() {
        return this.entries;
    }

    set entries(val) {
        var result = this.normalizeEntries(val);
        this._entries = result;
        this._entries.sort(this.sortEntries);
    }

    normalizeEntries(val) {
        if(Array.isArray(val) || val.length < 2 || val.length > 256)
            cpov.error("fatal", "Map entries must be an array of 2-256 elements.", Object.getPrototypeOf(this).constructor.name + ".toSDL", this);
        for(var i = 0; i < val.length; i++) {
            if(!cpov.isFloat(val[i][0]))
                cpov.error("fatal", "Map indices must be floats.", Object.getPrototypeOf(this).constructor.name + ".toSDL", this);
        }
        var result = [ ];
        for(var i = 0; i < val.length; i++) {
            if(cpov.isClassInstance(val[i][1], this._itemClass.name)) {
                result.push([val[i][0], val[i][1].copy()]);
                continue;
            }
            var item = new this._itemClass(val[i][1]); // will produce a fatal error if value is bad
            result.push([val[i][0], item]);
        }
        return result;
    }

    // Sorts the entries for more readable output, subclass specific.

    sortEntries(a, b) {
        return a[0] - b[0];
    }

    toSDL(stops) {

        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];

        content.push(pad + this._SDLName + " {");
        for(var i = 0; i < this._entries; i++)
            content.push(ppad + "[" + this._entries[i][0] + " " + this._entries[i][1].toSDL() + "]");
        content.push(pad + "}");

        return content.join("\n");
    }

}


//--------------------------------------------------------------------------

class ColorMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

ColorMap.prototype._itemClass = Color;
ColorMap.prototype._SDLName   = "color_map";

//--------------------------------------------------------------------------

/*
class NormalMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

NormalMap.prototype._itemClass = Normal;
NormalMap.prototype._SDLName   = "normal_map";
*/

//--------------------------------------------------------------------------

/*
class PigmentMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

PigmentMap.prototype._itemClass = Pigment;
PigmentMap.prototype._SDLName   = "pigment_map";
*/

//--------------------------------------------------------------------------

class SlopeMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

SlopeMap.prototype._itemClass = VectorXY;
SlopeMap.prototype._SDLName   = "slope_map";

//--------------------------------------------------------------------------

/*
class TextureMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

TextureMap.prototype._itemClass = Texture;
TextureMap.prototype._SDLName   = "texture_map";
*/


