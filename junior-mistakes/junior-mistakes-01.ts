// https://www.youtube.com/watch?v=ZCllX1p763U&t=303s

//! Error not using unknown adn using instead any everywhere

let userAny: any; // any just deactivates typescript
let userUnknown: unknown; // unknown just tells the compiler I don't know what type is this variable yet, but I will know later    

interface IUser {
  id: number;
  firstName: string;
  lastsName: string;
  gender: string;
  image: string;
  age: number;
}

interface IAdminUser extends IUser {
  token: string;
  addNewUser: () => void;
}

// this is a type guard? Yes, but type guard is any mechanism that narrows the type (like Array.isArray() or if(type of variable === 'string'))
// parameterName is Type is a type predicate

function isAdminUser(object: unknown): object is IAdminUser {
  if(object !== null && typeof object === 'object'){
    return "token" in object;
  }
  return false;
}
function isRegularUser(user: unknown): user is IUser {
  if(user && typeof user === 'object'){
    return 'id' in user;
  }
  return false
}

async function fetchUser() {
  const response = await fetch("https://dummyjson.com/users/1")

  //! BAD, response.json devuelve una Promise<any>, al menos darle unknown, asinto
  const badUser = await response.json()

  const goodUser: unknown = await response.json();
  // fijate que en el parameter goodUser aun es unknown pero dentro de la funcion ya es de tipo IAdminUser (o lo que sea que dictara la type guard mediante el type predicate)
  if(isAdminUser(goodUser)){
    
    goodUser.addNewUser();
  }
  if(isRegularUser(goodUser)){
    goodUser.image
  }
}