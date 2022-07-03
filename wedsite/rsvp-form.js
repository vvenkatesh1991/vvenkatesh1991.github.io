jQuery(document).ready(function ($) {
    $("#rsvp_form").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            number: {
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
            number: {
                required: "Please Enter Number of guests"
            }
        },
        submitHandler: function (form) {
            var name = $("#rsvp_name").val();
            var email = $("#rsvp_email").val();
            var number = $("#rsvp_number").val();
            var func = $("#rsvp_func").val();
            var message = $("#rsvp_message").val();
            var dataString = 'rsvp_name1=' + name + '&rsvp_email1=' + email + '&rsvp_number1=' + number + '&rsvp_func1=' + func + '&rsvp_message1=' + message;
            $.ajax({
                type: "POST",
                url: "rsvp_form.php",
                data: dataString,
                cache: false,
                success: function (result) {
                    $('#rsvpSuccessMessage').modal('show');
                    $("#rsvp_name").val('');
                    $("#rsvp_email").val('');
                    $("#rsvp_number").val('');
                    $("#rsvp_func").val('');
                    $("#rsvp_message").val('');
                }
            });
            return false;
        }
    });
});
