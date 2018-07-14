module.exports = {
  entry: "./app/App.js",
  output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  devtool: "source-map",
  module: {
      rules: [
        {
          test: /\.js$/,
          include: /app/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["es2015", "stage-0", "react"]
          }
        }
      ]
  }
};
