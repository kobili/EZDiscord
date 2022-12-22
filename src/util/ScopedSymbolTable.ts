export enum VariableType {
	Number = 'number',
	Boolean = 'boolean',
	String = 'string',
	Array = 'array',
	Any = 'any',
	Error = 'error',
}

/**
 * We don't care for the value as we are only checking the scope, type, and name of all variables
 */
export class ScopedSymbolTable {
	// first scope in stack is global scope
	private scopeStack: Array<Map<string, VariableType>> = [new Map()];

	public pushScope() {
		this.scopeStack.push(new Map());
	}

	public popScope() {
		if (this.scopeStack.length === 1) {
			throw new Error('Attempted to pop global stack');
		}
		this.scopeStack.pop();
	}

	public lookupSymbol(varName: string): VariableType | undefined {
		for (let i = this.scopeStack.length - 1; i >= 0; i--) {
			const scope = this.scopeStack[i];
			if (scope.has(varName)) {
				return scope.get(varName);
			}
		}
		return undefined;
	}

	public declareSymbol(varName: string, type: VariableType) {
		const [scope, index] = this.getCurrentScope();
		scope.set(varName, type);
	}

	public updateSymbol(varName: string, type: VariableType): boolean {
		for (let i = this.scopeStack.length - 1; i >= 0; i--) {
			const scope = this.scopeStack[i];
			if (scope.has(varName)) {
				scope.set(varName, type);
				return true;
			}
		}
		return false;
	}

	public getCurrentScope(): [Map<string, VariableType>, number] {
		const index = this.scopeStack.length - 1;
		return [this.scopeStack[index], index];
	}

	public getGlobalScope() {
		return this.scopeStack[0];
	}
}
