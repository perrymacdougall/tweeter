/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Testing tweetdata
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

  // Building my tweet function
  function createTweetElement(data) {

    // Creating all elements
    let $article = $('<article>').addClass('tweet');
    let $avatar = $('<img>').attr("src", data.user.avatars.small);
    let $name = $('<h2>').text(data.user.name);
    let $handle = $('<h3>').text(data.user.handle);
    let $articleText = $('<p>').text(data.content.text)
    let $footerText = $('<p>').text(data.created_at);
    let $footerImg = $('<img>').addClass('icons').attr({
      src: "../images/icons.png",
      alt: "social media icons"
    });

    // Putting together the DOM structure
    let $header = $('<header>').addClass('clearfix').append($avatar).append($name).append($handle);
    let $footer = $('<footer>').addClass('clearfix').append($footerText).append($footerImg);

    let $tweet = $article.append($header).append($articleText).append($footer);

    return $tweet;
  };

  function renderTweets(tweets) {
    // Loop through tweets
    for (let x in tweets) {
      let result = createTweetElement(tweets[x]);
      $('#tweet-container').append(result);
    }
  }

  renderTweets(data);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like

});
