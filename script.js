// random quotes api url
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// display random quotes
const renderNewQuote = async () => {
  // fetch content from url
  const response = await fetch(quoteApiUrl);

  // store response
  let data = await response.json();

  // access data
  quote = data.content;

  // array of characters in the quote
  let arr = quote.split("").map((value) => {
    //wrap the characters in a span tag (not sure the purpose of this, maybe for comparisons later on? will skip for now)
    // return "<span class='quote-chars'>" + value + "</span>";
    return value;
  });

  quoteSection.innerHTML += arr.join("");
};

// on window load, hide stop button, disable user input for textbox, and grab a random quote to display
window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
