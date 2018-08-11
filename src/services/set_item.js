var config = require('../services/config');

const setItem = (item) => {
  return new Promise((resolve, reject) => {
    const url = config.get(`services.setItem.url.${process.env.NODE_ENV}`);
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(item)
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      return {error: error};
    }).then((data) => {
      if (data.error) {
        return reject(data.error);
      }
      return resolve(data);
    }).catch((error) => {
      return reject(error);
    });
  });
}

export default setItem;