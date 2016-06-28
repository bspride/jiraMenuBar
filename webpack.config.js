const path = require('path')

const PATHS = {
  src: path.join( __dirname, 'src/client/index.ts'),
  build: path.join( __dirname, 'build')
}

const config = {
  entry: {
    app: PATHS.src 
  },
  module: {
    loaders: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loaders: ['ts', 'angular2-template-loader']
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader?attrs=false'
    }
    ]    
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.html'],
    modulesDirectories: ['src', 'node_modules']
  },
  target: 'electron'
}

module.exports = config
