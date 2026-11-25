export default function callPrompt(diff) {
  const prompt = `Based only on the following diff, write a commit message for the staged files.

Use one of these prefixes: feat, fix, chore, ui, refactor, bug.
Use lowercase and do not use emojis.
Keep it short and concise.
Add a description on a new line if more context is needed.

Diff:
${diff}`;

  return prompt;
}
