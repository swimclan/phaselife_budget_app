var config = require('../services/config');

const deleteItem = (item) => {
  return new Promise((resolve, reject) => {
    const url = config.get(`services.deleteItem.url.${process.env.NODE_ENV}`);
    fetch(`${url}/${item.id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
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

export default deleteItem;