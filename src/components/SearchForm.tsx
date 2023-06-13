import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ErrorOutput from "./ErrorOutput";
import { useEffect } from "react";

interface IFormInput {
  fullName: String;
}

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const $formFields = useStore(formFields);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await fetch("/api/searchName", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    const { matches } = resData;

    if (matches === undefined) {
      formFields.set({ ...$formFields, nameMatches: [] });
    } else if (matches.length > 1) {
      formFields.set({ ...$formFields, nameMatches: matches });
    } else if (matches.length === 1) {
      formFields.set({
        ...$formFields,
        nameMatches: matches,
        name: matches[0],
      });
    }
  };

  useEffect(() => {
    if ($formFields.nameMatches) {
    }
  }, [$formFields.nameMatches]);

  // console.log(useStore(formFields));

  return (
    <>
      {/* If no matches, show search form */}
      {!$formFields.nameMatches && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="text-gray-700">Full Name:</span>
          <input
            type="text"
            className="mt-1 block w-full px-2 py-2 rounded border border-solid border-gray-300"
            placeholder="Ex. Beyonce Knowles"
            {...register("fullName", {
              required: true,
              maxLength: 200,
              minLength: 2,
            })}
          />
          <ErrorOutput errType={errors?.fullName?.type} />
          <input
            className="flex px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
            type="submit"
          />
        </form>
      )}
      {/* if more than 1 match */}
      <div className="text-center pt-6 pb-6">
        {$formFields.nameMatches && $formFields.nameMatches.length > 1 && (
          <div>
            <p className="text-gray-700 mb-6">
              We found more than one person with that name. Please select your
              full name below <br />
              (or{" "}
              <a href="" className="underline text-redwood">
                search again
              </a>
              ):
            </p>
            <ul>
              {$formFields.nameMatches.map((name, index) => (
                <li
                  key={index}
                  className="pt-2 pb-2 flex border-b border-gray-700"
                >
                  <span>{name}</span>
                  <button
                    className="ml-auto underline text-redwood"
                    onClick={(e) => {
                      e.preventDefault();
                      formFields.set({
                        ...$formFields,
                        name: name?.toString(),
                      });
                    }}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* if no match */}
        {$formFields.nameMatches && $formFields.nameMatches.length === 0 && (
          <div>
            <p className="p-3">
              Hmmm sorry, there were no matches for your search.{" "}
              <a href="" className="underline text-redwood">
                Please try your search again
              </a>
            </p>
            <p className="p-3">
              Having issues finding your name? Please email{" "}
              <a
                href="mailto:marissa.adrian.wedding@gmail.com"
                className="underline text-redwood"
              >
                marissa.adrian.wedding@gmail.com
              </a>{" "}
              for assistance.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchForm;
