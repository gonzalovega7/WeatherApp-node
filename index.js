require('inquirer');
require('dotenv').config();
const { readInput, inquirerMenu, pause, placesToList } = require("./helpers/inquirer");
const Search = require('./models/Search');

const main = async() => {

    // import Seach class
    const search = new Search();
    let opt;
    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Show message
                const placeToSearch = await readInput('City:');

                // Search places
                const places = await search.city(placeToSearch);

                // Select one
                const id = await placesToList(places);
                const selectedId = places.find(p => p.id === id);

                // weather
                const weather = await search.weather(selectedId.lat, selectedId.lng);
                
                // show results
                console.log('\n City information\n'.green);
                console.log('City:', selectedId.name);
                console.log('Lat:', selectedId.lat);
                console.log('Lng:', selectedId.lng);
                console.log('Temperature:', weather.temp);
                console.log('Humidity:',` ${weather.hum} %`.yellow);
                break;
        
            case 2:
            break;
        }

        if(opt != 0) {
            await pause();
        }


    } while (opt != 0);

}

main();
