var test_geomerty = new THREE.SphereBufferGeometry( 0.3, 20, 20, 0, 6.3, 0, 3.3 );

initializePhysics();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

//TODO pay attention, if you remove camera location trackball controls stops working, otherwise you must fix a target
camera.position.z = 50;

var controls = new THREE.TrackballControls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
controls.addEventListener( 'change', render );


var scene = new THREE.Scene();



var renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.setSize( window.innerWidth, window.innerHeight );

// the first parameter is the colour, the second is the opacity, 0 is transparent
renderer.setClearColor( 0xd2d2d2, 1 );

document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );





var planet_earth = new THREE.Mesh( test_geomerty, earth.earth_material );
planet_earth.position.add(earth.earth_physics.position);

planet_earth.castShadow = true; //default is false
planet_earth.receiveShadow = false; //default

scene.add( planet_earth );


THREE.Vector3.prototype.toString = function() {
    return '(' + this.x.toFixed(3) + ', ' + this.y.toFixed(3) + ', ' + this.z.toFixed(3) + ')';
};








var planet_sun = new THREE.Mesh( test_geomerty, sun.sun_material );

planet_sun.castShadow = true; //default is false
planet_sun.receiveShadow = false; //default

scene.add( planet_sun );



console.log(' earth position ' + planet_earth.position.toString());
console.log('sun position ' + planet_sun.position.toString());


controls.target = planet_sun.position;

scene.add(new THREE.AmbientLight(0x333333));



var point_light = new THREE.PointLight( 0xF7F7F7, 1.3, 0, 2 );
point_light.position = planet_sun.position.clone();
scene.add( point_light );





var animate = function () {

    render();
    requestAnimationFrame( animate );

    updatePlanetsPositions();

    planet_earth.rotation.x += 0.005;
    planet_earth.rotation.y += 0.005;

    planet_earth.position.add(earth.earth_physics.position.clone().sub(planet_earth.position));


    console.log(' earth position rendering ' + planet_earth.position.toString());
    console.log(' earth position ' + earth.earth_physics.position.toString());


   /* planet_moon.rotation.x += 0.005;
    planet_moon.rotation.y += 0.005;

    planet_moon.position.x -= 0.0003;
    */
    //moon.position += moon.update_position.clone().sub(moon.position);

    controls.update();

};



animate();



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    render();
}


function render() {
    renderer.render( scene, camera );
}



//light in the scene
/*
var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );
scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );
*/



/* sphere in the scene

var geometry = new THREE.SphereBufferGeometry(10, 20, 20, 0, 6.3, 0, 3.1);

var material = new THREE.MeshPhongMaterial( {color: 0xffe1dc,
    emissive: 0x0,
    vertexColors: THREE.NoColors,
    fog: true} );

var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(50, 50, 1);

sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default

scene.add( sphere);


var geometry1 = new THREE.SphereBufferGeometry(10, 20, 20, 0, 6.3, 0, 3.1);

var material1 = new THREE.MeshPhongMaterial( {color: 0xffe1dc,
    emissive: 0x0,
    vertexColors: THREE.NoColors,
    fog: true} );
var sphere1 = new THREE.Mesh( geometry1, material1 );
sphere1.position.set(-50, -50, -1);

sphere1.castShadow = true; //default is false
sphere1.receiveShadow = false; //default

scene.add( sphere1);

*/