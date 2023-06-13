import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";

// TODO: figure out how state will be managed
// TODO: should allow user to search for name or name in their party
// TODO: connect to google sheets and make GET request to search for name

const RSVP = () => {
  const $formFields = useStore(formFields);
  console.log($formFields.names);

  // TODO: figure out how Im gonna use hooks
  // basically, I need the ResponseForm to render when a name is found
  // Also, need to hide the search form when a name is found

  return (
    <>
      <SearchForm />
      {$formFields.names && <ResponseForm />}
    </>
  );
};

export default RSVP;
