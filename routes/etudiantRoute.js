const express = require('express');
const router = express.Router();
const controller = require('../controllers/etudiantCont');
const authProf = require('../middlewares/authProf');

const groupCont = require('../controllers/groupeCont');

router.post('/import', authProf, controller.enregistreListe);
router.post('/login', controller.connexionEtud);
router.post('/rejoindre', authProf, groupCont.rejoindreGroupe);

module.exports = router;