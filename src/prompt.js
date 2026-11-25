export default function checkDiff(diff) {
  const prompt = `check the file diff and based only on this diff then make a commit message for the staged files use these prefixes for the commit messages feat, fix, chore, ui, refactor, bug use lowercase and and also don't use emojis make it short and consise and also add a description if more context needed \n${diff}`;

  return prompt;
}
