// https://www.youtube.com/watch?v=OKRFjunW-cM&t=3s

// estos tipos genéricos utilitarios me ayudan a crear otros tipos de una forma concisa y conveniente ayudandome con una posible redundancia de código en mis proyectos o tmb ayudando con la herencia de tipos

interface IUser {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  lastname?: string;
}
type UserRequired = Required<IUser>;

// es recomendable usar alias, porque sino al crear variables de ese tipo tengo que declarar de nuevo el tipo, en vez de usar el alias
type UserFinderParams = Partial<IUser>;
type UserFinderResult = Readonly<Omit<IUser, "createdAt">>;
type UserUpdaterParams = Partial<Pick<IUser, "name" | "lastname">>;
type UserGroup = Record<string, IUser[]>;

const userGroup: UserGroup = {

}
class Users {
  /**
   * - Agrega un usuario con lastname opcional
   */
  public add(user: IUser): void {}

  /**
   * - Agrega un usuario con todas sus propiedades =>  Required<T>
   */
  public addWithFullInfo(user: Required<IUser>): void {}

  /**
   * - Busca un usuario por cualquiera de sus propiedades
   * - Retorna un usuario sin la propiedad createdAt
   * - Retorna un usuario en modo lectura
   */
  // public find(props: IUser): IUser {
  public find(props: Partial<IUser>): Readonly<Omit<IUser, "createdAt">> {
    return {} as IUser;
  }

  /**
   * - Actualiza un usuario de forma parcial
   * - Solo se puede actualizar name y lastname
   */
  public update(user: IUser): void {}

  /**
   * - Crea un mapa de usuarios agrupados por nombre Record<string,IUser[]>
   * - Ojo con la index signature, asinto
   */
  public groupByName(): { [prop: string]: IUser[] } {
    return {};
  }
}

const users = new Users();

users.add({
  name: "Juan",
  createdAt: new Date(),
  updatedAt: new Date(),
});

users.addWithFullInfo({
  name: "Juan",
  lastname: "Montxez",
  createdAt: new Date(),
  updatedAt: new Date(),
});

users.find({
  createdAt: new Date(),
  // }).name = ''; no queremos que pueda modificar el resultado de una busqueda. Fijate que no uso Readonly tanto como debo
});
