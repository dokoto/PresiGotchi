/*global define, module, require, clearTimeout, document, setTimeout*/
/*jshint globalstrict: true*/

/*
Android-Toast
(c) 2013-2014 Jad Joubran
*/

"use strict";

function Pmsg(options) {
    this.timeout_id = null;
    this.duration = 3000;
    this.content = '';
    this.position = 'bottom';
}

Pmsg.prototype.set = function(options) {
  var position;
  if (!options || typeof options !== 'object') {
      return false;
  }
  if (options.duration) {
      this.duration = parseFloat(options.duration);
  }
  if (options.content) {
      this.content = options.content;
  }
  if (options.position) {
      position = options.position.toLowerCase();
      if (position === 'top' || position === 'bottom') {
          this.position = position;
      } else {
          this.position = 'bottom';
      }
  }
};

Pmsg.prototype.show = function(options) {
    this.set(options);
    if (!this.content) {
        return false;
    }
    clearTimeout(this.timeout_id);
    var body = document.getElementsByTagName('body')[0];
    var previous_toast = document.getElementById('android_toast_container');
    if (previous_toast) {
        body.removeChild(previous_toast);
    }
    var classes = 'android_toast_fadein';
    if (this.position === 'top') {
        classes = 'android_toast_fadein android_toast_top';
    }
    var toast_container = document.createElement('div');
    toast_container.setAttribute('id', 'android_toast_container');
    toast_container.setAttribute('class', classes);
    body.appendChild(toast_container);
    var toast = document.createElement('div');
    toast.setAttribute('id', 'android_toast');
    toast.innerHTML = this.content;
    toast_container.appendChild(toast);
    this.timeout_id = setTimeout(this.hide, this.duration);
    return true;
};

Pmsg.prototype.hide = function() {
    var toast_container = document.getElementById('android_toast_container');
    if (!toast_container) {
        return false;
    }
    clearTimeout(this.timeout_id);
    toast_container.className += ' android_toast_fadeout';

    function remove_toast() {
        var toast_container = document.getElementById('android_toast_container');
        if (!toast_container) {
            return false;
        }
        toast_container.parentNode.removeChild(toast_container);
    }
    toast_container.addEventListener('webkitAnimationEnd', remove_toast);
    toast_container.addEventListener('animationEnd', remove_toast);
    toast_container.addEventListener('msAnimationEnd', remove_toast);
    toast_container.addEventListener('oAnimationEnd', remove_toast);
    return true;
};

module.exports =  {
  create: function(options) {
    return new Pmsg(options);
  }
};
