// https://www.youtube.com/watch?v=JyUwtRuMKUk

// tomando un conditional type podria pasarlo como generico
type ASimpleUnion = "checkbox" | undefined | number | "text";
// fijate que le hace flatening y lo trata como una sola cosa, será un array de strings o number
type A1 = Array<ASimpleUnion>; // the same as Array<string | number>

// pero que pasa si quiero 'distribuir' los types? En TS se puede hacer, para ello hay que usar generic parameters with conditional types
type A3 = Array<string> | Array<number>;

// aqui A4 da never pues AsimpleUnion no solo extiende de string
type A4 = ASimpleUnion extends string ? ASimpleUnion : never;

// pero ya hemos dicho que se pueden distribuir los types usando un generic parameter
type OnlyString<T> = T extends string ? T : never;
// aqui aunque AsimpleUnion devolvia never ahora al pasar por el generic A5 es string.Es decir, está filtrando
// la clave está en que al ser un generico itera por todo el union type( pero el otro tmb deberia,xd )
type A5 = OnlyString<ASimpleUnion>;

type ToArray<T> = T extends T ? Array<T> : never;

type A6 = ToArray<ASimpleUnion>;

type FormResponse =
  | {
      id: string;
      type: "checkbox";
      value: boolean;
    }
  | {
      id: string;
      type: "text";
      value: string;
    };

// if I want to avoid the distribuion I can use [T] extends [T], I supose it could be helpful but this distributive type is helpful 100%
// fijate que puedo tipar K ya que sé que va a ser una key y tengo el built-in type PropertyKey (en vez de usar string | number | symbol que  son los unicos primitivos que pueden pasarse como key) super top trick
type DistributiveOmit<T, K extends PropertyKey> = T extends T ? Omit<T, K> : never;
// incluso si sé que voy a omitir keys del objeto T puedo usar <T, K extends keyofT>, representa mejor lo que se quiere

// este es el problema, partiendo de una discriminated union perdemos el widening en algun punto (en este caso en el Omit) y hace el flatten de todo el tipo
// type RenderedFormResponse = Omit<FormResponse, 'id'>
type RenderedFormResponse = Exclude<FormResponse, "id">;
// type RenderedFormResponse = DistributiveOmit<FormResponse, "id">;

declare const f: RenderedFormResponse;
// ahora de nuevo tenemos value bien tipado
if (f.type === "checkbox") {
  f.value;
} else {
  f.value;
}

type Union = "a" | "b" | 4 | symbol;
type A = { [member in Union]: Array<member> };

type B = A[keyof A];

const person = {
  id: "kjasdf",
  age: 44,
} as const satisfies { id: string; age: number };

const colors = ["red", "blue", "orange"] as const satisfies Array<string>;

// fijate que puedo pasar una union como accesor, y fijate que es lo que hago cuando uso type Status = typeof Status[keyof typeofStatus]
type ColorFromUnion = (typeof colors)[0 | 1 | 2];
// y al final para que me traiga todos los indices posibles como una union en los arreglos tengo 'number' que puedo verlo como el keyof typeof T, me devuelve una union de todos los indices (it's a union of all possible numbers indexing the array)
type Color = (typeof colors)[number];

const toRGB = (color: Color): string => {
  switch (color) {
    case "blue":
      return "#kdsfjf";
    case "orange":
      return "askdjf";
    case "red":
      return "skajf";
    default:
      color satisfies never;
      // the compiler needs this function to return something outside the switch, I can bring over some approaches like this throw, an assert, the constraint outside the switch...
      throw new Error('askdf')
  }
  // color satisfies never;
};

// in Typescript as const is a type assertion (as Jest.Mock<T>) is also a type assertion) that tells the compiler to infer the narrowest possible type for a value, making it inmutable by converting literals into read-only types
