// 匹配标签名
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;

// 匹配特殊标签
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

// 匹配 <xxx  开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`);

// 匹配开始标签结束  >
const startTagClose = /^\s*(\/?)>/;

// 匹配 </xxxx>  结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

// 匹配属性  如 id="app"
const attribute =
	/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;

// 匹配花括号 {{  }} 捕获花括号里面的内容
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// 代表根节点 和 当前父节点
let root = null,
	currentParent = null;
// 栈结构 先进后出 来表示开始和结束标签
const stack = [];
// 标识元素和文本type
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

// 生成ast方法
function createASTElement(tagName, attrs) {
	return {
		tag: tagName, // 标签名
		type: ELEMENT_TYPE, // 类型
		children: [],
		attrs, // 属性
		parent: null
	};
}

// 对开始标签进行处理
function start({ tagName, attrs }) {
	const element = createASTElement(tagName, attrs);
	root = root ?? element;
	// 建立parent和children关系
	if (currentParent !== null) {
		// 只赋予了parent属性
		element.parent = currentParent;
		// 还需要让父亲记住自己
		currentParent.children.push(element);
	}
	currentParent = element;
	stack.push(element);
}

// 对结束标签进行处理
function end() {
	// 栈结构 当遇到第一个结束标签时 会匹配到栈顶元素对应的ast 并取出来
	stack.pop();
	// 当前父元素就是栈顶的上一个元素
	currentParent = stack.at(-1);
}

// 对文本进行处理
function chars(text) {
	// 去掉空格
	text = text.replace(/\s/g, "");
	if (text !== "") {
		currentParent.children.push({
			type: TEXT_TYPE,
			text
		});
	}
}

function parseHTML(html) {
	while (html) {
		// 查找 <
		const textEnd = html.indexOf("<");
		// 如果textEnd = 0 说明是一个开始标签或者结束标签
		// 如果textEnd > 0 说明就是文本的结束位置

		// 匹配开始标签 <xxx
		if (textEnd === 0) {
			// 如果开始标签解析有结果
			const startTagMatch = parseStartTag();
			if (startTagMatch) {
				// 把解析好的标签名和属性解析生成ast
				start(startTagMatch);
				continue;
			}

			// 匹配结束标签 </
			const endTagMatch = html.match(endTag);
			if (endTagMatch !== null) {
				advance(endTagMatch[0].length);
				end(endTagMatch[1]);
				continue;
			}
		}

		if (textEnd > 0) {
			// 获取文本
			const text = html.substring(0, textEnd);
			if (text !== "") {
				advance(text.length);
				chars(text);
			}
		}
	}

	// 匹配开始标签
	function parseStartTag() {
		const start = html.match(startTagOpen);

		if (start) {
			const match = {
				// 标签名
				tagName: start[1],
				attrs: []
			};
			//匹配到了开始标签 就截取掉
			advance(start[0].length);

			// 匹配属性 如果不是开始标签的结束 就一直匹配下去
			let end, attr;
			while (
				!(end = html.match(startTagClose)) &&
				(attr = html.match(attribute))
			) {
				advance(attr[0].length);
				match.attrs.push({
					name: attr[1],
					//这里是因为正则捕获支持双引号 单引号 和无引号的属性值
					value: attr[3] || attr[4] || attr[5] || true
				});
			}

			// 如果不是开始标签的结束
			if (end) {
				advance(end[0].length);
			}
			return match;
		}
		return false;
	}

	// 截取html字符串 每次匹配到了就往前继续匹配
	function advance(n) {
		html = html.substring(n);
	}
	// 返回生成的ast
	return root;
}

function genChildren(node) {
	// 判断节点类型
	// 源码这块包含了复杂的处理  比如 v-once v-for v-if 自定义指令 slot 等等
	// 这里只考虑普通文本和变量表达式 {{ }} 的处理

	// 如果是元素类型
	if (node.type == 1) {
		// 递归创建
		return codegenChildren(node);
	} else {
		// 如果是文本节点
		const text = node.text;

		// 不存在花括号变量表达式
		if (!defaultTagRE.test(text))
			return `_v(${JSON.stringify(text)})`;

		// 正则是全局模式 每次需要重置正则的lastIndex属性  不然会引发匹配bug
		let lastIndex = (defaultTagRE.lastIndex = 0);
		const tokens = [];
		let match, index;

		while ((match = defaultTagRE.exec(text))) {
			// index代表匹配到的位置
			index = match.index;
			if (index > lastIndex) {
				// 匹配到 '{{ }}' 在tokens里面放入普通文本
				tokens.push(
					JSON.stringify(text.slice(lastIndex, index))
				);
			}
			// 放入捕获到的变量内容
			tokens.push(`_s(${match[1].trim()})`);
			// 匹配指针后移
			lastIndex = index + match[0].length;
		}
		// 如果匹配完了花括号  text里面还有剩余的普通文本 那么继续push
		if (lastIndex < text.length) {
			tokens.push(JSON.stringify(text.slice(lastIndex)));
		}
		// _v表示创建文本
		return `_v(${tokens.join("+")})`;
	}
}

// 处理attrs属性
function genChildrenProps(attrs) {
	let str = "";
	for (let i = 0; i < attrs.length; i++) {
		let attr = attrs[i];
		// 对attrs属性里面的style做特殊处理
		if (attr.name === "style") {
			let obj = {};
			attr.value.split(";").forEach(item => {
				let [key, value] = item.split(":");
				obj[key] = value;
			});
			attr.value = obj;
		}
		str += `${attr.name}:${JSON.stringify(attr.value)},`;
	}
	return `{${str.slice(0, -1)}}`;
}

// 生成子节点 调用genChildren函数进行递归创建
function getChildren(el) {
	const children = el.children;
	if (children.length !== 0)
		return `${children.map(c => genChildren(c)).join(",")}`;
}

// 递归创建生成code
function codegenChildren(el) {
	const children = getChildren(el);
	const code = `_c('${el.tag}',${
		el.attrs.length
			? `${genChildrenProps(el.attrs)}`
			: "undefined"
	}${children ? `,${children}` : ""})`;
	return code;
}

function compileToFunctions(template) {
	// 1.解析模版template生成 AST语法树
	// ast用来描述代码本身形成树结构 不仅可以描述html 也能描述css以及js语法
	const ast = parseHTML(template);

	// 2.优化AST语法树，标记静态节点
	// optimize(ast);

	// 3.把优化后的 AST语法树转换生成render方法代码字符串，利用模板引擎生成可执行的
	const code = codegenChildren(ast);
	console.log(code);
	// 使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
	const render = new Function(`with(this){return ${code}}`);
	return render;
}

const template = `<div id="app" class="active"><h1 id="h">{{ num }}</h1><button id="add"> +1 </button><button id="reduce"> -1 </button></div>`;

console.log(template);
compileToFunctions(template);
