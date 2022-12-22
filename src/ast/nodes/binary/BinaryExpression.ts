import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';
import { BinaryAtom, BinaryCompare, BinaryExpressionType, BinaryOperator } from './types';

export class BinaryExpression implements ASTNode {
	constructor(
		private readonly _type: BinaryExpressionType,
		private readonly _value: BinaryExpression | BinaryAtom,
		private readonly _rightExpression: BinaryRightExpression | undefined
	) {}
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBinaryExpression(this, params);
	}

	get type() {
		return this._type;
	}

	get value() {
		return this._value;
	}

	get rightExpression() {
		return this._rightExpression;
	}
}

// defined here to avoid circular dependencies
export class BinaryRightExpression implements ASTNode {
	constructor(
		private readonly _binaryFunction: BinaryCompare | BinaryOperator,
		private readonly _value: BinaryExpression | BinaryAtom,
		private readonly _rightExpression: BinaryRightExpression | undefined
	) {}
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBinaryRightExpression(this, params);
	}

	get binaryFunction() {
		return this._binaryFunction;
	}

	get value() {
		return this._value;
	}

	get rightExpression() {
		return this._rightExpression;
	}
}
