const universe_scale = 1e-10;
const radius_scale = universe_scale * 1000;

const dt = 60;
var iterations = 100;

var solarSys;


//PLANETS
var planets = {

    'sun': {
        'geometry': new THREE.SphereBufferGeometry(SUN.RADIUS * radius_scale * 0.02, SUN.WIDTH, SUN.HEIGHT, SUN.PHI_START, SUN.PHI_LENGTH, SUN.THETA_STARTS, SUN.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_sun.jpg'),
            overdraw: 0.5,
            emissive: 0xFF8100,
            emissiveIntensity: 0.8,
            emissiveMap: new THREE.TextureLoader().load( 'planets_textures/2k_sun.jpg')
        }),
        'angle' : 0.1265364,
        'rotation_rate' : 2.9028219148604441e-6,
        'physics': new CelestialBody('Sun', SUN.MASS, SUN.INITIAL_POSITION, SUN.INITIAL_VELOCITY)
    },
    
    'earth': {
        'geometry': new THREE.SphereBufferGeometry(EARTH.RADIUS * radius_scale, EARTH.WIDTH, EARTH.HEIGHT, EARTH.PHI_START, EARTH.PHI_LENGTH, EARTH.THETA_STARTS, EARTH.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            color: 0xf7f7f7,
            map: new THREE.TextureLoader().load( 'planets_textures/2k_earth_daymap.jpg'),
            overdraw: 0.5, shininess: 5}),
        'angle' : 0.40910518,
        'rotation_rate' : 7.292115e-5,
        'physics': new CelestialBody('Earth', EARTH.MASS, EARTH.INITIAL_POSITION, EARTH.INITIAL_VELOCITY)
    },
    
    
    'moon': {
        'geometry': new THREE.SphereBufferGeometry(MOON.RADIUS * radius_scale, MOON.WIDTH, MOON.HEIGHT, MOON.PHI_START, MOON.PHI_LENGTH, MOON.THETA_STARTS, MOON.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_moon.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.116588,
        'rotation_rate' :  2.6616995e-6,
        'physics': new CelestialBody('Moon', MOON.MASS, MOON.INITIAL_POSITION, MOON.INITIAL_VELOCITY)
    },


    'mercury': {
        'geometry': new THREE.SphereBufferGeometry(MERCURY.RADIUS * radius_scale, MERCURY.WIDTH, MERCURY.HEIGHT, MERCURY.PHI_START, MERCURY.PHI_LENGTH, MERCURY.THETA_STARTS, MERCURY.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_mercury.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 5.235988e-5,
        'rotation_rate' : 0.000001239932688,
        'physics': new CelestialBody('Mercury', MERCURY.MASS, MERCURY.INITIAL_POSITION, MERCURY.INITIAL_VELOCITY)
    },
    
    
    'mars': {
        'geometry': new THREE.SphereBufferGeometry(MARS.RADIUS * radius_scale, MARS.WIDTH, MARS.HEIGHT, MARS.PHI_START, MARS.PHI_LENGTH, MARS.THETA_STARTS, MARS.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_mars.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.43964844,
        'rotation_rate' : 0.00007094834358,
        'physics': new CelestialBody('Mars', MARS.MASS, MARS.INITIAL_POSITION, MARS.INITIAL_VELOCITY)
    },
    

    'venus': {
        'geometry': new THREE.SphereBufferGeometry(VENUS.RADIUS * radius_scale, VENUS.WIDTH, VENUS.HEIGHT, VENUS.PHI_START, VENUS.PHI_LENGTH, VENUS.THETA_STARTS, VENUS.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_venus_atmosphere.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.04607669,
        'rotation_rate' : -0.000000299242049,
        'physics': new CelestialBody('Venus', VENUS.MASS, VENUS.INITIAL_POSITION, VENUS.INITIAL_VELOCITY)
    },
    
    
    'jupiter': {
        'geometry': new THREE.SphereBufferGeometry(JUPITER.RADIUS * radius_scale, JUPITER.WIDTH, JUPITER.HEIGHT, JUPITER.PHI_START, JUPITER.PHI_LENGTH, JUPITER.THETA_STARTS, JUPITER.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_jupiter.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.05462881,
        'rotation_rate' : 1.75865e-4,
        'physics': new CelestialBody('Jupiter', JUPITER.MASS, JUPITER.INITIAL_POSITION, JUPITER.INITIAL_VELOCITY)
    },
    
    
    'uranus': {
        'geometry': new THREE.SphereBufferGeometry(URANUS.RADIUS * radius_scale, URANUS.WIDTH, URANUS.HEIGHT, URANUS.PHI_START, URANUS.PHI_LENGTH, URANUS.THETA_STARTS, URANUS.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_uranus.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 1.4351842,
        'rotation_rate' : -0.0001014726309,
        'physics': new CelestialBody('Uranus', URANUS.MASS, URANUS.INITIAL_POSITION, URANUS.INITIAL_VELOCITY)
    },
    
    'neptune': {
        'geometry': new THREE.SphereBufferGeometry(NEPTUNE.RADIUS * radius_scale, NEPTUNE.WIDTH, NEPTUNE.HEIGHT, NEPTUNE.PHI_START, NEPTUNE.PHI_LENGTH, NEPTUNE.THETA_STARTS, NEPTUNE.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_neptune.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.494277244,
        'rotation_rate' : 1.083e-4,
        'physics': new CelestialBody('Neptune', NEPTUNE.MASS, NEPTUNE.INITIAL_POSITION, NEPTUNE.INITIAL_VELOCITY),
    },

    'saturn': {
        //SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
        'geometry': new THREE.SphereBufferGeometry(SATURN.RADIUS * radius_scale, SATURN.WIDTH, SATURN.HEIGHT, SATURN.PHI_START, SATURN.PHI_LENGTH, SATURN.THETA_STARTS, SATURN.THETA_LENGTH),
        'material': new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load( 'planets_textures/2k_saturn.jpg'),
            overdraw: 0.5,
            shininess: 5}),
        'angle' : 0.46652651,
        'rotation_rate' : 1.63785e-4,
        'physics': new CelestialBody('Saturn', SATURN.MASS, SATURN.INITIAL_POSITION, SATURN.INITIAL_VELOCITY),
    },
};

function scalePosition(planet){
    return planet.position.clone().multiplyScalar(universe_scale);
}

function rotatePlanet(planet){
    return planet.rotation_rate * (dt * iterations);
}




function initializePhysics(){
    
    var physicsItems = [];
    for(const p_name in planets) {
        const planet = planets[p_name];
        physicsItems.push(planet.physics);
    }
    solarSys = new SolarSystem(physicsItems);

}


function updatePlanetsPositions(){
    solarSys.updateVelocityVerlet(dt, iterations);
}











