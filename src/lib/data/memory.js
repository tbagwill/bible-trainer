export function randomMemoryVerse() {
	const size = memoryVerses.length;
	const res = Math.floor(Math.random() * size);
	return res;
}

export const memoryVerses = [
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
