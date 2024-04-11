const path = require('path');
const { uploadFolderToS3 } = require('./s3Uploader');

module.exports = () => ({
  mode: 'production',
  devtool: false,
  entry: {
    index: './index.ts',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] }
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // Define the file types to handle
        use: [
          {
            loader: 'file-loader', // Use file-loader for handling files
            options: {
              outputPath: 'icons', // Specify the output directory for images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Include .d.ts extension
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js' // The output file name,
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeRun.tap('UploadFolderToS3', () => {
          console.log('Uploading to S3...');
        });
        compiler.hooks.afterEmit.tap('UploadFolderToS3', () => {
          uploadFolderToS3();
        });
        compiler.hooks.done.tap('UploadFolderToS3', () => {
          console.log('Upload to S3 complete');
        });
      }
    }
  ]
});