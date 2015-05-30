var express = require('express');
var app = express();
var bunyan = require('bunyan');

var log = bunyan.createLogger({
    name: 'Test Server'
});

var PORT = 8000;

app.use(express.static(__dirname + '/../site'));

app.post('/api/v1/enquiry', function(req, res, next) {
    var responses = [
        {code: 200, text: 'Thanks for your message'},
        {code: 404, text: 'Message sending is not available at this time'},
        {code: 500, text: 'Unable to process request at this time, please try later'},
        {code: 429, text: 'Too many requests received, please try later'},
        {code: 502, text: 'Unable to process request at this time, please try again later'}
    ];

    var response = responses[Math.floor(Math.random() * responses.length)];

    res.status(response.code).send(response.text);
});

app.listen(PORT, function() {
    log.info('listening on ' + PORT);
});

