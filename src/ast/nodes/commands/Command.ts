import { ASTVisitor } from '../../visitors/ASTVisitor';
import { Argument } from './Argument';
import { Statement } from '../Statement';
import { StatementBlock } from '../StatementBlock';

export class Command implements Statement {
	constructor(
		private readonly _name: string,
		private readonly _statementBlock: StatementBlock,
		private readonly _args: Argument[]
	) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitCommand(this, params);
	}

	get name() {
		return this._name;
	}

	get args() {
		return this._args;
	}

	/**
	 * Discord Js doesn't allow upper case letters in slash command names or option names. This function will replace all uppercase letters in a name with a hyphen and the lowercase character
	 * ex: testCommand -> test-command
	 */
	get formattedName() {
		return this._name.replaceAll(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
	}

	get statementBlock() {
		return this._statementBlock;
	}
}
