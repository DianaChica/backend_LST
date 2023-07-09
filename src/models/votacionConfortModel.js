const mongo = require('../lib/mongo')

const insertOne = async(data) => {
    try {
        const db = mongo.getDb();
        let votacionComfort = await db.collection('comfort_votacion').insertOne(data);
        return votacionComfort;
    } catch (err) {
        console.log('Error al registrar la votacion de confort!');
        return undefined
    }
}

module.exports = {
    insertOne
}