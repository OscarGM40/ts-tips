// https://www.youtube.com/watch?v=QSIXYMIJkQg
/* 1- Dont use ReactNode everywhere. ReactNode represents anything React can render, and that includes number,string, undefined. Use JSX.Element if you want only JSX */
/* 2 - Javascript new 'using' keyword is awesome for mocking in tests. It automatically disposes the 'mock' when it leaves scope (so no more beforeEach/afterEach) */
const mockSomething = () => {
  // here I would mock anything, a fn,etc
  const myMock = "something";

  return {
    [Symbol.dispose]: () => {

   },
   value: myMock
  }
}

it("should pass the test", () => {
  using mock = mockSomething();
  // rest of the test
})
// al dejar el scope del it se llama al return de la function, pero que hace el dispose, lo proporciona o lo borra? Porque si habla del garbage collector entiendo que lo borra. Lo borra 

// I use declare so I don't have to show or create the implementation
declare function useStatuses<T>(statuses: T[]): T;
const loadingStatus = useStatuses(['loading','idle'])


// si tipo una funcion que use un generico con un const T Typescript va a tratar de hacer el narrowing hasta lo máximo que pueda. Interesante
declare function useStatuses2<const T>(statuses: T[]): T;
const loadingStatus2 = useStatuses2(['loading','idle']); // ...it gets inferred as narrowly as possible
// a esto se le llama un const type parameter (parametro de tipo constante)

// otro problema que puedo tener es que TS infiera de más. Podemos parar esa cadena
type NoInfer<T> = [T][T extends any ? 0 : never];
declare function createFSM<TState extends string>(config: {
  initial: TState;
  states: TState[];
}): TState

// fijate como example1 es una union type de los tres tipos, pero realmente lo que querriamos es que initial sea un estado válido de entre los que hay en states, pero TS lo junta al tipo, lo infiere
const example1 = createFSM({
  initial: 'not-allowed',
  states: ['open', 'closed']
})
declare function createFSM2<TState extends string>(config:  {
  initial: NoInfer<TState>;
  states: TState[]
}): TState
// al no inferir el initial nos aseguramos que solo vayan ciertos elementos y el infer vaya bien
const example2 = createFSM2({
  initial: 'kfjksdfj';
  states: ['open', 'closed']
})

// (type of array)[number] is a classic trick to extract the type of the members of an array
const roles = ["user","admin","superadmin"] as const;
// roles.push('mofjdkf') fijate que no puedo mutar ese arreglo
// this doesn't work - it's the type of the array, not the value of the array
type RoleAttemp1 = typeof roles;

// this DOES work, but it's pretty verbose, and won't adapt if we add more roles to the array
type RoleAttemp2 = (typeof roles)[0 | 1 | 2];

// this works no matter how many roles we have in the array. Esto si es importante, asin, me trae todos los valores del array como una union type
//! ojo, el arreglo tiene que ser constante;
type Role = (typeof roles)[number]

// In React ElementRef is so freaking useful for finding the right types for useRef in React

import { useRef, ElementRef } from "react";

const Component = () => {
  const audioRef = useRef<ElementRef<"audio">>(null);
  // fijate que le puedo pasar typeof Element si no sé que es
  const inputDateRef = useRef<ElementRef<typeof InputDate>>(null); // y asi me buscará el componente InputDate, si por ejemplo no sé lo que es.Puede ser interesante en algun caso pero el arreglo constante y sacarle el tipo a sus elementos se lleva la palma, y despues el NoInfer<T> =[T][T extends any ? 0 : never]

  // 
  // return <audio ref={audioRef}>Hello</audio>;
}

const colors = ['red', 'blue','orange'] as const;
const getColor = (color: typeof colors[number]): string=> {
  switch(color){
    case "blue":
      return 'blue'
    case "orange":
       return 'orange'
    case "red":
      return 'red'
 /*    default:
      const _: never = color; */
  }
  color satisfies never;
}