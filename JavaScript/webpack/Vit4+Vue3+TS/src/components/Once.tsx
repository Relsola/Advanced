// jsx组件中自动跳过生命周期，即jsx中没有生命周期，在父组件onBeforeMount后执行
const msg = ref("JSX");

export default (props: any, context: any) => {
  console.log(props);
  console.log(msg);

  const onClick = () => {
    context.emit('update');
    msg.value = msg.value === "JSX" ? "TSX" : "JSX"
  };

  return (
    <>
      <h1>  {msg.value}  </h1>
      <button style={{ fontSize: 12, color: '#999' }} onClick={() => onClick()}>
        我是jsx函数组件{props.text}
      </button>
    </>
  );
};
