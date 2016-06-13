
geotools
========

Simple and fast IP to Country/Region lookup module for nodejs. **Pull Requests are welcome!**

## GEO databases

You can download fresh geo database from this website: http://ipgeobase.ru/.
Database contains major ranges for all countries worldwide and precise ranges for most Russian cities/regions.
It could also be extended with other generic geo data.

## Installation

	npm install geotools

## Usage

	var geo = require('geotools');
	var res = geo.lookup('87.229.134.24');
	/**
      * Output is: 
      * {
      *    country: 'RU',
      *    region: 1056,
      *    city: 'Березовский',
      *    regionName: 'Свердловская область',
      *    district: 'Уральский федеральный округ',
      *    lat: '56.912811',
      *    lon: '60.804699'
      *  }
	 */

## Speed / Benchmark

Approximate speed on average laptop is about 1.5M calls per second. Benchmark is simple, but it gives you an idea about module's performance. Test it yourself:

	node ./lib/bench.js
