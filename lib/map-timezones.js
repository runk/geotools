'use strict';

/**
 * Map cities timezones from `timezones.txt` to `cities.txt`
 *
 * > node lib/map-timezones.js
 */

/**
 * Core FS library
 *
 * @type {exports|module.exports}
 */
const fs = require('fs');

/**
 * Core path library
 *
 * @type {exports|module.exports}
 */
const path = require('path');

let timezones  = fs.readFileSync(path.resolve(__dirname, '..', 'geo', 'timezones.txt'), 'utf8').split('\n');
let cities     = fs.readFileSync(path.resolve(__dirname, '..', 'geo', 'cities.txt'), 'utf8').split('\n');
let gTimezones = {};

for (let timezone of timezones) {
    timezone = timezone.split('\t');

    gTimezones[timezone[0]] = {
        city: timezone[0],
        utcOffset: timezone[1]
    };
}

cities = cities.map(city => {
    city = city.split('\t');

    if (!city[6] && gTimezones[city[0]]) {
        city.push(gTimezones[city[0]].utcOffset);
    }

    return city.join('\t');
});

fs.writeFileSync(path.resolve(__dirname, '..', 'geo', 'cities.txt'), cities.join('\n'), 'utf8');