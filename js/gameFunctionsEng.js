let currectAnswer = 0;
let categoriesCounter = 0;
let currentCategory = [];
let scoreCounter = 5;
let scores = 0;
let topScoresDB = [];
let correctSound = new Audio('./sounds/correct.wav')
let wrondSound = new Audio('./sounds/wrong.wav')
const answersListTab = document.querySelector('.answers-tab');
const mainPageBtn = document.querySelector('.main-page-btn').addEventListener('click', (e) => {
	e.preventDefault();
	mainWindow.style = 'height: 100vh'
	gameSection.classList.add('hide-page');
	librarySection.classList.add('hide-page')
	promoSection.classList.remove('hide-page');
})
const nextQuestionBtn = document.querySelector('.next-round-btn');
nextQuestionBtn.setAttribute('disabled', 'true')
nextQuestionBtn.classList.add('disabled-btn')
const categoriesItems = document.querySelectorAll('.cat-list-item');
const birdInfoCard = document.querySelector('.bird-info-card');
const questionTab = document.querySelector('.question-tab');
const scoresItem = document.querySelector('.scores');
const resultModal = document.querySelector('.result-modal');

function resetGame() {
	selectedBird = 0;
	currectAnswer = 0;
	categoriesCounter = 0;
	currentCategory = [];
	scoreCounter = 5;
	scores = 0;
	birdInfoCard.innerHTML = ``
	resultModal.classList.add('hide-page')
	showScores(scores)
	changeCategory(categoriesCounter)
	getCategory(categoriesCounter)
	createAnswersList(currentCategory)
	updateAnswersEvents()
	currectAnswer = getRandomBird()
	showQuestion()
	nextQuestionBtn.setAttribute('disabled', 'true')
	nextQuestionBtn.classList.add('disabled-btn')
}

nextQuestionBtn.addEventListener('click', (e) => {
	if(document.body.clientWidth < 550) {
		window.scrollTo(0,0)
	}
	e.preventDefault()
	scoreCounter = 5;
	categoriesCounter++;
	changeCategory(categoriesCounter)
	getCategory(categoriesCounter)
	createAnswersList(currentCategory)
	updateAnswersEvents()
	currectAnswer = getRandomBird()
	showQuestion()
	soundOn()
	nextQuestionBtn.setAttribute('disabled', 'true')
	nextQuestionBtn.classList.add('disabled-btn')
})

function changeCategory(num) {
	categoriesItems.forEach((item) => {
		item.classList.remove('current-item')
	})
	categoriesItems[num].classList.add('current-item')
}

function getCategory(num) {
	currentCategory = [];
	currentCategory.push(birdsDataEn[num])

	return currentCategory;
}

function createAnswersList(array) {
	answersListTab.innerHTML = `
	<ul>
	<li id="0" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][0].name}</li>
	<li id="1" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][1].name}</li>
	<li id="2" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][2].name}</li>
	<li id="3" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][3].name}</li>
	<li id="4" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][4].name}</li>
	<li id="5" class="answers-item">
	<i class="fa-solid fa-circle"></i>
		${array[0][5].name}</li>
</ul>
	`
}

function getBirdInformation(array, num) {
	selectedBird = array[categoriesCounter][num];
	return selectedBird;
}

function updateAnswersEvents() {
	const answersItems = document.querySelectorAll('.answers-item');

	answersItems.forEach((item) => {
		item.addEventListener('click', (e) => {
			getBirdInformation(birdsDataEn, e.target.id)
			birdInfoCard.innerHTML = `
			<div class="bird">
				<img src="${selectedBird.image}" alt="" class="bird-img">
				<div class="bird-info">
					<p class="bird-name">${selectedBird.name}</p>
					<p class="bird-name-eng">${selectedBird.species}</p>
					<div class="bird-sound">
						<audio controls> 
							<source src="${selectedBird.audio}"> 
						</audio>
					</div>
				</div>
			</div>
			<div class="bird-descr">
			${selectedBird.description}
			</div>
			`
			checkAnswer(e.target, (parseInt(e.target.id) + 1 == currectAnswer.id))
		})
	})
}

