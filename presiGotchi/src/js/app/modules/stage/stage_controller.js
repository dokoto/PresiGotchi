'use strict';

require('./css/stage-base.css');
const Engine = require('./logic/engine');
const View = require('./stage_view');
const Typing = require('utils/typing');
const moment = require('moment');

class Controller {
    constructor(options) {
        moment().format();
        this.collections = {
            'gotchi': APP.Gotchi.gotchi,
            'quotes': APP.Gotchi.quotes
        };
        this.engine = new Engine(this.collections);
        this.typing = new Typing({
            parent: '#message-region',
            id: '#typing-text'
        });
    }

    run() {
        new View().render();
        this._setListeners();
        this.engine.nextTic();
        document.addEventListener('pause', () => {
            alert('PAUSE');
        }, false);
        /*
        var now = new Date().getTime(),
        _15_sec_from_now = new Date(now + 15*1000);

        APP.plugins.notification.local.schedule(
        {
            id: 10,
            title: "New Message",
            at: _15_sec_from_now,
            text: "Hi, are you ready? We are waiting."
        });

         APP.plugins.notification.local.on("click",
         function (notification) {
            if (notification.id === 10) {
                console.log('Click en notification : %o', notification);
            }
         });

         APP.plugins.notification.local.on("trigger",
         function (notification) {
             if (notification.id === 10) {
                alert(JSON.stringify(notification));
            }
         });
*/

    }

    _setListeners() {
        this.typing.on('typing:finish', this._typingFinished.bind(this));
        this.typing.on('typing:button:click', this._typingButtonClick.bind(this));
        this.engine.on('new:quote', this._handleQuotes.bind(this));
        $('.buttom-response').on('click', this._typingButtonClick.bind(this));
    }

    _handleQuotes(quote) {
        this.typing.show(quote);
    }

    _typingFinished() {
        console.log('[STAGE COSNTROLLER] Typer finished, showing response bar');
    }

    _typingButtonClick(ev) {
        console.log('[STAGE COSNTROLLER] Button %o clicked', $(ev.currentTarget).attr('id'));
        this.typing.hide();
        this.engine.nextTic();
    }
}

module.exports = Controller;
