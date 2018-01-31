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


    function resetSatellites(){
        $('#satellites').val('none').change();
    }

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
        resetSatellites();
        removeCamera();
        controls.target = planets['sun'].mesh.position;
        controls.reset();

    }

    $('#Reset').on("click", resetCamera);


    function setSun() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Sun").text().toLowerCase()].mesh.add(camera);
    }

    $('#Sun').on("click", setSun);



    $('#speed').change(function() { iterations = $('#speed').val() });

    $('#satellites').change(function() {
        slowSpeed();
        removeCamera();
        if($('#satellites').val() === 'none'){
            //do nothing
        } else {
            planets[$('#satellites').val().toLowerCase()].mesh.add(camera);
        }
    });


    function setEarth() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Earth").text().toLowerCase()].mesh.add(camera);
    }

    $('#Earth').on("click", setEarth);



    function setMars() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Mars").text().toLowerCase()].mesh.add(camera);
    }

    $('#Mars').on("click", setMars);


    function setMercury() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Mercury").text().toLowerCase()].mesh.add(camera);
    }

    $('#Mercury').on("click", setMercury);


    function setVenus() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Venus").text().toLowerCase()].mesh.add(camera);
    }

    $('#Venus').on("click", setVenus);


    function setJupiter() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Jupiter").text().toLowerCase()].mesh.add(camera);
    }

    $('#Jupiter').on("click", setJupiter);


    function setNeptune() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Neptune").text().toLowerCase()].mesh.add(camera);
    }

    $('#Neptune').on("click", setNeptune);


    function setSaturn() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Saturn").text().toLowerCase()].mesh.add(camera);
    }

    $('#Saturn').on("click", setSaturn);


    function setUranus() {
        resetSatellites();
        slowSpeed();
        removeCamera();
        planets[$("#Uranus").text().toLowerCase()].mesh.add(camera);
    }

    $('#Uranus').on("click", setUranus);


});




