var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var orders = [
    {
        customer: "Alice",
        total: 60
    },
    {
        customer: "Bob",
        total: 120
    },
    {
        customer: "Alice",
        total: 100
    },
    {
        customer: "Bob",
        total: 55
    },
];
var ordersGrouped = orders.reduce(function (acc, order) {
    // let client = acc[order.customer];
    // si no existe no puedo acceder aún
    if (!acc[order.customer]) {
        acc[order.customer] = {
            accumulated: 0,
            count: 0,
            totals: [],
            max: order.total,
            min: order.total
        };
    }
    acc[order.customer] = {
        accumulated: acc[order.customer].accumulated + order.total,
        count: acc[order.customer].count + 1,
        totals: __spreadArray(__spreadArray([], acc[order.customer].totals, true), [order.total], false),
        max: Math.max(acc[order.customer].max, order.total),
        min: Math.min(acc[order.customer].min, order.total)
    };
    return acc;
}, {});
console.log({ ordersGrouped: ordersGrouped });
console.log({ Alice: ordersGrouped["Alice"].totals });
// array.reduce is amazing for removing duplicates (since it is storing the old values)
var numbersWithDuplicates = [1, 2, 3, 3, 2, 4, 4, 5];
/* const uniqueNumbers = numbersWithDuplicates.reduce<number[]>((acc, n) => {
  if (!acc.includes(n)) acc.push(n);
  return acc;
}, []);
 */
// console.log({uniqueNumbers})
var nums = [10, 5, 8, 20, 3];
var max = nums.reduce(function (acc, n) { return Math.max(acc, n); }, -Infinity);
console.log({ max: max });
