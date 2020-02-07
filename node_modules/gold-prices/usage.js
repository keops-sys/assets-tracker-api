var goldrate = require('./index.js');

// log the current price of gold
goldrate(function(err,price){
    console.log(price);
});