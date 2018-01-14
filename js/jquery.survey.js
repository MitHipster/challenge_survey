(function($) {
  $.fn.renderSurvey = function(options) {
    const form =
     `<form id="s-form" action=${options.submitUrl} method="GET">
        <h1 class="s-question">${options.question}</h1>
        <div class="s-answers-container"></div>
        <label for="s-answer-other">Other:</label>
        <input id="s-answer-other" name="other_answer"/>
        <button id="s-submit" type="submit">Submit</button>
        <p class="s-error"></p>
      </form>`;

    const surveryAnswers = renderAnswers(options.answers);

    function renderAnswers(answers) {
      let block = ``;
      $.each(answers, function(index, answer) {
        block +=
       `<div class="s-option">
          <div class="s-value">${answer}</div>
          <div class="s-indicator"></div>
          <input type="text" name="answers"/>
        </div>`;
      });
      return block;
    };

    let selected = 0;

    function answerEvent(className) {
      $(className).click(function() {
        const $input = $(this).children("input");
        if (!$input.val()) {
          let optionValue = $(this).first().text().trim();
          $input.val(optionValue);
          selected++;
        } else {
          $input.val("");
          selected--;
        }
      });
    }

    function submitEvent() {
      $("#s-submit").click(function(event) {
        if (selected === 0) {
          event.preventDefault();
          $(".s-error").text("Survey incomplete. Please select at least one option.");
        }
      })
    }

    $(this).append(form);
    $(this).find(".s-answers-container").append(surveryAnswers);
    answerEvent(".s-option");
    submitEvent();
    return $(this);
  }
}(jQuery));
