//! Error using enums(and particularly member based enums)

// a member based enum is an enum with only keys, this enum will accept any number as valid state
enum BadState {
  InProgress,
  Success,
  Fail,
}

// a member based enum will accept its numeric counterpart
const state1: BadState = 0;

// Good approach => using const assertions
const State = {
  InProgress: "InProgress",
  Success: "Success",
  Fail: "Fail",
};
type State = (typeof State)[keyof typeof State];

// Good approach => using a union type
type State2 = "InProgress" | "Success" | "Fail";

// Another good approach is using an enum with keys and values
const enum GoodState {
  InProgress = "InProgress",
  Success = "Success",
  Fail = "Fail",
}
// remember that an enum is just an object I can access to is values or keys or the types of the values etc