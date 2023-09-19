const video = document.querySelector('.video')
const playToggler = document.querySelector('.play-toggler')
const togglerImg = document.querySelector('.play-toggler img')

video.addEventListener('click', togglePlay)
playToggler.addEventListener('click', togglePlay)

/**
 * Gère le basculement entre lecture et pause de la vidéo.
 */
function togglePlay() {
	if (video.paused) {
		togglerImg.src = 'ressources/pause.svg'
		video.play()
	} else {
		togglerImg.src = 'ressources/play.svg'
		video.pause()
	}
}

const timersDisplay = document.querySelectorAll('.time-display')

video.addEventListener('loadeddata', fillDurationVariables)
window.addEventListener('load', fillDurationVariables)

/**
 * Variables pour stocker la durée actuelle et totale de la vidéo.
 */
let current
let totalDuration

/**
 * Remplit les variables de durée de la vidéo lorsqu'elles sont disponibles.
 */
function fillDurationVariables() {
	if (Number.isNaN(video.duration)) return

	current = video.currentTime
	totalDuration = video.duration

	formatValue(current, timersDisplay[0])
	formatValue(totalDuration, timersDisplay[1])

	video.removeEventListener('loadeddata', fillDurationVariables)
	window.removeEventListener('load', fillDurationVariables)
}

/**
 * Formatte une valeur de temps en minutes et secondes et l'affiche dans un élément.
 *
 * @param {number} val - La valeur à formater en secondes.
 * @param {HTMLElement} element - L'élément où afficher la valeur formatée.
 */
function formatValue(val, element) {
	const currentMin = Math.trunc(val / 60)
	let currentSec = Math.trunc(val % 60)

	if (currentSec < 10) {
		currentSec = `0${currentSec}`
	}

	element.textContent = `${currentMin}:${currentSec}`
}

const progress = document.querySelector('.progress')

video.addEventListener('timeupdate', handleTimeUpdate)

/**
 * Met à jour la progression de la vidéo, la durée actuelle et vérifie si la vidéo est terminée.
 */
function handleTimeUpdate() {
	current = video.currentTime

	formatValue(current, timersDisplay[0])

	const progressPosition = current / totalDuration
	progress.style.transform = `scaleX(${progressPosition})`

	if (video.ended) {
		togglerImg.src = 'ressources/play.svg'
	}
}

const muteBtn = document.querySelector('.mute-btn')
const muteIcon = document.querySelector('.mute-btn img')

muteBtn.addEventListener('click', handleMute)

function handleMute() {
	if (video.muted) {
		video.muted = false
		muteIcon.src = 'ressources/unmute.svg'
	} else {
		video.muted = true
		muteIcon.src = 'ressources/mute.svg'
	}
}

const volumeSlider = document.querySelector('.volume-slider')

volumeSlider.addEventListener('input', handleVolumeModification)

video.volume = volumeSlider.value / 100
/**
 * Gère la modification du volume de la vidéo.
 */
function handleVolumeModification() {
	video.volume = volumeSlider.value / 100
	if (video.volume === 0) {
		muteIcon.src = 'ressources/mute.svg'
	} else {
		muteIcon.src = 'ressources/unmute.svg'
	}
}

const progressBar = document.querySelector('.progress-bar')

/**
 * Récupère les dimensions de la barre de progression.
 */
let rect = progressBar.getBoundingClientRect()
let largeur = rect.width

/**
 * Ajoute un écouteur d'événements pour gérer le redimensionnement de la fenêtre.
 */
window.addEventListener('resize', handleResize)

/**
 * Met à jour les dimensions de la barre de progression lors du redimensionnement de la fenêtre.
 */
function handleResize() {
	rect = progressBar.getBoundingClientRect()
	largeur = rect.width
}

/**
 * Ajoute un écouteur d'événements pour gérer la navigation dans la vidéo en cliquant sur la barre de progression.
 */
progressBar.addEventListener('click', handleProgressNavigation)

/**
 * Gère la navigation dans la vidéo en fonction de la position cliquée sur la barre de progression.
 *
 * @param {MouseEvent} e - L'objet d'événement représentant l'événement de clic de la souris.
 */
function handleProgressNavigation(e) {
	const x = e.clientX - rect.left
	const widthPercent = x / largeur
	video.currentTime = video.duration * widthPercent
}

const fullScreenToggler = document.querySelector('.fullscreen-toggler')
const videoContainer = document.querySelector('.video-container')

video.addEventListener('dblclick', toggleFullScreen)
fullScreenToggler.addEventListener('click', toggleFullScreen)

/**
 * Gère le passage en mode plein écran ou la sortie du mode plein écran.
 */
function toggleFullScreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen()
	} else {
		videoContainer.requestFullscreen()
	}
}
