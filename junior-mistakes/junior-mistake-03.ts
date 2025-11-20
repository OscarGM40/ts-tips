//! Error, not using satisfies and typing before assignment when we want the narrow version of a type
// the satisfies Operator (since 4.9) this operator ensures that some expression matches some type (actually it sounds better the other way around)
// be aware of that Typescript will leave the most specific type, the narrowest possible, of that expression for inference purposes

const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  bleu: [0, 0, 255],
};

// we want to be able to use string methods on 'green'
const greenNormalized = palette.green.toUpperCase();

// we had a typo in the keys, we could think that to avoid this we can define the keys and then use a Record, etc

type Colors = "red" | "green" | "blue";

type RGB1 = [red: number, green: number, blue: number];

const palette2: Record<Colors, string | RGB1> = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255], // aqui sería imposible tener un typo
};
// palette2.green.toUpperCase();
// but now palette.green pued ser de tipo string o RGB, y TS nunca lo sabrá siempre lo va a tipar asi ya que le dí el tipo antes de definir el objeto

// the new satisfies operator lets me validate that the type of an expression matches some type, without changing the resulting type of that expression. As an example, we could use satisfies to validate that all the properties of palette are compatible with string | number[]

type Colors2 = "red" | "blue" | "green";
type RGB2 = [red: number, green: number, blue: number];
const paletteS = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [255, 0, 0],
} satisfies Record<Colors2, string | RGB2>;

// toda la información del tipo es mantenida (en resumen, da el tipo al final a lo mas especifico posible (entiendo que es por la ubicacion, ya tiene el objeto y puede hacerlo, la otra forma al tipar la variable lo hará antes))
paletteS.green.toUpperCase();

interface RGB {
  red: number;
  green: number;
  blue: number;
}
interface HSV {
  hue: number;
  saturation: number;
  value: number;
}

//! importante, esta type guard tmb hace narrowing y es muy buena

function setColor(color: RGB | HSV) {
  if ("hue" in color) {
    // aqui color ya es de tipo HSV
    color.hue = 4;
  }
}

// importante que las type guards solo hacen el narrowing en el block scope de la funcion al llamarla, afuera lo pierden

interface ICustomImage {
  data: string;
  width: number;
  height: number;
}

const myCustomImage: ICustomImage = {
  data: "base64",
  width: 200,
  height: 150,
};

// discriminant type
type UserImage = string | ICustomImage;

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  // discriminant prop
  image: UserImage;
}

// bad
const badUser: IUser = {
  id: 1,
  firstName: "Alex",
  lastName: "Brooks",
  image: "image-url",
};
badUser.image

// good
const badUser2 = {
  id: 1,
  firstName: "Alex",
  lastName: "Brooks",
  image: "image-url",
} satisfies IUser;

badUser2.image.charAt(0)
