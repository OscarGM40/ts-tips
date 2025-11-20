type LegacySystemApi = {
  legacy_nameV1: string;
  legacy_nameV2: string;
  legacy_nameV3: string;
  legacy_timestampV1: string;
  new_timestampV1: string;
  legacy_userV1: {
    legacy_uuidV1: number;
    legacy_uuidV2: string;
    legacy_firstNameV1: string;
  };
};

type FromTo = { from: string; to: string };

type SearchAndReplace<
  T,
  From extends string,
  To extends string,
> = T extends `${infer Before}${From}${infer After}`
  ? SearchAndReplace<`${Before}${To}${After}`, From, To>
  : T;

type LegacySystemApiV2 = SearchAndReplace<"legacy_legacy_nameV4", `legacy_`, "">;

type SearchAndReplaceAll<T, FromToArray extends FromTo[]> = FromToArray extends [
  { from: infer From extends string; to: infer To extends string },
  ...infer Remaining extends FromTo[],
]
  ? SearchAndReplaceAll<SearchAndReplace<T, From, To>, Remaining>
  : T;

type Replacements = [
  { from: "legacy_"; to: "" },
  { from: `V${number}`; to: "" }, // fijate que esto va a hacer que de tres campos se pase a uno, pues todos se llaman name y TS hará un merge de los tres (y lo mismo con timestamp o uuid, te cagas por las bragas)
  { from: "new_"; to: "" },
  { from: "uuid"; to: "id" },
  { from: "uuid_"; to: "id" },
];

/* type DeepReplace<T, FromToArray extends FromTo[]> = {
  [Key in keyof T as SearchAndReplaceAll<Key, FromToArray>]: DeepReplace<T[Key], FromToArray>;
}; */
type DeepReplace<T, FromToArray extends FromTo[]> = T extends object
  ? {
      [Key in keyof T as SearchAndReplaceAll<Key, FromToArray>]: DeepReplace<T[Key], FromToArray>;
    }
  : T;

type OurApi = DeepReplace<LegacySystemApi, Replacements>;
const ourApi: OurApi = {
  name: "John",
  timestamp: "2021-01-01",
  user: {
    id: 1,
    firstName: "John",
  },
};