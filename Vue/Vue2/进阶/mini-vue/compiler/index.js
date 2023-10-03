import { parse } from "./parse.js";
import { codegen } from "./codegen.js";

// 把模版编译成render函数
export function compileToFunctions(template) {
	// 1.把html代码转成ast语法树
	const ast = parse(template);

	// 2.优化静态节点
	// optimize(ast, options);

	// 3.通过ast 重新生成代码
	const code = codegen(ast);
	// 使用with语法改变作用域为this 方便render函数code里面的变量取值
	return new Function(`with(this){return ${code}}`);
}
