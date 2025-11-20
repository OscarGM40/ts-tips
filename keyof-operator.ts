// https://www.youtube.com/watch?v=mZAzt_rhxng
// the keyof operator produces a union of literal types of all the keys keys of an object type(and since they are keys the union can only be string, number or symbol literal types)

interface User { // anything with properties/keys is an object shape
  name: string;
  age: number;
}

type UserKeysUnion = keyof User;

class Form {
  constructor(private form: User){}

  get(_field: keyof User){}
}

const form = new Form({
  name: 'Héctor',
  age: 30
})

// en este ejemplo tan sencillo se ve perfectamente la necesidad de que exista keyof, no tiene que field sea un string
form.get('age')
