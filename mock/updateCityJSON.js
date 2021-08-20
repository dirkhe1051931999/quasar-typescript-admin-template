var http = require('http');
var fs = require('fs');
const chinaCity = require('./chinaCity.js');
function downloadCityJson(code) {
  return new Promise(async (resolve, reject) => {
    http.get(`http://geo.datav.aliyun.com/areas_v2/bound/${code}_full.json`, function(response) {
      response.pipe(fs.createWriteStream(`./mock/cityGeoData/${code}.json`));
      Promise.resolve();
    });
  });
}
for (let key in chinaCity) {
  downloadCityJson(key);
}
