// https://www.youtube.com/watch?v=q_biZCsoloU
// No todo el mundo comparte el valor de usar ValueObjects. Son útiles cuando hay que agregar validaciones o lógica adicional a un field
interface UserRepository {
  save(user: User): void;
}
// application/use-cases
export class UserRegister {
  // hay inversión de control porque UserRepository es una interfaz para no conocer los detalles de la implementactión concreta (que conoceré cuando instancie esta clase,claro y le pase una concrección)
  constructor(private readonly repository: UserRepository) {}
  register(id: string, email: string, birthdate: Date): void {
    const user = new User(id, email, birthdate);
    this.repository.save(user); // el patrón repository encapsula como se ejecuta el save
  }
}

// modelo de dominio domain/models Fijate que este Modelo puede terminar validando el email, un rango de fechas, que el id sea un uuid... En este caso lo mejor sería usar ValueObjects para cada field
export class User {
  constructor(public id: string, public email: string, public birthdate: Date) {
    const validEmailRegExp = /^(?=)/;

    if (!validEmailRegExp.test(email)) {
      throw new Error("Email not valid");
    }
  }
}

// simplemente es sacar la lógica de esas posibles validaciones o reglas adicionales a una clase (que recibirá por constructor un primitivo,obviamente) Esto es una entidad, asinto
export class UserVO {
  private readonly id: UserId; // esto es un value object
  private email: UserEmail; // no es readonly porque hay un updateEmail, si hay una actualización ya no puede ser solo readonly
  private readonly birthdate: UserBirthdate;
  constructor(id: string, email: string, birthdate: Date) {
    this.id = new UserId(id);
    this.email = new UserEmail(email);
    this.birthdate = new UserBirthdate(birthdate);
  }
  // hay que crear accessors a las properties. Por convención el valor está en this.property.value (luego las clases VO tendrán un get value())
  get idValue(): string {
    return this.id.value;
  }
  get emailValue(): string {
    return this.email.value;
  }
  // un get accesor no puede tener argumentos
  get birthdateValue(): Date {
    return this.birthdate.value;
  }
  updateEmail(newEmail: string): void {
    this.email = new UserEmail(newEmail);
  }
}

// Clase ValueObject
export class UserId {
  constructor(readonly value: string) {
    this.value = value;
    // ensure integrity restriction
  }
  //! parece que tmb hay que crear el equals  para compararlos por valor y no por referencia y el toString para poder acceder con this.value
}

export class UserEmail {
  // las clases VO reciben el valor en primitivo o escalar. Fijate que solo necesitan una propiedad llamada value(convención de equipo)
  constructor(readonly value: string) {
    this.value = value;
    // es en este constructor donde vamos a estar asegurando la restricción de integridad. Comprobar que haya un email válido, que no venga el campo vacío,etc, es aqui donde hay que tirar el error
    // guard clause (no confundir con type clause)
    this.ensureEmailIsValid(value);
  }
  ensureEmailIsValid(value: string | undefined | null): void {
    if (value === null) {
      throw new Error("bla bla bla");
    }
  }
}

export class UserBirthdate {
  constructor(readonly value: Date) {
    this.value = value;
  }
}

// fijate que las clases ValueObjects ejercen de imán para la lógica de negocio, siempre tendrán en ellas las validaciones,comprobaciones,etc. En este sentido si parece interesante
// recuerda que buscas hacia adelante con / y hacia atras con ?, no con ¿ imbesil gay