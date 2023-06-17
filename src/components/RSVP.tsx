import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";
import { useEffect } from "react";

const RSVP = () => {
  const $formFields = useStore(formFields);

  useEffect(() => {
    console.log($formFields);
  }, [$formFields]);

  return (
    <>
      {!$formFields.name && <SearchForm />}
      {$formFields.name && <ResponseForm />}
      {$formFields.completed && (
        <div>
          <h3>Thanks much for your response!</h3>
          <p>
            If you have any further questions about the event, head over the{" "}
            <a href="/faq">FAQ page</a>.
          </p>
        </div>
      )}
    </>
  );
};

export default RSVP;
