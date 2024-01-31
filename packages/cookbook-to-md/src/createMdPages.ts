import fs from "fs";
import { join } from "path";
import sanitize from "sanitize-filename";
async function main() {
  // input file
  const wholeCookbook = fs.readFileSync(
    join(__dirname, "..", "./whole-cookbook.md"),
    "utf8"
  );

  // where we're going to write the output files
  const dirOut = join(__dirname, "..", "..", "..", "cookbook-source");

  // delete all files in dirOut
  const files = fs.readdirSync(dirOut);
  for (const file of files) {
    fs.unlinkSync(join(dirOut, file));
  }

  const h1h2PrefixRegex = /\n#{1,2} /;
  const h2Pages = wholeCookbook
    .split(h1h2PrefixRegex)
    .map((page, i) =>
      i === 0 ? page.replace(/^## /, "# ").trim() : `# ${page}`.trim()
    );
  h2Pages.forEach((page, i) => {
    const pageFileName =
      i +
      "-" +
      sanitize(
        page
          .split("\n")[0]
          .replace(/^#{1,2} /, "")
          .split(" ")
          .join("-")
      ) +
      ".md";
    fs.writeFileSync(join(dirOut, pageFileName), page, "utf-8");
  });
}
main().catch(console.error);
