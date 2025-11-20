// https://www.youtube.com/watch?v=VawXm6ki6BI
// un type guard son formas de evaluar el tipo de una variable para asi asegurar el tipo de una forma más segura, ya que Typescript es un lenguaje muy dinámico, a veces los argumentos permiten varios tipos,etc
// hay muchas formas de crear type guards, una de ellas es con un type predicate, un special return type.Es decir un type predicate va en una type guard, pero una type guard no tiene porque llevar solo type predicates, puede hacerse con los operadores typeof instance of o key in object

// type guard usando el operador typeof
function width(size: number | string): void {
  if (typeof size === "string") {
    return void 0;
  }
  return void 0;
}

// instanceof lo mismo pero para comprobar instancias 
function throwError(err: string | Error): string {
  if(err instanceof Error) return err.message
  return err;
}

// in operator para comprobar si existe una propiedad en una instancia, key en un object
function createServiceWorker(navigator: Navigator): void{
  if('serviceWorker' in navigator){
    // code
  }
}

interface Card {
  balance: number
}
interface Debit extends Card {
  level: string;
}
interface Credit extends Card {
  creditLimit: number
}
// pudiera parecer que esta funcion hace el narrowing pero no lo hace porque es muy asinta
function isCreditCard(card: Credit | Debit): boolean {
  return 'creditLimit' in card;
}

function isCreditCardPredicate(card: Credit | Debit): card is Credit {
  return 'creditLimit' in card;
}

function checkout(card: Credit | Debit, amount: number){
  //! si uso el otro type guard TS no hace el narrowing (de echo hace el widening hasta la superclase porque no sabe si es una u otra y solo toma lo común a ambas)
  //? Con un type predicate si hace el narrowing
  if(isCreditCardPredicate(card)){
    if(amount > card.creditLimit){
      return ''
    }
  }
}