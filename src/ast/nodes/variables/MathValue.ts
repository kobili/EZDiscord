import { ASTVisitor } from '../../visitors/ASTVisitor';
import { FunctionCall } from '../FunctionCall';
import { NumberValue } from './NumberValue';
import { VarNameValue } from './VarNameValue';
import { VarType } from './VarType';

export class MathValue extends VarType<string> {
	constructor(
		private readonly mathString: string,
		private readonly _mathAtoms: Array<NumberValue | VarNameValue | FunctionCall>
	) {
		super(mathString);
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitMathValue(this, params);
	}

	get mathAtoms() {
		return this._mathAtoms;
	}
}
