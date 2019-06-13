/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  let $charCount = 140;

  // Toggling 'new tweet' form
  $('#compose').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').select();
  });

  // Tracking character count
  $('.new-tweet textarea').on('input', function() {
    $charCount = 140 - $(this).val().length;

    // Update the char counter
    $(this).siblings('.counter').text($charCount);

    // Changing counter color
    if ($charCount < 0) {
      $(this).siblings('.counter').addClass('red-text');
    } else if ($charCount > 0) {
      $(this).siblings('.counter').removeClass('red-text');
    }

  });

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

  // Rendering tweets dynamically
  function renderTweets(tweets) {
    for (let x in tweets) {
      let result = createTweetElement(tweets[x]);
      $('#tweet-container').prepend(result);
    }
  }

  // Switching form submission to AJAX
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    let $tweetText = $(this).serialize();
    console.log($charCount);

    // Form validation. If it passes, submits the AJAX request
    if ($charCount === 140) {
      alert("Sorry, it seems I didn't get your tweet!");
    } else if ($charCount < 0) {
      alert("Sorry, your tweet is too long. Less is more!")
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $tweetText
      })

      // Loading new tweets
      function loadTweets(){
        $.ajax({
          url: '/tweets',
          method: 'GET',
          success: renderTweets
        })
      }

      loadTweets();
    }

  });


});
