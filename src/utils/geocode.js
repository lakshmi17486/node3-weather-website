const request = require('postman-request');
const geocode =(address, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=6d235339910f53ba73dc773951bf9b27&query='+ encodeURIComponent(address);
    request({
        url, json: true}, (error, {body}) => {
            if(error) {
                callback('Unable to get location',undefined);
            } else if (body.error) {
                callback('Unable to get location. Please try another search', undefined);
            } else {
                callback(undefined, body.current);
            }
        })
    
    };
    module.exports = geocode;
    