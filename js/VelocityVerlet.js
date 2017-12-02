class SolarSystem {

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets) {
        this._planets = planets;
        this._G = 6.67408e-11;
        //this._G = 1.0;
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


    updateVelocityVerlet(dt) {

        var new_planet_state = {};


        for (var planet of this._planets) {
            var new_pos;
            var new_vel;

            var partial_velocity = new THREE.Vector3();

            partial_velocity = planet.velocity.clone().add(this.acceleration(planet).clone().multiplyScalar(dt / 2));

            new_pos = planet.position.clone().add(partial_velocity.clone().multiplyScalar(dt));
            new_vel = partial_velocity.clone().add(this.acceleration(planet).clone().multiplyScalar(dt / 2));

            new_planet_state[planet.name] = {'position': new_pos, 'velocity': new_vel};

        }

        for (var planet of this._planets) {
            planet.position = new_planet_state[planet.name]['position'];
            planet.velocity = new_planet_state[planet.name]['velocity'];
        }

    }

    totalEnergy(planet){
        return planet.kineticEnergy() + this.gravitationalEnergy(planet);
    }

    gravitationalEnergy(planet) {
        var energy = 0;
        var diff_position;

        for (var p of this._planets) {
            if (p !== planet) {
                diff_position = planet.position.clone().sub(p.position);
                energy += -(this._G * planet._mass * p._mass) / diff_position.length();
            }

        }
        return energy;
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

    kineticEnergy() {
        return 0.5 * this._mass * this._velocity.lengthSq();
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



