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
}


module.exports = Search;