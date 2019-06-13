export type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;
export type ById<T> = { [key: string]: T };
export type HasId = { id: string };
