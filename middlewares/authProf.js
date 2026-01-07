const { verifyToken } = require('../utils/jwt');
const redis = require('../config/redis');

const authProf = async(req, res, next) => {
    const header = req.headers['authorization'];
    if (!header || !header.startsWith('Bearer')) return res.status(401).json({ message: 'Oups token maquant ou format invalide'});

    const token = header.split(' ')[1];

    try {

        const decoded = verifyToken(token);
        const session = await redis.get(token);
        if (!session) return res.status(401).json({message: 'Session expirée ou invalide'});

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: 'Token invalide ou expiré'});
    }
};

module.exports = authProf;