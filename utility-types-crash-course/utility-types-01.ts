// https://www.youtube.com/watch?v=7HCvrd66ooM

// 1- CustomPartial & CleanedPartial
const tuple1: [number, string, number, number] = [1, "hey", 3, 4];
const obj1 = {
  id: 1,
  name: "John",
  score: 45,
};

// aqui cada K es opcional [K]?, osea que todas las keys van a ser opcionales. En caso de que si venga el valor es T[K]. Es la implementación oficial de Partial<T> realmente. El +? es igual que ?, ya está implicito que se añade, no hace falta el + (pero si si quisiera remover)
type CustomPartial<T> = {
  [K in keyof T]+?: T[K];
};

// este mapped type quita los nulls e undefined de un tipo, es decir,no se le pueden asignar estos valores
// la clave está en que NonNullable elimina los nulls e undefineds, retornando never si es asi -> NonNullabe<T> = T extends null | undefined ? never : T;
type RequiredNonNullable<T extends unknown[], PT = Partial<T>> = {
  [K in keyof PT]: NonNullable<PT[K]>;
};

// la clave es el -?, esto elimina el ? de las keys (con lo que obviamente quedan requeridas todas) Lo inverso sería +?
type CustomRequired<T> = {
  [K in keyof T]-?: T[K];
};

const _pTuple: Partial<typeof tuple1> = [undefined, undefined, 4, 5]; // dado que es un Partial<typeof tuple> cada iteracion puede ser undefined o si no lo es cumplir con el tipo de la tupla. Fijate que podria pasar 4 undefineds o 3, o no pasar nada, un arreglo vacio tmb cumple pues cada key es opcional, en este caso el elemento
const _cTuple: CustomPartial<typeof tuple1> = []; // de nuevo cumple porque cada elemento puede ser opcional
const _cpTuple: RequiredNonNullable<typeof tuple1> = [1, "hey"]; // con este tipo no puedo pasar undefineds. Parece que esto cambió, ahora lo permite y es muy dificil recrearlo con el TS de ahora

// 2- minuto 20 Required & Unknownify
const rTuple: CustomRequired<typeof tuple1> = [1, "", 1, 1];
// BONUS: Unkownnify<T> permite pasar cualquier cosa (ya vale para algo esto??) No tiene sentido
type Unknownify<T> = {
  [K in keyof T]: unknown;
};
// fijate que puedo entrar hasta las keys que quiera usando una union
type UnknownifyCustomKeys<T> = {
  [K in keyof T]: K extends "score" | "name" ? unknown : T[K];
};
const urObj: Unknownify<typeof obj1> = {
  id: 1,
  name: "Mike",
  score: [],
};
const urObj2: UnknownifyCustomKeys<typeof obj1> = {
  id: 1,
  name: [],
  score: [],
};

const upTuple: Unknownify<typeof tuple1> = [true, [], [], false]; // no tiene mucho sentido tener un tipo tan abierto/agresivo

// 3- minuto 30 Readonly
class MyClass {
  x = 3;
  y = 5;
}

type CustomReadonly<T> = {
  +readonly [K in keyof T]: T[K];
};

const roObj1: Readonly<typeof obj1> = obj1;
const roTuple1: Readonly<typeof tuple1> = tuple1;

// roObj1.id = 5;
// roTuple1[0] = 7;

const roCmInstance: CustomReadonly<MyClass> = new MyClass();
// roCmInstance.x = 8;

// 4- Minuto 35 Record<K,T>
interface ObjScore {
  id: number;
  name: string;
  score: number;
}

const obj2: ObjScore & {
  // ojo, añadir este método pisa la implementación de Object.keys()
  keys(): Array<keyof ObjScore>;
} = {
  id: 1,
  name: "John",
  score: 45,
  // explain Object.keys issue. El problema es que Object.keys devuelve un string[] con las claves de ese object, pero realmente no está tipado correctamente
  keys(): ReturnType<typeof obj2.keys> {
    return ["id", "name", "score"];
  },
};

const k2 = Object.keys(obj2);
// esta issue se puede ver perfectamente al querer acceder por index signature, si k2 son las keys de ese object como no puedo entrar mediante k2[0], y es porque retornó un string[], ya que un object puede tener más keys que las que su tipo declare (structural typing).The narrow type could lie if the object has extrakeys at runtime, so they widened to string[].Solution: cast Object.keys(obj2) as Array<keyof typeof obj2> (or override keys() method) or cast the access indexor

// por ejemplo borrar una key (fijate que da un error si esa key no la puse opcional, esto antes no era asi diria, es solo un error de linter además,puedo ignorar el warning/error)
// delete obj2.id;
obj2[k2[0] as keyof typeof obj2];

const k3 = obj2.keys();
obj2[k3[0]];

type Dictionary<K extends string | number | symbol, V> = Partial<Record<K, V>>;

const r: Record<string, number> = {};
const d: Dictionary<string, number> = {};
const ru: Record<string, unknown> = {};

const returnNumber = (n: number) => n;
returnNumber(r.hola);
returnNumber(d.hola ?? 1);

// 1h10m PIck

type CustomPick<T, K extends keyof T> = {
  // fijate que la clave está en que algo que extienda de keyof T es ya una union y es iterable sin el keyof,claro (key in K <- ya que K es un keyof T).Como solo recorremos las que se pasen de todas las posibles ya tengo el nuevo tipo sin necesitar nada más
  [key in K]: T[key];
};

const _a: CustomPick<ObjScore, "score"> = {
  score: 3957,
};

const _b: CustomPick<ObjScore, "score" | "name"> = {
  name: "asinto benavente rodrigues",
  score: -4,
};

// 1h15m Omit<T> and Exclude<T> Realmente no tiene mucho estos tipos, simplemente extrayen o excluyen keys de un tipo(si las extraen solo puedo pasar las que no hayan sido extraidas, si las excluyen solo puedo pasar las que no hayan sido excluidas)
type CustomExtract<T, U> = T extends U ? T : never;

type CustomExclude<T, U> = T extends U ? never : T;

type U1 = 'a' | 'b' | 'c';
type U2 = 'x' | 'z' | 'b';
type U3 = 'c' | 'z' | 'b';

const _aE: CustomExtract<U1, U2> = 'b';
const _bE: CustomExclude<U1, U2> = 'a';

const _cE: CustomExtract<U2, U3> = 'z';
const _dE: CustomExclude<U2, U3> = 'x';

const _e: CustomExclude<U2, U1> = 'x';
const _f: CustomExtract<U2, U1> = 'b';