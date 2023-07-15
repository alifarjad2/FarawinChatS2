if ( !localStorage.token ) location.assign( "./auth/index.html" );
//Variables
// var let const
// متغیر ها یا ثابت هایی که میخوایم در همه جا بهشون دسترسی داشته باشیم بصورت گلوبال تعریف میکنیم
//  میشه کل سند اچ تی ام ال ما document 
//  به المنت موردنظر دسترسی پیدا کنیم که دسترسی مثل دسیترسی در سی اس اس هست با آی دی و بقیه موارد query selector هم می توان با 
// کلاس آیدی و getElementBy... می توان از روش های دیگری هم استفاده کنیم مثل 
// اسم متغیر آورده شده است و سپس وقتی تگ در سمت راست مساوی سلکت شد ریخته میشه داخل متغیر که در سمت چپ تعریف کردیم let بعد
// از کاما استفاده شده است let برای عدم تکرار 
// بلاک اسکوپ هستند const & let
let userSelected = document.querySelector( '#user-selected' )
	, contactContainer = document.querySelector( "#contact-container" )
	, contactItems = document.querySelector( "#contact-container .contact-items" )
	, messageInput = document.querySelector( 'input[type="text"]' )
	, sendMessageBtn = document.querySelector( '#send-message' )
	, messageBox = document.querySelector( '.message-box' )
	, showIcon = document.querySelector( '#show-menu' )
	, hideIcon = document.querySelector( '#hide-menu' )
	, addUser = document.querySelector( '#add-user' )
	, editUser = document.querySelector( '#edit-user' )
	, audienceBox = document.querySelector( '#audienceBox' )
	, audienceSection = document.querySelector( '#audience-section' )
	, closePopupBtn = document.querySelector( '#closePopupBtn' )
	, refreshContact = document.querySelector( '#refresh-contact' )
	, refreshMessage = document.querySelector( '#refresh-message' )
	, spinner = document.querySelector( '.spinner' )
	, phoneNumberInput = document.querySelector( '#phoneNumber' )
	, submitForm = document.querySelector( 'input[type="submit"]' )
	, userNameInput = document.querySelector( '#userName' )
	, closePopupForm = document.querySelector( '#closePopupForm' )
	, form = document.querySelector( "#form" )


//EventListeners
// ها همان رویداد هایی هستند که در صفحه اتفاق می افتند event 
//روصدا زدیم تا مورد استفاده قرار بگیرند eventlistener ما در اینجا تابع  
//این تابع برای خوانایی کد استفاده شده و همه ی ایونت لیسنر هارو در داخل خود جای داده
eventListeners()
function eventListeners() {
	phoneNumberInput.addEventListener( 'paste', PastePhoneNumber ) //ایونت پیست برای ولیدیت مقدار پیست ورودی
	phoneNumberInput.addEventListener( "keydown", validatePhoneNumber )//ایونت کی داون برای چک کردن کلید هایی که توسطط کاربر زده میشود
	phoneNumberInput.addEventListener( 'blur', validateField )//ایونت بلر برای زمانی که فوکوس از روی فیلد برداشته شد
	userNameInput.addEventListener( 'blur', validateField )
	form.addEventListener( 'submit', checkfields ) // اطلاعات رو به جایی ارسال نمیکنه چون پریونت دیفالت هست
	contactItems.addEventListener( 'click', userInfo )// اگر در هرجایی از  کانتکت آیتمز کلیک شد تابع فراخوانی میشود
	messageInput.addEventListener( 'blur',()=>{if( messageInput.Value != '') sendMessageBtn.disabled = false})
	sendMessageBtn.addEventListener( 'click', sendMessage )
	showIcon.addEventListener( 'click', showSidebarMenu )
	hideIcon.addEventListener( 'click', hideSidebarMenu )
	addUser.addEventListener( 'click', popUpAudience )// برای آیکون های اد یوزر و ادیت یک تابع در نظر گرفته شده برای جلوگیری از کد نویسی مجدد اما در تابع جدا جدا موارد بررسی میشود
	editUser.addEventListener( 'click', popUpAudience )
	closePopupBtn.addEventListener( 'click', closepopUpAudience )
	refreshContact.addEventListener( "click", () => {//وقتی آیکون رفرش کلیک شد مخاطبین بروزرسانی می شوند
		spinner.style.display = 'flex';
		sync();
	} )
	refreshMessage.addEventListener( 'click', () => {
		alert( 'باکس پیام بروزرسانی شد' ) //صرفا برای نمایش
	} )
	//هست اجرا میشه event listener تابعش که پارامتر دوم  Dom این ایونت پس از بارگذاری کامل ساختار 
	// دو پارامتر داره  یکی برای نوع رویدادی که اتفاق می افته و دومی تابعی است که میخواهیم هنگام رویداد فراخوانی کنیم event listener 
	//DomContentLoaded  به محض لود شدن صفحه تابع ما اجرا بشه
	//ها میتوان توابع رو مختصر نوشت arrow function با استفاده از 
	document.addEventListener( "DOMContentLoaded", () => {
		submitForm.disabled = true;// دکمه سابمیت در ابتدا غیر فعال میشود
		// sendMessageBtn.disabled = true// دکمه ارسال پیام در ابتدا غیر فعال هست
		messageInput.disabled = true //اینپوت نوشتن پیام در ابتدا غیر فعال می باشد تا زمانی که کاربر انتخاب نشده
		spinner.style.display = "flex" //اسپینر در ابتدا تا زمانی که مخاطبین از سرور گرفته شوند فعال می شود
	} )
}


