if (!localStorage.token) window.location.assign("../../Layout/Auth");

// #region Define variable
const refreshIcon = document.querySelector(".refresh-icon");
const pas = document.querySelector(".refresh-line");
const pol = document.querySelector(".refresh-arrow");
const sideBar = document.querySelector(".sidebar-icon");
const contacts = document.querySelector(".contacts-container");
const addContectIcon = document.getElementById("addContact-icon");
const sideBarSVG = document.getElementById("Layer_1");
const contactsList = document.querySelector(".contacts-list");
// #endregion

// #region SideBarIcone Toggle White or Black
let whiteSideBarHandler = () => {
  sideBarSVG.style.fill = "white";
};
sideBarSVG.addEventListener("mouseover", whiteSideBarHandler);

let blackSideBarHandler = () => {
  sideBarSVG.style.fill = "black";
};
sideBarSVG.addEventListener("mouseout", blackSideBarHandler);
// #endregion

// #region RefreshIcon Toggle White or Black
let whiteRefreshHandler = () => {
  pas.style.stroke = "white";
  pol.style.stroke = "white";
};
refreshIcon.addEventListener("mouseover", whiteRefreshHandler);

let blackRefreshHandler = () => {
  pas.style.stroke = "black";
  pol.style.stroke = "black";
};
refreshIcon.addEventListener("mouseout", blackRefreshHandler);
// #endregion

// #region AddContact Toggle White or Black
let whiteAddContactHandler = () => {
  addContectIcon.style.fill = "white";
};
addContectIcon.addEventListener("mouseover", whiteAddContactHandler);

let blackAddContactHandler = () => {
  addContectIcon.style.fill = "black";
};
addContectIcon.addEventListener("mouseout", blackAddContactHandler);
// #endregion

// #region SideBar Toggle Hide or Show
let sideBarClick = () => {
  contacts.classList.toggle("blocked");
  sideBarSVG.classList.toggle("rotate");
};
sideBar.addEventListener("click", sideBarClick);
// #endregion

// #region RefreshIcon Click
let clickRefreshHandler = () => {
  farawin.getContacts((result) => {
    window.list = result.contactList;
    // for each contact ref is localstorage.username
    for (const user of window.list) {
    //   if(user.ref == localStorage.userName){
      // create a divElement include 2 div
      // first div for imageProfile & second for nameProfile
      let divProfile = document.createElement("div");
      let divImageProfile = document.createElement("div");
      let divNameProfile = document.createElement("div");
      divProfile.classList.add("profile");
      divImageProfile.classList.add("image-profile");
      divNameProfile.classList.add("name-profile");
      divNameProfile.textContent = user.name;
      // #region for First Char in each word in name
      let imageWordProfile = "";
      let nameSplitBySpace = user.name.split(" ");
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
      //   #endregion
      divImageProfile.textContent = imageWordProfile;
      divProfile.appendChild(divImageProfile);
      divProfile.appendChild(divNameProfile);
      contactsList.appendChild(divProfile);
    //   }
    }
  });
};
refreshIcon.addEventListener("click", clickRefreshHandler);
// #endregion
