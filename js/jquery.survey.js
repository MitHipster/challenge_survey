// Render survey plug-in
(function($) {
  $.fn.renderSurvey = function(options) {
    // Survey form structure
    const form =
     `<form id="s-form" action=${options.submitUrl} method="GET">
        <h1 class="s-question">${options.question}</h1>
        <div class="s-answers-container">
          <input id="s-answers" type="hidden" name="answers"/>
        </div>
        <div class="s-other-container">
          <label for="s-answer-other">Other:</label>
          <input id="s-answer-other" name="other_answer"/>
        </div>
        <button id="s-submit" type="submit" disabled>Submit</button>
        <p class="s-error"></p>
      </form>`;

    // Call renderAnswers to generate answer section
    const surveryAnswers = renderAnswers(options.answers);

    // Function to generate answer section HTML
    function renderAnswers(answers) {
      let block = ``;
      // Loop through each item in the answers array
      $.each(answers, function(index, answer) {
        block +=
       `<div class="s-option">
          <div class="s-value">${answer}</div>
          <div class="s-indicator" data-value=${answer} data-selected></div>
        </div>`;
      });
      return block;
    };

    // Track number of answers selected
    let selected = 0;

    // Function to add click event to answer block
    function answerEvent(parent, indicator, button) {
      $(parent).click(function() {
        const $indicator = $(this).children(indicator);
        const $button = $(button);
        // Toggle selection indicator, submit button state, and update selected counter.
        if (!$indicator.attr("data-selected")) {
          selected++;
          $indicator.attr("data-selected", "true");
          $button.prop('disabled', false);
        } else {
          selected--;
          $indicator.attr("data-selected", "");
          // If selected counter returns to 0, disable submit button
          if (selected === 0) {
            $button.prop('disabled', true);
          }
        }
      });
    }

    // Function to add click event to submit button
    function submitEvent(button, indicator, input) {
      $(button).click(function(event) {
        let optionsSel = "";
        const $indicator = $(indicator);
        const $input = $(input);
        // Loop through indicator class
        $.each($indicator, function(index, element) {
          $element = $(element);
          // If option is selected, add to hidden input field
          if ($element.attr("data-selected") === "true") {
            // Concatenate selections
            optionsSel += $element.attr("data-value") + ", ";
          }
        });
        // Remove trailing separator
        optionsSel = optionsSel.substring(0, optionsSel.length - 2);
        $input.val(optionsSel);
      });
    }

    // Append form
    this.append(form);
    // Prepend answer block
    this.find(".s-answers-container").prepend(surveryAnswers);
    // Call function to add click handlers
    answerEvent(".s-option", ".s-indicator", "#s-submit");
    submitEvent("#s-submit", ".s-indicator", "#s-answers");
    // Returning this allows chaining after custom method
    return this;
  }
}(jQuery));
