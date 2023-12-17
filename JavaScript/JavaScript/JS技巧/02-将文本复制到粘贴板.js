/* 
  检查 Clipboard.writeText() API 是否可用
  将给定的值写入剪切板并返回一个 Promise
  如果剪贴板 API 不可用，则使用 document.execCommand() API 复制到剪贴板
  注意 document.execCommand 有弃用的风险

*/

/**
 * @description  将文本复制到粘贴板
 * @param {string} str 需要复制的字符串
 * @return {Promise<void | string>} 返回一个显式操作结果的 Promise
 */
function copyToClipboard(str) {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
		return navigator.clipboard.writeText(str);
	} else {
		const el = document.createElement('input');
		el.value = str;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		const selected =
			document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
		el.select();
		const flag = document.execCommand('copy');
		document.body.removeChild(el);
		if (selected) {
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(selected);
		}
		return flag ? Promise.resolve('success') : Promise.reject('failure');
	}
}
