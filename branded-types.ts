// type Aliases are just when we use the type keyword to type alias one type to another (type CardInfoViewModel = CardInfo es un type alias)

// I can do this even with primitives or built-in types
type EmailAddress = string;

// And I can do this with intersections too
type EmailAddress2 = string & number;
// sin embargo no existe un tipo que pueda ser string y number a la vez asi que typescript lo reduce a never

// para evitar esto parece que siempre se hace la intersección de string y un objeto. Typescript no lo reduce a never porque es un possible type
type EmailAddress3 = string & { __brand: "EmailAdress" };

// si bien podemos tipar el retorno de esta función como boolean tmb se puede tipar asi, si la funcion retorna true se considerará que esa expresión resuelve correctamente (y tengo un EmailAddress narrowed, entiendo). Si resuelve a false a saber, asinto
// es decir, si retorna true hace un casteo, estamos haciendo override del type. Fijate que podemos hacer un type assertion, pero eso es mala idea, es mejor usar este tipo de funciones.Parecen realmente apropiadas para validaciones, comprobaciones
function isEmailAddress(email: string): email is EmailAddress3 {
  return email.includes("@gmail.com");
}

function sendWelcomeEmail(e: EmailAddress3) {
  // ...
}

function signUp(email: string) {
  // con la assert ya tengo el type cast desde la linea siguiente
  assertEmailAddress(email)
  sendWelcomeEmail(email);


  // con la checker function solo si hago un if. Interesante
  if (isEmailAddress(email)) {
    sendWelcomeEmail(email);
  }
}

// sendWelcomeEmail('sadkf' as EmailAddress3)

// NOTA: aparte de la funcion checker que downcastea el primitivo tmb se puede usar una assert function de forma muy parecida
// Si el argumento no pasa la aserción debo lanzar un error, asi que no puedo retornar un boolean
function assertEmailAddress(email: string): asserts email is EmailAddress3 {
  if (!email.includes("@gmail.com")) {
    throw new Error(`Invalid argument ${email} is not an email address`);
  }
}
// Entiendo que la diferencia es querer lanzar un error, pues es algo critico. Es mi assertDefined
// en cuanto se llame a la assert function ya se hace el casteo tmb del tipo desde esa linea, lo cual es más útil que el if, pues el scope es más amplio (sin embargo tira un error)   


type Color = "red" | "blue" | (string & {})
type Status = "loading" | "error" | (string & {
  __brand: 'Status'
})

function printColor(c: Color){
  console.log("Color: ", c)
}
function printStatus(s: Status){
  console.log("Status: ", s)
}

const myColor: Color = "orange"
const myStatus: Status = "loaded" as Status

printColor(myStatus)
printStatus(myColor)