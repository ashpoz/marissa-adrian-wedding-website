import type { APIRoute } from "astro";
// @ts-ignore
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.GOOGLE_SHEETS_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const updateCell = (row: any, column: any, value: any) => {
  if (!row) return;
  row[column] = value;
  row.save();
};

const loopThruGuests = (partyArr: any, callback: Function) => {
  partyArr.forEach((guest: Object) => {
    callback(guest);
  });
};

export const post: APIRoute = async ({ request }) => {
  const data: any = await request.json();
  const guestId: Number = data.id - 1;
  const { note, songRequests } = data;

  try {
    // loads the credentials from environment variables
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    // loads document properties and worksheets
    await doc.loadInfo();

    // loads sheet by id
    const sheet = doc.sheetsById[SHEET_ID];
    // loads all rows
    const rows = await sheet.getRows();
    // grabs main guest row
    const mainGuestRow = rows[guestId];

    // update note for main guest
    updateCell(mainGuestRow, "Note", note);
    // update song requests for main guest
    updateCell(mainGuestRow, "Song Requests", songRequests);

    // update RSVP for each guest in main guest's party
    loopThruGuests(data.party, (guest: any) => {
      // grab id and attending from guest
      const { id, attending } = guest;
      // find row in google sheets
      const row = rows[id - 1];
      // update row with new RSVP
      updateCell(row, "RSVP", attending);
    });
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
