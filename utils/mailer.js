require('dotenv').config();
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     // port: '2525',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// Mail spécifique pour les chefs désignés
const sendChefNotification = async (email, prenom, nom, nomGroupe, pass) => {
    const mailOptions = {
        from: `"Plateforme de Groupes" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Félicitations : Vous êtes Chef de Groupe !',
        html: `
            <h2>Bonjour ${prenom} ${nom},</h2>
            <p>Vous avez été désigné comme représentant du <b>${nomGroupe}</b>.</p>
            <p>Rejoingnez le site avec : Email (${email} et mot de passe "${pass})"</>
            <p>Votre rôle est de coordonner votre équipe une fois que les membres l'auront rejointe.</p>
        `
    };
    return transporter.sendMail(mailOptions);
};

// Notification générale pour la classe
const sendGroupsReadyNotification = async (email, prenom, nom, pass) => {
    const mailOptions = {
        from: `"Plateforme d'intégration dans un groupes" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Ouverture de la plateforme : Rejoignez votre groupe !',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>Bonjour ${prenom} ${nom} !</h2>
                <p>Le professeur a généré les groupes pour votre classe.</p>
                <p>Vous pouvez dès maintenant vous connecter pour rejoindre un groupe de travail.</p>
                <p style="color: #e74c3c;"><b>Note :</b> Les places sont limitées par des quotas de mixité. Ne tardez pas !</p>
                <a href="${process.env.FRONTEND_URL || '#'}" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">Se connecter</a>
                <p>Ci-joint les paramètres pour rejoindre le site : </p>
                <p style="background: #f4f4f4; padding: 10px;">
                    <strong>Email :</strong> ${email}<br>
                    <strong>Mot de passe :</strong> <b style="color: #2c3e50;">${pass}</b>
                </p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

module.exports = { sendChefNotification, sendGroupsReadyNotification };