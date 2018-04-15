$( document ).ready(function() {


    function startPlayMusic(){
        var promise = document.getElementById('music').play();
        promise.catch(function(error)
        {
            $('#Mute').text('play');
        });
        if($('#Mute').text() === 'stop'){
            $('#Mute').text('pause');
        }

    }

    startPlayMusic();



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
        controls.target = planets['sun'].mesh.position;
        controls.reset();

    }

    function orbit(){
        resetSatellites();
        removeCamera();
        resetCamera();
    }

    $('#camera').change(function() {
        if($('#camera').val() === 'orbit'){
           orbit_mode = true;
           orbit();
        } else {
            orbit_mode = false;
            orbit();
            slowSpeed();
            camera.position.copy(new THREE.Vector3(0, 0, 10));
            planets['sun'].mesh.add(camera);

        }
    });


    $('#Reset').on("click", orbit);


    function setSun() {
        resetSatellites();
        if (orbit_mode){
            controls.target = planets[$('#Sun').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 10));
            planets[$("#Sun").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Sun').on("click", setSun);



    $('#speed').change(function() { iterations = $('#speed').val() });


    $('#satellites').change(function() {
        if($('#satellites').val() === 'none'){
            //do nothing
        } else {
            if(orbit_mode){
                controls.target = planets[$('#satellites').val().toLowerCase()].mesh.position;
            } else {
                slowSpeed();
                removeCamera();
                //resetCamera();
                camera.position.copy(new THREE.Vector3(0, 0, 2));
                planets[$('#satellites').val().toLowerCase()].mesh.add(camera);
            }
        }
    });


    function setEarth() {
        resetSatellites();
        if(orbit_mode){
            controls.target = planets[$('#Earth').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 5));
            planets[$("#Earth").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Earth').on("click", setEarth);



    function setMars() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Mars').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 2));
            planets[$("#Mars").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Mars').on("click", setMars);


    function setMercury() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Mercury').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 2));
            planets[$("#Mercury").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Mercury').on("click", setMercury);


    function setVenus() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Venus').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 5));
            planets[$("#Venus").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Venus').on("click", setVenus);


    function setJupiter() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Jupiter').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 50));
            planets[$("#Jupiter").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Jupiter').on("click", setJupiter);


    function setNeptune() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Neptune').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 20));
            planets[$("#Neptune").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Neptune').on("click", setNeptune);


    function setSaturn() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Saturn').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 50));
            planets[$("#Saturn").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Saturn').on("click", setSaturn);


    function setUranus() {
        resetSatellites();
        if(orbit_mode) {
            controls.target = planets[$('#Uranus').text().toLowerCase()].mesh.position;
        }else {
            slowSpeed();
            removeCamera();
            //resetCamera();
            camera.position.copy(new THREE.Vector3(0, 0, 20));
            planets[$("#Uranus").text().toLowerCase()].mesh.add(camera);
        }
    }

    $('#Uranus').on("click", setUranus);


});




