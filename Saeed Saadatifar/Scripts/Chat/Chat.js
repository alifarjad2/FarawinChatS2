if (!localStorage.token) window.location.assign("../../Layout/Auth");

// #region SideBarIcone Toggle White or Black
// #region Define Variable
const sideBarSVG = document.getElementById("Layer_1");
// #endregion
// #region Listeners
let whiteSideBarHandler = () => {
  sideBarSVG.style.fill = "gray";
};
sideBarSVG.addEventListener("mouseover", whiteSideBarHandler);

let blackSideBarHandler = () => {
  sideBarSVG.style.fill = "black";
};
sideBarSVG.addEventListener("mouseout", blackSideBarHandler);
// #endregion
// #endregion

// #region RefreshIcon Toggle White or Black
// #region Define Variable
const refreshSidebarIcon = document.querySelector(".refresh-icon");
const lineSVGSidebar = document.querySelector(".refresh-line");
const arrowSVGSidebar = document.querySelector(".refresh-arrow");
// #endregion
// #region Listeners
let whiteRefreshSidebarHandler = () => {
  lineSVGSidebar.style.stroke = "gray";
  arrowSVGSidebar.style.stroke = "gray";
};
refreshSidebarIcon.addEventListener("mouseover", whiteRefreshSidebarHandler);

let blackRefreshSidebarHandler = () => {
  lineSVGSidebar.style.stroke = "black";
  arrowSVGSidebar.style.stroke = "black";
};
refreshSidebarIcon.addEventListener("mouseout", blackRefreshSidebarHandler);
// #endregion
// #endregion

// #region AddContact Toggle White or Black
// #region Define Variable
const addContectIcon = document.getElementById("addContact-icon");
const addContactForm = document.querySelector(".addContact-container");
// #endregion
// #region Listeners
let whiteAddContactHandler = () => {
  addContectIcon.style.fill = "gray";
};
addContectIcon.addEventListener("mouseover", whiteAddContactHandler);

let blackAddContactHandler = () => {
  addContectIcon.style.fill = "black";
};
addContectIcon.addEventListener("mouseout", blackAddContactHandler);
let addSVGIconHandler = () => {
  addContactForm.style.display = "flex";
};
addContectIcon.addEventListener("click", addSVGIconHandler);
// #endregion
// #endregion

// #region SideBar Toggle Hide or Show
// #region Define Variable
const contacts = document.querySelector(".contacts-container");
// #endregion
// #region Listeners
let sideBarSVGClick = () => {
  contacts.classList.toggle("blocked");
  sideBarSVG.classList.toggle("rotate90");
  sideBarSVG.classList.toggle("rotate0");
  chatPartsLayout.classList.toggle("chatMarginPlus");
  chatPartsLayout.classList.toggle("chatMarginNegative");
};
sideBarSVG.addEventListener("click", sideBarSVGClick);
// #endregion
// #endregion

// #region RefreshIcon Click0
// #region Define Variable
const contactsList = document.querySelector(".contacts-list");
const loadingBlock = document.querySelector(".lds-dual-ring");
// #endregion
// #region Listeners
let clickRefreshHandler = () => {
  // Loading show
  contactsList.style.display = "none";
  loadingBlock.style.display = "inline-block";
  farawin.getContacts((result) => {
    window.list = result.contactList;
    // div Reset always
    contactsList.innerHTML = "";
    // for each contact ref is localstorage.username
    for (const user of window.list) {
      //   if(user.ref == localStorage.userName){
      // create a divElement include 2 div
      // first div for imageProfile & second for nameProfile
      let divProfile = document.createElement("div");
      let divImageProfile = document.createElement("div");
      let divNameProfile = document.createElement("div");
      let divMobileProfile = document.createElement("div");
      divMobileProfile.textContent = user.username;
      divMobileProfile.style.display = "none";
      divProfile.classList.add("profile");
      divImageProfile.classList.add("image-profile");
      divNameProfile.classList.add("name-profile");
      divNameProfile.textContent = user.name;
      // in attribute ro ezaf kardm barya control click
      // ke to ghesmat clickContact azash estefade kardm
      divNameProfile.setAttribute("profile", "1");
      divImageProfile.setAttribute("profile", "1");
      createImageProfile(user.name, divImageProfile);
      divProfile.appendChild(divMobileProfile);
      divProfile.appendChild(divImageProfile);
      divProfile.appendChild(divNameProfile);
      divProfile.setAttribute("profile", "2");
      contactsList.appendChild(divProfile);
      // Loading Hidden
      contactsList.style.display = "block";
      loadingBlock.style.display = "none";
      //   }
    }
  });
};
refreshSidebarIcon.addEventListener("click", clickRefreshHandler);
// #endregion
// #endregion

