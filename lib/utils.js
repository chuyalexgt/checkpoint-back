const request = require('request');


module.exports = {
  getDataURIFromURL(url) {
    const promise = new Promise((resolve, reject) => {
      request.get(
        {
          url,
          encoding: null,
        },
        (err, response, body) => {
          // Se encontró la imagen
          if (!err && response.statusCode === 200) {
            // Creamos la imagen
            const dataURI = `data:image/png;base64,${body.toString('base64')}`;
            resolve(dataURI);
          } else {
            reject({
              message: err,
            });
          }
        }
      );
    });

    return promise;
  }
}
