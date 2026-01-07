const express = require('express');
const router = express.Router();
const controller = require('../controllers/profCont');


router.post('/inscription', controller.inscription);
router.post('/connexion', controller.connexion);
router.post('/deconnexion', controller.deconnexion);

module.exports = router;