const burgerIcon = document.querySelector('.nav__burger-btn')
const burgerBars = document.querySelector('.nav__burger-btn__bars')
const menuMobileBackground = document.querySelector('.menu-mobile-background')
const menuMobile = document.querySelector('.nav__items')
const allLinks = document.querySelectorAll('.nav__items-item')
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
	burgerBars.classList.toggle('active')
	menuMobile.style.display = 'flex'

	if (burgerBars.classList.contains('active')) {
		menuMobile.classList.toggle('show')
		menuMobileBackground.style.display = 'block'
		menuMobileBackground.style.top = `+${window.scrollY}px`
		document.body.style.overflow = 'hidden'
	} else {
		menuMobile.classList.toggle('hide')
		setTimeout(closeMenu, 500)
	}
}

const closeMenu = () => {
	burgerBars.classList.remove('active')
	document.body.style.overflow = 'auto'
	menuMobileBackground.style.display = 'none'
	menuMobile.classList.remove('hide')
	menuMobile.classList.remove('show')
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

allLinks.forEach(link => {
	link.addEventListener('click', () => {
		closeMenu()
		menuMobileBackground.style.display = 'none'
	})
})

if (burgerIcon !== null) {
	burgerIcon.addEventListener('click', () => {
		addActiveClass()
	})
}

if (sendBtn !== null) {
	sendBtn.addEventListener('click', e => {
		e.preventDefault()
		checkForm()
	})
}
if (popupBtn !== null) {
	popupBtn.addEventListener('click', closePopup)
}
window.addEventListener('click', e => (e.target === popup ? closePopup() : false))
window.addEventListener('click', e => (e.target === menuMobileBackground ? closeMenu() : false))

//MAPA

import initMap from './map.min.js'
if (typeof google !== 'undefined' || typeof google === 'object') {
	window.initMap = initMap
	initMap()
}
