"use strict";

function goldrate(callback, err) {
  let request = require('request');
  let cheerio = require('cheerio');
  const url = 'https://www.achat-or-et-argent.fr/or/lingot-1kg/38';

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      //scrapes the gold rate with the symbol
      let result = cheerio("#tpa", html).text().trim();

      if (result) {
        // Slices the rupee symbol and comma for better clarity
        let newresult = result.replace(/\s/g, '');
        callback(null, {
          onekilo: newresult / 1,
          onegram: newresult / 1000.0
        });
      } else {
        callback("Nothing Found!")
      }
    }
  });
}
module.exports = goldrate;