import { atom } from "nanostores";

interface FormFields {
  results?: Array<string[]>;
  name?: String;
  attending?: Boolean;
  note?: String;
  songRequests?: String;
  party?: Array<Object>;
  group?: Array<string[]>;
  completed?: Boolean;
}

// testing state
export const formFields = atom<FormFields>({});