function getRandomBird() {
	let rnd = Math.floor(Math.random() * 6)
	return birdsDataEn[categoriesCounter][rnd];
}

function soundOff() {
	correctSound = new Audio('./sounds/sound-off.wav');
	wrondSound = new Audio('./sounds/sound-off.wav');
}

function soundOn() {
	correctSound = new Audio('./sounds/correct.wav')
	wrondSound = new Audio('./sounds/wrong.wav')
}

function checkAnswer(item, bool) {
	const dots = document.querySelectorAll('.fa-circle');
	if (bool) {
		dots[item.id].style = 'color: #42AE14'
		correctSound.currentTime = 0;
		correctSound.play()
		showAnswer()
		nextQuestionBtn.removeAttribute('disabled')
		nextQuestionBtn.classList.remove('disabled-btn')
		scores += scoreCounter;
		showScores(scores)
		soundOff()
		if (categoriesCounter == 5) {
			saveResult(scores, playerName)
			// showResult(scores)
			refreshResultList()
			gameSection.classList.add('hide-page');
			mainWindow.style = 'height: 100vh';
			window.scrollTo(0, 0);
			resultsSection.classList.remove('hide-page')
		}
	} else {
		dots[item.id].style = 'color: #FF4040'
		wrondSound.currentTime = 0;
		wrondSound.play()
		if (scoreCounter != 1) {
			scoreCounter--;
		} else {
			scoreCounter = 1;
		}
	}
}

function showQuestion() {
	questionTab.innerHTML = `
	<img src="./img/hidden-bird.jpg" alt="" class="question-tab-image">
	<div class="question-descr">
		<p>What kind of bird is this?</p>
		<div class="question-sound-controls">
		<audio controls> 
			<source src="${currectAnswer.audio}"> 
		</audio>
		</div>
	</div>
	`
}

function showAnswer() {
	questionTab.innerHTML = `
	<img src="${currectAnswer.image}" alt="" class="question-tab-image">
	<div class="question-descr">
		<p>Correct! It's ${currectAnswer.name.toLowerCase()}</p>
		<div class="question-sound-controls">
		<audio controls> 
			<source src="${currectAnswer.audio}"> 
		</audio>
		</div>
	</div>
	`
}

function showScores(num) {
	scoresItem.innerHTML = `
	Total scores: ${num}
	`
}

function showResult(num) {
	resultModal.classList.remove('hide-page')
	resultModal.innerHTML = `
	You complete quiz!<br><br>Your scores: ${num} из 30.
	<br><br>
	<button class="repeat-game-btn">Play again</button>
	`

	document.querySelector('.repeat-game-btn').addEventListener('click', (e) => {
		resetGame()
	})
}

function saveResult(num,name) {
	let playerObj = {
		name: name ? name : 'Anonimous',
		score: num,
	}
	topScoresDB.push(playerObj)
	localStorage.setItem('resultsDB', JSON.stringify(topScoresDB))
}

function refreshResultList() {
	const resultBlock = document.querySelector('.results-block');
	if (localStorage.getItem('resultsDB') != null) {
		let topScores = JSON.parse(localStorage.getItem('resultsDB'))
		resultBlock.innerHTML = ``;
		for (let i = 0; i < topScores.length; i++) {
			const resultItem = document.createElement('div');
			resultItem.className = 'result';
			resultItem.innerHTML = `
			<p>${i+1}</p>
			<p>Name: <span>${topScores[i].name}</span></p>
			<p>Scores: <span>${topScores[i].score}</span></p>
			`
			resultBlock.appendChild(resultItem)
		}
	} else {
		const resultItem = document.createElement('div');
		resultItem.className = 'result';
		resultItem.innerHTML = `
		<p>Results list is empty</p>
		`
		resultBlock.appendChild(resultItem)
	}


}

refreshResultList()
getCategory(0)
createAnswersList(currentCategory)
updateAnswersEvents()
currectAnswer = getRandomBird()
showQuestion()