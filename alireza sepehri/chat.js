// if (!localStorage.token) location.assign("/auth");

const refresh = document.querySelector(".refreshIcon");

window.list = [
    {
        name: 'علی',
        ac: 0
    },
    {
        name: 'بابا',
        ac: 1
    },
    {
        name: 'رضا',
        ac: 0
    },
    {
        name: 'حسن',
        ac: 0
    }
]

/**
 * @type {HTMLDivElement}
 */
// const divLoading = document.querySelector("#loading");
let contactContainer = document.querySelector("#list_contact");

const render = () => {
  if (!window.list) return;

  contactContainer.innerHTML = "";

  for (const contactItem of window.list) {
    const name = contactItem.name;
    let div = document.createElement("div");
    if(contactItem.ac) {
        div.className = 'item_contact padding_box item_active';
    } else {
        div.className = 'item_contact padding_box';
    }
    let img = document.createElement("img");
    img.classList.add('user_icon')
    img.setAttribute('src', 'image/user_icon2.png')
    img.setAttribute('alt', 'user_icon')
    div.textContent = `
    ${name}
    `;
    div.prepend(img);

    contactContainer.appendChild(div);
    // const {userName, name} = contactItem.userName
  }
};

const sync = () => {
  farawin.getContacts((result) => {
    console.table(result.contactList);

    window.list = result.contactList;
    render();

    loading = false;
    // divLoading.style.display = "none";
    contactContainer.style.display = "block";
  });
};

sync()

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
refresh.onclick = () => {
  //load contact
  loading = true;
//   divLoading.style.display = "flex";

  sync();
};