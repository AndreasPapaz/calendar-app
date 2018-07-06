module.exports = {
  entry: './app/app.js',
  output: {
    filename: 'public/bungle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/m
        include: /app/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
