import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";

const RSVP = () => {
  const $formFields = useStore(formFields);

  return (
    <>
      {!$formFields.completed && (
        <p className="text-lg text-center">
          Please let us know if you will be able to attend our wedding on{" "}
          <strong className="underline">November 11, 2023</strong> by filling
          out the form below.
        </p>
      )}
      {!$formFields.name && <SearchForm />}
      {$formFields.name && !$formFields.completed && <ResponseForm />}
      {$formFields.completed && (
        <div className="py-20 text-center">
          <h3 className="text-2xl">Thanks so much for your response!</h3>
          <p className="text-xl mt-4">
            If you have any further questions about the event, head over to the{" "}
            <a className="text-redwood underline" href="/faq">
              FAQ page
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default RSVP;
