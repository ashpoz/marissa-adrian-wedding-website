import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  console.log(data);

  // use Name to lookup matching row/s in google sheets
  // if row exists, update RSVP, note, and song requests

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
      body: data,
    }),
    { status: 200 }
  );
};
