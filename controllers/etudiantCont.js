const Etudiant = require('../models/etudiantMod');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// const { sendGroupsReadyNotification } = require('../utils/mailer')

const { generateToken } = require('../utils/jwt');
const redis = require('../config/redis');

exports.enregistreListe = async(req, res) => {
    /* #swagger.tags = ['Professeur']
        #swagger.description = 'Importer des étudiants à partir d'un fichier JSON ou d'un tableau.'
        #swagger.security = [{
            "bearerAuth": []
        }] 
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Liste des étudiants à importer',
            schema: { $ref: '#/definitions/ImportEtudiants' }
        }
    */
   
    try {
        const {etudiants, classe} = req.body;

        if (!etudiants || !Array.isArray(etudiants)) {
            return res.status(400).json({message: 'Le format de donnée est incorrect'});
        }
        // const mailPromises = [];
        const etudiantsPrets = await Promise.all(etudiants.map(async (e) => {
            // const pass = crypto.randomBytes(3).toString('hex').toUpperCase();
            const pass = "passer123";
            const hash = await bcrypt.hash(pass, 10);

            // mailPromises.push(sendGroupsReadyNotification(e.email, e.prenom, e.nom, pass));

            return {
                prenom: e.prenom,
                nom: e.nom,
                email: e.email,
                nationalite: e.nationalite,
                mot_de_passe: hash,
                classe: classe
            };
        }));

        const result = await Etudiant.bulkCreate(etudiantsPrets);

        res.status(201).json({
            message : `${result.length} étudiants ont été enregistrés avec succès.`,
            success : true
        });
    } catch (err)  {
        res.status(500).json({message: 'Erreur lors de l\'importation', error: err.message});
    }
};

exports.connexionEtud = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        const etudiant = await Etudiant.findOne({ where: { email } });
        if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });

        const isMatch = await bcrypt.compare(mot_de_passe, etudiant.mot_de_passe);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = generateToken({ id: etudiant.id, classe: etudiant.classe, role: 'student' });

        await redis.set(token, JSON.stringify(etudiant), { EX: 3600 });

        res.status(200).json({ 
            message: "Connexion réussie", 
            token, 
            etudiant: { prenom: etudiant.prenom, classe: etudiant.classe } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};