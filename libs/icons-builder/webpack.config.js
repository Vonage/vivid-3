const path = require('path');
const { uploadFolderToS3 } = require('./s3Uploader');

module.exports = () => ({
	mode: 'development',
	devtool: false,
	entry: {
		index: './index.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	plugins: [
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('UploadFolderToS3', () => {
					uploadFolderToS3();
				});
			},
		},
	],
});
