import { execFileSync } from "node:child_process";

export default function commitMessage(message) {
  execFileSync("git", ["commit", "-m", message], { encoding: "utf-8" });
}
