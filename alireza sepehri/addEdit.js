
// آرایه مخاطبین که در سامانه ثبت نام کرده اند
const registeredList = [
    {mobile: '09155803862',username: 'علی'},
    {mobile: '09391570415',username: 'حسین'},
    {mobile: '09123205004',username: 'احمد'},
    {mobile: '09353649470',username: 'رضا'}    
]

// آرایه لیست مخاطبین ذخیره شده
const contactlist = [
    {mobile: '09155803862',username: 'علی'},
    {mobile: '09353649470',username: 'رضا'}   
]

const telFormat1 = /^[0,9]{2}\d{9}/

// ثابت های نگهدارنده عناصر مورد استفاده
const plusIcon = document.getElementById('plusIcon')    
const editIcon = document.getElementById('editIcon')
const closeIcon = document.getElementById('closeIcon')
const popupBox = document.getElementById('backPopup')
const popUpClass = document.querySelector('.popupBox')
const btnPopup = document.getElementById('btnPopup')
const mobileInput1 = document.getElementById('mobileUser')
const nameInput1 = document.getElementById('nameUser')

// مقداری که میگیرد عملکرد (افزودن/ویرایش) دکمه را تعیین می کند
let btnType1

// کلیک روی آیکن پلاس
plusIcon.onclick = () => {
    popupBox.style.display = 'flex'        /* default popupBox -> display none */
    btnType1 = 'btnPlus'
    btnPopup.textContent = 'افزودن مخاطب'
    btnPopup.nextElementSibling.textContent = ''
}

// کلیک روی آیکن ادیت
editIcon.onclick = () => {
    popupBox.style.display = 'flex'      /* default edituserBox -> display none */
    btnType1 = 'btnEdit'
    btnPopup.textContent = 'اعمال تغییرات'
    btnPopup.nextElementSibling.textContent = ''
}

// کلیک روی آیکن کلوز پاپ آپ
closeIcon.onclick = () => {
    popupBox.style.display = 'none'
}

// کلیک روی دکمه افزودن/ویرایش مخاطب
btnPopup.addEventListener('click', () => {
    
    let mobileValue = mobileInput1.value
    let mobileCheck = mobileValue.match(telFormat1)
    let namevalue = nameInput1.value
    let findContact = null

    // اگر شماره موبایل معتبر باشد
    if(mobileCheck) {
        // جستجوی مخاطب در سامانه
        for (const contact of registeredList) { /* registeredList-example list contacts of samaneh*/
            if(mobileValue.match(contact.mobile)) {
                findContact = contact
                break
            }
        }
        // وقتی مخاطب در سامانه ثبت نام کرده باشد امکان ذخیره وجود خواهد داشت
        if(findContact) {
            mobileInput1.classList.remove('error')
            nameInput1.classList.remove('error') 
            btnPopup.nextElementSibling.textContent = ''
            // بررسی می کند یک نام برای مخاطب وارد شده باشد
            if(namevalue) {
                let index = 0  // یک شمارنده برای یافتن ایندکس مخاطب 

                // جستجوی مخاطب در لیست مخاطبین کاربر
                for (const contact of contactlist) {
                    if(mobileValue.match(contact.mobile)) {
                        if(btnType1 === 'btnPlus') {
                            btnPopup.nextElementSibling.textContent = 'این مخاطب قبلا ذخیره شده است!'
                            findContact = null
                            break
                        }
                        // ویرایش مخاطب موجود در لیست
                        findContact.username = namevalue
                        contactlist.splice(index, 1, findContact)
                        findContact = null
                        popupBox.style.display = 'none'
                        console.log(contactlist) // نمایش خروجی ویرایش در کنسول
                        break
                    }
                    index+=1
                }
                // اگر مخاطب قبلا در لیست مخاطبین کاربر نباشد نال نشده و به لیست اضافه میشود
                if(findContact) {
                    findContact.username = namevalue
                    contactlist.push(findContact)
                    popupBox.style.display = 'none'
                    console.log(contactlist) // نمایش خروجی افزودن مخاطب جدید در کنسول
                }
            } else {
                nameInput1.classList.add('error')
                btnPopup.nextElementSibling.textContent = 'یک نام دلخواه برای مخاطب وارد نمایید...'
            }
        } else {
            mobileInput1.classList.add('error')
            btnPopup.nextElementSibling.textContent = 'مخاطب ابتدا باید در سامانه ثبت نام نماید!'
        }
    } else {
        mobileUser.classList.add('error')
        btnPopup.nextElementSibling.textContent = 'شماره موبایل معتبر نیست!'
    }
})