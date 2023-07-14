// #region HoleFile

// #region FunctionComment

//A function in JavaScript is similar to a procedure—a set of statements that performs a task or calculates a value, but for a procedure to qualify as a function, it should take some input and return an output where there is some obvious relationship between the input and the output.

//The 'e' is a browser window event object that you can add event listeners to harness and corresponding code to handle/respond to (such as clicking on an element).
// #endregion

// #region ContactPhoneFunction
//برای راحتی کار بجای استفاده از داکیومنت گت المنت از نام خوده آی دی المنت های دام استفاده میکنم

//دراینجا یا آوردن ای دی اینپوت تلفن با دات آنبلور به آن ایونت آن بلور داده ام حال با گذاشتن ای در ورودی فانکشن به مرور گر گفته ام که این فانکشن هنگامی که ورودی آنبلور دریافت کرد توسط اینپوت فعال شود و شماره تلفن را چک کند
var validate = false;

contactNumber.onblur = function (e) {
  //برای راحتی کار مقدار ورودی در فیلد شماره تلفن را به یک متغیر داده ام

  //بجای استفاده از داکیومنت گت از نام آیدی اینپوت همراه دات ولیو استفاده کردم برای راحتی و کوتاه نویسی
  var phone = contactNumber.value;
  //در اینجا چک میشود که آیا فیلد مورد نظر بعد از آنبلور کردن خالیست یا خیر
  if (phone == "") {
    document.getElementById("numberAlert").innerHTML =
      "فیلد خالیست لطفا آن را پر کنید";
    document.getElementById("numberAlert").style.color = "orange";
  }
  // در ایف اول عدد بودن کاراکتر ها را چک میکنم که توسط  تابعی از پیش تعیین شده بنام نامبر ک با گرفتن ورودی استرینگ آن را به عدد تبدیل میکند که اگر عدد نباش نان تحویل میدهد به معنی عدد نیست
  else if (Number(phone)) {
    //در ایف دوم چک میکنم که کاراکتر اول و دوم استرینگ ورودی با کارکتر های 0 و 9 آغاز شده باشد که پیش شماره تلفن های ایرانی است
    if (phone[0] == 0 || phone[1] == 9) {
      //در ایف سوم چک میکنیم تا سایز استرینگ ورودی برابر با 11 رقم باشد
      //دات لنث تعداد کاراکتر های موجود در رشته را میشمارد و با یک عدد نمایش میدهد
      if (phone.length == "11") {
        //در اینجا یک  حلقه فور با شروزی چک میکند آیا تمام ارقام وارد شده عددی بین 0 تا 9 هستند یا خیر که اگر جواب خیر بود از حلقه بیرون بیاید و دیگر چک نکند
        for (let i = 0; i < 11; i++) {
          if (phone[i] >= 0 || phone[i] <= 9) {
            document.getElementById("numberAlert").innerHTML =
              "تایپ شماره ورودی درست است";
            document.getElementById("numberAlert").style.color = "yellowgreen";
          } else {
            document.getElementById("numberAlert").innerHTML =
              "ارقام مورد استفاده باید بین 0 تا 9 باشند";
            document.getElementById("numberAlert").style.color = "red";
            break;
          }
        }
      } else {
        document.getElementById("numberAlert").innerHTML =
          "باید شامل 11 رقم باشد";
        document.getElementById("numberAlert").style.color = "yellow";
      }
    } else {
      document.getElementById("numberAlert").innerHTML = "باید با 09 آغاز شود ";
      document.getElementById("numberAlert").style.color = "red";
    }
  } else {
    document.getElementById("numberAlert").innerHTML =
      "باید عدد وارد شود . عدد های وارد شده باید بین 0 تا 9 باشد ";
    document.getElementById("numberAlert").style.color = "red";
  }
};
// #endregion

