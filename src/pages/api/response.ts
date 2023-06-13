import type { APIRoute } from "astro";
import { google } from "googleapis";
import { GoogleSpreadsheet } from "google-spreadsheet";

const sheets = google.sheets("v4");

// Config variables
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_ID = import.meta.env.GOOGLE_SHEETS_SHEET_ID;
const CLIENT_EMAIL = import.meta.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = import.meta.env.GOOGLE_SHEETS_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  // console.log(data);

  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    console.log(sheet.title);
  } catch (e) {
    console.error("Error: ", e);
  }

  // TODO: validate the data
  // TODO: send the data to a database
  // TODO: return a success message
  // TODO: return an error message if something goes wrong

  //const name = data.get("fullName");
  // Validate the data - you'll probably want to do more than this
  // if (!name || !email || !message) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "Missing required fields",
  //     }),
  //     { status: 400 }
  //   );
  // }
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
