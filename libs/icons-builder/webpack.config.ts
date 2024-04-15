import path from 'path';
import webpack from 'webpack';
import { uploadFolderToS3 } from './src/s3Uploader';

const config: webpack.Configuration = {
	mode: 'development',
	devtool: false,
	entry: './src/index.ts',
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
		filename: 'index.js'
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
};

export default config;
