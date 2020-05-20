const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    // 다른 모듈을 사용하고 있는 최상위 자바스크립트 파일
    entry:"./src/index.ts",
    
    output:{
        filename:"bundle.js",
        // output 설정은 항상 프로젝트 내부라는 보장이 없기에 절대경로를 사용함
        path:path.resolve(__dirname,"dist")
    },
    devtool:'source-map',
    devServer:{
        contentBase:"./dist",
        open:true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module:{
        rules:[
            {
                test:/.tsx?$/,
                use:['ts-loader']
            },
            {
                test:/.css$/,
                use:['style-loader',"css-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"src/index.html"),
            inject:false,
            filename:path.resolve(__dirname,"dist/index.html"),
        })

    ]
}
