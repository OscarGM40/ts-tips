// https://www.youtube.com/watch?v=Yz8ySbaeCf8
// Problem, sometimes typing a field as string is not enough (for example an email field)

const email: string = "hi@youtube.com";

function sendEmail(address: Email, text: string): void {
  console.log(`Send email to ${address} with text ${text}`);
}

// obviously we can send anything as address.One solution could be using a type guard, an if in the first line of the function, but we really want to be sure that the function is called. Ojo, con un type guard siempre me voy a asegurar el narrowing (if user.data <- se que hay data)
function isValidEmail(input: string): input is Email {
  return input.includes("@");
}

if (isValidEmail(email)) {
  sendEmail(email, "our text"); //fijate que aqui funciona porque isValidEmail recibe un string pero si ese string incluye una @ le estoy haciendo narrowing a Email, luego en sendEmail email ya es un Email. Obviamente estoy engañando a typescript
}

// Obviamente decir que input is Email siendo Email un string no vale para mucho
// type Email = string;

declare const __brand: unique symbol;
type Email = string & { [__brand]: "Email" };

assertValidEmail(email); // fijate que desde esta línea en adelante email será un Email(si pasa el assert,claro)
sendEmail(email, "sakdfj");

//
type Branded<T, Brand> = T & { [__brand]: Brand };
type BrandedEmail = Branded<string, "Email ">;
type UUID = Branded<string, "UUID">;

function assertValidEmail(input: string): asserts input is Email {
  if (!input.includes("@")) {
    throw new Error("Input is not an email");
  }
  /* return input.includes('@') */ // en cuanto le ponga el asserts ya no puedo devolver un boolean, cualquier function con un asserts como return retorna void. Y lo que tengo que hacer es decir que hay que hacer es el caso de que vayamos por el error la aserción. Diria que siempre lanzaré al menos un error y habrá una comprobación tmb. IMPORTANTE que esta funcion hace narrowing tmb y despues de la llamada al assert se cumplirá siempre la condición (en este caso input será un Email)
}

// es function name<Generic>(value<Generic) por que se usó la keyword function. Necesita el genérico para pasarlo del argumento al return,entiendo
function assertIsDefined<T>(value: T): asserts value is T { // assert value is T vs value is NonNullable<T>
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`); // tenemos este ${value} ??
  }
}

assertIsDefined(email);
//  necesita el genérico por el return?? 
const assertIsDefinedArrow = <T>(value: T): asserts value is NonNullable<T> => {
  if(value === undefined){
    throw new Error('fjklasdjf')
  }
}
// al loro, Typescript no puede usar arrowFunctions para assertions, tiene que ser un funcion name<T>(value:T): asserts value is T {}
// assertIsDefinedArrow({});