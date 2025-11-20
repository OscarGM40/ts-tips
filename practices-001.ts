type Order = { customer: string; total: number };

const orders: readonly Order[] = [
  {
    customer: "Alice",
    total: 60,
  },
  {
    customer: "Bob",
    total: 120,
  },
  {
    customer: "Alice",
    total: 100,
  },
  {
    customer: "Bob",
    total: 55,
  },
] as const;

type ClientNames = (typeof orders)[number]["customer"];

const ordersGrouped = orders.reduce((acc, order) => {
  // let client = acc[order.customer];
  // si no existe no puedo acceder aún
  if (!acc[order.customer]) {
    acc[order.customer] = {
      accumulated: 0,
      count: 0,
      totals: [],
      max: order.total,
      min: order.total,
    };
  }
  acc[order.customer] = {
    accumulated: acc[order.customer].accumulated + order.total,
    count: acc[order.customer].count + 1,
    totals: [...acc[order.customer].totals, order.total],
    max: Math.max(acc[order.customer].max, order.total),
    min: Math.min(acc[order.customer].min, order.total),
  };
  return acc;
}, {} as { [K in ClientNames]: { totals: number[]; accumulated: number; count: number; max: number; min: number } });

console.log({ ordersGrouped });
console.log({ Alice: ordersGrouped["Alice"].totals });

// array.reduce is amazing for removing duplicates (since it is storing the old values)
const numbersWithDuplicates = [1, 2, 3, 3, 2, 4, 4, 5];

/* const uniqueNumbers = numbersWithDuplicates.reduce<number[]>((acc, n) => {
  if (!acc.includes(n)) acc.push(n);
  return acc;
}, []);
 */
// console.log({uniqueNumbers})

const nums = [10, 5, 8, 20, 3];
const max = nums.reduce((acc, n) => Math.max(acc, n), -Infinity);
console.log({ max });

const people = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 21 },
];
const groupedByAge = people.reduce<Record<number, typeof people>>((acc, person) => {
  //! ojo que esto crea la key cuando no exista tmb, aparte de darla un valor, pff
  acc[person.age] = acc[person.age] || [];
  acc[person.age].push(person);
  return acc;
}, {});
console.log({ groupedByAge });

const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const fruitsCount = fruits.reduce<Record<string, number>>((acc, fruit) => {
  //? in each iteration if it doesn't exists acc[fruit] it will create the key and the value to (undefined || 0 ) + 1 (that's it, to 1) In subsequent iterations it will be (1) + 1 or (2) + 1,etc (dynamic properties + assignation, careful)
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

  const fruitsB = ["apple", "banana", "apple", "orange", "banana", "apple"];
  const fruitsBCount = fruitsB.reduce<Record<string, number>>((acc,fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
  },{})



const people2 = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 21 },
];

const peopleGroupedByAge = people2.reduce<Record<number, typeof people2>>((acc,person) => {
  acc[person.age] = acc[person.age] || [];
  acc[person.age].push(person);
  return acc
},{})