if (!localStorage.token) location.assign("/auth");

const button = document.querySelector("button");

/**
 * @type {HTMLDivElement}
 */
const divLoading = document.querySelector("#loading");
let contactContainer = document.querySelector("#contact-container");

const render = () => {
  if (!window.list) return;

  contactContainer.innerHTML = "";

  for (const contactItem of window.list) {
    const name = contactItem.name;
    let div = document.createElement("div");
    div.innerHTML = `
     ${name}
    `;

    contactContainer.appendChild(div);
    // const {userName, name} = contactItem.userName
  }
};

const sync = () => {
  farawin.getContacts((result) => {
    console.table(result.contactList);

    window.list = result.contactList;
    // render();

    loading = false;
    divLoading.style.display = "none";
    contactContainer.style.display = "block";
  });
};

let _count = 0;
const applyFrameRender = () =>
  requestAnimationFrame(() => {
    _count++;

    //1 frame = 1/60 s

    if (_count % 10 === 0) {
      console.count("frame");
      render();
    }

    if (_count % 100 === 0) {
      console.count("sync");
      sync();
    }

    applyFrameRender();
  });

applyFrameRender();

let loading = false;
button.onclick = () => {
  //load contact
  loading = true;
  divLoading.style.display = "flex";

  sync();
};
