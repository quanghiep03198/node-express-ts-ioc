import { Application } from "express";
import express from "express";
import "dotenv/config";
import { DatabaseModule } from "./database/database.module";
import { RouteModule } from "./route.module";

const bootstrap = async () => {
  const app: Application = express();

  const HOST: string = process.env.HOST || "127.0.0.1";
  const PORT: string | number = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded());

  await Promise.all([
    DatabaseModule.init(),
    RouteModule.init({ prefix: "/v1/api", app }),
  ]);

  await app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
};

bootstrap();
