import { FunctionCall } from '../FunctionCall';
import { BooleanValue } from '../variables/BooleanValue';
import { NumberValue } from '../variables/NumberValue';
import { StringValue } from '../variables/StringValue';
import { VarNameValue } from '../variables/VarNameValue';

export type BinaryAtom = BooleanValue | NumberValue | VarNameValue | StringValue | FunctionCall;

export enum BinaryExpressionType {
	Regular = 'regular',
	Not = 'not',
	Atom = 'atom',
}

export enum BinaryCompare {
	GT = '>',
	GE = '>=',
	LT = '<',
	LE = '<=',
	EQ = '==',
	NQ = '!=',
}

export enum BinaryOperator {
	AND = 'and',
	OR = 'or',
}
