(function($) {
  $.fn.renderSurvey = function(options) {
    const form =
     `<form id="s-form" action=${options.submitUrl} method="GET">
        <h1 class="s-question">${options.question}</h1>
        <div class="s-answers-container">
          <input id="s-answers" type="text" name="answers"/>
        </div>
        <label for="s-answer-other">Other:</label>
        <input id="s-answer-other" name="other_answer"/>
        <button id="s-submit" type="submit" disabled>Submit</button>
        <p class="s-error"></p>
      </form>`;

    const surveryAnswers = renderAnswers(options.answers);

    function renderAnswers(answers) {
      let block = ``;
      $.each(answers, function(index, answer) {
        block +=
       `<div class="s-option">
          <div class="s-value">${answer}</div>
          <div class="s-indicator" data-value=${answer} data-selected></div>
        </div>`;
      });
      return block;
    };

    let selected = 0;

    function answerEvent(parent, indicator, button) {
      $(parent).click(function() {
        const $indicator = $(this).children(indicator);
        const $button = $(button);
        if (!$indicator.attr("data-selected")) {
          selected++;
          $indicator.attr("data-selected", "true");
          $button.prop('disabled', false);
        } else {
          selected--;
          $indicator.attr("data-selected", "");
          if (selected === 0) {
            $button.prop('disabled', true);
          }
        }
      });
    }

    function submitEvent(button, indicator, input) {
      $(button).click(function(event) {
        let optionsSel = "";
        const $indicator = $(indicator);
        const $input = $(input);
        $.each($indicator, function(index, element) {
          $element = $(element);
          if ($element.attr("data-selected") === "true") {
            optionsSel += $element.attr("data-value") + ", ";
          }
        });
        optionsSel = optionsSel.substring(0, optionsSel.length - 2);
        $input.val(optionsSel);
      });
    }

    $(this).append(form);
    $(this).find(".s-answers-container").prepend(surveryAnswers);
    answerEvent(".s-option", ".s-indicator", "#s-submit");
    submitEvent("#s-submit", ".s-indicator", "#s-answers");
    return $(this);
  }
}(jQuery));
