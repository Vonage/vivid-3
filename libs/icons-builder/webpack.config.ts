import path from 'path';
import { uploadFolderToS3 } from './src/s3Uploader';

module.exports = () => ({
	mode: 'development',
	devtool: false,
	entry: {
		index: './src/index.ts',
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
		filename: 'dist/index.js',
	},
	plugins: [
		{
			apply: (compiler: any) => {
				compiler.hooks.afterEmit.tap('UploadFolderToS3', () => {
					uploadFolderToS3();
				});
			},
		},
	],
});
