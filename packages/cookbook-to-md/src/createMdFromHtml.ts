import TurndownService from "turndown";
import * as turndownPluginGfm from "turndown-plugin-gfm";

import { removeMarkdownImagesAndLinks } from "mongodb-rag-ingest/sources";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
async function main() {
  const html = readFileSync(join(__dirname, "..", "./cookbook.html"), "utf8");
  const turndown = new TurndownService({ headingStyle: "atx" });
  turndown.use(turndownPluginGfm.gfm);
  const md = removeMarkdownImagesAndLinks(await turndown.turndown(html));
  writeFileSync(join(__dirname, "..", "./whole-cookbook.md"), md, "utf-8");
}
main().catch(console.error);
