const request = require('request');

const geocode = (location, callback) => {

  const key = process.env.GEOCODE_KEY;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${key}`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location service');
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search.');
    } else {
      const { features } = body;
      callback(undefined, {
        latitude: features[0].center[0],
        longitudeL: features[0].center[1],
        location: features[0].place_name,
      });
    };
  });
};

module.exports = geocode;
