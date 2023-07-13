// #region WHOLE Codes
// #region Redirecting Page To Auth
//توسط شرط زیر چک میکنیم آیا فردی ک وارد صفحه چت شده توکنی به او اختصاص داده شده مبنی بر ورود موفق داشتن یا خیر که اگر نداشت به صفحه ورود یا ثبت نام در پوشه مربوطه منتقل شود
if (!localStorage.token) location.assign("../auth/index.html");
// #endregion
// #region TypeScript
//در این قسمت با استفاده از تایپ اسکریپت تایپ مربوط به متغیر زیر آن را مشخص میکنیم تا یک سری از خواص مورد نیاز این نوع تایپ مورد نظر را متغیر به خود بگیرد و ما از آن استفاده کنیم
/**
 * @type {HTMLDivElement}
 */
//در اینجا من آی دی لیست مخاطبینم در دام را در یک متغیر ریختم تا در تابع بعدی استفاده کنم
//متغیر به صورت گلوبال تعریف شده است
let contactMenu = document.getElementById("contact-list");
// #endregion
// #region Update Contacts
//An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage
//در اینجا با استفاده از تابع آپدیت کانتکت لیست مخاطبینم را به تعداد اسم ورودی دریافت شده از سرور میسازم که من برای ساخت این این لیست از تگ ال آی استفاده کردم
//در صفحه اچ تی ام ال یو الی ساخته ام که آی دی آن را به تابع دادم تا ال آی های ساخته شده توسط جی اس به عنوان فرزند یو ال مذکور ساخته شوند
const upDateContact = () => {
  if (!window.list) return; // دراینجا چک میشود اگر ویندو لیست مقدار فالس برگرداند عملیات تابع متوقف شود

  contactMenu.innerHTML = "";
  for (const ContactMembers of window.list) {
    const name = ContactMembers.name;
    let members = document.createElement("li"); //درستور کریت المنت برای ساخت یک المنت در دام است که توسط جی اس به اچ تی ام ال اضافه میشود
    members.innerHTML = `${name}`; //دراینجا با تعریف نیم گفته ایم که از اطلاعات ورودی دریافت شده از سرور تنها نیم در دام ایجاد شده ظاهر شود
    contactMenu.appendChild(members); //در اینجا تعریف شده تا لیست های ساخته شده فرزند یو ال ما در اچ تی ام ال باشند
  }
};
// #endregion
// #region Sync Contacts
//در اینجا تابعی ساخته ایم تا اطلاعات مخاطبین را از سرور دریافت و آن را در جدولی درکنسول نمایش داده  از طرفی مقادیر مربوطه را در ویندو لیست نگه داری کند تا استفاده شوند
//تابع با گرفتن مقدار ریزالت در ورودی فعالیت میکند
const sync = () => {
  farawin.getContacts((result) => {
    console.table(result.contactList);

    window.list = result.contactList;

    //   loading = false;
    //   divLoading.style.display = "none";
    //   contactContainer.style.display = "block";
  });
};
// #endregion
// #region refreshing Contact Lists
//در اینجا متغیری تعریف کردیم تا تعداد تکرار اجرای دستورات و گرفتن مخاطبین از سرور را به ما نشان دهد
let _count = 0;
//در تابع زیر با استفاده از کانت تعداد تکرار ها را میشماریم چگونه ؟ با تقسیم بندی زمان تکرار دستورات به 100 و بخش پذیری آن به 100 هر بار چک میشود چند بار دستور گت تکرار و هر بار نیز لیست مخازبین رفرش و همچنین از سرور برای بار دیگر دریافت میشود
const applyFrameRender = () =>
  requestAnimationFrame(() => {
    _count++;

    //1 frame = 1/60 s

    if (_count % 100 === 0) {
      console.count("frame"); //تعداد فریم هایی ک میگذرد را میشماریم
      upDateContact(); //لیست مخاطبین در اینجا در هر فریم تقسیم بندی شده فوق رفرش میشود
    }

    if (_count % 100 === 0) {
      console.count("sync"); //بر اساس تقسیم بندی فریم فوق دستور میدهیم تابع سینک فراخوانی شده و لیست مخاطبین را بگیرد
      sync();
    }

    applyFrameRender(); //در اینجا خود تابع را دوباره فراخوانی میکنیم تا تکرار شود و در یک لوپ قرار بگیرد
  });
