
const dt = 0.001;

var solarSys;

//Load planet texture
var stars_texture = new THREE.TextureLoader().load( 'planets_textures/2k_stars_milky_way.jpg');
var earth_texture = new THREE.TextureLoader().load( 'planets_textures/2k_earth_daymap.jpg');
var moon_texture = new THREE.TextureLoader().load( 'planets_textures/2k_moon.jpg');
var sun_texture = new THREE.TextureLoader().load( 'planets_textures/2k_sun.jpg');
var mercury_texture = new THREE.TextureLoader().load( 'planets_textures/2k_mercury.jpg');
var mars_texture = new THREE.TextureLoader().load( 'planets_textures/2k_mars.jpg');
var venus_texture = new THREE.TextureLoader().load( 'planets_textures/2k_venus_atmosphere.jpg');
var jupiter_texture = new THREE.TextureLoader().load( 'planets_textures/2k_jupiter.jpg');
var saturn_texture = new THREE.TextureLoader().load( 'planets_textures/2k_saturn.jpg');
var uranus_texture = new THREE.TextureLoader().load( 'planets_textures/2k_uranus.jpg');
var neptune_texture = new THREE.TextureLoader().load( 'planets_textures/2k_neptune.jpg');




var sun = {
    sun_material : new THREE.MeshPhongMaterial( { map: sun_texture, overdraw: 0.5, emissive: 0xff8141, emissiveIntensity: 1 } ),
    sun_physics : new CelestialBody('Sun', 100, new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0))
};

var earth = {
    earth_material : new THREE.MeshPhongMaterial( { color: 0xf7f7f7, map: earth_texture, overdraw: 0.5, shininess: 5 } ),
    earth_physics : new CelestialBody('Earth', 1, new THREE.Vector3(1.0, 0, 0), new THREE.Vector3(0, 10, 0))
};



function scalePosition(planet){
    return planet.position.clone().multiplyScalar(scale);
}




function initializePhysics(){

    solarSys = new SolarSystem([
        sun.sun_physics,
        earth.earth_physics,
    ]);

}


function updatePlanetsPositions(){
    solarSys.updateVelocityVerlet(dt);
}