//Functions
//تابع صدا زده می شود تا مورد استفاده قرار بگیرد
sync()
//تابع صدا زده می شود تا مورد استفاده قرار بگیرد
emptysections()
// اگر بخواهیم بصورت خودکار هر 1 ثانیه لیست مخاطبین بروز شود
// setInterval(() => {
// 	sync()
// }, 1000);
function sync() {
// api تابع 
	farawin.getContacts( ( result ) => {
		window.list = result.contactList;
		if ( !window.list ) return; // اگر مخاطبی در سرور وجود نداشت کاری نمی کند
		console.table( window.list )//نمایش جدولی لیست در کنسول
		contactItems.innerHTML = "";//برای حذف پیام مخاطبی برای نمایش وجود ندارد
		for ( const contactItem of window.list ) {//تک تک یوزر ها رو میگیریم
			const name = contactItem.name; //نام یوزر هارو داخل متغیر نیم میریزیم
			let splitName = name.split( " ", 2 ) //نام رو به 2 بخش  در آرایه تقسیم میکنیم
			const userName = contactItem.username // یوزر نیم همان شماره تلفن کاربر میباشد
			let div = document.createElement( "div" ); // تگ دیو ایجاد میکنیم
			div.setAttribute( 'username', userName ) //شماره هر فرد یا یوزر نیم هر فرد را به عنوان اتربیوت در نظر گرفتم تا بعنوان شناسه ای برای دسترسی به آن باشد
			div.classList.add( "user-info" ); //به دیو کلاس مورد نظر رو اضافه کردم
			// دیو ایجاد شده رو به عنوان فرزند کانتکت آیتمز اپند می کنیم
			contactItems.appendChild( splitNameUser( name, splitName, div ) );// ایتدا تابع اسپلیت نیم یوزر فراخوانی میشود تا اگر اسم دو بخشی بود یا بیشتر حرف اول واژه های اول و دوم رو برای نمایش در آواتار استفاده کنم
			let divMessageUser = document.createElement( 'div' )//برای هر یوزر یک باکس پیام در نظر گرفتم 
			divMessageUser.id = userName //آیدی باکس پیام برای دسترسی همان شماره تلفن یا یوزر نیم کاربر است
			divMessageUser.classList.add( 'hidden' ) //در ابتدا که مخاطبین اضافه میشوند باکس پیام مختص به هر یک پنهان است
			//تگ اسپن اضافه کردم template literals داخل باکس پیام هر مخاطب با استفاده از 
			divMessageUser.innerHTML = `
		<span class="emptyBoxStyle">هنوز پیامی وجود ندارد</span>
		`
		//باکس پیام شخصی که داخل حلقه فور هست رو به باکس کلی پیام ها اضافه کردم
			messageBox.appendChild( divMessageUser )
		}
		//در اصل باید کد دیسپلی نان اسپینر اینجا باشد خارج از تابع ست تایم اوت برای اینکه وقتی مخاطبین بروز شدند بلافاصله مخفی شه 
		//اما برای نمایش اسپینر  وقتی سرعت اینترنت بالا هست و بخواهیم اسپینر تایم کمی دیده بشه کد زیر را نوشتم
		setTimeout( () => {
			spinner.style.display = "none"
		}, 500 ); //.5s
	} );
}
//این تابع برای دریافت روز ماه فارسی و ساعت و دقیقه استفاده شده
function dateTime() {
	let now = new Date().toLocaleString( 'fa' ) //تاریخ و ساعت به فارسی
		, splitDate = now.split( ',', 2 ) //تاریخ و ساعت رو توسط متد اسپلیت جدا کردم
		, day = splitDate[ 0 ].split( "/", )[ 2 ]//روز
		, month = new Date().getMonth() // عدد ماهی که هستیم غیر ایرانی
		, time = splitDate[ 1 ]// خانه دوم آرایه اسپلیت که زمان هست
		, hoursMinute = time.split( ":", 2 )// ساعت و دقیقه
	switch ( month ) {
		case 1: // اگر عدد ماهی که هستیم برابر یک بود(خارج)
			monthName = 'بهمن';
			break;
		case 2:
			monthName = 'اسفند';
			break;
		case 3:
			monthName = 'فروردین';
			break;
		case 4:
			monthName = 'اردیبهشت';
			break;
		case 5:
			monthName = 'خرداد';
			break;
		case 6:
			monthName = 'تیر';
			break;
		case 7:
			monthName = 'مرداد';
			break;
		case 8:
			monthName = 'شهریور';
			break;
		case 9:
			monthName = 'مهر';
			break;
		case 10:
			monthName = 'آبان';
			break;
		case 11:
			monthName = 'آذر';
			break;
		case 12:
			monthName = 'دی';
			break;
	}
	//متغیر هایی که برای روز ماه و ساعت و دقیقه بود رو یکجا در متغیر تایم دیت ذخیره کردم
	// به این دلیل از استرانگ استفاده شد چون طبق اولویت راست به چپ عدد و حرف به هم میریخت و استرانگ میاد برای قوی کردن واژه 
	// یونی کد
	let timeDate = ( `<strong>${day} ${monthName} - ${hoursMinute[1]} : ${hoursMinute[0]}</strong>` )
	// مقدار تایم دیت را تابع ریترن میکند یعنی اگر اسم تابع رو صدا برنیم و توی متغیری دیگر بریزیم انگار مقدار تایم دیت را به متغیر انتساب دادیم
	return timeDate
}

