import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';

export class Token implements ASTNode {
	constructor(private _value: string) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitToken(this, params);
	}

	get value() {
		return this._value;
	}
}
