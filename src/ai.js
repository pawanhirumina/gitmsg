export async function generateCommitMessage(diff) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.log("API key is not configured");
    process.exit(1);
  }

  // TODO: add fetch to call the api endpoint
}
