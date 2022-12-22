import { ASTVisitor } from '../../visitors/ASTVisitor';
import { ASTNode } from '../ASTNode';

export class GuildId implements ASTNode {
	constructor(private _values: string[]) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitGuildId(this, params);
	}

	get values() {
		return this._values;
	}
}
