const { DataTypes } = require('sequelize');
const sequelize = require ('../config/connexion');

const Prof = sequelize.define('Prof', {
    id_prof: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
}, {
    tableName: 'profs',
    timestamps: false
});

module.exports = Prof;