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
    if ($formFields.name) {
      console.log($formFields);
    }
  }, [$formFields.name]);

  // TODO: figure out how Im gonna use hooks
  // basically, I need the ResponseForm to render when a name is found
  // Also, need to hide the search form when a name is found

  return (
    <>
      {!$formFields.name && <SearchForm />}
      {$formFields.name && <ResponseForm />}
    </>
  );
};

export default RSVP;
