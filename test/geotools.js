
var assert = require("assert"),
    geo  = require("../lib/geotools");

describe("geo#ip2long", function() {
    it("IP should be converted to the long format", function() {
        var result = geo.ip2long("87.229.134.24");
        assert.equal(result, 1474659864);
    });
});

describe("geo#lookup", function() {
    it("should find country and region #1", function() {
        var result = geo.lookup("87.229.134.24");
        assert.equal(result.country, "RU");
        assert.equal(result.region, 1056);
        assert.equal(result.city, "Березовский");
        assert.equal(result.regionName, "Свердловская область");
        assert.equal(result.district, "Уральский федеральный округ");
        assert.equal(result.lat, "56.912811");
        assert.equal(result.lon, "60.804699");
        assert.equal(result.utcOffset, "+05:00");
    });

    it("should find country and region #2", function() {
        var result = geo.lookup("93.120.167.236");
        assert.equal(result.country, "RU");
        assert.equal(result.region, 1956);
        assert.equal(result.city, "Нижний Новгород");
        assert.equal(result.regionName, "Нижегородская область");
        assert.equal(result.district, "Приволжский федеральный округ");
        assert.equal(result.lat, "56.329918");
        assert.equal(result.lon, "44.009193");
        assert.equal(result.utcOffset, "+03:00");
    });

    it("should return null for unknown IP", function() {
        var result = geo.lookup("1.1.1.1");
        assert.equal(result, null);
    });

    it("should work correctly with unknown region", function() {
        var result = geo.lookup("2.20.4.0");
        assert.equal(result.country, "IT");
        assert.equal(result.region, 0);
    });
});