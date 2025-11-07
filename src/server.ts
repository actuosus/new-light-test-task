import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { prisma } from "./shared/infrastructure/db";
import { logger } from "./shared/infrastructure/logging/logger";
import { loggerPlugin } from "./shared/interface/http/loggerPlugin";
import { createTaskRoutes } from "./tasks/interface/http/routes";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = new Elysia();

app.get("/", () => "Hello! It's New Light Test App!");
app.use(loggerPlugin);
app.use(
  swagger({
    exclude: ["/swagger"],
    autoDarkMode: true,
    documentation: {
      info: {
        title: "🦊 Elysia New Light Task Service",
        description:
          "New Light Test Task Service built with Elysia Framework, demonstrating task management with logging and queue processing.",
        version: "0.1.0",
        license: {
          name: "MIT",
          url: "https://opensource.org/license/mit/",
        },
        contact: {
          name: "Arthur Chafonov",
          url: "https://www.linkedin.com/in/actuosus/",
        },
      },
    },
  })
);
app.use(createTaskRoutes(prisma));

const isVercel =
  Boolean(process.env.VERCEL) ||
  Boolean(process.env.NOW_REGION) ||
  Boolean(process.env.VERCEL_REGION) ||
  Boolean(process.env.VERCEL);

if (!isVercel) {
  // app.listen(PORT);
  logger.info("🦊 Elysia service started", {
    port: app.server?.port,
    hostname: app.server?.hostname,
  });
}

export default {
  fetch: app.fetch,
};
