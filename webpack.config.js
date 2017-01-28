module.exports = {
    entry: './test/bundle/bundle.test.js',
    output: {
        path: './bin/test',
        filename: 'test.mentionify.bundle.js'
    },
    module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
};
