var baseUrl = 'http://localhost:3000/'

var loadAllTweets = () => {

    $.ajax({
        type: 'GET',
        url: baseUrl + 'tweet',
        success: (data) => {
            for (let tweet of data.tweets) {
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
                $('#tweet-list').append(tweetContainer)
            }
        },
        error: (err) => {
            console.log(err.statusText)
        }
    });

}

var signupForm = () => {

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
                    if (data.error) {
                        console.log(data.error.message)
                    } else {
                        console.log(data)
                        localStorage.token = data.token;
                        alert('Got a token from the server! Token: ' + data.token);
                    }
                    $('#signup-form').trigger("reset");
                },
                error: function () {
                    alert("Signup Failed");
                }
            });
        }
    })
}

loadAllTweets()
signupForm()