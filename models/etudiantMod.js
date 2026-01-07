const {DataTypes} = require('sequelize');
const sequelize = require('../config/connexion');

const Etudiant = sequelize.define('Etudiant', {
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nationalite: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classe: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_groupe: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
        tableName: 'etudiants',
        timestamps: false
    
});

module.exports = Etudiant;