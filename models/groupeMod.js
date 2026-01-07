const { DataTypes } = require('sequelize');
const sequelize = require('../config/connexion');

const Groupe = sequelize.define('Groupe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_group: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Évite d'avoir deux "Groupe 1"
    },
    nom_representant: {
        type: DataTypes.STRING,
        allowNull: true // Sera rempli lors de la désignation aléatoire
    },
    classe: {
        type: DataTypes.STRING,
        allowNull: false // Pour savoir à quelle classe (L3, M1...) appartient le groupe
    },
    capacite_max: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    max_meme_nationalite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    est_complet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false // Pratique pour filtrer les groupes affichés aux étudiants
    }
}, {
    tableName: 'groupes',
    timestamps: true // Utile pour savoir quand le groupe a été formé
});

module.exports = Groupe;