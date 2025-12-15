// https://www.youtube.com/watch?v=PQU8z2RhRfs
//? Un symbol es un tipo de dato primitivo en javascript, pero éste nos devuelve valores únicos
//? La forma de crear un symbol es asi =>  Symbol(), fijate que no hay un new, es una función (aunque es algo rara y comparte cosas de una clase)

//! Si le hacemos un console.log veremos que nos devuelve simplemente Symbol(), no podemos ver el valor real
console.log(Symbol());
//! Pero si podemos ver que son valores diferentes
console.log(Symbol() === Symbol());

//! Un Symbol puede recibir una descripcion como argumento, y de esta forma identificarlos, ya que no veremos ese valor único irrepetible. Esto no hará que sean iguales. Estas label se pueden repetir, ya que pertenecen a un valor único diferente
console.log(Symbol("symb 1") === Symbol("symb 1"));

// Son bastante usados para crear propiedades únicas en objetos y que no puedan ser accedidas desde afuera.Puede ser por seguridad, pero tmb se usa en librerias para que no se puedan pisar sus keys

const token = Symbol("token"); // por ejemplo una libraria define una key asi

// y expone un objeto a consumir por los developers, pero nunca podrań pisar accidentalmente esa key
// necesito usar brackets si la key es una variable ya definida
const obj = {
  [token]: 1,
};

//! Un Symbol tiene varias propiedades estáticas, las cuales se pueden usar. Además internamente el lenguaje siempre crea una función que nos devuelve un Symbol.
// console.log(Symbol.hasInstance)
class Person {
  // puedo pisar este método (que al final sería pisar el instanceof) No parece tener mucho sentido pisar el comportamiento nativo del operador
  /* static [Symbol.hasInstance](instance){
    return true;
   } */
}
// esta función Symbol.has instance(instance) siempre es llamada cuando se usa el operador instance of (por ejemplo 'string' instanceof Person la llama). Es llamada con el valor a comparar
console.log(Person[Symbol.hasInstance]); //la función que crea Javascript en una clase es está, aqui está sin argumentos
console.log(Person[Symbol.hasInstance]("string")); //! LA llamada sería asi
console.log(Person[Symbol.hasInstance](new Person())); //! LA llamada sería asi, obviamente será true aqui

//? Este comportamiento se puede modificar igual que se puede pisar el toString o compare

// Internamente Javascript tmb usa Symbol para iterar (en el const of, los Map y los Set)
console.log(Array.prototype[Symbol.iterator]); // aqui veré que existe esta prop y que es una funcion, igual que antes

//Array.prototype[Symbol.iterator] = null; // si la pisara dejaría de poder iterar, de nuevo no tiene sentido pisar este comportamiento
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}
