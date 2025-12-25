const db = require('../config/dbconnect');

exports.findEligible = async (natio) => {
    // Requête SQL complexe pour filtrer par taille et nationalité
    const sql = `
        SELECT g.*, 
        (SELECT COUNT(*) FROM etudiants WHERE id_groupe = g.id) as count,
        (SELECT COUNT(*) FROM etudiants WHERE id_groupe = g.id AND nationalite = ?) as same_nat
        FROM groupes g 
        HAVING count < 4 AND same_nat < 2`;
    const [rows] = await db.execute(sql, [natio]);
    return rows;
};