const Etudiant = require('../models/etudiantMod');
const Group = require('../models/groupMod');

exports.rejoindreAleatoire = async (req, res) => {
    try {
        const { id, nationalite } = req.user; // Info venant du token d'authentification

        // 1. On cherche les groupes qui respectent vos contraintes (Max 4 pers, Max 2 même natio)
        const groupesEligibles = await Group.findEligible(nationalite);

        if (groupesEligibles.length === 0) {
            return res.status(400).json({ message: "Aucun groupe disponible pour votre nationalité" });
        }

        // 2. Choix aléatoire parmi les éligibles
        const choisi = groupesEligibles[Math.floor(Math.random() * groupesEligibles.length)];

        // 3. Mise à jour de l'étudiant
        await Etudiant.updateGroup(id, choisi.id);

        res.status(200).json({ message: "Succès", groupe: choisi.nom_groupe });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur lors de la répartition" });
    }
};