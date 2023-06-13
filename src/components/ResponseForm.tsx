import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useState } from "react";
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch("/api/response", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
  };

  function handleInputChange(event: FormEvent) {
    const eventTarget = event.target as HTMLInputElement;
    setRsvpResponse(eventTarget?.value);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="rsvp-response-form"
      className="py-12"
    >
      <fieldset className="mb-2 flex" onChange={(e) => handleInputChange(e)}>
        <legend className="mb-1 text-gray-700">
          Will [NAME] be able to attend our wedding?
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
