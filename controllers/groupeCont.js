const Groupe = require('../models/groupeMod');
const Etudiant = require('../models/etudiantMod');
const sequelize = require('../config/connexion');
// const { sendChefNotification, sendGroupsReadyNotification } = require('../utils/mailer');

exports.genGroupe = async (req, res) => {
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
   
    const transaction = await sequelize.transaction();
    try {
        const { classe, capaciteMax, maxMixite } = req.body;

        if (!classe || !capaciteMax || !maxMixite) {
            return res.status(400).json({ message: "Paramètres manquants." });
        }

        const etudiantsLibres = await Etudiant.findAll({
            where: { classe: classe, id_groupe: null },
            transaction
        });

        if (etudiantsLibres.length === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: "Aucun étudiant disponible." });
        }

        const nombreDeGroupes = Math.ceil(etudiantsLibres.length / capaciteMax);
        const etudiantsMelanges = etudiantsLibres.sort(() => 0.5 - Math.random());

        const chefsInfo = [];
        
        for (let i = 0; i < nombreDeGroupes; i++) {
            const chef = etudiantsMelanges[i];
            const nouveauGroupe = await Groupe.create({
                nom_group: `Groupe ${i + 1} - ${classe}`,
                nom_representant: `${chef.prenom} ${chef.nom}`,
                classe: classe,
                capacite_max: capaciteMax,
                max_meme_nationalite: maxMixite
            }, { transaction });

            await chef.update({ id_groupe: nouveauGroupe.id }, { transaction });
            
            chefsInfo.push({ 
                email: chef.email, 
                prenom: chef.prenom, 
                nom: chef.nom, 
                nomGroupe: nouveauGroupe.nom_group 
            });
        }

        // Finalisation de la base de données
        await transaction.commit();

        // GESTION DE LA FILE D'ATTENTE DES MAILS (Post-Commit)
        const autresEtudiants = await Etudiant.findAll({
            where: { classe: classe, id_groupe: null }
        });

        // Envoi asynchrone pour ne pas bloquer la réponse API
        // const mailPromises = [
        //     ...chefsInfo.map(c => sendChefNotification(c.email, c.prenom, c.nom, c.nomGroupe)),
        //     ...autresEtudiants.map(e => sendGroupsReadyNotification(e.email, e.prenom, e.nom))
        // ];

        Promise.allSettled(mailPromises).then(results => {
            const echecs = results.filter(r => r.status === 'rejected');
            if(echecs.length > 0) console.error(`${echecs.length} mails n'ont pas pu être envoyés.`);
        });

        res.status(201).json({ message: `Succès. ${nombreDeGroupes} groupes créés et notifications lancées.` });

    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.rejoindreGroupe = async (req, res) => {
    /* #swagger.tags = ['Etudiant']
        #swagger.description = 'Rejoindre un groupe automatiquement.'
        #swagger.security = [{
            "bearerAuth": []
        }] 
    */
    const id = req.user.id;

    try {
        // Utilisation d'une transaction pour bloquer les lectures simultanées
        const resultat = await sequelize.transaction(async (t) => {
            const etudiant = await Etudiant.findByPk(id, { transaction: t });
            
            if (etudiant.id_groupe) throw new Error("Déjà dans un groupe.");

            const groupesPossibles = await Groupe.findAll({
                where: { classe: etudiant.classe, est_complet: false },
                order: sequelize.random(),
                transaction: t
            });

            if (groupesPossibles.length === 0) throw new Error("Aucun groupe disponible.");

            let groupeChoisi = null;

            for (let groupe of groupesPossibles) {
                const countNat = await Etudiant.count({
                    where: { id_groupe: groupe.id, nationalite: etudiant.nationalite },
                    transaction: t
                });

                if (countNat < groupe.max_meme_nationalite) {
                    const membres = await Etudiant.count({ 
                        where: { id_groupe: groupe.id }, 
                        transaction: t 
                    });

                    if (membres < groupe.capacite_max) {
                        groupeChoisi = groupe;
                        break;
                    }
                }
            }

            if (!groupeChoisi) throw new Error("Quotas de mixité atteints partout.");

            await etudiant.update({ id_groupe: groupeChoisi.id }, { transaction: t });

            const nbFinal = await Etudiant.count({ 
                where: { id_groupe: groupeChoisi.id }, 
                transaction: t 
            });
            
            if (nbFinal >= groupeChoisi.capacite_max) {
                await groupeChoisi.update({ est_complet: true }, { transaction: t });
            }

            return groupeChoisi.nom_group;
        });

        res.status(200).json({ message: "Affectation réussie !", groupe: resultat });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};