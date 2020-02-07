const express = require("express");
const app = express();
const connectDb = require("./src/connection.js");
const Asset = require("./src/Asset.model.js");
const NodeCache = require( "node-cache" );


const btcValue = require('btc-value');
const goldprice = require('gold-prices');


const myCache = new NodeCache();

const PORT = 8080;


app.get("/prices", async (req, res) => {

    // retrieve var stored from getPrice every hour
    btc_value_now = myCache.get( "btc_value_now" );
    btc_value_ytd = myCache.get( "btc_value_ytd" );
    btc_change_24h = myCache.get( "btc_change_24h");

    gold_value_now_1kg = myCache.get( "gold_value_now_1kg" );


    const assets = {btc_value_now: btc_value_now, btc_value_ytd: btc_value_ytd, btc_change_24h: btc_change_24h, gold_value_now_1kg: gold_value_now_1kg}
  
    res.json(assets);
  });

//   app.get("/assets", async (req, res) => {
//     const assets = await Assets.find();
  
//     res.json(assets);
//   });
  
// app.get("/asset-create", async (req, res) => {
//   const asset = new Asset({ assetname: "userTest" });

//   await asset.save().then(() => console.log("asset created"));

//   res.send("asset created \n");
// });

function getPricesEveryHour() {
    setInterval(getPrices, 1000 * 60 * 60);
}


function getPrices() {

    // BTC NOW value
    btcValue({currencyCode: 'EUR'}).then(value => {
        console.log('eur ' + value);
        success = myCache.set( "btc_value_now", value, 10000 );

    });
    // BTC 24h change
    btcValue.getPercentageChangeLastDay({currencyCode: 'EUR'}).then(percentage => {
        console.log(percentage + '%');
        success = myCache.set( "btc_change_24h", percentage, 10000 );

    });
    // BTC ytd value
    success = myCache.set( "btc_value_ytd", 6520, 10000 );

   
    goldprice(function(err,rate){
      console.log(rate.onekilo);
      success = myCache.set( "gold_value_now_1kg", rate.onekilo, 10000 );

  
  });


  }

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});

getPrices()
getPricesEveryHour()