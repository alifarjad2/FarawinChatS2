
// addcontact

const modalAddContact = document.querySelector(".modal-addcontact");
const openModalBtnAddContact = document.querySelector(".img-plase");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
    modalAddContact.style.animation = "diappear 250ms ease-in 1";
    setTimeout(
        function () {
            modalAddContact.style.display = "none";
        }, 250);
};
// close the modal when the close button is clicked
closeModalBtn.addEventListener("click", closeModal);

// open modal function
const openModal = function () {
    modalAddContact.style.animation = "appear 250ms ease-in 1";
    modalAddContact.style.display = "block";
};
// open modal event
openModalBtnAddContact.addEventListener("click", openModal);

let usersList = [
    { mobileNumber: "09152076110", userName: "محی" },
    { mobileNumber: "09111111111", userName: "ممد" },
    { mobileNumber: "09222222222", userName: "مملی" },
    { mobileNumber: "09333333333", userName: "ماهی" },
    { mobileNumber: "09444444444", userName: "مهلا" },
    { mobileNumber: "09555555555", userName: "مهیا" },
];

var button = document.getElementById("btn-add-contact");
var rsult = true;
var number = document.getElementById('call').value;

let phoneNumberForm;
let userNameForm;
document.getElementById("btn-add-contact").addEventListener("click", function (event) {
    event.preventDefault();
    rsult = verifyform();

    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';

        var counter = 0
        for (let i = 0; i < usersList.length; i++) {
            if (phoneNumberForm == usersList[i].mobileNumber && userNameForm == usersList[i].userName) {
                button.classList.add("btn");
                document.querySelector(".error-signup").style.display = 'block';
                alert('قبلا ثبت نام شده')
                counter++
            } else {
                var newUser = {
                    mobileNumber: phoneNumberForm,
                    userName: userNameForm
                }
            }
        }
        if (counter == 0) {
            alert('کاربر جدید به لیست اضافه شد')
            usersList.push(newUser)
            console.log(usersList)
        }

    } else {
        button.classList.add("btn");
        document.querySelector(".error-signup").style.display = 'block';
    }
});

function verifyform() {
    var n, nu = false;
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
        phoneNumberForm = number;
    }

    //نام کاربر
    var nameUser = document.getElementById("nameUser").value;//دوباره تعریف کردم که هر بار چک کنه
    //check empty field  
    if (nameUser == "") {
        document.getElementById("text-error-nameUser").innerHTML = "مقدار دهی به این فیلد اجباری است";
        document.querySelector(".error-nameUser").style.display = 'block';
        return false;
    } else {
        document.querySelector(".error-nameUser").style.display = 'none';
        nu = true;
        userNameForm = nameUser;
    }

    if (n && nu) {
        return true;
    }
};

const call = document.getElementById("call");
call.addEventListener("input", function (e) {
    rsult = verifyform();
    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';
    }
    else {
        button.classList.add("btn");
    }
});

const nameUserInput = document.getElementById("nameUser");
nameUserInput.addEventListener("input", function (e) {
    rsult = verifyform();
    if (rsult) {
        button.classList.remove("btn");
        document.querySelector(".error-signup").style.display = 'none';
    }
    else {
        button.classList.add("btn");
    }
});













//editcontact

const modallEditcontact = document.querySelector(".modal-editcontact");
const openModalBtnEditcontact = document.querySelector(".img-edit");
const closeModalBtnEditcontact = document.querySelector(".btn-close-editcontact");

// close modal function
const closeModalEditcontact = function () {
    modallEditcontact.style.animation = "diappear 250ms ease-in 1";
    setTimeout(
        function () {
            modallEditcontact.style.display = "none";
        }, 250);
};
// close the modal when the close button is clicked
closeModalBtnEditcontact.addEventListener("click", closeModalEditcontact);

// open modal function
const openModalEditcontact = function () {
    modallEditcontact.style.animation = "appear 250ms ease-in 1";
    modallEditcontact.style.display = "block";
};
// open modal event
openModalBtnEditcontact.addEventListener("click", openModalEditcontact);

