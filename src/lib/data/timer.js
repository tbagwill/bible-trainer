export class Timer {
	constructor(DURATION) {
		this.DURATION = DURATION;
		this.INTERVAL = 1000;
		this.REMAINING = DURATION;
		let LOOP = null;
	}

	status() {
		// console.log(this.REMAINING);
		return this.REMAINING;
	}

	run() {
		if (this.REMAINING <= 0) {
			this.stop();
		} else {
			this.REMAINING--;
		}
	}

	start() {
		console.log('Timer Info: ', this.DURATION, this.INTERVAL);
		this.LOOP = setInterval(() => this.run(), this.INTERVAL);
	}

	stop() {
		clearInterval(this.LOOP);
	}

	reset() {
		this.stop();
		this.REMAINING = this.DURATION;
		this.start();
	}
}
