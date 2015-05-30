$(document).ready(function () {

    var Validator = {
        isEmpty: function(str) {
            return (!str || 0 === str.length);
        },
        isBlank: function (str) {
            return (!str || /^\s*$/.test(str));
        },
        isTooLong: function(str, number) {
            return (str.length > (number || 255));
        },
        isNotString : function(str) {
            return !(typeof(str) === 'string');
        },
        isInvalidString: function (str) {
            return this.isNotString(str) || this.isEmpty(str) || this.isBlank(str);
        },
        isNotEmailAddress: function(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return !re.test(email);
        }
    };

    var SubmitDialog = {
        init: function() {
            this.submitButton.click(this.submit);
            this.setupValidation();
            this.valid = {
                form_name: false,
                form_email: false,
                form_message: false
            };
        },

        isValid: function() {
            var isvalid = true;

            for (var field in this.valid) {
                isvalid = isvalid && this.valid[field];
            }

            return isvalid;
        },

        nameField: $('#form_name'),
        emailField: $('#form_email'),
        messageField: $('#form_message'),
        submitButton: $('button#submit'),
        invalidFormMessage: $('#invalid_form_message'),

        setupValidation: function() {
            this.nameField.keyup(function() {
                var contents = this.value;
                var $formNameError = $("#form_name_error");
                if (Validator.isInvalidString(contents) ) {
                    $formNameError.text('Please enter your name');
                    $formNameError.show();
                    SubmitDialog.valid[this.name] = false;
                } else {
                    $formNameError.hide();
                    SubmitDialog.valid[this.name] = true;
                }
            });
            this.emailField.keyup(function() {
                var contents = this.value;
                var $formEmailError = $("#form_email_error");
                if (Validator.isNotEmailAddress(contents)) {
                    $formEmailError.text('Please enter a valid email address');
                    $formEmailError.show();
                    SubmitDialog.valid[this.name] = false;
                } else {
                    $formEmailError.hide();
                    SubmitDialog.valid[this.name] = true;
                }
            });
            this.messageField.keyup(function() {
                var contents = this.value;
                var $formMessageError = $("#form_message_error");
                if (Validator.isBlank(contents)) {
                    $formMessageError.text('Please enter a message');
                    $formMessageError.show();
                    SubmitDialog.valid[this.name] = false;
                } else if (Validator.isTooLong(contents, 512)) {
                    $formMessageError.text('Sorry, you\'ve reached the maximum length');
                    $formMessageError.show();
                    SubmitDialog.valid[this.name] = false;
                } else {
                    $formMessageError.hide();
                    SubmitDialog.valid[this.name] = true;
                }
            });
        },

        submit: function () {
            if (!SubmitDialog.isValid()) {
                SubmitDialog.invalidFormMessage.show();
                SubmitDialog.invalidFormMessage.text('Please ensure form is filled correctly');
                return;
            }

            SubmitDialog.invalidFormMessage.hide();

            var data = {
                name: 'bob',
                email: 'bob@gmail.com',
                message: 'a message of love'
            };

            var jqxhr = $.post('/api/v1/enquiry')
                .done(function(data) {
                    SubmitDialog.showPostResult(data, {'color':'green'});
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    SubmitDialog.showPostResult(errorThrown, {'color':'red'});
                });
        },

        showPostResult: function(text, css) {
            SubmitDialog.invalidFormMessage.stop(true, true).show().text(text).css(css).fadeOut(5000);
        }
    };

    SubmitDialog.init();
    $('#panel_toggle').click(function() { $('#panel').slideToggle(); });
});