// #region Contact Click For Chat
// #region Define Variable
// in var baraye select kardn box chat hasst
const chatPartsLayout = document.querySelector(".flex-container");
const chatBox = document.querySelector(".flex-container");
const sideBarIcon = document.querySelector(".sidebar-icon");
const sidebarBox = document.querySelector(".contacts-container");
// #endregion
// #region Listeners
let clickContactHandler = (event) => {
  // agar jaye dig dar div koly click shod safahe chat pak mishe
  if (!event.target.hasAttribute("profile")) {
    let lastClicked = document.querySelector(".backgroundClicked");
    if (lastClicked) {
      lastClicked.classList.remove("backgroundClicked");
    }
    chatBox.classList.add("displayNone");
    return;
  }
  let parrent;
  // in shart ro bara in gozashtm ke
  // check beshe click ro name ya image khorde
  if (event.target.getAttribute("profile") == "1") {
    parrent = event.target.parentElement;
  }
  // agar ro kol div contact yani parrent name va image click shod
  // in shart ejra mishe
  else if (event.target.getAttribute("profile") == "2") {
    parrent = event.target;
  }
  let imageProfileHeader = document.querySelector(".image-profile-Header");
  let nameProfileHeader = document.querySelector(".name-profile-Header");
  let mobileProfileHeader = document.querySelector(".MobileHeader");
  mobileProfileHeader.textContent = parrent.firstChild.textContent;
  imageProfileHeader.textContent =
    parrent.firstChild.nextElementSibling.textContent;
  nameProfileHeader.textContent = parrent.lastChild.textContent;
  let lastClicked = document.querySelector(".backgroundClicked");
  if (lastClicked) {
    lastClicked.classList.remove("backgroundClicked");
  }
  parrent.classList.add("backgroundClicked");
  chatBox.classList.remove("displayNone");
  let inputMessage = document.querySelector(".type-container input");
  inputMessage.value = "";
};

let sideBarBoxHandler = (event) => {
  if (!event.target.hasAttribute("profile")) {
    let lastClicked = document.querySelector(".backgroundClicked");
    if (lastClicked) {
      lastClicked.classList.remove("backgroundClicked");
    }
    chatBox.classList.add("displayNone");
  }
  let inputMessage = document.querySelector(".type-container input");
  inputMessage.value = "";
};
contactsList.addEventListener("click", clickContactHandler);
sidebarBox.addEventListener("click", sideBarBoxHandler);
// #endregion
// #endregion

// #region Create ImageProfile Function
// this function get a element as parametrs
let createImageProfile = (nameProfile, imageProfile) => {
  let imageWordProfile = "";
  let nameSplitBySpace = nameProfile.split(" ");
  let countSpace = Math.floor(nameSplitBySpace.length / 2);
  let i = 0;
  do {
    if (countSpace == 0 || i >= countSpace) {
      imageWordProfile += nameSplitBySpace[i][0];
      i++;
      continue;
    }
    imageWordProfile += nameSplitBySpace[i][0] + " ";
    i++;
  } while (i < countSpace + 1);
  imageProfile.textContent = imageWordProfile;
};
// #endregion

// #region RefreshHeaderIcon Toggle White or Black
// #region Define Variable
const refreshHeaderIcon = document.querySelector(
  ".profile-Header .refresh-icon"
);
const lineSVGHeader = document.querySelector(".profile-Header .refresh-line");
const arrowSVGHeader = document.querySelector(".profile-Header .refresh-arrow");
// #endregion
// #region Listeners
let whiteRefreshHeaderHandler = () => {
  lineSVGHeader.style.stroke = "gray";
  arrowSVGHeader.style.stroke = "gray";
};
refreshHeaderIcon.addEventListener("mouseover", whiteRefreshHeaderHandler);

let blackRefreshHeaderHandler = () => {
  lineSVGHeader.style.stroke = "black";
  arrowSVGHeader.style.stroke = "black";
};
refreshHeaderIcon.addEventListener("mouseout", blackRefreshHeaderHandler);
// #endregion
// #endregion

