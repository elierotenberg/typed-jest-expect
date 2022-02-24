// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TMockFn<R = any, Args extends any[] = any> = jest.Mock<R, Args>;

type TNumber = number | BigInt;

type TConstructor<T> = {
  new (...args: never): T;
};

type TFunction<R = unknown, Args extends unknown[] = never[]> = (
  ...args: Args
) => R;

type TPromisify<T> = T extends (...args: never[]) => unknown
  ? (...args: Parameters<T>) => Promise<ReturnType<T>>
  : never;

type TPromisifyAll<T> = {
  readonly [K in keyof T]: TPromisify<T[K]>;
};

type TExpectAsync<T> = Omit<TPromisifyAll<TExpect<T>>, `not`> & {
  readonly not: TPromisifyAll<TExpect<T>>;
};

export type TExpect<T> = {
  readonly not: TExpect<T>;
  readonly resolves: T extends Promise<infer U> ? TExpectAsync<U> : never;
  readonly rejects: T extends Promise<unknown> ? TExpectAsync<unknown> : never;
  readonly toBe: (result: T) => void;
  readonly toHaveBeenCalled: T extends TMockFn ? () => void : never;
  readonly toBeCalled: T extends TMockFn ? () => void : never;
  readonly toHaveBeenCalledTimes: T extends TMockFn
    ? (n: number) => void
    : never;
  readonly toBeCalledTimes: T extends TMockFn ? (n: number) => void : never;
  readonly toHaveBeenCalledWith: T extends TMockFn
    ? (...args: Parameters<T>) => void
    : never;
  readonly toBeCalledWith: T extends TMockFn
    ? (...args: Parameters<T>) => void
    : never;
  readonly toHaveBeenLastCalledWith: T extends TMockFn
    ? (...args: Parameters<T>) => void
    : never;
  readonly lastCalledWith: T extends TMockFn
    ? (...args: Parameters<T>) => void
    : never;
  readonly toHaveBeenNthCalledWith: T extends TMockFn
    ? (n: number, ...args: Parameters<T>) => void
    : never;
  readonly nthCalledWith: T extends TMockFn
    ? (n: number, ...args: Parameters<T>) => void
    : never;
  readonly toHaveReturned: T extends TMockFn ? () => void : never;
  readonly toReturn: T extends TMockFn ? () => void : never;
  readonly toHaveReturnedTimes: T extends TMockFn ? (n: number) => void : never;
  readonly toReturnTimes: T extends TMockFn ? (n: number) => void : never;
  readonly toHaveReturnedWith: T extends TMockFn
    ? (value: ReturnType<T>) => void
    : never;
  readonly toReturnWith: T extends TMockFn
    ? (value: ReturnType<T>) => void
    : never;
  readonly toHaveLastReturnedWith: T extends TMockFn
    ? (value: ReturnType<T>) => void
    : never;
  readonly lastReturnedWith: T extends TMockFn
    ? (value: ReturnType<T>) => void
    : never;
  readonly toHaveNthReturnedWith: T extends TMockFn
    ? (n: number, value: ReturnType<T>) => void
    : never;
  readonly nthReturnedWith: T extends TMockFn
    ? (n: number, value: ReturnType<T>) => void
    : never;
  readonly toHaveLength: T extends {
    readonly length: number;
  }
    ? (length: number) => void
    : never;
  // We only support direct property key, no array of keys or dot-separated paths
  readonly toHaveProperty: <K extends keyof T>(key: K, value?: T[K]) => void;
  readonly toBeCloseTo: T extends TNumber
    ? (n: TNumber, digits?: number) => void
    : never;
  readonly toBeDefined: undefined extends T ? () => void : never;
  readonly toBeFalsy: () => void;
  readonly toBeGreaterThan: T extends TNumber ? (n: TNumber) => void : never;
  readonly toBeGreaterThanOrEqual: T extends TNumber
    ? (n: TNumber) => void
    : never;
  readonly toBeLessThan: T extends TNumber ? (n: TNumber) => void : never;
  readonly toBeLessThanOrEqual: T extends TNumber
    ? (n: TNumber) => void
    : never;
  readonly toBeInstanceOf: T extends object
    ? (Class: TConstructor<T>) => void
    : never;
  readonly toBeNull: null extends T ? () => void : never;
  readonly toBeTruthy: () => void;
  readonly toBeUndefined: undefined extends T ? () => void : never;
  readonly toBeNaN: T extends number ? () => void : never;
  readonly toContain: T extends Readonly<Array<infer U>>
    ? (item: U) => void
    : never;
  readonly toContainEqual: T extends Readonly<Array<infer U>>
    ? (item: U) => void
    : never;
  readonly toEqual: (result: T) => void;
  readonly toMatch: T extends string ? (match: RegExp | string) => void : never;
  // We only support matching a single object, not an array.
  readonly toMatchObject: (result: Partial<T>) => void;
  readonly toMatchSnapshot: (
    propertyMatchers?: Partial<T>,
    hint?: string,
  ) => void;
  readonly toMatchInlineSnapshot: (
    propertyMatchers: Partial<T>,
    inlineSnapshot: string,
  ) => void;
  readonly toStrictEqual: (result: T) => void;
  readonly toThrow: T extends TFunction<unknown, []>
    ? (error?: unknown) => void
    : never;
  readonly toThrowError: T extends TFunction<unknown, []>
    ? (error?: unknown) => void
    : never;
  readonly toThrowErrorMatchingSnapshot: T extends TMockFn
    ? (hint?: string) => void
    : never;
  readonly toThrowErrorMatchingInlineSnapshot: T extends TMockFn
    ? (inlineSnapshot: string) => void
    : never;
};

export const tExpect = <T>(t: T): TExpect<T> =>
  expect(t) as unknown as TExpect<T>;
