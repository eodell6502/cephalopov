var scene = $CP.factory("Scene");
var box = $CP.factory("box");
box.corner1 = $CP.factory("VectorXYZ", [1, 2, 3]);
box.corner2 = $CP.factory("VectorXYZ", [4, 5, 6]);
box.sturm = true;
box.noRadiosity = true;
console.log(box.toSDL());

