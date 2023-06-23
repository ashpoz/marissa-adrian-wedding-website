import type { FC } from "react";
import Spinner from "./Spinner";

interface SubmitButton {
  isSubmitting: boolean;
  submittingText?: string;
  initialText?: string;
}

const SubmitButton: FC<SubmitButton> = ({
  isSubmitting,
  submittingText = "Submitting...",
  initialText = "Submit",
}) => {
  return (
    <button
      className="flex items-center px-10 mt-3 py-3 text-white bg-redwood hover:bg-redwood-dark cursor-pointer"
      disabled={isSubmitting && true}
    >
      {isSubmitting ? (
        <>
          <Spinner />
          {submittingText}
        </>
      ) : (
        initialText
      )}
    </button>
  );
};

export default SubmitButton;
