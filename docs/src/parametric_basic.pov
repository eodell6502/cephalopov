//==========================================================================
// POV FILE: ./docs/src/parametric_basic.pov
// FRAME: 15
// CLOCK TIME: 15
//==========================================================================

#version 3.7;

global_settings {
    ambient_light  <0.25, 0.25, 0.25>
    assumed_gamma 1
}

union {
    box { // panelBottom
        <-3.1, -3, 3.1>, <3, -3.1, -3>
        texture { pigment { color <0.75, 0.75, 0.75> }}
    }
    box { // panelLeft
        <-3.1, 3, 3.1>, <-3, -3.1, -3>
        texture { pigment { color <0.75, 0.75, 0.75> }}
    }
    box { // panelRight
        <-3.1, 3, 3.1>, <3, -3.1, 3>
        texture { pigment { color <0.75, 0.75, 0.75> }}
    }
    cylinder { // leftMajorGridA-3
        <-3, -3, 3>, <-3, -3, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB-3
        <-3, -3, -3>, <-3, 3, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA-3
        <3, -3, 3>, <-3, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB-3
        <-3, -3, 3>, <-3, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA-3
        <3, -3, -3>, <-3, -3, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB-3
        <-3, -3, -3>, <-3, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridA-2
        <-3, -2, 3>, <-3, -2, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB-2
        <-3, -3, -2>, <-3, 3, -2>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA-2
        <3, -2, 3>, <-3, -2, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB-2
        <-2, -3, 3>, <-2, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA-2
        <3, -3, -2>, <-3, -3, -2>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB-2
        <-2, -3, -3>, <-2, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridA-1
        <-3, -1, 3>, <-3, -1, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB-1
        <-3, -3, -1>, <-3, 3, -1>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA-1
        <3, -1, 3>, <-3, -1, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB-1
        <-1, -3, 3>, <-1, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA-1
        <3, -3, -1>, <-3, -3, -1>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB-1
        <-1, -3, -3>, <-1, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridA0
        <-3, 0, 3>, <-3, 0, -3>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // leftMajorGridB0
        <-3, -3, 0>, <-3, 3, 0>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // rightMajorGridA0
        <3, 0, 3>, <-3, 0, 3>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // rightMajorGridB0
        <0, -3, 3>, <0, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // bottomMajorGridA0
        <3, -3, 0>, <-3, -3, 0>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // bottomMajorGridB0
        <0, -3, -3>, <0, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.0, 0.0> }}
    }
    cylinder { // leftMajorGridA1
        <-3, 1, 3>, <-3, 1, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB1
        <-3, -3, 1>, <-3, 3, 1>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA1
        <3, 1, 3>, <-3, 1, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB1
        <1, -3, 3>, <1, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA1
        <3, -3, 1>, <-3, -3, 1>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB1
        <1, -3, -3>, <1, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridA2
        <-3, 2, 3>, <-3, 2, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB2
        <-3, -3, 2>, <-3, 3, 2>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA2
        <3, 2, 3>, <-3, 2, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB2
        <2, -3, 3>, <2, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA2
        <3, -3, 2>, <-3, -3, 2>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB2
        <2, -3, -3>, <2, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridA3
        <-3, 3, 3>, <-3, 3, -3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // leftMajorGridB3
        <-3, -3, 3>, <-3, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridA3
        <3, 3, 3>, <-3, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // rightMajorGridB3
        <3, -3, 3>, <3, 3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridA3
        <3, -3, 3>, <-3, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    cylinder { // bottomMajorGridB3
        <3, -3, -3>, <3, -3, 3>, 0.05
        texture { pigment { color <0.5, 0.5, 0.5> }}
    }
    light_source { // light
        <4.5, 4.5, -4.5>, rgb <1.5, 1.5, 1.5>
    }
    split_union off
}

camera {
    perspective
    location <10.2, 6, -10.2>
    right <1, 0.05, 0>
    angle 38
    look_at <0, -0.8, 0>
}

parametric {
    function { 1.0 * (1 - 0.5 * v / pi) * sin(5 * v + 0.5 *pi) * (1 - cos(u)) + 0.2 * sin(5 * v + 0.5 * pi) }
    function { 8 * 0.5 * v / pi + 1.0 * (1 - 0.5 * v / pi) * sin(u) }
    function { 1.0 * (1 - 0.5 * v / pi ) * cos(5 * v + 0.5 * pi) * (1 - cos(u)) + 0.2 * cos(5 * v + 0.5 * pi) }
    <0, 0>, <6.283185307179586, 6.283185307179586>
    contained_by {
        box {
            <-6.283185307179586, -6.283185307179586, -6.283185307179586>, <6.283185307179586, 16.755160819145562, 6.283185307179586>
        }
    }
    max_gradient 10
    accuracy 0.0035
    precompute 18 x, y, z
    texture { pigment { color <1, 1, 0> }}
    matrix <2.4492935982947065e-17, 0, -0.4, 0, 0.4, 0, 0.4, 0, 2.4492935982947065e-17, 0, 0, 0>
}