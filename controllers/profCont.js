const bcrypt = require('bcrypt');
const Prof = require('../models/profMod');
const { generateToken } = require('../utils/jwt');
const redis = require('../config/redis');


exports.inscription = async (req, res) => {
    const { prenom, nom, email, mot_de_passe } = req.body;

    if (!prenom || !nom || !email || !mot_de_passe) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        const emailLower = email.toLowerCase();
        const existProf = await Prof.findOne({where: {email: emailLower} });
        if(existProf) {
            return res.status(409).json({message: "Cet email existe déjà"});
        }

        const hash = await bcrypt.hash(mot_de_passe, 10);
        const prof = await Prof.create({ prenom, nom, email, mot_de_passe: hash});
        
        const profData = prof.get({ plain: true });
        delete profData.mot_de_passe;

        res.status(201).json({message: 'Compte prof crée', profData});
    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
};

exports.connexion = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    
    if(!email || !mot_de_passe) {
        return res.status(400).json({message: 'Email ou mot de passe requis'});
    }

    try {
        const prof = await Prof.findOne({ where: {email: email.toLowerCase()}});
        if (!prof) return res.status(401).json({message: 'Désolée cette utilisateur n\'existe pas'});

        const valid = await bcrypt.compare(mot_de_passe, prof.mot_de_passe);
        if (!valid) return res.status(401).json({message: 'Mot de passe incorrect'});

        const token = generateToken({id_prof: prof.id_prof, email: prof.email});

        const profCache = prof.get({plain: true});
        delete profCache.mot_de_passe;

        await redis.set(token, JSON.stringify(profCache), {EX:3600});

        res.json({success: true, token, prof: profCache});
    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', error: err.message});
    }
};

exports.deconnexion = async(req, res) => {
    const header = req.headers['authorization'];
    const token = header?.split(' ')[1];

    if(!token) return res.status(400).json({message: 'Token manquant'});

    await redis.del(token);
    res.json({message: 'Déconnexion réussie'});
};

