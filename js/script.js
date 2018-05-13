var baseUrl = "http://localhost:3000/";

$.ajax({
    type: 'GET',
    url: baseUrl + 'tweet',
    success: (data) => {
        for (let tweet of data.tweets) {
            console.log(tweet);
        }
    }
});