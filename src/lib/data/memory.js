// UTILS
export function randomMemoryVerse() {
	const size = memoryVerses.length;
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
export const memoryVerses = [
	{
		question: 'For God so loved the world ___',
		answers: [
			{
				response: 'that He gave his only and only son..',
				correct: true,
				status: 'success'
			},
			{
				response: 'that He flooded the Earth..',
				correct: false,
				status: 'error'
			},
			{
				response: 'that He cast out the sins of the world..',
				correct: false,
				status: 'error'
			},
			{
				response: 'that He took saved the men of the desert..',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'In the beginning God ___',
		answers: [
			{
				response: 'created the heavens and the earth.',
				correct: true,
				status: 'success'
			},
			{
				response: 'told Adam not to eat of the forbidden fruit.',
				correct: false,
				status: 'error'
			},
			{
				response: 'banished the angel Lucifer to rule over hell. ',
				correct: false,
				status: 'error'
			},
			{
				response: 'flooded the Earth to cleanse it.',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'I have hidden your word in my heart ___',
		answers: [
			{
				response: 'that I might not sin against you.',
				correct: true,
				status: 'success'
			},
			{
				response: 'and so my heart is full with life.',
				correct: false,
				status: 'error'
			},
			{
				response: 'to finally become burdenless in life, troubled by nothing.',
				correct: false,
				status: 'error'
			},
			{
				response: 'not deceived by the lies of a wicked tongue.',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'Your word is a lamp at my feet ___',
		answers: [
			{
				response: 'a light on my path.',
				correct: true,
				status: 'success'
			},
			{
				response: 'shining brightly through the dark night.',
				correct: false,
				status: 'error'
			},
			{
				response: 'who could not see the light?. ',
				correct: false,
				status: 'error'
			},
			{
				response: 'and so I walk with courage through evil.',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'Trust in the LORD with all your heart ___',
		answers: [
			{
				response: 'and lean not on your own understanding.',
				correct: true,
				status: 'success'
			},
			{
				response: 'but do not be righteous by pride.',
				correct: false,
				status: 'error'
			},
			{
				response: 'and forgive your neighbor as you have been forgiven.',
				correct: false,
				status: 'error'
			},
			{
				response: 'so then you can soar with grace therefore gifted by the LORD.',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: '"I am the way, the truth and the life. ___ "',
		answers: [
			{
				response: 'No one comes to the Father except through me.',
				correct: true,
				status: 'success'
			},
			{
				response: 'Only through me should one find humility.',
				correct: false,
				status: 'error'
			},
			{
				response: 'Do not be tempted to run towards earthly desires.',
				correct: false,
				status: 'error'
			},
			{
				response: 'Only a fool would give focus to the lies of Satan',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'For all have sinned and fall short of the glory of God.',
		answers: [
			{
				response: 'Romans 3:23',
				correct: true,
				status: 'success'
			},
			{
				response: 'John 7:19',
				correct: false,
				status: 'error'
			},
			{
				response: '1 Corinthians 4:7',
				correct: false,
				status: 'error'
			},
			{
				response: 'Phillipians 9:3',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'For the wages of sin is death, ___',
		answers: [
			{
				response: 'but the gift of God is eternal life...',
				correct: true,
				status: 'success'
			},
			{
				response: 'and tormeting in fire for all of eternity...',
				correct: false,
				status: 'error'
			},
			{
				response: 'but Jesus has defeated death for our sake...',
				correct: false,
				status: 'error'
			},
			{
				response: 'a gift sought by fools who see less than the blind...',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'I can do all things through Christ who strengthens me.',
		answers: [
			{
				response: 'Phillipians 4:13',
				correct: true,
				status: 'success'
			},
			{
				response: 'Ruth 3:6',
				correct: false,
				status: 'error'
			},
			{
				response: 'Psalms 24:56',
				correct: false,
				status: 'error'
			},
			{
				response: 'Luke 5:12',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'Jesus Christ is the same yesterday and today and forever.',
		answers: [
			{
				response: 'Hebrews 13:8',
				correct: true,
				status: 'success'
			},
			{
				response: 'Ephesians 6:13',
				correct: false,
				status: 'error'
			},
			{
				response: 'John 13:25',
				correct: false,
				status: 'error'
			},
			{
				response: 'Mattheh 2:19',
				correct: false,
				status: 'error'
			}
		]
	},
	{
		question: 'For it is by grace you have been saved, through faith ___',
		answers: [
			{
				response: 'and this is not from yourselves, it is the gift of God.',
				correct: true,
				status: 'success'
			},
			{
				response: 'and grace provided by Jesus Christ, King of Kings.',
				correct: false,
				status: 'error'
			},
			{
				response: 'alone, not of your works or of your sacrifice.',
				correct: false,
				status: 'error'
			},
			{
				response: 'and love, provided by Christ Jesus.',
				correct: false,
				status: 'error'
			}
		]
	}
];
