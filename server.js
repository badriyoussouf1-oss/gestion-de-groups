const express = require('express');

const app = express();
const db = require('./config/dbconnect');

app.use(express.json());

// Vérification de la connexion DB au lancement
db.getConnection()
    .then(connection => {
        console.log('✅ Connecté à la base de données MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erreur de connexion à la base de données:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});