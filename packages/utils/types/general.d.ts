export function createDefault<T extends Object>(obj: T): T;
export function isDefined<T>(value: T | null | undefined): value is T;
export function isDefinedAndNotEmpty<T>(obj: T | null | undefined): value is T;
export function isPlainObject(obj: any): boolean;
export function isStringTrue(value: string | boolean | undefined | null): boolean;
