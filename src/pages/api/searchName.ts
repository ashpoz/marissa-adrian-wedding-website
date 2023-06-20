import type { APIRoute } from "astro";
import { getGuestlistNames } from "../../firebase/guestlist";
import { normalizeString } from "../../lib/helpers";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  const searchedName = data.fullName;

  // get all names from db
  const guestlistNames = await getGuestlistNames();

  // filter names that start with searched name
  // const foundNames = guestlistNames.filter((a) => a.startsWith(searchedName));
  const foundNames = guestlistNames.filter((obj: any) => {
    let objName = normalizeString(obj.name).toLowerCase();
    let name = normalizeString(searchedName).toLowerCase();

    return objName.startsWith(name);
  });

  // if we have a name/s, return it
  if (foundNames.length >= 1) {
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          results: foundNames,
        },
      }),
      { status: 200 }
    );
  }

  // if we don't have a name, return an error
  return new Response(
    JSON.stringify({
      status: "fail",
      message: "No names found!",
    }),
    { status: 404 }
  );
};
