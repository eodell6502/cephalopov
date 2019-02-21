# CephaloPOV

CephaloPOV is a JavaScript library and Node.js commandline tool for generating 
SDL (Scene Description Language) files for POV-Ray. It makes it easy to create 
complex scenes and animations by writing JavaScript programs without having to 
deal with SDL at all, though it is easy to mix with existing SDL code. 

**It's also currently (2018-09-20) pre-alpha, but should reach stable beta by mid-2019.**

## Design Goals

* Eliminate, as far as possible, any need to know SDL, _but_
  * Generated SDL code is easy to modify if you know SDL, _and_
  * It will remain easy to inject raw SDL into the output.
  * Major exceptions include the parametric and isosurface objects which absolutely require
    SDL, but if you can grok the math, you can easily learn the subset of SDL necessary to
    write functions for them.
* Replace and/or augment some POV-Ray features, including:
  * Transformations are extended and managed by the system.
  * The animation system is completely replaced.
  * Color management is _much_ more sophisticated.
* An easy forward kinematics system to create compound objects with moving parts.
* Objects can be output as SDL macros for inclusion in the traditional SDL workflow.
* Larger selection of spline types.
* New camera features:
  * Cameras can automatically track moving objects.
  * Cameras can be included in CSG union-like relationships.
  * A new stereoscopic camera type.
* A full-featured geometric query system makes it easy for the math-impaired to build extremely complex objects.
* Have documentation that is at least as awesome as the POV-Ray docs.

## Current Status

As noted above, CephaloPOV is pre-alpha, i.e., most of the object system has 
been implemented and is undergoing testing and debugging. Those parts that have 
been implemented have also been documented, albeit rather tersely at this point. 
There are still definitely bugs to be shaken loose and some rough edges to 
refine, of course, but you can already do as much or more with shapes in 
CephaloPOV and JavaScript as you can in SDL.

The main core functionality still missing is the surface texture system, which 
is -- notoriously -- more complex than the shapes. Parts of it have been 
implemented but not documented and exposed. In the meantime, every shape has a 
texture member that takes an SDL string, so if you're a POV-Ray veteran, you can 
use that for now.

The interfaces implemented so far are mostly stable. Transformations are about 
to get a significant overhaul, but the changes will be mostly additive and 
backward-compatible.

