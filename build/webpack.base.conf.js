const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
let args = process.argv;
let runEnv;
if(args.indexOf('--300') != -1) {
    runEnv = '300';
}else if(args.indexOf('--500') != -1) {
    runEnv = '500';
}else if(args.indexOf('--800') != -1) {
    runEnv = '800';
}

let dist = 'dist';
module.exports = {
    entry: ["babel-polyfill", `${__dirname}/../src/index.js`],
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'jshint-loader',
            //     enforce: 'pre'
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // 配置哪些引入路径按照模块方式查找
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    }
                }
            },
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'babel-loader',
                //排除node_modules 目录下的文件
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, // 处理图片
                use: [{
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ],
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '../src/index.html')
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          //共享进程池
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: true,
        }),
        new CopyWebpackPlugin([{
		    from: path.resolve(__dirname, '../src/static/favicon.ico'),
            to: path.resolve(__dirname, '../'+dist+'/static/'),
		}]),
        //  new CopyWebpackPlugin([{
		//     from: path.resolve(__dirname, '../gmoa-base/src/lib/lower-browser-help'),
        //     to: path.resolve(__dirname, '../'+dist+'/static/js/lower-browser-help'),
        // }]),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            'sub': '@/sub-projects/',
            'api': '@/api/',
            'components': '@/components/',
            'consts': '@/consts/',
            'pages': '@/pages/',
            'utils': '@/utils/',
            'static': '@/static/',
                                            //这行注释不要动1(webpack)start
 
            '@bi': 'sub/yc-bi/src/',
            'bi-api': '@bi/api/',
            'bi-components': '@bi/components/',
            'bi-pages': '@bi/pages/',
            'bi-static': '@bi/static/',
            'bi-utils': '@bi/utils/',
            'bi-consts': '@bi/consts/',
        
            '@jcptht': 'sub/yc-jcptht/src/',
            'jcptht-api': '@jcptht/api/',
            'jcptht-components': '@jcptht/components/',
            'jcptht-pages': '@jcptht/pages/',
            'jcptht-static': '@jcptht/static/',
            'jcptht-utils': '@jcptht/utils/',
            'jcptht-consts': '@jcptht/consts/',
        
            '@ttyy': 'sub/yc-ttyy/src/',
            'ttyy-api': '@ttyy/api/',
            'ttyy-components': '@ttyy/components/',
            'ttyy-pages': '@ttyy/pages/',
            'ttyy-static': '@ttyy/static/',
            'ttyy-utils': '@ttyy/utils/',
            'ttyy-consts': '@ttyy/consts/',
        
 //这行注释不要动1(webpack)end                                
        }
    }
};
