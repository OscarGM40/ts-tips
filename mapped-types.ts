// https://www.youtube.com/watch?v=RjQpep8fBdo

type Properties = "propA" | "propB";

type MappedType<T> = {
  [P in keyof T]: T[P];
};

type MyNewType = MappedType<Properties>;

// types like Pick<T,K> or Record use MappedTypes

type MyPick<T, U extends keyof T> = {
  [K in U]: T[K];
};

const person = {
  name: "asinto",
  age: 46,
  birthDate: new Date(),
  location: "madrid",
};
type Person = typeof person;

const _halfPerson: MyPick<Person, "name" | "age"> = {
  name: "asdkf",
  age: 34,
};

type MyRecord<K extends PropertyKey, T> = {
  [P in K]: T;
};

// MyOmit with other built-in types
type MyOmit<T, U extends keyof T> = {
  [K in Exclude<keyof T, U>]: T[K];
};

// actually I can use a conditional type, here [K in keyof T as K extends U ? never: K] uses a mapped type with a key remapping, that is, if K is assignable to U it is replaced with never, so it's omitted
type MyOmitFinal<T, U extends keyof T> = {
  [K in keyof T as K extends U ? never : K]: T[K];
};

const _halfPerson2: MyOmitFinal<Person, "age"> = {
  name: "asinto",
  birthDate: new Date(),
  location: "madrid",
};

type Person2 = { name: string; age: number; location: string };
type OmittedOne = {
  // fijate que se llama key remapping porque está en la key, idiota
  [K in keyof Person2 as K extends "name" ? never : K]: Person2[K];
};

const _omittedOne: OmittedOne = {
  age: 45,
  location: "kljasf",
};

// pero porque no usar una index signature para un Record de esta forma Record<[key: string | number | symbol]: T> <- porque una index signature no puede llevar una union como values para la key
interface Record2 {
  //! this is invalid in TS
  [key: string | number | symbol]: number;
}

// recuerda que puedo usar un intersection type para añadir por ejemplo una prop común
type AnotherRecord<K extends PropertyKey, T> = {
  [P in K]: T;
} & { sharedProperty: string };

const _anotherUselessRecord: AnotherRecord<string, number | string> = {
  age: 34,
  sharedProperty: "pozezo",
};

type MyExclude<T, U> = T extends U ? never : T;

type Result = "a" | "b" | "c";
