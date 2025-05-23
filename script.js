"use strict";

const inputStr = document.querySelector("#inputString");
const actionBtns = document.querySelector("#actionButtonsContainer");
const listItems = document.querySelector("#listItems");
const htmlEl = document.querySelector("html");
const darkLightButton = document.querySelector("#darkLightBtn");
const langSwapBtn = document.querySelector("#langSwapBtn");
const title = document.querySelector("#title");
const inputLabel = document.querySelector("#inputLabel");
const addStringBtn = document.querySelector("#addString");
const verifyAllBtn = document.querySelector("#verifyAll");
const removeAllBtn = document.querySelector("#removeAll");

// Hide the 'Check All' and 'Remove All' buttons
actionBtns.classList.add("hidden");

// Swap between dark and light mode
function darkLightMode() {
  darkLightButton.addEventListener("click", () => {
    htmlEl.setAttribute(
      "data-bs-theme",
      htmlEl.getAttribute("data-bs-theme") === "light" ? "dark" : "light"
    );
    darkLightButton.innerHTML =
      htmlEl.getAttribute("data-bs-theme") === "light"
        ? '<i class="bi bi-moon-stars"></i>'
        : '<i class="bi bi-brightness-high"></i>';
  });
}

// Reset language to original (english)
function resetLang() {
  htmlEl.setAttribute("lang", "en");
  langSwapBtn.textContent = "PT";
  title.textContent = "Palindrome Checker";
  inputLabel.textContent = "Insert a word or sentence to be tested";
  addStringBtn.innerHTML = '<i class="bi bi-plus-square"></i> Add';
  verifyAllBtn.innerHTML = '<i class="bi bi-check2-square"></i> Check All';
  removeAllBtn.innerHTML = '<i class="bi bi-trash3"></i> Remove All';
}

// Swap languages between Portuguese and English
function swapLanguage() {
  langSwapBtn.addEventListener("click", () => {
    if (htmlEl.getAttribute("lang") === "en") {
      htmlEl.setAttribute("lang", "pt-BR");
      langSwapBtn.textContent = "EN";
      title.textContent = "Verificador de Palíndromo";
      inputLabel.textContent = "Insira uma palavra ou frase a ser testada";
      addStringBtn.innerHTML = '<i class="bi bi-plus-square"></i> Adicionar';
      verifyAllBtn.innerHTML =
        '<i class="bi bi-check2-square"></i> Verificar Tudo';
      removeAllBtn.innerHTML = '<i class="bi bi-trash3"></i> Remover Tudo';
    } else {
      resetLang();
    }
  });
  return;
}

// Add inputs to localStorage
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

// Display the inputs on the screen
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

// Remove all inputs from the localStorage
function removeAllStrings() {
  localStorage.clear();
  displayStrings();
  actionBtns.classList.add("hidden");
}

// Remove inputs based on their index in the localStorage
function removeString(index) {
  let strings = JSON.parse(localStorage.getItem("strings"));
  strings.splice(index, 1);
  localStorage.setItem("strings", JSON.stringify(strings));
  displayStrings();
  if (strings.length < 1) {
    actionBtns.classList.add("hidden");
  }
}

// Verify if all strings are palindrome or not
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

// Verify if a string is a palindrome or not
function verifyString(index) {
  let strings = JSON.parse(localStorage.getItem("strings"));
  let spanEl = document.getElementsByTagName("span");
  if (checkPalindrome(strings[index])) {
    spanEl[index].classList.add("green");
  } else {
    spanEl[index].classList.add("red");
  }
}

// Clean the input leaving only letters and numbers if any
function cleanString(str) {
  const regex = /[^a-zA-Z0-9]/g;
  return str
    .normalize("NFD") // Decomposes accented characters into base + mark
    .replace(/[\u0300-\u036f]/g, "") // Removes accent marks
    .trim()
    .replace(regex, "")
    .toLowerCase();
}

// Reverse the input characters order
function reverseString(str) {
  return cleanString(str).split("").reverse().join("");
}

// Check for palindromes
function checkPalindrome(str) {
  let cleanStr = cleanString(str);
  let reverseStr = reverseString(str);
  return cleanStr === reverseStr ? true : false;
}

darkLightMode();
swapLanguage();
displayStrings();
