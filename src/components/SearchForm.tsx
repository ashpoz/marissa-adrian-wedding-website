import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  fullName: String;
}

const SearchForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className="text-gray-700">Full Name:</span>
      <input
        type="text"
        className="mt-1 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Ex. Beyonce Knowles"
        required
        {...register("fullName")}
      />
      <input
        className="flex px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
        type="submit"
      />
    </form>
  );
};

export default SearchForm;
