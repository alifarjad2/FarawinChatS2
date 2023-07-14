const users = [
  { name: "علیرضا", phone: "1" },
  { name: "رضا", phone: "2" },
  { name: "ارش", phone: "3" },
  { name: "مامان", phone: "4" },
  { name: "شرکت", phone: "5" },
  { name: "الناز", phone: "6" },
  { name: "ممد", phone: "7" },
  { name: "سینا", phone: "8" },
  { name: "ماری", phone: "9" },
];

const contactsList = document.getElementById("contactsList");
const chatTabsHeader = document.querySelector(".chat_tabs_header");

if (!users || users.length === 0) {
  contactsList.innerHTML = "مخاطبی وجود ندارد";
  removeElement();
  function removeElement() {
    const chatTabs = document.querySelector(".chat_tabs");
    const container = document.querySelector(".container");
    container.removeChild(chatTabs);
  }
} else {
  users.forEach(function (users) {
    const userDiv = document.createElement("div");
    userDiv.classList = "item_contact";
    userDiv.textContent = users.name;
    contactsList.appendChild(userDiv);
  });
  chatTabsHeader.textContent = users[0].name;
}
const itemContact = document.querySelectorAll(".item_contact");

itemContact.forEach(function (element) {
  element.addEventListener("click", function () {
    chatTabsHeader.textContent = element.textContent;
  });
});
