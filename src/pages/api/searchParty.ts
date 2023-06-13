import type { APIRoute } from "astro";
import { getRSVPs } from "../../firebase/guestlist";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  const party = data.party;
  const partyArray: Array<String> = [];

  // TODO: work on this
  party.forEach((name) => {
    const foundNames = getRSVPs(name);
    partyArray.push(foundNames);
  });

  // if (foundNames.length === 0) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "No names found!",
  //     }),
  //     { status: 404 }
  //   );
  // } else if (foundNames.length > 1) {
  //   return new Response(
  //     JSON.stringify({
  //       message: "More than one name found!",
  //       matches: foundNames,
  //     }),
  //     { status: 200 }
  //   );
  // }
  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!",
      results: "test",
    }),
    { status: 200 }
  );
};
