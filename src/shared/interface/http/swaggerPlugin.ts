import swagger from "@elysiajs/swagger";
import packageJson from "../../../../package.json";

export const swaggerPlugin = swagger({
  exclude: ["/swagger"],
  autoDarkMode: true,
  documentation: {
    info: {
      title: "New Light Task Service",
      description: packageJson.description,
      version: packageJson.version,
      license: {
        name: packageJson.license,
        url: "https://opensource.org/license/mit/",
      },
      contact: {
        name: packageJson.author.name,
        url: packageJson.author.url,
      },
    },
    externalDocs: {
      url: packageJson.repository.url,
      description: "GitHub repository",
    },
    tags: [
      {
        name: "Tasks",
        description:
          "Task service endpoints that goes with create, read, update, and delete operations.",
      },
    ],
  },
});
