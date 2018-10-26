cd ..
node codegen
cd tests
node ..\cpov.js -dd -i d:\projects\CephaloPOV\tests\test.js -p d:\projects\CephaloPOV\tests\preamble1.sdl -p d:\projects\CephaloPOV\tests\preamble2.sdl -s colors.inc -s glass.inc
