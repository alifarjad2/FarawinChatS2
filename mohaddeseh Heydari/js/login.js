async function fetchFromApi(methodType, address, sendData, token) {
    if (!methodType) throw "methodType reqiured";
    if (!address) throw "address reqiured";

    if (methodType !== "GET" && !sendData)
        throw `sendData reqiured for ${methodType} method`;

    if (!address.toLocaleLowerCase().startsWith("user") && !token)
        throw `this endpoint need token to work!`;

    let result = null;
    let body = null;

    try {
        body = JSON.stringify(sendData);
        if (Object.values(sendData).find((v) => typeof v === "object"))
            throw 'ورودی غیر مجاز است!'
    } catch {
        result = {
            code: -3,
            message: "پارامتر های ورودی به تابعتون درست نیست!",
        };
        return result;
    }

    try {
        result = await fetch("https://farawin.iran.liara.run/api/" + address, {
            headers: token && {
                Authorization: "bearer " + token,
            },
            body: body,
            method: methodType,
        }).then((res) => res.json());
    } catch (e) {
        result = {
            code: -1,
            message: "خطایی از سمت سرور برخورده است!",
            exception: e,
        };

        if (!window.navigator.onLine) {
            result = {
                code: -2,
                message:
                    "عدم دستیابی به سرور،‌ممکن است اینترنت شما مشکلی برخورده باشه.",
            };
        }
    }

    return result;
}

const farawin = {
    testLogin: async (username, password, responseHandlerCallback) => {
        const result = await fetchFromApi("POST", "user/login", {
            username,
            password,
        });

        responseHandlerCallback && responseHandlerCallback(result);
        !responseHandlerCallback && alert(result?.message);
    },
};









var button = document.getElementById("btn");
var rsult = true;
var number = document.getElementById('call').value;
var pw = document.getElementById("key").value;
let mobail;
let ramz;
document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();
    rsult = verifyform();

    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';
        farawin.testLogin(
            mobail,
            ramz,
            (response) => {
                const success = response.code == "200";

                if (success) console.log("result from api -> ", response);
                else console.error("error from api -> ", response);
                alert(response.message);
  
                if(success)
                  window.location.assign("../chat.html");
            }
        );
    } else {
        button.classList.add("btn");
        document.querySelector(".error-signup").style.display = 'block';
    }
});

function verifyform() {
    var n, k = false;
    //شماره موبایل
    var number = document.getElementById('call').value;//دوباره تعریف کردم که هر بار چک کنه
    function validateNumber(input) {
        var re = /^(09)[0-9]{9}$/;
        return re.test(input);
    };
    if (!validateNumber(number)) {
        document.getElementById("text-error-call").innerHTML = "شماره موبایل باید 11 رقمی بوده و با 09 آغاز شود";
        document.querySelector(".error-call").style.display = 'block';
        return false;
    } else {
        document.querySelector(".error-call").style.display = 'none';
        n = true;
        mobail = number;
    }

    //رمز
    var pw = document.getElementById("key").value;//دوباره تعریف کردم که هر بار چک کنه
    var errorKey = document.getElementById("text-error-key");
    //check empty password field  
    if (pw == "") {
        errorKey.innerHTML = "قسمت رمز را پر کنید";
        document.querySelector(".error-key").style.display = 'block';
        return false;
    } else if (pw.length < 7 & pw != "") {
        //minimum password length validation  
        errorKey.innerHTML = "طول فیلد 8 کاراکتر کمتر نباید باشد";
        document.querySelector(".error-key").style.display = 'block';
        return false;
    } else {
        document.querySelector(".error-key").style.display = 'none';
        k = true;
        ramz = pw;
    }

    if (n && k) {
        return true;
    }
};

const input = document.querySelector("input");
input.addEventListener("input", function (e) {
    rsult = verifyform();
    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';
    }
    else {
        button.classList.add("btn");
    }
});

const ke = document.getElementById("key");
ke.addEventListener("input", function (e) {
    rsult = verifyform();
    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';
    }
    else {
        button.classList.add("btn");
    }
});

