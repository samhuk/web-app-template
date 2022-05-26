export type Dict<T = any> = { [key: string]: T }

/**
 * For creating types like:
 * 
 * @example
 * enum Type { STRING, NUMBER }
 * type Map = {
 *   [Type.STRING]: { upperCase: string },
 *   [Type.NUMBER]: { isInteger: boolean },
 * }
 * type Field = TypeDependantBaseIntersection<Type, Map, "dataType", "dataTypeOptions">
 * const field1: Field = {
 *   dataType: Type.STRING,
 *   dataTypeOptions: {
 *     upperCase: false
 *   }
 * }
 */
export type TypeDependantBase<
  TType extends string|number,
  TMap extends { [k in TType]: any },
  TTypePropertyName extends string = "type",
  TTypeOptionsPropertyName extends string = "typeOptions"
> = {
  [K in TType]: { [k in TTypePropertyName]: K } & { [k in TTypeOptionsPropertyName]: TMap[K] }
}[TType] & { [k in TTypePropertyName]: TType }

/**
 * For creating types like:
 * 
 * @example
 * enum Type { STRING, NUMBER }
 * type Map = {
 *   [Type.STRING]: { upperCase: string },
 *   [Type.NUMBER]: { isInteger: boolean },
 * }
 * type Field = TypeDependantBaseIntersection<Type, Map, "dataType">
 * const field1: Field = {
 *   dataType: Type.STRING,
 *   upperCase: false
 * }
 */
export type TypeDependantBaseIntersection<
  TType extends string|number,
  TMap extends { [k in TType]: any },
  TTypePropertyName extends string = "type",
> = {
  [K in TType]: { [k in TTypePropertyName]: K } & TMap[K]
}[TType] & { [k in TTypePropertyName]: TType }

/**
 * Removes all of the `readonly` status of all the properties within `T`.
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] }

/**
 * Makes `T` either readonly or mutable.
 */
export type ReadonlyOrMutable<T> = Readonly<T> | Mutable<T>

/*
 * Forces typescript to expand the first level of the type definition of `T`.
 */
export type ExpandOneLevel<T> = T extends object
 ? T extends infer O ? { [K in keyof O]: O[K] } : never
 : T;

/**
 * Forces typescript to recursively expand the type definition of `T`.
 */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
  : T;
