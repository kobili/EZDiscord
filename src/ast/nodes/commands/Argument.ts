import { VariableType } from '../../../util/ScopedSymbolTable';
import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';

export class Argument implements ASTNode {
	constructor(
		private readonly _name: string,
		private readonly _type: Exclude<VariableType, VariableType.Any | VariableType.Array | VariableType.Error>
	) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitArgument(this, params);
	}

	get name() {
		return this._name;
	}

	get type() {
		return this._type;
	}

	/**
	 * Discord Js doesn't allow upper case letters in slash command names or option names. This function will replace all uppercase letters in a name with a hyphen and the lowercase character
	 * ex: testArg -> test-arg
	 */
	get formattedName() {
		return this._name.replaceAll(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
	}
}
