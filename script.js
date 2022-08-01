const Stack = require("./Stack.js");
const prompt = require("prompt-sync")();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "first page";
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(action);
  console.log(`current page: ${currentPage}`);
  console.log(`Back page: ${backPages.peek()}`);
  console.log(`Next page: ${nextPages.peek()}`);
};

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("NEW: ");
};

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("BACK: ");
};

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("NEXT: ");
};
/*
 * The following strings are used to prompt the user
 */
const baseInfo = "\nEnter a url";
const backInfo = "B|b for back page";
const nextInfo = "N|n for next page";
const quitInfo = "Q|q for quit";
const question = "Where would you like to go today? ";

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;
showCurrentPage("DEFAULT: ");

while (finish === false) {
  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions += `, ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }
  if (!nextPages.isEmpty()) {
    instructions += `, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }
  instructions += `, ${quitInfo}`;
  console.log(instructions);

  // ------------------------------
  // User Interface Part 2
  // ------------------------------

  const answer = prompt(question);
  const lowerCaseAnswer = answer.toLowerCase();

  if (lowerCaseAnswer === "n") {
    if (showNext === true) {
      nextPage();
    } else {
      console.log("Cannot go to next page. Stack is empty.");
    }
  }
  if (lowerCaseAnswer === "b") {
    if (showBack === true) {
      backPage();
    } else {
      console.log("Cannot go back a page. Stack is empty.");
    }
  }
  if (lowerCaseAnswer === "q") {
    finish = true;
  }
  if (
    lowerCaseAnswer !== "n" &&
    lowerCaseAnswer !== "b" &&
    lowerCaseAnswer !== "q"
  ) {
    newPage(answer);
  }
}
