// 1- key-vs-value-optional Puede haber situaciones en las que en vez de hacer la key opcional sea mejor hacer el valor opcional (ctx: { traceId: string | undefined }). Con esto puedo ganar en legibilidad, ya que siempre tendré que pasar la key, aunque sea con un undefined

const doThing = (ctx: { traceId?: string }) => {};
const doAnotherThing = (ctx: { traceId?: string }) => {};

export const mainFunction = (ctx: { traceId?: string }) => {
  doThing({ traceId: ctx.traceId });
  doAnotherThing({ traceId: ctx.traceId });
};

//? Pick and Omit work in object shapes and Extract and Exclude work on union types

type Album = {
  title: string;
  artist: string;
  releaseYear?: number;
  genre?: {
    parentGenre?: string;
    subGenre?: string;
  };
};
// as Album is an object Shape I have to use Pick<T,K> & Omit<T,K> (K is a Union of keys of the obj) Pick and Omit are pure functions that don't mutate T
type AlbumData1 = Pick<Album, "title" | "artist">;
type AlbumData2 = Omit<Album, "genre" | "releaseYear" | "id">; //fijate que omit no tiene autocompletado y le puedo pasar keys inexistentes por el tipado que le dio Typescript a la Union(no podían haberlo hecho mejor??)

// si por lo que fuera me confundo dará resultados raros, extrae todo y no excluye nada porque son object shapes y no union types.No confundirse aqui, asinto benavente
type AlbumDataExtract1 = Extract<Album, "title" | "artist">;
type AlbumDataExclude1 = Exclude<Album, "title" | "artist">;

// what is a discriminated union
// https://dev.to/darkmavis1980/what-are-typescript-discriminated-unions-5hbb
// A discriminated union is a Typescript feature that enables the creation of a type that can represent several different possibilities or variants. By attaching discriminators to each variant, Typescript's type system can help ensure that we handle all possible cases gracefully. Discriminators can be string literals, numeric literals or even symbols
//Using discriminated unions in my code brings numerous beneficts:
// 1 Improved type safety: with discriminated unions Typescript can ensure that all possible variants of a type are taken into consideration, eliminating the risk of undefined or unexpected behaviour at runtime
// 2 Enhanced autocompletion: IDEs and code editors can leverage the discriminators to provide accurate autocompletion suggestions based on the specific variant being handled
// 3 Better Code Maintainability: Discriminated unions make code easier to read and understand by explicity indicating the possible cases for a given type.

//* Este tipo puede que parezca que tiene sentido pero realmente una bike no puede tener puertas, es mejor usar un discriminated type
type Vehicle = {
  type: "motorbike" | "car";
  make: string;
  model: string;
  fuel: "petrol" | "diesel";
  doors?: number;
  bootSize?: number;
};

//lo primero es sacar los campos en común
type DiscriminatedVehicle = {
  make: string;
  model: string;
  fuel: "petrol" | "diesel";
} & ({ type: "motorbike" } | { type: "car"; doors?: number; bootSize?: number });

// esto es solo el principio, podemos hacer que las motos solo consuman un tipo de fuel, y sacar las variantes afuera para mejorar la legibilidad

type MotorBike = {
  type: "motorbike";
  fuel: "petrol";
};
type Car = {
  type: "car";
  doors: number;
  bootSize: number;
};

// TOP solution
type FinalDiscriminatedVehicle = {
  make: string;
  model: string;
  fuel: "petrol" | "diesel";
} & (Car | MotorBike);

const motorBike: FinalDiscriminatedVehicle = {
  type: "motorbike",
  fuel: "petrol",
  make: "1950",
  model: "Honda",
};
const car: FinalDiscriminatedVehicle = {
  type: "car",
  fuel: "diesel",
  make: "1950",
  model: "Honda",
  bootSize: 500,
  doors: 5,
};
// Importante, cuando use el type debo usar type guards (if (vehicle.type = "motorbike"){ }) y ya dentro de ese if Typescript me dará el tipado y autocompletado correcto (entiendo que dará todas las opciones sin una type guard)
type AlbumState =
  | {
      type: "released";
      releaseDate: string;
    }
  | {
      type: "recording";
      studio: string;
    }
  | {
      type: "mixing";
      engineer: string;
    };

// fijate que Exclude en una discriminated union con que encuentre una key ya se carga esa possibility/variant of the type (una discriminated union es un type de un conjunto de posibilidades) Excludes takes in a description of what you want to remove of a Union and then removes it
type NotReleased = Exclude<AlbumState, { type: "released" }>;
type NotReleased2 = Exclude<AlbumState, { releaseDate: string }>;

// Extract<T,U> does the opposite, only extracts those descriptions.
type RecordingAndMixing = Extract<AlbumState, { type: "recording"; studio: string }>;
type Example = "a" | "b" | 1 | 2;

// puedo extraer y excluir por primitivos en una union
type Strings = Extract<Example, string>;
type Numbers = Exclude<Example, string>;

// Anyway, memorize Pick & Omit vs Extract & Exclude

// Loose autocomplete trick.Imaginemos una union con modelos de AI. Esto obviamente se va a quedar obsoleto rápidamente. Si lo dejaramos asi solo va a aceptar 3 opciones. Para poder hacer esta union type extensible y que se le pueda pasar cualquier string (pero además no perder el autocompletado) le podemos añadir una última opcion que sea (string & {}). Ojo, si solo le pasaramos | string TS hace un aggresive reduce a string y perdemos el autocompletado
// Recuerda, esa intersection difiere el colapsado de la union a un single string
type ModelNames = "gpt-40" | "o3-mini" | "claude-sonnet-3.7" | (string & {}); // esto funciona porque esta intersection defiere el aggresive reduce a un string de la union

