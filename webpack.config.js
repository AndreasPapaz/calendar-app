// module.exports = {
//
//   // This code will be compiled
//   entry: "./app/index.js",
//
//   // Then output into this file
//   output: {
//     filename: "public/bundle.js"
//   },
//
//   // This will be what we do
//     module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         // only process files in app folder
//         include: /app/,
//         loader: 'babel-loader',
//         query: {
//           // transformations
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   }
// }


module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
