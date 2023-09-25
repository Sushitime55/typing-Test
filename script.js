// random quotes api url
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";

const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// get and display a random quote
const renderNewQuote = async () => {
  // fetch content from url
  const response = await fetch(quoteApiUrl);

  // store response
  let data = await response.json();

  // access content
  quote = data.content;

  // array of characters in the quote
  let arr = quote.split("").map((value) => {
    // wrap the characters in a span tag for easy comparison to user input
    return "<span class='quote-chars'>" + value + "</span>";
  });

  // add quote to webpage
  quoteSection.innerHTML += arr.join("");
};

// logic for comparing quote with user input
userInput.addEventListener("input", () => {
  // assign all quote characters to a variable
  let quoteChars = document.querySelectorAll(".quote-chars");

  // create an array from said variable
  quoteChars = Array.from(quoteChars);

  // create array of user input characters
  let userInputChars = userInput.value.split("");

  // compare quote to user input
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
      // display mistakes on webpage
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

// start test: initialize values, enable user input, start timer, hide start button, display stop button
const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeStart();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

// end test: clear timer, disable user input, calculate wpm and accuracy, hide stop button and show results info
const displayResult = () => {
  clearInterval(timer);
  userInput.disabled = true;

  // calculate time taken to calculate wpm below
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }

  // calculate average wpm by dividing user input character length by some arbitrary value lolol wip
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";

  // calculate % accuracy by dividing number of correct inputs by number of total inputs
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + "%";

  document.getElementById("stop-test").style.display = "none";
  document.querySelector(".result").style.display = "block";
};

// update timer
function updateTimer() {
  if (time == 0) {
    // end test if timer reaches 0
    displayResult();
  } else {
    // display timer on screen
    document.getElementById("timer").innerText = --time + "s";
  }
}

// set timer, 60 seconds ticking down every second
const timeStart = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};

// on window load: disable user input for textbox, grab a random quote to display, show start button, and hide stop button
window.onload = () => {
  userInput.value = "";
  userInput.disabled = true;
  renderNewQuote();
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
};
