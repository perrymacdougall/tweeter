/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  let $charCount = 140;

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

  // Toggling 'new tweet' form
  $('#compose').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').select();
  });

  // Clearing errors
  $('.new-tweet textarea').on('focus', function() {
    $('.err').hide();
  });

  // Building my tweet function
  function createTweetElement(data) {

    // Figuring out the time
    let timeInSeconds = Math.floor((new Date() - data.created_at) / 1000);
    let timeUnits = "seconds";

    if (timeInSeconds > 60 && timeInSeconds < 3600) {
      timeInSeconds = Math.floor(timeInSeconds / 60);
      timeUnits = "minutes";
    } else if (timeInSeconds > 3600 && timeInSeconds < 86400) {
      timeInSeconds = Math.floor(timeInSeconds / 3600);
      timeUnits = "hours";
    } else if (timeInSeconds > 86400) {
      timeInSeconds = Math.floor(timeInSeconds / 86400);
      timeUnits = "days";
    }


    // Creating all elements
    let $article = $('<article>').addClass('tweet');
    let $avatar = $('<img>').attr("src", data.user.avatars.small);
    let $name = $('<h2>').text(data.user.name);
    let $handle = $('<h3>').text(data.user.handle);
    let $articleText = $('<p>').text(data.content.text)
    let $footerText = $('<p>').text("Published " + timeInSeconds + " " + timeUnits + " ago");
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
    for (let tweet in tweets) {
      let result = createTweetElement(tweets[tweet]);
      $('#tweet-container').prepend(result);
    }
  }

  // Switching form submission to AJAX
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();

    let $tweetText = $(this).serialize();

    // Form validation. If it passes, submits the AJAX request
    if ($charCount === 140) {
      $('err').text('Sorry, I didn\'t hear your tweet!');
    } else if ($charCount < 0) {
      $('<p>').addClass('err').addClass('err').text('Sorry, your tweet was too long. Less is more!').insertAfter('#text-field');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $tweetText
      })
      .then(function() {
        $('#tweet-container').empty();
        loadTweets();
      })

      // Clear the textarea after submitting
      $('#text-field').val("");

      // Reset the counter
      $charCount = 140;
      $('.counter').text($charCount);
    }

  });
    // Loading new tweets
    function loadTweets(){
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: renderTweets
      })
    }

  loadTweets();
});
