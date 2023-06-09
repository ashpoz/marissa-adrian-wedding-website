import { useState } from "react";
import ResponseForm from "./ResponseForm";
import SearchForm from "./SearchForm";

// TODO: figure out how state will be managed
// TODO: should allow user to search for name or name in their party
// TODO: connect to google sheets and make GET request to search for name

const RSVP = () => {
  return (
    <>
      <SearchForm />
      <ResponseForm />
    </>
  );
};

export default RSVP;
