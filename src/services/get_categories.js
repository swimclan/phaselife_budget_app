var config = require('../services/config');

const getCategories = () => {
  const url = config.get(`services.getCategories.url.${process.env.NODE_ENV}`);
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      return response.json();
    }).catch((error) => {
      return {error: error}
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

export default getCategories;