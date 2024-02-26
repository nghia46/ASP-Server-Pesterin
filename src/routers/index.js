import AuthRouter from "./auth.js";
import UserRouter from "./user.js";
import SaveRouter from "./save.js";
import ReportRouter from "./report.js";

const route = (app) => {
  app.use("/api/v1/auth", AuthRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/save", SaveRouter);
  app.use("/api/v1/report", ReportRouter);

};

export default route;
