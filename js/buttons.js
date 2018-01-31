$( document ).ready(function() {

    var camera_mode = 'orbit'; //default

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

    $('#speed').change(function() { iterations = $('#speed').val() });


    function slowSpeed(){
        $('#speed').val('1').change();

    }

    function removeCamera(){
        for(const p_name in planets) {
            const planet = planets[p_name];
            if (planet.mesh.children.includes(camera))
                planet.mesh.remove(camera);
        }
    }

    function orbitCamera() {
        land_bool=false;
        $('#camera_mode').text('Camera mode: Orbit ');
        removeCamera();
        camera_mode= $('#Orbit').text().toLowerCase();
        controls.target = planets['sun'].mesh.position;
        controls.reset();
        $('#planets').prop("disabled", true);

    }

    $('#Orbit').on("click", orbitCamera);


    function landCamera(){
        removeCamera();
        controls.target = planets['sun'].mesh.position;
        controls.reset();
        $('#camera_mode').text('Camera mode: Land ');
        if (camera_mode === 'orbit'){
            $('#planets').prop("disabled", false);
        }
        camera_mode = $('#Land').text().toLowerCase();
    }

    function followCamera(){
        removeCamera();
        controls.target = planets['sun'].mesh.position;
        controls.reset();
        $('#camera_mode').text('Camera mode: Follow ');
        if (camera_mode === 'orbit'){
            $('#planets').prop("disabled", false);
        }

        camera_mode = $('#Follow').text().toLowerCase();
    }


    $('#Land').on("click", landCamera);
    $('#Follow').on("click", followCamera);



    $('#planets').change(
        function () {
            slowSpeed();
            removeCamera();

            const planet_name = $('#planets').val();
            if(camera_mode === 'land'){
                land_bool = true;
                land_planet = planets[planet_name.toLowerCase()];
                //TODO need to update the position near the planet
                //TODO need to rotate to look horizontal
            }
            else if(camera_mode === 'follow'){
                land_bool = false
                planets[planet_name.toLowerCase()].mesh.add(camera);
                //TODO need to find the right delta to look the planet

                //camera.position.copy(planets[planet_name.toLowerCase()].mesh.position);
                //camera.rotation.x += (1.5708 - planets[planet_name.toLowerCase()].angle);

                /* TODO prima qui mi allontanavo dai pianeti perchè facevo sempre un reset camera,
                   TODO ora non mi allontano più perchè non resetto ogni volta che setto un pianeta!!!
                 */
            }
            else {}
        }
    );



});




