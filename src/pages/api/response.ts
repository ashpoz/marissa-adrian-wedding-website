import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  console.log(data);

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