// #region EditHeaderIcon Toggle White or Black
// #region Define Variable
const editSVGIcon = document.querySelector(".bi-pencil-square");
//#endregion
// #region Listeners
let whiteEditSVGIcon = () => {
  editSVGIcon.style.fill = "gray";
};
editSVGIcon.addEventListener("mouseover", whiteEditSVGIcon);
let blackEditSVGIcon = () => {
  editSVGIcon.style.fill = "black";
};
editSVGIcon.addEventListener("mouseout", blackEditSVGIcon);
// #endregion
// #endregion

// #region SendIcon Toggle Gray or Black
// #region Define Variable
const sendSVGIcon = document.querySelector(".send-icon path");
// #endregion
// #region Listeners
let whiteSendSVGIcon = () => {
  sendSVGIcon.style.fill = "white";
  sendSVGIcon.style.stroke = "gray";
};
sendSVGIcon.addEventListener("mouseover", whiteSendSVGIcon);
let blackSendSVGIcon = () => {
  sendSVGIcon.style.fill = "black";
  sendSVGIcon.style.stroke = "black";
};
sendSVGIcon.addEventListener("mouseout", blackSendSVGIcon);
// #endregion
// #endregion

// #region SendMessage Click
// #region Listeners
let sendMessageClick = () => {
  let messageBox = document.createElement("div");
  let message = document.createElement("div");
  let sender = document.createElement("div");
  let imageSender = document.querySelector(".image-profile-Header");
  let inputMessage = document.querySelector(".type-container input");
  let chatPage = document.querySelector(".chat-page");
  messageBox.classList.add("messageBox");
  message.classList.add("message");
  sender.classList.add("sender");
  message.textContent = inputMessage.value;
  sender = imageSender.cloneNode(true);
  sender.classList.add("sender");
  messageBox.appendChild(sender);
  messageBox.appendChild(message);
  chatPage.appendChild(messageBox);
  inputMessage.value = "";
};
sendSVGIcon.addEventListener("click", sendMessageClick);
// #endregion
// #endregion

// #region AddContact form Listeners
// #region varibales
// to in gheshmat motaghayer hamo tarif kardm va meghdar dadm
// az type let tarif kardm ke dar windows zakhire nashe
/**
 * @type HTMLInputElement
 */
let inputTextMobileAddContact = document.querySelector(
  ".addContact-container #textMobile"
);
/**
 * @type HTMLInputElement
 */
let inputTextFullnameAddContact = document.querySelector(
  ".addContact-container #textFullname"
);
/**
 * @type HTMLSpanElement
 */
let errorMobile = document.querySelector(".addContact-container #errorMobile");
/**
 * @type HTMLSpanElement
 */
let errorFullnameAddContact = document.getElementById("errorFullname");
let btnAddContact = document.querySelector(".addContact-container button");
// in 2ta motagheyr ham baraye check kardn meghdar input ha gozashtam
let isFullnameValidAddContact = false;
let isMobileValid = false;
//baraye shabih sazi boodn contact dar database in ro sakhtm baraye tabe onclicn button
let isContactInDatabase = false;
// #endregion
// #region listener InputMobile
inputTextMobileAddContact.addEventListener("input", mobileAddContactHandler);
function mobileAddContactHandler() {
  // regex dorost kardm baraya check kardan adad 0 ta 9
  let regexMob = /^[0-9]+$/;
  if (
    inputTextMobileAddContact.value.length != 11 ||
    inputTextMobileAddContact.value[0] != "0" ||
    inputTextMobileAddContact.value[1] != "9" ||
    !regexMob.test(inputTextMobileAddContact.value)
  ) {
    errorMobile.style.visibility = "visible";
    isMobileValid = false;
  } else {
    errorMobile.style.visibility = "hidden";
    isMobileValid = true;
  }
  // harbar k input haro vared miknim check mikne agar 2ta input okay boodn gozine afzodan mokhatab ro faal mikne
  if (isFullnameValidAddContact && isMobileValid) {
    btnAddContact.disabled = false;
  } else {
    btnAddContact.disabled = true;
  }
}
// #endregion

