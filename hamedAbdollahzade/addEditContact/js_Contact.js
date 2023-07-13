// اینجا چون ای پی ای فعلن نداریم یک لیست مخاطب شبیه سازی کردم برای چک کردن عملکرد فرمم 
const contacts = 
    [
        {name:"hamedAbdollahzade", mobile:'09333536546'}
    ]
// -------------------------------------------------------------------------------------------------------------------------------------------
// اینجا ی فانکشن تعریف کردم برای عملیات اعتبار سنجی فیلد های شماره موبایل و نام کاربر ک اگه درست نبود دکمه افزودن غیرفعال بشه
// و در کنار المنت اینپوت کاربر بیاد پیغام خطا رو بهش نشون بده 
function validation ()
{
    //  debugger
   
     btnAddContact = document.getElementById('btnAddContact') ;
     flname = document.getElementById('inputFnameLname').value;
     phoneContact = document.getElementById('inputMobile').value ;
    
// اینجا مقدار شماره تماس مخاطب رو میگیره و چک میکنه ک حتما رقم باشه و طولش یازده رقم باشه 
    if (Number(phoneContact) && phoneContact.length === 11 )
    {
    //  اینجا هم ی حلقه فور تعریف کردم ک تک تک کاراکتر هارو کنترل کنه بین صفر و نه باشه 
        for (let i=0 ; i<11 ; i++)
        {
            if (phoneContact[i] >= 0 && phoneContact[i] <= 9)
            {
                // اینجا اگه شرط برقرار بود پیام خطارو نمایشش رو غیر فعال میکنه و دکمه رو فعال میکنه 
                document.getElementById('spanInputMobile').style.display='none';
                btnAddContact.disabled = false ;
            }
            else 
            {
            // این الس رو گذاشتم ک اگه یکی هم حتی درست نبود دکمه غیر فعال بشه و بریک بشه و از حلقه بیاد بیرون 
                btnAddContact.disabled = true ;
                break;
            }
        }
    }
    else 
    {
        // این الس هم برای اینه ک کلا اگر رقم نباشه و یازده رقمم نبود پیغام خطارو نمایش بده و دکمه رو غیرفعال کنه 
        document.getElementById('spanInputMobile').style.display="";
        btnAddContact.disabled = true ;
    }

    // این ایف رو هم برای خالی نبودن مقدار موبایل و نام و نام خانوادگی گذاشتم ک دکمه رو غیرفعال یا فعال کنه 
    if (flname !== "" && phoneContact !=="" )
    {
        btnAddContact.disabled = false ;
    }
    else 
    {
        btnAddContact.disabled = true ;
    }
}
// ------------------------------------------------------------------
//   اینجا برای رویداد کلیک دکمه باتنم ی فانکشن تعریف کردم ک بیاد چک کنه اگه مقدار موبایل و اسم درست بود پیام مربوطه رو به کاربر نشون بده 
    function btnAddContacts() 
  {
    // debugger
    // اینجا من از ارایه کانتکتی ک بالا تعریفش کردم و شبیه سازی کردم چک کردم ک درسته یا ن 
    if (flname === contacts[0].name && phoneContact === contacts[0].mobile )
    {
        document.getElementById('spanInputButton').style.display="none";
        alert ('امکان گفتگو با این مخاطب وجود دارد');
    }
    else
    {
        document.getElementById('spanInputButton').style.display="";
        alert('این مخاطب وجود ندارد')
    }
  }
//! --------------For---Edit---Form---------------------------------------------------------------------------
// این قسمت برای ویرایش است :
// در اینجا ما اول شماره تماس رو از دیتا بس میدیم به مقدار اینپوت ک فقط برای نمایش است 
    document.getElementById('inputMobileEdit').value = contacts[0].mobile ;
    // اینجا هم مقدار اسم و فامیل مخاطب فرضی رو داخل مقدار اینپوت میریزیم مخاطب بدونه کدوم مخاطب رو داره ویرایش میکنه  
    document.getElementById('inputNameEdit').value = contacts[0].name ;

    // این تابع زمانی ک کاربر دکمه ای فشار بده برای تغییر نام میاد بررسی میکنه اگه مقدار جدید با فعلی یکی نبود میذاره دکمه باتن فعال بشه 
    function changeName() 
    {
        if (document.getElementById('inputNameEdit').value !== contacts[0].name)
        {
            document.getElementById('btnEditContact').disabled = false ;
        }
        else 
        if (document.getElementById('inputNameEdit').value === contacts[0].name)
        {
            document.getElementById('btnEditContact').disabled = true ;
        }         
    }

// این فانکشن هم کارش اینه اگه رو دکمه ویرایش کلیک شد بیاد پیغام موفقیت امیز بودن رو به کاربر بده 
    function btnChangeName() 
        {
           alert ('با موفقیت تغییر یافت');
        }

//!----------------------------------------------------------------------------------------------------