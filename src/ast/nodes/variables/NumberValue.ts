import { ASTVisitor } from '../../visitors/ASTVisitor';
import { VarType } from './VarType';

export class NumberValue extends VarType<number> {
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitNumberVarValue(this, params);
	}
}
