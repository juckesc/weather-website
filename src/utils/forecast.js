const request = require("request");

const forecast = (long, lat, callback) => {
  const key = process.env.FORECAST_KEY;

  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${lat},${long}`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("There was an error with your query");
    } else if (!body.current) {
      const data = {
        forecast: "15 and sunny",
        location: "Bristol",
      };
      callback(undefined, data);
    } else {
      const { temperature, feelslike, wind_speed, wind_dir } = body.current;
      const data = {
        forecast: `${temperature} degrees and feels like ${feelslike}. The wind speed is ${wind_speed} and wind direction is ${wind_dir}.`,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
