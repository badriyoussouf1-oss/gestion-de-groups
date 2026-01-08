const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => {
    console.error('erreur base redis:', err);
});

client.connect();

module.exports = client;