// #region ContactNameFunction
//در اینجا تابعی نوشتم تا با گرفتن مقدار ورودی فیلد اسم آن را چک کند
//برای راحتی کار بجای استفاده از داکیومنت گت از نام آیدی  فیلد استفاده کردم و با دات و نوشتن اسم ایونت به آن ایونتی اضافه کردم و با دادن ای به ورودی فانکشن خواستم به مرورگر بفهمانم که هنگامی که ایونت مورد نظرم فعال شد فانکشن شروع به کار کند
contactName.onblur = function (e) {
  //در اینجا مقدار ورودی را از فیلد نام به یک متغیر نسبت داده ام
  var personName = contactName.value;
  //در ایف اول شرط خالی بودن فیلد را چک کرده ام
  if (personName == "") {
    document.getElementById("nameAlert").innerHTML =
      "فیلد خالیست لطفا آن را پر کنید";
    document.getElementById("nameAlert").style.color = "orange";
  } else {
    document.getElementById("nameAlert").innerHTML = "تایپ نام ورودی درست است";
    document.getElementById("nameAlert").style.color = "yellowgreen";
  }
};
// #endregion

// #region Button
//دراینجا فانکشنی درست کرده ام مبنی بر اینکه اگر شروط در فانکشن های بالا درست بود و فیلد ها درست پر شده اند هنگام کلیک بر روی دکمه افزودن پیغامی برای آن ها نشان داده شود
//ولی اگر نام ورودی با یکی از نام های داخل آرایه یکی بود پیغام قبلا ثبت شده نشان دهد

contactButton.onclick = function (e) {
  //اینجا آرایه ای تعریف کردم تا بشود اسم های تکراری در ورودی توسط کاربر که قبلا ذخیره شده اند را شناسایی  و پیغامی مبنی بر تکراری بودن اسم نشان دهم
  let personNames = ["محمدرضا", "حسین", "علی", "جواد"];
  //این دو متغیر را از فانکشن های بالا آوردم تا در این فانکشن نیز از آنها استفاده کنم
  var phone = contactNumber.value;
  var personName = contactName.value;
  //در اینجا شماره بودن ورودی راستی آزمایی میشود
  if (Number(phone)) {
    //دراینجا با 0 و 9 شروع شدن شماره راستی آزمایی میشود
    if (phone[0] == "0" || phone[1] == "9") {
      //دراینجا 11 رقمی بودن شماره چک میشود
      if (phone.length == "11") {
        if (numberAlert.innerHTML == "تایپ شماره ورودی درست است") {
          //در این قسمت خالی نبودن فیلد نام کنترل میشود
          if (!personName == "") {
            //در اینجا توسط پراپرتی اینکلود چک میکنم که آیا اسم وارد شده جز نام های ثبت شده در آرایه از پیش تعریف شده است یا خیر
            //The includes() method returns true if a string contains a specified string. Otherwise it returns false . The includes() method is case sensitive.
            if (personNames.includes(personName)) {
              alert("قبلا ثبت شده است");
              return true;
            } else {
              alert("باموفقیت ثبت شد :)");
            }
          }
        }
      }
    }
  } else {
    //در صورت اشتباه بودن شروط بالا من از کد زیر استفاده کردم که ای نشانگر ایونت و پریونت نشانگر توقف عملیات است به این معنی که از اتفاق افتادن رویداد مورد نظر که در اینجا رویداد کلیک و عمل دکمه است جلوگیری میشود و با فشردن دکمه اتفاقی نمی افتد
    e.preventDefault;
  }
};
// #endregion

// #region CloseButton
//در اینجا با استفاده از ای دی دکمه بستن صفحه به آن ایونت کلیک را اضافه کردم و با دادن این ایونت در ورودی تابع به مرور گر گفته ام تا هنگام فعالیت این رویداد تابع فعال شود و با استفاده از ویندو که شامل کل صفحه میشود و پراپرتی کلوز صفحه را به کل ببندم
closeButton.onclick = function (e) {
  window.close();
};
// #endregion

// #endregion