// #region listener InputFullname
inputTextFullnameAddContact.addEventListener(
  "input",
  fullnameAddContactHandler
);
function fullnameAddContactHandler() {
  // meghdar name harchi be joz khali bashe mored ghabol hast
  if (inputTextFullnameAddContact.value != "") {
    errorFullnameAddContact.style.visibility = "hidden";
    isFullnameValidAddContact = true;
  } else {
    errorFullnameAddContact.style.visibility = "visible";
    isFullnameValidAddContact = false;
  }
  // harbar k input haro vared miknim check mikne agar 2ta input okay boodn gozine afzodan mokhatab ro faal mikne
  if (isFullnameValidAddContact) {
    btnAddContact.disabled = false;
  } else {
    btnAddContact.disabled = true;
  }
}
// #endregion

// #region listener ButtonClick
btnAddContact.addEventListener("click", btnAddContactHandler);
function btnAddContactHandler() {
  if (isContactInDatabase) {
    //mokhatab be safhe chat afzode mishe va shoro be chat mikne
  } else {
    alert("مخاطبی با این شماره وجود ندارد");
  }
}
// #endregion
//#endregion

// #region X-Squared AddContact
// #region Listeners
//#region Define Variable
const xsquaredAddContact = document.querySelector(
  ".addContact-form .x-squared"
);
// #endregion

let xsquaredAddContactHandler = () => {
  inputTextMobileAddContact.value = "";
  inputTextFullnameAddContact.value = "";
  errorFullnameAddContact.style.visibility = "hidden";
  errorMobile.style.visibility = "hidden";
  addContactForm.style.display = "none";
  btnAddContact.disabled = true;
};
xsquaredAddContact.addEventListener("click", xsquaredAddContactHandler);
// #endregion
// #endregion

// #region EditContact form Listeners
// #region varibales
// to in gheshmat motaghayer hamo tarif kardm va meghdar dadm
// az type let tarif kardm ke dar windows zakhire nashe
/**
 * @type HTMLInputElement
 */
let inputTextMobileEditContact = document.querySelector(
  ".editContact-container #textMobile"
);
/**
 * @type HTMLInputElement
 */
let inputTextFullnameEditContact = document.querySelector(
  ".editContact-container #textFullname"
);
/**
 * @type HTMLSpanElement
 */
let errorFullnameEditContact = document.querySelector(
  ".editContact-container #errorFullname"
);
let btnEditContact = document.querySelector(".editContact-container button");
// in motagheyr ham baraye check kardn meghdar input gozashtam
let isFullnameValidEditContact = false;
// #endregion

// #region listener InputFullname
inputTextFullnameEditContact.addEventListener(
  "input",
  fullnameEditContactHandler
);
function fullnameEditContactHandler() {
  // meghdar name harchi be joz khali bashe mored ghabol hast
  if (inputTextFullnameEditContact.value != "") {
    errorFullnameEditContact.style.visibility = "hidden";
    isFullnameValidEditContact = true;
  } else {
    errorFullnameEditContact.style.visibility = "visible";
    isFullnameValidEditContact = false;
  }
  // harbar k input haro vared miknim check mikne agar 2ta input okay boodn gozine afzodan mokhatab ro faal mikne
  if (isFullnameValidEditContact) {
    btnEditContact.disabled = false;
  } else {
    btnEditContact.disabled = true;
  }
}
// #endregion

// #region listener ButtonClick
btnEditContact.addEventListener("click", btnEditContactHandler);
function btnEditContactHandler() {
  if (isContactInDatabase) {
    //mokhatab be safhe chat afzode mishe va shoro be chat mikne
  } else {
    alert("مخاطبی با این شماره وجود ندارد");
  }
}
// #endregion
//#endregion

// #region EditContact Click
// #region Define Variable
const currentProfile = document.querySelector('.profile-Header');
const editContactForm = document.querySelector('.editContact-container');
// #endregion
let editProfile = () => {
  editContactForm.style.display = 'flex';
  inputTextMobileEditContact.value = currentProfile.firstElementChild.textContent;
  inputTextFullnameEditContact.value = currentProfile.lastElementChild.previousElementSibling.previousElementSibling.textContent;
  errorFullnameEditContact.style.visibility = 'hidden';
  btnEditContact.disabled = false;
}
editSVGIcon.addEventListener("click",editProfile);
// #endregion

// #region X-Squared EditContact
//#region Define Variable
const xsquaredEditContact = document.querySelector(
  ".editContact-form .x-squared"
);
// #endregion

let xsquaredEditContactHandler = () => {
  editContactForm.style.display = "none";
};
xsquaredEditContact.addEventListener("click", xsquaredEditContactHandler);
// #endregion
