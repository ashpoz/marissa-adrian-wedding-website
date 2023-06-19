import type { APIRoute } from "astro";
import { getGuestlistParty } from "../../firebase/guestlist";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();

  // If we have a group, get the party and return it
  if (data[0]?.group) {
    const party = await getGuestlistParty(data[0]?.group);
    return new Response(
      JSON.stringify({
        status: "success",
        data: {
          party,
        },
      }),
      { status: 200 }
    );
  }

  // if we don't have a group, return an error
  return new Response(
    JSON.stringify({
      status: "fail",
      message: "No names found!",
    }),
    { status: 404 }
  );
};
