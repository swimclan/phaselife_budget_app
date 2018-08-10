export const getCategories = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/categories').then((response) => {
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