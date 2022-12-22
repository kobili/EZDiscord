import { ASTVisitor } from '../../visitors/ASTVisitor';
import { Statement } from '../Statement';
import { FunctionCall } from '../FunctionCall';
import { VarType } from './VarType';
import { BinaryExpression } from '../binary/BinaryExpression';

export class Variable<Y> extends Statement {
	constructor(
		private readonly _name: string,
		private readonly _value: VarType<Y> | FunctionCall | BinaryExpression,
		private readonly _isDeclaration: boolean
	) {
		super();
	}

	get name() {
		return this._name;
	}

	get value() {
		return this._value;
	}

	get isDeclaration() {
		return this._isDeclaration;
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitVariable(this, params);
	}
}
