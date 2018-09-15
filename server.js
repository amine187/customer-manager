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
const customersRoutersV2 = require('./api/routes/customers.v2');

/**
 * Server Configuration & Middlewares
 */
const config = require('./config/default');
const port = config.nodeServer.port;
const buildPath = path.join(__dirname, 'dist');
const router = express.Router();
const app = express();
const db = mongoose.connection;
let databaseUrl = config.database.url.prod;

// change database url for testing mode
if (process.env.NODE_ENV == 'test') {
    databaseUrl = config.database.url.test;
}

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
app.use('/api/v2/customers', customersRoutersV2);

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
const server = app.listen(process.env.PORT || port, () => {
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