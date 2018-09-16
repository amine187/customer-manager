module.exports = {
    database: {
        url: {
            prod: 'mongodb://amine:rhouma187@ds251902.mlab.com:51902/webtrekk',
            test: 'mongodb://amine:amine187@ds151004.mlab.com:51004/webtrekk_test'
        }
    },
    nodeServer: {
        host: "0.0.0.0",
        port: 3000,
    }
}
