// https://www.youtube.com/watch?v=-IsMbQjZbZs
// Array.reduce has that name because it reduces an array into one output value (the accumulator, that I can manipulate for each iteration but in the end is what I return) Take into account that I don't return the array in any moment
// Reductions to an object are very common too
var data = [1, 2, 3, 4];
// reduction to the total
var total = data.reduce(function (acc, value) { return acc + value; }, 0);
console.log({ total: total });
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
// es bastante común usar map antes de un reduce (tecnica map-reduce ) ya que map permite transformar los datos iniciales,y reduce devolver una única salida con esos datos transformados como entrada. Tiene sentido
var ordersTotal = orders.map(function (order) { return order.total; }).reduce(function (acc, value) { return acc + value; }, 0);
console.log({ ordersTotal: ordersTotal });
var players = [
    {
        name: "Nicolas",
        level: "low",
    },
    {
        name: "Andrea",
        level: "medium",
    },
    {
        name: "Zulema",
        level: "high",
    },
    {
        name: "Santiago",
        level: "high",
    },
    {
        name: "Valentina",
        level: "medium",
    },
    {
        name: "Lucia",
        level: "high",
    },
];
// fijate que podia haber usado un map y haber extraido solo los niveles
var playersReport = players.reduce(function (acc, value) {
    acc[value.level] = (acc[value.level] || 0) + 1;
    return acc;
}, {});
console.log({ playersReport: playersReport });
var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
// El objetivo es dejar un array plano, fijate que aqui en vez de una reducción es una exponenciación (lo contrario?)
var plainArray = matrix.reduce(function (acc, item) {
    return acc.concat(item); // me vale esto porque los arreglos están seguidos, interesante, si no fuera asi si que necesito discriminar
    /*  if(Array.isArray(item)){
       item.forEach((subitem) => acc.push(subitem))
     } else {
       console.log('por el else')
       acc.push(item)
     } */
    // return acc
}, []);
console.log({ plainArray: plainArray });
// en realidad ya hay un método que desempaqueta los arreglos en un 2D, por defecto tiene un level of deepness, pero puede pasarle ese level 
console.log(matrix.flat());
var matrixTwo = [
    [1, 2, 3],
    [4, 5, 6], [7, 8, 9],
    [10, 11, 12]
];
console.log(matrixTwo.flat(2));
