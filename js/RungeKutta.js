class SolarSystem{

    get planets() {
        return this._planets;
    }

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

    // TODO check if this method is useful
      acceleration(planet){
         //TODO check if var can be used
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

                diff_position = p.position.sub(planet.position);


                power_dist = diff_position.lengthSq();

                dst = Math.sqrt(power_dist);

                /*  I take the influence of each planet p in the solar system
                    to compute the force attribute of the "planet"
                 */
                force = (G * planet.mass * p.mass) / power_dist;

                /*  now i have the module of force but i want the three components x,y,z
                    so i use the diff_position vector normalized to obtain the right force
                    vector components
                */

                diff_position.divideScalar(dst);

                diff_position.multiplyScalar(force);

                sum_of_forces.add(diff_position);

            }

        }

        /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
            acceleration i need to divide sum_of_forces by the mass of the "planet"
         */

        sum_of_forces.divideScalar(planet.mass);

        planet.accel(sum_of_forces);
    }



}


class CelestialBody {

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(value) {
        this._velocity = value;
    }

    get accel() {
        return this._accel;
    }

    set accel(value) {
        this._accel = value;
    }


    get radius() {
        return this._radius;
    }
    get mass() {
        return this._mass;
    }

    /*  mass and radius are float

        this class contains the state of a planet,
        it contains the velocity and the position as two THREE.Vector3 elements
        also accel is the acceleration and is of type THREE.Vector3
     */

    constructor(mass, radius, position){
        this._mass= mass;
        this._radius = radius;
        this._position = position;
        this._velocity= new THREE.Vector3();
        this._accel = new THREE.Vector3();

    }


}






/*  Runge-Kutta method
    h=dt
    it takes
    the solar system
    a planet as CelestialBody type
    and a delta time
*/

function accelerationRK(solarSys, planet, position){
    const G = 6.674e-11;
    var diff_position= new THREE.Vector3();
    var sum_of_forces = new THREE.Vector3(0,0,0);
    var power_dist = 0.0;
    var dst = 0.0;
    var force = 0.0;

    for (const p of solarSys.planets){
        //if p isn't the planet i add the contribution to the acceleration otherwise ignore
        if (p === planet) {
            //DO NOTHING
        } else {

            /*  first step to compute the distance between planets
                this vector is the one used to compute force vector and acceleration vector
             */

            diff_position = p.position.sub(position);


            power_dist = diff_position.lengthSq();

            dst = Math.sqrt(power_dist);

            /*  I take the influence of each planet p in the solar system
                to compute the force attribute of the "planet"
             */
            force = (G * planet.mass * p.mass) / power_dist;

            /*  now i have the module of force but i want the three components x,y,z
                so i use the diff_position vector normalized to obtain the right force
                vector components
            */

            diff_position.divideScalar(dst);

            diff_position.multiplyScalar(force);

            sum_of_forces.add(diff_position);

        }

    }

    /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
        acceleration i need to divide sum_of_forces by the mass of the "planet"
     */

    sum_of_forces.divideScalar(planet.mass);

    return sum_of_forces;
}



function runge_kutta(solarSys, planet, dt) {

    //R-K coefficients for position to calculate acceleration
    var pos1 = new THREE.Vector3();
    var pos2 = new THREE.Vector3();
    var pos3 = new THREE.Vector3();
    var pos4 = new THREE.Vector3();

    //R-K coefficients for velocity
    var vel1 = new THREE.Vector3();
    var vel2 = new THREE.Vector3();
    var vel3 = new THREE.Vector3();
    var vel4 = new THREE.Vector3();

    //sum of coefficients
    var next_position = new THREE.Vector3();
    var next_velocity = new THREE.Vector3();


    /*  in temp variable i save the position coefficient to calculate the new acceleration
        needed by velocity coefficient
     */

    var temp = new THREE.Vector3();


    //K1 for position and velocity

    pos1 = planet.velocity;
    vel1 =  planet.accel;


    //K2 for position and velocity

    pos2 = planet.position.add(pos1.multiplyScalar(dt/2));
    vel2 = planet.velocity.add(vel1.multiplyScalar(dt/2));

    temp = pos2;

    pos2 = vel2;
    vel2 = accelerationRK(solarSys, planet, temp);

    //K3 for position and velocity

    pos3 = planet.position.add(pos2.multiplyScalar(dt/2));
    vel3 = planet.velocity.add(vel2.multiplyScalar(dt/2));

    temp = pos3;

    pos3 = vel3;
    vel3 = accelerationRK(solarSys, planet, temp);

    //K4 for position and velocity

    pos4 = planet.position.add(pos3.multiplyScalar(dt));
    vel4 = planet.velocity.add(vel3.multiplyScalar(dt));

    temp = pos4;

    pos4 = vel4;
    vel4 = accelerationRK(solarSys, planet, temp);


    //calculate sum of coefficients

    next_position = planet.position.add(pos1.add(pos2.multiplyScalar(2)).add(pos3.multiplyScalar(2)).add(pos4).multiplyScalar(dt/6));

    next_velocity = planet.velocity.add(vel1.add(vel2.multiplyScalar(2)).add(vel3.multiplyScalar(2)).add(vel4).multiplyScalar(dt/6));


    planet.position(next_position);
    planet.velocity(next_velocity);

    //TODO now need to calculate the new correct acceleration


}





