const scale = 1e-5;

const dt = 0.0001;

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


var saturn = {
    //SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
    saturn_geometry : new THREE.SphereBufferGeometry( SATURN.RADIUS * scale, SATURN.WIDTH, SATURN.HEIGHT, SATURN.PHI_START, SATURN.PHI_LENGTH, SATURN.THETA_STARTS, SATURN.THETA_LENGTH ),
    saturn_material : new THREE.MeshPhongMaterial( { map: saturn_texture, overdraw: 0.5 } ),
    //RingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)
    ring_geometry : new THREE.RingBufferGeometry(
        SATURN_RING.INNER_RADIUS * scale , SATURN_RING.OUTER_RADIUS * scale, SATURN_RING.THETA_SEGMENTS, SATURN_RING.PHI_SEGMENTS, SATURN_RING.THETA_STARTS, SATURN_RING.THETA_LENGTH),
    ring_material : new THREE.MeshPhongMaterial( {color : 0xd0b1a1, shininess : 0, transparent : true }),
    saturn_physics : new CelestialBody('Saturn', SATURN.MASS, SATURN.INITIAL_POSITION, SATURN.INITIAL_VELOCITY)
};


var sun = {
    sun_geometry : new THREE.SphereBufferGeometry( SUN.RADIUS * scale, SUN.WIDTH, SUN.HEIGHT, SUN.PHI_START, SUN.PHI_LENGTH, SUN.THETA_STARTS, SUN.THETA_LENGTH ),
    sun_material : new THREE.MeshPhongMaterial( { map: sun_texture, overdraw: 0.5 } ),
    sun_physics : new CelestialBody('Sun', SUN.MASS, SUN.INITIAL_POSITION, SUN.INITIAL_VELOCITY )
};

var earth = {
    earth_geometry : new THREE.SphereBufferGeometry( EARTH.RADIUS * scale, EARTH.WIDTH, EARTH.HEIGHT, EARTH.PHI_START, EARTH.PHI_LENGTH, EARTH.THETA_STARTS, EARTH.THETA_LENGTH ),
    earth_material : new THREE.MeshPhongMaterial( { color: 0xf7f7f7, map: earth_texture, overdraw: 0.5 } ),
    earth_physics : new CelestialBody('Sun', EARTH.MASS, EARTH.INITIAL_POSITION, EARTH.INITIAL_VELOCITY )
};

var moon = {
    moon_geometry : new THREE.SphereBufferGeometry( MOON.RADIUS * scale, MOON.WIDTH, MOON.HEIGHT, MOON.PHI_START, MOON.PHI_LENGTH, MOON.THETA_STARTS, MOON.THETA_LENGTH ),
    moon_material : new THREE.MeshPhongMaterial( { map: moon_texture, overdraw: 0.5 } ),
    moon_physics : new CelestialBody('Sun', MOON.MASS, MOON.INITIAL_POSITION, MOON.INITIAL_VELOCITY )
};


var mercury = {
    mercury_geometry : new THREE.SphereBufferGeometry( MERCURY.RADIUS * scale, MERCURY.WIDTH, MERCURY.HEIGHT, MERCURY.PHI_START, MERCURY.PHI_LENGTH, MERCURY.THETA_STARTS, MERCURY.THETA_LENGTH ),
    mercury_material : new THREE.MeshPhongMaterial( { map: mercury_texture, overdraw: 0.5 } ),
    mercury_physics : new CelestialBody('Mercury', MERCURY.MASS, MERCURY.INITIAL_POSITION, MERCURY.INITIAL_VELOCITY )
};


var mars = {
    mars_geometry : new THREE.SphereBufferGeometry( MARS.RADIUS * scale, MARS.WIDTH, MARS.HEIGHT, MARS.PHI_START, MARS.PHI_LENGTH, MARS.THETA_STARTS, MARS.THETA_LENGTH ),
    mars_material : new THREE.MeshPhongMaterial( { map: mars_texture, overdraw: 0.5 } ),
    mars_physics : new CelestialBody('Mars', MARS.MASS, MARS.INITIAL_POSITION, MARS.INITIAL_VELOCITY )
};


var venus = {
    venus_geometry : new THREE.SphereBufferGeometry( VENUS.RADIUS * scale, VENUS.WIDTH, VENUS.HEIGHT, VENUS.PHI_START, VENUS.PHI_LENGTH, VENUS.THETA_STARTS, VENUS.THETA_LENGTH ),
    venus_material : new THREE.MeshPhongMaterial( { map: venus_texture, overdraw: 0.5 } ),
    venus_physics : new CelestialBody('Venus', VENUS.MASS, VENUS.INITIAL_POSITION, VENUS.INITIAL_VELOCITY )
};


var jupiter = {
    jupiter_geometry : new THREE.SphereBufferGeometry( JUPITER.RADIUS * scale, JUPITER.WIDTH, JUPITER.HEIGHT, JUPITER.PHI_START, JUPITER.PHI_LENGTH, JUPITER.THETA_STARTS, JUPITER.THETA_LENGTH ),
    jupiter_material : new THREE.MeshPhongMaterial( { map: jupiter_texture, overdraw: 0.5 } ),
    jupiter_physics : new CelestialBody('Jupiter', JUPITER.MASS, JUPITER.INITIAL_POSITION, JUPITER.INITIAL_VELOCITY )
};


var uranus = {
    uranus_geometry : new THREE.SphereBufferGeometry( URANUS.RADIUS * scale, URANUS.WIDTH, URANUS.HEIGHT, URANUS.PHI_START, URANUS.PHI_LENGTH, URANUS.THETA_STARTS, URANUS.THETA_LENGTH ),
    uranus_material : new THREE.MeshPhongMaterial( { map: uranus_texture, overdraw: 0.5 } ),
    uranus_physics : new CelestialBody('Uranus', URANUS.MASS, URANUS.INITIAL_POSITION, URANUS.INITIAL_VELOCITY )
};

var neptune = {
    neptune_geometry: new THREE.SphereBufferGeometry(NEPTUNE.RADIUS * scale, NEPTUNE.WIDTH, NEPTUNE.HEIGHT, NEPTUNE.PHI_START, NEPTUNE.PHI_LENGTH, NEPTUNE.THETA_STARTS, NEPTUNE.THETA_LENGTH),
    neptune_material: new THREE.MeshPhongMaterial({map: neptune_texture, overdraw: 0.5}),
    neptune_physics: new CelestialBody('Neptune', NEPTUNE.MASS, NEPTUNE.INITIAL_POSITION, NEPTUNE.INITIAL_VELOCITY),


};




function initializePhysics(){

    solarSys = new SolarSystem([
        sun.sun_physics,
        earth.earth_physics,
        moon.moon_physics,
        mercury.mercury_physics,
        venus.venus_physics,
        mars.mars_physics,
        jupiter.jupiter_physics,
        uranus.uranus_physics,
        saturn.saturn_physics,
        neptune.neptune_physics
    ]);

}


function updatePlanetsPositions(){
    solarSys.updateVelocityVerlet(dt);
}











