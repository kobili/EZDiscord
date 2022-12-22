import { Loop } from './Loop';
import { ASTVisitor } from '../../visitors/ASTVisitor';
import { StatementBlock } from '../StatementBlock';

export class WhileLoop extends Loop {
	constructor(private readonly _varName: string, _loopBlock: StatementBlock) {
		super(_loopBlock);
	}

	get varName() {
		return this._varName;
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitWhileLoop(this, params);
	}
}
