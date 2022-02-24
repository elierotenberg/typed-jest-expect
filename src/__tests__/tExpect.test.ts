import { tExpect } from "..";

test(`tExpect`, async () => {
  tExpect(0).not.toEqual(1);

  await tExpect(Promise.resolve(0)).resolves.toEqual(0);
  await tExpect(Promise.reject(`error`)).rejects.toEqual(`error`);

  tExpect(0).toBe(0);

  const sum = jest.fn((a: number, b: number): number => a + b);
  tExpect(sum).not.toHaveBeenCalled();
  tExpect(sum).not.toBeCalled();
  sum(3, 5);
  tExpect(sum).toHaveBeenCalled();
  tExpect(sum).toBeCalled();
  tExpect(sum).toHaveBeenCalledWith(3, 5);
  tExpect(sum).toBeCalledWith(3, 5);
  tExpect(sum).toHaveBeenLastCalledWith(3, 5);
  tExpect(sum).lastCalledWith(3, 5);
  sum(7, 11);
  tExpect(sum).toHaveBeenLastCalledWith(7, 11);
  tExpect(sum).lastCalledWith(7, 11);
  tExpect(sum).toHaveBeenNthCalledWith(1, 3, 5);
  tExpect(sum).nthCalledWith(1, 3, 5);
  tExpect(sum).toHaveReturned();
  tExpect(sum).toReturn();
  tExpect(sum).toHaveReturnedTimes(2);
  tExpect(sum).toReturnTimes(2);
  tExpect(sum).toHaveReturnedWith(8);
  tExpect(sum).toReturnWith(8);
  tExpect(sum).toHaveLastReturnedWith(18);
  tExpect(sum).lastReturnedWith(18);
  tExpect(sum).toHaveNthReturnedWith(1, 8);
  tExpect(sum).toHaveNthReturnedWith(2, 18);
  tExpect(sum).nthReturnedWith(1, 8);
  tExpect(sum).nthReturnedWith(2, 18);

  tExpect([]).toHaveLength(0);
  tExpect([1, 2]).toHaveLength(2);
  tExpect({ length: 4 }).toHaveLength(4);

  tExpect({ foo: `bar` }).toHaveProperty(`foo`, `bar`);

  tExpect(0.2 + 0.1).toBeCloseTo(0.3, 5);

  const maybeUndefined: undefined | number = true ? 1 : undefined;
  tExpect(maybeUndefined).toBeDefined();

  tExpect(0).toBeFalsy();
  tExpect(1).toBeGreaterThan(0);
  tExpect(1).toBeGreaterThanOrEqual(1);
  tExpect(0).toBeLessThan(1);
  tExpect(0).toBeLessThanOrEqual(0);

  class Animal {
    kind: string;
    constructor(kind: string) {
      this.kind = kind;
    }
  }

  class Dog extends Animal {
    constructor() {
      super(`dog`);
    }
  }

  const cat = new Animal(`cat`);

  tExpect(cat).toBeInstanceOf(Animal);
  tExpect(cat).not.toBeInstanceOf(Dog);

  const dog = new Dog();

  tExpect(dog).toBeInstanceOf(Animal);
  tExpect(dog).toBeInstanceOf(Dog);

  const maybeNull: null | number = true ? null : 1;
  tExpect(maybeNull).toBeNull();

  tExpect([]).toBeTruthy();

  tExpect(maybeUndefined).not.toBeUndefined();

  tExpect(0 / 0).toBeNaN();

  tExpect([1, 2, 3] as const).toContain(2);
  const t = [{ foo: `bar` }, { fizz: `buzz` }] as const;
  tExpect(t).not.toContain({
    fizz: `buzz`,
  });
  tExpect(t).toContain(t[1]);
  tExpect(t).toContainEqual({
    fizz: `buzz`,
  });
  tExpect(t[0]).toEqual({
    foo: `bar`,
  });

  tExpect(`fizz`).toMatch(/^f.z*$/);
  tExpect({
    foo: `bar`,
    fizz: `buzz`,
  }).toMatchObject({
    foo: `bar`,
  });

  tExpect(dog).toStrictEqual(dog);
  tExpect(dog).not.toStrictEqual({
    kind: `dog`,
  });

  const throwError = (): void => {
    throw new Error(`error`);
  };

  tExpect(throwError).toThrow(`error`);
  tExpect(throwError).toThrowError(`error`);
});
