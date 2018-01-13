(function($) {
  $.fn.renderSurvey = function(options) {
    let form =
     `<form id="survey-form" action=${options.submitUrl} method="GET">
        <h1 class="survey-question">${options.question}</h1>
        <div class="survey-answers"></div>
      </form>
      <label for="survey-answer-other">Other:</label>
      <input id="survey-answer-other"/>`;

    let surveryAnswers = renderAnswers(options.answers);

    function renderAnswers(answers) {
      let block = ``;
      $.each(answers, function(index, answer) {
        block += `<div>${answer}</div>`
      });
      return block;
    };

    $(this).append(form);
    $(this).find(".survey-answers").append(surveryAnswers);
    return $(this);
  }
}(jQuery));
