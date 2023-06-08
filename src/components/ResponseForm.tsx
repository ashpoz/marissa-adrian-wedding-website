import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  rsvp: String;
  songRequests: String;
  note: String;
}

const ResponseForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="rsvp-response-form"
      className="py-12"
    >
      <fieldset className="mb-4">
        <legend className="text-gray-700">
          Will you be able to attend our wedding?
        </legend>
        <label>
          <input type="radio" name="radio" value="yes" /> Yes
        </label>
        <label>
          <input type="radio" name="radio" value="no" /> No
        </label>
      </fieldset>
      <span className="text-gray-700">Song Requests:</span>
      <input
        type="text"
        className="mt-1 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Any songs you'd like to hear?"
        required
        {...register("songRequests")}
      />
      <span className="text-gray-700">Note:</span>
      <input
        type="text"
        className="mt-1 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Feel free to leave any newlywed advice for us!"
        required
        {...register("note")}
      />
      <input
        className="flex px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
        type="submit"
      />
    </form>
  );
};

export default ResponseForm;
