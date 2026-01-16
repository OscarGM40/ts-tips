// https://www.youtube.com/watch?v=7HCvrd66ooM
//* Partial<T> and CleanedPartial

// casuistica:
//! Una tupla es un array que debe contener ciertos tipos en un cierto orden

const tuple1: [number, string, number, number] = [1, "hey", 3, 4];
const obj1 = {
  id: 1,
  name: "John",
  score: 45,
};

type CustomPartial<T> = {
  [K in keyof T]?: T[K];
};
//! Importante, dado que Partial<T> permite pasar como valor un undefined, muchas veces es buena idea removerlos. Ya existe un built-in type que hace esto y es NonNullable<T> (con lo que se puede concatenar a un Partial para remover undefineds, gran idea)
//! type NonNullable<T> = T extends undefined | null ? never: T; <- esta es la firma, fijate que va a funcionar a nivel de valor tratandolos como un string literal type,etc, ya que estamos en el nivel de tipado
//! Fijate que no tengo que usar el segundo generico, ya tiene un valor por defecto, y que es K in keyof PT, que ya es el Partial de T, luego no tengo porque poner todas las keys,y me va a remover los undefined
type CleanedPartial<T extends unknown[], PT = Partial<T>> = {
  [K in keyof PT]: NonNullable<PT[K]>;
};

const _tuple: typeof tuple1 = [7, "bye", 3, 4];
const _pTuple: Partial<typeof tuple1> = [1, undefined, 3, 4];
const _cTuple: CustomPartial<typeof tuple1> = [1, undefined];
const _cdTuple: CleanedPartial<typeof tuple1> = [1, undefined];

// fijate como si tipamos una variable con un tipo cualquiera tenemos que cumplir el contrato. Fijate que ademas no puedo pasar undefined si se espera un number o un string
const _obj: typeof obj1 = {
  id: 3,
  name: "dafffaf",
  score: 43,
};

// pero con Partial<T> no hace falta pasarle todas las keys, e incluso se puede pasar como valor undefined a una key (aunque me traería las keys con un Object.keys(obj) ya que tiene dos keys)
const pObj: Partial<typeof obj1> = {
  id: undefined,
  name: "Mike",
};