import { ASTVisitor } from '../../visitors/ASTVisitor';
import { VarType } from './VarType';

export class BooleanValue extends VarType<boolean> {
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U {
		return visitor.visitBooleanVarValue(this, params);
	}
}
