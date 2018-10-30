/*

Copyright 2018 Eric O'Dell and subsequent contributors

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
// The cpov object contains all of the data structures and generic methods in
// CephaloPOV that do not appear in other specialized classes.
//==============================================================================

global.cpov = { };


//------------------------------------------------------------------------------
// Internal global state.
//------------------------------------------------------------------------------

cpov.quietMode      = false; // CLI switches ...
cpov.verbosity      = 1;
cpov.debug          = 0;
cpov.debugLog       = null;
cpov.preamble       = false;     // content to prepend to SDL output
cpov.sdlIncludes    = false;     // SDL files to include after preamble
cpov.outputBase     = "cpov0000" // output base name template
cpov.infile         = false;     // input file
cpov.tickVal        = 1.0;       // clock tick
cpov.clockTime      = 0;         // current clock time
cpov.startTime      = 0.0;       // starting time for animation
cpov.endTime        = Infinity;  // ending time for animation
cpov.startFrame     = 0;         // starting frame number for animation
cpov.endFrame       = Infinity;  // ending frame number for animation
cpov.imageOptions   = null;      // current settings for CLI or .ini file
cpov.globalSettings = null;      // current globalSettings values
cpov.snapshots      = [ ];       // snapshots for current frame
cpov.snapshotMode   = false;     // switch for snapshot mode, defaults to false

cpov.currentFrame = 0;    // current animation frame
cpov.objectSerial = 0;    // running count of Primitives created
cpov.serialMap    = { };  // maps serials to objects
cpov.idMap        = { };  // maps identifiers to serials


//------------------------------------------------------------------------------
// Module wrappers.
//------------------------------------------------------------------------------

cpov.fs      = require("fs");
cpov.File    = require("./file.js");
cpov.chalk   = require("chalk");
cpov.process = require("process");
cpov.wrap    = require("word-wrap"); // https://github.com/jonschlinkert/word-wrap


//==============================================================================
// Validation functions, mainly to be leveraged by generated classes.
//==============================================================================

cpov.isFloat = function(val) {
    return typeof val == "number" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isPowerOfTwo = function(val) {
    var sqrt = Math.sqrt(val);
    if(sqrt == Math.floor(sqrt))
        return true;
    else
        return false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfFloats = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number")
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isWithin = function(val, min, max) {
    return val >= min && val <= max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isBetween = function(val, min, max) {
    return val > min && val < max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInt = function(val) {
    return typeof val == "number" && val == Math.floor(val) ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfInts = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number" || val[i] != Math.floor(val[i]))
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isString = function(val) {
    return typeof val == "string" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfStrings = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "string")
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isNonEmptyString = function(val) {
    return typeof val == "string" && val.length ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfNonEmptyStrings = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "string" || val[i].length < 1)
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isChar = function(val) {
    return typeof val == "string" && val.length == 1 ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInArray = function(val, array) {
    for(var i = 0; i < array.length; i++)
        if(array[i] == val)
            return true;
    return false;
}

//------------------------------------------------------------------------------

cpov.isKey = function(val, object) {
    return object[val] === undefined ? false : true;
}

//------------------------------------------------------------------------------

cpov.isBoolean = function(val) {
    return typeof val == "boolean" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNull = function(val) {
    return val === null ? true : false;
}

//------------------------------------------------------------------------------

cpov.isClass = function(val, classname) {
    if(!Array.isArray(val))
        val = [ val ];
    if(!Array.isArray(classname))
        classname = [ classname ];

    for(var v = 0; v < val.length; v++) {
        var okay = false;
        for(var c = 0; c < classname.length; c++) {
            if(Object.getPrototypeOf(val[v]).constructor.name == classname[c]) {
                okay = true;
                break;
            }
        }
        if(!okay)
            return false;
    }

    return true;
}

//------------------------------------------------------------------------------

cpov.isArrayOfClass = function(val, classname, min, max) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            if(Object.getPrototypeOf(val[i]).constructor.name != classname)
                return false;
        }
        if(val.length < min || val.length > max)
            return false;
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------

cpov.isArrayOfBaseClass = function(val, classname, min, max) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            if(!cpov.inheritsFrom(val[i], classname))
                return false;
        }
        if(val.length < min || val.length > max)
            return false;
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------

cpov.inheritsFrom = function(val, classname) {
    return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfSubclass = function(val, classname) {
    if(!Array.isArray(val))
        return false;
    if(Array.isArray(classname)) {
        for(var i = 0; i < val.length; i++) {
            var okay = false;
            for(var c = 0; c < classname.length; c++) {
                if(cpov.inheritsFrom(val, classname[i])) {
                    okay = true;
                    break;
                }
            }
            if(!okay) {
                return false;
            }
        }
    } else {
        for(var i = 0; i < val.length; i++) {
            if(!cpov.inheritsFrom(val, classname)) {
                return false;
            }
        }
    }
    return true;
}

//------------------------------------------------------------------------------

cpov.keysToTextList = function(obj) {
    var items = [ ];
    for(var k in obj)
        items.push("'" + k + "'");
    return cpov.arrayToTextList(items);
}

//------------------------------------------------------------------------------

cpov.arrayToTextList = function(items) {
    var items = items.slice(0);
    items[items.length - 1] = "or " + items[items.length - 1];
    return items.join(", ");
}

//------------------------------------------------------------------------------

cpov.isSDLFunction = function(val) {
    return (typeof val == "string" && val.substr(0, 1) == "&") ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNullOrFunction = function(val) {
    return (val === null || typeof val == "function" || cpov.isSDLFunction(val)) ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNullOrJSFunction = function(val) {
    return (val === null || typeof val == "function") ? true : false;
}

//------------------------------------------------------------------------------

cpov.isUnusedSerial = function(val, obj) {
    var result = (obj.serial == val || cpov.serialMap[val] === undefined) ? true : false;
    if(obj.serial != val)
        delete cpov.serialMap[obj.serial];
    cpov.serialMap[val] = obj;
    return result;
}

//------------------------------------------------------------------------------

cpov.isUnusedId = function(val, obj) {
    var result = (obj.id == val || cpov.idMap[val] === undefined) ? true : false;
    if(obj.id != val)
        delete cpov.idMap[obj.id];
    cpov.idMap[val] = obj;
    return result;
}

//------------------------------------------------------------------------------
// Used in setter validation to auto-convert convenience forms of vectors to
// actual objects. The class constructors will terminate execution with a fatal
// cpov.error message if the initializer is invalid or malformed.
//------------------------------------------------------------------------------

cpov.convertToVector = function(type, val) {

    switch(type) {
        case "VectorXY":
            val = new VectorXY(val);
            break;
        case "VectorUV":
            val = new VectorUV(val);
            break;
        case "VectorXYZ":
            val = new VectorXYZ(val);
            break;
        case "VectorXYZW":
            val = new VectorXYZW(val);
            break;
        case "Color":
            val = new Color(val);
            break;
        default:
            cpov.error("fatal", "System error, invalid type '" + type + "'.", "cpov.convertToVector");
    }

    return val;
}

var miscDef = require("./miscDef.js");  // miscellaneous/minor definitions
for(var k in miscDef)
    cpov[k] = miscDef[k];

cpov.colorsInc     = require("./colorsInc.js");      // colors.inc port
cpov.gsDef         = require("./gsDef.js");          // globalSettings
cpov.ioDef         = require("./ioDef.js");          // imageOptions
cpov.primitiveDef  = require("./primitiveDef.js");   // Primitive base class
cpov.objDef        = require("./objDef.js");         // Primitive subclasses
cpov.vectorDef     = require("./vectorDef.js");      // Vector classes


//==============================================================================
// Returns a string consisting of stops copies of four space characters.
//==============================================================================

cpov.tab = function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//==============================================================================
// Prints an error message to console if permitted by the current verbosity
// level, and if the error is fatal, terminates the process.
//==============================================================================

cpov.error = function(level, message, location = "CEPHALOPOV", obj = null) {

    var instance = '';

    if(obj !== null && cpov.inheritsFrom(obj, "Primitive"))
        instance = " (" + cpov.primitiveDefIdentifier(obj) + ")";


    if(!cpov.quietMode) {
        switch(level) {
            case "fatal":
                console.log(cpov.chalk.bgRed.yellowBright("[" + location + "]") + cpov.chalk.redBright(" FATAL ERROR: ") + cpov.chalk.yellowBright(message + instance));
                if(cpov.debugLog)
                    cpov.debugLog.write("[" + location + "] FATAL ERROR: " + message + instance + "\n");
                break;
            case "warn":
                if(cpov.verbosity >= 1)
                    console.log(cpov.chalk.bgYellow.whiteBright("[" + location + "]") + cpov.chalk.yellowBright(" WARNING: ") + message + instance);
                if(cpov.debugLog)
                    cpov.debugLog.write("[" + location + "] WARNING: " + message + instance + "\n");
                break;
            case "info":
                if(cpov.verbosity >= 2)
                    console.log(cpov.chalk.bgGreen.whiteBright("[" + location + "]") + cpov.chalk.greenBright(" INFO: ") + message + instance);
                if(cpov.debugLog)
                    cpov.debugLog.write("[" + location + "] INFO: " + message + instance + "\n");
                break;
            case "debug":
                if(cpov.verbosity >= 3 || cpov.debug)
                    console.log("[" + location + "] DEBUG: " + message + instance);
                if(cpov.debugLog)
                    cpov.debugLog.write("[" + location + "] DEBUG: " + message + instance + "\n");
                break;
        }
    }

    if(level == "fatal" && cpov.debug < 2)
        cpov.process.exit(1);
}


//==============================================================================
// Reads from the supplied filename and returns an object whose keys are
// defined by specially formatted comments in the file and whose values are
// the lines in between those comments, with leading and trailing whitespace
// trimmed. The comments are formatted thus:
//
//          // Keyname // (anything after the second // is ignored)
//          ^
//          |
//          +------------- first column
//
// Note that the spaces on either side of the keyname are mandatory and that
// there cannot be any spaces in the keyname itself.
//==============================================================================

cpov.objectImport = function(filename) {
    var fp       = new cpov.File(filename, "r");
    var contents = fp.read().trim().split(/\n/);
    contents.push("");
    fp.close();

    var result   = { };
    var label    = null;
    var value    = [ ];
    var match    = null;

    for(var i = 0; i < contents.length; i++) {
        if(i == contents.length - 1 || (match = contents[i].match(/^\/\/ +(\S+) +\/\//))) {
            if(label) {
                result[label] = value.join("\n").trim();
            }
            if(match && match[1]) {
                label = match[1];
                value = [ ];
            }
            continue;
        }
        value.push(contents[i]);
    }
    if(label) {
        result[label] = value.join("\n").trim();
    }

    return result;
}


//==============================================================================
// Common initialization/load routine for objects. Given an object reference and
// an object containing named attributes, attempts to assign them to the
// corresponding object attributes. Attributes that do not exist will be
// ignored. This routine is used where a conBlock is not defined.
//==============================================================================

cpov.initObject = function(obj, vals) {
    for(var k in vals) {
        if(k == "serial")
            continue;
        if(obj[k] !== undefined) {
            obj[k] = vals[k];
        }
    }
}


//==============================================================================
// Given a block of text in the form of a single string, preface each line with
// the specified number of tab stops.
//==============================================================================

cpov.indentTextBlock = function(block, stops) {
    block = block.split(/\n/);
    var tab = cpov.tab(stops);
    if(block[0] !== undefined)
        block[0] = tab + block[0];
    return block.join("\n" + tab);
}


//==============================================================================
// Given a Primitive object, returns a string identifying it by serial and, if
// available, id.
//==============================================================================

cpov.primitiveDefIdentifier = function(obj) {
    var result = [ ];
    result.push("#" + obj.serial);
    if(obj.id !== null)
        result.push(obj.id);
    return result.join(":");
}



//==============================================================================
// Simple commandline parser that supports short and long switches both with and
// without arguments. Takes an optionMap like so:
//
//    var optionMap = {
//        infile:     { short: "i", vals: [ ] },  // accumulates values
//        outfiles:   { short: "o", vals: [ ] },
//        preamble:   { short: "p", vals: [ ] },
//        sdlinclude: { short: "s", vals: [ ] },
//        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
//        quietMode:  { short: "q", cnt: 0 },
//        debug:      { short: "d", cnt: 0 },
//        help:       { short: "h", cnt: 0 },
//    }
//
// The keys of the optionMap are the long options, the short members in the value
// objects are the short options. If a vals array is provided, arguments to the
// switch are accumulated therein. If a cnt counter is provided, the number of
// appearances of the switch are counted therein. You can't do both.
//
// The optionMap is altered in place. Bails with a call to cpov.error if
// malformed user input is encountered.
//==============================================================================

cpov.parseCLI = function(optionMap) {

    var currentArg = null;

    for(var a = 2; a < process.argv.length; a++) {
        var item   = process.argv[a];
        var match  = item.match(/^(-+)?(\S+)/);
        var dashes = match[1] === undefined ? 0 : match[1].length;
        var arg    = match[2];

        if(dashes == 1) {

            if(arg.length > 1) {   // Just split composite simple args

                var args = arg.split("");

                for(var i = 0; i < args.length; i++) {
                    process.argv.splice(a + 1 + i, 0, "-" + args[i]);
                }
                continue;

            } else {  // Convert simple args to long args

                var complex = null;
                for(var i in optionMap) {
                    if(optionMap[i].short == arg) {
                        complex = i;
                        break;
                    }
                }

                if(complex === null) {
                    cpov.error("fatal", "Unknown commandline switch '-" + arg + "'", "CEPHALOPOV");
                } else {
                    arg = complex;
                    dashes = 2;
                }

            }

        }

        if(dashes == 2) {

            if(optionMap[arg] === undefined)
                cpov.error("fatal", "Unknown commandline switch '--" + arg + "'", "CEPHALOPOV");

            currentArg = arg;

            if(optionMap[arg].cnt !== undefined)
                optionMap[arg].cnt++;

            continue;

        }

        // If we get here, we're looking at an argument to a switch

        if(optionMap[currentArg] === undefined)
            cpov.error("fatal", "Invalid commandline argument '" + item + "' supplied without preceding switch.", "CEPHALOPOV");
        else if(optionMap[currentArg].vals === undefined)
            cpov.error("fatal", "Commandline switch --" + currentArg + "/-" + optionMap[currentArg].short + " does not take arguments.", "CEPHALOPOV");
        else
            optionMap[currentArg].vals.push(item);

    }

}


//==============================================================================
// Given an angle in degrees, returns its equivalent in radians.
//==============================================================================

cpov.deg2rad = function(deg) {
    return deg * (Math.PI / 180);
}


//==============================================================================
// When called by the user program, outputs a frame.
//==============================================================================

cpov.outputFrame = function() {

    //--------------------------------------------------------------------------
    // Using cpov.serialMap, walk through all objects. For each object that is
    // active, call the frameBegin function if it exists.
    //--------------------------------------------------------------------------

    for(var serial in cpov.serialMap) {
        var obj = cpov.serialMap[serial];
        if(obj.active && obj.frameBegin) {
            cpov.error("debug", "Calling frameBegin on object serial " + serial + ".", "CEPHALOPOV.outputFrame", obj);
            obj.frameBegin(cpov);
        }
    }

    //--------------------------------------------------------------------------
    // Create the .ini file.
    //--------------------------------------------------------------------------

    if(cpov.imageOptions.createIni === true) {
        var iniFile = new File(cpov.outputBase + ".ini", "w", cpov.currentFrame);
        if(iniFile.open == false) {
            cpov.error("error", "Unable to open " + iniFile.path + " for writing.", "CEPHALOPOV.outputFrame", this);
        }

        var iniContent = cpov.imageOptions.output();

        iniFile.write(
              "//==========================================================================\n"
            + "// INI FILE: " + iniFile.path + "\n"
            + "// FRAME: " + cpov.currentFrame + "\n"
            + "// CLOCK TIME: " + cpov.clockTime + "\n"
            + "// CLI EQUIV: " + iniContent.cli + "\n"
            + "//==========================================================================\n\n"
            + iniContent.ini + "\n\n"
        );
        iniFile.close();
    }

    //--------------------------------------------------------------------------
    // Create the .pov file.
    //--------------------------------------------------------------------------

    var povFile = new File(cpov.outputBase + ".pov", "w", cpov.currentFrame);
    if(povFile.open == false) {
        cpov.error("error", "Unable to open " + povFile.path + " for writing.", "CEPHALOPOV.outputFrame", this);
    }

    povFile.write(
          "//==========================================================================\n"
        + "// POV FILE: " + povFile.path + "\n"
        + "// FRAME: " + cpov.currentFrame + "\n"
        + "// CLOCK TIME: " + cpov.clockTime + "\n"
        + "//==========================================================================\n\n"
    );

    if(cpov.preamble) {
        povFile.write(cpov.preamble + "\n\n");
    }

    if(cpov.sdlIncludes) {
        for(var i = 0; i < cpov.sdlIncludes.length; i++) {
            povFile.write("#include \"" + cpov.sdlIncludes[i] + "\"\n");
        }
        povFile.write("\n");
    }

    //--------------------------------------------------------------------------
    // If we're in snapshot mode, we just dump the snapshots to the file and
    // then clear the snapshot buffer. Otherwise, we walk through all of the
    // (active) objects and call their .toSDL methods and write the output to
    // the file.
    //--------------------------------------------------------------------------

    if(cpov.snapshotMode) {

        if(!cpov.snapshots.length) {
            cpov.error("warn", "Snapshot buffer is empty.", "CEPHALOPOV.outputFrame");
        } else {
            povFile.write(cpov.snapshots.join("\n\n"));
        }

    } else {

        for(var serial in cpov.serialMap) {
            var obj = cpov.serialMap[serial];
            if(obj.active && obj.parent === null) {
                cpov.error("debug", "Calling toSDL on object serial " + serial + ".", "CEPHALOPOV.outputFrame", obj);
                povFile.write("// Object " + (obj.id ? obj.id : "" ) + " #" + serial + "\n\n");
                povFile.write(obj.toSDL() + "\n\n");
            }
        }

    }

    //--------------------------------------------------------------------------
    // Using cpov.serialMap, walk through all objects. For each object that is
    // active, call the frameEnd function if it exists.
    //--------------------------------------------------------------------------

    for(var serial in cpov.serialMap) {
        var obj = cpov.serialMap[serial];
        if(obj.active && obj.frameEnd) {
            cpov.error("debug", "Calling frameEnd on object serial " + serial + ".", "CEPHALOPOV.outputFrame", obj);
            obj.frameEnd(cpov);
        }
    }

    //--------------------------------------------------------------------------
    // Advance time and frame count.
    //--------------------------------------------------------------------------

    cpov.clockTime += cpov.tickVal;
    cpov.currentFrame++;

}




//==============================================================================
// Fly my pretties, fly! =======================================================
//==============================================================================

module.exports = cpov;
