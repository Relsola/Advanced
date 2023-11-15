/* 
  编写 Effect 需要遵循以下三个规则：
    1. 声明 Effect 默认情况下，Effect 会在每次渲染后都会执行
    2. 指定 Effect 依赖 大多数 Effect 应该按需执行，而不是在每次渲染后都执行
    3. 必要时添加清理（cleanup）函数。有时 Effect 需要指定如何停止、撤销，或者清除它的效果

  原则：如果这个逻辑是由某个特定的交互引起的，请将它保留在相应的事件处理函数中。如果是由用户在屏幕上 看到 组件时引起的，请将它保留在 Effect 中  

  摘要
    1. 与事件不同，Effect 是由渲染本身，而非特定交互引起的
    2. Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步
    3. 默认情况下，Effect 在每次渲染（包括初始渲染）后运行
    4. 如果 React 的所有依赖项都与上次渲染时的值相同，则将跳过本次 Effect
    5. 不能随意选择依赖项，它们是由 Effect 内部的代码决定的
    6. 空的依赖数组（[]）对应于组件“挂载”，即添加到屏幕上
    7. 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试
    8. 如果 Effect 因为重新挂载而中断，那么需要实现一个清理函数
    9. React 将在下次 Effect 运行之前以及卸载期间这两个时候调用清理函数
*/

import { useEffect, useState } from "react";

{
    // 一般来说，Effect 会在  每次 渲染后执行，而以下代码会陷入死循环中
    function Demo() {
        const [count, setCount] = useState(0);
        useEffect(() => {
            setCount(count + 1);
        });
    }
}

{

    function Demo() {
        const a = 1, b = 2;

        // 没有依赖数组作为第二个参数，与依赖数组位空数组 [] 的行为是不一致的
        useEffect(() => {
            // 这里的代码会在每次渲染后执行
        });

        useEffect(() => {
            // 这里的代码只会在组件挂载后执行
        }, []);

        useEffect(() => {
            //这里的代码只会在每次渲染后，并且 a 或 b 的值与上次渲染不一致时执行
        }, [a, b]);
    }
}

{
    /* 
      依赖数组中可以省略 ref

      因为 ref 具有 稳定 的标识
      React 保证 每轮渲染中调用 useRef 所产生的引用对象时，获取到的对象引用总是相同的
      即获取到的对象引用永远不会改变，所以它不会导致重新运行 Effect
      因此，依赖数组中是否包含它并不重要
    */
}

// 在开发环境中 Effect 执行两次 
function Playground() {
    const [text, setText] = useState('a');

    useEffect(() => {
        function onTimeout() { console.log('⏰ ' + text) }
        console.log('🔵 安排 "' + text + '" 日志');
        const timeoutId = setTimeout(onTimeout, 3000)

        // 需要输出清理函数清理操作
        return () => {
            console.log('🟡 取消 "' + text + '" 日志');
            clearTimeout(timeoutId);
        };
    }, [text])

    return (
        <>
            <label>
                日志内容：
                <input value={text} onChange={e => setText(e.target.value)} />
            </label>
            <h1>{text}</h1>
        </>
    )
};

function Console() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(!show)}>
                {show ? '卸载' : '挂载'} 组件
            </button>
            {show && <hr />}
            {show && <Playground />}
        </>
    )
};


export default Console;


/* 
  处理在开发环境中 Effect 执行两次
    1. 实现清理函数 清理函数应该停止或撤销 Effect 正在执行的任何操作

    2. 如果 Effect 将会获取数据，清理函数应该要么 中止该数据获取操作，要么忽略其结果

    3. Effect 中数据获取替代方案可以使用或构建客户端缓存 目前受欢迎的开源解决方案是 React Query、useSWR 和 React Router v6.4+

    4. 暂时取消 严格模式 及其仅在开发环境中重新加载检查

    5. 不要在 Effect 中执行购买商品一类的操作

*/

{
    // 初始化应用时不需要使用 Effect 的情形
    // 某些逻辑应该只在应用程序启动时运行一次。比如，验证登陆状态和加载本地程序数据。你可以将其放在组件之外

    if (typeof window !== 'undefined') { // 检查是否在浏览器中运行
        // ...
    }

    function App() {
        // ……
    }
}


/* 
  摘要
    1. 如果你可以在渲染期间计算某些内容，则不需要使用 Effect
    2. 想要缓存昂贵的计算，请使用 useMemo 而不是 useEffect
    3. 想要重置整个组件树的 state，请传入不同的 key
    4. 想要在 prop 变化时重置某些特定的 state，请在渲染期间处理
    5. 组件 显示 时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中
    6. 如果你需要更新多个组件的 state，最好在单个事件处理函数中处理
    7. 当你尝试在不同组件中同步 state 变量时，请考虑状态提升
    8. 你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免竞态条件

  检查 Effect 是否表示了独立的同步过程。如果 Effect 没有进行任何同步操作，可能是不必要的。如果它同时进行了几个独立的同步操作，将其拆分为多个 Effect

  如果想读取 props 或 state 的最新值，但又不想对其做出反应并重新同步 Effect，可以将 Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）

  避免将对象和函数作为依赖项。如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步
*/


/* 
  React组件生命周期
    1. 当组件被添加到屏幕上时，它会进行组件的 挂载
    2. 当组件接收到新的 props 或 state 时，通常是作为对交互的响应，它会进行组件的 更新
    3. 当组件从屏幕上移除时，它会进行组件的 卸载

  响应式Effect生命周期
    1. 每个 Effect 与周围组件有着独立的生命周期
    2. 每个 Effect 描述了一个独立的同步过程，可以 开始 和 停止
    3. 在编写和读取 Effect 时，要独立地考虑每个 Effect（如何开始和停止同步），而不是从组件的角度思考（如何挂载、更新或卸载）
    4. 在组件主体内声明的值是“响应式”的
    5. 响应式值应该重新进行同步 Effect，因为它们可以随着时间的推移而发生变化
    6. 检查工具验证在 Effect 内部使用的所有响应式值都被指定为依赖项
    7. 检查工具标记的所有错误都是合理的。总是有一种方法可以修复代码，同时不违反规则
*/


{
    // 当你不想进行重新同步时 可以通过向检查工具“证明”这些值不是响应式值
    function Demo() {
        useEffect(() => {
            const serverUrl = 'https://localhost:1234'; // serverUrl 不是响应式的
            const roomId = 'general'; // roomId 不是响应式的
            const connection = createConnection(serverUrl, roomId);
            connection.connect();
            return () => { connection.disconnect() };
        }, []); // ✅ 声明的所有依赖
        // ...
    }
}