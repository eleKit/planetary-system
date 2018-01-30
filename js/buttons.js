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


    function slowSpeed(){
        $('#speed').val('1').change();

    }

    function removeCamera(){
        for(const p_name in planets) {
            const planet = planets[p_name];
            if (planet.mesh.children.includes(camera))
                planet.mesh.remove(camera);
        }
        controls.reset();
    }

    function resetCamera() {
        removeCamera();
        controls.target = planets['sun'].mesh.position;
        controls.reset();

    }

    $('#Reset').on("click", resetCamera);


    function setSun() {
        slowSpeed();
        removeCamera();
        planets[$("#Sun").text().toLowerCase()].mesh.add(camera);
    }

    $('#Sun').on("click", setSun);



    $('#speed').change(function() { iterations = $('#speed').val() });


    function setEarth() {
        slowSpeed();
        removeCamera();
        planets[$("#Earth").text().toLowerCase()].mesh.add(camera);
    }

    $('#Earth').on("click", setEarth);


    function setMoon() {
        slowSpeed();
        removeCamera();
        planets[$("#Moon").text().toLowerCase()].mesh.add(camera);
    }

    $('#Moon').on("click", setMoon);


    function setMars() {
        slowSpeed();
        removeCamera();
        planets[$("#Mars").text().toLowerCase()].mesh.add(camera);
    }

    $('#Mars').on("click", setMars);


    function setMercury() {
        slowSpeed();
        removeCamera();
        planets[$("#Mercury").text().toLowerCase()].mesh.add(camera);
    }

    $('#Mercury').on("click", setMercury);


    function setVenus() {
        slowSpeed();
        removeCamera();
        planets[$("#Venus").text().toLowerCase()].mesh.add(camera);
    }

    $('#Venus').on("click", setVenus);


    function setJupiter() {
        slowSpeed();
        removeCamera();
        planets[$("#Jupiter").text().toLowerCase()].mesh.add(camera);
    }

    $('#Jupiter').on("click", setJupiter);


    function setNeptune() {
        slowSpeed();
        removeCamera();
        planets[$("#Neptune").text().toLowerCase()].mesh.add(camera);
    }

    $('#Neptune').on("click", setNeptune);


    function setSaturn() {
        slowSpeed();
        removeCamera();
        planets[$("#Saturn").text().toLowerCase()].mesh.add(camera);
    }

    $('#Saturn').on("click", setSaturn);


    function setUranus() {
        slowSpeed();
        removeCamera();
        planets[$("#Uranus").text().toLowerCase()].mesh.add(camera);
    }

    $('#Uranus').on("click", setUranus);


});