//این تابع در ابتدای چون فراخوانی شده اجرا میشه
function emptysections() {
	//اگر مخاطبی در سرور نبود  میره داخل بلاک شرط
	if ( contactItems.innerHTML == "" ) {
		contactItems.innerHTML = `
			<div class="emptyBoxStyle">مخاطبی برای نمایش وجود ندارد </div>
			`
	}
	//تا زمانی که از لیست مخاطبین مخاطبی انتخاب نشود در هدر بالای باکس پیام متن داخل تگ اسپن زیر نمایش داده میشود
	if ( userSelected.innerHTML == "" ) {
		userSelected.innerHTML = `
			<span class="emptyUserSelected" >هنوز مخاطبی انتخاب نشده است</span>
			`
	}
	if ( window.innerWidth >= 300 && window.innerWidth <= 400 ) {
		userSelected.innerHTML = `
			<span class="emptyUserSelected" style="font-size:0.7rem;margin-right:10px" >هنوز مخاطبی انتخاب نشده است</span>
			`
	}
}
//این تابع برای این تعریف شده که اگر کاربر  در داخل لیست مخاطبین کلیک کرد اطلاعات مخاطب دریافت بشه
function userInfo( e ) {
	//هدر بالای باکس پیام خالی میشود تا مخاطبی که کلیک شده جایگزین شود
	userSelected.innerHTML = ""
	let userInfoElement;//متغیر تعریف شده تا بعد مورد استفاده قرار بگیرد
	//اگر کاربر روی عکس کلیک کرد
	if ( e.target.classList.contains( 'user-avatar' ) ) {
		//پرنت اصلی یوزر که شامل اون عکس بوه رو ازش کپی گرفتم 
		//و از لیست مخاطبین حذف میشه userInfoElement چون در غیر اینصورت آدرس رو ریختم داخل
		userInfoElement = e.target.parentElement.cloneNode( true )
	} else if ( e.target.classList.contains( 'content' ) ) {
		userInfoElement = e.target.parentElement.parentElement.cloneNode( true )
	} else if ( e.target.classList.contains( 'user-name' ) ) {
		userInfoElement = e.target.parentElement.cloneNode( true )
	} else {
		userInfoElement = e.target.cloneNode( true )
	}
	//تابع زیر فراخوانی می شود تا مخاطب انتخاب شده به هدر اضافه گردد
	showSelectUser( userInfoElement )
	//من برای دسترسی به باکس پیام که آیدی آن مانند اتربیوت مخاطب هست از طریق متد زیر استفاده کردم
	let UserSelectedId = userInfoElement.getAttribute( 'username' )
	//همه ی دیو هایی که داخل باکس پیام هستند رو انتساب دادم به متغیر زیر
	let allBoxMessage = document.querySelectorAll( '.message-box div' )
	for ( const boxMessage of allBoxMessage ) {
		//باکس پیام ها که حاوی آی دی هر فرد یا یوزر نیم هر فرد هست پیمایش میشه 
		//اگر به باکسی رسیدیم که آیدیش با یوزر نیم مخاطب یکی بود کلاس هیدن رو حذف میکنیم
		if ( boxMessage.id == UserSelectedId ) {
			boxMessage.classList.remove( 'hidden' )
			//بقیه باکس های پیام باید مخفی بماند
		} else if ( boxMessage.id != UserSelectedId ) {
			boxMessage.classList.add( 'hidden' )
		}
	}
	//وقتی مخاطب انتخاب شد اینپوت پیام ما فعال میشود
	messageInput.disabled = false
}
//تابع برای نمایش  مخاطب اننتخاب شده در هدر مربوطه
function showSelectUser( userInfoElement ) {
	//دیو مخاطب رو به عنوان پارامتر ورودی تابع گرفتم و به هدر اپند کردم
	let user = userSelected.appendChild( userInfoElement )
	//کلاس زیر را به یوزر سلکت اضافه کردم تا بعدا در داخل پاپ آپ ادیت یوزر چک کنم که مخاطب انتخاب شده
	userSelected.classList.add( 'hasSelectAudience' )
	//چون هاور در سی اس اس اضافه شد برای نمایش بهتر مخاطب انتخابی در هدر بدون هاور از کد های زیر استفاده کردم
	user.addEventListener( 'mouseover', () => {
		user.style.background = 'none'
	} )
	user.addEventListener( 'touchstart', () => {
		user.style.background = 'none'
	} )
}

