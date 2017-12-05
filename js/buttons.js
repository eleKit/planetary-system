$( document ).ready(function() {
    function setSun() {
        controls.target = planets[$("#Sun").text().toLowerCase()].mesh.position;
    }

    $('#Sun').on("click", setSun);


    $('#date').text("here goes the date")


    $('#speed').change(function() { iterations = $('#speed').val() });


});




$( document ).ready(function() {
    function setEarth() {
        controls.target = planets[$("#Earth").text().toLowerCase()].mesh.position;
    }

    $('#Earth').on("click", setEarth);
});

$( document ).ready(function() {
    function setMoon() {
        controls.target = planets[$("#Moon").text().toLowerCase()].mesh.position;
    }

    $('#Moon').on("click", setMoon);
});


$( document ).ready(function() {
    function setMars() {
        controls.target = planets[$("#Mars").text().toLowerCase()].mesh.position;
    }

    $('#Mars').on("click", setMars);
});

$( document ).ready(function() {
    function setMercury() {
        controls.target = planets[$("#Mercury").text().toLowerCase()].mesh.position;
    }

    $('#Mercury').on("click", setMercury);
});


$( document ).ready(function() {
    function setVenus() {
        controls.target = planets[$("#Venus").text().toLowerCase()].mesh.position;
    }

    $('#Venus').on("click", setVenus);
});

$( document ).ready(function() {
    function setJupiter() {
        controls.target = planets[$("#Jupiter").text().toLowerCase()].mesh.position;
    }

    $('#Jupiter').on("click", setJupiter);
});

$( document ).ready(function() {
    function setNeptune() {
        controls.target = planets[$("#Neptune").text().toLowerCase()].mesh.position;
    }

    $('#Neptune').on("click", setNeptune);
});


$( document ).ready(function() {
    function setSaturn() {
        controls.target = planets[$("#Saturn").text().toLowerCase()].mesh.position;
    }

    $('#Saturn').on("click", setSaturn);
});

$( document ).ready(function() {
    function setUranus() {
        controls.target = planets[$("#Uranus").text().toLowerCase()].mesh.position;
    }

    $('#Uranus').on("click", setUranus);
});