// https://www.youtube.com/watch?v=2eAqXLi8q70
/* interface TransactionObj {
  pizza: number;
  books: number;
  job: number;
} */
var todaysTransactions = {
    pizza: -10,
    books: -5,
    job: 50
};
console.log(todaysTransactions["pizza"]);
// dynamicly accessing the keys  (normally in loops)
var prop = "pizza";
console.log(todaysTransactions[prop]);
var gameScores = {
    Alice: 10,
    Bob: 15,
    Charlie: 8
}, satisfies, Scores;
console.log(gameScores["Alice"]);
var _helloTranslations = {
    en: "Hello",
    es: "Hola",
    fr: "Bonjour"
}, satisfies, TranslationDict;
var form = {
    username: "user123",
    age: 30,
    subscribed: true
}, satisfies, FormValues;
console.log(form["username"]);
var errors = {
    404: "Not Found",
    500: "Internal Server Error"
}, satisfies, ErrorMessages;
var _config = {
    apiUrl: "https://api.example.com",
    apiKey: "12345"
}, satisfies, ReadonlyConfig;
var _todaysTransactions2 = {
    pizza: -10,
    books: -5,
    job: 50
};
var student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
};
for (var key in student) {
    console.log("".concat(key, ": ").concat(student[key]));
}
Object.keys(student).map(function (key) {
    console.log(student[key]);
});
var logStudentKey = function (student, key) {
    console.log("Student ".concat(key, ": ").concat(student[key]));
};
logStudentKey(student, "GPA");
var monthyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
};
for (var key in monthyIncomes) {
    console.log("".concat(key, ": ").concat(monthyIncomes[key]));
}
var newInstance = {
    bla: "string1"
}, satisfies, IndexedType;
newInstance[2] = "some string";
console.log({ newInstance: newInstance });
