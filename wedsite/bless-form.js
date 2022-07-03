jQuery(document).ready(function ($) {
    $("#bless_form").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Please Enter Name"
            },
            email: {
                required: "Please Enter Email",
                email: "Please Enter Valid Email Address"
            },
            message: {
                required: "Please Enter Message"
            }
        },
        submitHandler: function (form) {
            var name = $("#bless_name").val();
            var email = $("#bless_email").val();
            var message = $("#bless_message").val();
            var dataString = 'bless_name1=' + name + '&bless_email1=' + email + '&bless_message1=' + message;
            $.ajax({
                type: "POST",
                url: "bless_form.php",
                data: dataString,
                cache: false,
                success: function (result) {
                    $('#blessSuccessMessage').modal('show');
                    $("#bless_name").val('');
                    $("#bless_email").val('');
                    $("#bless_message").val('');
                }
            });
            return false;
        }
    });
});