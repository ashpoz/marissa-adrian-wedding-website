import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";

const RSVP = () => {
  const $formFields = useStore(formFields);

  return (
    <>
      {!$formFields.completed && (
        <>
          <p className="text-xl text-center">
            Please RSVP by August 11th. We hope we get to celebrate together!
          </p>
        </>
      )}
      <div className="bg-slate-50 px-6 py-2 mt-8 rounded-xl border border-gray-900 ">
        {!$formFields.name && <SearchForm />}
        {$formFields.name && !$formFields.completed && <ResponseForm />}
        {$formFields.completed && (
          <div className="py-20 text-center">
            <h3 className="text-2xl">Thanks so much for your response!</h3>
            <p className="text-xl mt-4">
              If you have any further questions about the event, head over to
              the{" "}
              <a className="text-redwood underline" href="/faq">
                FAQ page
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RSVP;
