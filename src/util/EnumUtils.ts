interface Enum {
	[key: string]: string;
}

/**
 * inspired by the post
 * https://stackoverflow.com/questions/58278652/generic-enum-type-guard
 */
export const isPartOfEnum = <T extends Enum>(value: string, _enum: T): value is T[keyof T] =>
	Object.values(_enum).includes(value);
