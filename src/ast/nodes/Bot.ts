import { ASTVisitor } from '../visitors/ASTVisitor';
import { ASTNode } from './ASTNode';
import { Config } from './config/Config';
import { Statement } from './Statement';

export class Bot implements ASTNode {
	constructor(private readonly _config: Config, private readonly _statements: Statement[]) {}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBot(this, params);
	}

	get statements() {
		return this._statements;
	}

	get config() {
		return this._config;
	}
}
