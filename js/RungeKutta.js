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

    // TODO check if this method is useful
      acceleration(planet){
         //TODO check if var can be used
        const G = 6.674e-11;
        var diff_position= new THREE.Vector3();
        var sum_of_forces = new THREE.Vector3();
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

                diff_position = planet._position.clone().sub(p._position.clone());


                power_dist = Math.pow((diff_position.clone().x), 2) +  Math.pow((diff_position.clone().y), 2) +  Math.pow((diff_position.clone().y), 2);

                dst = Math.sqrt(power_dist);

                /*  I take the influence of each planet p in the solar system
                    to compute the force attribute of the "planet"
                 */
                force = (G * planet._mass * p._mass) / power_dist;

                /*  now i have the module of force but i want the three components x,y,z
                    so i use the diff_position vector normalized to obtain the right force
                    vector components
                */

                diff_position.divideScalar(dst);

                diff_position.multiplyScalar(-force);

                sum_of_forces.add(diff_position);

            }

        }

        /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
            acceleration i need to divide sum_of_forces by the mass of the "planet"
         */

        sum_of_forces.divideScalar(planet._mass);

        planet._accel = sum_of_forces;
        //planet.accel(sum_of_forces);
    }



}


class CelestialBody {


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


/*  instead of the simple acceleration method inside SolarSystem class
    here the accelerationRK method HAS TO BE USED ONLY BY runge_kutta method
    because it doesn't calculate the real acceleration of the body, but the partial
    accelerations x,y,z needed by the Runge Kutta coefficients
 */

function accelerationRK(solarSys, planet, position){
    const G = 6.674e-11;
    var diff_position= new THREE.Vector3();
    var sum_of_forces = new THREE.Vector3(0,0,0);
    var power_dist = 0.0;
    var dst = 0.0;
    var force = 0.0;

    for (const p of solarSys._planets){
        //if p isn't the planet i add the contribution to the acceleration otherwise ignore
        if (p === planet) {
            //DO NOTHING
        } else {

            /*  first step to compute the distance between planets
                this vector is the one used to compute force vector and acceleration vector
             */

            diff_position = position.clone().sub(p._position.clone());


            //power_dist = diff_position.lengthSq();
            power_dist = Math.pow((diff_position.clone().x), 2) +  Math.pow((diff_position.clone().y), 2) +  Math.pow((diff_position.clone().y), 2);


            dst = Math.sqrt(power_dist);

            /*  I take the influence of each planet p in the solar system
                to compute the force attribute of the "planet"
             */
            force = (G * planet._mass * p._mass) / power_dist;

            /*  now i have the module of force but i want the three components x,y,z
                so i use the diff_position vector normalized to obtain the right force
                vector components
            */

            diff_position.divideScalar(dst);

            diff_position.multiplyScalar(-force);

            sum_of_forces.add(diff_position);

        }

    }

    /*  force [ m^3 * kg^(-1) * s^(-2) ] to compute the
        acceleration i need to divide sum_of_forces by the mass of the "planet"
     */

    sum_of_forces.divideScalar(planet._mass);

    return sum_of_forces;
}



function runge_kutta(solarSys, planet, dt) {

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


    console.log('dt ' + dt/2 +
        ' \n RUNGE KUTTA BEFORE earth pos ' + planet._position.x +' ' + planet._position.y + ' ' + planet._position.z +
        '\n earth vel ' + planet._velocity.x +' ' + planet._velocity.y + ' ' + planet._velocity.z +
        '\n acceleration ' + planet._accel.x +' ' + planet._accel.y + ' ' + planet._accel.z );

    pos1 = planet._velocity.clone();

    //vel1 = accelerationRK(solarSys, planet, planet._position.clone());
    vel1 = planet._accel.clone().cross(planet._position);

    //vel2 = accelerationRK(solarSys, planet, planet._position.clone().add(pos1.clone().multiplyScalar(dt/2)));
    vel2 = planet._accel.clone().cross(planet._position.clone().add(pos1.clone().multiplyScalar(dt/2)));
    pos2 = planet._velocity.clone().cross(vel1.clone().multiplyScalar(dt/2));

    //vel3 = accelerationRK(solarSys, planet, planet._position.clone().add(pos2.clone().multiplyScalar(dt/2)));
    vel3 = planet._accel.clone().cross(planet._position.clone().add(pos2.clone().multiplyScalar(dt/2)));
    pos3 = planet._velocity.clone().cross(vel2.clone().multiplyScalar(dt/2));

    //vel4 = accelerationRK(solarSys, planet, planet._position.clone().add(pos3.clone().multiplyScalar(dt)));
    vel4 = planet._accel.clone().cross(planet._position.clone().add(pos3.clone().multiplyScalar(dt/2)));
    pos4 = planet._velocity.clone().cross(vel3.clone().multiplyScalar(dt/2));

    console.log('RUNGE KUTTA AFTER  pos1 ' + pos1.x +' ' + pos1.y + ' ' + pos1.z +
        '\n  pos2 ' + pos2.x +' ' + pos2.y + ' ' + pos2.z +
        '\n pos3 ' + pos3.x +' ' + pos3.y + ' ' + pos3.z +
        ' \n pos4 ' + pos4.x + ' ' + pos4.y + ' ' + pos4.z );

    console.log('RUNGE KUTTA AFTER  vel1 ' + vel1.x +' ' + vel1.y + ' ' + vel1.z +
        '\n  vel2 ' + vel2.x +' ' + vel2.y + ' ' + vel2.z +
        '\n vel3 ' + vel3.x +' ' + vel3.y + ' ' + vel3.z +
        ' \n vel4 ' + vel4.x + ' ' + vel4.y + ' ' + vel4.z );



    //calculate sum of coefficients + old position | old velocity

    next_position = planet._position.clone().add((pos1.clone().add(pos2.clone().multiplyScalar(2)).add(pos3.clone().multiplyScalar(2)).add(pos4.clone())).multiplyScalar(dt/6));

    next_velocity = planet._velocity.clone().add((vel1.clone().add(vel2.clone().multiplyScalar(2)).add(vel3.clone().multiplyScalar(2)).add(vel4.clone())).multiplyScalar(dt/6));


    planet._position = next_position;
    planet._velocity = next_velocity;


    solarSys.acceleration(planet);
    //now need to calculate the new correct acceleration


}

function main(){
    var sun = new CelestialBody(1.9891e+30, 6.95700e+2, new THREE.Vector3());
    var earth = new CelestialBody(5.97219e+24, 6.371, new THREE.Vector3(152e+15, 0, 0) );

    earth._velocity= new THREE.Vector3(0, 29000, 0);
    var solarSys= new SolarSystem([sun,earth]);

    solarSys.acceleration(earth);


    console.log('earth pos ' + earth._position.x +' ' + earth._position.y + ' ' + earth._position.z +
        '\n earth vel ' + earth._velocity.x +' ' + earth._velocity.y + ' ' + earth._velocity.z +
        ' \n sun pos ' + sun._position.x + ' ' + sun._position.y + ' ' + sun._position.z
        + '\n acceleration ' + earth._accel.x +' ' + earth._accel.y + ' ' + earth._accel.z );


    runge_kutta(solarSys, earth, 24*60*60*360);
    console.log('earth pos ' + earth._position.x + ' '+  earth._position.y+ ' ' + earth._position.z +
        '\n earth vel ' + earth._velocity.x +' ' + earth._velocity.y + ' ' + earth._velocity.z +
        ' \n sun pos ' + sun._position.x + ' ' + sun._position.y+ ' ' + sun._position.z
        + '\n acceleration ' + earth._accel.x +' ' + earth._accel.y + ' ' + earth._accel.z);
}





