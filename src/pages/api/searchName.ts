import type { APIRoute } from "astro";
import { getGuestlistNames } from "../../firebase/guestlist";

// const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // The database URL depends on the location of the database
//   databaseURL: "https://DATABASE_NAME.firebaseio.com",
// });

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  const searchedName = data.fullName;

  // get all names from db
  const guestlistNames = await getGuestlistNames();

  // filter names that start with searched name
  const foundNames = guestlistNames.filter((a) => a.startsWith(searchedName));

  if (foundNames.length === 0) {
    return new Response(
      JSON.stringify({
        message: "No names found!",
      }),
      { status: 404 }
    );
  } else if (foundNames.length > 1) {
    return new Response(
      JSON.stringify({
        message: "More than one name found!",
        names: foundNames,
      }),
      { status: 200 }
    );
  }
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
      names: foundNames,
    }),
    { status: 200 }
  );
};
