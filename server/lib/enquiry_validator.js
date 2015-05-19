(function() {
    var isEmpty = function(str) {
        return (!str || 0 === str.length);
    };

    var isBlank = function (str) {
        return (!str || /^\s*$/.test(str));
    };

    var isTooLong = function(str) {
        return (str.length > 255);
    };

    var isNotString = function(str) {
        return !(typeof(str) === 'string');
    };

    var EnquiryValidator = {
        isInvalidName: function(name) {
            return isNotString(name) || isEmpty(name) || isTooLong(name) || isBlank(name);
        }
    };

    module.exports = EnquiryValidator;

})();