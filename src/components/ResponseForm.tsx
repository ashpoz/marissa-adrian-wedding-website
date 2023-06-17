import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { formFields } from "../lib/formStore";
import ErrorOutput from "./ErrorOutput";

interface IFormInput {
  attending: String;
  songRequests?: Array<String>;
  note?: String;
}

const ResponseForm = () => {
  const $formFields = useStore(formFields);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const [attendingResponse, setAttendingResponse] = useState({});

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const partyArr = $formFields.party.map((member, index) => {
      return {
        ...member,
        attending: data.attending[index],
      };
    });

    formFields.set({
      ...$formFields,
      note: data.note,
      songRequests: data.songRequests,
      party: partyArr,
    });

    const response = await fetch("/api/response", {
      method: "POST",
      body: JSON.stringify({
        id: $formFields.id,
        name: $formFields.name,
        note: data.note,
        songRequests: data.songRequests,
        party: partyArr,
      }),
    });

    const resData = await response.json();

    console.log(resData);

    if (resData.status === "success") {
      formFields.set({
        ...$formFields,
        completed: true,
      });
    } else {
      // TODO: need to display error to user
      throw new Error("Something went wrong");
    }
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  // TODO: this should be refactored
  const handleRadioChange = (
    labelEl: HTMLElement,
    radioEl: HTMLInputElement
  ) => {
    if (!labelEl || !radioEl) return;

    const radioEls = document.querySelectorAll(`input[name="${radioEl.name}"]`);

    radioEls.forEach((el) => {
      const labelEl = el.parentNode as HTMLElement;
      labelEl.classList.remove("bg-green-200");
      labelEl.classList.remove("bg-red-200");
    });

    if (radioEl.checked && radioEl.value === "yes") {
      labelEl.classList.add("bg-green-200");
    } else if (radioEl.checked && radioEl.value === "no") {
      labelEl.classList.add("bg-red-200");
    }
  };

  useEffect(() => {
    // preopulate form with existing data
    // TODO: this should be refactored
    if ($formFields.party && $formFields.party.length > 1) {
      $formFields.party.forEach((_, index) => {
        let radioEls = document.querySelectorAll(
          `input[name="attending.${index}"]`
        ) as NodeListOf<HTMLInputElement>;
        setValue(`attending.${index}`, $formFields.party[index].attending);

        radioEls.forEach((radioEl) => {
          if (radioEl.checked && radioEl.value === "yes") {
            radioEl.parentNode?.classList.add("bg-green-200");
          } else if (radioEl.checked && radioEl.value === "no") {
            radioEl.parentNode?.classList.add("bg-red-200");
          }
        });
      });
    }
  }, [$formFields.name]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      aria-labelledby="attending-response-form"
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
              <fieldset className="mb-2 flex">
                <legend className="mb-1 text-gray-700">
                  Will <strong>{member.name}</strong> be able to attend our
                  wedding?
                </legend>
                <label className="w-full cursor-pointer border rounded p-3">
                  <input
                    className="accent-green-600"
                    type="radio"
                    value="yes"
                    {...register(`attending.${index}` as const, {
                      required: true,
                      onChange: (e) => {
                        handleRadioChange(e.target.parentNode, e.target);
                      },
                    })}
                  />
                  <span className="px-2">Yes</span>
                </label>
                <label className="w-full cursor-pointer border rounded p-3">
                  <input
                    className="accent-red-600"
                    type="radio"
                    value="no"
                    {...register(`attending.${index}`, {
                      required: true,
                      onChange: (e) => {
                        handleRadioChange(e.target.parentNode, e.target);
                      },
                    })}
                  />
                  <span className="px-2">No</span>
                </label>
              </fieldset>
              <ErrorOutput errType={errors?.attending?.type} />
            </div>
          ))}
        </div>
      )}
      {/* if only 1 person in party */}
      {$formFields.party && $formFields.party.length <= 1 && (
        <>
          <fieldset className="mb-2 flex">
            <legend className="mb-1 text-gray-700">
              Will <strong>{$formFields.name}</strong> be able to attend our
              wedding?
            </legend>
            <label className="w-full cursor-pointer border rounded p-3">
              <input
                className="accent-green-600"
                type="radio"
                value="yes"
                {...register("attending", {
                  required: true,
                  onChange: (e) => {
                    console.log(e);
                  },
                })}
              />
              <span className="px-2">Yes</span>
            </label>
            <label className="w-full cursor-pointer border rounded p-3">
              <input
                className="accent-red-600"
                type="radio"
                value="no"
                {...register("attending", {
                  required: true,
                  onChange: (e) => {
                    console.log(e);
                  },
                })}
              />
              <span className="px-2">No</span>
            </label>
          </fieldset>
          <ErrorOutput errType={errors?.attending?.type} />
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
