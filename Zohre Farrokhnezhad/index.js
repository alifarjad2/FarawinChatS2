//peyvast be login
if (!localStorage.token) location.assign("/auth");
//login konin
//daryaft  mokhatan dar consol
farawin.getContacts((result) => {
  console.table(result.contactList);
});
//namyesh list  mokhtaban dar fehrest
const contactListElement = document.querySelector(".contact-list");

farawin.getContacts((result) => {
  const contacts = result.contactList;
  contacts.forEach((contact) => {
    const listItemElement = document.createElement("li");
    listItemElement.textContent = contact.name;
    contactListElement.appendChild(listItemElement);
  });
});

//safehe chat
const chatContainer = document.querySelector(".chat-container");
const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("button");
//meghdar input be safeh chat eazefe kon
buttonElement.addEventListener("click", () => {
  const messageText = inputElement.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `
          <span class="sender">You:</span>
          <span class="text">${messageText}</span>`;
    chatContainer.appendChild(messageElement);
    inputElement.value = "";
  }
});

//loading
window.onload = function () {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
};
