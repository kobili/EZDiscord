import fs from 'node:fs';
import path from 'node:path';

export class PrintWriter {
	filePath: string; // filename

	constructor(targetFileName: string) {
		this.filePath = targetFileName;

		fs.writeFileSync(targetFileName, '');
	}

	/**
	 * Prints a string to target file and terminates the line
	 * @param text: text to be printed to output file
	 */
	println(text: string) {
		fs.appendFileSync(path.resolve(this.filePath), `${text}\n`);
	}

	/**
	 * Writes a string to the output file
	 * @param text: text to be written
	 */
	write(text: string) {
		fs.appendFileSync(path.resolve(this.filePath), text);
	}
}
