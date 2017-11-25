class SolarSystem{

    /*  the SolarSystem contains an Array of CelestialBody elements
     */

    constructor(planets){
        this._planets=planets;
        //this._G = 6.674e-11;
        this._G= 1;
    }


    /*  METHODS
        used to compute the position at any t of planets in my solar system
     */


    /*  this function computes the acceleration for one planet in my solar system
        it uses the G Gravitational constant
     */

     accelerationRK(planet, position){
        var diff_position= new THREE.Vector3();
        var sum_of_forces = new THREE.Vector3(0,0,0);
        var force = 0.0;

        for (const p of this._planets){
            //if p isn't the planet i add the contribution to the acceleration otherwise ignore
            if (p === planet) {
                //DO NOTHING
            } else {

                /*  first step to compute the distance between planets
                    this vector is the one used to compute force vector and acceleration vector
                 */
                diff_position = position.clone().sub(p._position.clone());


                /*  I take the influence of each planet p in the solar system
                    to compute the force attribute of the "planet"
                 */
                force = (this._G * planet._mass * p._mass) / diff_position.lengthSq();

                /*  now i have the module of force but i want the three components x,y,z
                    so i use the diff_position vector normalized to obtain the right force
                    vector components
                */


                diff_position.normalize().multiplyScalar(-force);

                sum_of_forces.add(diff_position);
            }

        }

        /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
            acceleration i need to divide sum_of_forces by the mass of the "planet"
         */

        sum_of_forces.divideScalar(planet._mass);

        return sum_of_forces;
    }



    runge_kutta(planet, dt) {

        //R-K coefficients for position to calculate acceleration
        var pos1 ;
        var pos2;
        var pos3 ;
        var pos4 ;

        //R-K coefficients for velocity
        var vel1;
        var vel2;
        var vel3 ;
        var vel4 ;

        //sum of coefficients
        var next_position ;
        var next_velocity ;


        /*  in temp variable i save the position coefficient to calculate the new acceleration
            needed by velocity coefficient
         */


      /*  console.log('dt ' + dt/2 +
            ' \n RUNGE KUTTA BEFORE earth pos ' + planet._position.x +' ' + planet._position.y + ' ' + planet._position.z +
            '\n earth vel ' + planet._velocity.x +' ' + planet._velocity.y + ' ' + planet._velocity.z
            );
*/

        pos1 = planet._velocity.clone();


        vel1 = this.accelerationRK(planet, planet._position);


        vel2 = this.accelerationRK(planet, planet._position.clone().add(pos1.clone().multiplyScalar(dt/2)));
        pos2 = planet._velocity.clone().cross(vel1.clone().multiplyScalar(dt/2));


        vel3 = this.accelerationRK(planet, planet._position.clone().add(pos2.clone().multiplyScalar(dt/2)));
        pos3 = planet._velocity.clone().cross(vel2.clone().multiplyScalar(dt/2));


        vel4 = this.accelerationRK(planet, planet._position.clone().add(pos3.clone().multiplyScalar(dt)));
        pos4 = planet._velocity.clone().cross(vel3.clone().multiplyScalar(dt));

       /* console.log('RUNGE KUTTA AFTER  pos1 ' + pos1.x +' ' + pos1.y + ' ' + pos1.z +
            '\n  pos2 ' + pos2.x +' ' + pos2.y + ' ' + pos2.z +
            '\n pos3 ' + pos3.x +' ' + pos3.y + ' ' + pos3.z +
            ' \n pos4 ' + pos4.x + ' ' + pos4.y + ' ' + pos4.z );

        console.log('RUNGE KUTTA AFTER  vel1 ' + vel1.x +' ' + vel1.y + ' ' + vel1.z +
            '\n  vel2 ' + vel2.x +' ' + vel2.y + ' ' + vel2.z +
            '\n vel3 ' + vel3.x +' ' + vel3.y + ' ' + vel3.z +
            ' \n vel4 ' + vel4.x + ' ' + vel4.y + ' ' + vel4.z );
*/


        //calculate sum of coefficients + old position | old velocity

        next_position = planet._position.clone().add(pos1.clone().add(pos2.clone().multiplyScalar(2)).add(pos3.clone().multiplyScalar(2)).add(pos4.clone()).multiplyScalar(dt/6));

        next_velocity = planet._velocity.clone().add(vel1.clone().add(vel2.clone().multiplyScalar(2)).add(vel3.clone().multiplyScalar(2)).add(vel4.clone()).multiplyScalar(dt/6));


        planet._position = next_position;
        planet._velocity = next_velocity;


    }



}


class CelestialBody {


    /*  mass and radius are float

        this class contains the state of a planet,
        it contains the velocity and the position as two THREE.Vector3 elements
        also accel is the acceleration and is of type THREE.Vector3
     */

    constructor(mass, radius, position, velocity){
        this._mass= mass;
        this._radius = radius;
        this._position = position.clone();
        this._velocity= velocity.clone();
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







function main() {

    var sun = new CelestialBody(100, 6, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    var earth = new CelestialBody(1, 6, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 10, 0));

    var solarSys = new SolarSystem([sun, earth]);

    let acc = solarSys.accelerationRK(earth, earth._position)

    console.log('acceleration' + acc.x.toFixed(3) + ' ' + acc.y.toFixed(3) + ' ' + acc.z.toFixed(3) );


    const dt = 0.001745329252;

    for (let i = 0; i < 360; i++) {


        solarSys.runge_kutta(earth, dt);
        console.log('t= ' + i + '\n earth pos ' + earth._position.x.toFixed(3) + ' ' + earth._position.y.toFixed(3) + ' ' + earth._position.z.toFixed(3) +
        '\n earth vel ' + earth._velocity.x.toFixed(3) + ' ' + earth._velocity.y.toFixed(3) + ' ' + earth._velocity.z.toFixed(3) +
        ' \n sun pos ' + sun._position.x.toFixed(3) + ' ' + sun._position.y.toFixed(3) + ' ' + sun._position.z.toFixed(3));
    }
}





