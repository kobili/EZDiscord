import { ASTVisitor } from '../../visitors/ASTVisitor';
import { StatementBlock } from '../StatementBlock';
import { Statement } from '../Statement';

export abstract class Loop extends Statement {
	protected constructor(private readonly _loopBlock: StatementBlock) {
		super();
	}

	get loopBlock() {
		return this._loopBlock;
	}

	abstract accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U;
}
