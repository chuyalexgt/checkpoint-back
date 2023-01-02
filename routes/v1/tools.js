'use strict';

const express = require('express');

const router = express.Router();
const controller = require('../../controllers/v1/tools');
const {isAuth} = require('../../middlewares/auth')

router.put(
    '/getBase64',	 //RUTA
    isAuth,		// USUARIO LOGEADO
    controller.getBase64
);



module.exports = router
