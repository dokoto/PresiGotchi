define(['jquery'], function ($) {

    var utils = {
        fonts: {
            textSizeToFillDocumentWidth: function (stringText, font_Family, font_Style) {
                var jqueryID = '#textMesuzz';
                $('body').append('<span id="' + jqueryID.substr(1) + '" style="font-size: 12px;visibility: hidden;">' + stringText + '</span>');
                var fontSize = parseInt($(jqueryID).css('font-size').replace('px', ''));
                var fontFamily = font_Family || $(jqueryID).css('font-family');
                var fontStyle = font_Style || $(jqueryID).css('font-style');

                var font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.font = font;
                var documentWidth = $(jqueryID).parent().width();

                if (ctx.measureText(stringText).width > documentWidth) {
                    while (ctx.measureText(stringText).width > documentWidth) {
                        fontSize -= 2;
                        font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                        ctx.font = font;
                    }
                }
                else {
                    while (ctx.measureText(stringText).width < documentWidth) {
                        fontSize += 2;
                        font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                        ctx.font = font;
                    }
                    fontSize -= 4;
                    font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                    ctx.font = font;
                }
                //console.log('Document size : ' + documentWidth);
                //console.log('Max Font Size : ' + font);
                //console.log('Font length in px : ' + ctx.measureText(stringText).width);

                $(jqueryID).remove();

                return fontSize;
            },
            /*
             * @example
             * window.innerWidth: 800
             * calcAspectRadioDocumentFont('MI TEXTO DE PRUEBA', '40', 'Arial', 'normal');
             * return: { "baseDocumentWidth":784, "baseFontLength":664.53125, "baseFontSize":40, "baseAspectRatio":1.1797789795438514 }
             */
            calcAspectRadioDocumentFont: function (stringText, fontSize, fontFamily, fontStyle) {
                var font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.font = font;
                var documentWidth = $('body').width();
                var stringWidth = ctx.measureText(stringText).width;
                var aspectRadio = parseFloat(documentWidth / stringWidth);

                return {baseDocumentWidth: documentWidth, baseFontLength: stringWidth, baseFontSize: fontSize, baseAspectRatio: aspectRadio};
            },
            /*
             * @example
             * window.innerWidth: 800
             * calcAspectRadioBoxFont('MI TEXTO DE PRUEBA', $('body'), '40', 'Arial', 'normal');
             * return: { "baseDocumentWidth":784, "baseFontLength":664.53125, "baseFontSize":40, "baseAspectRatio":1.1797789795438514 }
             */
            calcAspectRadioBoxFont: function (stringText, BoxParent, fontSize, fontFamily, fontStyle) {
                var font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.font = font;
                var documentWidth = $(BoxParent).width();
                var stringWidth = ctx.measureText(stringText).width;
                var aspectRadio = parseFloat(documentWidth / stringWidth);

                return {baseDocumentWidth: documentWidth, baseFontLength: stringWidth, baseFontSize: fontSize, baseAspectRatio: aspectRadio};
            },
            /*
             * @example
             * window.innerWidth: 400
             * recalcAspectRadioDocumentFont( $('#textID'), 400, calcAspectRadioDocumentFont().baseAspectRatio, calcAspectRadioDocumentFont().baseDocumentWidth, calcAspectRadioDocumentFont().baseFontLength);
             */
            recalcAspectRadioDocumentFont: function (element, newDocumentSize, baseAspectRatio, baseFontLength) {
                var fontSize = parseInt($(element).css('font-size').replace('px', ''));
                var fontFamily = $(element).css('font-family');
                var fontStyle = $(element).css('font-style');
                var stringText = $(element).text();

                var font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.font = font;

                var newAspectRatio = parseFloat(newDocumentSize / baseFontLength);
                if (newAspectRatio < baseAspectRatio) { // -
                    while (parseFloat(newDocumentSize / ctx.measureText(stringText).width) < baseAspectRatio) {
                        fontSize -= 1;
                        font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                        ctx.font = font;
                    }
                }
                else { // +
                    while (parseFloat(newDocumentSize / ctx.measureText(stringText).width) > baseAspectRatio) {
                        fontSize += 1;
                        font = fontSize + 'px ' + fontFamily + ' ' + fontStyle;
                        ctx.font = font;
                    }
                }

                return fontSize;
            }
        }
    };

    return  {
        fonts: utils.fonts
    };

});