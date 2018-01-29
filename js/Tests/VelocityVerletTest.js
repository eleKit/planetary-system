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

    var sun = new CelestialBody('Sun', 100, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -10/100, 0));
    var earth = new CelestialBody('Earth', 1, new THREE.Vector3(1.0, 0, 0), new THREE.Vector3(0, 10, 0));

    var solarSys = new SolarSystem([sun, earth]);

    solarSys._G = 1.0;

    let acc = solarSys.acceleration(earth, earth.position);

    console.log('acceleration' + acc.x.toFixed(3) + ' ' + acc.y.toFixed(3) + ' ' + acc.z.toFixed(3));

    /*
        T = 2pi/10= 0,6283185307 , sqrt(M/r * G) = v,  M = 100, m = 1 , r = 1, G = 1
     */

    const dt = 0.001/100;
    var earth_positions = [];
    var sun_positions = [];

    for (let i = 0; i < 630; i++) {


        solarSys.updateVelocityVerlet(dt, 100);
        console.log('t= ' + (i+1) + '\n earth pos ' + earth.position.toString() + ' length=' + earth.position.length().toFixed(3) +
            '\n earth vel ' + earth.velocity.toString() + ' length=' + earth.velocity.length().toFixed(3) +
            ' \n sun pos ' + sun.position.toString() + ' length=' + sun.position.length().toFixed(3));

        earth_positions.push([earth.position.x, earth.position.y]);
        sun_positions.push([sun.position.x, sun.position.y]);
    }

    context.beginPath();
    //context.moveTo(positions[0][0]*100+200, positions[0][1]*100+200);
    for(const p of earth_positions)
        context.lineTo(p[0]*100+200, p[1]*100+200);
    context.lineWidth = 5;
    context.strokeStyle = 'blue';
    context.stroke();
    //context.closePath();

    // Sun
    context.beginPath();
    for(const p of sun_positions)
        context.lineTo(p[0]*100+200, p[1]*100+200);
    context.lineWidth = 5;
    context.strokeStyle = 'red';
    context.stroke();
    //context.closePath();


    // Velocity Verlet error is O(delta_t^4)
}
