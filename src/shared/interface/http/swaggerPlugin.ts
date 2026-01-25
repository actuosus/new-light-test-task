import openapi from "@elysiajs/openapi";
import packageJson from "../../../../package.json";

const externalDocs = (repository: string | { url: string }) => {
  if (typeof repository === "string") {
    if (repository.startsWith("github:")) {
      const repoPath = repository.replace("github:", "");
      return {
        url: `https://github.com/${repoPath}`,
        description: "GitHub repository",
      };
    }
    if (repository.startsWith("gitlab:")) {
      const repoPath = repository.replace("gitlab:", "");
      return {
        url: `https://gitlab.com/${repoPath}`,
        description: "GitLab repository",
      };
    }
    if (repository.startsWith("bitbucket:")) {
      const repoPath = repository.replace("bitbucket:", "");
      return {
        url: `https://bitbucket.org/${repoPath}`,
        description: "Bitbucket repository",
      };
    }
    return {
      url: repository,
      description: "GitHub repository",
    };
  } else {
    return {
      url: repository.url,
      description: "Repository",
    };
  }
};

const licenseInfo = (license: string) => {
  switch (license.toLowerCase()) {
    case "mit":
      return {
        name: "MIT License",
        url: "https://opensource.org/license/mit/",
      };
    case "apache-2.0":
      return {
        name: "Apache License 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0",
      };
    case "gpl-3.0":
      return {
        name: "GNU General Public License v3.0",
        url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
      };
    default:
      return {
        name: license,
      };
  }
};

export const swaggerPlugin = openapi({
  exclude: {
    paths: ["/*"],
  },
  path: "/swagger",
  provider: "scalar",
  documentation: {
    info: {
      title: "New Light Task Service",
      description: packageJson.description,
      version: packageJson.version,
      license: licenseInfo(packageJson.license || ""),
      contact: {
        name: packageJson.author.name,
        url: packageJson.author.url,
      },
    },
    externalDocs: externalDocs(packageJson.repository),
    tags: [
      {
        name: "Tasks",
        description:
          "Task service endpoints that goes with create, read, update, and delete operations.",
      },
    ],
  },
});
