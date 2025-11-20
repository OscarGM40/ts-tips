// esto  es un tipo recursivo, ya que se llama a si mismo. Intenta reproducir un JSON
type JSONType = string | number | boolean | null | JSONType[] | { [key: string]: JSONType };

const _a: JSONType = [
  1,
  2,
  {
    x: 35,
    y: 97,
    r: ["fks"],
  },
];

// se puede definir una condición de salida a un tipo recursivo (Recursive | null <- cuando le pase null para), no me gusta mucho que tenga que declarar la propiedad a null.
type PrototypedObject<T> = T & {
  prototype?: PrototypedObject<T> | null;
};

const _b: PrototypedObject<{ x: number }> = {
  x: 1,
  prototype: {
    x: 9,
    // prototype: null
  },
};

// tipo que extrae el tipo de un parámetro mediante el indice. Esto es un tipo condicional simplemente
type ParameterByIndex<F extends (...args: never[]) => unknown, Index extends number> = F extends (
  ...args: infer P
) => unknown
  ? P[Index]
  : never;

const fn = (a: number, b: string, c: string): unknown => 1;

const _a2: ParameterByIndex<typeof fn, 1> = "hello";

type Tail<T extends unknown[]> = T extends [unknown, ...infer Rest] ? Rest : never;
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;

type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type AllButLast<T extends unknown[]> = T extends [infer H, unknown] ? H : never;

// este tipo es condicional por el extends Size, es recursive por el Drop en el continue y es iterativo por la llamada recursiva a una de sus keys en el condicional. La clave está en como Indexable crece una posición, con lo que un dia saldrá del bucle. Recuerda que unknown es cualqueir cosa, podia ser un 1 (como usó Oliver para el currencySymbol)
// Size debe ser un number, T un array, y hay un array como backup que no hace falta declarar (ni se espera)
type Drop<Size extends number, T extends unknown[], Indexable extends unknown[] = []> = {
  continue: Drop<Size, Tail<T>, [...Indexable, unknown]>;
  return: T;
}[Indexable["length"] extends Size ? "return" : "continue"];

type Tuple = [number, string, string[]];

const a: Tail<Tuple> = ["", []];
const b: Head<Tuple> = 45;
const c: Last<Tuple> = ["askjdf"];

const a1: Drop<1, Tuple> = ["", []];
const a2: Drop<2, Tuple> = [["asdfkj"]];
const a3: Drop<3, Tuple> = [];

type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type DeepRequired<T> = T extends (infer U)[]
  ? Array<DeepRequired<U>>
  : T extends object
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : NonNullable<T>;

type RequiredProps<T> = {
  [K in keyof T]-?: T[K];
};

type DeepOmit<T, K extends PropertyKey> = T extends (infer U)[]
  ? Array<DeepOmit<U, K>>
  : T extends object
  ? {
      [Key in keyof T as Key extends K ? never : Key]: T[Key] extends object
        ? DeepOmit<T[Key], K>
        : T[Key];
    }
  : T;

type Example = {
  a: number;
  b: { a: string; c: { a: boolean } };
  d: Array<{ a: number; x: string }>;
};
type Result = DeepOmit<Example, "a">;

type DeepPick<T, K extends PropertyKey> = T extends (infer U)[]
  ? Array<DeepPick<U, K>>
  : T extends object
  ? {
      [Key in keyof T as Key extends K ? Key : never]: T[Key] extends object
        ? DeepPick<T[Key], K>
        : T[Key];
    }
  : never;

type Example2 = {
  a: number;
  b: { a: string; c: { a: boolean; d: number } };
  d: Array<{ a: number; x: string }>;
};

type Result2 = DeepPick<Example2, "a">;
// Result should recursively keep only 'a' properties at any depth

type FirstParameter<F> = F extends (
  ...args: infer P
) => unknown
  ? P[0]
  : never;
type Fn = (x: number, y: string) => void;
type A = FirstParameter<Fn>; // number

type B = FirstParameter<() => void>; // never