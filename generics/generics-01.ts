// al usar <T>() delante de una función se le llama typeArgument.Ese type puede tipar el retorno o cualquier argumento, ojo, toda la función tiene visión sobre él
// a generic function is just a normal funcion with a type helper mapped on top of it (so this is a generic function)
const makeFetch = <TData>(url: string): Promise<TData> => {
  return fetch(url).then((res) => res.json());
};

makeFetch<{ name: string; lastName: string; age: number }>("/api/endpoint").then((data) =>
  console.log(data),
);

// we want to have only a set of numbers, currently we can add anything
const untypedSet = new Set();
untypedSet.add(1);
untypedSet.add("abc");

// since the interface typing set is interface Set<T> we can pass it a generic
const typedSet = new Set<number>();
typedSet.add(1);
// typedSet.add("jasdkf")

//tip 04 inferring types passed to funcions
//You don't always have to pass the types to a generic function! See how the type helper is used in the arguments and the return type
const addIdToObject = <T>(obj: T): T & { id: string } => {
  return {
    ...obj,
    id: "123",
  };
};

// if Typescript can infer the type it will do it
const result = addIdToObject({
  firstName: "aslkdfj",
  lastName: "fksjf",
});
console.log(result.id);

// tip 05 generic constraints Awaited<T> is like if I call await T. Since we always use await function (await getData...) the signature needs the ReturnType of that function so it is gonna be Awaited<ReturnType<getData>>
// fijate que T extends (...args: any) => any es la constraint, obligada por usar ReturnType
type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

type Result = GetPromiseReturnType<() => Promise<{ firstName: string }>>;

type AwaitedTypeNumber = GetPromiseReturnType<() => number>;

// estas constraints son muy útiles ya que obligan a que el type helper sea de un tipo,etc

// tip 06 generic constraints advanced. IMPORTANTE, fijate que T extends {} no me vale para mucho, si quiero retornar value: number tiene que ser T extends Record<string, number>. Esto si parece útil, pero no sé si para las keys o los values o ambos

const getKeyWithHighestValue = <TObj extends Record<string, number>>(
  obj: TObj,
): {
  key: keyof TObj;
  value: number;
} => {
  const keys = Object.keys(obj) as Array<keyof TObj>;
  let highestKey: keyof TObj = keys[0];
  let highestValue = obj[highestKey];

  for (const key of keys) {
    if (obj[key] > highestValue) {
      highestKey = key;
      highestValue = obj[key];
    }
  }
  return {
    key: highestKey,
    value: highestValue,
  };
};

// tip 07 as-is-ok
// Sometimes I will have to override the types inside the generic function with an assertion. That is OK!
const typedObjectKeys = <TObj extends {}>(obj: TObj): Array<keyof TObj> => {
  return Object.keys(obj) as Array<keyof TObj>; // falla porque Object.keys(obj) devuelve un array de strings y hemos tipado la generic function como : Array<keyof T>. Puedo hacer una assertion en el return
};

const result3 = typedObjectKeys({
  name: "John",
  age: 30,
});

// tip 08 multiple generics,
/* const getValue = (obj: unknown, key: unknown) => {
  return obj[key] <- aqui se va a quejar porque igual obj no es un objeto ni key es una key válida
} */

// fijate que al hacer esto hay inferencia de types desde los genéricos hasta los argumentos y despues al return
const getValue = <T extends {}, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};
const result4 = getValue(
  {
    a: 1,
    b: "some-string",
  },
  "a",
);

// tip 09 default generics. Siempre puedo asignar un valor por defecto a un genérico. Puede ser muy util
export const createSet = <T = string>() => {
  return new Set<T>();
};
const numberSet = createSet<number>();
const stringSet = createSet<string>();

const defaultSet = createSet();

// satisfies Keyword
type Locations = "Zurich" | "Oslo" | "Madrid";

function getCountryForLocations(location: Locations): string {
  switch (location) {
    case "Zurich":
      return "Switzerland";
    case "Oslo":
      return "Denmark";
    case "Madrid":
      return "Hala Merengo"
    default:
      throw new Error(`${location satisfies never} is not known`);
  }
}
