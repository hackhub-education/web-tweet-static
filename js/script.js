var baseUrl = 'http://localhost:3000/'

var loadAllTweets = () => {

    $.ajax({
        type: 'GET',
        url: baseUrl + 'tweet',
        success: (data) => {
            for (let tweet of data.tweets) {
                console.log(tweet);
    
                let tweetContainer = $('<div>').addClass('tweet').append()
                let row = $('<div>').addClass('row').appendTo(tweetContainer)
                $('<img>').addClass('avatar-sm').attr({
                    'src': tweet.author.avatarUrl,
                    'alt': 'avatar'
                }).appendTo(row)
                $('<h4><b>' + tweet.author.name +'</b></h4>').appendTo(row)
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

loadAllTweets()