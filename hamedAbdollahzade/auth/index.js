/// *mentor: باید این صفحه رو کامل کامنت گذاری کنید
/// *mentor: بالای هر کد کامنت هاش رو بگذارید
/// *mentor: خورده باشد. mentor no comment مگر آنکه

/// *mentor: برای مثال این رو من خودم می زارم
///* صرفا جهت این که یک بارگذاری نمایشی نشون بدم
///* و متغیر هام گلوبال هم نمی شن ؟ چرا؟
/// *mentor no comment
setTimeout(() => {
  container.classList.add("show");

  /// *mentor no comment
  let mode = localStorage.mode || "register";

  const syncMode = () => {
    divpass2.style.display = mode == "login" ? "none" : "";
    changeMode.innerHTML = mode == "login" ? "ثبت‌نام" : "ورود";
    myBtn.innerHTML = mode != "login" ? "ثبت‌نام" : "ورود";
  };

  changeMode.onclick = () => {
    /// *mentor no comment
    mode = localStorage.mode = mode == "login" ? "register" : "login";
    syncMode();
  };

  syncMode();

  let _loading = false;
  const validation = {
    phone: false,
    password: false,
    password2: false,
  };

  const syncActions = () => {
    if (_loading) {
      return (myBtn.disabled = true);
    }

    if (mode == "login") syncLogin();
    else syncRegister();
  };

  const syncRegister = () => {
    if (validation.password && validation.password2 && validation.phone)
      return (myBtn.disabled = false);
    myBtn.disabled = true;
  };

  const syncLogin = () => {
    if (validation.password && validation.phone)
      return (myBtn.disabled = false);
    myBtn.disabled = true;
  };

  let _timeout = null;
  phone.oninput = (event) => {
    clearTimeout(_timeout);
    validation.phone = false;
    syncActions();
    _timeout = setTimeout(() => {
      validation.phone =
        /// *mentor no comment: این مورد رو نمی خواد کامنت بزارید این تابع اعداد فارسی و عربی رو انگلیسی می کنه
        farawin.toEnDigit(phone.value).match(farawin.mobileRegex);

      if (validation.phone) {
        syncActions();
        return (usererror.innerHTML = "");
      }
      usererror.innerHTML = `موبایل صحیح نمی‌باشد!
        (باید عددی ۱۱ رقمی بوده و با ۰۹ آغاز گردد)`;
    }, 444);
  };

  pass.oninput = (event) => {
    clearTimeout(_timeout);
    validation.password = false;
    syncActions();
    _timeout = setTimeout(() => {
      validation.password =
        pass.value?.length >= 8 &&
        (mode == "register" ? pass2.value == pass.value : true);

      if (validation.password) {
        validation.password2 = true;
        syncActions();
        pass2error.innerHTML = ``;
        return (passerror.innerHTML = "");
      }
      passerror.innerHTML = `رمزعبور صحیح نمی‌باشد!‌
        (باید حداقل ۸ حرف و با تکراررمز یکی باشد!)`;
    }, 444);
  };

  pass2.oninput = (event) => {
    clearTimeout(_timeout);
    validation.password2 = false;
    syncActions();
    _timeout = setTimeout(() => {
      validation.password2 =
        pass2.value?.length >= 8 && pass2.value == pass.value;

      if (validation.password2) {
        validation.password = true;
        syncActions();
        passerror.innerHTML = ``;
        return (pass2error.innerHTML = "");
      }
      pass2error.innerHTML = `تکرار رمز‌عبور صحیح نمی‌باشد!‌
          (باید حداقل ۸ حرف و با رمز یکی باشد!)`;
    }, 444);
  };

  myBtn.disabled = true;

  let _interval = null;
  const buttonLoading = () => {
    if (!_loading) {
      return clearInterval(_interval);
    }
    myBtn.innerHTML = "درحال‌ارسال‌اطلاعات .";
    clearInterval(_interval);
    _interval = setInterval(() => {
      myBtn.innerHTML = myBtn.innerHTML + ".";
      if (myBtn.innerHTML.endsWith("....")) {
        myBtn.innerHTML = "درحال‌ارسال‌اطلاعات .";
      }
    }, 333);
  };

  myBtn.onclick = () => {
    var uservalue = document.getElementById("phone").value;
    var passvalue = document.getElementById("pass").value;
    //loading
    _loading = true;
    syncActions();
    buttonLoading();

    if (mode == "login") {
      return farawin.testLogin(uservalue, passvalue, (response) => {
        setTimeout(() => {
          const success = response.code == "200";

          if (success) console.log("result from api -> ", response);
          else console.error("error from api -> ", response);
          _loading = false;
          syncActions();
          buttonLoading();
          // changeMode.click();
          location.assign("../messanger page/messenger.html");
          localStorage.userName = uservalue;

          alert(response.message);
        }, 1000);
      });
    }

    farawin.testRegister(uservalue, passvalue, "Farawin", (response) => {
      setTimeout(() => {
        const success = response.code == "200";

        if (success) console.log("result from api -> ", response);
        else console.error("error from api -> ", response);
        _loading = false;
        syncActions();
        buttonLoading();
        changeMode.click();

        alert(response.message);
      }, 1000);
    });
  };
}, 444);
