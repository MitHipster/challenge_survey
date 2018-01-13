(function($) {
  $.fn.renderSurvey = function(options) {
    return $(this).append(
     `<p>${options.question}</p>
      <p>${options.answers}</p>
      <p>${options.submitUrl}</p>`
    );
  }
}(jQuery));
