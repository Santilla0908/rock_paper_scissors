const choiceEls = [ ...document.querySelectorAll('.choice') ];
console.log(`choiceEls`, choiceEls);

const computerChoice = 'rock';

const resultEl = document.querySelector('.result');
console.log(`resultEl`, resultEl);

let result;

const winEl = document.querySelector('#win');
const tieEl = document.querySelector('#tie');
const lossEl = document.querySelector('#loss');
const winrateEl = document.querySelector('#winrate');
console.log(`lossEl.innerText`, lossEl.innerText);

choiceEls.forEach(choiceEl => {
	console.log(`choiceEl`, choiceEl);
	choiceEl.addEventListener('click', e => {
		const choice = choiceEl.id;
		console.log(`choice`, choice);

		if (choice === computerChoice) {
			resultEl.innerText = 'Ничья';
			result = 'tie';
		} else if (choice === 'paper') {
			resultEl.innerText = 'Вы победили';
			result = 'win';
		} else {
			resultEl.innerText = 'Вы проиграли';
			result = 'loss';
		}

		const statEl = (() => {
			if (result === 'tie') return tieEl;
			if (result === 'win') return winEl;
			if (result === 'loss') return lossEl;
		})();

		const currentStat = parseInt(statEl.innerText);
		statEl.innerText = currentStat + 1;

		const totalGamesCount = parseInt(lossEl.innerText) + parseInt(winEl.innerText) + parseInt(tieEl.innerText);
		console.log(`totalGamesCount`, totalGamesCount);

		const totalWinsCount = parseInt(winEl.innerText);

		const winPercentage = (totalWinsCount / totalGamesCount) * 100;
		console.log(`winPercentage`, winPercentage);

		winrateEl.innerText = Math.round(winPercentage) + '%';
	});
});