//این تابع وقتی باتن ارسال پیام کلیک شه اجرا میشه
function sendMessage() {
    // متن نوشته شده در باکس پیام رو ریختم داخل متغیر
	let messageInputValue = messageInput.value
	//اگر اینپوت پیام خالی بود کاری کاری انجام نمیشود
	if ( messageInputValue == '' ) return
	//تگ اسپن ایجاد کردم
	let span = document.createElement( 'span' )
	//کلاس مسیج استایل اضافه شده به تگ اسپن
	span.classList.add( 'message-style' )
	//تاریخ و ساعت ارسال پیام رو ریختم داخل متغیر زیر
	let dateSendMessage = dateTime()
	span.innerHTML = `
  <span>${messageInputValue}</span>
  <br>
  <span style="font-size:10px;color:gray;text-align:left">${dateSendMessage}</span>
  ` 
  // برای دسترسی به باکس پیام مختص به مخاطب از طریق آیدی
	let boxMessageId = document.querySelector( '#user-selected div' ).getAttribute( 'username' )
	//اگر باکس پیام ما شامل اسپن هنوز پیامی وجود ندارد بود با ارسال پیام اسپن مرتبط با آن حذف می شود
	if ( document.getElementById( boxMessageId ).children[ 0 ].classList.contains( 'emptyBoxStyle' ) ) {
		document.getElementById( boxMessageId ).children[ 0 ].remove()
	}
	//پیام به باکس پیام مختص به مخاطب اضافه میشود
	document.getElementById( boxMessageId ).appendChild( span )
	//وقتی پیام ارسال شد اینپوت پیام خالی میشود
	document.querySelector( 'input[type="text"]' ).value = ""
	//دکمه ارسال پیام مجددا غیر فعال میشود
	sendMessageBtn.disabled = true
}
//برای نمایش منو در حالت ریسپانسیو و عرض کمتر از تبلت
//وقتی که دکمه نمایش منو کلیک شود این تابع اجرا میشو
function showSidebarMenu() {
	//آیکون بستن شدن منو دیده میشود
	hideIcon.style.display = "inline-block"
	//آیکون نمایش منو نمایش داده نمی شود
	showIcon.style.display = "none"
	//منو نمایش داده می شود
	contactContainer.classList.add( 'show-menu' )
	userSelected.style.marginRight = "200px"
	//بین این عرض مرورگر شرط چک میشه
	if ( window.innerWidth >= 300 && window.innerWidth <= 576 ) {
		userSelected.style.marginRight = "0px"
	}
}
//برای مخفی شدن منو در حالت ریسپانسیو و عرض کمتر از تبلت
//وقتی که دکمه بستن منو کلیک شود این تابع اجرا میشو
function hideSidebarMenu() {
	showIcon.style.display = "inline-block"
	hideIcon.style.display = "none"
	contactContainer.classList.remove( 'show-menu' )
	userSelected.style.marginRight = "0px"
}
//این تابع هنگامی که رو دکمه افزودن یا ویرایش مخاطب کلیک شود اجرا میشود
function popUpAudience( e ) {
	// نبود و آیکون ویرایش کلیک شده بود hasSelectAudience شرط چک میکنه اگر هدر بالای باکس پیام یوزر سلکتد دارای کلاس 
	if ( !userSelected.classList.contains( 'hasSelectAudience' ) && e.target.id == 'edit-user' ) {
		//نمایش پیغام
		alert( 'ابتدا مخاطب را از لیست مخاطبین انتخاب کنید' )
	}
	else {
		//اگر آیکون ادیت کلیک شده بود 
		if ( e.target.id == 'edit-user' ) {
			//مقادیر قبلی داخل فرم حذف میشود
			form.reset()
			//ولیو داخل باتن میشود ویرایش مخاطب
			submitForm.value = "ویرایش مخاطب"
			// به باتن پراپرتی نیم دادم تا هنگام سابمیت شرط مربوط به فرم ویرایش یا افزودن جدا چک شود
			submitForm.name = 'editUser'
			//مخاطبی که انتخاب شده شماره موبایل و نامش در داخل فیلد های پاپ آپ قرار میگیرد
			phoneNumberInput.value = document.querySelector( '#user-selected .user-info' ).getAttribute( 'username' )
			userNameInput.value = document.querySelector( '#user-selected .user-info .user-name' ).innerHTML
		}
		//اگر آیکون افزودن مخاطب کلیک شده بود
		if ( e.target.id == 'add-user' ) {
			form.reset()
			submitForm.value = "افزودن مخاطب "
			submitForm.name = 'addUser'
		}
		//audienceSection پاپ آپ نمایش داده میشود
		audienceSection.style.display = "flex"
		//کلاس زیر بهش اضافه شده تا نمایی بهتر داشته و بک گراند بلور داشته باشد
		audienceSection.classList.add( 'audience-section' )
	}
}
//اگر دکمه بستن پاپ آپ کلیک شد تابع زیر اجرا میشود
function closepopUpAudience() {
	audienceSection.style.display = "none"
}
// در ورودی تابع به عنوان یک شی حاوی اطلاعات مربوط به رویداد رخ داده شده است event || e با پارامتر 
//این تابع استفاده شده تا جلوی پیست غیر عدد به اینپوت شماره تلفن رو بگیره
function PastePhoneNumber( e ) {
	//به داده های موجود در کلیپ بورد دسترسی پیدا میکنیم  e.clipboard  ما از طریق  
	//clipboardData میتونیم داده های موجود در کلیپ بورد را با فرمت تکست بخوانیم و انتساب بدیم به متغیر .getData("text") و از طریق 
	let clipboardData = e.clipboardData.getData( "text" )
	//متغیر زیر رو تعریف کردم تا بفهمم مقدار پیست شده عدد هست یانه
	var counterr = 0
	//حلقه ایجاد شده تا از 0 تا کمتر از طول متن کلیپبورد  چک کنه 
	for ( let i = 0; i < clipboardData.length; i++ ) {
		//اگر کاراکتر های متن عدد بود کانتر پلاس پلاس میشه
		if ( clipboardData[ i ] >= '0' && clipboardData[ i ] <= '9' ) {
			counterr++; // counterr++  || counterr = counterr +1
		}
	}
	//اگر مقدار کانتر ما برابر بود با طول متن داخل کلیپ بورد  و طول آن کمتر از 11 بود پیست بشه
	if ( counterr == clipboardData.length && clipboardData.length <= 11 ) {}
	//اگر مقدار کانتر ما برابر بود با طول متن داخل کلیپ بورد و طول آن بیشتر از 11 رقم بود پیست نشه و پیغام خطا رو نشون بده با پارامتر های ارسالی
	else if ( counterr == clipboardData.length && clipboardData.length > 11 ) {
		e.preventDefault()
		showMessage( '#messagePhoneNumber', ' حداکثر 11 رقم میتوان پیست کرد' )
	} else { //اگر همه کاراکتر ها عدد نبود
		e.preventDefault()
		showMessage( '#messagePhoneNumber', 'فقط عدد پیست میشود ' )
	}
}
// اگر هر کدام از کلید های کیبورد فشار داده شد این تابع اجرا میشود
//برای این است که ما بتونیم اطلاعات مربوط به رویداد رخ داده رو بگیریم e
function validatePhoneNumber( e ) {
	//keyCode هر کلید در صفحه کلید یک کد داره که وقتی فشار داده شد ما  اون کد رو انتساب می دیم به متغیر 
	let keyCode = e.keyCode, // or event.key for nameKey
		//codeToString کی کد رو از طریق متد زیر به کاراکتر مربوطش تبدیل میکنه و انتساب میدیم به متغیر 
		codeToString = String.fromCharCode( keyCode )
		//if برای فعال کردن کلید ها و جلوگیری از تکرار کد در شرط های 
		//keycode 8 backspace
		//keycode 37 arrow left
		//keycode 39 arrow right
		, forEnableKey = ( keyCode != 8 && keyCode != 37 && keyCode != 39 )
	// راست و چپ نبود جلوی کار پیشفرض که وارد کردن مقدار داخل فیلد هست رو میگیریم arrow شرط چک میکنه اگر کلیدی که فشار داده شده بود عدد نبود و کلید های حذف و 
	if ( isNaN( codeToString ) && forEnableKey ) {
		e.preventDefault();
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع  
		showMessage( '#messagePhoneNumber', 'فقط میتوانید ارقام 0 تا 9 وارد کنید' )
	}
	//شرط چک میکنه اگر  طول ورودی بزگتر از 11 شد و کلید هایی که در بالا گفته شد نبود جلوی کار پیشفرض رو بگیر و مقدار هارو وارد فیلد نکن
	//e.target تگی که رویداد روش اتفاق افتاده
	if ( e.target.value.length > 10 && forEnableKey ) {
		e.preventDefault();
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع 
		showMessage( '#messagePhoneNumber', 'شماره موبایل حداکثر 11 رقم میباشد' )
	}
	//اگر بخواهیم شرطی براریم که شماره تلفن حتما اولش با 09 شروع شود این کد رو استفاده میکنیم
	//اگر ولیو فیل موبایل خالی بود و کلید 0 فشارداده نشده بود نمیزاره مقداری غیر صفر وارد فیلد بشه
	if ( e.target.value == "" && codeToString != "0" && forEnableKey ) {
		e.preventDefault();
		showMessage( '#messagePhoneNumber', 'شماره موبایل با 09 شروع میشود' )
	} //اگر ولیو داخل فیلد 0 بود رقم بعدی باید 9 باشد
	if ( e.target.value == "0" && codeToString != "9" && forEnableKey ) {
		e.preventDefault()
		showMessage( '#messagePhoneNumber', 'شماره موبایل با 09 شروع میشود' )
	}
}
//  اتفاق افتاد این تابع اجرا میشود blur وقتی روی هر کدام از اینپوت های تل و تکست ایونت 
function validateField() {
	//شده blur اشاره میکنه به تگی که this
	//برای جلوگیری از تکرار phoneNumber رو بریز داخل متغیر true ||false بود phoneNumber اگر آی دی 
	let phoneNumber = ( this.id == 'phoneNumber' ) //boolean 
	//شده blur اشاره میکنه به تگی که this
	//بود و داخل فیلد هیچی نبود وارد بلاک شرط بشه phoneNumber شرط چک میکنه اگر آی دی اینپوتی که بلر شده 
	if ( phoneNumber && this.value == "" ) {
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع 
		showMessage( '#messagePhoneNumber', 'شماره موبایل نمیتواند خالی باشد' )
	}
	//  بین یک تا 10 بود وارد بلاک شرط میشهvalue بود و طول phoneNumber شرط چک میکنه اگر اینپوت ما آیدیش 
	if ( phoneNumber && this.value.length >= 1 && this.value.length <= 10 ) {
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع 
		showMessage( '#messagePhoneNumber', 'شماره موبایل 11 رقمی وارد کنید' )
	}
	//هست و دو رقم اول ولیوی داخل فیلد 09 نبود میره داخل بلاک phoneNumber شرط چک میکنه اگر اینپوت ما که بلر شده آی دیش 
	if ( phoneNumber && this.value != "" && this.value[ 0 ] != "0" && this.value[ 1 ] != "9" ) {
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع 
		showMessage( '#messagePhoneNumber', 'شماره موبایل با 09 شروع میشود' )
	}
	//که همان اینپوت تایپ تکست هست بود  و داخل فیلد هیچی وارد نشده بود وارد بلاک شرط میشه userName شده blur اگر آی دی فیلد 
	if ( this.id == 'userName' && this.value == "" ) {
		//رو صدا میزنیم و پارامتر های نام آیدی و پیامی که قراره نمایش بده رو ارسال میکنیم showMessage تابع 
		showMessage( '#messageUserName', 'نام و نام خانوادگی نمیتواند خالی باشد' )
	}
	//تابع زیر رو فراخوانی میکنیم هر دفعه که بلر شد
	submitBtn()
}

