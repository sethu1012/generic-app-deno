import { Application, log } from "./deps.ts";
import authRoute from "./routes/auth.route.ts";

const app = new Application();
const PORT = 8000;

app.use(authRoute.routes());
app.use(authRoute.allowedMethods());

app.addEventListener("error", (event) => {
  log.error(event.error);
});

// Request Logger
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    log.error(err);
    throw err;
  }
});

if (import.meta.main) {
  log.info(`Starting server on port ${PORT}`);
  await app.listen({
    port: PORT,
  });
}
