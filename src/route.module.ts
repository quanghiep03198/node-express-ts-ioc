import { Application } from "express";
import express from "express";

type init = {
  prefix: string;
  app: Application;
};

export class RouteModule {
  static async init({ prefix, app }: init) {
    try {
      const router = express.Router();
      const routes = await Promise.all([
        // import from here
        import("./modules/user/user.route"),
      ]);

      routes.forEach((route) => {
        router.use(route.default.register());
      });

      app.use(prefix, router);

      console.log("Router register successful");
    } catch (error) {
      console.log(
        "Error from RouteModule:>>> ",
        error instanceof Error ? error.message : error
      );
    }
  }
}
