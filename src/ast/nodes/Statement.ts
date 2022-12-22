import { ASTVisitor } from '../visitors/ASTVisitor';
import { ASTNode } from './ASTNode';

export abstract class Statement implements ASTNode {
	abstract accept<T, U>(visitor: ASTVisitor<T, U>, params: T): U;
}
