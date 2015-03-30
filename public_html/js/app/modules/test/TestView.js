define(['backbone', 'jquery', 'underscore'
], function (Backbone, $, _) {
    'use strict';

    var controllerEvents = null;

    var init = function (aControllerEvents) {
        controllerEvents = aControllerEvents;
    };

    var status = function (vitalSigns) {
        $('#header-region').empty();
        $('#header-region').append('<div class="status">HUNGRY : ' + vitalSigns.datas.hungry + '  SLEEPY : ' + vitalSigns.datas.sleepy + '  THIRSTY : ' + vitalSigns.datas.thirsty + '</div>');
    };

    var death = function (message) {
        $('#container-region').append('<div class="death">' + message + '</div>');
    };

    var activateControls = function (vitalSigns) {
        $('#footer-region').append('<input type="button" id="water" class="popup-button controlls" value="WATER"/>');
        $('#footer-region').append('<input type="button" id="feed" class="popup-button controlls" value="FEED"/>');
        $('#footer-region').append('<input type="button" id="sleep" class="popup-button controlls" value="WATER"/>');
        $('#water').click(function () {
            vitalSigns.datas.thirsty += 20;
            status(vitalSigns);
            drawAcid(vitalSigns.datas.thirsty, true);
        });
        
        $('#feed').click(function () {
            vitalSigns.datas.hungry += 5;
            status(vitalSigns);
            drawAcid(vitalSigns.datas.hungry, true);
        });
        
        $('#sleep').click(function () {
            vitalSigns.datas.sleepy += 2;
            status(vitalSigns);
            drawAcid(vitalSigns.datas.sleepy, true);
        });
    };

    var removeControls = function () {
        $('#water').hide();
    };


    var drawAcid = function (radiusBase, smille) {
        if (document.getElementById('myCanvas') === null) {
            $('#container-region').append('<canvas id="myCanvas" width="' + $(document).width() + '" height="' + $(document).height() / 1.5 + '"></canvas>');
        }
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = radiusBase;
        var radiusEyes = radiusBase / 7;
        var radiusSmille = radiusBase / 1.8;
        var distanceEyes = radiusBase / 3.5;
        var distanceSmille = radiusBase / 7;
        var distanceUngly = radiusBase / 1.7;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#FFCE00';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#FFCE00';
        context.stroke();

        context.beginPath();
        context.arc(centerX - distanceEyes, centerY - distanceEyes, radiusEyes, 0, 2 * Math.PI, false);
        context.fillStyle = '#006B3D';
        context.fill();
        context.lineWidth = 0;
        context.stroke();

        context.beginPath();
        context.arc(centerX + distanceEyes, centerY - distanceEyes, radiusEyes, 0, 2 * Math.PI, false);
        context.fillStyle = '#006B3D';
        context.fill();
        context.lineWidth = 0;
        context.stroke();

        context.beginPath();
        if (smille) {
            context.arc(centerX, centerY + distanceSmille, radiusSmille, 0, Math.PI, false);
        }
        else {
            context.arc(centerX, centerY + distanceUngly, radiusSmille, Math.PI, 2 * Math.PI, false);
        }
        context.fillStyle = '#FFCE00';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    };

    return {
        init: init,
        status: status,
        death: death,
        activateControls: activateControls,
        removeControls: removeControls,
        drawAcid: drawAcid
    };

});
