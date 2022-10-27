const axios = require('axios');

class Search  {
    // all my data 
    record = ['buenos aires', 'madrid', 'new york'];

    constructor() {
        // read DB
    }

    get mapboxParam() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get weatherParam() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric'
        }
    }

    // using HTTP service (thats why its async)
    async city( place = '' ) {
        // http request
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapboxParam
            });

            const resp = await instance.get();

            // Looping in the response of the API
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
              
            
        } catch (error) {
            console.log('Cannot find any match');
            return [];
        }

    }
    // Weather API
    async weather(lat, lon ) {
        try {
            // axios instance
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.weatherParam, lat, lon}
            })

            const resp = await instance.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                hum: main.humidity,
                temp: main.temp
            }


        } catch (error) {
            console.log('Cannot find the weather of the place entered');
            return [];
        }
    }
}


module.exports = Search;