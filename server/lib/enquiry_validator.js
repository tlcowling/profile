(function() {
    var isEmpty = function(str) {
        return (!str || 0 === str.length);
    };

    var isBlank = function (str) {
        return (!str || /^\s*$/.test(str));
    };

    var isTooLong = function(str, number) {
        return (str.length > (number || 255));
    };

    var isNotString = function(str) {
        return !(typeof(str) === 'string');
    };

    var isInvalidString = function (str) {
        return isNotString(str) || isEmpty(str) || isBlank(str);
    };

    var isNotEmailAddress = function(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return !re.test(email);
    };

    var EnquiryValidator = {
        isInvalidName: function(name) {
            return isInvalidString(name) || isTooLong(name);
        },
        isInvalidEmail: function(email) {
            return isInvalidString(email) || isTooLong(email) ||  isNotEmailAddress(email);
        },
        isInvalidMessage: function(message) {
            return isInvalidString(message) || isTooLong(message, 4096);
        }
    };

    module.exports = EnquiryValidator;

})();