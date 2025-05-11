"use strict";

const inputStr = document.querySelector("#inputString");
const actionBtns = document.querySelector("#actionButtonsContainer");
const listItems = document.querySelector("#listItems");

// Hide the 'Check All' and 'Remove All' buttons
actionBtns.classList.add("hidden");

function addString() {
  let strings = JSON.parse(localStorage.getItem("strings")) || [];
  if (inputStr.value !== "") {
    strings.push(inputStr.value);
    localStorage.setItem("strings", JSON.stringify(strings));
  } else {
    alert("Insert a word or a sentence to continue!");
  }
  displayStrings();
  inputStr.value = "";
}

function displayStrings() {
  listItems.innerHTML = "";
  let strings = JSON.parse(localStorage.getItem("strings")) || [];

  strings.forEach((str, index) => {
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "gap-1"
    );

    let span = document.createElement("span");
    span.classList.add("d-flex", "align-items-center");
    span.textContent = `${str}`;

    let div = document.createElement("div");
    div.classList.add("btn-group", "d-flex", "align-items-end");

    let buttonVerify = document.createElement("button");
    buttonVerify.classList.add("btn", "btn-success", "px-3", "py-2", "verify");
    buttonVerify.onclick = () => verifyString(index);
    buttonVerify.innerHTML = '<i class="bi bi-check2-square"></i>';

    let buttonRemove = document.createElement("button");
    buttonRemove.classList.add("btn", "btn-danger", "px-3", "py-2", "remove");
    buttonRemove.onclick = () => removeString(index);
    buttonRemove.innerHTML = '<i class="bi bi-trash3"></i>';

    div.appendChild(buttonVerify);
    div.appendChild(buttonRemove);
    listItems.appendChild(li);
    li.appendChild(span);
    li.appendChild(div);
  });

  if (strings.length > 0) {
    actionBtns.classList.remove("hidden");
  }
}

function removeAllStrings() {
  localStorage.clear();
  location.reload();
}

function removeString(index) {
  let strings = JSON.parse(localStorage.getItem("strings"));
  strings.splice(index, 1);
  localStorage.setItem("strings", JSON.stringify(strings));
  displayStrings();
  if (strings.length < 1) {
    actionBtns.classList.remove("hidden");
    location.reload();
  }
}

function verifyAllStrings() {
  let strings = JSON.parse(localStorage.getItem("strings"));
  let spanEl = document.getElementsByTagName("span");
  strings.forEach((str, index) => {
    if (checkPalindrome(str)) {
      spanEl[index].classList.add("green");
    } else {
      spanEl[index].classList.add("red");
    }
  });
}

function verifyString(index) {
  let strings = JSON.parse(localStorage.getItem("strings"));
  let spanEl = document.getElementsByTagName("span");
  if (checkPalindrome(strings[index])) {
    spanEl[index].classList.add("green");
  } else {
    spanEl[index].classList.add("red");
  }
}

function cleanString(str) {
  const regex =
    /[\s|,.;/\/<>:?[\]{}'"!@#$%&*()/\-_–=+\u00C2\u00EA\u00EE\u00F4\u00FB]/g;
  return str.trim().replace(regex, "").toLowerCase();
}

function reverseString(str) {
  return cleanString(str).split("").reverse().join("");
}

function checkPalindrome(str) {
  let cleanStr = cleanString(str);
  let reverseStr = reverseString(str);
  return cleanStr === reverseStr ? true : false;
}

displayStrings();
