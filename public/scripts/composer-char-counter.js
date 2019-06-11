$(document).ready(function() {
  // Tracking character count
  $('.new-tweet textarea').keypress(function() {
    let charCount = $(this).val().length;
    console.log(139 - charCount);

    // Update the char counter
    $(this).siblings('.counter').text(charCount);

  });

});