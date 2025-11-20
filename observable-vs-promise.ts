import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
// https://www.youtube.com/watch?v=aYsEkePsRCU
// con ambas formas puedo enviar y recibir datos, con una Promise puedo definir qué se devolverá y cuando, y luego llamarla mediante async/await. Fijate que son dos procesos y que la llamada a los datos es asíncrona
const myPromise = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('promise value => 1')
    }, 1000)
  })
}

(async () => {
  const rta = await myPromise();
  console.log(rta)
})();

// de igual manera puedo usar una instancia de la clase Observable(la cual pide por inyección el observador,que es de tipo Subscriber<T> (es una subclase que extiende de Observer<T> que amplia su funcionalidad, pero ese subscriber es un observer) Este objeto observer provee los métodos next, error, complete, etc que permite emitir valores a los subscriptores

//! La primera ventaja más obvia es que un observer puede emitir varios valores, algo imposible en una Promise
//? Por ejemplo ese observer podria emitir el tiempo 
const myObservable = () => {
  return new Observable<string>(observer => {
    setTimeout(() => {
      observer.next('obs => it is raining')
    },1000)
    setTimeout(() => {
      observer.next('obs value => it is still raining')
    },2000)
    setTimeout(() => {
      observer.next('obs value => it stopped raining')
    },3000)
    setTimeout(() => {
      observer.next('obs value => it started raining again')
    },4000)
  })
}

// con un Observable para recibir la data no es algo asincrono, y lo que hay que hacer es subscribirse a un observador
//! Otra ventaja es que se pueden usar pipes antes y despues de una subscripcion, transformando, fitrando,etc el output de un observer. Esto no es posible con una Promise, primero se recibe el dato y despues se actua, con un Subscriber es diferente
//! Otra habilidad es que el Observable puede desubscribirse del Observer cuando quiera, o que el Observer puede emitir múltiples valores
(() => {
  const obs$ = myObservable();
  obs$
  .pipe(
    filter(value => value.includes('obs value'))
  )
  .subscribe(rta => {
    console.log(rta)
  });

})();

//** Angular hace uso masivo de la programación reactiva, ya que las peticiones http van por Observables y no fetch, o las validaciones de un formulario se crean subscripciones a un formulario (o a ciertos campo)Angular tmb maneja ciertas cancelaciones de subscripciones, por ejemplo al realizar una petición la cancela ya el framework despues. Angular tmb se desubscribe al cambiar de vista, algo que en otros frameworks hay que manejar para no dejar memory leaks   **/