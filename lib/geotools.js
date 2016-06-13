var path = require('path');

var gindex              = [],
    gCities             = {},
    poweredUp           = false;

var GEO_FIELD_MIN       = 0,
    GEO_FIELD_MAX       = 1,
    GEO_FIELD_COUNTRY   = 2,
    GEO_FIELD_REGION    = 3,
    GEO_DIR_DATA        = path.join(__dirname, '..', 'geo');

// Load and parse geo base
function _powerup() {
    var fs = require('fs');
    var cidr = fs.readFileSync(path.join(GEO_DIR_DATA, 'cidr_optim.txt'));
    cidr = cidr.toString().split('\n');

    for (var i = cidr.length - 1; i >= 0; i--) {
        if (!cidr[i]) continue;
        var line = cidr[i].split('\t');
        gindex.push([
            parseInt(line[0]), // GEO_FIELD_MIN
            parseInt(line[1]), // GEO_FIELD_MAX
            line[3],           // GEO_FIELD_COUNTRY
            (line[4] == "-") ? 0 : parseInt(line[4])  // GEO_FIELD_REGION
        ]);
    }

    var rawCities = fs.readFileSync(path.join(GEO_DIR_DATA, 'cities.txt'), 'utf-8');
    var cities    = rawCities.split('\n');

    for (i = 0; i < cities.length; i++) {
        var city         = cities[i].split('\t');
        gCities[city[0]] = {
            city: city[1],
            regionName: city[2],
            district: city[3],
            lat: city[4],
            lon: city[5]
        };
    }

    gindex.sort(function(a, b) {
        return a[GEO_FIELD_MIN] - b[GEO_FIELD_MIN];
    });

    poweredUp = true;
}

function _normalize(row) {
    var cityInfo = gCities[row[GEO_FIELD_REGION]];

    var result = {
        country: row[GEO_FIELD_COUNTRY],
        region: row[GEO_FIELD_REGION]
    };

    for (var key in cityInfo) {
        if (cityInfo.hasOwnProperty(key)) {
            result[key] = cityInfo[key];
        }
    }

    return result;
}

// IP to long converter
module.exports.ip2long = function(ip) {
    ip = ip.split('.');
    var c = ip.length;
    ip[0] = parseInt(ip[0]) || 0;
    ip[1] = parseInt(ip[1]) || 0;
    ip[2] = parseInt(ip[2]) || 0;
    ip[3] = parseInt(ip[3]) || 0;

    return ip[0] * (c === 1 || 16777216)
         + ip[1] * (c <= 2 || 65536)
         + ip[2] * (c <= 3 || 256)
         + ip[3] * 1;
};

// Binary search through the geo index
module.exports.lookup = function(ip) {

    if (!ip) return -1;
    if (!poweredUp) _powerup();

    var find = this.ip2long(ip);

    var low = 0, high = gindex.length - 1, i;

    while (low <= high) {
        i = Math.floor((low + high) / 2);
        if (gindex[i][GEO_FIELD_MIN] > find) { high = i - 1; continue; }
        if (gindex[i][GEO_FIELD_MIN] < find) { low  = i + 1; continue; }
        break;
    }

    // checking given index and two neighbouring indexes at i-1 and i+1
    if (find >= gindex[i][GEO_FIELD_MIN] && find <= gindex[i][GEO_FIELD_MAX])
        return _normalize(gindex[i]);

    if ((i !== 0) && (find >= gindex[i-1][GEO_FIELD_MIN] && find <= gindex[i-1][GEO_FIELD_MAX]))
        return _normalize(gindex[i-1]);

    if ((i !== gindex.length - 1) && (find >= gindex[i+1][GEO_FIELD_MIN] && find <= gindex[i+1][GEO_FIELD_MAX]))
        return _normalize(gindex[i+1]);

    return null;
};
