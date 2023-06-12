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

  const guestlistNames = await getGuestlistNames();

  // TODO: check if the name is in the database
  const foundNames = guestlistNames.filter((a) => a.includes(searchedName));

  console.log(foundNames);

  // TODO: validate the data
  // TODO: if it is, return the data
  // TODO: if it isn't, return an error

  //const name = data.get("fullName");
  // Validate the data - you'll probably want to do more than this
  if (foundNames.length === 0) {
    return new Response(
      JSON.stringify({
        message: "No names found!",
      }),
      { status: 400 }
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
