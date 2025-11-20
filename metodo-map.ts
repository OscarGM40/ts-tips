// https://www.youtube.com/watch?v=3u5RtxYQAK8
// el método map permite iterar un array y ejecutar una función de transformación en cada elemento. NO modifica el array original, sino que devuelve uno nuevo, es decir, es inmutable, no muta el arreglo original.

// Mutable
const numbers = [0, 1, 2, 3];
console.log(numbers, "original"); // fijate que numbers ha cambiado, el bucle for ha mutado el arreglo original, de aquí la necesidad de Array.map
for (let index = 0; index < numbers.length; index++) {
  numbers[index] = numbers[index] + 2;
}
console.log(numbers, "after for"); // fijate que numbers ha cambiado, el bucle for ha mutado el arreglo original, de aquí la necesidad de Array.map

//Inmutable (simplemente creamos un nuevo arreglo donde almacenar el retorno)
const newNumbers = [];
for (let index = 0; index < numbers.length; index++) {
  newNumbers[index] = numbers[index] + 2;
}
// otra forma podria ser un forEach, pero el forEach no retorna nada, luego obliga a crear un arreglo vacio tmb
// numbers.forEach((item) => (newNumbers[item] = numbers[item] + 2));

// sin embargo, dado que map ya crea un arreglo vacio y además retorna en cada posición el resultado de aplicar una funcion al elemento en esa misma posición es el más adecuado. Se ven perfectamente las ventajas y la reducción de código, por no hablar de que además uso un nuevo arreglo, evitando la mutabilidad del array original.
numbers.map((item) => item + 2);

// además, como recibe una función es muy común pasarle una función por referencia
function sum(item: number) {
  return item + 2;
}
numbers.map(sum);

const orders = [
  {
    customerName: "Nicolas",
    total: 60,
    delivered: true,
  },
  {
    customerName: "Zulema",
    total: 120,
    delivered: false,
  },
  {
    customerName: "Santiago",
    total: 180,
    delivered: false,
  },
  {
    customerName: "Valentina",
    total: 240,
    delivered: true,
  },
];

//normalmente map se usa para transformaciones más complejas, fijate que en este caso solo filtramos los nombres, pero por detrás map está haciendo su magia, creando un arreglo nuevo para guardar simplemente los names
const names = orders.map((order) => order.customerName);
// o por ejemplo seleccionar solo los totales
const totals = orders.map((order) => order.total);

// esto que parece una tontería es usado en procesamiento de datos a gran escala (tecnica map-reduce, primero selecciono con map solo las propiedades que quiero de un objeto y luego aplico con reduce cualquier funcion que necesite)

// otra aplicación muy usada de map es agregar nuevas propiedades. Recuerda asegurar inmutabilidad
const newOrders = orders.map((order) => ({
  ...order,
  taxes: (16 * order.total) / 100,
}));
//! ojo, si quiero agregar una propiedad tengo que asegurar la inmutabilidad del objeto original, y es pasado por referencia al map, asi que no puedo hacer esto, tengo que usar un spread. Al menos el IDE avisa, en el video ni lo hace. Al ser una referencia a un object, cambiaría en todo lugar en el que esté referido (en orders). Map solo asegura la inmutabilidad del arreglo original, no de sus elementos
/* const newOrders = orders.map(item => {
  item.taxes = (16 * item.total) / 100;
  return item;
}) */
console.log({ totals });
console.log({ newOrders });
// console.log("-".repeat(50));
console.log({ orders });

// el método map, al retornar un arreglo diferente permite encadenarse con otros métodos similares (pipes)

const total = orders
  .map((order) => order.total)
  .filter((item) => item > 100)
  .reduce((prev, current) => (prev += current), 0);

const reduced = [0, 1, 2, 3, 5].reduce((prev, actual) => {
  if (actual === 5) {
    console.log({ prev });
  }
  return prev;
}, 0);

console.log({ reduced });

// grouping objects by property, fijate que en las ordenes el cliente puede ser el mismo, quiero un object con el customer como key y un arreglo de precios (y una key extra con el total)
type Order = { customer: string; total: number };
const ordersTwo: readonly Order[] = [
  { customer: "Alice", total: 50 },
  { customer: "Bob", total: 30 },
  { customer: "Alice", total: 70 },
  { customer: "Bob", total: 20 },
] as const;

// since Typescript unions automatically deduplicate literal types it will remove the second 'Alice' and 'Bob', so I can guarantee uniqueness with type T = typeof ordersTwo[number]['customer']. But the array must be constant and remember that I can get the type of an array with typeof Array and same with his elements and with his keys. Super pro solution
type ClientNames = (typeof ordersTwo)[number]["customer"];
const ordersGroupedByClient = ordersTwo.reduce((acc, order) => {
  if (!acc[order.customer]) {
    acc[order.customer] = {
      totals: [],
      accumulated: 0,
      count: 0,
      max: order.total,
      min: order.total,
    };
  }
  //nitpick, create a variable to hold difficult accesses, like acc[order.customer]
  const customer = acc[order.customer];
  acc[order.customer] = {
    totals: [...customer.totals, order.total],
    accumulated: customer.accumulated + order.total,
    count: customer.count + 1, // realmente ya tengo en prev.count lo necesario
    max: Math.max(customer.max, order.total),
    min: Math.min(customer.min, order.total),
  };
  return acc;
}, {} as { [K in ClientNames]: { totals: number[]; accumulated: number; count: number; max: number; min: number } });

console.log({ ordersGroupedByClient });
console.log({ Alice: ordersGroupedByClient["Alice"].totals });
