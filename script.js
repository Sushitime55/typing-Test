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
    //wrap the characters in a span tag for comparison
    return "<span class='quote-chars'>" + value + "</span>";
  });

  quoteSection.innerHTML += arr.join("");
};

// logic for comparing input words with quote
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");
  // create an array from received span tags
  quoteChars = Array.from(quoteChars);

  // array of user input characters
  let userInputChars = userInput.value.split("");

  quoteChars.forEach((char, index) => {
    // check if quote character = user input character
    // [index](input character)
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    // else if user hasn't entered anything or backspaced
    else if (userInputChars[index] == null) {
      // remove class if any
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    // if user enters the wrong character
    else {
      // check if fail class already exists
      if (!char.classList.contains("fail")) {
        // if not, increment and display  number of mistakes
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }

    // check if all characters have been entered correctly
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    // end test if all characters are correct
    if (check) {
      displayResult();
    }
  });
});

// start test
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

// end test
const displayResult = () => {
  document.querySelector(".result").style.display = "block";
};

// on window load, hide stop button, disable user input for textbox, and grab a random quote to display
window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewQuote();
};
