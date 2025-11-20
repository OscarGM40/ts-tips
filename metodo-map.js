// https://www.youtube.com/watch?v=3u5RtxYQAK8
// el método map permite iterar un array y ejecutar una función de transformación en cada elemento. NO modifica el array original, sino que devuelve uno nuevo, es decir, es inmutable, no muta el arreglo original.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Mutable
var numbers = [0, 1, 2, 3];
console.log(numbers, "original"); // fijate que numbers ha cambiado, el bucle for ha mutado el arreglo original, de aquí la necesidad de Array.map
for (var index = 0; index < numbers.length; index++) {
    numbers[index] = numbers[index] + 2;
}
console.log(numbers, "after for"); // fijate que numbers ha cambiado, el bucle for ha mutado el arreglo original, de aquí la necesidad de Array.map
//Inmutable (simplemente creamos un nuevo arreglo donde almacenar el retorno)
var newNumbers = [];
for (var index = 0; index < numbers.length; index++) {
    newNumbers[index] = numbers[index] + 2;
}
// otra forma podria ser un forEach, pero el forEach no retorna nada, luego obliga a crear un arreglo vacio tmb
// numbers.forEach((item) => (newNumbers[item] = numbers[item] + 2));
// sin embargo, dado que map ya crea un arreglo vacio y además retorna en cada posición el resultado de aplicar una funcion al elemento en esa misma posición es el más adecuado. Se ven perfectamente las ventajas y la reducción de código, por no hablar de que además uso un nuevo arreglo, evitando la mutabilidad del array original.
numbers.map(function (item) { return item + 2; });
// además, como recibe una función es muy común pasarle una función por referencia
function sum(item) {
    return item + 2;
}
numbers.map(sum);
var orders = [
    {
        customerName: "Nicolas",
        total: 60,
        delivered: true
    },
    {
        customerName: "Zulema",
        total: 120,
        delivered: false
    },
    {
        customerName: "Santiago",
        total: 180,
        delivered: false
    },
    {
        customerName: "Valentina",
        total: 240,
        delivered: true
    },
];
//normalmente map se usa para transformaciones más complejas, fijate que en este caso solo filtramos los nombres, pero por detrás map está haciendo su magia, creando un arreglo nuevo para guardar simplemente los names
var names = orders.map(function (order) { return order.customerName; });
// o por ejemplo seleccionar solo los totales
var totals = orders.map(function (order) { return order.total; });
// esto que parece una tontería es usado en procesamiento de datos a gran escala (tecnica map-reduce, primero selecciono con map solo las propiedades que quiero de un objeto y luego aplico con reduce cualquier funcion que necesite)
// otra aplicación muy usada de map es agregar nuevas propiedades. Recuerda asegurar inmutabilidad
var newOrders = orders.map(function (order) { return (__assign(__assign({}, order), { taxes: (16 * order.total) / 100 })); });
//! ojo, si quiero agregar una propiedad tengo que asegurar la inmutabilidad del objeto original, y es pasado por referencia al map, asi que no puedo hacer esto, tengo que usar un spread. Al menos el IDE avisa, en el video ni lo hace. Al ser una referencia a un object, cambiaría en todo lugar en el que esté referido (en orders). Map solo asegura la inmutabilidad del arreglo original, no de sus elementos
/* const newOrders = orders.map(item => {
  item.taxes = (16 * item.total) / 100;
  return item;
}) */
console.log({ totals: totals });
console.log({ newOrders: newOrders });
// console.log("-".repeat(50));
console.log({ orders: orders });
// el método map, al retornar un arreglo diferente permite encadenarse con otros métodos similares (pipes)
var total = orders
    .map(function (order) { return order.total; })
    .filter(function (item) { return item > 100; })
    .reduce(function (prev, current) { return (prev += current); }, 0);
var reduced = [0, 1, 2, 3, 5].reduce(function (prev, actual) {
    if (actual === 5) {
        console.log({ prev: prev });
    }
    return prev;
}, 0);
console.log({ reduced: reduced });
var ordersTwo = [
    { customer: "Alice", total: 50 },
    { customer: "Bob", total: 30 },
    { customer: "Alice", total: 70 },
    { customer: "Bob", total: 20 },
];
var ordersGroupedByClient = ordersTwo.reduce(function (acc, order) {
    if (!acc[order.customer]) {
        acc[order.customer] = {
            totals: [],
            accumulated: 0
        };
    }
    acc[order.customer] = {
        totals: __spreadArray(__spreadArray([], acc[order.customer].totals, true), [order.total], false),
        accumulated: acc[order.customer].accumulated + order.total
    };
    return acc;
}, {});
console.log({ ordersGroupedByClient: ordersGroupedByClient });
console.log({ Alice: ordersGroupedByClient['Alice'].totals });
