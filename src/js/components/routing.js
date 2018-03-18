var L = require('leaflet');
var Control = require('leaflet-routing-machine/src/control');
var Itinerary = require('leaflet-routing-machine/src/itinerary');
var ItineraryBuilder = require('leaflet-routing-machine/src/itinerary-builder');
var MapzenLine = require('tpp-lrm-valhalla/src/valhallaLine');
var Plan = require('leaflet-routing-machine/src/plan');
var MapzenWaypoint = require('tpp-lrm-valhalla/src/valhallaWaypoint');
var MapzenFormatter = require('tpp-lrm-valhalla/src/valhallaFormatter');
var ErrorControl = require('leaflet-routing-machine/src/error-control');
var GeocoderElement = require('leaflet-routing-machine/src/geocoder-element');
var MapzenControlGeocoder = require('leaflet-control-geocoder-tpp/src/geocoders/nominatim');
var MapzenRouter = require('tpp-lrm-valhalla/src/valhallaRouter');

module.exports = {
  Control: Control,
  Itinerary: Itinerary,
  ItineraryBuilder: ItineraryBuilder,
  Line: MapzenLine,
  Plan: Plan,
  Waypoint: MapzenWaypoint,
  MapzenRouter: MapzenRouter,
  Formatter: MapzenFormatter,
  GeocoderElement: GeocoderElement
};

module.exports.routing = {
  control: function (_options) {
    var defaultOptions = {
      formatter: new MapzenFormatter(),
      routeLine: function (route, options) {
        return new MapzenLine(route, options);
      },
      summaryTemplate: '<div class="routing-info {costing}">{distance}, {time}</div>'
    };
    var options = L.extend({}, defaultOptions, _options);
    return new Control(options);
  },

  itinerary: function (options) {
    return Itinerary(options);
  },
  itineraryBuilder: function (options) {
    return new ItineraryBuilder(options);
  },
  line: function (route, options) {
    return new MapzenLine(route, options);
  },
  plan: function (waypoints, options) {
    return new Plan(waypoints, options);
  },
  waypoint: function (latLng, name, options) {
    return new MapzenWaypoint(latLng, name, options);
  },
  formatter: function (options) {
    return new MapzenFormatter(options);
  },
  router: function (options) {
    var params = options;
    return new MapzenRouter(params.options);
  },
  geocoderElement: function (wp, i, nWps, plan) {
    return new GeocoderElement(wp, i, nWps, plan);
  },

  geocoder: function (key, options) {
    var params = options;
    return new MapzenControlGeocoder.class(params.options); // eslint-disable-line
  },

  errorControl: function (routingControl, options) {
    return new ErrorControl(routingControl, options);
  }
};
