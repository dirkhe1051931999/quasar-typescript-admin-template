import settings from '@/settings.json';
export const loadProvinceJson = (data: any): any => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://${settings.ip}:${settings.devServerPort}/map/province/${data.prov}.json`, true);
    xhr.send();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
  });
};
export const loadCityJson = (data: any): any => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://${settings.ip}:${settings.devServerPort}/map/city/${data.city}.json`, true);
    xhr.send();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
  });
};
