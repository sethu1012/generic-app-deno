import { Context, log } from "../deps.ts";

const axLogin = async ({ request, response }: Context) => {
  const body = await request.body();
  console.log(body.value());
  response.body = "Login";
  response.status = 200;
};

const axSignup = async ({ request, response }: Context) => {
  try {
    const body = await request.body();
    const payload = {
      client_id: Deno.env.get("AUTH0_CLIENT_ID") || "",
      connection: Deno.env.get("AUTH0_CONNECTION") || "",
      ...body.value,
    };

    const user = await fetch(
      Deno.env.get("AUTH0_DOMAIN") + "/dbconnections/signup",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!user.ok) {
      log.error("User not created");
      throw new Error(user.statusText);
    }

    response.status = 201;
    response.body = {
      status: true,
      data: await user.json(),
    };
  } catch (err) {
    response.status = 400;
    response.body = {
      status: false,
      message: err,
    };
  }
};

export default {
  axLogin,
  axSignup,
};
