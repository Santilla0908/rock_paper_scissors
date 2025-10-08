const choiceEls = [ ...document.querySelectorAll('.choice') ];
console.log(`choiceEls`, choiceEls);

const computerChoiceEl = document.querySelector('.computer_choice');
const userChoiceEl = document.querySelector('.user_choice');

const resultEl = document.querySelector('.result');
console.log(`resultEl`, resultEl);

const winEl = document.querySelector('#win');
const tieEl = document.querySelector('#tie');
const lossEl = document.querySelector('#loss');
const winrateEl = document.querySelector('#winrate');
console.log(`lossEl.innerText`, lossEl.innerText);

const resetStatsEl = document.querySelector('.reset_stats');

resetStatsEl.addEventListener('click', () => {
	winEl.innerText = 0;
	tieEl.innerText = 0;
	lossEl.innerText = 0;
	winrateEl.innerText = '-';
});

const switchEl = document.querySelector('.switch');

switchEl.addEventListener('click', () => {
	document.documentElement.classList.toggle('dark');
});

const getRandomNumber = (min = 0, max = 2) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const choices = [ 'rock', 'scissors', 'paper' ];

const getComputerChoice = () => choices[getRandomNumber()];

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
		console.log(`userChoice`, userChoice);

		const computerChoice = getComputerChoice();
		console.log(`computerChoice`, computerChoice);

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

		const totalWinsCount = parseInt(winEl.innerText);

		const winPercentage = (totalWinsCount / totalGamesCount) * 100;

		winrateEl.innerText = Math.round(winPercentage) + '%';
	});
});






