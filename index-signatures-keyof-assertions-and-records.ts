// https://www.youtube.com/watch?v=2eAqXLi8q70

// Index signatures are useful when I have an object but I do not know the name of the keys

interface TransactionObj {
  readonly [index: string]: number;
}
/* interface TransactionObj {
  pizza: number;
  books: number;
  job: number;
} */

const todaysTransactions: TransactionObj = {
  pizza: -10,
  books: -5,
  job: 50,
};


console.log(todaysTransactions["pizza"]);
// dynamicly accessing the keys  (normally in loops)

const prop: string = "pizza";
console.log(todaysTransactions[prop]);
// puedo hacer readonly el objecto con la index signature
// todaysTransactions.pizza = 50;

//some practical examples for index signatures are
// 1- flexible object for dynamic properties
interface Scores {
  [playerName: string]: number;
}

const gameScores = {
  Alice: 10,
  Bob: 15,
  Charlie: 8,
} satisfies Scores;

console.log(gameScores["Alice"]);

// 2- Dictionary for translations
interface TranslationDict {
  [langCode: string]: string;
}

const _helloTranslations = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
} satisfies TranslationDict;

// 3 - Storing Form Field Values
interface FormValues {
  [field: string]: string | number | boolean;
}
const form = {
  username: "user123",
  age: 30,
  subscribed: true,
} satisfies FormValues;

console.log(form["username"]);

// 4 - Mapping Error Codes
interface ErrorMessages {
  [code: number]: string;
}

const _errors = {
  404: "Not Found",
  500: "Internal Server Error",
} satisfies ErrorMessages;

// 5 Readonly index signature
interface ReadonlyConfig {
  readonly [key: string]: string;
}

const _config = {
  apiUrl: "https://api.example.com",
  apiKey: "12345",
} as const satisfies ReadonlyConfig;
// _config.apiKey = "sjafk"

// remember that I can create an index signature among with other known properties
interface TransactionTwo {
  readonly [index: string]: number;
  pizza: number;
  books: number;
  job: number;
}

const _todaysTransactions2: TransactionTwo = {
  pizza: -10,
  books: -5,
  job: 50,
};

interface Student {
  // fijate que no escala muy bien tener una index signature y varias props con diferentes types como valores porque hay que pasarle todas las posibilidades. Diria que su mayor potencial es cuando está sola
  // [key: string]: string | number | number[] | undefined
  name: string;
  GPA: number;
  classes?: number[];
}

const student: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200],
};

for (const key in student) {
  console.log(`${key}: ${student[key as keyof Student]}`);
}

Object.keys(student).map((key) => {
  console.log(student[key as keyof typeof student]);
});

const logStudentKey = (student: Student, key: keyof Student): void => {
  console.log(`Student ${key}: ${student[key]}`);
};

logStudentKey(student, "GPA");

/* interface Incomes {
  [key: string]: number
} */

type Streams = "salary" | "bonus" | "sidehustle";
// remember that in union types the distribution is made naturally, so for each Stream the value will be one of string or number
type Incomes = Record<Streams, string | number>;

const monthyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
};

for (const key in monthyIncomes) {
  console.log(`${key}: ${monthyIncomes[key as keyof Incomes]}`);
}

interface IndexedType {
  [index: string]: string;
}
const newInstance: IndexedType = {
  bla: "string1",
} satisfies IndexedType;

newInstance[2] = "some string";

console.log({ newInstance });

type MyPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]: T[P];
};
const person = {
  age: 34,
  name: "asjfd",
  location: "asdjfk",
};
type MyPickAlias = MyPick<typeof person, "age" | "location">;

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type MyExclude<T, U > = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T: never;

/* type MyOmit<T,K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
} */