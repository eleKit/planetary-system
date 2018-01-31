$( document ).ready(function() {

    var planet_visualized;

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

    function resetLandMode(){
        $('#land').val('none').change();
    }

    function resetFollowMode(){
        $('#follow').val('none').change();
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

    $('#Orbit').on("click", resetCamera);




    $('#speed').change(function() { iterations = $('#speed').val() });

    $('#satellites').change(function() {
        slowSpeed();
        removeCamera();
        const value = $('#satellites').val();
        if(value === 'none'){
            //do nothing
        } else {
            planets[value.toLowerCase()].mesh.add(camera);
        }
    });

    $('#follow').change(function() {
        resetSatellites();
        resetLandMode();
        slowSpeed();
        removeCamera();

        const value = $('#follow').val();
        if(value === 'none'){
            //do nothing
        } else {
            planets[value.toLowerCase()].mesh.add(camera);
            //TODO need to find the right delta to look the planet
            camera.position.copy(planets[value.toLowerCase()].mesh.position);
        }
    });

    $('#land').change(function() {
        resetSatellites();
        resetFollowMode();
        slowSpeed();
        removeCamera();

        const value = $('#land').val();
        if(value === 'none'){
            //do nothing
        } else {
            camera.position.copy(planets[value.toLowerCase()].mesh.position);
            //TODO need to update the position near the planet
            //TODO need to rotate to look horizontal
        }
    });







});




