class SolarSystem {

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets) {
        this._planets = planets;
        this._G = 6.674e-11;
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
        this._position = position;
        this._velocity = velocity;
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

    var sun = new CelestialBody('Sun', 100, 6, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    var earth = new CelestialBody('Earth', 1, 6, new THREE.Vector3(1.0, 0, 0), new THREE.Vector3(0, -10, 0));

    var solarSys = new SolarSystem([sun, earth]);

    let acc = solarSys.acceleration(earth, earth.position);

    console.log('acceleration' + acc.x.toFixed(3) + ' ' + acc.y.toFixed(3) + ' ' + acc.z.toFixed(3));

    /*
        T = 2pi/10= 0,6283185307 , sqrt(M/r * G) = v,  M = 100, m = 1 , r = 1, G = 1
     */

    const dt = 0.001;
    var positions = [];

    for (let i = 0; i < 628; i++) {


        solarSys.velocity_verlet(earth, dt);
        console.log('t= ' + (i+1) + '\n earth pos ' + earth.position.toString() + ' length=' + earth.position.length().toFixed(3) +
            '\n earth vel ' + earth.velocity.toString() + ' length=' + earth.velocity.length().toFixed(3) +
            ' \n sun pos ' + sun.position.toString() + ' length=' + sun.position.length().toFixed(3));

        positions.push([earth.position.x, earth.position.y]);
    }

    context.beginPath();
    //context.moveTo(positions[0][0]*100+200, positions[0][1]*100+200);
    for(const p of positions)
        context.lineTo(p[0]*100+200, p[1]*100+200);
    context.lineWidth = 5;
    context.strokeStyle = 'blue';
    context.stroke();
    //context.closePath();

    // Sun
    context.beginPath();
    context.strokeStyle = 'red';
    context.strokeRect(sun.position.x*100+200, sun.position.y*100+200, 1,1);
    context.stroke();
    //context.closePath();

}


