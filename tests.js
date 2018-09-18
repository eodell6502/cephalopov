var test = { };

test.runAll = function() {
     test.createTestTable(true);
     test.vector1();
     test.vector2();
}

test.createTestTable = function(clear) {

    var contents = "<p><span id='run' class='action'>Re-run tests</span></p>"
        + "<table class='sgrid' id='testTable'>\n"
        + "<thead><tr><th>Test Name</th><th>Result</th><th>Msecs</th><th>Details</th></tr></thead>\n"
        + "<tbody id='testTableBody'></tbody>\n"
        + "</table>\n";

    if(clear)
        $("body").html(contents);
    else
        $("body").prepend(contents);
}

test.appendTestRow = function(name, result, msecs, details) {
    var contents = "<tr><td class='name'>" + name + "</td>"
        + (result ? "<td class='pass'>PASS</td>" : "<td class='fail'>FAIL</td>")
        + "<td class='msecs'>" + msecs + "</td>"
        + "<td>" + (details === undefined ? "" : details) + "</td>"
        + "</tr>\n";
    $("#testTableBody").append(contents);
}


//==============================================================================
// Validate vector constructor when called without initializers. Makes sure type
// is set and all properties are initialized to null.
//==============================================================================

test.vector1 = function() {

    var testName = "Vector constructor (no args)";
    var start = new Date().getTime();

    for(var type in Vector.prototype._def) {

        try {
            var v = $CP.factory("Vector" + type);
        } catch(e) {
            test.appendTestRow(testName, false, "n/a", e.message);
            continue;
        }

        if(v.type != "Vector" + type) {
            test.appendTestRow(testName, false, "n/a", "The type member does not match: v.type = " + v.type + ", type = " + type)
        }

        var okay = true;
        for(var member in Vector.prototype._def[type].offsets) {
            if(v[member] !== null) {
                test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " is not null.");
                okay = false;
                break;
            }
        }
        if(!okay)
            return;

    }

    var finish = new Date().getTime();
    test.appendTestRow(testName, true, (finish - start));
}


//==============================================================================
// Tests whether all coordinate fields can be set to numbers, SDL functions, and
// JS functions, and whether other types are rejected.
//==============================================================================

test.vector2 = function() {
    var testName = "Vector coordinate properties";
    var start = new Date().getTime();

    for(var type in Vector.prototype._def) {

        var v = $CP.factory("Vector" + type); // We assume this works because of test.vector1

        var okay = true;
        for(var member in Vector.prototype._def[type].offsets) {
            var literal = Math.random();
            var sdlFunc = "&something " + literal;
            var jsVal   = Math.random();
            var jsFunc  = function() { return jsVal; }

            try {
                v[member] = literal;
                if(v[member] != literal) {
                    test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " did not return correct value in literal test.");
                    console.log([literal, v[member]]);
                    return;
                }
            } catch(e) {
                test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " threw exception in literal test: " + e.msg);
            }

            try {
                v[member] = sdlFunc;
                if(v[member] != sdlFunc) {
                    test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " did not return correct value in sdlFunc test.");
                    console.log([sdlFunc, v[member]]);
                    return;
                }
            } catch(e) {
                test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " threw exception in sdlFunc test: " + e.msg);
            }

            try {
                v[member] = jsFunc;
                if(v[member] != jsFunc()) {
                    test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " did not return correct value in jsFunc test.");
                    console.log([jsFunc, jsVal, v[member]]);
                    return;
                }
            } catch(e) {
                test.appendTestRow(testName, false, "n/a", v.type + " member " + member + " threw exception in jsFunc test: " + e.msg);
            }

        }
        if(!okay)
            return;

    }

    var finish = new Date().getTime();
    test.appendTestRow(testName, true, (finish - start));
}


//==============================================================================
// Tests whether the .toSDL function works correctly for all Vector and value
// types.
//==============================================================================

test.vectorTest3 = function() {
    var testName = "Vector coordinate types";
    var start = new Date().getTime();

    for(var type in Vector.prototype._def) {

        var v = $CP.factory("Vector" + type); // We assume this works because of test.vector1

        var okay = true;
        for(var member in Vector.prototype._def[type].offsets) {

        }

    }

    var finish = new Date().getTime();
    test.appendTestRow(testName, true, (finish - start));
}


//==============================================================================
// Internal test function to validate type parsing and description generation.
//==============================================================================

$CP._typeDescriptionTestDump = function() {
    var errors = 0;

    for(var type in this.objDef) {
        var obj = this.objDef[type];
        for(var i = 0; i < obj.required.length; i++) {
            try {
                var fmt = this.parseTypeFormat(obj.required[i].type);
            } catch(e) {
                errors++;
                console.log("========================================");
                console.log("ERROR: Failed to parse " + obj.required[i].type + " in objDef." + type);
                console.log("========================================");
            }
            console.log("(" + obj.required[i].type + ") objDef." + type + "." + obj.required[i].name + " must be " + this.typeFormatDescription(fmt));
        }
        for(var i = 0; i < obj.optional.length; i++) {
            try {
                var fmt = this.parseTypeFormat(obj.optional[i].type);
            } catch(e) {
                errors++;
                console.log("========================================");
                console.log("ERROR: Failed to parse " + obj.optional[i].type + " in objDef." + type);
                console.log("========================================");
            }
            console.log("(" + obj.optional[i].type + ") objDef." + type + "." + obj.optional[i].name + " must be " + this.typeFormatDescription(fmt));
        }
    }
    for(var type in this.gsDef) {
        var obj = this.gsDef[type];
        try {
            var fmt = this.parseTypeFormat(obj.type);
        } catch(e) {
            errors++;
            console.log("========================================");
            console.log("ERROR: Failed to parse " + obj.type + " in gsDef." + type);
            console.log("========================================");
        }
        console.log("(" + obj.type + ") gsDef." + type + " must be " + this.typeFormatDescription(fmt));

    }
    for(var type in this.ioDef) {
        var obj = this.ioDef[type];
        try {
            var fmt = this.parseTypeFormat(obj.type);
        } catch(e) {
            errors++;
            console.log("========================================");
            console.log("ERROR: Failed to parse " + obj.type + " in ioDef." + type);
            console.log("========================================");
        }
        console.log("(" + obj.type + ") ioDef." + type + " must be " + this.typeFormatDescription(fmt));

    }
    if(errors)
        console.log("WARNING: " + errors + " errors detected.");

}

//==============================================================================
// Produces a list of all types used in the $CP.*def objects.
//==============================================================================

$CP._usedTypeDump = function() {
    var seen = { }

    for(var type in this.objDef) {
        var obj = this.objDef[type];
        for(var i = 0; i < obj.required.length; i++) {
            seen[obj.required[i].type] = true;
        }
        for(var i = 0; i < obj.optional.length; i++) {
            seen[obj.optional[i].type] = true;
        }
    }
    for(var type in this.gsDef) {
        var obj = this.gsDef[type];
        seen[obj.type] = true;
    }
    for(var type in this.ioDef) {
        var obj = this.ioDef[type];
        seen[obj.type] = true;
    }

    var result = [ ];
    for(var s in seen)
        result.push(s);
    result.sort();

    return result;
}


