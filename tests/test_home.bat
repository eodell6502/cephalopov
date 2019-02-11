cd ..
node codegen -c
cd tests
node ..\cpov.js -dd -i d:\prog\CephaloPOV\tests\test.js -p d:\prog\CephaloPOV\tests\preamble1.sdl -p d:\prog\CephaloPOV\tests\preamble2.sdl -s colors.inc -s glass.inc
