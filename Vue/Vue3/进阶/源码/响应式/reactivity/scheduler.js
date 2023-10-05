const cbs = [];
export function queuePostFlushCb(cb) {
	cbs.push(cb);
	queueFlush();
}

let isFlushPending = false;
async function queueFlush() {
	// console.log('queueFlush', isFlushPending)
	if (!isFlushPending) {
		isFlushPending = true;
		await Promise.resolve();
		let _cbs = [...new Set(cbs)];
		for (let cb of _cbs) {
			cb();
		}
		cbs.length = 0;
		isFlushPending = false;
	}
}
