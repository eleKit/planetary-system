class SolarSystem {

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets) {
        this._planets = planets;
        //this._G = 6.674e-11;
        this._G = 1.0;
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




THREE.Vector3.prototype.toString = function() {
    return '(' + this.x.toFixed(3) + ', ' + this.y.toFixed(3) + ', ' + this.z.toFixed(3) + ')';
};

function main() {

    canvasHolder = document.getElementById( 'webgl' );
    context = canvasHolder.getContext('2d');

    context.fillStyle = 'white';
    var w = canvasHolder.width, h = canvasHolder.height;
    context.fillRect( 0, 0, w, h);

    //context.globalCompositeOperation='copy';

    // -------------

    var sun = new CelestialBody('Sun', 100,  SUN.INITIAL_POSITION.multiplyScalar(1e-9), SUN.INITIAL_VELOCITY);
    var earth = new CelestialBody('Earth', 1,  EARTH.INITIAL_POSITION.multiplyScalar(1e-9), EARTH.INITIAL_VELOCITY);
    var moon = new CelestialBody('Earth', 1,  MOON.INITIAL_POSITION.multiplyScalar(1e-9), MOON.INITIAL_VELOCITY);
    var mercury = new CelestialBody('Earth', 1,  MERCURY.INITIAL_POSITION.multiplyScalar(1e-9), MERCURY.INITIAL_VELOCITY);
    var mars = new CelestialBody('Earth', 1,  MARS.INITIAL_POSITION.multiplyScalar(1e-9), MARS.INITIAL_VELOCITY);
    var venus = new CelestialBody('Earth', 1,  VENUS.INITIAL_POSITION.multiplyScalar(1e-9), VENUS.INITIAL_VELOCITY);
    var jupiter = new CelestialBody('Earth', 1,  JUPITER.INITIAL_POSITION.multiplyScalar(1e-9), JUPITER.INITIAL_VELOCITY);
    var saturn = new CelestialBody('Earth', 1,  SATURN.INITIAL_POSITION.multiplyScalar(1e-9), SATURN.INITIAL_VELOCITY);
    var uranus = new CelestialBody('Earth', 1,  URANUS.INITIAL_POSITION.multiplyScalar(1e-9), URANUS.INITIAL_VELOCITY);
    var neptune = new CelestialBody('Earth', 1, NEPTUNE.INITIAL_POSITION.multiplyScalar(1e-9), NEPTUNE.INITIAL_VELOCITY);




    console.log('\n earth pos ' + earth.position.toString() + ' length=' + earth.position.length().toFixed(3) +
        ' \n sun pos ' + sun.position.toString() + ' length=' + sun.position.length().toFixed(3) +
        ' \n moon pos ' + moon.position.toString() + ' length=' + moon.position.length().toFixed(3) +
        ' \n mercury pos ' + mercury.position.toString() + ' length=' + mercury.position.length().toFixed(3) +
        ' \n venus pos ' + venus.position.toString() + ' length=' + venus.position.length().toFixed(3)  +
        ' \n jupiter pos ' + jupiter.position.toString() + ' length=' + jupiter.position.length().toFixed(3));


    /*
        T = 2pi/10= 0,6283185307 , sqrt(M/r * G) = v,  M = 100, m = 1 , r = 1, G = 1
     */



    // Sun
    context.beginPath();
    context.strokeStyle = 'red';
    context.strokeRect(sun.position.x * 100+200, sun.position.y * 100+200, 1,1);
    context.stroke();
    //context.closePath();


    context.beginPath();
    context.strokeStyle = 'black';
    context.strokeRect(earth.position.x * 100+200, earth.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'yellow';
    context.strokeRect(moon.position.x * 100+200, moon.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'blue';
    context.strokeRect(mercury.position.x * 100+200, mercury.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'pink';
    context.strokeRect(venus.position.x * 100+200, venus.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'brown';
    context.strokeRect(mars.position.x * 100+200, mars.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'black';
    context.strokeRect(jupiter.position.x * 100+200, jupiter.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'black';
    context.strokeRect(uranus.position.x * 100+200, uranus.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'black';
    context.strokeRect(neptune.position.x * 100+200, neptune.position.y * 100+200, 1,1);
    context.stroke();

    context.beginPath();
    context.strokeStyle = 'orange';
    context.strokeRect(saturn.position.x * 100+200, saturn.position.y * 100+200, 1,1);
    context.stroke();


}
