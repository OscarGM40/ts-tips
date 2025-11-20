// https://www.youtube.com/watch?v=vZvnnI9gAQE
// de forma simple, los conditional types (o el conditional typing) dependiendo si una condición se cumple nos devolverán un tipo u otro si es que no se cumple (casi siempre son parte de un mapped type, o siempre?)
type Fn = () => boolean;
type R = ReturnType<typeof m>;

function m(params: type): number {
  return 0;
}

// when typing an array infer E will infer the type of the element of that array (de ahi la letra E)
type A<T> = T extends Array<infer E> ? E : any;

// so X will be number in an array of numbers
type X = A<number[]>;
// T extends T2 ? T1 : T2;

// example
interface AudioSettings {
  volume: number;
}
interface VideoSettings {
  resolution: "high" | "low";
}

type MediaSettings<T> = T extends AudioMedia ? AudioSettings : VideoSettings;

class VideoMedia implements VideoSettings {
  resolution: VideoSettings["resolution"] = "high";
}

class AudioMedia implements AudioSettings {
  volume: number = 0;
}

class MediaPanel<T> {
  constructor(private media: T) {}
  // fijate que MediaSettings es un type alias para un conditional type que comprobará si la instancia es de una clase o tipo en concreto, interesante
  // obviamente aqui estamos dando por echo que si el device no es de audio será de video
  configure(config: MediaSettings<T>): void {
    // some code
  }
}

const media = new AudioMedia();
const panel = new MediaPanel(media);
// fijate que un conditional type va a devolver un tipo, solo uno, en vez de tener una union de posibles tipos, y hace el narrowing entiendo. Buen ejemplo
panel.configure({
  volume: 15
});
