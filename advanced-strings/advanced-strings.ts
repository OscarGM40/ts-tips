// we can create some helper types in order to work with strings

// the second parameter is gonna be called recursively and will store the counter
// first is iterate over the string as long as there is more in in (infer Tail)
type Length<T extends string, Counter extends number[] = []> = T extends `${string}${infer Tail}`
  ? Length<Tail, [...Counter, 0]> //porque suma? wtf?
  : Counter["length"]; // remember that I can access to certain properties even when typing

type Test = Length<"Hello">;

type Compare<
  First extends number,
  Second extends number,
  Counter extends number[] = [],
> = First extends Second
  ? "equal"
  : Counter["length"] extends First
  ? "less"
  : Counter["length"] extends Second
  ? "greater"
  : Compare<First, Second, [...Counter, 0]>;

type TestTwo = Compare<3, 2>;
//     ^?

type MaxLength<T extends string, Max extends number> = Compare<Length<T>, Max> extends
  | "less"
  | "equal"
  ? T
  : never;

type MinLength<T extends string, Min extends number> = Compare<Length<T>, Min> extends
  | "greater"
  | "equal"
  ? T
  : never;

// if one of the intersected types return never the whole type will return never
type InRange<T extends string, Min extends number, Max extends number> = MinLength<T, Min> &
  MaxLength<T, Max>;

type NeverTest = 1 & never;
//    ^?

function maxOrThrow<T extends string, Max extends number>(
  str: MaxLength<T, Max>,
  max: Max,
): string {
  if (str.length > max) {
    throw new Error(`${str} is too long`);
  }
  return str;
}
maxOrThrow("Hello", 10);

function MinOrThrow<T extends string, Min extends number>(
  str: MinLength<T, Min>,
  min: Min,
): string {
  if (str.length < min) {
    throw new Error(`${str} is too small`);
  }
  return str;
}
MinOrThrow("Hello", 5);

function inRangeOrThrow<T extends string, Min extends number, Max extends number>(
  str: InRange<T, Min, Max>,
  min: Min,
  max: Max,
): string {
  if (str.length > max) {
    throw new Error(`${str} is too long`);
  } else if (str.length < min) {
    throw new Error(`${str} is too small`);
  }
  return str;
}

const a = "Test"; // inRangeOrThrow will only accept const variables since let a = 'test' can vary in length
inRangeOrThrow(a,1,5)
// fijate que todo esto no vale para mucho, todos estos strings son estáticos y no pueden venir de una API.Impressive nonetheless