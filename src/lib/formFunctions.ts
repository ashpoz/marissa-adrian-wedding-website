import type { FormFields } from "./formStore";
import type { IFormInput } from "./formTypes";

// API endpoints
const web3formAPIUrl = "https://api.web3forms.com/submit";
const googleSheetsAPIUrl = "/api/response";

export const sendEmail = async (formFields: FormFields, data: IFormInput) => {
  // send data to web3forms
  const web3formResponse = await fetch(web3formAPIUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: "d266888d-eb0f-4d6c-be36-0634302278dd",
      subject: `New submission from ${formFields.name}`,
      from_name: "Marissa and Adrian Wedding RSVP Form",
      botcheck: "",
      id: formFields.id,
      attending: data.attending,
      name: formFields.name,
      note: data.note,
      songRequests: data.songRequests,
    }),
  });

  // if response is not ok, set completed to false
  if (!web3formResponse.ok) {
    throw new Error("Could not send email to web3forms");
  }
};

export const sendToSheets = async (
  formFields: FormFields,
  data: IFormInput,
  partyArr: Array<Object>
) => {
  // send data to server
  const serverResponse = await fetch(googleSheetsAPIUrl, {
    method: "POST",
    body: JSON.stringify({
      id: formFields.id,
      name: formFields.name,
      note: data.note,
      songRequests: data.songRequests,
      party: partyArr,
    }),
  });

  // if response is not ok, set completed to false
  if (!serverResponse.ok) {
    throw new Error(serverResponse.statusText);
  }
};
