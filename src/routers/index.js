import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
import ArtRouter from "./art.js";

const route = (app) => {
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/art", ArtRouter);
};

export default route;
