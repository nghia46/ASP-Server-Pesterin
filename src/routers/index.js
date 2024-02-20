import AuthRouter from "./auth.js";
import UserRouter from "./user.js";

const route = (app) => {
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/user", UserRouter);
};

export default route;
