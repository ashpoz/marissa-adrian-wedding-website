import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";

import ErrorOutput from "./ErrorOutput";
import Spinner from "./Spinner";
import SubmitButton from "./SubmitButton";

interface IFormInput {
  fullName: String;
}

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const $formFields = useStore(formFields);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // search for name
      const searchName = await fetch("/api/searchName", {
        method: "POST",
        body: JSON.stringify(data),
      });
      // get results
      const searchData = await searchName.json();
      // get results array
      const results = searchData.data.results;

      // if only 1 result, search for party and set form fields
      if (results && results.length === 1) {
        const searchParty = await fetch("/api/searchParty", {
          method: "POST",
          body: JSON.stringify(results),
        });

        const partyData = await searchParty.json();
        const party = partyData.data.party;

        formFields.set({
          ...$formFields,
          id: results[0].id,
          attending: results[0].attending,
          results: results,
          name: results[0].name,
          party: party,
        });
        // if more than one result, set results
      } else if (results && results.length > 1) {
        formFields.set({
          ...$formFields,
          results: results,
        });
        // if no results, set results to empty array
      } else {
        formFields.set({
          ...$formFields,
          results: [],
        });
      }
      // if error, set results to empty array
    } catch (err) {
      console.log(err);
      formFields.set({
        ...$formFields,
        results: [],
      });
    }
  };

  return (
    <>
      {/* If no matches, show search form */}
      {!$formFields.results && (
        <>
          <div className="text-md mt-4 mb-6 py-2 px-2 text-gray-700">
            ✔️ Please enter your full name. If you're responding for yourself
            and a guest or your family, you can RSVP for your entire group on
            the next page.
          </div>
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
            <SubmitButton
              isSubmitting={isSubmitting}
              initialText="Search"
              submittingText="Searching..."
            />
            {/* <button
              className="flex items-center px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
              disabled={isSubmitting && true}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button> */}
          </form>
        </>
      )}
      {/* if more than 1 match */}
      <div className="pt-6 pb-6">
        {$formFields.results && $formFields.results.length > 1 && (
          <div>
            <p className="text-gray-700 mb-6">
              🔍 We found more than one person with that name. Please select
              your full name below <br />
              (or{" "}
              <a href="" className="underline text-redwood">
                search again
              </a>
              ):
            </p>
            <ul>
              {$formFields.results.map((result, index) => (
                <li
                  key={index}
                  className="pt-2 pb-2 flex border-b border-gray-700"
                >
                  <span>{result.name}</span>
                  <button
                    className="ml-auto underline text-redwood"
                    onClick={(e) => {
                      e.preventDefault();

                      // resubmit form with selected name
                      onSubmit({ fullName: result.name });
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
        {$formFields.results && $formFields.results.length === 0 && (
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