const model1: ModelNames = "sdjfk"; // con esa intesection no perdemos autocompletado y añadimos cualquier string a la union. Te cagas (autocomplete looseness, diria que es lo contrario al aggresive reduce )

// with mapped types I can take an existing object type and do any kind of transformation to it
type User = {
  id: string;
  name: string;
  age: number;
};

// the keyof operator returns a type with a single string or a union of the keys of an object shape (a string if it has only 1)Ojo, que devuelve un type
type UserTransformed = {
  // entiendo que lo hace iterar que keyof User devuelva una union type de las keys de un object shape
  [key in keyof User]: key;
};

type UserTransformed2 = {
  //fijate que puedo devolver lo que quiera, puedo pasar a array los valores
  [key in keyof User]: [key];
};
// fijate que siempre voy a querer hacer un [K in keyof T] como operando izquierdo. Pero además podemos añadir modificadores de acceso, por ejemplo
// o hacer todas las props opcionales (aunque para esto ya hay built-in types)
type UserTransformed3 = {
  readonly [key in keyof User]?: User[key];
};

// Sin embargo los mejores approaches vienen con el 'as' para transformar la key
type UserTransformed4 = {
  [K in keyof User as Capitalize<K>]: User[K];
};
// O incluso ir más lejos y usar template literals tras el as.Esto incluso podria ser un type en una app. Y obviamente puedo transformar la parte del value. En resument los mapped types son útiles no solo para iterar sino sobre todo para transformar mientras itere
type UserTransformed5 = {
  [K in keyof User as `get${Capitalize<K>}`]: () => User[K];
};

// IIC
type Actions = {
  login: {
    username: string;
    password: string;
  };
  logout: { reason: string };
  update: { id: string; data: unknown };
};

// tmb puedo pasar una union type en este index access type (es un index access type porque indexa un tipo )
type Values = Actions["login" | "logout"];
// esto me devuelve un type con todos los segundos niveles(y solo ellos) del primer type
type Values2 = Actions[keyof Actions];

type ActionADiscriminatedUnion =
  | { login: { username: string; password: string } }
  | { logout: { reason: string } }
  | { update: { id: string; data: unknown } };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // y ahora este tipo lo que hace es colapsar, evitando el lazy
// fijate como puedo añadir propiedades en un mapped type, ni siquiera es suficiente con las transformaciones
// y ni siquiera es suficiente con esto, sino que le puedo pasar wrapper types
// y aun no es suficiente,  puedo pasarle más cosas, como un index access type (type T = {}[keyof T]) Puto TypeScript
type ActionAsDiscoUnion = {
  [K in keyof Actions]: Prettify<
    {
      type: K;
    } & Actions[K]
  >;
}[keyof Actions];

// Reduce object through Object.entries(obj).reduce. We want a newObj with only keys that have "exist===true"
const someObj = {
  super: {
    exist: true,
  },
  photo: {
    exist: true,
  },
  request: {
    exist: false,
  },
};
const newObj = Object.entries(someObj).reduce((newObj: { [key: string]: typeof someObj[keyof typeof someObj] }, [key, val]) => {
  if (val.exist) {
    newObj[key] = val;
  }
  return newObj;
}, {});

console.log(newObj);
//activar mañana copilot, asintoo prehistoric
//keyof retorna un string o una union type con las keys de un object shape
//typeof retorna el tipo del operando a su derecha
console.log(typeof 43)

// https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
/* To understand the keyof typeof usage in Typescrip, first I need to understand what are literal type and union of literal types
1 - Literal type are omore specific types of string, number or boolean.For example type Greeting = "Hello"
Any object of type Greeting can only have the same string value ("Hello"). No other string value will be accepted (literal type)
Literal types are not useful on their own, however when combined with union types, type aliases and type guards they become powerful
2 Example of union of literal types
type Greeting = "Hello" | "Hi" | "Welcome";
Now the object of type Greeting can have any of these 3 values
3 -keyof: keyof T gives me a new type that is a union of literal types and these literal types are the keys of T
interface Person {
  name: string;
  age: number;
  location: string
}
 Using keyof Person will result in a type with the union of the keys as literal strings () 
 keyof typeof Enum | obj
 Since typeof operator gives me the type of an object, and since keyof T needs a type, if I don't have the type (any enum or object is not a type)
 I have to use keyof typeof object. For example enum Colors { white: 'fff', black: '000' }, this is not a type, to do keyof T I need the keyof typeof Colors and I will get "white" | "black" as a type .Esto porque una enum es un objeto en runtime

NOTA: typeof funciona diferente cuando es llamado en javascript objects o en typescript types
Typescript usa el typeof de javascript cuando se usa en valores de javascript en runtime y retorna el tipo de la variable
console.log(typeof {}) <- 'object'
Pero si es llamado en type expressions es el typeof de Typescripts, infiriendo el type del objeto y retornando el type
type Preferences = typeof { language: "ES"} <- esto es typescript, no me devuelve 'object' sino un type con ese object shape
y como keyof T es de Typescript keyof typeof T siempre va a llamar al typeof de Typescript, infiriendo el type de ese javascript object y despues haciendole el keyof, y por consiguiente termino con una union de las keys de ese T como type. Fijate que una enum es un javascript object
 */

