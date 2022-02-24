# typed-jest-expect

_Elegant jest.expect typings for a more civilized age_

## Why?

By default, the `expect` utility of `jest` is very broadly typed, which makes sense for a testing library, and doesn't complain when you do something like that:

```ts
expect(42).toEqual("definitely not 42");
```

However, when your codebase is mostly well-typed internally, you don't benefit from TypeScript as much as you could, specifically:

1. static warnings for obvious errors suchs as typos,
2. editor auto-completion.

This missed opportunity impedes productivity.

This library re-exports `expect` with much stronger typings: you can only test equality with assignable values, use function assertions with Jest mocked functions, use number comparison with numbers and BigInts, etc.

It prevents you from writing code such as:

```ts
tExpect(42).toEqual("definitely not 42");
tExpect({
  x: 42,
}).toEqual({
  y: 77,
});
```

And conversely, auto-completion now works correctly:

```ts
tsExpect({
  foo: "bar",
  fizz: "buzz",
}).toMatchObject({
  fizz: "bu...", // auto-complete
});
```

## Installation

```
npm i typed-jest-expect
```

```ts
import { tExpect } from "typed-jest-expect";

tExpect([1, 3, 2]).toContain(3);
```

This library has virtually 0 runtime cost. The emitted JS code does nothing but re-exporting the global `expect` function:

```js
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.tExpect = void 0;
const tExpect = (t) => expect(t);
exports.tExpect = tExpect;
```

Since it doesn't change the original `expect` typings, you can still use the broadly-typed original `expect` for interacting with code that is not fully typed:

```ts
tExpect(42).toEqual(42);
expect(notSureWhatThisShouldReturn()).toEqual("1337");
```

## Examples of invalid code statically rejected by tExpect

```ts
// Calling .resolves or .rejects on non-promise
tExpect(0).resolves; // never
tExpect(Promise.resolve(0)).resolves.toEqual(0);

// Calling toBe / toEqual / toMatchObject with incompatible values
tExpect({ foo: "bar" }).toEqual({ foo: 42 } /* never */);

// toBeCalled on anything that is not a mocked function
tExpect(42).toBeCalled; // never
tExpect(() => 42).toBeCalled; // never
tExpect(jest.fn(() => 42)).toBeCalled();

// toBeCalledWith with non-assignable parameters
const sum = jest.fn((a: number, b: number): number => a + b);
tExpect(sum).toBeCalledWith("a" /* never */, 3);

// toHaveReturnedWith with non-assignable return value
tExpect(sum).toHaveReturned(null /* never */);

// toHaveLength with anything that doesn't have a .length number property
tExpect({}).toHaveLength; // never

// toHaveProperty with a non-existent property key
tExpect({ foo: "bar" }).toHaveProperty("fizz", "bar" /* never */);

// toBeCloseTo, toBeGreaterThan, etc., with non-number / BigInt
tExpect("32").toBeGreaterThan; // never

// toBeDefined on non-optional types
tExpect(42).toBeDefined; // never
tExpect(true ? 42 : undefined).toBeDefined(); // ok

// toBeInstanceOf on non-assignable constructors
class Animal {
  kind: string;
  constructor(kind: string) {
    this.kind = string;
  }
}
tExpect({ species: "dog" }).toBeInstanceOf(Animal /* never */);

// toBeNull on non-nullable types
tExpect(42).toBeNull; // never
tExpect(true ? 42 : null).toBeNull(); // ok (throws though)

// toThrow on non-functions, or functions with parameters
tExpect((a: number, b: number) => {}).toThrow; // never
```
