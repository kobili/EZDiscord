import { Statement } from '../Statement';
import { ASTVisitor } from '../../visitors/ASTVisitor';
import { StatementBlock } from '../StatementBlock';

export class Conditional extends Statement {
	constructor(
		private readonly _varName: string,
		private readonly _ifBlock: StatementBlock,
		private readonly _elseBlock: StatementBlock | undefined
	) {
		super();
	}

	get varName() {
		return this._varName;
	}

	get ifBlock() {
		return this._ifBlock;
	}

	get elseBlock() {
		return this._elseBlock;
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitConditional(this, params);
	}
}
