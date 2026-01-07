const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/connexion');


const app = express();
const PORT = process.env.PORT || 3000;

// documentation
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger-output.json'); 


app.use(bodyParser.json());
app.use(express.json());

const profRoute = require('./routers/profRoute');
app.use('/ec2lt_groupe/profs', profRoute);

const etudiantRoute = require('./routers/etudiantRoute');
app.use('/ec2lt_groupe/etudiants', etudiantRoute);

const genRoute = require('./routers/groupeRoute');
app.use('/ec2lt_groupe/etudiants/groupes', genRoute);

app.use('/ec2lt_groupe/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

sequelize.sync({ alter: true })
.then(() => {
    console.log('Connexion à la base réussie');
})
.catch(err => {
    console.error('erreur de connexion à la base :', err);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API démarrée sur http://localhost:${PORT}`);
});