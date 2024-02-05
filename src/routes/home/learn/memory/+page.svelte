<script>
	import { memoryVerses, randomMemoryVerse, shuffleMemoryQuestion } from '$lib/data/memory';
	import { ProgressBar, RangeSlider, RadioGroup } from '@skeletonlabs/skeleton';
	import { fade, fly, scale } from 'svelte/transition';
	import { Timer } from '$lib/data/timer';

	const correctSound = new Audio('/memory_assets/score-1.mp3');
	const wrongSound = new Audio('/memory_assets/wrong-1.mp3');
	const gameOverSound = new Audio('/memory_assets/gameover-1.wav');

	let GAME_LENGTH = 5;
	let DIFFICULTY = 1;
	let POINTS = 0;
	let INCREMENT = 10 * DIFFICULTY;
	$: MAX_POINTS = GAME_LENGTH * DIFFICULTY * 10;

	let GUESSES = 0;

	let CURR_QUESTION = shuffleMemoryQuestion(memoryVerses[randomMemoryVerse()]);
	console.log( "current question", CURR_QUESTION);
	let ANSWER_HIDDEN = true;
	let ANSWER_DISABLED = false;

	let GAME_STATE = ['READY', 'PLAYING', 'FINISHED'];
	let STAGE_STATE = ['UNANSWERED', 'ANSWERED'];

	let CURR_GAME_STATE = GAME_STATE[0];
	let CURR_STAGE_STATE = STAGE_STATE[0];

	function makeGuess(guess, index) {
		//  Animations?
		const boxes = document.getElementsByClassName('guess-box');
		// Declare guess was made
		GUESSES++;
		CURR_STAGE_STATE = STAGE_STATE[1];
		ANSWER_HIDDEN = false;
		ANSWER_DISABLED = true;
		// Check response
		if (guess.correct) {
			POINTS += INCREMENT;
			correctSound.play();
		} else {
			wrongSound.play();
		}
		// Reset after 2.5 seconds
		setTimeout(() => {
			ANSWER_HIDDEN = true;
			ANSWER_DISABLED = false;
			CURR_STAGE_STATE = STAGE_STATE[0];
			CURR_QUESTION = shuffleMemoryQuestion(memoryVerses[randomMemoryVerse()]);
		}, '2500');
	}

	function resetGame() {
		setTimeout(() => {
			CURR_GAME_STATE = GAME_STATE[0];
			CURR_QUESTION = shuffleMemoryQuestion(memoryVerses[randomMemoryVerse()]);
			CURR_STAGE_STATE = STAGE_STATE[0];
			ANSWER_HIDDEN = true;
			ANSWER_DISABLED = false;
			GUESSES = 0;
			POINTS = 0;
		}, '100');
	}

	function resetCurrentGame() {
		setTimeout(() => {
			CURR_GAME_STATE = GAME_STATE[1];
			CURR_QUESTION = shuffleMemoryQuestion(memoryVerses[randomMemoryVerse()]);
			CURR_STAGE_STATE = STAGE_STATE[0];
			ANSWER_HIDDEN = true;
			ANSWER_DISABLED = false;
			POINTS = 0;
			GUESSES = 0;
		}, '100');
	}

	$: if (GUESSES >= GAME_LENGTH)
		setTimeout(() => {
			CURR_GAME_STATE = GAME_STATE[2];
			gameOverSound.play();
		}, '2500');
	$: format = (status) => (ANSWER_HIDDEN ? 'variant-filled-primary ' : `variant-filled-${status}`);
	$: disabled = ANSWER_DISABLED ? 'disabled' : '';
</script>

{#if CURR_GAME_STATE === 'READY'}
	<!-- READY SCREEN -->
	<div class="w-full space-y-4 p-4" in:fly={{ x: -120, delay: 100 }}>
		<h3 class="w-full text-3xl font-bold">Memory Verses</h3>
		<hr class="w-full bg-surface-700" />
	</div>
	<div class="flex flex-col w-full h-1/2 items-center justify-center space-y-4">
		<div
			class="card flex flex-col w-11/12 md:w-3/4 p-4 items-center space-y-4"
			in:scale={{ delay: 100 }}
		>
			<h3 class="w-full text-3xl text-left font-semibold">Game Settings</h3>
			<br />
			<div class="flex w-full align-bottom items-end">
				<h3 class="w-full text-xl text-left font-semibold">Number of Questions</h3>
				<span class="label w-full text-right text-md font-semibold">{GAME_LENGTH} / 25</span>
			</div>
			<div class="w-full">
				<RangeSlider name="game-length" min="1" max="25" bind:value={GAME_LENGTH} />
			</div>

			<button
				class="btn variant-filled-primary w-1/2"
				on:click={() => (CURR_GAME_STATE = GAME_STATE[1])}
			>
				Let's Play
			</button>
		</div>
	</div>

	<!-- PLAYING THE GAME -->
{:else if CURR_GAME_STATE === 'PLAYING'}
	<ProgressBar
		label="Progress Bar"
		meter="bg-gradient-to-r variant-gradient-primary-secondary"
		track="bg-surface-500"
		value={GUESSES}
		max={GAME_LENGTH}
		rounded="rounded-r-full"
	/>
	<div class="flex flex-col w-full p-4">
		<div
			class="card variant-ringed-primary question-box text-xl font-bold p-4 mb-8"
			in:fade={{ delay: 100 }}
		>
			{CURR_QUESTION.question}
		</div>
		<div class="flex flex-col justify-center items-center space-y-4" in:scale={{ delay: 100 }}>
			{#each CURR_QUESTION.answers as answer, count}
				<button
					class="btn {format(
						answer.status
					)} rounded-lg w-11/12 md:w-3/4 text-lg font-semibold guess-box"
					value={count}
					{disabled}
					on:click={() => makeGuess(answer, count)}
				>
					<h3 class="whitespace-pre-wrap">
						{answer.response}
					</h3>
				</button>
			{/each}
		</div>
	</div>
{:else if CURR_GAME_STATE === 'FINISHED'}
	<!-- modal -->
	<div class="w-full flex justify-center p-4">
		<div class="card flex flex-col w-11/12 md:w-3/4 p-4 md:p-6" in:scale={{ delay: 100 }}>
			<div class="w-full text-3xl text-center font-bold">Game Over</div>
			<hr class="bg-primary-500 rounded-full p-0.5 mt-2 mb-2" />
			<div class="w-full text-xl text-center font-bold">Score: {POINTS} / {MAX_POINTS}</div>
			<br />
			{#if POINTS < MAX_POINTS / 2}
				<div class="w-full text-xl text-center font-bold">
					Oh I'm sure you can do better than that!
				</div>
			{:else if POINTS === MAX_POINTS}
				<div class="w-full text-xl text-center font-bold">
					Wow! You really know your stuff! Try some harder questions!
				</div>
			{:else}
				<div class="w-full text-xl text-center font-bold">
					Nice one! You did great! Think you can do better?
				</div>
			{/if}
			<br />
			<div class="flex flex-row w-full justify-evenly px-4 space-x-4">
				<button
					class="btn variant-outline-tertiary w-full text-xl text-center font-bold p-4"
					on:click={() => resetGame()}>Game Settings</button
				>
				<button
					class="btn variant-filled-secondary w-full text-xl text-center font-bold p-4"
					on:click={() => resetCurrentGame()}>Play Again</button
				>
			</div>
		</div>
	</div>
{/if}
