import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";
import ErrorOutput from "./ErrorOutput";

interface IFormInput {
  rsvp: String;
  songRequests: String;
  note: String;
}

const ResponseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [rsvpResponse, setRsvpResponse] = useState("");

  const $formFields = useStore(formFields);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch("/api/response", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
  };

  // TODO: fix radio selections
  function handleInputChange(event: FormEvent) {
    const eventTarget = event.target as HTMLInputElement;
    setRsvpResponse(eventTarget?.value);
  }

  const updateRSVPState = async (partyObj: Promise) => {
    const data = await partyObj;
    console.log(data);
  };

  const updateSpreadsheetRows = async (name: String) => {
    const response = await fetch("/api/sheets/update", {
      method: "POST",
      body: JSON.stringify(name),
    });
    return response.json();
  };

  useEffect(() => {
    // TODO: popuplate attending rsvp radios
  }, [$formFields.name]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="rsvp-response-form"
      className="py-12"
    >
      <h3>
        <strong className="text-2xl">{$formFields.name}</strong>
      </h3>
      {/* if they have a wedding party, incl. below text and map() fn */}
      {$formFields.party && $formFields.party.length > 1 && (
        <div>
          <p>Your wedding party:</p>
          {$formFields.party.map((member, index) => (
            <div key={index}>
              <fieldset
                className="mb-2 flex"
                onChange={(e) => handleInputChange(e)}
              >
                <legend className="mb-1 text-gray-700">
                  Will <strong>{member.name}</strong> be able to attend our
                  wedding?
                </legend>
                <label
                  className={`w-full cursor-pointer border rounded p-3  ${
                    rsvpResponse === "yes" ? "bg-green-200" : "bg-gray-100"
                  }`}
                >
                  <input
                    className="accent-green-600"
                    type="radio"
                    value="yes"
                    {...register(`rsvp-${index}`, { required: true })}
                  />
                  <span className="px-2">Yes</span>
                </label>
                <label
                  className={`w-full cursor-pointer border rounded p-3 ${
                    rsvpResponse === "no" ? "bg-red-200" : "bg-gray-100"
                  }`}
                >
                  <input
                    className="accent-red-600"
                    type="radio"
                    value="no"
                    {...register(`rsvp-${index}`, { required: true })}
                  />
                  <span className="px-2">No</span>
                </label>
              </fieldset>
              <ErrorOutput errType={errors?.rsvp?.type} />
            </div>
          ))}
        </div>
      )}
      {/* if only 1 person in party */}
      {$formFields.party && $formFields.party.length <= 1 && (
        <>
          <fieldset
            className="mb-2 flex"
            onChange={(e) => handleInputChange(e)}
          >
            <legend className="mb-1 text-gray-700">
              Will <strong>{$formFields.name}</strong> be able to attend our
              wedding?
            </legend>
            <label
              className={`w-full cursor-pointer border rounded p-3  ${
                rsvpResponse === "yes" ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              <input
                className="accent-green-600"
                type="radio"
                value="yes"
                {...register("rsvp", { required: true })}
              />
              <span className="px-2">Yes</span>
            </label>
            <label
              className={`w-full cursor-pointer border rounded p-3 ${
                rsvpResponse === "no" ? "bg-red-200" : "bg-gray-100"
              }`}
            >
              <input
                className="accent-red-600"
                type="radio"
                value="no"
                {...register("rsvp", { required: true })}
              />
              <span className="px-2">No</span>
            </label>
          </fieldset>
          <ErrorOutput errType={errors?.rsvp?.type} />
        </>
      )}

      <span className="text-gray-700">Song Requests:</span>
      <input
        type="text"
        className="mt-1 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Any songs you'd like to hear?"
        {...register("songRequests")}
      />
      <ErrorOutput errType={errors?.songRequests?.type} />

      <span className="text-gray-700">Note:</span>
      <input
        type="text"
        className="mt-1 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Feel free to leave any newlywed advice for us!"
        {...register("note")}
      />
      <ErrorOutput errType={errors?.note?.type} />

      <input
        className="flex px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
        type="submit"
      />
    </form>
  );
};

export default ResponseForm;
