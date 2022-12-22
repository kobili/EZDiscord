import { ASTVisitor } from '../visitors/ASTVisitor';

export interface ASTNode {
	accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U;
}
