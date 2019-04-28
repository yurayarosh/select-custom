import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: "src/index.js",
	format: "cjs",
	plugins: [
		resolve(),
		babel({
			exclude: "node_modules/**" // only transpile our source code
		})
	],
	dest: "index.js" // equivalent to --output
};
