const path = require('path')

module.exports = {
    entry: {
        start_screen: './screen/start_screen/renderer.js',
        // video_screen: './src/screen/video_screen/renderer.js',
        // test_screen: './src/screen/test_screen/renderer.js',
    },
    output: {
        // filename: '[name].[contenthash].bundle.js',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production'
}