import { ASTVisitor } from '../visitors/ASTVisitor';
import { VarType } from './variables/VarType';
import { Statement } from './Statement';

export enum BuiltInFunction {
	reply = 'reply',
	random = 'random',
	add = 'add',
	remove = 'remove',
	get = 'get',
	len = 'len',
	find = 'find',
	set = 'set',
	concat = 'concat',
}

export class FunctionCall extends Statement {
	constructor(
		private readonly _function: BuiltInFunction,
		private readonly _params: (VarType<string | boolean | number> | FunctionCall)[]
	) {
		super();
	}

	get function() {
		return this._function;
	}

	get params() {
		return this._params;
	}

	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBuiltInFunctionVarValue(this, params);
	}
}
