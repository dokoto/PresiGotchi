define(['app'], function (ARCHIVER) {

    'use strict';


    var ERROR_H3 = function (message) {
        console.log('%c' + now() + message, 'background: #EB4651; color: #FFFFFF; font-size:18px');
    };

    var ERROR_DESP = function (message) {
        console.log('%c' + now() + message, 'background: #FFFFFF; color: #EB4651; font-size:12px');
    };

    var WARNING_H3 = function (message) {
        console.log('%c' + now() + message, 'background: #FCEA21; color: #000000; font-size:18px');
    };

    var WARNING_DESP = function (message) {
        console.log('%c' + now() + message, 'background: #FFFFFF; color: #EB4651; font-size:12px');
    };

    var MSG_H3 = function (message) {
        console.log('%c' + now() + message, 'background: #FFFFFF; color: #7A97F5; font-size:18px');
    };

    var MSG_DESP = function (message) {
        console.log('%c' + now() + message, 'background: #FFFFFF; color: #7A97F5; font-size:12px');
    };

    var APP_TITLE = function (message) {
        console.log('%c' + message, 'font-weight: bold;font-family: "Century Gothic", CenturyGothic, "AppleGothic", sans-serif; font-size: 54px; background-color:#f16251; color: #ffcc33;text-align: center; padding-right:20px; padding-left:20px; padding-top:2px;');
    };

    var now = function ()
    {        
        var date = new Date();
        var minutes = date.getMinutes();         
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        var hours = date.getHours();
        hours = (hours < 10) ? '0' + hours : hours;
        var seconds = date.getSeconds();
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        return '[' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + hours + ':' + minutes + ':' + seconds + '.' + date.getMilliseconds() + '] ';
    };


    return {
        ERROR_H3 : ERROR_H3,
        ERROR_DESP : ERROR_DESP,
        WARNING_H3 : WARNING_H3,
        WARNING_DESP : WARNING_DESP,
        MSG_H3 : MSG_H3,
        MSG_DESP : MSG_DESP,
        APP_TITLE : APP_TITLE
    };

});


