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

// 代表根节点 和 当前父节点
let root = null,
	currentParent;
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
	if (currentParent) {
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
	text = text.replace(/&nbsp;/g, " ");
	if (text !== "")
		currentParent.children.push({
			type: TEXT_TYPE,
			text
		});
}

// 解析标签生成ast核心
export function parse(html) {
	root = null;
	currentParent = undefined;
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
			if (end) advance(end[0].length);

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
