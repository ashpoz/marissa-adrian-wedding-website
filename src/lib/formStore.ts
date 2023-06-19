import { atom } from "nanostores";

export interface FormFields {
  id?: Number;
  results?: Array<string[]>;
  name?: String;
  attending?: Boolean;
  note?: String;
  songRequests?: String[];
  party?: Array<Object>;
  group?: Array<string[]>;
  completed?: Boolean;
}

// testing state
export const formFields = atom<FormFields>({});
