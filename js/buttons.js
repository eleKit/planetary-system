$( document ).ready(function() {
    function setSun() {
        controls.target = planets[$("#Sun").text()].mesh.position;
    }

    $('#Sun').on("click", setSun);
});




$( document ).ready(function() {
    function setEarth() {
        controls.target = planets[$("#Earth").text()].mesh.position;
    }

    $('#Earth').on("click", setEarth);
});


$( document ).ready(function() {
    function setMars() {
        controls.target = planets[$("#Mars").text()].mesh.position;
    }

    $('#Mars').on("click", setMars);
});

$( document ).ready(function() {
    function setMercury() {
        controls.target = planets[$("#Mercury").text()].mesh.position;
    }

    $('#Mercury').on("click", setMercury);
});


$( document ).ready(function() {
    function setVenus() {
        controls.target = planets[$("#Venus").text()].mesh.position;
    }

    $('#Venus').on("click", setVenus);
});

$( document ).ready(function() {
    function setJupiter() {
        controls.target = planets[$("#Jupiter").text()].mesh.position;
    }

    $('#Jupiter').on("click", setJupiter);
});

$( document ).ready(function() {
    function setNeptune() {
        controls.target = planets[$("#Neptune").text()].mesh.position;
    }

    $('#Neptune').on("click", setNeptune);
});


$( document ).ready(function() {
    function setSaturn() {
        controls.target = planets[$("#Saturn").text()].mesh.position;
    }

    $('#Saturn').on("click", setSaturn);
});

$( document ).ready(function() {
    function setUranus() {
        controls.target = planets[$("#Uranus").text()].mesh.position;
    }

    $('#Uranus').on("click", setUranus);
});