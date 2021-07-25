const os = require("os"),
  fs = require("fs"),
  path = require("path"),
  https = require("https"),
  spawnSync = require("child_process").spawnSync;
const core = require("@actions/core");

try {
  const versionFile = core.getInput("VERSION_FILE_PATH");
  const versionRegex = new RegExp(
    core.getInput("VERSION_REGEX") || process.env.VERSION_REGEX,
    "m"
  );

  if (!fs.existsSync(versionFile)) {
    core.setFailed("version file not found");
    return;
  }

  console.log(`Version Filepath: ${versionFile}`);
  console.log(`Version Regex: ${versionRegex}`);

  const versionFileContent = fs.readFileSync(versionFile, {
      encoding: "utf-8",
    }),
    parsedVersion = this.versionRegex.exec(versionFileContent);

  if (!parsedVersion) {
    core.setFailed("unable to extract version info!");
    return;
  }

  core.setOutput("TAG", parsedVersion[1]);
} catch (error) {
  core.setFailed(error.message);
}
