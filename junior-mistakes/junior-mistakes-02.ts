
//! Error: not using type predicates
type Species = "cat" | "dog"; // fijate que esto podria sacarlo de un literal object

interface Pet {
  species: Species;
}

class Cat implements Pet {
  public species: Species = "cat";
  public meow(): void {
    console.log("Meow");
  }
  public jump(): void {
    console.log("Jumping...");
  }
}

function petIsCat(pet: Pet): pet is Cat {
  return pet.species === "cat";
}

// fijate que ambas tienen el mismo return pero una hará el narrowing del tipo y otra no
function petIsCatBoolean(pet: Pet): boolean {
  return pet.species === "cat";
}

const p: Pet = new Cat();

// fijate que TS no hace el narrowing, no es el return type que debo usar, pues obliga a una type assertion
if (petIsCatBoolean(p)) {
  (p as Cat).meow();
}
// con una type guard si que hace el narrowing el muy repugnante
if (petIsCat(p)) {
  p.meow();
}

// tye guards with type predicates are perfect for discriminated unions

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; base: number; height: number };

//type guard for discriminated union
function isCircle(shape: Shape): shape is Extract<Shape, { kind: "circle" }> {
  return shape.kind === "circle";
}

function getArea(shape: Shape): number {
  if (isCircle(shape)) {
    // ts knows here shape is a circle
    return Math.PI * shape.radius * shape.radius;
  }
  // Handle other things (fijate que podria usar varias type guards en una funcion agrupadora, interesante)
  return 0
}
// TIP casi todas las type assertions podrian cambiarse por type guards con type predicates, buscar por 'as' es buena idea?
