import {
  MakeMdOnGithubDataSourceParams,
  makeMdOnGithubDataSource,
} from "mongodb-rag-ingest/sources";

export const cookbookDataSourceConstructor = async ({
  githubRepoName,
  githubRepoUsername,
}: {
  githubRepoName: string;
  githubRepoUsername: string;
}) => {
  const repoBaseUrl = `https://github.com/${githubRepoUsername}/${githubRepoName}/`;

  const cookbookConfig: MakeMdOnGithubDataSourceParams = {
    name: "boston-cooking-school",
    repoUrl: repoBaseUrl,
    repoLoaderOptions: {
      branch: "main",
    },
    filter: (path) =>
      path.startsWith("/cookbook-source") && !path.endsWith("README.md"),
    pathToPageUrl(pathInRepo) {
      const baseUrl = repoBaseUrl + "blob/main";
      const path = baseUrl + pathInRepo;

      return path;
    },
    extractTitle: (pageContent) => extractFirstH1(pageContent) ?? undefined,
  };
  return await makeMdOnGithubDataSource(cookbookConfig);
};

// Helper function
function extractFirstH1(markdownText: string) {
  const lines = markdownText.split("\n");

  for (let line of lines) {
    if (line.startsWith("# ")) {
      // Remove '# ' and any leading or trailing whitespace
      return line.substring(2).trim();
    }
  }
  return null;
}