let usersListEdit = [
    { mobileNumber: "09152076110", userName: "محی" },
    { mobileNumber: "09111111111", userName: "ممد" },
    { mobileNumber: "09222222222", userName: "مملی" },
    { mobileNumber: "09333333333", userName: "ماهی" },
    { mobileNumber: "09444444444", userName: "مهلا" },
    { mobileNumber: "09555555555", userName: "مهیا" },
];

var buttonEditcontact = document.getElementById("btnEditcontact");
var rsultEdit = true;
var numberEditContact = document.getElementById('callEditContact').value;

let phonerFormEdit;
let userNameFormEdit;
document.getElementById("btnEditcontact").addEventListener("click", function (event) {
    event.preventDefault();
    rsultEdit = verifyformEdit();

    if (rsultEdit) {
        buttonEditcontact.classList.remove("btn");
        document.querySelector(".error-editcontact").style.display = 'none';

        var counterEdit = false;
        for (let i = 0; i < usersListEdit.length; i++) {
            if (phonerFormEdit == usersListEdit[i].mobileNumber && userNameFormEdit != usersListEdit[i].userName) {
                usersListEdit[i].userName = userNameFormEdit;
                counterEdit = true;
                break;
            } else {
                counterEdit = false;
            }
        }
        if (counterEdit == true) {
            console.log(usersListEdit);
            alert("نام جدید ثبت شد")
        } else {
            buttonEditcontact.classList.add("btn");
            document.querySelector(".error-editcontact").style.display = 'block';
            alert("نام جدید تکراری بود");
        }


    } else {
        buttonEditcontact.classList.add("btn");
        document.querySelector(".error-editcontact").style.display = 'block';
    }
});

function verifyformEdit() {
    var n, nu = false;
    //شماره موبایل
    var numberEditContact = document.getElementById('callEditContact').value;//دوباره تعریف کردم که هر بار چک کنه
    function validateNumber(input) {
        var re = /^(09)[0-9]{9}$/;
        return re.test(input);
    };
    if (!validateNumber(numberEditContact)) {
        document.getElementById("text-error-callEdit").innerHTML = "شماره موبایل باید 11 رقمی بوده و با 09 آغاز شود";
        document.querySelector(".error-callEdit").style.display = 'block';
        return false;
    } else {
        document.querySelector(".error-callEdit").style.display = 'none';
        n = true;
        phonerFormEdit = numberEditContact;
    }

    //نام کاربر
    var nameUserEditContact = document.getElementById("nameUserEditContact").value;//دوباره تعریف کردم که هر بار چک کنه
    //check empty field  
    if (nameUserEditContact == "") {
        document.getElementById("text-error-nameUserEdit").innerHTML = "مقدار دهی به این فیلد اجباری است";
        document.querySelector(".error-nameUserEdit").style.display = 'block';
        return false;
    } else {
        document.querySelector(".error-nameUserEdit").style.display = 'none';
        nu = true;
        userNameFormEdit = nameUserEditContact;
    }

    if (n && nu) {
        return true;
    }
};

const callEditContact = document.getElementById("callEditContact");
callEditContact.addEventListener("input", function (e) {
    rsultEdit = verifyformEdit();
    if (rsultEdit) {
        buttonEditcontact.classList.remove("btn");
        document.querySelector(".error-editcontact").style.display = 'none';
    }
    else {
        buttonEditcontact.classList.add("btn");
    }
});

const nameUserInputEditContact = document.getElementById("nameUserEditContact");
nameUserInputEditContact.addEventListener("input", function (e) {
    rsultEdit = verifyformEdit();
    if (rsultEdit) {
        buttonEditcontact.classList.remove("btn");
        document.querySelector(".error-editcontact").style.display = 'none';
    }
    else {
        buttonEditcontact.classList.add("btn");
    }
});











