'use strict';
const utils = require('../../lib/utils');

module.exports = {
    getBase64: async (req, res) => {
        try {
            const { url } = req.body;

            if (!url) {
                return res
                    .status(400)
                    .send('Se necesita la url de la imagen a convertir.');
            }

            let dataImage = await utils.getDataURIFromURL(url);

            if (!dataImage) {
                return res
                    .status(400)
                    .send('Hubo un problema al convertir la imagen.');
            }

            return res.status(200).json(dataImage);
        } catch (error) {
            console.error('convertirUrlImagen', error, req.body.url);
            return res.status(500).json(error.message);
        }
    },
};
