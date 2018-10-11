var cpov  = require("./cephalopov.js");
var File  = require("./file.js");
var cli   = require("commander");
var chalk = require("chalk");


//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//
//      name ......... class name
//      obj
//          .immutable .... object defining immutable attributes
//              .custom ... key of snippet to replace autogenerated get/set
//          .mutable ...... object defining mutable attributes
//              .custom ... key of snippet to replace autogenerated get/set
//          .superclass ... name of superclass or false if none
//          .desc ......... text to put in header comment or false for none
//          .conArgs ...... constructor argument list or false for default (...args)
//          .conBlock ..... snippet block to put inside constructor or false for default
//          .snippets ..... snippets to append to class body
//      snippets ......... snippets definition file
//
// Not in the constructor arguments, but defaulting to true and settable after
// instantiation is the allowSDL member, which determines whether class values
// can be defined as SDL functions.
//==============================================================================

function ClassBuilder(name, obj, snippets = false) {
    this.name     = name;
    this.obj      = obj;
    this.snippets = snippets;
    this.allowSDL = true;

    if(this.snippets)
        this.snippets = cpov.objectImport(this.snippets);
    else
        this.snippets = { };
}


//------------------------------------------------------------------------------
// Produces comment divider lines up to 132 characters long.
//------------------------------------------------------------------------------

ClassBuilder.prototype.divider = function(stops, type, maxLength = 80) {
    var line = {
        "-": "//----------------------------------------------------------------------------------------------------------------------------------",
        "=": "//=================================================================================================================================="
    }

    var tabs = cpov.tab(stops);

    return tabs + line[type].substr(0, maxLength - tabs.length);
}


//------------------------------------------------------------------------------
// Pads a string with the specified character on the right or left.
//------------------------------------------------------------------------------

ClassBuilder.prototype.pad = function(str, num, padchar, side) {

	var padding = [ ];

	for(var i = 0; i < num; i++)
		padding.push(padchar);

	padding = padding.join("");

	return (side == "left" ? padding : "") + str + (side == "right" ? padding : "");
}

//------------------------------------------------------------------------------
// Given an array of arrays of strings, right-pads each column to make them all
// the same width. Assumes each row has the same number of elements. Returns a
// single string.
//------------------------------------------------------------------------------

ClassBuilder.prototype.align = function(rows) {

	var width = [ ];

	for(var i = 0; i < rows[0].length; i++)
		width[i] = 0;

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			width[c] = Math.max(width[c], rows[r][c].length);
		}
	}

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			if(rows[r][c].length < width[c])
				rows[r][c] = this.pad(rows[r][c], width[c] - rows[r][c].length, " ", "right");
		}
		rows[r] = rows[r].join("");
	}

	return rows.join("\n");
}


//------------------------------------------------------------------------------
// Takes src and replaces all instances of $snippet_name with the corresponding
// snippet, with a base indentation based on the location of $snippet_name. (In
// case it is not obvious, this means all snippets are blocks and not inline.)
// If the snippet is not found, a warning is issued. A single pass is made, so
// nested snippets are not supported presently.
//------------------------------------------------------------------------------

ClassBuilder.prototype.snippetInterpolate = function(src) {

    var snippets = this.snippets
    return src.replace(/([ \t]*)\$(\S+)/, function(match, p1, p2, offset, string) {
        if(snippets[p2] === undefined) {
            cpov.error("warn", "Missing snippet '" + p2 + "'", "CODEGEN");
            return match;
        } else {
            var result = p1 + snippets[p2].replace(/\n/g, "\n" + p1)
            return result;
        }
    });


}



