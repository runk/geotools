node-geo
========

nodejs geo lookup module

## GEO databases

You can download fresh geo database from this website: http://ipgeobase.ru/.
Database contains major ranges for all countries worldwide and presice ranges for most Russian cities/regions.
Also it could be extended with another geo data.

----


## Usage

	var geo = require('node-geo');
	var res = geo.lookup("87.229.134.24");

## Speed / Benchmark

	Approximate speed on average laptop is about 1.5M calls per second. Benchmark is simple, but it gives you an idea about module's performance. Test it yourself:

	node ./lib/bench.js

