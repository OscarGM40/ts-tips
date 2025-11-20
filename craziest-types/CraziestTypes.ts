// https://www.youtube.com/watch?v=4wHgZVSYmpo
type Numbers = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type Parentheses = "(" | ")";

type Operators = "+" | "-" | "*" | "/";

// We can have a state machine that for example if we have a number the next allowed thing should be an Operator

type AfterNumbers = { [key in Numbers]: Operators | ")" | Numbers | "" };

type AfterOperators = { [key in Operators]: Numbers | "(" };

type AfterParentheses = { "(": "(" | Numbers; ")": Operators | ")" | "" };

// Intersection type
type NextAllowed = AfterNumbers & AfterOperators & AfterParentheses;
// Union type
type AllAllowed = Numbers | Parentheses | Operators;

type AllowedStarts = {
  [key in Numbers]: Operators | Numbers | "";
} & { "(": Numbers };

// we will need this helper too
type IsEmpty<T extends string | unknown[]> = T extends ""
  ? true
  : T["length"] extends 0 // recuerda que tipando puedo mirar si un arreglo está vacio con T['length'] extends 0
  ? true
  : false;

// este type Remove itera por el string y si el char actual es igual que ToRemove se quita, luego se llamará asi Remove<T, ' '>; fijate que podria quitar cualquier cosa, interesante. Al final es un replace pero en un tipo
type Remove<
  T,
  ToRemove extends string, //ToRemove es un parametro,
  Collector extends string = "",
> = T extends `${infer Head}${infer Remaining}` // Head es el primer char, Remaining el resto.Si se cumple que hay un siguiente char se vuelve a llamar recursivamente con el Remaining
  ? Remove<Remaining, ToRemove, `${Collector}${Head extends ToRemove ? "" : Head}`> // si Head extiende de ToRemove se sustituye por un empty string, si no se agrega al Collector
  : Collector; // finalmente devolvemos el collector, que será el string modificado. es un replace pero en un mapped type

//
type First<T extends string> = IsEmpty<T> extends true
  ? ""
  : T extends `${infer Head extends AllAllowed}${string}`
  ? Head
  : "";

type CorrectStart<T extends string> =
  T extends `${infer Head extends keyof AllowedStarts}${infer Remaining}`
    ? First<Remaining> extends AllowedStarts[Head] // check if the first element in Remaining is in the values of AllowedStarts[Head ]
      ? true
      : false
    : false;

type IsNextAllowed<T extends string> =
  T extends `${infer Head extends AllAllowed}${infer Remaining}`
    ? First<Remaining> extends NextAllowed[Head]
      ? IsNextAllowed<Remaining>
      : false
    : IsEmpty<T>;

type Test = IsNextAllowed<"+2">; // da true porque solo está mirando por el 2, no por el first char(eso es para el CorrectStart)
type Test2 = IsNextAllowed<"1+2">;

// para los parenthesis vamos a usar un stack. Si por ejemplo tenemos [((] cuando encuentre un parentesis de cierre quitamos el último, luego el stack quedaría asi [(] Al final tendrá que quedar un stack vacío, sino es asi los parentesis están mal puestos
// aparte tmb hay que mirar el orden
// para generar el stack podemos usar el type Remove y quitar todo lo que no sean parentesis, de esta forma generamos el stack muy rápidamente
type OnlyParentheses<T extends string> = Remove<T, Exclude<AllAllowed | " ", Parentheses>>;

type Test3 = OnlyParentheses<"2 + 3 (2 + 2)">;

type isEmptyString<S extends string> = [IsEmpty<S>] extends true[] ? true : false;
type isEmptyStringB<S extends string> = IsEmpty<S> extends true ? true : false;

type isEmptyArray<A extends unknown[]> = [A["length"] extends 0 ? true : false] extends true[]
  ? true
  : false;

type RemoveNullishes<A extends unknown[], Collector extends unknown[] = []> = A extends [
  infer Head,
  ...infer Tail,
] // si tiene elemento el arreglo
  ? Head extends "" | null | undefined
    ? RemoveNullishes<Tail, Collector>
    : RemoveNullishes<Tail, [...Collector, Head]>
  : Collector;

