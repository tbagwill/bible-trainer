// UTILS
export function randomTrivia() {
	const size = triviaQuestions.length;
	const res = Math.floor(Math.random() * size);
	return res;
}

export function shuffleMemoryQuestion(array) {
	let counter = array.answers.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array.answers[counter];
		array.answers[counter] = array.answers[index];
		array.answers[index] = temp;
	}

	return array;
}

// DATA
export const triviaQuestions = [
	{
		question: 'For God so loved the world...',
		answers: [
			{
				response: '...He gave his only son..',
				correct: true,
				status: 'success'
			},
			{
				response: '...He flooded the Earth..',
				correct: false,
				status: 'error'
			},
			{
				response: '...He cast out the sins of the world..',
				correct: false,
				status: 'error'
			},
			{
				response: '...He took the men out of the desert..',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'What sign did God show to remind us He will never flood the Earth again?',
		answers: [
			{
				response: 'The Rainbow',
				correct: true,
				status: 'success'
			},
			{
				response: 'A donkey',
				correct: false,
				status: 'error'
			},
			{
				response: 'His son, Jesus',
				correct: false,
				status: 'error'
			},
			{
				response: 'Happy Hour',
				correct: false,
				status: 'error'
			}
		]
	}
];
