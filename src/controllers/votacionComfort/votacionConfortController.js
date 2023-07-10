const mongo = require('../../lib/mongo')
const { ObjectId } = require('mongodb');
const votacionConfortModel = require('../../models/votacionConfortModel')

const fetch = require('node-fetch');

const updateVotacion = async(req, res) => {
    try {
        const data_from_page = req.body;
        if (data_from_page.nivel) {
            let nivelComfort = data_from_page.nivel;

            //  la temperatura y el estado del AC
            const tempResponse = await fetch('http://200:126.13.206:5000/api/v1/ac/temp');
            const tempData = await tempResponse.json();
            const estadoResponse = await fetch('http://200:126.13.206:5000/api/v1/ac/estado');
            const estadoData = await estadoResponse.json();

            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            const localDateTime = new Date(now.getTime() - offset);
            // Crea el objeto a guardar en la base de datos
            const votacionData = {
                fecha: localDateTime,
                temperaturaAC: tempData.Message,
                estadoAC: estadoData.Message,
                nivelComfort: nivelComfort
            };

            // Guarda el objeto en la base de datos
            const newComfortVote = await votacionConfortModel.insertOne(votacionData);

            res.status(201).json(newComfortVote);
        } else {
            return res.status(400).send("No envia los parametros permitidos")
        }

    } catch (err) {
        console.log("Error al cargar la votacion: ", err);
        return res.status(500).send("Error al realizar la votacion")
    }
}


module.exports = { updateVotacion };