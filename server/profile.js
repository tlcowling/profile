(function() {
    var express = require('express');
    var app     = express();
    var config  = require('./config.json');
    var bunyan  = require('bunyan');
    var log     = bunyan.createLogger({ name: 'profile' });

    var bodyParser = require('body-parser');
    var v1api   = require('./routes/v1api.js');

    app.set('title', 'Profiler');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use('/api/v1', v1api);

    app.listen(config.port, function() {
        log.info('listening on port ' + config.port);
    });
})();