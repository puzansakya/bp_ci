// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//     entry: { server: './server/src/index.ts' },
//     resolve: { extensions: ['.js', '.ts'] },
//     target: 'node',
//     mode: 'production',
//     // this makes sure we include node_modules and other 3rd party libraries
//     externals: [/(node_modules|main\..*\.js)/, { knex: 'commonjs knex' }, 'swagger-jsdoc', 'swagger-ui-express'],
//     output: {
//         path: path.join(__dirname, 'dist'),
//         filename: '[name].js'
//     },
//     optimization: {
//         minimize: false
//     },
//     module: {
//         rules: [
//             { test: /\.ts$/, loader: 'ts-loader' }
//         ]
//     },
//     plugins: [
//         // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
//         // for "WARNING Critical dependency: the request of a dependency is an expression"
//         new webpack.ContextReplacementPlugin(
//             /(.+)?angular(\\|\/)core(.+)?/,
//             path.join(__dirname, 'src'), // location of your src
//             {} // a map of your routes
//         ),
//         new webpack.ContextReplacementPlugin(
//             /(.+)?express(\\|\/)(.+)?/,
//             path.join(__dirname, 'src'),
//             {}
//         )
//     ]
// }


// Work around for https://github.com/angular/angular-cli/issues/7200

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    server: './server/src/index.ts',
  },
  mode: 'none',
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  externals: [/(node_modules|main\..*\.js)/, 'knex', 'swagger-jsdoc', 'swagger-ui-express'],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        // include: [
        //   'server/**/*.ts'
        // ],
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
