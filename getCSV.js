/*jslint plusplus: true, browser: true, devel: true */
/*global $, d3*/

var getCSV = (function () {
    "use strict";

    function getFileNameFromURL() {
        //This assumes that there will only be one parameter and it doesn't matter what it is
        var fileName = window.location.search
            .substr(1)
            .split("=")[1];
        return fileName;
    }

    function ajaxFile(fileName, ajaxCallback) {
        $.ajax(fileName + ".csv", {
            dataType: 'text',
            success: function (fileText) {
                ajaxCallback(null, fileText);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                ajaxCallback("Ajax Error", textStatus, ':', errorThrown, null);
                //console.log("Ajax Error", textStatus, ':', errorThrown);
            }

        });
    }

    return function (callBack) {
        var fileName;

        fileName = getFileNameFromURL();
        ajaxFile(fileName, function (error, fileText) {
            if (error) {
                callBack(error, null);
                return;
            }

            var fileData = d3.csvParse(fileText, function (d) {
                return {
                    forcer: d.forcer,
                    time: d.time,
                    buriedCRelease: parseInt(d.buriedCRelease, 10),
                    cBurial: parseInt(d.cBurial, 10),
                    co2: parseInt(d.co2, 10),
                    co3Desposition: parseInt(d.co3Desposition, 10),
                    ice: parseInt(d.ice, 10),
                    igWeathering: parseInt(d.igWeathering, 10),
                    insolation: parseInt(d.insolation, 10),
                    mountain: parseInt(d.mountain, 10),
                    sea: parseInt(d.sea, 10),
                    temperature: parseInt(d.temperature, 10),
                    volcano: parseInt(d.volcano, 10)
                };
            });

            callBack(null, fileData);
        });

    };
}());
