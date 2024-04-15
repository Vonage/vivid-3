# Icons Builder

This is a tool to generate icons for the project.


## Usage

1. Update ICONS_VERSION with the new version in the `libs/consts/src/lib/icons.ts` file.
2. Go to the `libs/icons-builder` folder.
3. Add the new svg icons to the `src/icons` folder.
4. Update the manifest json file in `src/icons/manifest.json` with the new icons.
5. export BUCKET_ACCESS_KEY_ID and BUCKET_SECRET_ACCESS_KEY environment variables with the AWS credentials.
You can find the credentials here: https://us-east-1.console.aws.amazon.com/secretsmanager/secret?name=VividGHAUAccessKey&region=us-east-1
6. Run the following command to generate the icons:

```
npm run build
```

7. Open figma and run the `Vivid icons builder` plugin. 
You can find the plugin here: https://www.figma.com/community/plugin/1354446799950687095

8. Press the `Add Icons to Figma` button to generate the icons. 
The plugin will generate the icons from the latest version of the icons and add them to the Figma file.