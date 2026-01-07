const express = require('express');
const router = express.Router();
const controller = require('../controllers/groupeCont');
const authProf = require('../middlewares/authProf');


router.post('/generationGroupe', authProf, controller.genGroupe);

module.exports = router;