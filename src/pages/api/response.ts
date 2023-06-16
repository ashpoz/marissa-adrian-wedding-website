import type { APIRoute } from "astro";
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.GOOGLE_SHEETS_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  const guestId = data.id - 1;
  const rsvpObj = data.party.find(({ id }) => id === data.id);

  // use Name to lookup matching row/s in google sheets
  // if row exists, update RSVP, note, and song requests

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const rows = await sheet.getRows();

    // now you can read/write to rows
    // TODO: saving doesnt update, work on this
    const row = rows[guestId];
    let rowName = row["Name"];
    let rowRSVP = row["RSVP"];

    rows[guestId]["RSVP"] = rsvpObj.attending;
    rows[guestId].save(); // save changes

    // rowRSVP = rsvpObj.attending;
    // console.log(rowRSVP);
    // await row.save(); // save changes

    // console.log(rows[guestId]["Name"]);
  } catch (error: any) {
    console.error("Error: ", error);
    return new Response(
      JSON.stringify({
        message: "Error!",
        body: error,
      }),
      { status: 400 }
    );
  }

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
      body: data,
    }),
    { status: 200 }
  );
};
