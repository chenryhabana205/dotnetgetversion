const os = require("os"),
  fs = require("fs"),
  path = require("path"),
  https = require("https"),
  spawnSync = require("child_process").spawnSync;
const core = require("@actions/core");
const github = require("@actions/github");

try {
  const versionFile = core.getInput("VERSION_FILE_PATH");
  const versionRegex = new RegExp(
    core.getInput("VERSION_REGEX") || process.env.VERSION_REGEX,
    "m"
  );

  if (!fs.existsSync(versionFile))
    this._printErrorAndExit("version file not found");

  console.log(`Version Filepath: ${versionFile}`);
  console.log(`Version Regex: ${versionRegex}`);

  const versionFileContent = fs.readFileSync(versionFile, {
      encoding: "utf-8",
    }),
    parsedVersion = this.versionRegex.exec(versionFileContent);

  if (!parsedVersion)
    this._printErrorAndExit("unable to extract version info!");

  core.setOutput("TAG", parsedVersion[1]);
} catch (error) {
  core.setFailed(error.message);
}
