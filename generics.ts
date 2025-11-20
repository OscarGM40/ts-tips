// https://www.youtube.com/watch?v=LeQ8nu-AtVg
// Los genericos en TypeScript me permiten crear funciones, clases, types e interfaces que pueden trabajar con diferentes tipos sin perder la tipificación fuerte que ofrece TypeScript

function _echo<T>(param: T): void {
  console.log(`param: ${param} type: ${typeof param}`);
}

const _echoArrow = <T>(param: T): void => {
  console.log(`param: ${param} type: ${typeof param}`);
};

// crear una interfaz generíca para un campo data es una de las cosas más comunes y que proporciona abstracción inicial pero no rompe el tipado fuerte final.Recuerda que además se puede dar un tipo inicial al generico
interface ApiResponse<T = number> {
  data?: T;
  status: number;
  error?: string;
}

const _resultOne: ApiResponse<string> = {
  data: "string",
  status: 200,
};

// aqui tomará el tipo inicial
const _resultTwo: ApiResponse = {
  data: 500,
  status: 200,
};

const _resultThree: ApiResponse<object> = {
  data: {},
  status: 200,
};
// fijate que se puede hacer cadena de genericos
type MyFunction<T> = (param: T) => T;

interface Exec<P = string> {
  exec: MyFunction<P>;
  error?: Error;
}
const example: Exec = {
  exec: (param) => `__${param}__`,
};

const _example2: Exec<number> = {
  exec: (param) => param * 5,
};

const _example3: Exec<boolean> = {
  exec: (param) => param && true,
};
example.exec("string");
example.exec("string");

// sabiendo todo esto sería muy fácil crear funciones reutilizables para por ejemplo gestionar peticiones. Parece incluso obligatorio
const promiseHandler = async <T = object>(url: string): Promise<ApiResponse<T>> => {
  try {
    const data = await fetch(url);
    const result = await data.json();
    return {
      data: result,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      status: 500,
      error: (e as unknown as Error).message,
    };
  }
};

interface Author {
  id: string;
  name: string;
  age: number;
}
interface Book {
  bookId: string;
  authorId: string;
}
const _getAuthorData = async (bookId: string): Promise<Author | undefined> => {
  const { data, status } = await promiseHandler<Book>(`api/books/${bookId}`);
  if (!data || status !== 200) return;

  const { data: authorData, status: authorStatus } = await promiseHandler<Author>(
    `api/authors/${data.authorId}`,
  );
  console.log({ authorData, authorStatus });
  return authorData;
};
