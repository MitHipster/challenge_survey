$(function() {
  const surveyConfig = {
    "question": "What is your favorite color?",
    "answers": ["Red", "Green", "Blue", "Orange"],
    "submitUrl": "https://example.com/"
  };

  $("#survey").renderSurvey(surveyConfig);
});
