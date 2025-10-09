const choiceEls = [ ...document.querySelectorAll('.choice') ];
const computerChoiceEl = document.querySelector('.computer_choice');
const userChoiceEl = document.querySelector('.user_choice');
const resultEl = document.querySelector('.result');
const gamesEl = document.querySelector('#games');
const winEl = document.querySelector('#win');
const tieEl = document.querySelector('#tie');
const lossEl = document.querySelector('#loss');
const winrateEl = document.querySelector('#winrate');
const resetStatsEl = document.querySelector('.reset_stats');
const nullableStatisticEls = document.querySelectorAll('.nullable_statistic');
const switchEl = document.querySelector('.switch');

const choices = [ 'rock', 'scissors', 'paper' ];
const getRandomNumber = (min = 0, max = 2) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getComputerChoice = () => choices[getRandomNumber()];

resetStatsEl.addEventListener('click', () => {
	nullableStatisticEls.forEach(nullableStatisticEl => {
		nullableStatisticEl.innerText = '0';
	});
	winrateEl.innerText = '-';
});

switchEl.addEventListener('click', () => {
	document.documentElement.classList.toggle('dark');
});

const rules = {
	rock: {
		translation: 'Камень',
		beats: 'scissors',
	},
	scissors: {
		translation: 'Ножницы',
		beats: 'paper',
	},
	paper: {
		translation: 'Бумага',
		beats: 'rock'
	}
};
const resultTranslation = {
	tie: 'Ничья',
	win: 'Вы победили',
	loss: 'Вы проиграли'
};
choiceEls.forEach(choiceEl => {
	console.log(`choiceEl`, choiceEl);
	choiceEl.addEventListener('click', e => {
		const userChoice = choiceEl.id;

		const computerChoice = getComputerChoice();

		computerChoiceEl.innerText = `Выбор компьютера: ${ rules[computerChoice].translation }`;
		userChoiceEl.innerText = `Ваш выбор: ${ rules[userChoice].translation }`;

		const result = (() => {
			if (userChoice === computerChoice) return 'tie';
			if (rules[userChoice].beats === computerChoice) return 'win';
			return 'loss';
		})();

		resultEl.innerText = resultTranslation[result];

		const statEl = (() => {
			if (result === 'tie') return tieEl;
			if (result === 'win') return winEl;
			if (result === 'loss') return lossEl;
		})();

		const currentStat = parseInt(statEl.innerText);
		statEl.innerText = currentStat + 1;

		const totalGamesCount = parseInt(lossEl.innerText) + parseInt(winEl.innerText) + parseInt(tieEl.innerText);

		gamesEl.innerText = totalGamesCount;

		const totalWinsCount = parseInt(winEl.innerText);

		const winrate = Math.round((totalWinsCount / totalGamesCount) * 100) + '%';

		winrateEl.innerText = winrate;

		const statistics = {
			games: totalGamesCount,
			win: totalWinsCount,
			loss: lossEl.innerText,
			tie: tieEl.innerText,
			winrate
		};

		localStorage.setItem('statistics', JSON.stringify(statistics));
	});
});

const statistics = JSON.parse(localStorage.getItem('statistics'));
if (statistics) {
	for (const key in statistics) {
		const valueEl = document.querySelector(`#${ key }`);
		valueEl.innerText = statistics[key];
	}
}

// window.requestAnimationFrame(() => {
//
// });




