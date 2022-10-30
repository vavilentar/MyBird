let card;

function getCard(array, a, b) {
	card = array[a][b]
}

function fillLibrary(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			getCard(array,i,j)
			const birdCard = document.createElement('div');
			birdCard.className = 'bird-lib-card';
			birdCard.innerHTML = `
			<div class="bird">
			<img src="${card.image}" alt="" class="bird-img">
			</div>
			<div class="bird-info">
				<p class="bird-name">${card.name}</p>
				<p class="bird-name-eng">${card.species}</p>
				<div class="bird-sound">
					<audio controls> 
						<source src="${card.audio}"> 
					</audio>
				</div>
				<div class="bird-descr">
				${card.description}
				</div>
			</div>
			`
			librarySection.appendChild(birdCard)
		}
	}
}