"use strict";

class Pmsg {

    constructor(options) {
        this.timeout_id = null;
        this.duration = 0;
        this.content = '';
    }

    _set(options) {
        let position;
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

    }

    show(options) {
        this._set(options);
        window.clearTimeout(this.timeout_id);
        if (this.duration !== 0) {
            this.timeout_id = window.setTimeout(this._hide.bind(this), this.duration);
        }
        this._showPopup();
    }

    _showPopup() {
        $('#fixed-' + this.type).text(this.content);
        $('#fixed-' + this.type).slideToggle('slow');
    }

    _hide() {
        let toast_container = document.getElementById('android_toast_container');
        window.clearTimeout(this.timeout_id);
        $('#fixed-' + this.type).text('');
        $('#fixed-' + this.type).slideToggle('slow');
    }
}

module.exports = {
    create: function(options) {
        return new Pmsg(options);
    }
};
