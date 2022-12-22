import { ScopedSymbolTable, VariableType } from '../../util/ScopedSymbolTable';
import {
	ArrayValue,
	BinaryExpression,
	BooleanValue,
	FunctionCall,
	MathValue,
	NumberValue,
	StringValue,
	Variable,
	VarNameValue,
} from '../nodes';
import { BuiltInFunction } from '../nodes/FunctionCall';
import { ASTBaseVisitor } from './ASTBaseVisitor';
import chalk from 'chalk';

/**
 * Resolves the type of a variable declaration or assignment for static checking purposes
 */
export class TypeResolverVisitor extends ASTBaseVisitor<ScopedSymbolTable, VariableType> {
	visitVariable<Y>(variable: Variable<Y>, table: ScopedSymbolTable): VariableType {
		return variable.value.accept(this, table);
	}

	visitArrayVarValue(arrVarVal: ArrayValue, table: ScopedSymbolTable): VariableType {
		return VariableType.Array;
	}

	visitBinaryExpression(binary: BinaryExpression, table: ScopedSymbolTable): VariableType {
		return VariableType.Boolean;
	}

	visitBooleanVarValue(booleanVarVal: BooleanValue, table: ScopedSymbolTable): VariableType {
		return VariableType.Boolean;
	}

	visitMathValue(mathValue: MathValue, table: ScopedSymbolTable): VariableType {
		return VariableType.Number;
	}

	visitNumberVarValue(numberVarValue: NumberValue, table: ScopedSymbolTable): VariableType {
		return VariableType.Number;
	}

	visitStringVarValue(stringVarValue: StringValue, table: ScopedSymbolTable): VariableType {
		return VariableType.String;
	}

	visitVarNameValue(varName: VarNameValue, table: ScopedSymbolTable): VariableType {
		const varType = table.lookupSymbol(varName.value);
		if (!varType) {
			return VariableType.Error;
		}
		return varType;
	}

	visitBuiltInFunctionVarValue(builtInFunction: FunctionCall, table: ScopedSymbolTable): VariableType {
		switch (builtInFunction.function) {
			case BuiltInFunction.concat:
				return VariableType.String;
			case BuiltInFunction.random:
			case BuiltInFunction.len:
			case BuiltInFunction.find:
				return VariableType.Number;
			case BuiltInFunction.remove:
			case BuiltInFunction.set:
			case BuiltInFunction.reply:
			case BuiltInFunction.add:
				return VariableType.Error;
			case BuiltInFunction.get:
				return VariableType.Any;
		}
	}
}
