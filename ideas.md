# Architecture

## Physics

Use [Vector3](https://threejs.org/docs/index.html#api/math/Vector3) (Three.js)

* celestialBody
    * mass
    * radius
    * state
    * (static) force (Newton)
* state
    * position
    * velocity
* SolarSystem
    * planet[]
    * all the functions for simulations
    * RK4

## Graphics

* Three.js