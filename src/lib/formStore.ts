import { atom } from "nanostores";

interface FormFields {
  names?: Array<string[]>;
}

// testing state
export const formFields = atom<FormFields>({});
