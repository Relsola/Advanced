/* 
  在每个动画帧 requestAnimationFrame() 上调用提供的回调函数
  返回一个具有 start 和 stop 方法的对象
  第二个参数控制是否需要显式调用 默认为 true
*/

/**
 * @description  录制动画帧
 * @param {Function} callback 执行的回调函数
 * @param {boolean} autoStart 是否立即执行，默认为 true
 * @return {{start:Function, stop:Function}} 一个具有 start 和 stop 方法的对象
 */
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = false,
    raf;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};

const cb = () => console.log('111');

const recorder = recordAnimationFrames(cb);

setTimeout(() => {
  recorder.stop();
}, 2000);

setTimeout(() => {
  recorder.start();
}, 2000);

const recorder2 = recordAnimationFrames(() => console.log('222'), false);
