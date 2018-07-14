module.exports = {
  entry: "./app/App.js",
  output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},

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
