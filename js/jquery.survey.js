(function($) {
  $.fn.renderSurvey = function(options) {
    let form =
     `<form id="s-form" action=${options.submitUrl} method="GET">
        <h1 class="s-question">${options.question}</h1>
        <div class="s-answers-container"></div>
      </form>
      <label for="s-answer-other">Other:</label>
      <input id="s-answer-other"/>`;

    let surveryAnswers = renderAnswers(options.answers);

    function renderAnswers(answers) {
      let block = ``;
      $.each(answers, function(index, answer) {
        block +=
       `<div class="s-answer">${answer}
          <input type="text"/>
        </div>`;
      });

      return block;
    };

    function assignEvent(className) {
      $(className).click(function() {
        let $input = $(this).children("input");
        if (!$input.val()) {
          let answerValue = $(this).text();
          $input.val(answerValue);
        } else {
          $input.val("");
        }
      })
    }

    // function renderHiddenInputs(answers) {
    //
    // }

    $(this).append(form);
    $(this).find(".s-answers-container").append(surveryAnswers);
    assignEvent(".s-answer");
    return $(this);
  }
}(jQuery));
