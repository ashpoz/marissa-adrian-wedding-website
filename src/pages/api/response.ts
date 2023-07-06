import type { APIRoute } from "astro";
// @ts-ignore
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.GOOGLE_SHEETS_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

const updateCell = async (row: any, column: any, value: any) => {
  if (!row) return;
  row[column] = value;
  await row.save();
};

const loopThruGuests = async (partyArr: any, callback: Function) => {
  await Promise.all(partyArr.map(callback));
};

export const post: APIRoute = async ({ request }) => {
  const data: any = await request.json();
  const guestId: Number = data.id - 1;
  const { note, songRequests } = data;
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

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
    const mainGuestRow = await rows[guestId];

    // update note for main guest
    updateCell(mainGuestRow, "Note", note);
    // update song requests for main guest
    updateCell(mainGuestRow, "Song Requests", songRequests);

    if (data.party.length > 0) {
      // update RSVP for each guest in main guest's party
      const updatePromises = data.party.map(async (guest: any) => {
        const { id, attending } = guest;
        const row = rows[id - 1];

        try {
          row["RSVP"] = attending; // Batch update
          await row.save();
        } catch (error) {
          console.error("Error: ", error);
        }
      });
      await Promise.all(updatePromises);
    } else {
      // update RSVP for main guest
      await updateCell(mainGuestRow, "RSVP", data.attending);
    }
    // Do something with the data, then return a success response
    return new Response(
      JSON.stringify({
        status: "success",
        data: data,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error: ", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 400 }
    );
  }
};
