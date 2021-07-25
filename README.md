# ✨ Publish NuGet

GitHub action get version from donet projects

## Usage

Create new `.github/workflows/publish.yml` file:

```yml
name: publish to nuget
on:
  push:
    branches:
      - master # Default release branch
jobs:
  publish:
    name: build, pack & publish
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # - name: Setup dotnet
      #   uses: actions/setup-dotnet@v1

      # Publish
      - name: publish on version change
        id: publish_nuget
        uses: chenryhabana205/dotnetgetversion@v1
        with:
          # Filepath of the project to be packaged, relative to root of repository
          VERSION_FILE_PATH: Core/Core.csproj

          # Regex pattern to extract version info in a capturing group
          # VERSION_REGEX: ^\s*<Version>(.*)<\/Version>\s*$
```

**Reference:**

https://github.com/brandedoutcast/publish-nuget

**FYI:**

- Outputs may or may not be set depending on the action inputs or if the action failed
- `NUGET_SOURCE` must by Nexus
- Multiple projects can make use of steps to configure each project individually, common inputs between steps can be given as `env` for [job / workflow](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#env)

## License

[MIT](LICENSE)
