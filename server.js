const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const path = require('path');
const debug = require('debug')('server:server');

/**
 * Server Routers
 */
const customersRouters = require('./api/routes/customers');

/**
 * Server Configuration & Middlewares
 */
const config = require('./config/default');
const port = config.nodeServer.port;
const databaseUrl = config.database.url;
const buildPath = path.join(__dirname, 'dist');
const router = express.Router();
const app = express();
const db = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

// Create link to Angular build directory
app.use(express.static(buildPath));
router.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) return next();
    res.sendFile(path.join(buildPath, 'index.html'));
});

/**
 * API urls
 */
app.use('/', router);
app.use('/api/v1/customers', customersRouters);

/**
 * Database Connection.
 */
mongoose.connect(databaseUrl, { useNewUrlParser: true }).then(
    () => { console.info('Database is connected') },
    err => { console.error('Can not connect to the database' + err) }
);

/**
 * Server listen.
 */
const server = app.listen(port, () => {
    console.info("Application connected on port " + port);
});

/**
 * Listen on connection wth database.
 */
db.on('error', onDBError);
db.once('open', onDBListening);

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            winston.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            winston.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

/**
 * Event listener for Mongo database "error" event. 
 */
function onDBError(error) {
    console.error('Connection database error : ', error);
}

/**
 * Event listener for Mongo database "listening" event.
 */
function onDBListening() {
    console.log("Connected correctly to server");
}

module.exports = app;