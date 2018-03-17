var Geocoder = require('tpp-leaflet-geocoder/src/core');
var corslite = require('@mapbox/corslite');

Geocoder.prototype.getSearchResult = function (input, callback) {
  var param = {
    q: input
  };
  var params = this.getParams(param);
  corslite(this.options.url + '/search?' + this.serialize(params), callback, true);
};

Geocoder.prototype.getAutocompleteResult = function (input, callback) {
  var param = {
    q: input
  };
  var params = this.getParams(param);
  corslite(this.options.url + '/search?' + this.serialize(params), callback, true);
};

module.exports = Geocoder;

module.exports.geocoder = function (options) {
  var params = options;

  // redirect search url to geocode.earth unless service url is speciied
  if (!params.options || !params.options.url) {
    params.options = L.extend({ url: 'https://nominatim.openstreetmap.org' }, params.options);
  }

  // If there is no attribution user passes,
  // Geocoder will skip the attribution since mapzen.js's map compoent is handling it already.
  if (params.options && !params.options.attribution) params.options.attribution = '';
  
  return new Geocoder(params.options);
};
