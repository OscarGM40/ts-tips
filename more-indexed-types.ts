// https://www.youtube.com/watch?v=uR6TaFsUlo0
// los tipos de acceso indexado lo que hacen es crear otros tipos basado en la indexación de ciertos tipos. Podemos indexar los object shape types, los arreglos y las tuplas

interface Person {
  name: string;
  age: number;
}

type Pair = [boolean, number];

type Tags = string[];

// fijate que 'age' es un string literal type, es un tipo
type AgeType = Person['age'];

// fijate que si hiciera Tags[1] 1 es un number literal type, sigue siendo un tipo,asintooo. Interesante.
// como además puede ser una union type el accessor mejor usar number cual prehistoric al-andalus
type tag = Tags[number];

// en una tupla puedo sacar la union de todos los tipos, obviamente puedo acceder a cualquier elemento por number literal type
type FirstPair = Pair[number]

// fijate que son todo tipos  (indexed access type, o tipos de acceso indexado). El indice es un tipo, no un valor, aunque pueda parecer al ver Pair[0] o Person['age']