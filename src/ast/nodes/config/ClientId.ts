import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';

export class ClientId implements ASTNode {
	constructor(private _value: string) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitClientId(this, params);
	}

	get value() {
		return this._value;
	}
}
