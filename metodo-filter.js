// https://www.youtube.com/watch?v=Dje7lpnlRLM
// El método filter permite filtrar los elementos de un array pasando una condición en cada iteración al elemento iterado. Genera un nuevo array con los elementos que cumplan esa condición, igual que map, asi que no va a mutar el arreglo original. Filter siempre va a retornar un array, si nada coincide el método filter va a retornar un arreglo vacio. De forma similar, si todo coincide va a retornar un arreglo nuevo con todos los elementos
var numbers = [0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var evens = Array.from(new Set(numbers)).filter(function (n) { return n % 2 === 0; });
console.log({ evens: evens });
var orders = [
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
// recuerda que Array.filter siempre va a retornar un nuevo array, ya sea vacio o con los mismos elementos, segun los elementos cumplan la condición
var deliveredOrders = orders.filter(function (order) { return order.delivered; });
console.log({ deliveredOrders: deliveredOrders });
var ordersGreaterThan140 = orders.filter(function (order) { return order.total > 140; });
console.log({ ordersGreaterThan140: ordersGreaterThan140 });
// es muy común usar el método filter para retornar un arreglo sin un elemento concreto sin mutar el arreglo original,ya que por ejemplo splice si lo haría. PAra ello puedo usar el indice
var newArray = orders.filter(function (order, index) { return index !== 2; }); // Interesante
// const newArray2 = orders.splice(2,1)
console.log({ newArray: newArray });
// hay más metodos con un predicade como argumento, pero no retornan un arreglo nuevo, sino un boolean como Array.every(predicate): boolean
var allCases = orders.every(function (order) { return order.total > 10; }); // true, all are greater
console.log({ allCases: allCases });
// o Array.some(predicate): boolean
var someCases = orders.some(function (order) { return order.total > 200; }); // true, there is one
console.log({ someCases: someCases });
