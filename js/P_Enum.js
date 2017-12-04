// 26 nov 2017 00:00:00.0000



var SUN =  Object.freeze({
    MASS : 1.988544E+30,
    INITIAL_POSITION : new THREE.Vector3(3.004034679675901E+05,  8.893895790660630E+05, -1.872349879910174E+04).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(-9.628223666463159E-03,  9.111435904403897E-03,  2.304333710108448E-04).multiplyScalar(1000),
    RADIUS : 6.96e+8,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});


var MERCURY = Object.freeze({
    MASS : 0.32E+24,
    INITIAL_POSITION : new THREE.Vector3(5.414782195079744e+07, -1.180639662789127e+07, -5.996086010352026e+06).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(1.722595410979276e+00,  4.960745852165915e+01,  3.894144306034846e+00).multiplyScalar(1000),
    RADIUS : 2.34e+6,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

var EARTH = Object.freeze({
    MASS : 5.97219E+24,
    INITIAL_POSITION : new THREE.Vector3(6.578047241951441E+07,  1.332231684044344E+08, -2.450224059511721E+04).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(-2.719911469995471E+01,  1.309994888326923E+01,  8.305058596542736E-04).multiplyScalar(1000),
    RADIUS : 6.37e+6,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.4
});



var MARS = Object.freeze({
    MASS : 0.64e+24,
    INITIAL_POSITION : new THREE.Vector3(-2.468776011970475e+08,  1.099726694711760e+07,  6.259288247880932e+06).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(-9.469510274023676e-02, -2.212997797480118e+01, -4.616122416714727e-01).multiplyScalar(1000),
    RADIUS : 3.37e+6,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});


var VENUS = Object.freeze({
    MASS : 4.88e+24,
    INITIAL_POSITION : new THREE.Vector3(-8.448346086647494E+07, -6.615827557880829E+07,  3.954133785342224E+06).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(2.146517916623081E+01, -2.762569366796296E+01, -1.618077208335693E+00).multiplyScalar(1000),
    RADIUS : 6.06e+6,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

var JUPITER = Object.freeze({
    MASS : 19.00e+26,
    INITIAL_POSITION : new THREE.Vector3(-6.611326207060233E+08, -4.722668468598711E+08,  1.674654728739467E+07).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(7.440397048497284E+00, -1.001130596217728E+01, -1.249065619450680E-01).multiplyScalar(1000),
    RADIUS : 6.99e+7,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

var SATURN = Object.freeze({
    MASS : 5.68e+26,
    INITIAL_POSITION : new THREE.Vector3(-2.122855556921463E+07, -1.504271304055325E+09,  2.699971616848475E+07).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(9.128525587137165E+00, -1.663974742504093E-01, -3.609661586815074E-01).multiplyScalar(1000),
    RADIUS : 5.85e+7,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});


var URANUS = Object.freeze({
    MASS : 0.87e+26,
    INITIAL_POSITION : new THREE.Vector3(2.661100471382672E+09,  1.337901400788683E+09, -2.950594152402860E+07).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(-3.108592125588141E+00,  5.766810319692129E+00,  6.176027782778570E-02).multiplyScalar(1000),
    RADIUS : 2.33e+7,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

var NEPTUNE = Object.freeze({
    MASS : 1.03e+26,
    INITIAL_POSITION : new THREE.Vector3(4.285940826159065E+09, -1.301579947135227E+09, -7.197021651952821E+07).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(1.544022158088248E+00,  5.233467801480870E+00, -1.435601606578587E-01).multiplyScalar(1000),
    RADIUS : 2.21e+7,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

//SATELLITES

var MOON = Object.freeze({
    MASS : 7.35e+22,
    INITIAL_POSITION : new THREE.Vector3( 6.610806275545052E+07,  1.329990314966149E+08, -2.932729892215878E+04).multiplyScalar(1000),
    INITIAL_VELOCITY : new THREE.Vector3(-2.668926267105926E+01,  1.393861699733575E+01, -8.463352361108001E-02).multiplyScalar(1000),
    RADIUS : 1.74e+6,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

//Marth
var DEIMOS = Object.freeze({
    MASS : 1.48e+15,
    INITIAL_POSITION : new THREE.Vector3(-2.468592298028901E+08,  1.100983547791736E+07,  6.251898982874209E+06),
    INITIAL_VELOCITY : new THREE.Vector3(-7.134520813328514E-01, -2.099460150431662E+01, -6.842543341183038E-02),
    RADIUS : 6.2e+3,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});

var PHOBOS = Object.freeze({
    MASS : 1.07e+16,
    INITIAL_POSITION : new THREE.Vector3(-2.468830718516514E+08,  1.100429286929242E+07,  6.262272674551954E+06),
    INITIAL_VELOCITY : new THREE.Vector3(-1.583812963883461E+00, -2.351841345324184E+01,  1.781445423352075E-01),
    RADIUS : 11.1e+3,
    WIDTH: 20,
    HEIGHT: 20,
    PHI_START : 0,
    PHI_LENGTH  : 6.3,
    THETA_STARTS : 0,
    THETA_LENGTH : 3.3
});







