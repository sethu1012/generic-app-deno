import { Router } from "../deps.ts";
import authController from "../controllers/auth.controller.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello World";
});

router.get("/login", authController.axLogin);
router.get("/signup", authController.axSignup);

export default router;
