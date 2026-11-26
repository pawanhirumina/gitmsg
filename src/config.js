import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export const configPath = join(homedir(), ".config", "gitmsg", "config.json");

export const defaultConfig = {
  GROQ_API_KEY: "",
  GROQ_BASE_URL: "https://api.groq.com/openai/v1/chat/completions",
  GROQ_MODEL: "openai/gpt-oss-20b",
};

export async function ensureConfig() {
  await mkdir(dirname(configPath), { recursive: true, mode: 0o700 });

  try {
    await readFile(configPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;

    await writeFile(configPath, `${JSON.stringify(defaultConfig, null, 2)}\n`, {
      encoding: "utf8",
      mode: 0o600,
    });
  }

  return configPath;
}

export async function loadConfig() {
  await ensureConfig();

  try {
    const contents = await readFile(configPath, "utf8");
    return { ...defaultConfig, ...JSON.parse(contents) };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in config file: ${configPath}`);
    }
    throw error;
  }
}
