//  typed rocks https://www.youtube.com/watch?v=iCEJY9XpfG8

//Imagine I have this type
type Events = {
  add: string;
  remove: string;
  move: string;
  delete: string;
};

const userActions: On<Events> = {
  onAdd: () => void 0,
  onRemove: () => void 0,
  onMove: () => {},
  onDelete: () => {},
};

// this works perfectly fine but this type is tied to the type Events actually
/* type OnEvents = {
  onAdd: () => any,
  onRemove: () => any,
} */

// we really want this to be automatic
type OnEvents = {
  [Key in keyof Events as `on${Capitalize<Key>}`]: () => any;
};

// we can even be more generic. See that if I am going to do a keyof T, T has to extends from {} (otherwise would need a cast via typeof)
// fijate que una key de un objeto puede ser un string o un number, o un symbol y Capitalize<Key> va a fallar porque Key podria ser un number
type On<T extends {}> = {
  // fijate que el never va a  filtrar todas las keys que no sean string
  [Key in keyof T as Key extends string ? `on${Capitalize<Key>}` : never]: () => void;
};

// hay otras formas de hacer el mapped type (K in keyof T & string) o Extract<keyof T, string>
type AnotherOn<T> = {
  [K in keyof T as `on${Capitalize<Extract<K, string>>}`]: (value: T[K]) => unknown;
};

const userActions2: AnotherOn<Events> = {
  onAdd: () => void 0,
  onRemove: () => void 0,
  onMove: () => {},
  onDelete: () => {},
};