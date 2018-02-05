var outputDiv;
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var operators = ["+", "-", "*", "/"];
var operations = ["add", "sub", "mul", "div"];
var calculator;

/**
 * @function calculate
 * @param  {string} mathExp {the expression to calculate}
 * @return {number} {the result of the calculation or NaN if it couldn't be done}
 */
function calculate(mathExp) {
  try {
    return eval(mathExp);
  } catch (e) {
    return NaN;
  }
}

function setMemory(value) {
  window.localStorage.setItem("memory", value);
  var memoryDiv = document.getElementById("memory");
  if (Number(value)) {
    memoryDiv.classList.remove("hidden");
  } else memoryDiv.classList.add("hidden");
}

var isResultShown = false;

setMemory(window.localStorage.getItem("memory"));

document.addEventListener("DOMContentLoaded", function() {
  setMemory(window.localStorage.getItem("memory"));
  outputDiv = document.getElementById("output");
  calculator = document.getElementById("calc");

  calculator.addEventListener("click", function(event) {
    var elementId = event.target.id;
    var target = event.target;
    var last;

    if (elementId === "clr") {
      outputDiv.innerText = "";
      isResultShown = false;
    } else if (elementId === "eq") {
      var result = calculate(outputDiv.innerText).toString();
      var maxLength = 11;
      if (result.length <= maxLength) {
        outputDiv.innerText = result;
      } else {
        outputDiv.innerText = result.slice(0, maxLength);
      }
      isResultShown = true;
    } else if (elementId === "ms") {
      setMemory(outputDiv.innerText);
    } else if (elementId === "mr") {
      outputDiv.innerText = window.localStorage.getItem("memory");
      isResultShown = true;
    } else if (elementId === "mp") {
      var prev = window.localStorage.getItem("memory");
      setMemory(Number(outputDiv.innerText) + Number(prev));
    } else if (elementId === "del") {
      if (isResultShown) {
        outputDiv.innerText = "";
      } else {
        outputDiv.innerText = outputDiv.innerText.slice(0, -1);
      }
      isResultShown = false;
    } else if (outputDiv.innerText.length <= 11) {
      if (numbers.includes(elementId)) {
        if (isResultShown) {
          outputDiv.innerText = elementId;
        } else {
          outputDiv.innerText += elementId;
        }
        isResultShown = false;
      } else if (operations.includes(elementId)) {
        var output = outputDiv.innerText;
        var last = output[output.length - 1];
        if (operators.includes(last)) {
          outputDiv.innerText = output.slice(0, -1) + target.innerText;
        } else {
          outputDiv.innerText += target.innerText;
        }
        isResultShown = false;
      }
    }
  });
});
