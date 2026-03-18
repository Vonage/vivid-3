# Release Process

We use [Changesets](https://github.com/changesets/changesets) to manage versions.

After making a change, run `pnpm changeset` and:

- Select the affected package(s)
  - This package will receive version bump and changelog entry
  - Dependent packages will automatically be patch-bumped
- Select whether this is a major / minor / patch change
- Enter the changelog message for this change
  - Use the [conventional commits](https://www.conventionalcommits.org/) format for the message
  - End the message with the ticket number in parentheses, e.g. `(VIV-1234)` (if any)
  - Examples:
    - `fix(button): fix disabled state (VIV-1234)`
    - `chore: update dependencies (VIV-1234)`
- The version of `@vonage/vivid`, `@vonage/vivid-vue` and `@vonage/vivid-test-utils` is automatically kept in sync
  - When making changes to components, add the changeset only to `@vonage/vivid`
  - Only add changesets to the derived packages if there are specific changes to them

This creates an `.md` file in `.changesets/`, which you need to commit into the repo. These files represent changes that have not yet been released.

When your branch is merged to main, the changesets GitHub action will create/update a release PR.
This PR bumps the package versions and updates the `CHANGELOG.md` for each package and deletes the pending changesets in `.changesets/`.

To trigger a release, merge the release PR. The release workflow will release all updated packages and create a git tag for successfully released packages.

For certain packages it also creates a GitHub release. The release is skipped for derived packages, since those are considered to be part of the `@vonage/vivid` release.

The docs are released together with `@vonage/vivid`. To release the docs independently, run the `Deploy to S3` workflow manually.
