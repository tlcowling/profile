var mocha = require ('mocha');
var chai  = require ('chai');
var expect = chai.expect;
var EnquiryValidator = require ('../../lib/enquiry_validator.js');

describe ("EnquiryValidator", function() {
    describe ("name validation", function() {
        it ("should not allow empty names", function() {
            expect(EnquiryValidator.isInvalidName('')).to.equal(true);
        });

        it ("should not allow names greater than 255 characters", function() {
            var toolongname = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzbcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzbcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzbcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzbcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
            expect(EnquiryValidator.isInvalidName(toolongname)).to.equal(true);
        });

        it ("should not allow undefined strings", function() {
            var notastringname = undefined;
            expect(EnquiryValidator.isInvalidName(notastringname)).to.equal(true);
        });

        it ("should not allow numbers", function() {
            var anumber    = 1;
            expect(EnquiryValidator.isInvalidName(anumber)).to.equal(true);
        });

        it ("should not allow null strings", function() {
            var notastring = null;
            expect(EnquiryValidator.isInvalidName(notastring)).to.equal(true);
        });

        it ("should not allow spaces", function() {
            var onlyspaces = "  ";
            expect(EnquiryValidator.isInvalidName(onlyspaces)).to.equal(true);
        });
    });
});