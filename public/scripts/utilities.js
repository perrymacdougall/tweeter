$(document).ready(function() {

  // Tracking character count
  $('.new-tweet textarea').on('input', function() {
    let $charCount = 140 - $(this).val().length;
    console.log($charCount);

    // Update the char counter
    $(this).siblings('.counter').text($charCount);

    // Changing counter color
    if ($charCount < 0) {
      $(this).siblings('.counter').addClass('red-text');
    } else if ($charCount > 0) {
      $(this).siblings('.counter').removeClass('red-text');
    }

  });

});