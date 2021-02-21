/*
 * @Date: 2021-02-21 19:23:35
 * @LastEditors: lisonge
 * @Author: lisonge
 * @LastEditTime: 2021-02-21 19:24:37
 */

import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  entry: './src/index.ts',
  devtool: false,
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  // ignoreWarnings: [/(Critical dependency)/],
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.json', '.ts'],
  },
  externals: [],
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
  },
  plugins: [new CleanWebpackPlugin()],
} as Configuration;
