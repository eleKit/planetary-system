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

//background
scene.background = new THREE.TextureLoader().load( 'planets_textures/2k_stars_milky_way.jpg');

document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );



//draw axes
var axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


for(const p_name in planets) {
    const planet = planets[p_name];
    planet.mesh = new THREE.Mesh( planet.geometry, planet.material );
    planet.mesh.position.copy(scalePosition(planet.physics));
    planet.mesh.rotation.x += (1.5708 - planet.angle);

    planet.mesh.castShadow = true; //default is false
    planet.mesh.receiveShadow = false; //default

    scene.add( planet.mesh );
}

//TODO saturn ring
var torus_geometry = new THREE.TorusGeometry( SATURN.RADIUS * radius_scale * 2 ,SATURN.RADIUS * radius_scale /3 , 2.7, 100 );
var torus_material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'planets_textures/saturnringcolor.jpg'),
    overdraw: 0.5, transparent : true, opacity: 0.7} );
var torus = new THREE.Mesh( torus_geometry, torus_material );
torus.position.copy(planets['saturn'].mesh.position);
torus.rotation.x += (-planets['saturn'].angle);
scene.add( torus );

THREE.Vector3.prototype.toString = function() {
    return '(' + this.x.toFixed(3) + ', ' + this.y.toFixed(3) + ', ' + this.z.toFixed(3) + ')';
};


controls.target = planets['sun'].mesh.position;

scene.add(new THREE.AmbientLight(0xffffff));



var point_light = new THREE.PointLight( 0xF7F7F7, 1.3, 0, 2 );
point_light.position = planets['sun'].mesh.position.clone();
scene.add( point_light );





var animate = function () {

    render();
    requestAnimationFrame( animate );

    updatePlanetsPositions();

    for(const p_name in planets) {
        const planet = planets[p_name];
        planet.mesh.position.copy(scalePosition(planet.physics));
        if(p_name === 'moon'){
            planet.mesh.position.add(planet.mesh.position.clone().sub(scalePosition(planets['earth'].physics)).multiplyScalar(50));
        }
        if(p_name === 'saturn'){
            torus.position.copy(planet.mesh.position);
        }
    }

    planets['earth'].mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.0004375269 );

    /*console.log(' earth position ' + planets['earth'].physics.position.toString() + '; magnitude=' + planets['earth'].physics.position.length());
    console.log(' earth velocity ' + planets['earth'].physics.velocity.toString() + '; magnitude=' + planets['earth'].physics.velocity.length());

    console.log('Earth total energy: ' + solarSys.totalEnergy(planets['earth'].physics)
        + ' (kinetic=' + planets['earth'].physics.kineticEnergy() + ') '
        + '\n (gravitational=' + solarSys.gravitationalEnergy(planets['earth'].physics) + ') '
    );
    */


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
