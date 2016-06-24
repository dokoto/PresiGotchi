/*global define, module, require, clearTimeout, document, setTimeout, $*/
/*jshint globalstrict: true*/

"use strict";

function Pmsg(options) {
    this.timeout_id = null;
    this.duration = 0;
    this.content = '';
}

Pmsg.prototype._set = function(options) {
    var position;
    if (!options || typeof options !== 'object') {
        return false;
    }
    if (options.duration) {
        this.duration = parseFloat(options.duration);
    }

    if (options.type) {
        this.type = options.type;
    }

    this.content = options.content;

};

Pmsg.prototype.show = function(options) {
    this._set(options);
    clearTimeout(this.timeout_id);
    if (this.duration !== 0) {
        this.timeout_id = setTimeout(this._hide.bind(this), this.duration);
    }
    this._showPopup();
};

Pmsg.prototype._showPopup = function() {
    $('#fixed-' + this.type).text(this.content);
    $('#fixed-' + this.type).slideToggle('slow');
};

Pmsg.prototype._hide = function() {
    var toast_container = document.getElementById('android_toast_container');
    clearTimeout(this.timeout_id);
    $('#fixed-' + this.type).text('');
    $('#fixed-' + this.type).slideToggle('slow');
};

module.exports = {
    create: function(options) {
        return new Pmsg(options);
    }
};
