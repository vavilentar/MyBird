const promoSection = document.querySelector('.promo');
const gameSection = document.querySelector('.game-page');
const librarySection = document.querySelector('.birds-library');
const resultsSection = document.querySelector('.result-page');
const startGameBtns = document.querySelectorAll('.start-game-btn');
const resultsBtn = document.querySelector('.top-results-btn');
const birdsLibraryBtn = document.querySelector('.birds-library-btn');
const newGameSound = new Audio('./sounds/new-game.wav')
const mainWindow = document.querySelector('.content-section');
const playerNameInput = document.querySelector('.player-name')
let playerName = '';

startGameBtns.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault;
		playerName = playerNameInput.value;
		resultModal.classList.add('hide-page')
		newGameSound.currentTime = 0;
		newGameSound.play()
		promoSection.classList.add('hide-page');
		librarySection.classList.add('hide-page')
		resultsSection.classList.add('hide-page')

		gameSection.classList.remove('hide-page');
		mainWindow.style = 'height: fit-content'
		resetGame()
	})
})

birdsLibraryBtn.addEventListener('click', (e) => {
	promoSection.classList.add('hide-page')
	gameSection.classList.add('hide-page')
	resultsSection.classList.add('hide-page')
	librarySection.classList.remove('hide-page')
	mainWindow.style = 'height:auto'
})

resultsBtn.addEventListener('click', (e) => {
	promoSection.classList.add('hide-page')
	gameSection.classList.add('hide-page')
	librarySection.classList.add('hide-page')
	resultsSection.classList.remove('hide-page')
	mainWindow.style = 'height:100vh'
})

fillLibrary(birdsDataEn)