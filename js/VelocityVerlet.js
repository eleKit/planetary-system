class SolarSystem {

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets) {
        this._planets = planets;
        this._G = 6.674e-11;
    }


    acceleration(planet) {
        var diff_position;
        var sum_of_forces = new THREE.Vector3(0, 0, 0);
        var force;

        for (var p of this._planets) {
            if (p !== planet) {
                diff_position = planet.position.clone().sub(p.position);
                force = -(this._G * planet._mass * p._mass) / diff_position.lengthSq();

                diff_position.normalize().multiplyScalar(force);
                sum_of_forces.add(diff_position);
            }

        }

        /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
            acceleration i need to divide sum_of_forces by the mass of the "planet"
         */
        return sum_of_forces.divideScalar(planet._mass);
    }

    velocity_verlet(planet, dt){

        var partial_velocity = new THREE.Vector3();

        partial_velocity = planet.velocity.clone().add(this.acceleration(planet).clone().multiplyScalar(dt/2));

        planet.position = planet.position.clone().add(partial_velocity.clone().multiplyScalar(dt));

        planet.velocity = partial_velocity.clone().add(this.acceleration(planet).clone().multiplyScalar(dt/2));


    }

    updateVelocityVerlet(dt){
        for (var p of this._planets) {
            this.velocity_verlet(p, dt);
        }

    }


}



class CelestialBody {
    get velocity() {
        return this._velocity.clone();
    }

    set velocity(value) {
        this._velocity = value.clone();
    }

    get position() {
        return this._position.clone();
    }

    set position(value) {
        this._position = value.clone();
    }


    /*  mass and radius are float
        this class contains the velocity and the position as two THREE.Vector3 elements
     */

    constructor(name, mass, position, velocity) {
        this.name = name;
        this._mass = mass;
        this._position = position.clone();
        this._velocity = velocity.clone();
    }


}



