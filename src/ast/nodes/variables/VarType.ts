import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';

export abstract class VarType<Y> implements ASTNode {
	constructor(private readonly _value: Y) {}

	get value() {
		return this._value;
	}

	abstract accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U;
}
