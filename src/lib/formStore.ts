import { atom } from "nanostores";

// interface FormFields {
//   names?: Array<string[]>;
// }

// const state = {
//   nameMatches: false,
//   name: "",
//   attending: null,
//   note: "",
//   songRequest: "",
//   party: [
//     {
//       name: "",
//       attending: null,
//     },
//   ],
// };

interface FormFields {
  results?: Array<string[]>;
  name?: String;
  attending?: Boolean;
  note?: String;
  songRequest?: String;
  party?: Array<string[]>;
}

// testing state
export const formFields = atom<FormFields>({});
