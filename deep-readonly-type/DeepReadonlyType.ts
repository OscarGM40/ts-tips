// https://www.youtube.com/watch?v=uuOjb7WeXMM

type Person = {
  name: string;
  address: {
    street: string;
    nr: string;
  };
};

const person: Readonly<Person> = {
  name: "Christian",
  address: {
    street: "Street",
    nr: "1",
  },
};

// person.name = "Anything"; // si wrapeara Person como Readonly<Person> no puedo cambiar el name,obviamente
person.address.street = "Anything"; // pero si que puedo cambiar cualquier propiedad de segundo o más nivel, wtf
//? Esto es porque Readonly solo marca como readonly las propiedades de primer nivel

// Y desde aqui hay que tener cuidado porque otros data types como Date funcionan de otra forma
const date: Readonly<Date> = new Date();
date.setHours(1); // fijate que puedo cambiar las horas pero realmente no queria que esa date pudiera cambiar...

const person2: BetterReadonly<Person> = {
  name: "Christian",
  address: {
    street: "Street",
    nr: "1",
  },
};
Object.freeze(person2); // Object.freeze(obj) no permite cambiar el valor de ninguna propiedad
// person2.name = "1"; // sin embargo Object.freeze no da ningun compile time error, simplemente no la cambia
person2.address.street = "another street"; // pero ojo, si veo el tipo de Object.freeze puedo ver que devuelve Readonly<T>, asi que de nuevo tenemos el mismo problema
console.log(person2);

//? Asi pues necesitamos un type Readonly que haga:
// 1. DeepReadonly <- itere por todos los niveles de la data structure
// 2. Remove certains functions on readonly objects like setHours,etc
// 3. Object.freeze should use our BetterReadonly

// primero miramos si alguna key(T) empieza por setX y despues de ese set por una mayúscula
type NeverOnSet<T> = T extends `set${infer Remaining}`
  ? Remaining extends Capitalize<Remaining>
    ? never
    : T
  : T;

// porque el Deep?
type BetterReadonly<T, Deep extends boolean = true> = {
  readonly [Key in keyof T as T[Key] extends (...args: unknown[]) => unknown
    ? NeverOnSet<Key>
    : Key]: Deep extends true ? (T[Key] extends object ? BetterReadonly<T[Key]> : T[Key]) : T[Key];
};

const date2: BetterReadonly<Date> = new Date();
// date2.setHours(2);

// y para el punto 3 podemos cambiar de forma global el constructor de Object (fijate que Object.freeze es un método estático de clase Object)
declare var Object: Omit<ObjectConstructor, "freeze"> & {
  freeze<T>(obj: T): BetterReadonly<T>;
};

const person3: Person = {
  name: "Christian",
  address: {
    street: "Street",
    nr: "1",
  },
};
Object.freeze(person3)
person3.address.street = 'asnflkjsfkj'
console.log(person3)

const isDefined = <T>(value: T | undefined): value is T => value !== undefined;
const numbers = [undefined,1,2,undefined,3,4].filter(isDefined);
console.log(numbers)