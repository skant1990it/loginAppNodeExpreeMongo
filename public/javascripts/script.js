
$(document).on("click", '.register', function () {
    $.get('/register', function (data) {
        $(".container").html(data);
    });

});

$(document).on("click", '.login', function () {
    $.get('/login', function (data) {
        $(".container").html(data);
    });
});


$(document).on("submit", '.registerForm', function () {
   // var fd = new FormData($('.registerForm')[0]);

    $.ajax({
        url: "register",
        type: "POST",
        data: $('.registerForm').serialize()
    }).done(function (data) {
        $(".container").html(data);
    });
    return false;
});

$(document).on("submit", '.loginform', function () {
    // var fd = new FormData($('.registerForm')[0]);
    $.ajax({
        url: "login",
        type: "POST",
        data: $('.loginform').serialize()
    }).done(function (data) {
        $(".container").html(data);
    });
    return false;
});