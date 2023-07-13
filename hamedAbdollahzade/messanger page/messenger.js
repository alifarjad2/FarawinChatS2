// اینجا بررسی میکنیم اگه توکن وجود نداشت هدایت میشه به صفحه ثبت نام و ورود در پوشه مربوطه 
if (!localStorage.token) location.assign("../auth/index.html");

function addcontact()
{
    location.assign('../addEditContact/addContact.html')
}


function refreshContact()
{
    // debugger;
// اینجا تایپ مربوط به متغییر زیر ان را تعریف میکنیم تا بتوانیم از خواص مورد نظر استفاده کنیم 
/**
 * @type {HTMLDivElement}
 */
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
    // console.table(result.contactList);

    window.list = result.contactList;
    render();
  });
};

sync();

        

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

}

function selectedContact() {
    //! todooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
}















