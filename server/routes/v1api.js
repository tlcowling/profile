(function() {
    var express = require('express');
    var router  = express.Router();
    var config  = require('./../config.json');
    var EnquiryValidator = require('./../lib/enquiry_validator.js');

    router.get('/version', function(req, res, next) {
        res.json(config.version);
    });

    router.post('/enquiry', function(req, res, next) {
        var name    = req.body.name;
        var email   = req.body.email;
        var message = req.body.message;
    });

    module.exports = router;

})();