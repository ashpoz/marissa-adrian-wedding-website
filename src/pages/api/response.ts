import type { APIRoute } from "astro";
// @ts-ignore
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.GOOGLE_SHEETS_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

const updateCell = async (row: any, column: any, value: any) => {
  try {
    // throw new Error("Error");
    row[column] = value;
    await row.save();
  } catch (error) {
    console.error("Error saving google sheet cell: ", error);
    throw error;
  }
};

const updatePartyRSVP = async (partyArr: any, rows: any) => {
  if (partyArr.length <= 1) return;
  for (const guest of partyArr) {
    const { id, attending } = guest;
    const currentRow = rows[id - 1];
    try {
      currentRow["RSVP"] = attending; // Batch update
      await currentRow.save();
    } catch (error) {
      console.error(`Error saving RSVP status for guest ${id}:`, error);
      throw error;
    }
  }
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

    // if guest has a party, update RSVP for each guest in party
    if (data.party.length > 1) {
      // update RSVP for each guest in main guest's party
      await Promise.all([
        updatePartyRSVP(data.party, rows),
        updateCell(mainGuestRow, "Note", note),
        updateCell(mainGuestRow, "Song Requests", songRequests),
      ]);
    } else {
      // update RSVP for main guest
      await Promise.all([
        updateCell(mainGuestRow, "RSVP", data.attending),
        updateCell(mainGuestRow, "Note", note),
        updateCell(mainGuestRow, "Song Requests", songRequests),
      ]);
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
