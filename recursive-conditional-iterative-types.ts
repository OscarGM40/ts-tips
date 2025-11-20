// https://www.youtube.com/watch?v=eARAFPQqcsM

// un tipo recursivo es un tipo que se llama a si mismo una o varias veces. Igual que en una funcion necesita una condición de salida

// este tipo puede ser o un string o un number o boolean o null o un arreglo de éstos o un object con cualquier key y estos tipos como valores
// parece que en typing es llamar al tipo que estoy definiendo, hay más formas??
type JSONType = string | number | boolean | null | JSONType[] | { [key: string]: JSONType };

const _a: JSONType = [
  1,
  2,
  {
    x: 35,
    y: 97,
    r: ["fklasjf"],
  },
];

// with exit condition
type PrototypedObject<T> = T & {
  // aqui la condicion de salida es poder pasar un null, super interesante
  prototype: PrototypedObject<T> | null;
};

const _b: PrototypedObject<{ x: number }> = {
  x: 1,
  prototype: {
    x: 9,
    // esta es la forma de salir?? Sea como sea si es interesante como se define una condición de salida
    prototype: null,
  },
};

// conditional types
// fijate que esta utility lo que hace es extraer el tipo de un parametro de una funcion, para poder luego tipar algo. Igual es un edge-case terrible esto
// I can only use infer keyword in conditional types, and specifically in the type pattern of the extends clause
// The type pattern is the part after the extends that describe the structure Typescript should try to match against the type on the left.It can be:
// 1- A function type: (..args: infer P) => any fijate que P es el arreglo de parametros, falta el indice
// 2- An array type: (infer U)[]
// 3- An object type: {key: infer V }
// 4- A generic type: Promise<infer T>
// Any type structure where I wnat to extract a part of the type (type GetReturnType<F>= F extends (...args: any[]) => infer R ? R: never) fijate que tenia que ser un conditional type, lo tenias casi
type ParameterByIndex<F extends (...args: never[]) => unknown, Index extends number> = F extends (
  ...args: infer P
) => unknown
  ? P[Index]
  : never;

const fn = (a: number, b: string, c: string): unknown => 1;
const _a2: ParameterByIndex<typeof fn, 1> = "Hello";

type ParameterByIndexIdiomatic<
  F extends (...args: any[]) => unknown,
  Index extends keyof Parameters<F>,
> = Parameters<F>[Index];

const _a3: ParameterByIndexIdiomatic<typeof fn, 2> = "afdj";

// fijate que al final un conditional type devuelve un tipo u otro, y que el never se trasnsformará en undefined en algun punto, parece

// recursive types with drop, drop lo que va a hacer es sacar de una tupla, mediante infer, el Head, o el Tail etc

// gives all expect the first (ojo, no confundir infer P con ...infer P)
type Tail<T extends unknown[]> = T extends [unknown, ...infer Tail] ? Tail : never;
//give the first
type Head<T extends unknown[]> = T extends [infer Head, ...unknown[]] ? Head : never;
// give the last
type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;
// give all except the last
type Firstly<T extends unknown[]> = T extends [...infer First, unknown] ? First : never;

//  recursive and conditional and iterative type
// porque itera
// el último parametro es necesario para poder iterar. Esto es asi porque al tipar no tengo acceso a bucles, ni a sumar uno,etc. Para poder emular esto se suele definir un último generico de tipo array al que le añadiré elementos en cada iteración e ir evaluando su longitud (si Indexable['length'] extends Size siendo size 1  es que se ha iterado una vez y hay que salir ya, si no continuamos con la iteracion, fijate que aqui está el conditional type), 

type Drop<Size extends number, T extends unknown[], Indexable extends unknown[] = []> = {
  continue: Drop<Size, Tail<T>, [...Indexable, unknown]>;
  return: T;
}[Indexable["length"] extends Size ? "return" : "continue"];

type Tuple = [number, string, string[]];

const _type1: Tail<Tuple> = ["", [""]];
const _type2: Head<Tuple> = 1;
const _type3: Last<Tuple> = [""];
const _type4: Firstly<Tuple> = [1, ""];

const _subtype1: Drop<1, Tuple> = ["", []];
const _subtype2: Drop<2, Tuple> = [[]];
const _subtype3: Drop<3, Tuple> = []; // tiene sentido que si quita 3 tipos se quede la tupla vacia 
