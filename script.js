"use strict";

// ADICIONA OS INPUTS NO LOCAL STORAGE E EXIBE-OS NA TELA
function addString() {
  let inputString = document.getElementById("inputStr");
  let strings = JSON.parse(localStorage.getItem("strings")) || [];
  strings.push(inputString.value);
  localStorage.setItem("strings", JSON.stringify(strings));
  displayStrings();
  inputString.value = "";
}

// CRIA A EXIBIÇÃO DA LISTA DE INPUTS COMO FORAM DIGITADOS
function displayStrings() {
  let stringList = document.getElementById("strList");
  stringList.innerHTML = "";
  let strings = JSON.parse(localStorage.getItem("strings")) || [];

  strings.forEach((str, index) => {
    // GERA UM ITEM DE LISTA
    let li = document.createElement("li");
    li.textContent = `${str}`;
    stringList.appendChild(li);

    // DIV PARA COMPORTAR BOTÃO VERIFICAR E EXCLUIR
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("listBtnContainer");
    stringList.appendChild(buttonDiv);

    // GERA O BOTAO VERIFICAR
    let verifyBtn = document.createElement("button");
    verifyBtn.classList.add("btn");
    verifyBtn.onclick = verifyItem(`${index}`);
    verifyBtn.textContent = "✅";
    buttonDiv.appendChild(verifyBtn);

    // GERA O BOTAO REMOVER
    let removeBtn = document.createElement("button");
    removeBtn.classList.add("btn");
    removeBtn.onclick = removeItem(`${index}`);
    removeBtn.textContent = "❌";
    buttonDiv.appendChild(removeBtn);
  });
}

// EXIBE BOTOES PARA VERIFICAR TUDOS INPUTS E PARA REMOVER TUDOS INPUTS
function displayButtons() {
  let btnContainer = document.getElementById("btnContainer");

  let verifyAllItems = document.createElement("button");
  verifyAllItems.classList.add("verifyAllBtn");
  verifyAllItems.textContent = "✅ Verify All";
  btnContainer.appendChild(verifyAllItems);

  let removeAllItems = document.createElement("button");
  removeAllItems.classList.add("removeAllBtn");
  removeAllItems.textContent = "❌ Remove All";
  btnContainer.appendChild(removeAllItems);

  removeAll();
}

// SOLUÇÃO PARA EXIBIR OS BOTÕES VERIFYALLITEMS E REMOVEALLITEMS
// SOMENTE QUANDO HOUVER PELO MENOS UM ITEM NO LOCAL STORAGE
let insertBtn = document.getElementById("insertBtn");
let displayed = false;
insertBtn.addEventListener("click", () => {
  if (!displayed) {
    displayButtons();
    displayed = true;
  }
});

// LIMPA O LOCAL STORAGE
function removeAllItems() {
  localStorage.clear();
  location.reload();
}
function removeAll() {
  document
    .querySelector(".removeAllBtn")
    .addEventListener("click", removeAllItems);
}
function verifyAll() {}

function verifyItem() {}
function removeItem() {}

displayStrings();
