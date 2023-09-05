const burgerIcon = document.querySelector('.nav__burger-btn')
const burgerBars = document.querySelector('.nav__burger-btn__bars')
const menuMobile = document.querySelector('.menu-mobile__main')
const menuMobileBackground = document.querySelector('.menu-mobile')
const allLinks = document.querySelectorAll('.menu-mobile__main-items a')
const firstName = document.querySelector('.contact__info-form-details-name')
const surname = document.querySelector('.contact__info-form-details-surname')
const email = document.querySelector('.contact__info-form-details-mail')
const message = document.querySelector('.contact__info-form-message-input')
const sendBtn = document.querySelector('.contact__info-form-btn')
const errorMsg = document.querySelectorAll('.error-text')
const errorInfo = document.querySelector('.error-info')
const popup = document.querySelector('.contact__popup')
const popupBtn = document.querySelector('.contact__popup-btn')

// STRONA FOREST
const addActiveClass = () => {
	console.log('klik')
	burgerBars.classList.toggle('active')

	if (burgerBars.classList.contains('active')) {
		menuMobile.classList.add('show')
		menuMobile.classList.remove('hide')
		menuMobileBackground.style.display = 'block'
		menuMobileBackground.style.top = `+${window.scrollY}px`
		document.body.style.overflow = 'hidden'
	} else {
		menuMobile.classList.remove('show')
		menuMobile.classList.add('hide')
		setTimeout(closeMenu, 500)
	}
}

const closeMenu = () => {
	burgerBars.classList.remove('active')
	document.body.style.overflow = 'auto'
	menuMobileBackground.style.display = 'none'
}
const checkForm = () => {
	errorInfo.textContent = ''
	if (firstName.value !== '' && surname.value !== '' && email.value !== '' && message.value.trim() !== '') {
		checkNames(firstName, 'Podaj prawidłowe imię!')
		checkNames(surname, 'Podaj prawidłowe nazwisko!')
		checkMail(email)
		countErrors()
	} else {
		errorInfo.textContent = 'Wypełnij wszystkie pola!'
	}
}

const checkNames = (name, msg) => {
	const re = /^[a-zA-Z]+$/

	if (re.test(name.value)) {
		name.classList.remove('error')
		name.nextElementSibling.textContent = ''
	} else {
		name.classList.add('error')
		name.nextElementSibling.textContent = `${msg}`
	}
}
const checkMail = email => {
	const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (re.test(email.value)) {
		email.classList.remove('error')
		email.nextElementSibling.textContent = ''
	} else {
		email.classList.add('error')
		email.nextElementSibling.textContent = 'Podaj prawidłowego e-maila!'
	}
}

const countErrors = () => {
	let countError = 0
	const allInputs = document.querySelectorAll('input')

	allInputs.forEach(input => {
		if (input.classList.contains('error')) {
			countError++
		}
	})
	console.log(countError)
	if (countError === 0) {
		showPopup()
	} else {
		errorInfo.textContent = 'Podaj prawidłowe dane!'
	}
}

const showPopup = () => {
	popup.style.display = 'block'
	popup.style.top = `+${window.scrollY}px`
	document.body.style.overflow = 'hidden'
}
const closePopup = () => {
	popup.style.display = 'none'
	document.body.style.overflow = 'auto'
	firstName.value = ''
	surname.value = ''
	email.value = ''
	message.value = ''
}

burgerIcon.addEventListener('click', function () {
	addActiveClass()
})

allLinks.forEach(link => {
	link.addEventListener('click', function () {
		console.log('kliknieto w link')
		closeMenu()
		menuMobileBackground.style.display = 'none'
	})
})

sendBtn.addEventListener('click', checkForm)
popupBtn.addEventListener('click', closePopup)
window.addEventListener('click', e => (e.target === popup ? closePopup() : false))
window.addEventListener('click', e => (e.target === menuMobileBackground ? closeMenu() : false))

//MAPA

let map, marker
const stylesArray = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#ebe3cd',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#523735',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#f5f1e6',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#c9b2a6',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#dcd2be',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#ae9e90',
			},
		],
	},
	{
		featureType: 'landscape.natural',
		elementType: 'geometry',
		stylers: [
			{
				color: '#dfd2ae',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{
				color: '#dfd2ae',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#93817c',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#a5b076',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#447530',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: '#f5f1e6',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#fdfcf8',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#f8c967',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#e9bc62',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#e98d58',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: '#db8555',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#806b63',
			},
		],
	},
	{
		featureType: 'transit.line',
		elementType: 'geometry',
		stylers: [
			{
				color: '#dfd2ae',
			},
		],
	},
	{
		featureType: 'transit.line',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#8f7d77',
			},
		],
	},
	{
		featureType: 'transit.line',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#ebe3cd',
			},
		],
	},
	{
		featureType: 'transit.station',
		elementType: 'geometry',
		stylers: [
			{
				color: '#dfd2ae',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#b9d3c2',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#92998d',
			},
		],
	},
]
function initMap() {
	const icon = {
		url: 'http://maps.google.com/mapfiles/kml/pal2/icon4.png',
		scaledSize: new google.maps.Size(50, 50),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(0, 0),
	}
	map = new google.maps.Map(document.querySelector('.contact__map'), {
		center: { lat: 50.0887854, lng: 19.8926397 },
		zoom: 15,
		styles: stylesArray,
		// zoomControl: true,
		// mapTypeControl: true,
		// scaleControl: true,
		// streetViewControl: true,
		// rotateControl: true,
		// fullscreenControl: true,
		// animation: google.maps.Animation.DROP
	})

	marker = new google.maps.Marker({
		position: { lat: 50.0887854, lng: 19.8926397 },
		map,
		title: 'Adres Foresta',
		icon: icon,
	})
}
