var scene = new THREE.Scene();

//TODO need to initialize the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 30;

//{antialias: true}
var renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.setSize( window.innerWidth, window.innerHeight );

// the first parameter is the colour, the second is the opacity, 0 is transparent
renderer.setClearColor( 0x000000, 1 );

document.body.appendChild( renderer.domElement );

//light in the scene

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




//SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
var geometry = new THREE.SphereBufferGeometry(10, 20, 20, 0, 6.3, 0, 3.1);

var material = new THREE.MeshStandardMaterial( {color: 0x2194ce,
    emissive: 0x0,
    roughness: 0,
    metalness: 0,
    vertexColors: THREE.NoColors,
    fog: true} );

var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(10, 10, 1);

sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default

scene.add( sphere);

//SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
var geometry1 = new THREE.SphereBufferGeometry(10, 20, 20, 0, 6.3, 0, 3.1);

var material1 = new THREE.MeshStandardMaterial( {color: 0x00c1c2,
    emissive: 0x0,
    roughness: 0.5,
    metalness: 0.5,
    vertexColors: THREE.NoColors,
    fog: true} );
var sphere1 = new THREE.Mesh( geometry1, material1 );
sphere1.position.set(-10, -10, -1);

sphere1.castShadow = true; //default is false
sphere1.receiveShadow = false; //default

scene.add( sphere1);




var render = function () {
    requestAnimationFrame( render );

    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    sphere1.rotation.x += 0.005;
    sphere1.rotation.y += 0.005;

    renderer.render( scene, camera );

};




render();


