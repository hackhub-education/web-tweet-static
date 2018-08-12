var baseUrl = 'https://tweet-api.webdxd.com/'

var displayUser = (user) => {
    let profile = $('.profile')
    $('<img>').addClass('avatar').attr({
        'src': user.avatarUrl,
        'alt': 'avatar'
    }).appendTo(profile)
    $('<h3>').text(user.name).appendTo(profile)
    $('<h5>').text('@' + user.username).appendTo(profile)
    if (user.location) $('<h4><i class="fas fa-map-marker-alt"></i> ' + user.location + '</h4>').appendTo(profile)
    if (user.location) $('<p>').addClass('center').text(user.bio).appendTo(profile)
    $('.avatar-sm').attr('src', user.avatarUrl)
}

if (localStorage.user) {
    $.ajax({
        type: "GET",
        url: baseUrl + "profile/" + localStorage.user,
        beforeSend: function (xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            if (data.success) {
                if (window.location.pathname === '/index.html' || window.location.pathname === '/profile.html') {
                    displayUser(data.profile)
                }
            } else {
                localStorage.user = null
                window.location.replace("/login.html")
            }
        },
        error: function () {
            console.log("Auth Check Failed")
        }
    });
}

var prependTweet = (tweet) => {
    let tweetContainer = $('<div>').addClass('tweet').append()
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
    $('#tweet-list').prepend(tweetContainer)
}

var loadAllTweets = () => {

    $.ajax({
        type: 'GET',
        url: baseUrl + 'tweet',
        success: (data) => {
            for (let tweet of data.tweets) {
                prependTweet(tweet)
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
                    localStorage.user = data.profile._id
                    $('#signup-form').trigger("reset")
                    window.location.replace("/profile-edit.html");
                } else {
                    $('#signup-btn').after($('<p>').addClass('error-msg').text(data.error.message))
                }

            },
            error: function () {
                console.log("Signup Failed")
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
                    localStorage.user = data.profile._id
                    $('#login-form').trigger("reset")
                    window.location.replace("/index.html")
                } else {
                    $('#login-btn').after($('<p>').addClass('error-msg').text('Username and password do not match.'))
                }
            },
            error: function () {
                console.log("Login Failed")
            }
        });
    }
})

var newTweet = {}

$('#tweet-content').keyup(() => {
    newTweet.content = $('#tweet-content').val()
    newTweet.content ? $('#post-btn').prop('disabled', false) : $('#post-btn').prop('disabled', true)
})

$('#post-btn').click(() => {

    $.ajax({
        type: "POST",
        url: baseUrl + "tweet",
        data: {
            content: newTweet.content
        },
        beforeSend: function (xhr) {
            if (localStorage.token) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
            }
        },
        success: function (data) {
            if (data.success) {
                $('#tweet-form').trigger("reset")
                $('#post-btn').prop('disabled', true)
                prependTweet(data.tweet)
            } else {
                console.log(data.error.message)
            }
        },
        error: function () {
            console.log("Authentication Failed")
        }
    });

})