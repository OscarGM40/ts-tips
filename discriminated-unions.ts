// https://www.youtube.com/watch?v=CG3_Y9T03J4

// I could have a type like this, in where it is pretty clear that some props are based depending on the table, but the table is only setting a name
type QueryOptionsOLD = {
  table: "users" | "widgets" | "sessions";
  userId?: string;
  widgetId?: string;
  sessionId?: string;
  limit: number;
  offset: number;
};

// the solution is to use a union of types, in where the name of the table contributes not only for itself but instead into the type level, joining some props and skipping others

type Pagination = {
  limit: number;
  offset: number;
};
//! NitPick, I can wrap all the discriminated union in parenthesis and then use a intersection type for common props.
// a discriminated union is a union of object types that a share a discriminant property(table in this case). type Colors = "red" | "blue" is only a union of string literals, since they are not objects
type QueryOptions = (
  | {
      table: "users";
      userId: string;
    }
  | {
      table: "widgets";
      widgetId: string;
    }
  | {
      table: "sessions";
      sessionId: string;
    }
  | {
      table: "sales";
      saleId: string;
    }
) &
  Pagination;

// now each type will discriminate props based on the discriminant value.
const optionOne: QueryOptions = {
  table: "users",
  userId: "jsdfkla",
  limit: 4,
  offset: 10,
};
const optionTwo: QueryOptions = {
  table: "widgets",
  widgetId: "fkj",
  limit: 4,
  offset: 10,
};

// it will narrow the type from this point too.Fijate que con esta sintaxis ya es un exhaustive switch
function query(option: QueryOptions): string {
  switch (option.table) {
    case "users":
      return option.userId;
    case "sessions":
      return option.sessionId;
    case "widgets":
      return option.widgetId;
    case "sales":
      return option.saleId;
    /* default: {
      const _: never = option;
      throw new Error("Unhandled table type");
    } */
  }
}

// but before solution will only work if I am not accomplishing the return from other part, for example this
function queryTwo(option: QueryOptions): string {
  let id = "";
  switch (option.table) {
    case "users":
      id = option.userId;
      break;
    case "sessions":
      id = option.sessionId;
      break;
    case "widgets":
      id = option.widgetId;
      break;
    /* case "sales":  //! I could ommit switching sales prop, and since I am returning a custom string, I won't see any error. The solution is using an EXHAUSTIVE SWITCH
      id = option.saleId;
      break; */
    /* default: {
      const _: never = option;
      throw new Error("Unhandled table type");
    } */

    case "sales":
      id = option.saleId;
      break;

    //! In order to convert a switch into an exhaustive switch I have to use the default clause. In this point option should be of type never if all possibilities has been exhausted (never means, it can have a value at that point)
    default:
      option satisfies never; // compile-time error
      // otra forma es usar una assertion, pero la constraint me convence más
      assertCannotReach(option);
  }
  return id;
}

function assertCannotReach(x: never) {
  throw new Error("this line of code should be reachable", x);
}

const authMethods = ["push", "voice", "sms"] as const;
type AuthMethod = (typeof authMethods)[number];

// ojo, si no quiero que haga el widening hasta string puedo usar as const satisfies en vez de Record al principio. Recuerda que el satisfies tipa al final asi que ya tiene todo
const AuthMethodTitles/* : Record<AuthMethod, string> */ = {
  push: "Push",
  sms: "SMS",
  voice: "Voice",
} as const satisfies Record<AuthMethod, string>;

type AuthMethodTitles = typeof AuthMethodTitles[keyof typeof AuthMethodTitles];