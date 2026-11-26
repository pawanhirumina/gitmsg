import { execSync } from "node:child_process";
import { generateCommitMessage } from "./ai.js";
import { ensureConfig } from "./config.js";

try {
  await ensureConfig();

  // check git diff
  const output = execSync("git diff --cached", { encoding: "utf-8" });

  // check if anything is staged
  if (output.trim() === "") {
    console.log("Nothing staged");
    process.exit(1);
  } else {
    const message = await generateCommitMessage(output);
    console.log(message);
  }
} catch (error) {
  // if not a git repo or config fails, break
  console.error(error.message);
  process.exit(1);
}
