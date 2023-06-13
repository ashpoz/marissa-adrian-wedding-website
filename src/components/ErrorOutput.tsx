import type { ReactNode } from "react";

const errorMessages: Record<string, ReactNode> = {
  required: "This field is required",
  minLength: "Too short",
};

const ErrorOutput = ({ errType }: { errType: any }) => {
  return (
    <p role="alert" className="mt-1 mb-4 text-red-800">
      {errorMessages[errType]}
    </p>
  );
};

export default ErrorOutput;
