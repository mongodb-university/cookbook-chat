import { strict as assert } from "assert";
import dotenv from "dotenv";

/**
  Load environment variables from a .env file at the given path.
  Note that if you change the environment variable names,
  you need to update this function to support those environment variables.
 */
export function loadEnvVars(path: string) {
  Object.keys(process.env).forEach(key => {
    delete process.env[key];
  });
  dotenv.config({ path });
  const {
    MONGODB_CONNECTION_URI,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    OPENAI_API_KEY,
    OPENAI_EMBEDDING_MODEL,
    GITHUB_REPO_OWNER,
    GITHUB_REPO_NAME,
  } = process.env;
  assert(MONGODB_CONNECTION_URI, "MONGODB_CONNECTION_URI is required");
  assert(MONGODB_DATABASE_NAME, "MONGODB_DATABASE_NAME is required");
  assert(VECTOR_SEARCH_INDEX_NAME, "VECTOR_SEARCH_INDEX_NAME is required");
  assert(OPENAI_API_KEY, "OPENAI_API_KEY is required");
  assert(OPENAI_EMBEDDING_MODEL, "OPENAI_EMBEDDING_MODEL is required");
  assert(GITHUB_REPO_OWNER, "GITHUB_REPO_OWNER is required");
  assert(GITHUB_REPO_NAME, "GITHUB_REPO_NAME is required");
  return {
    MONGODB_CONNECTION_URI,
    MONGODB_DATABASE_NAME,
    VECTOR_SEARCH_INDEX_NAME,
    OPENAI_API_KEY,
    OPENAI_EMBEDDING_MODEL,
    GITHUB_REPO_OWNER,
    GITHUB_REPO_NAME,
  };
}
