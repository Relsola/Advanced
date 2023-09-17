import { useState } from "react";

export default () => {
  const [status, setStatus] = useState(false);

  // 在下次渲染前多次更新同一个 state
  const [number, setNumber] = useState(0);
  const numAdd3 = () => {
    /*
      告诉 React “用 state 值做某事”而不是仅仅替换它
      n => n + 1 被称为 更新函数
        React 会将此函数加入队列，在事件处理函数中的所有其他代码运行后进行处理
        在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state
    */
    setNumber(n => n + 1);
    // 在一个列队中，表示上一个列队里的number+1
    setNumber(n => n + 1);
    setNumber(n => n + 1);
  }

  // 简单demo
  const getFinalState = (baseState, queue) => {
    let finalState = baseState;
    queue.forEach(item => {
      finalState = item instanceof Function ? item(finalState) : item
    })
    return finalState;
  }

  /* 
    通常可以通过相应 state 变量的第一个字母来命名更新函数的参数
      setEnabled(e => !e);
      setLastName(ln => ln.reverse());
      setFriendCount(fc => fc * 2);
    将 state 视为只读的  state 更新一个对象时，需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象
    数组推荐使用 concat [...arr] filter slice map
    如果数组非常大，可能会成为性能问题，可以在 state 中使用 Set 对象
  */

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => { setStatus(!status) }}>
        {status ? 'true' : 'false'}
      </button>
      <button onClick={numAdd3}>+3</button>
    </>
  )
};

/* 
  构建 state 的原则
    1. 合并关联的 state。如果你总是同时更新两个或更多的 state 变量，请考虑将它们合并为一个单独的 state 变量。

    2. 避免互相矛盾的 state。当 state 结构中存在多个相互矛盾或“不一致”的 state 时，你就可能为此会留下隐患。应尽量避免这种情况。

    3. 避免冗余的 state。如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应将这些信息放入该组件的 state 中。

    4. 避免重复的 state。当同一数据在多个 state 变量之间或在多个嵌套对象中重复时，这会很难保持它们同步。应尽可能减少重复。

    5. 避免深度嵌套的 state。深度分层的 state 更新起来不是很方便。如果可能的话，最好以扁平化方式构建 state。

    6.按照惯例，prop 名称以 initial 或 default 开头，以阐明该 prop 的新值将被忽略，在 state 中镜像 props
*/

/* 
  Immer 是一个非常流行的库  --- 推荐
  它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程

  import { useImmer } from 'use-immer';

  const [person, updatePerson] = useImmer({
    name: 'Nike de Saint Phone',
    artwork: {
      title: 'Blue Anna',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  })

  updatePerson(draft => {
    draft.artwork.city = 'Lagos';
  })


  const [myList, updateMyList] = useImmer([
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true }
  ]);

  updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
*/
