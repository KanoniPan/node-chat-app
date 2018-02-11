var moment = require('moment');


// new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234;
var date = moment(createdAt);
date.add(100, 'years').subtract(9,'months');
console.log(date.format('MMM Do, YYYY h:mm:ss -a'));
console.log(date.format('k:mm'));
console.log(date.format('kk:mm'));
console.log(date.format('h:mm -a'));
console.log();
