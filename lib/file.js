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

var fs = require("fs");

//==============================================================================
// File I/O wrappers. CephaloPOV doesn't do anything fancy with files presently,
// so just basic open, read, write, and close are supported. Other functionality
// will be added as needed.
//
//     path   ... full path to file
//     mode ..... the usual stdio modes, "r", "w", "a", etc.
//     serial ... Optional. If supplied, the first instance of /0+/ in the
//                filename will be replaced by this integer value, padded to
//                the same number of characters.
//
//==============================================================================

function File(path, mode, serial) {
    this.path   = path;
    this.mode   = mode;
    this.serial = serial === undefined ? null : serial;
    this.open   = false;
    this.handle = null;

    if(this.serial !== null) {
        var parts = this.path.split(/[\/\\]/);
        var match = parts[parts.length - 1].match(/0+/);
        if(match !== null) {
            parts[parts.length - 1] = parts[parts.length - 1].replace(/0+/, this.zeroPad(this.serial, match[0].length));
        }
        this.path = parts.join("/");
    }

    this.handle = fs.openSync(this.path, this.mode);
    if(this.handle)
        this.open = true;
}


//------------------------------------------------------------------------------
// Pulls the complete contents currently.
//------------------------------------------------------------------------------

File.prototype.read = function() {
    if(!this.open)
        throw new Error("[File.read]: No file is currently open.");
    return fs.readFileSync(this.handle).toString();
}


//------------------------------------------------------------------------------

File.prototype.write = function(data) {
    if(!this.open)
        throw new Error("[File.write]: No file is currently open.");
    fs.writeSync(this.handle, data);
}


//------------------------------------------------------------------------------

File.prototype.close = function() {
    fs.closeSync(this.handle);
    this.open   = false;
    this.handle = null;
}


//------------------------------------------------------------------------------
// Left-pads num with zeroes until it is pad characters wide. Does nothing if
// num is already greater than pad characters long.
//------------------------------------------------------------------------------

File.prototype.zeroPad = function(num, pad) {
    var result = num.toString().split('');
    while(result.length < pad)
        result.unshift('0');
    return result.join('');
}


module.exports = File;
