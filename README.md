# CephaloPOV

CephaloPOV is a JavaScript library and Node.js commandline tool for generating 
SDL (Scene Description Language) files for POV-Ray. It makes it easy to create 
complex scenes and animations by writing JavaScript programs without having to 
deal with SDL at all, though it is easy to mix with existing SDL code. 

**It's also currently (2018-09-20) pre-alpha, but should reach stable beta by the
end of 2018 or early 2019.**

## Major Features

* Replaces or augments some POV-Ray features, including:
  * Transformations are extended and managed by the system.
  * The animation system is completely replaced.
  * Cameras can now be part of CSG unions.
  * Color management is _much_ more sophisticated.
* An easy forward kinematics system to create compound objects with moving parts.
* Objects can be output as SDL macros for inclusion in the "traditional" SDL workflow.
* Larger selection of spline types.
* Cameras can automatically track moving objects.
* A full-featured geometric query system makes it easy for the math-impaired to build extremely complex objects.

