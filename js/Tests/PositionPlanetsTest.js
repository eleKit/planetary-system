
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

    var sun = new CelestialBody('Sun', 100,  SUN.INITIAL_POSITION.multiplyScalar(1e-12), SUN.INITIAL_VELOCITY);
    var earth = new CelestialBody('Earth', 1,  EARTH.INITIAL_POSITION.multiplyScalar(1e-12), EARTH.INITIAL_VELOCITY);
    var moon = new CelestialBody('Earth', 1,  MOON.INITIAL_POSITION.multiplyScalar(1e-12), MOON.INITIAL_VELOCITY);
    var mercury = new CelestialBody('Earth', 1,  MERCURY.INITIAL_POSITION.multiplyScalar(1e-12), MERCURY.INITIAL_VELOCITY);
    var mars = new CelestialBody('Earth', 1,  MARS.INITIAL_POSITION.multiplyScalar(1e-12), MARS.INITIAL_VELOCITY);
    var venus = new CelestialBody('Earth', 1,  VENUS.INITIAL_POSITION.multiplyScalar(1e-12), VENUS.INITIAL_VELOCITY);
    var jupiter = new CelestialBody('Earth', 1,  JUPITER.INITIAL_POSITION.multiplyScalar(1e-12), JUPITER.INITIAL_VELOCITY);
    var saturn = new CelestialBody('Earth', 1,  SATURN.INITIAL_POSITION.multiplyScalar(1e-12), SATURN.INITIAL_VELOCITY);
    var uranus = new CelestialBody('Earth', 1,  URANUS.INITIAL_POSITION.multiplyScalar(1e-12), URANUS.INITIAL_VELOCITY);
    var neptune = new CelestialBody('Earth', 1, NEPTUNE.INITIAL_POSITION.multiplyScalar(1e-12), NEPTUNE.INITIAL_VELOCITY);




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
