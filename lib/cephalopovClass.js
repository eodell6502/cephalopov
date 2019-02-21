//==============================================================================
// This file defines the CephaloPOV class, which contains most of the glue logic
// and definitions that don't live in the Primitive classes. As a singleton, it
// is instantianted once as the global cpov object. Its main purpose is just to
// centralize a bunch of stuff that was scattered elsewhere and to fix a few
// scope resolution issues that were inconveniences in the original anonymous
// cpov object.
//==============================================================================

class CephaloPOV {

    //==========================================================================
    // Validation functions, mainly to be leveraged by generated classes.
    //==========================================================================

    isFloat(val) {
        return typeof val == "number" ? true : false;
    }

    //--------------------------------------------------------------------------

    isPowerOfTwo(val) {
        for(var i = 0; i < 65; i++)
            if(Math.pow(2, i) == val)
                return true;
        return false;
    }

    //--------------------------------------------------------------------------

    isArrayOfFloats(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "number")
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isWithin(val, min, max) {
        return val >= min && val <= max ? true : false;
    }

    //--------------------------------------------------------------------------

    isBetween(val, min, max) {
        return val > min && val < max ? true : false;
    }

    //--------------------------------------------------------------------------

    isInt(val) {
        return typeof val == "number" && val == Math.floor(val) ? true : false;
    }

    //--------------------------------------------------------------------------

    isArrayOfInts(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "number" || val[i] != Math.floor(val[i]))
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isString(val) {
        return typeof val == "string" ? true : false;
    }

    //--------------------------------------------------------------------------

    isArrayOfStrings(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "string")
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isNonEmptyString(val) {
        return typeof val == "string" && val.length ? true : false;
    }

    //--------------------------------------------------------------------------

    isArrayOfNonEmptyStrings(val, min, max) {
        if(!Array.isArray(val))
            return false;
        if(val.length < min || val.length > max)
            return false;
        for(var i = 0; i < val.length; i++)
            if(typeof val[i] != "string" || val[i].length < 1)
                return false;
        return true;
    }

    //--------------------------------------------------------------------------

    isChar(val) {
        return typeof val == "string" && val.length == 1 ? true : false;
    }

    //--------------------------------------------------------------------------

    isInArray(val, array) {
        for(var i = 0; i < array.length; i++)
            if(array[i] == val)
                return true;
        return false;
    }

    //--------------------------------------------------------------------------

    isKey(val, object) {
        return object[val] === undefined ? false : true;
    }

    //--------------------------------------------------------------------------

    isBoolean(val) {
        return typeof val == "boolean" ? true : false;
    }

    //--------------------------------------------------------------------------

    isNull(val) {
        return val === null ? true : false;
    }

    //--------------------------------------------------------------------------
    // Returns true if val is a member of classname and false otherwise. Both
    // val and classname may be scalars or arrays.
    //--------------------------------------------------------------------------

    isClassInstance(val, classname) {
        if(!Array.isArray(val))
            val = [ val ];
        if(!Array.isArray(classname))
            classname = [ classname ];

        for(var v = 0; v < val.length; v++) {
            var okay = false;
            for(var c = 0; c < classname.length; c++) {
                try {
                    if(Object.getPrototypeOf(val[v]).constructor.name == classname[c]) {
                        okay = true;
                        break;
                    }
                } catch(e) {
                    return false;
                }
            }
            if(!okay)
                return false;
        }

        return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfClass(val, classname, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(!thisisClassInstance(val[i], classname))
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    isArrayOfBaseClass(val, classname, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(!thisinheritsFrom(val[i], classname))
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    isCSGOperand(val) {
        if(val.csgOperand === undefined || val.csgOperand === false)
            return false;
        else
            return true;
    }

    //--------------------------------------------------------------------------

    isArrayOfCSGOperands(val, min, max) {
        if(Array.isArray(val)) {
            for(var i = 0; i < val.length; i++) {
                if(val.csgOperand === undefined || val.csgOperand === false)
                    return false;
            }
            if(val.length < min || val.length > max)
                return false;
            return true;
        } else {
            return false;
        }
    }

    //--------------------------------------------------------------------------

    inheritsFrom(val, classname) {
        return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
    }

    //--------------------------------------------------------------------------

    isArrayOfSubclass(val, classname) {
        if(!Array.isArray(val))
            return false;
        if(Array.isArray(classname)) {
            for(var i = 0; i < val.length; i++) {
                var okay = false;
                for(var c = 0; c < classname.length; c++) {
                    if(this.inheritsFrom(val, classname[i])) {
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
                if(!this.inheritsFrom(val, classname)) {
                    return false;
                }
            }
        }
        return true;
    }

    //--------------------------------------------------------------------------

    keysToTextList(obj) {
        var items = [ ];
        for(var k in obj)
            items.push("'" + k + "'");
        return this.arrayToTextList(items);
    }

    //--------------------------------------------------------------------------

    arrayToTextList(items) {
        var items = items.slice(0);
        items[items.length - 1] = "or " + items[items.length - 1];
        return items.join(", ");
    }

    //--------------------------------------------------------------------------

    isSDLFunction(val) {
        return (typeof val == "string" && val.substr(0, 1) == "&") ? true : false;
    }

    //--------------------------------------------------------------------------

    isNullOrFunction(val) {
        return (val === null || typeof val == "function" || this.isSDLFunction(val)) ? true : false;
    }

    //--------------------------------------------------------------------------

    isNullOrJSFunction(val) {
        return (val === null || typeof val == "function") ? true : false;
    }

    //--------------------------------------------------------------------------

    isUnusedSerial(val, obj) {
        var result = (obj.serial == val || this.serialMap[val] === undefined) ? true : false;
        if(obj.serial != val)
            delete this.serialMap[obj.serial];
        this.serialMap[val] = obj;
        return result;
    }

    //--------------------------------------------------------------------------

    isUnusedId(val, obj) {
        var result = (obj.id == val || this.idMap[val] === undefined) ? true : false;
        if(obj.id != val)
            delete this.idMap[obj.id];
        this.idMap[val] = obj;
        return result;
    }

    //--------------------------------------------------------------------------
    // Used in setter validation to auto-convert convenience forms of vectors to
    // actual objects. The class constructors will terminate execution with a
    // fatal cpov.error message if the initializer is invalid or malformed.
    //--------------------------------------------------------------------------

    convertToVector(type, val) {

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
                this.error("fatal", "System error, invalid type '" + type + "'.", "CephaloPOV.convertToVector");
        }

        return val;
    }

    //--------------------------------------------------------------------------
    // Analogous to convertToVector, convertToVectorArray attempts to convert
    // the convenient bare array forms of the named vector type to an equivalent
    // array of vector instances. If the bare arrays are malformed, the vector
    // constructor will terminate the script with a fatal error.
    //--------------------------------------------------------------------------

    convertToVectorArray(type, val) {

        switch(type) {
            case "VectorXY":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXY(val[i]);
                break;
            case "VectorUV":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorUV(val[i]);
                break;
            case "VectorXYZ":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXYZ(val[i]);
                break;
            case "VectorXYZW":
                for(var i = 0; i < val.length; i++)
                    val[i] = new VectorXYZW(val[i]);
                break;
            case "Color":
                for(var i = 0; i < val.length; i++)
                    val[i] = new Color(val[i]);
                break;
            default:
                this.error("fatal", "System error, invalid type '" + type + "'.", "CephaloPOV.convertToVectorArray");
        }

        return val;

    }

}

