define(['./base/containerBase'], function(containerBase) {
  'use strict';

  //*****************************************************
  // PRIVATE AND SHARED MEMORY OBJECTS
  //*****************************************************
  // scheme: presiGotchid/schemes/gotchi.js
  
  //*****************************************************
  // PUBLIC
  //*****************************************************
  var GotchiWrapper = (function() {
    function Gotchi() {
      containerBase.this.call(this);
    }

    // No hay problema con la comparticion de memoria de "_model" ya que baseModel
    // clona el objeto es si mismo. "_model" solo se usa como patron de estructura
    // no para contener datos, los datos se continene por instancia dentro de baseModel
    Gotchi.prototype = containerBase.create();
    Gotchi.prototype.constructor = Gotchi;

    return Gotchi;

  })();


  return {
    create: function() {
      return new GotchiWrapper();
    },
    this: GotchiWrapper

  };

});
