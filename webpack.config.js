const path = require("path")

module.exports = {
	mode: "development",
	entry: {
		index: "./src/index.js",
		auth: "./src/auth.js"
	},
	output: {
		path: path.resolve(__dirname, "public/lib"),
		filename: "[name].js"
	}
}