// #endregion
// #region show and hide Contacts Menu
//در اینجا تابعی ساختیم تا با استفاده از اون لیست مخاطبین را ظاهر و همچنین از بین ببریم
// بکار بردن دوتابع زیر بر روی آن کلیک بر روی ایکون منو همبرگری طراحی شده در دام به بازو بسته شدن منو منجر میشود
const showMenu = () => {
  document.getElementById("contact-menu").style.display = "flex";
  document.getElementById("close-icon").style.display = "block";
  document.getElementById("add-contact").style.display = "block";
};
document.getElementById("menu-icon").addEventListener("click", showMenu); //گرفتن ای دی منو همبرگری و دادن ایونت کلیک و اجرای ظاهر شدن منو توسط تابع بالا

const closeMenu = () => {
  document.getElementById("contact-menu").style.display = "none";
  document.getElementById("close-icon").style.display = "none";
  document.getElementById("add-contact").style.display = "none";
};
document.getElementById("close-icon").addEventListener("click", closeMenu); //از بین رفتن منو با استفاده از ای دی دکمه کلوز و دادن ایونت کلیک تا با فراخوانی تابع بالا منو بسته شود

//با استفاده از آی دی یا داکیومنت گت المنت و دادن پراپرتی اد ایونت لیسنر به دکمه ایونت کلیک داده ام تا با کلیک تابع اپلی مذکور فعال شود
buttonLoading.addEventListener("click", applyFrameRender); //در اینجا دکمه ای طراحی شده در دام را با آی دی فراخواندم تا با دادن ایونت کلیک به آن و فعال کردن تابعی که دستورات گرفتن مخاطب و اضافه کردن آن به لیست را تکرار میکند از انجام خودکار تابع مذکور جلو گیری کنم و اجرای ان و گرفتن مخاطب و اضافه شدن آن به لیست را به کلیک دکمه محدود کنم
// #endregion
// #region Moving Names To Header
//در اینجا من تابعی طراحی کردم تا با ورودی ال آی فعال شود و اول مقادیر وارد شده در ال آی را طبق کلیک گرفته به اچ وانی در دام منتقل کند و دوم مقدار گرفته شده را به متغیری داده و آن را اسپلیت و  کاراکتر اول و دوم را استخراج میکند و در متغیری میریزد تا به قسمت آواتار هدر چت منتقل کند
function moveToH1(li) {
  var selectedName = li.innerText; // گرفتن متن ال آی کلیک شده
  document.getElementById("contact-name-h1").innerText = selectedName; // دادن مقدار به تگ اچ وان خواسته شده که در هدر چت نمایش دهد
  var avatar = selectedName.split(""); // جدا سازی کاراکتر های مقدار ال آی جز به جز
  var combinedString = avatar[0] + " " + avatar[1]; //گرفتن کاراکتر اول و دوم
  document.getElementById("avatar").innerText = combinedString; //دادن مقدار به قسمت آواتار هدر چت
}
//در اینجا به تگ یو ال خود ان کلیکی داده ام که کلیک بر روی تمام اجزای آن که ال آی ها هستند اعمال شود وبا دادن ایونت به مقدار ورودی تابع به آن کفته ام که با کلیک تابع را فعال کن
document.getElementById("contact-list").onclick = function (event) {
  //ایونت دات تارگت یعنی ایونتی که در این فانکشن پاس داده ام ک کلیک است و تگ نیم منظور اگر تگ نیمی با نام ال آی کلیک شد این اتفاقات بیفتد
  if (event.target.tagName === "LI") {
    //  در اینجا مشخص کردم که اگر ایونت مورد نظر یعنی کلیک در جایی بود که نام المنت آن ال آی بود تابع بالا یعنی انتقال مقادیر ال آی به اچ وان اتفاق بیفتد آن هم در صورتی که ایونت مورد نظر اتفاق بیفتد یعنی کلیک و  همچنین جتما ان ال آیی انتخاب شود که من بر روی آن کلیک کرده ام و با بقیه قاطی نشود
    moveToH1(event.target); //فراخوانی تابع بالا با مقدار ورودی ایونت کلیک ک در صورت کلیک فعال شود
  }
};
// #endregion
// #region Edit Button
//  با استفاده از تابع زیر و اد ایونت گفته ام که اگر بر روی دکمه ادد کانتکت کلیک شد به صفحه ویرایش یا اضافه کردن مخاطبین وارد شود 
const editButton = () =>{
  window.location.href = "../EditAdd/index.html";
}
document.getElementById("add-contact").addEventListener("click" , editButton);
// #endregion
// #endregion