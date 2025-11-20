type BaseMessage = { id: string; timestamp: number };


// en vez de una discrimination union podemos usar intersections con never, pero no es nada escalable,obviamente
type TextMessage = BaseMessage & { text: string, url?: never}
type UrlMessage = BaseMessage & { url: string; text?: never}
type ImgMessage = BaseMessage & {imgPath: string}

type Message = TextMessage | UrlMessage | ImgMessage;

type OnlyFirst<F,S> = F & {
  [Key in keyof Omit<S, keyof F>]?: never
}

const message: Message = {
  id: '1',
  timestamp: new Date().getTime(),
  url: 'https://typed.rocks',
  // text: 'Hi youtube',
}