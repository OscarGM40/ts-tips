// https://stackoverflow.com/questions/60067100/why-is-the-infer-keyword-needed-in-typescript
//? Infer keyword is only used within the extends clause of a conditional type.It declares a new type variable. 
// En resumen, solo se puede usar dentro de un conditional type y se usa para inferir un tipo dentro de ese contexto, ya que la keyword es infer U, se le asignará a U el tipo que se infiera dentro de la expresión condicional.

type MyType<T> = T extends infer U ? U : never;
type T1 = MyType<string>; // T1 is string
type T2 = MyType<number>; // T2 is number
type T3 = MyType<unknown>; // T3 is unknown

type unboxFromPromise<T> = T extends Promise<infer U> ? U : T;
type t1 = Promise<string[]>;
let promiseType: unboxFromPromise<t1>; // promiseType is string[]
type t2 = Promise<number>;
let promiseType2: unboxFromPromise<t2>; // promiseType2 is number

// infer puede no ser solo un type, sino una union type. Fijate como este tipo saca como union type todos los tipos de los valores de un objeto
type unboxFromObject<T> = T extends { a: infer U, b: infer U } ? U : never;
type r1 = unboxFromObject<{ a: string, b: number }>; // r1 is string | number

type unboxAllTypesFromObject<T> = T extends { [key: string]: infer U } ? U : never;
type r2 = unboxAllTypesFromObject<{ a: string, b: number, c: boolean }>; // r2 is string | number | boolean

function describePerson(person: {
  name: string;
  age: number;
  hobbies: [string, string]; // tuple
}) {
  return `${person.name} is ${person.age} years old and loves ${person.hobbies.join(" and  ")}.`;
}
type GetFirstArgumentOfAnyFunctionType<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : never;

const alex: GetFirstArgumentOfAnyFunctionType<typeof describePerson>={
  age: 25,
  hobbies: ["reading", "gaming"],
  name: "Alex"
}
describePerson(alex); // "Alex is 25 years old and loves reading and gaming."
//? En este caso, el tipo GetFirstArgumentOfAnyFunctionType<T> es un tipo condicional que verifica si T es una función que toma al menos un argumento. Si es así, infiere el tipo del primer argumento y lo devuelve. Si no, devuelve never.
//? In typescript, never is treated as the 'no-value' type. I will often see ti being used as a dead-end type and commonly used with conditional typing. A simple example of using never is a union type such as string | number | never. In this case, never is used to indicate that there are no other possible types beyond string and number.(interesante)
//? By contrast, the union string | any evaluates to any (fijate que uno limita y el otro expande). Any serves as a wildcard type that encompasses all possible types.

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never; // fijate que aqui sacamos el tipo del retorno, no del primer arg
type ExtractArrayElementTypes<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;
type t3 = ExtractArrayElementTypes<string[]>; // t3 is string
type t4 = ExtractArrayElementTypes<number[]>; // t4 is number
type t5 = ExtractArrayElementTypes<readonly [string, number]>; // t5 is string | number
type t6 = ExtractArrayElementTypes<readonly [string, number, boolean]>; // t6 is string | number | boolean

interface Mapper<T, U> {
  (input: T): U;
}