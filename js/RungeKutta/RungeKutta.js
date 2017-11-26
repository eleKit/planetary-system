class SolarSys {

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets) {
        this._planets = planets;
        //this._G = 6.674e-11;
        this._G = 1.0;
    }


    /*  METHODS
        used to compute the position at any t of planets in my solar system
     */


    /*  this function computes the acceleration for one planet in my solar system
        it uses the G Gravitational constant
     */

    accelerationRK(planet, position) {
        var diff_position;
        var sum_of_forces = new THREE.Vector3(0, 0, 0);
        var force;

        for (var p of this._planets) {
            if (p !== planet) {
                diff_position = position.clone().sub(p.position);
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

    rhs(X, planet) {
        return [X[1].clone(), this.accelerationRK(planet, X[0].clone())];
    }

    runge_kutta(planet, dt) {

        var k1, k2, k3, k4;

        const pos = planet.position;
        const vel = planet.velocity;

        k1 = this.rhs([pos, planet.velocity], planet);
        k2 = this.rhs([pos.add(k1[0].clone().multiplyScalar(dt / 2)), vel.clone().add(k1[1].clone().multiplyScalar(dt / 2))], planet);
        k3 = this.rhs([pos.add(k2[0].clone().multiplyScalar(dt / 2)), vel.clone().add(k2[1].clone().multiplyScalar(dt / 2))], planet);
        k4 = this.rhs([pos.add(k3[0].clone().multiplyScalar(dt)), vel.clone().add(k3[1].clone().multiplyScalar(dt))], planet);

        planet.position = pos.add(k1[0].add(k2[0].multiplyScalar(2)).add(k3[0].multiplyScalar(2)).add(k4[0]).multiplyScalar(dt / 6.0));
        planet.velocity = vel.add(k1[1].add(k2[1].multiplyScalar(2)).add(k3[1].multiplyScalar(2)).add(k4[1]).multiplyScalar(dt / 6.0));
    }


}


class CelestialB {
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

        this class contains the state of a planet,
        it contains the velocity and the position as two THREE.Vector3 elements
        also accel is the acceleration and is of type THREE.Vector3
     */

    constructor(name, mass, radius, position, velocity) {
        this.name = name;
        this._mass = mass;
        this._radius = radius;
        this._position = position.clone();
        this._velocity = velocity.clone();
    }


}


/*  Runge-Kutta method
    h=dt
    it takes
    the solar system
    a planet as CelestialBody type
    and a delta time
*/


/*  instead of the simple acceleration method inside SolarSystem class
    here the accelerationRK method HAS TO BE USED ONLY BY runge_kutta method
    because it doesn't calculate the real acceleration of the body, but the partial
    accelerations x,y,z needed by the Runge Kutta coefficients
 */

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

    var sun = new CelestialB('Sun', 100, 6, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    var earth = new CelestialB('Earth', 1, 6, new THREE.Vector3(1.0, 0, 0), new THREE.Vector3(0, -5.7, 0));

    var solarSys = new SolarSys([sun, earth]);

    let acc = solarSys.accelerationRK(earth, earth.position);

    console.log('acceleration' + acc.x.toFixed(3) + ' ' + acc.y.toFixed(3) + ' ' + acc.z.toFixed(3));


    const dt = 0.00001;
    var positions = [];

    for (let i = 0; i < 36000; i++) {


        solarSys.runge_kutta(earth, dt);
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





