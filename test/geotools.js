
var assert = require("assert"),
    geo  = require("../lib/geotools");

describe("geo#ip2long", function() {
    it("IP should be converted to the long format", function() {
        var result = geo.ip2long("87.229.134.24");
        assert.equal(result, 1474659864);
    });
});

describe("geo#lookup", function() {
    it("should find country and region", function() {
        var result = geo.lookup("87.229.134.24");
        assert.equal(result.country, "RU");
        assert.equal(result.region, 1056);
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