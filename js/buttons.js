$( document ).ready(function() {
    function mute() {
        var audioElm = document.getElementById('music');
        if($('#Mute').text() === 'pause'){
            $('#Mute').text('play');
            audioElm.pause();
        }
        else {
            $('#Mute').text('pause');
            audioElm.play();
        }
    }

    $('#Mute').on("click", mute);





    function setSun() {
        controls.target = planets[$("#Sun").text().toLowerCase()].mesh.position;
    }

    $('#Sun').on("click", setSun);



    $('#speed').change(function() { iterations = $('#speed').val() });


    function setEarth() {
        controls.target = planets[$("#Earth").text().toLowerCase()].mesh.position;
    }

    $('#Earth').on("click", setEarth);


    function setMoon() {
        controls.target = planets[$("#Moon").text().toLowerCase()].mesh.position;
    }

    $('#Moon').on("click", setMoon);


    function setMars() {
        controls.target = planets[$("#Mars").text().toLowerCase()].mesh.position;
    }

    $('#Mars').on("click", setMars);


    function setMercury() {
        controls.target = planets[$("#Mercury").text().toLowerCase()].mesh.position;
    }

    $('#Mercury').on("click", setMercury);


    function setVenus() {
        controls.target = planets[$("#Venus").text().toLowerCase()].mesh.position;
    }

    $('#Venus').on("click", setVenus);


    function setJupiter() {
        controls.target = planets[$("#Jupiter").text().toLowerCase()].mesh.position;
    }

    $('#Jupiter').on("click", setJupiter);


    function setNeptune() {
        controls.target = planets[$("#Neptune").text().toLowerCase()].mesh.position;
    }

    $('#Neptune').on("click", setNeptune);


    function setSaturn() {
        controls.target = planets[$("#Saturn").text().toLowerCase()].mesh.position;
    }

    $('#Saturn').on("click", setSaturn);


    function setUranus() {
        controls.target = planets[$("#Uranus").text().toLowerCase()].mesh.position;
    }

    $('#Uranus').on("click", setUranus);


});




