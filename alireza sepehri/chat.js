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
let showMassage = document.getElementById('show_msg');

// عنصر حاوی لیست مخاطبین
let contactContainer = document.querySelector("#list_contact");

// عنصر حاوی نام مخاطب در قسمت هدر بخش مبادله پیام با مخاطب
let contactHeader = document.querySelector('#pg_head_contact span');

// عنصر آیکن کنار هر آیتم مخاطب
let contactHeaderIcon = document.querySelector('#pg_head_contact .user_icon');

// در ابتدا محتوای نام مخاطب در قسمت هدر خالی شود
contactHeader.innerHTML = '';

const render1 = () => {
  if (!window.list) return;

//   در ابتدا لیست مخاطبین خالی می شود
  contactContainer.innerHTML = "";

//   ....
  let count = 0;

//   حلقه دریافت مخاطبین از سرور
  for (const contactItem of window.list) {

    // نام هر مخاطب در هر گردش
    const name = contactItem.name;

    // ساخت "دیو" در برگیرنده هر آیتم مخاطب
    let div = document.createElement("div");

    // نام مخاطب دریافت شده از سرور مخفف شده تا درون تصویر آیکن کنار مخاطب قرار گیرد
    let partName = contactItem.name.trim().split(' ', 2)
    if(partName[1]){
        partName = partName[0].charAt(0).concat(partName[1].charAt(0))
    } else {
        partName = partName[0].charAt(0);
    }

    // اگر مخاطب "اکتیو" باشد کلاس مربوطه داده شده و محتوای آن به 
    // بخش مخاطب قسمت هدر نیز داده می شود
    if(contactItem.ac) {
        div.className = 'item_contact padding_box item_active';
        contactHeader.innerHTML = contactItem.name;
        contactHeaderIcon.textContent = partName
    } else {
        div.className = 'item_contact padding_box';
    }

    // ساخت تصویر آیکن کنار هر آیتم مخاطب بهمراه نام مخفف شده درون آن
    let img = document.createElement("div");
    img.classList.add('user_icon');
    img.textContent = partName;

    // نام دریافت شده هر مخاطب از سرور درون "دیو" ساخته شده قرار میگیرد
    div.textContent = `
    ${name}
    `;

    // تصویر آیکن ساخته شده به ابتدای "دیو" ساخته شده اضافه می شود
    div.prepend(img);
     
    // ....
    div.dataset.numlist = count;
    count++;

    // دیو ساخته شده به قسمت لیست مخاطبین افزوده می شود
    contactContainer.appendChild(div);
    // const {userName, name} = contactItem.userName
    }
};

// اجرا تابع فوق برای بار اول 
render1();

// اگر روی هر مخاطب کلیک شود آن "اکتیو" شده و به قسمت هدر پیام رسان نیز اضافه می شود
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