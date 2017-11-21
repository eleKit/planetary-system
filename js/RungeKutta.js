class SolarSystem{
    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets){
        this._planets=planets;
    }


    /*  METHODS
        used to compute the position at any t of planets in my solar system
     */


    /*  this function computes the acceleration for one planet in my solar system
        it uses the G Gravitational constant
     */

    acceleration(planet){
        const G = 6.674e-11;
        var diff_position= new THREE.Vector3();
        var sum_of_forces = new THREE.Vector3(0,0,0);
        var power_dist = 0.0;
        var dst = 0.0;
        var force = 0.0;

        for (const p of this._planets){
            //if p isn't the planet i add the contribution to the acceleration otherwise ignore
            if (p === planet) {
                //DO NOTHING
            } else {

                /*  first step to compute the distance between planets
                    this vector is the one used to compute force vector and acceleration vector
                 */

                diff_position = p.position().sub(planet.position());


                power_dist = diff_position.lengthSq();

                dst = Math.sqrt(power_dist);

                /*  I take the influence of each planet p in the solar system
                    to compute the force attribute of the "planet"
                 */
                force = (G * planet._mass * p._mass) / power_dist;

                /*  now i have the module of force but i want the three components x,y,z
                    so i use the diff_position vector normalized to obtain the right force
                    vector components
                */

                diff_position.normalize();

                diff_position.multiplyScalar(force);

                sum_of_forces.add(diff_position);

            }

        }

        /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
            acceleration i need to divide sum_of_forces by the mass of the "planet"
         */

        sum_of_forces.divideScalar(planet._mass);

        planet.accel(sum_of_forces);
    }


    /*  Now begins the Runge-Kutta method
     */









}


class CelestialBody {

    get accel() {
        return this._accel;
    }

    set accel(value) {
        this._accel = value;
    }

    get state() {
        return this._state;
    }
    get radius() {
        return this._radius;
    }
    get mass() {
        return this._mass;
    }

    /*  mass and radius are float
        state is of type PlanetState
     */

    constructor(mass, radius, state){
        this._mass= mass;
        this._radius = radius;
        this._state = state;
        this._accel = new THREE.Vector3();
    }


}


/*  this class represents the state of a planet,
    it contains the velocity and the position as two THREE.Vector3 elements
 */
class PlanetState {
    get velocity() {
        return this._velocity;
    }

    set velocity(value) {
        this._velocity = value;
    }
    set position(value) {
        this._position = value;
    }
    get position() {
        return this._position;
    }

    constructor(position, velocity){
        this._position = position;
        this._velocity = velocity;
    }



}