//------------------------------------------------------------------------------
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = cpov.tab(1);
    var tab2 = cpov.tab(2);
    var tab3 = cpov.tab(3);
    var tab4 = cpov.tab(4);

    // Class opening -----------------------------------------------------------

    src.push(this.divider(0, "="));
    if(this.obj.desc)
        src.push(cpov.wrap(this.obj.desc, { indent: "// ", width: 77 }));
    else
        src.push(cpov.wrap(this.name + " class", { indent: "// ", width: 77 }));
    src.push(this.divider(0, "=") + "\n");
    src.push("class " + this.name + (this.obj.superclass ? (" extends " + this.obj.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    if(this.obj.conArgs) {
        src.push(tab1 + "constructor(" + this.obj.conArgs + ") {\n");
    } else {
        src.push(tab1 + "constructor(options) {\n")
    }

    // Immutable properties --------------------------------------------------------

    if(this.obj.immutable) {

		var rows = [ ];

		src.push(tab2 + "// Immutable properties //\n");

        for(var i in this.obj.immutable) {
			rows.push([tab2 + "this._" + i, " = ", this.obj.immutable[i] + ";"]);
        }

		src.push(this.align(rows) + "\n");
    }

    // Mutable properties ------------------------------------------------------

    if(this.obj.mutable) {

		var rows = [ ];

		src.push(tab2 + "// Mutable properties //\n");

        for(var i = 0; i < this.obj.mutable.length; i++) {
            if(this.obj.mutable[i].default) {
                var init = this.obj.mutable[i].default;
            } else {
                var init = "null";
            }
			rows.push([tab2 + "this._" + this.obj.mutable[i].name, " = ", init + ";"]);
        }

		src.push(this.align(rows) + "\n");
    }

    // Initialization ----------------------------------------------------------

	src.push(tab2 + "// Initialization //\n");

    if(this.obj.conBlock) {
        src.push(cpov.indentTextBlock(this.snippets[this.obj.conBlock] + "\n\n", 2));
    } else {
        if(this.obj.superclass) {
            src.push(tab2 + "super(options);");
        }
        src.push(tab2 + "cpov.initObject(this, options);\n");
    }


    src.push(tab1 + "}\n");

    // Accessors and Mutators --------------------------------------------------

    if(this.obj.immutable) {
        for(var i in this.obj.immutable) {
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + i + "(val) {\n"
                + tab2 + "throw new TypeError(\"[" + this.name + "]: " + i + " is a read-only property.\");\n"
                + tab1 + "}\n"
            );
        }
    }

    if(this.obj.mutable) {
        for(var i = 0; i < this.obj.mutable.length; i++) {
            var item = this.obj.mutable[i];
            if(this.obj.mutable[i].custom) {
                if(this.snippets[this.obj.mutable[i].custom] === undefined)
                    cpov.error("fatal", "Undefined snippet '" + this.obj.mutable[i].custom, "CODEGEN");
                src.push(cpov.indentTextBlock(this.snippets[this.obj.mutable[i].custom], 1) + "\n\n");
            } else {
                src.push(
                    this.divider(1, "-") + "\n\n"
                    + tab1 + "get " + item.name + "() {\n"
                    + tab2 + "if(typeof this._" + item.name + " == \"function\")\n"
                    + tab3 + "return this._" + item.name + "();");
                if(this.allowSDL)
                    src.push(
                        tab2 + "else if(cpov.isSDLFunction(this._" + item.name + "))\n"
                        + tab3 + "return this._" + item.name + ".substr(1);"
                    );
                src.push(
                    tab2 + "else\n"
                    + tab3 + "return this._" + item.name + ";\n"
                    + tab1 + "}\n\n"
                    + tab1 + "set " + item.name + "(val) {"
                );
                if(item.valid) {
                    if(this.allowSDL) {
                        src.push(tab2 + "if(cpov.isNullOrFunction(val) || (" + item.valid + ")) {");
                    } else {
                        src.push(tab2 + "if(cpov.isNullOrJSFunction(val) || (" + item.valid + ")) {");
                    }
                } else {
                    src.push(tab2 + "if(true) { // FIXME");
                }
                src.push(
                    tab3 + "this._" + item.name + " = val;\n"
                    + tab2 + "} else {\n"
                    + tab3 + "cpov.error(\"fatal\", \"" + item.err + "\", \"" + this.name + "\");\n"
                    + tab2 + "}\n"
                    + tab1 + "}\n"
                );
            }
        }
    }

    // Copy method -------------------------------------------------------------

    // TODO: Deep clones, etc.

    if(this.obj.mutable) {
        src.push(this.divider(1, "-") + "\n"
            + tab1 + "// Constructs and returns a shallow copy of the object.\n"
            + this.divider(1, "-") + "\n\n"
            + tab1 + "copy() {\n\n"
            + tab2 + "var newObj = new " + this.name + "();\n");
        if(this.obj.superclass && this.obj.superclass == "Primitive") {
            src.push(tab2 + "newObj.copyCommonFrom(this); // copy Primitive attributes");
        };
        var rows = [ ];
        for(var attr in this.obj.mutable) {
            var attrName = this.obj.mutable[attr].name;
            rows.push([tab2 + "newObj." + attrName, " = ", "this." + attrName + ";"]);
        }
        src.push(this.align(rows) + "\n");
        src.push(tab2 + "return newObj;");
        src.push(tab1 + "}\n");
    }

    // Snippet code ------------------------------------------------------------

    if(this.obj.snippets) {
        for(var i = 0; i < this.obj.snippets.length; i++) {
            if(this.snippets[this.obj.snippets[i]] === undefined) {
                cpov.error("fatal", "Cannot find snippet \"" + this.obj.snippets[i] + "\".", "ClassBuilder.toString");
            } else {
                src.push(cpov.indentTextBlock(this.snippets[this.obj.snippets[i]], 1) + "\n\n");
            }
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");
    src = src.join("\n");

    return this.snippetInterpolate(src);

}




main();

function main() {

    var opts = {
        classes:  { short: "c", cnt: 0 },
        snippets: { short: "s", cnt: 0 },
        help:     { short: "h", cnt: 0 },
    };

    cpov.parseCLI(opts);

    var optCount = 0;
    for(var i in opts)
        optCount += opts[i].cnt;

    if(opts.help.cnt) {
        console.log("\nUsage: codegen [options]\n\n"
            + "-c, --classes   Generate classes.js\n"
            + "-s, --snippets  Regenerate snippets.js --> snippets.new.js\n"
            + "-h, --help      Display this text\n\n");
        return;
    }

    // snippets.new.js ---------------------------------------------------------

    if(opts.snippets.cnt) {
        var fp = new File("./snippets.new.js", "w");
        var snippets = cpov.objectImport("./snippets.js");
        var keys = [ ];
        for(var key in snippets)
            keys.push(key);
        keys.sort(function(a, b) {
            if(a == "README")
                return -Infinity;
            else
                return a.localeCompare(b);
        });
        var dash80 = "--------------------------------------------------------------------------------";

        for(var i = 0; i < keys.length; i++) {
            var label = "// " + keys[i] + " //";
            label = label + dash80.substr(0, 80 - label.length) + "\n\n";
            fp.write(label);
            // TODO: prettify?
            fp.write(snippets[keys[i]] + "\n\n\n\n")
        }

        fp.close();

    }

    // classes.js --------------------------------------------------------------

    if(optCount == 0 || opts.classes.cnt) {  // by default, classes.js is produced
        var fp = new File("./classes.js", "w");
        fp.write("var cpov = require(\"./cephalopov.js\");\n\n");

        fp.write(new ClassBuilder("GlobalSettings", cpov.gsDef, "./snippets.js") + "\n\n");
        fp.write("exports.GlobalSettings = GlobalSettings;\n\n\n");

        var ioObj = new ClassBuilder("ImageOptions", cpov.ioDef, "./snippets.js");
        ioObj.allowSDL = false;
        fp.write(ioObj + "\n\n");
        fp.write("exports.ImageOptions = ImageOptions;\n\n\n");

        fp.write(new ClassBuilder("Primitive", cpov.objCommon, "./snippets.js") + "\n\n");
        fp.write("exports.Primitive = Primitive;\n\n\n");

        for(var pname in cpov.objDef) {
            var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
            fp.write(new ClassBuilder(cname, cpov.objDef[pname], "./snippets.js") + "\n\n");
            fp.write("exports." + cname + " = " + cname + ";\n\n\n");
        }

        for(var pname in cpov.vectorDef) {
            var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
            fp.write(new ClassBuilder(cname, cpov.vectorDef[pname], "./snippets.js") + "\n\n");
            fp.write("exports." + cname + " = " + cname + ";\n\n\n");
        }

        fp.close();
    }

}

