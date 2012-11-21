var geo = require('./geo');

// powering up...
geo.lookup("1.1.1.1");

var start = new Date().getTime();

var iterations = 1000000;
for (var i = 0; i < iterations; i++) {
	geo.lookup("87.229.134.24");
};

var finish = new Date().getTime();

console.log("\t%d\titerations", iterations)
console.log("\t%d\tmsec total time", (finish-start))
console.log("\t%d\tcalls per msec", Math.round(iterations / (finish-start)));
console.log("\t%d\tcalls per sec", Math.round(iterations / (finish-start))*1000);