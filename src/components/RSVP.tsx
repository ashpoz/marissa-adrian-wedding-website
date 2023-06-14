import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";
import { useEffect } from "react";

// TODO: figure out how state will be managed
// TODO: should allow user to search for name or name in their party
// TODO: connect to google sheets and make GET request to search for name

const RSVP = () => {
  const $formFields = useStore(formFields);

  useEffect(() => {
    console.log($formFields);
  }, [$formFields]);

  return (
    <>
      {!$formFields.name && <SearchForm />}
      {$formFields.name && <ResponseForm />}
    </>
  );
};

export default RSVP;
