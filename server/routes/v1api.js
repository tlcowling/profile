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

        if (EnquiryValidator.isInvalidName(name)) {
            res.status(400).json('Invalid Name');
        } else if (EnquiryValidator.isInvalidEmail(email)) {
            res.status(400).json('Invalid Email');
        } else if (EnquiryValidator.isInvalidMessage(message)) {
            res.status(400).json('Invalid Message');
        } else {
            res.status(200).json('Thank you for your message...');
        }
    });

    module.exports = router;

})();