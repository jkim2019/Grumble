/**
 * Created by John on 4/3/17.
 */

'use strict';

var curPref;

$(document).ready(function () {
    $('#geobutton').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        function showPosition(position) {
            $('#latInput').val(position.coords.latitude);
            $('#longInput').val(position.coords.longitude);
        }
    });
});
