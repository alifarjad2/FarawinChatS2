// بررسی میکنیم که آیا توکن در حافظه محلی وجود دارد یا نه اگر توکن وجود نداشته باشد کاربر به صفحه ورود یا ثبت نام هدایت میشود
if (!localStorage.token) location.assign("/auth");

function syncbtn() {
  let contactContainer = document.querySelector("#contact-Container");
  
    const render = () => {
      if (!window.list) return;
    
      contactContainer.innerHTML = "";
    
      for (const contactItem of window.list) {
        const name = contactItem.name;
        let div = document.createElement("div");
        div.innerHTML = ` ${name}`;
    
        contactContainer.appendChild(div);
        // const {userName, name} = contactItem.userName
      } 
    };
   
    const sync = () => {
      farawin.getContacts((result) => {
        console.table(result.contactList);
    
        window.list = result.contactList;
        render();
      });
  
    };
    sync();
  }

// let _count = 0;
// const applyFrameRender = () =>
//   requestAnimationFrame(() => {
//     _count++;

//     //1 frame = 1/60 s

//     if (_count % 10 === 0) {
//       console.count("frame");
//       render();
//     }

//     if (_count % 100 === 0) {
//       console.count("sync");
//       sync();
//     }

//     applyFrameRender();
//   });

// applyFrameRender();

function addcontact() {
  window.open('http://127.0.0.1:5501/add&editContact/addContact.html')
  
}

function editContact() {
  window.open('http://127.0.0.1:5501/add&editContact/editContact.html')
}

function refreshChat() {
  alert("چت ها به روزرسانی شدند")}

