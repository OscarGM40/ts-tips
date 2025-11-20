// https://www.youtube.com/watch?v=SLEAyGPLtR0
interface User {
  id: number;
  description: string;
  isActive: boolean;
}

// type is more flexible,
type MapUser {
  [name: string]: User
}

const users: MapUser = {
  Juan: {
    id: 1,
    description: "Web developer",
    isActive: true,
  },
  Fran: {
    id: 2,
    description: "Web developer",
    isActive: true,
  },
  Hector: {
    id: 3,  
    description: 'Web developer',
    isActive: false
  }
};

type QuerySelection<T> = {
  [K in keyof T]?: boolean; 
}

// muchas veces para que no sea tan verboso y confuso se sacan conditional types a otros tipos( solo conditionals?? )
type Contain<K,T> = K extends keyof T ? K: never; 

type Truely<T> = {
  // interesante en el key remapping no accedimos a la key, sino a T[K], al value, y comprobamos si es un true, 
  [K in keyof T as T[K] extends true ? K : never]: T[K]
}  

type QueryResult<T,S> = {
  // [K in keyof T as K extends keyof S ? P : never]: T[K]
  // dado que es un QueryResult además no deberia poderse modificar las properties asi que van readonly tmb
  readonly [K in keyof T as Contain<K,Truely<S>>]: T[K]
}
class Model<T> {
  // en typescript puedo crear funciones genéricas y clases genéricas perfectamente (function<T> o class<T>)
  // fijate que aqui el problema es que el tipo no puede vivir solo en los argumentos, ya que lo necesita en el return, luego hay que crear una funcion generica. Fijate que en QueryResult S es un tipo, no las keys
  select<S extends QuerySelection<T>>(selection:  S): QueryResult<T,S> {
    return {} as T 
  }
}
const m = new Model<User>;
const result = m.select({
  id: true,
  description: false,
  // isActive: true
})