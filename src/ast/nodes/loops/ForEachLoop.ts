import { Loop } from './Loop';
import { ASTVisitor } from '../../visitors/ASTVisitor';
import { StatementBlock } from '../StatementBlock';

export class ForEachLoop extends Loop {
	constructor(private readonly _loopVarName: string, private readonly _arrayName: string, _loopBlock: StatementBlock) {
		super(_loopBlock);
	}

	get loopVarName() {
		return this._loopVarName;
	}

	get arrayName() {
		return this._arrayName;
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitForEachLoop(this, params);
	}
}
