const v8 = require("v8");
const heapSpace = v8.getHeapSpaceStatistics();
// padEnd 填充字符串到指定的长度
function format(size) {
	return `${(size / 1024 / 1024).toFixed(2)}M`.padEnd(10, " ");
}
console.log(
	`${"空间名称".padEnd(
		17,
		" "
	)} 空间大小 已用空间大小 可用空间大小 物理空间大小`
);
for (let i = 0; i < heapSpace.length; i++) {
	const space = heapSpace[i];
	console.log(
		`${space.space_name.padEnd(23, " ")}`,
		`${format(space.space_size)}`,
		`${format(space.space_used_size)}`,
		`${format(space.space_available_size)}`,
		`${format(space.physical_space_size)}`
	);
}

/* 
  优化
  1. 使用完变量后重置值为null
  2. 当在界面中移除DOM节点时，还要移除相应的节点引用
  3. 清除定时器
  4. 清理 console.log()
  5. 通过原型新增方法
*/
