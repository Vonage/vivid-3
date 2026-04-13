# Upload Icons GitHub Action

This package provides a GitHub Action and a manual CLI tool for uploading icons to an S3 bucket.

## Custom GitHub Action

The GitHub Action is designed to automate the process of uploading icons.

Current implementation of icons assumes that some of them have their aliases. To support them, s3 redirects are made. These redirects are created dynamically. Because of that, the action has to be a custom script instead of off-the-shelf Github Action.

### Usage

To use the GitHub Action, include it in your workflow YAML file. Ensure that the necessary AWS credentials and environment variables are set up in your repository secrets.

## Manual CLI Tool

The manual CLI tool allows you to upload icons manually from your local machine. This is useful for testing or one-off uploads.

### Usage

Run the manual upload tool with the following command:

```bash
node manual.js -k <S3 access key> -s <S3 secret access key>
```

You can also setup other options when using the tool

```bash
node manual.js --help
This script should be executed ONLY in local environment. (manual icons upload)

USAGE manual icons upload [OPTIONS] -k, --key -s, --secret

OPTIONS

                                    -m, --mode="icons"    Upload mode: 'icons' (default) or 'marketing-icons'
                                 -v, --version="4.8.0"    Package version
                                  -k, --key (required)    AWS access key
                               -s, --secret (required)    AWS secret access key
                                        --source-dir=""    Source directory containing index.json and icon files
                       -b, --bucket="vivid-icons-prod"    AWS bucket
  -f, --folder="3f7739a0-a898-4f69-a82b-ad9d743170b6"    AWS base folder
                              -r, --region="us-east-1"    AWS region
                                             -d, --dry    Print what would be uploaded without actually uploading
```

## Maintaining the Action

After making changes to the source files, you need to build the project and commit the updated files to the repository. It is crucial to include the contents of the `dist` directory in your commit, as these files are ignored by default and are necessary for the action to function in CI pipelines.

### Steps to Maintain the Action

1. Build the project:

   ```bash
   pnpm build
   ```

2. Forcefully add the `dist` directory to your commit:

   ```bash
   git add -f dist
   ```

3. Commit and push the changes:
   ```bash
   git commit -m "chore(ci): update action and include built files"
   git push
   ```

If the built files in the `dist` directory are not included in the commit, the action will not work in CI pipelines.
