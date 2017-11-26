

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

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





var planet_earth = new THREE.Mesh( earth.earth_geometry, earth.earth_material );
planet_earth.position.set(5, 0, 0);

planet_earth.castShadow = true; //default is false
planet_earth.receiveShadow = false; //default

scene.add( planet_earth );


var planet_moon = new THREE.Mesh( moon.moon_geometry, moon.moon_material );
planet_moon.position.set(-10, -20, -2);

planet_moon.castShadow = true; //default is false
planet_moon.receiveShadow = false; //default

scene.add( planet_moon );



scene.add(new THREE.AmbientLight(0x333333));

//TODO  light must be in the sun position

var light = new THREE.DirectionalLight( 0xffffff, 1);
light.position.set(-200,200,200);
scene.add(light);





var animate = function () {

    render();
    requestAnimationFrame( animate );


    planet_earth.rotation.x += 0.005;
    planet_earth.rotation.y += 0.005;

    planet_moon.rotation.x += 0.005;
    planet_moon.rotation.y += 0.005;

    planet_moon.position.x += 0.03;
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