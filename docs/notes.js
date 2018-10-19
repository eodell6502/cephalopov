// This is mostly stuff that I've replaced but want to keep for future reference without
// having to sift through the git repo to find.

/*

 If we were to rotate an object 45 degrees around the Z axis, we would use the following statement:

            matrix < cos(a), sin(a), 0,
                    -sin(a), cos(a), 0,
                       0,      0,    1,
                       0,      0,    0 >

The course notes I found, taken from Mathematical Elements for Computer Graphics, 2ed,
Rogers and Adams, 1990, gives the following Z axis rotation (note the fourth,
invariant column):

        Rz = [ cos(a), -sin(a), 0, 0,
               sin(a),  cos(a), 0, 0,
                    0,       0, 1, 0,
                    0,       0, 0, 1 ]

I'll have to test to find out for sure, but I think the reversal of the signs of
the two sine functions is because the second source uses a right-handed coordinate
system while POV-Ray uses a left-handed system.

The other two rotation matrices in Rogers and Adams are as follows:

        Rx = [ 1,      0,       0, 0,
               0, cos(a), -sin(a), 0,
               0, sin(a),  cos(a), 0,
               0,      0,       0, 1 ]

        Ry  = [  cos(a), 0, sin(a), 0,
                      0, 1,      0, 0,
                -sin(a), 0, cos(a), 0,
                      0, 0,      0, 1 ]

*/


return new Matrix(
    /* v00 */ (this.v00 * that.v00 + this.v01 * that.v10 + this.v02 * that.v20),
    /* v01 */ (this.v00 * that.v01 + this.v01 * that.v11 + this.v02 * that.v21),
    /* v02 */ (this.v00 * that.v02 + this.v01 * that.v12 + this.v02 * that.v22),
    /* v10 */ (this.v10 * that.v00 + this.v11 * that.v10 + this.v12 * that.v20),
    /* v11 */ (this.v10 * that.v01 + this.v11 * that.v11 + this.v12 * that.v21),
    /* v12 */ (this.v10 * that.v02 + this.v11 * that.v12 + this.v12 * that.v22),
    /* v20 */ (this.v20 * that.v00 + this.v21 * that.v10 + this.v22 * that.v20),
    /* v21 */ (this.v20 * that.v01 + this.v21 * that.v11 + this.v22 * that.v21),
    /* v22 */ (this.v20 * that.v02 + this.v21 * that.v12 + this.v22 * that.v22),
    /* v30 */ (this.v30 * that.v00 + this.v31 * that.v10 + this.v32 * that.v20 + that.v30),
    /* v31 */ (this.v30 * that.v01 + this.v31 * that.v11 + this.v32 * that.v21 + that.v31),
    /* v32 */ (this.v30 * that.v02 + this.v31 * that.v12 + this.v32 * that.v22 + that.v32)
);



Matrix: {
    desc: false,
    conArgs: "v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32",
    conBlock: "Matrix.conBlock",
    snippets: ["Matrix.copy", "Matrix-methods"],
Init: true,
    mutable: [
        {
            name:  "v00",
            valid: "cpov.isFloat(val)",
            err:   "v00 must be a float."
        }, {
            name:  "v01",
            valid: "cpov.isFloat(val)",
            err:   "v01 must be a float."
        }, {
            name:  "v02",
            valid: "cpov.isFloat(val)",
            err:   "v02 must be a float."
        }, {
            name:  "v10",
            valid: "cpov.isFloat(val)",
            err:   "v10 must be a float."
        }, {
            name:  "v11",
            valid: "cpov.isFloat(val)",
            err:   "v11 must be a float."
        }, {
            name:  "v12",
            valid: "cpov.isFloat(val)",
            err:   "v12 must be a float."
        }, {
            name:  "v20",
            valid: "cpov.isFloat(val)",
            err:   "v20 must be a float."
        }, {
            name:  "v21",
            valid: "cpov.isFloat(val)",
            err:   "v21 must be a float."
        }, {
            name:  "v22",
            valid: "cpov.isFloat(val)",
            err:   "v22 must be a float."
        }, {
            name:  "v30",
            valid: "cpov.isFloat(val)",
            err:   "v30 must be a float."
        }, {
            name:  "v31",
            valid: "cpov.isFloat(val)",
            err:   "v31 must be a float."
        }, {
            name:  "v32",
            valid: "cpov.isFloat(val)",
            err:   "v32 must be a float."
        },
    ]
}


