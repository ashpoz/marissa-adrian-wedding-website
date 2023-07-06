import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { FormFields, formFields } from "../lib/formStore";
import ErrorOutput from "./ErrorOutput";
import SubmitButton from "./SubmitButton";

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const partyArr = $formFields.party?.map((member, index) => {
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

    try {
      const response = await fetch("/api/response", {
        method: "POST",
        body: JSON.stringify({
          id: $formFields.id,
          attending: data.attending,
          name: $formFields.name,
          note: data.note,
          songRequests: data.songRequests,
          party: partyArr,
        }),
      });

      // if response is not ok, set completed to false
      if (!response.ok) {
        setError("root.serverError", {
          type: "server",
          message: "Something went wrong. Please try again",
        });
        throw new Error(response.statusText);
      }

      formFields.set({
        ...$formFields,
        completed: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  const radioStyles = {
    yes: "bg-green-200",
    no: "bg-red-200",
  };

  const radioStylingToggle = (
    labelEl: HTMLElement,
    radioEl: HTMLInputElement
  ) => {
    if (!labelEl || !radioEl) return;

    radioEl.checked && labelEl.classList.add(radioStyles[radioEl.value]);
  };

  const clearRadioStyling = (radioEls: NodeList) => {
    if (!radioEls) return;

    radioEls.forEach((el) => {
      const labelEl = el.parentNode as HTMLElement;
      Object.keys(radioStyles).forEach((key) => {
        labelEl.classList.remove(radioStyles[key]);
      });
    });
  };

  const handleRadioChange = (
    labelEl: HTMLElement,
    radioEl: HTMLInputElement
  ) => {
    if (!labelEl || !radioEl) return;

    const radioEls = document.querySelectorAll(`input[name="${radioEl.name}"]`);

    clearRadioStyling(radioEls);

    radioStylingToggle(labelEl, radioEl);
  };

  const prepopulateForm = (formState: FormFields) => {
    if (!formState || !formState.party) return;

    if (formState.party.length > 1) {
      formState.party.forEach((_, index) => {
        let radioEls = document.querySelectorAll(
          `input[name="attending.${index}"]`
        ) as NodeListOf<HTMLInputElement>;
        setValue(`attending.${index}`, formState.party[index].attending);

        radioEls.forEach((radioEl) => {
          radioStylingToggle(radioEl.parentNode as HTMLElement, radioEl);
        });
      });
    } else {
      let radioEls = document.querySelectorAll(
        `input[name="attending"]`
      ) as NodeListOf<HTMLInputElement>;
      setValue("attending", formState.attending);

      radioEls.forEach((radioEl) => {
        radioStylingToggle(radioEl.parentNode as HTMLElement, radioEl);
      });
    }
  };

  useEffect(() => {
    // preopulate form with existing data
    prepopulateForm($formFields);
  }, [$formFields.name]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      aria-labelledby="attending-response-form"
      className="py-10"
    >
      <h3>
        <strong className="text-2xl">Hi, {$formFields.name}!</strong>
      </h3>
      {/* if they have a wedding party, incl. below text and map() fn */}
      {$formFields.party && $formFields.party.length > 1 && (
        <div>
          <p className="text-lg mt-2 mb-8">Please RSVP below:</p>
          {$formFields.party.map((member, index) => (
            <div key={index} className="mt-4 mb-4">
              <fieldset className="mb-2 flex">
                <legend className="mb-2 text-gray-700">
                  Will{" "}
                  <strong className="font-bolder text-redwood uppercase">
                    {member.name}
                  </strong>{" "}
                  be able to attend our reception?
                </legend>
                <label className="w-full cursor-pointer border border-gray-700 rounded p-3">
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
                <label className="w-full cursor-pointer border border-gray-700 rounded p-3">
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
        <div className="mt-4 mb-4">
          <fieldset className="mb-2 flex">
            <legend className="mb-2 text-gray-700">
              Will{" "}
              <strong className="font-bolder text-redwood uppercase">
                {$formFields.name}
              </strong>{" "}
              be able to attend our reception?
            </legend>
            <label className="w-full cursor-pointer border border-gray-700 rounded p-3">
              <input
                className="accent-green-600"
                type="radio"
                value="yes"
                {...register("attending", {
                  required: true,
                  onChange: (e) => {
                    handleRadioChange(e.target.parentNode, e.target);
                  },
                })}
              />
              <span className="px-2">Yes</span>
            </label>
            <label className="w-full cursor-pointer border border-gray-700 rounded p-3">
              <input
                className="accent-red-600"
                type="radio"
                value="no"
                {...register("attending", {
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
      )}

      <span className="text-gray-700">
        Song Requests <span className="text-gray-400">(optional)</span>
      </span>
      <input
        type="text"
        className="mt-2 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        placeholder="Any songs you'd like to hear?"
        {...register("songRequests")}
      />
      <ErrorOutput errType={errors?.songRequests?.type} />

      <span className="text-gray-700">
        Note <span className="text-gray-400">(optional)</span>
      </span>
      <textarea
        className="mt-2 mb-4 block w-full px-2 py-2 rounded border border-solid border-gray-300"
        rows={3}
        placeholder="Feel free to leave any newlywed advice for us!"
        {...register("note")}
      ></textarea>
      <ErrorOutput errType={errors?.note?.type} />

      {errors?.root?.serverError.type === "server" && ( // if server error
        <p role="alert" className="mt-1 mb-4 text-red-800">
          There was an error submitting your response. Please try again. If you
          have any issues, please email us at{" "}
          <a
            className="underline"
            href="mailto:marissa.adrian.wedding@gmail.com"
          >
            marissa.adrian.wedding@gmail.com
          </a>
        </p>
      )}
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default ResponseForm;