function submitBtn() {
	//این تابع اجرا شده تا اگر طول ورودی فیلد شماره موبایل 11 رقم بود و داخل اسم چیزی نوشته شده بود و خالی نبود بره داخل بلاک شرط
	if ( phoneNumberInput.value.length == 11 && userNameInput.value != '' && phoneNumberInput.value[ 0 ] == "0" && phoneNumberInput.value[ 1 ] == "9" ) {
		// دکمه افزودن مخاطب فعال میشود
		submitForm.disabled = false
	} else {
		//در غیر انصورت غیر فعال
		submitForm.disabled = true
	}
}
//مورد نظر برای نمایش پیام و دومی پیام میباشد div برای نمایش پیام خطا از این تابع استفاده میشود که پارامتر های ورودی آیدی 
function showMessage( idDiv, message ) {
	//div دیو با آی دی مورد نظر رو انتساب میدیم به متغیر 
	let div = document.querySelector( idDiv )
	div.classList.add( "messageBox" )
	//پیام رو داخل دیو میریزیم
	div.innerHTML = message
	//بگ گراند برای دیو تعیین میکنیم
	div.style.background = '#ff4f4f'
	// رنکگ متن رو سفید کردم
	div.style.color = '#fff'
	// با استفاده از این متد میتونیم یک عمل خاص رو در پس از گذشت 3 ثانیه که خودمون تعیین کردیم انجام بدیم
	setTimeout( () => {
		//محتوای دیو رو خالی میکنیم
		div.innerHTML = ""
		//برای نمایش ندادن پدینگ با بک گراند مشخص شده
		div.classList.remove( "messageBox" )
	}, 3000 );
}




