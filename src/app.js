require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongo = require('./lib/mongo');
const routes = require('./api/routes');
const config = require('./lib/env').getConfig();
const env = config.env;
const app = express();
const path = require('path');
const port = config.server.port;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://127.0.0.1'],
        methods: ['GET', 'POST']
    }
});
const { Socket } = require('dgram');
const recomendation = require('./sockets/recomendationSocket');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Resto del código...

// Middlewares de Express
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Vistas públicas
app.use(express.static(__dirname + '/views'));

// Manejo de rutas
app.use('/api/V1', routes);

io.on('connection', (socket) => {
    console.log("Cliente online", socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
    socket.on('recomendation:read', recomendation(io).readUpdateAC);
});

// Si no encuentra rutas, las envía a 404
app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/views/404.html'));
});

app.use(function(err, req, res, next) {
    if (env !== 'production') console.error(err);
    if (err.status == 404)
        return res.status(404).sendFile(path.join(__dirname + '/views/404.html'));
    if (err.status || 500)
        return res.status(500).sendFile(path.join(__dirname + '/views/500.html'));
    next();
});
console.log('Connecting to MongoDB...');
mongo.connectToServer((err) => {
    if (err) {
        if (env !== 'production') console.log(err);
        process.exit();
    }
    console.log('Connected to MongoDB successfully');
    server.listen(port, () => {
        console.log(`✔ Express server listening on port ${port}`);
    });
});