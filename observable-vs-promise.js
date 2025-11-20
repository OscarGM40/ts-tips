"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// https://www.youtube.com/watch?v=aYsEkePsRCU
// con ambas formas puedo enviar y recibir datos, con una Promise puedo definir qué se devolverá y cuando, y luego llamarla mediante async/await. Fijate que son dos procesos y que la llamada a los datos es asíncrona
var myPromise = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('promise value => 1');
        }, 1000);
    });
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var rta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, myPromise()];
            case 1:
                rta = _a.sent();
                console.log(rta);
                return [2 /*return*/];
        }
    });
}); })();
// de igual manera puedo usar una instancia de la clase Observable(la cual pide por inyección el observador,que es de tipo Subscriber<T> (es una subclase que extiende de Observer<T> que amplia su funcionalidad, pero ese subscriber es un observer) Este objeto observer provee los métodos next, error, complete, etc que permite emitir valores a los subscriptores
//! La primera ventaja más obvia es que un observer puede emitir varios valores, algo imposible en una Promise
//? Por ejemplo ese observer podria emitir el tiempo 
var myObservable = function () {
    return new rxjs_1.Observable(function (observer) {
        setTimeout(function () {
            observer.next('obs => it is raining');
        }, 1000);
        setTimeout(function () {
            observer.next('obs value => it is still raining');
        }, 2000);
        setTimeout(function () {
            observer.next('obs value => it stopped raining');
        }, 3000);
        setTimeout(function () {
            observer.next('obs value => it started raining again');
        }, 4000);
    });
};
// con un Observable para recibir la data no es algo asincrono, y lo que hay que hacer es subscribirse a un observador
//! Otra ventaja es que se pueden usar pipes antes y despues de una subscripcion, transformando, fitrando,etc el output de un observer. Esto no es posible con una Promise, primero se recibe el dato y despues se actua, con un Subscriber es diferente
//! Otra habilidad es poder desubscribirse de un observer cuando se quiera 
(function () {
    var obs$ = myObservable();
    obs$
        .pipe((0, operators_1.filter)(function (value) { return value.includes('obs value'); }))
        .subscribe(function (rta) {
        console.log(rta);
    }).unsubscribe();
})();
