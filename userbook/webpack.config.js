var path = require("path");
var BUILD_PATH = "build";

module.exports = {
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, BUILD_PATH),
		filename: "bundle.js"
	},

	devtool: "source-map",

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			},
			{
				test: /\.css/,
				loaders: ["style-loader", "css-loader"]
			},
			{
				test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
				loader: "file-loader"
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
};