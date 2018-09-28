var cpov    = require("./cpov.js").cpov;

//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//==============================================================================

function ClassBuilder(name, fixed, mutable, superclass) {
    this.name       = name;
    this.superclass = superclass;
    this.fixed      = fixed;
    this.mutable    = mutable;
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
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = cpov.tab(1);
    var tab2 = cpov.tab(2);
    var tab3 = cpov.tab(3);

    // Class opening -----------------------------------------------------------

    src.push(this.divider(0, "="));
    src.push(this.divider(0, "=") + "\n");
    src.push("class " + this.name + (this.superclass ? (" extends " + this.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    src.push(tab1 + "constructor(objType, args) {\n"
        + tab2 + "super(args);\n");

    // Fixed properties --------------------------------------------------------

    if(this.fixed) {
        for(var i in this.fixed) {
            src.push(tab2 + "this._" + i + " = " + this.fixed[i] + ";");
        }
    }

    // Mutable properties ------------------------------------------------------

    if(this.mutable) {
        for(var i = 0; i < this.mutable.length; i++) {
            if(this.mutable[i].default) {
                var init = this.mutable[i].default;
            } else {
                var init = "null";
            }
            src.push(tab2 + "this._" + this.mutable[i].name + " = " + init + ";");
        }
    }

    src.push(tab1 + "}\n");

    // Accessors and Mutators --------------------------------------------------

    if(this.fixed) {
        for(var i in this.fixed) {
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
                + this.divider(1, "-") + "\n\n"
                + tab1 + "set " + i + "(val) {\n"
                + tab2 + "throw new TypeError(\"[" + this.name + "]: " + i + " is a read-only property.\");\n"
                + tab1 + "}\n"
            );
        }
    }

    if(this.mutable) {
        for(var i = 0; i < this.mutable.length; i++) {
            var item = this.mutable[i];
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + item.name + "() {\n"
                + tab2 + "return this._" + item.name + ";\n"
                + tab1 + "}\n\n"
                + this.divider(1, "-") + "\n\n"
                + tab1 + "set " + item.name + "(val) {\n"
                + tab2 + "if(" + item.valid + ") {\n"
                + tab3 + "this._" + item.name + " = val;\n"
                + tab2 + "else {\n"
                + tab3 + "cpov.error(\"fatal\", \"" + item.err + "\", \"" + this.name + "\");\n"
                + tab2 + "}\n"
                + tab1 + "}\n"
            );
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");

    return src.join("\n");
}



var test = new ClassBuilder("globalSettings", false, cpov.gsDef.mutable, false);
console.log(test.toString());
