const today = new Date();

// Intl.DateTimeFormat 用于处理日期和时间的国际化格式化
const formatDate = date => new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
).format(date);

export default () => <h1>To Do List for {formatDate(today)}</h1>