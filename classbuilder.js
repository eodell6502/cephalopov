var cpov = require("cpov.js");

/*

Generic rules:

1. Any value can be replaced by a JavaScript function that returns the expected type.
2. An SDL function (prefixed with '&') can be used for any value in CPov where it is legal in SDL.
3. JS functions may return SDL functions (again, prefixed with '&')

Caveats:

1. SDL functions obviously can't be used in calculations at runtime in CPov.
2. CPov exposes the details of the current frame -- frame number and which phase of the
   frame process is active -- so that user functions can act accordingly.
3. CPov may call user functions at any time to test their return values. They should
   therefore be free of side effects. This only applies to object attributes. The pre- and
   post- functions are only called at the appropriate times.




*/

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
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = this.tab(1);
    var tab2 = this.tab(2);

    // Class opening -----------------------------------------------------------

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
            if(this.mutable[i].type.substr(0, 1) == '@') {
                var init = "[ ]";
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
                tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
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
                tab1 + "get " + item.name + "() {\n"
                + tab2 + "return this._" + item.name + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + item.name + "(val) {\n"
                + tab2 + "// TODO\n"
                + tab1 + "}\n"
            );
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");

    return src.join("\n");
}




