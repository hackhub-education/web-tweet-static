var baseUrl = 'http://tweet-api.webdxd.com/'

var loadAllTweets = () => {

    $.ajax({
        type: 'GET',
        url: baseUrl + 'tweet',
        success: (data) => {
            for (let tweet of data.tweets) {
                let tweetContainer = $('<div>').addClass('tweet').prependTo($('#tweet-list'))
                let row = $('<div>').addClass('row').appendTo(tweetContainer)
                $('<img>').addClass('avatar-sm').attr({
                    'src': tweet.author.avatarUrl,
                    'alt': 'avatar'
                }).appendTo(row)
                $('<h4><b>' + tweet.author.name + '</b></h4>').appendTo(row)
                $('<h5>@' + tweet.author.username + '</h5>').appendTo(row)
                $('<h5>').text(moment(tweet.createdAt).calendar()).appendTo(row)
                let content = $('<p>').text(tweet.content).appendTo(tweetContainer)
                if (tweet.imageUrl) {
                    $('<br><img src="' + tweet.imageUrl + '" alt="tweet">').appendTo(content)
                }
            }
        },
        error: (err) => {
            console.log(err.statusText)
        }
    });

}

loadAllTweets()

$('#signup-btn').click(() => {

    let newUser = {
        username: $('#username').val(),
        password: $('#password').val(),
        repeatPassword: $('#repeat-password').val()
    }

    $('.error-msg').remove()
    $('form input').removeClass('input-alert')

    if (!newUser.username) {
        $('#username').addClass('input-alert').before($('<span>').addClass('error-msg').text('Username required'))
    } else if (!newUser.password) {
        $('#password').addClass('input-alert').before($('<span>').addClass('error-msg').text('Password required'))
    } else if (newUser.password !== newUser.repeatPassword) {
        $('#repeat-password').addClass('input-alert').before($('<span>').addClass('error-msg').text('Password does not match'))
    } else {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/signup",
            data: newUser,
            success: function (data) {
                if (data.success) {
                    localStorage.token = data.token
                    $('#signup-form').trigger("reset")
                    window.location.replace("/profile-edit.html");
                } else {
                    $('#signup-btn').after($('<p>').addClass('error-msg').text(data.error.message))
                }
                
            },
            error: function () {
                alert("Signup Failed");
            }
        });
    }
})


$('#login-btn').click(() => {

    let user = {
        username: $('#username').val(),
        password: $('#password').val(),
    }

    $('.error-msg').remove()
    $('form input').removeClass('input-alert')

    if (!user.username) {
        $('#username').addClass('input-alert').before($('<span>').addClass('error-msg').text('Username required'))
    } else if (!user.password) {
        $('#password').addClass('input-alert').before($('<span>').addClass('error-msg').text('Password required'))
    } else {
        $.ajax({
            type: "POST",
            url: baseUrl + "auth/login",
            data: user,
            success: function (data) {
                if (data.success) {
                    localStorage.token = data.token
                    $('#login-form').trigger("reset")
                    window.location.replace("/index.html")
                } else {
                    $('#login-btn').after($('<p>').addClass('error-msg').text('Username and password do not match.'))
                }
            },
            error: function () {
                alert("Login Failed");
            }
        });
    }
})