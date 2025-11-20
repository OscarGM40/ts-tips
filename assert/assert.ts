// TypesScript asserts operator allows me to assert that a certain condition is true and if is, the Typescript compiler will narrow the types accordingly in subsequent code.
// assertion functions are used when you need to narrow down a value to a more specific type, and you need a strong guarantee that the type meets your expectation before running other code

function double(n: number): number {
  return n * 2;
}

// this is called an assertion function. It is a special kind of function that narrows down the type of a value. The asserts keyword is used to indicate that the function will throw an error if the assertion fails. In this case, if the value is not a number, the function will throw an error, and TypeScript will know that the value is a number after the function call.Lo más importante es que hace narrowing,diria.No tengo porque tirar un error?

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    // throw new Error("Value is not a number");
    console.log("Value is not a number");
  }
}

function example(value: string | number) {
  assertIsNumber(value); // This will narrow down the type of value to number
  console.log(double(value)); // Now TypeScript knows that value is a number
}

// a function that ensures an object has a specific property (and that is a string)
function assertIsString(value: unknown): asserts value is string {
  if(typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

type DeepStrictEquals = <T>(actual: unknown, expected: T, message?: string | Error) => asserts actual is T;

// Type guards allows you to define custom functions for narrowing types
// Assertions allow you to ensure invariants that can't be encoded in the type system are held at runtime