type test05 = RemoveNullishes<[4, null, "", "", undefined, 5]>;
type test01 = isEmptyArray<[1]>;
type test02 = isEmptyArray<[]>;
type test03 = isEmptyArray<["", null, undefined]>; // ojo que no es un arreglo vacio
type test04 = isEmptyArray<RemoveNullishes<["", null, undefined]>>; // ojo que no es un arreglo vacio

type EmptyStringAndEmptyArray<S extends string, A extends any[]> = [
  IsEmpty<S>,
  IsEmpty<A>,
] extends true[]
  ? true
  : false;

type ParenthesesCheck<
  T extends string, // T será un string con todos los parentheses '(())', luego hay que chequearlo iterandolo (la recursividad del tipo lo iterará) y vaciarlo
  Stack extends Parentheses[] = [],
> = T extends `(${infer Remaining}`
  ? ParenthesesCheck<Remaining, ["(", ...Stack]> // si T empieza con un parentesis de apertura es correcto y puede haber varios, asi que simplemente usamos recursividad, pero ojo, que hay que añadirlo al Stack, amazing spaidermen
  : T extends `)${infer Remaining}`
  ? Stack extends ["(", ...infer RemainingStack extends Parentheses[]]
    ? ParenthesesCheck<Remaining, RemainingStack>
    : false
  : IsEmpty<T> extends true
  ? IsEmpty<Stack> extends true
    ? true
    : false
  : EmptyStringAndEmptyArray<T, Stack>;

type Test4 = ParenthesesCheck<"(())">;
type Test5 = ParenthesesCheck<"()">;
type Test6 = ParenthesesCheck<")(">;

// fijate en este tipo, como se declara un arreglo de validadores [Validator1, Validator2] extends true[]. Si fuera uno simplemente usar approach sin arreglo
type CalculatorValidator<T extends string, NoSpace extends string = Remove<T, " ">> = [
  ParenthesesCheck<OnlyParentheses<T>>,
  CorrectStart<NoSpace>, // NoSpace devuelve T porque Remove<T,Remover,Collector> devuelve el collector, al llamarlo ya tengo T
  IsNextAllowed<NoSpace>,
] extends true[]
  ? T // si pasa los validadores devolvemos T
  : never;

function validate<T extends string>(input: CalculatorValidator<T>) {
  return input;
}

const v1 = validate("(1 * (2 + 3))");
const v2 = validate("3 * (5 + 2) / (4 - 1)");
const v3 = validate("((7 - 2) * 4) / (3 + 1)");
const v4 = validate("10 - ((2 + 3) * 4)");
const v5 = validate("((2 * 3) + 5) / (6 - 1)");
const v6 = validate("(1 + 2) * 3 - 4 / (5 + 6)");
const v7 = validate("2 * ((3 + 4) * (5 - 1)) / 6");
const v8 = validate("((8 / 2) + (7 * 2)) * (9 - 1)");
const v9 = validate("(2 * (3 + 4) / (5 - 1))");
const v10 = validate("(10 - 2) / (3 + (5 - 4))");

const e2 = validate("(4 * 6 + 3) / )2 - 1("); //(mismatched brackets)
const e3 = validate("3 * / 2"); //(missing operand)
const e4 = validate("(2+3)*(4-)"); //(missing operand)
const e5 = validate("5 + * 3"); // (misplaced operator)
const e6 = validate("((7 - 2) * 4 / (3 + 1)"); // (missing closing bracket)
const e7 = validate("2 * (3 + 4)) * (5 - 1)) / 6"); // (mismatched brackets)
const e8 = validate("((8 / 2) + (7 * 2)) * (9 - 1"); // (missing closing bracket)
const e9 = validate("2 * (3 + 4) / (5 - 1))"); // (mismatched brackets)
const e10 = validate("(10 - 2) / (3 + (5 - 4)) + "); // (missing operand)
