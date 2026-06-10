# Usage guide

The plugin is used directly inside Figma. It extracts variables and styles from the current file and creates one or more DTCG-compliant JSON files. These are then pushed to a GitHub repository as a pull request.

## Steps

1. **Open the Figma file**
   - [The file]() (https://www.figma.com/file/01234567890123456789/Design-Tokens) must contain all the variables and styles you want to export.
   - These must be local to the file. Shared libraries are not supported.

2. **Run the plugin**
   - Open the **"Vivid Tokens"** plugin from the Figma plugins menu.

3. **Fill in the Github API Token**
   - For more information on generating your Personal Access Token, please read [Github's page](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).
   - fine-grained token permissions required for creating pull requests are: `pull_requests:write` and `contents:write`.
   - Resource owner needs to be set to `Vonage` organization, and then, the token needs to be approved.

4. **Fill in PR settings**
   - Source branch
   - Target branch
   - PR title
   - Description
   - Optional tags

5. **Trigger export**
   - The plugin will:
     - Fetch all local variables and styles depending on your selection
     - Generate DTCG JSON files (one per mode in case of variables)
     - Push them to the [Vonage/vivid-3](https://github.com/Vonage/vivid-3) GitHub repo
     - Create the pull request with all provided metadata

## Notes

- You can’t select which variables or styles to include. All of them will be processed.
- Naming and structure are taken 1:1 from Figma. Typos or bad naming will show up in the output.
- Only supported types are processed: colors (via variables), shadows (via effect styles), and typography (via text styles).

That’s it. The plugin is meant to be simple and predictable.
