// https://www.youtube.com/watch?v=1f6g2Rs703c

type Route = { path: string; title?: string };
type Routes = Record<string, Route>;

// nitpick, declare the object readonly and wait for the narrowest type possible with {} as const satisfies T
const routes = {
  AUTH: {
    path: "/auth",
    title: "Login Page",
  },
  REGISTER: {
    path: "/register",
  },
} as const satisfies Routes;

routes.REGISTER.path;

// https://www.youtube.com/watch?v=-Z5BNNQt4bE Record Type
// Hay ciertas ocasiones en las que necesito que typescript me deje dinámicamente agregar propiedades a un objeto (no pudiendo crear una interface porque esto define ya las propiedades de forma estática). Por ejemplo el tipico objeto colors =>
//! Que pasa si queremos añadir más colores?? No parece buena idea crear una interfaz inicial con green, blue y red, sino que deberia poder tener un tipo que puede definir las keys de forma dinámica.

//! Si bien puedo crear un type con una index signature no lo necesito crear, ya existe un utility type que hace lo mismo, al andalus
type Color = { [key: string]: string }; // same as Record<K,V>

// const colors: Color = {
const colors: Record<string, string> = {
  green: "rgb(0,255,0)",
  blue: "rgb(0,0,255)",
  red: "rgb(255,0,0)",
};

colors.yellow = "rgb(fk,fksj,fa)";

console.log(colors["yellow"]);

//? Que pasa si tuviera un diccionario de users con cualquier identificador como key? Fijate que tener un dict tiene sus ventajas sobre tener un arreglo.Por ejemplo para buscar puedo hacer un acceso por indice y si viene un user bien, sino viene undefined, en un arreglo habria que iterarlo. Igual habrá mejores ventajas
interface Person {
  id: number;
  name: string;
  lastName: string;
}

//* La solucion para crear un dict es tan simple como usar un Record<string, Person>
const users = {
  23: {
    id: 23,
    name: "Nicolas",
    lastName: "Molina",
  },
  34: {
    id: 34,
    name: "Santiago",
    lastName: "Molina",
  },
};

//* Y este tipo de diccionarios si se puede es mejor pasarle las keys concretas en vez de string para que no cree una index signature haciendo broadening a string 
type Status = {
  icon: string;
  color: string;
};
type AllowedStatuses = 'progress' | 'failed' | 'completed';

const StatusTypes = {
  progress: { icon: "icon-progress", color: "blue" },
  failed: { icon: "icon-failed", color: "red" },
  completed: { icon: "icon-completed", color: "green" },
  // wrongStatus: { icon: "icon-wrong", color: "black" },
} as const satisfies Record<AllowedStatuses, Status>;

// StatusTypes.completed.color = 'alskdf'