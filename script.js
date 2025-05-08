"use strict";

const inputStr = document.querySelector("#inputString");
const addStringBtn = document.querySelector("#addString");
const actionBtns = document.querySelector(".actionButtonsContainer");
const checkAllBtn = document.querySelector("#verifyAll");
const removeAllBtn = document.querySelector("#removeAll");
const listItems = document.querySelector("#listItems");

// Hide the 'Check All' and 'Remove All' buttons
document.querySelector(".actionButtonsContainer").classList.add("hidden");

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
    li.classList.add("listItem");

    let span = document.createElement("span");
    span.textContent = `${str}`;

    let div = document.createElement("div");
    div.id = "listButtons";
    div.classList.add("listButtons");

    let buttonVerify = document.createElement("button");
    buttonVerify.id = "verifyItem";
    buttonVerify.classList.add("verify");
    buttonVerify.onclick = () => verifyString(index);
    buttonVerify.textContent = "✅";

    let buttonRemove = document.createElement("button");
    buttonRemove.id = "removeItem";
    buttonRemove.classList.add("remove");
    buttonRemove.onclick = () => removeString(index);
    buttonRemove.textContent = "❌";

    let hr = document.createElement("hr");

    div.appendChild(buttonVerify);
    div.appendChild(buttonRemove);
    listItems.appendChild(li);
    li.appendChild(span);
    li.appendChild(div);
    listItems.appendChild(hr);
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

function verifyString(index) {}
function verifyAllStrings() {}

displayStrings();
