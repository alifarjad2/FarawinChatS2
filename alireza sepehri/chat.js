// if (!localStorage.token) location.assign("/auth");

const refresh = document.querySelector(".refreshIcon");

window.list = [
    {
        user: '09111111111',
        name: 'علی موسوی',
        ac: 0
    },
    {
        user: '09222222222',
        name: 'بابا',
        ac: 1
    },
    {
        user: '09333333333',
        name: 'رضا حسنی',
        ac: 0
    },
    {
        user: '09444444444',
        name: 'حسن',
        ac: 0
    }
]

/**
 * @type {HTMLDivElement}
 */
// const divLoading = document.querySelector("#loading");
let showMassage = document.getElementById('show_msg')

let contactContainer = document.querySelector("#list_contact");
let contactHeader = document.querySelector('#pg_head_contact span');
let contactHeaderIcon = document.querySelector('#pg_head_contact .user_icon')
contactHeader.innerHTML = '';

const render1 = () => {
  if (!window.list) return;

  contactContainer.innerHTML = "";

  let count = 0;
  for (const contactItem of window.list) {
    const name = contactItem.name;
    let div = document.createElement("div");
    
    let partName = contactItem.name.trim().split(' ', 2)
    if(partName[1]){
        partName = partName[0].charAt(0).concat(partName[1].charAt(0))
    } else {
        partName = partName[0].charAt(0);
    }

    if(contactItem.ac) {
        div.className = 'item_contact padding_box item_active';
        contactHeader.innerHTML = contactItem.name;
        contactHeaderIcon.textContent = partName
    } else {
        div.className = 'item_contact padding_box';
    }

    let img = document.createElement("div");
    img.classList.add('user_icon');
    img.textContent = partName;

    div.textContent = `
    ${name}
    `;
    div.prepend(img);
        
    div.dataset.numlist = count;
    count++;
    contactContainer.appendChild(div);
    // const {userName, name} = contactItem.userName
    }
};

render1();
contactContainer.onclick = function(event) {
    document.querySelector('.item_active').classList.remove('item_active');
    event.target.classList.add('item_active');
    contactHeader.innerHTML = event.target.textContent;
}

const render = () => {
    // console.log('render->showMassage')
}

const sync = () => {
  farawin.getContacts((result) => {
    // console.table(result.contactList);

    window.list = result.contactList;
    render();

    loading = false;
    // divLoading.style.display = "none";
    contactContainer.style.display = "block";
  });
};

let _count = 0;
const applyFrameRender = () =>
  requestAnimationFrame(() => {
    _count++;

    //1 frame = 1/60 s

    if (_count % 10 === 0) {
    //   console.count("frame");
      render();
    }

    if (_count % 100 === 0) {
    //   console.count("sync");
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