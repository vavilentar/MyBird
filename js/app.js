const promoSection = document.querySelector('.promo');
const gameSection = document.querySelector('.game-page');
const librarySection = document.querySelector('.birds-library')
const startGameBtns = document.querySelectorAll('.start-game-btn');
const birdsLibraryBtn = document.querySelector('.birds-library-btn');
const newGameSound = new Audio('./sounds/new-game.wav')
const mainWindow = document.querySelector('.content-section');

startGameBtns.forEach((item) => {
	item.addEventListener('click', (e) => {
		e.preventDefault;
		resultModal.classList.add('hide-page')
		newGameSound.currentTime = 0;
		newGameSound.play()
		promoSection.classList.add('hide-page');
		librarySection.classList.add('hide-page')
		gameSection.classList.remove('hide-page');
		mainWindow.style = 'height: 80vh'
		resetGame()
	})
})

birdsLibraryBtn.addEventListener('click', (e) => {
	promoSection.classList.add('hide-page')
	gameSection.classList.add('hide-page')
	librarySection.classList.remove('hide-page')
	mainWindow.style = 'height:auto'
})

fillLibrary(birdsData)
