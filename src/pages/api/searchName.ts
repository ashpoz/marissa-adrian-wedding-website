import type { APIRoute } from "astro";
import { getGuestlistNames } from "../../firebase/guestlist";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  const searchedName = data.fullName;

  // get all names from db
  const guestlistNames = await getGuestlistNames();

  // filter names that start with searched name
  // const foundNames = guestlistNames.filter((a) => a.startsWith(searchedName));
  const foundNames = guestlistNames.filter((a) =>
    a.name.startsWith(searchedName)
  );

  if (foundNames.length === 1) {
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          results: foundNames,
        },
      }),
      { status: 200 }
    );
  } else if (foundNames.length > 1) {
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          results: foundNames,
        },
      }),
      { status: 200 }
    );
  } else if (foundNames.length === 0) {
    return new Response(
      JSON.stringify({
        status: "fail",
        message: "No names found!",
      }),
      { status: 404 }
    );
  }
};
