namespace DialogueData {
	export class Dialogue {
		public get JSON() { return JSON.stringify(this); }

		public static fromJSON(json: string) { return JSON.parse(json) as Dialogue; }

		constructor(
			public name: string,
			public ownerId: string,
			public lines: Line[]
		) {	}
	}

	export class Line {
		private _soundwave;
		private _nextLines: number[];

		public set soundWave(path: string) { this._soundwave = `SoundWave'/Game/${path}'`; }
		public get soundWave() { return this._soundwave.substr(16, this._soundwave.length - 18); }

		public addNext(line: Line) {
			if (this._nextLines.every(l => this._nextLines[l] !== line.index))
				this._nextLines.push(line.index);
		}

		public removeNext(line: Line) {
			if (this._nextLines.some(l => this._nextLines[l] === line.index))
				this._nextLines.splice(this._nextLines.indexOf(line.index), 1);
		}

		public getNextLine(index: number) { return this._nextLines[index]; }
		public nextLinesCount() { return this._nextLines.length; }
		
		public get JSON() { return JSON.stringify(this); }

		public static fromJSON(json: string) { return JSON.parse(json) as Line; }

		constructor(
			public readonly parentDialogue: Dialogue,
			public index: number,
			public text: string,
			public shortText: string,
			public isPlayerLine: boolean,
			public isImportant: boolean,
			public conditions: string[],
			soundPath: string
		) { this.soundWave = soundPath;	}
	}
}
