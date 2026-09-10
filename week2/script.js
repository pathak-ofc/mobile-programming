
function sum() {
  const first = Number(document.getElementById("first").value);
  const second = Number(document.getElementById("second").value);

  msg(`The sum is ${first + second}`);
}

function diff() {
  const first = Number(document.getElementById("first").value);
  const second = Number(document.getElementById("second").value);

  msg(`The difference is ${first - second}`);
}

function mult() {
  const first = Number(document.getElementById("first").value);
  const second = Number(document.getElementById("second").value);

  msg(`The product is ${first * second}`);
}

//Day2

function marks() {
  event.preventDefault();

  let sum = Number(document.getElementById("eng").value) + Number(document.getElementById("math").value) + Number(document.getElementById("science").value)
    + Number(document.getElementById("nep").value) + Number(document.getElementById("gk").value) + Number(document.getElementById("comp").value) +
    Number(document.getElementById("arts").value) + Number(document.getElementById("sos").value);
  console.log(sum);

  document.getElementById("total").innerText = sum + "/800";

  let pass = false;

  if (sum > 700) {
    document.getElementById("marks").innerText = "Distinction";
    pass = true;

  } else if (sum > 600) {
    document.getElementById("marks").innerText = "1st division";
    pass = true

  } else if (sum > 500) {
    document.getElementById("marks").innerText = "2nd division";
    pass = true

  } else if (sum > 400) {
    document.getElementById("marks").innerText = "3rd division";
    pass = true

  } else {
    document.getElementById("marks").innerText = "Failed";
    document.getElementById("marks").style.color = "red";
  }

  if (pass) {
    document.getElementById("pof").innerText = "Passed";
    document.getElementById("pof").style.color = "green";
  }



}

//d3

function calc(string) {
  let num1 = Number(document.getElementById("n1").value);
  let num2 = Number(document.getElementById("n2").value);
  let result;
  let resultText = document.getElementById("result");
  console.log(num1, num2)
  console.log(string)

  switch (string) {
    case 'add':
      result = num1 + num2;
      resultText.innerText = num1 + " + " + num2 + " = " + result;
      break;
    case 'subtract':
      result = num1 - num2;
      resultText.innerText = num1 + " - " + num2 + " = " + result;
      break;
    case 'mult':
      result = num1 * num2;
      resultText.innerText = num1 + " X " + num2 + " = " + result;
      break;
  }

}
