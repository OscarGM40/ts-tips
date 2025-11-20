type Shape =
  | {
      name: "circle";
      radius: number;
    }
  | {
      name: "square";
      side: number;
    }
  | {
      name: "rectangle";
      width: number;
      height: number;
    };

const getArea = (shape: Shape): number => {
  switch (shape.name) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "rectangle":
      return shape.width * shape.height;
    default:
      shape satisfies never;
      throw new Error("unknow shape");
  }
};

type Notification =
  | {
      type: "email";
      email: string;
    }
  | {
      type: "SMS";
      phone: number;
    }
  | {
      type: "push";
      deviceId: string;
    };

const getContactInfo = (notification: Notification): string => {
  switch (notification.type) {
    case "email":
      return notification.email;
    case "SMS":
      return notification.phone.toString();
    case "push":
      return notification.deviceId;
    default:
      notification satisfies never;
      throw new Error("unknown notification type");
  }
};

type User =
  | {
      role: "regular";
      name: string;
    }
  | {
      role: "admin";
      name: string;
      permissions: string[];
    };

const isAdmin = (user: User): user is Extract<User, { role: "admin" }> => {
  return user["role"] === "admin";
};

const getPermissions = (user: User): Array<string> => (isAdmin(user) ? user.permissions : []);
