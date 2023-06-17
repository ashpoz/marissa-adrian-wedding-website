import type { APIRoute } from "astro";
import { getRSVPs } from "../../firebase/guestlist";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();

  if (!data[0]?.group) {
    return new Response(
      JSON.stringify({
        status: "fail",
        message: "No names found!",
      }),
      { status: 404 }
    );
  } else if (data[0]?.group) {
    const party = await getRSVPs(data[0]?.group);

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
};