// این تابع هنگامی که روی دکمه افزودن مخاطب کلیک شد اجرا میشه
function checkfields( e ) {
	//تغییر نمیکنه url کار پیشفرض که ارسال اطلاعات به سرور هست رو جلوگیری میکنیم و 
	e.preventDefault()
	// اگر باکس پیام هنوز مخاطبی وجود ندارد بود حذف میشه تا کاربر جدید اضافه بشه
	let boxEmptyUser = document.querySelector( '.contact-items .emptyBoxStyle' )
	if ( boxEmptyUser ) {
		boxEmptyUser.remove()
	}
// اگر آیکون ویرایش مخاطب زده شد داخل بلاک این شرط میشه
	if ( submitForm.name == 'editUser' ) {
		alert( 'نام جدید ذخیره شد' )
		//مخاطب سلکت شده
		let div = document.querySelector( '#user-selected .user-info' )
		let splitName = userNameInput.value.split( " ", 2 )
		//تتابع زیر را صدا میزنیم و پارامتر های مورد نظر را ارسال میکنیم
		//نام جدید و دو بخش آن اگر موجود بود
		splitNameUser( userNameInput.value, splitName, div )
		//تمام مخاطبین رو گرفتم
		let audiences = document.querySelectorAll( '.user-info' )
		//روی مخاطبین پیمایش کردم تا اگر مخاطبی با شماره تلفن ما وجود داشت
		for ( const user of audiences ) {
			if ( user.getAttribute( 'username' ) == phoneNumberInput.value ) {
				//تابع فراخوانی میشه و مقادیر جایگزین میشود
				splitNameUser( userNameInput.value, splitName, user )
			}
		}
		//پس از زدن ویرایش مخاطب فرم ریست میشود
		form.reset()
        } 
		// اگر آیکون افزودن مخاطب زده شد داخل بلاک این شرط میشه
	 else if ( submitForm.name == 'addUser' ) {
		//لیست مخاطبین
		let audiences = document.querySelectorAll( '.user-info' )
		//i&j برای این است که اگر مخاطبی که میخواهیم اد کنیم از قبل در مخاطبین وجود داشت پیام های مناسب نمایش دهد
		  var i = 0
			, j = 0
		for ( const user of audiences ) {
			//اگر مقدار فیلد شماره تلفن با یوزر نیم برابر بود ونام مخاطب برابر بود با فیلد نام داخل بلاک شرط میشه
			if ( user.getAttribute( 'username' ) == phoneNumberInput.value && user.children[ 1 ].innerHTML == userNameInput.value ) {
				alert( 'مخاطب در لیست مخاطبین وجود دارد' )
				i++
			}// اگر مقدار فیلد شماره تلفن با یوزر نیم برابر بود و نام جدید با نام مخاطبین مرتبط برابر نبودداخل بلاک شرط میشه
			//برای زمانی که بخواهیم مخاطب با شماره تلفن قبلی ولی با نام جدید به لیست مخاطبین ما افزوده شود
			else if ( user.getAttribute( 'username' ) == phoneNumberInput.value && user.children[ 1 ].innerHTML != userNameInput.value ) {
				// متد کانفیرم برای سوال
				let addByNewName = confirm( 'مخاطبی یا این شماره وجود دارد آیا میخواهید با نامی جدید اضافه کنید؟' )
				//اگر کاربر خواست با نام جدید اضافه بشه
				if ( addByNewName == true ) {
					showInContactList( userNameInput.value, phoneNumberInput.value )
				} else {
					//در غیر اینصورت مخاطب با نام جدید اضافه نمیشه
					alert( 'مخاطب با نام جدید اضافه نشد' )
				}
				j++
			}
		}
		//اگر نه نام فیلد ما و نه شماره در لیست یافت نشد پس کاربر جدید میباشد
		if ( i == 0 && j == 0 ) {
			alert( 'مخاطب جدید به لیست اضافه شد' )
			showInContactList( userNameInput.value, phoneNumberInput.value )
		}
	}
	//پاپ آپ پنهان شود
	audienceSection.style.display = "none"
}
//این تابع برای این است که اگر اسم دوبخش یا بیشتر بود در آواتار دوحرف نوشته شود 
function splitNameUser( name, splitName, div ) {
	if ( splitName.length < 2 ) {
		div.innerHTML = `
		  <div class="user-avatar">
			 <span class="content">${name[0]}</span>
		  </div>
		  <span class="user-name">${name}</span>
		  `;
	}
	if ( splitName.length >= 2 ) {
		div.innerHTML = `
			  <div class="user-avatar">
				 <span class="content">${splitName[0][0]}${splitName[1][0]}</span>
			  </div>
			  <span class="user-name">${name}</span>
			  `;
	}
	//دیو مخاطب ریترن میشود
	return div
}
//تابع نمایش مخاطب اضافه شده
//userName مقدار فیلد نام
//phoneNumberForId مقدار شماره تلفن برای آیدی باکس پیام
function showInContactList( userName, phoneNumberForId ) {
	let name = userName
	let splitName = userName.split( " ", 2 )
	let div = document.createElement( "div" );
	div.classList.add( "user-info" );
	div.setAttribute( 'username', phoneNumberForId )
	contactItems.appendChild( splitNameUser( name, splitName, div ) )
	//برای مخاطب جدید باکس پیام ایجاد میکنیم
	let divMessageUser = document.createElement( 'div' )
	divMessageUser.id = phoneNumberForId
	divMessageUser.classList.add( 'hidden' )
	divMessageUser.innerHTML = `
	<span class="emptyBoxStyle">هنوز پیامی وجود ندارد</span>
	`
	messageBox.appendChild( divMessageUser )
	form.reset()
}
