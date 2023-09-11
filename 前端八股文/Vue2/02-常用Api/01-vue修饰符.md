- 修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

### .native 监听子组件根元素的原生事件
- 从Vue 2.0 开始，在组件上使用 v-on 只会监听自定义事件 (组件用 $emit 触发的事件)。如果要监听根元素的原生事件，可以使用 .native 修饰符，比如：

- <my-component v-on:click.native="doSomething"></my-component>

- 即 默认情况下，传递给带有 v-on 的组件的事件监听器只有通过 this.$emit 才能触发。要将原生 DOM 监听器添加到子组件的根元素中，可以使用 .native 修饰符。


## 事件修饰符
### .stop 阻止事件继续向上冒泡传播

- <!-- 阻止单击事件继续向上冒泡传播 -->
- <div @click.stop="doThis"></div>


### .prevent 阻止元素默认行为的执行

- <!-- template -->
- <a href="wwww.baidu.com" @click.prevent="log('点击了a标签')">baidu</a>

- <!-- 提交事件不再重载页面 -->
- <form v-on:submit.prevent="onSubmit"></form>


### .capture 添加事件监听器时使用事件捕获模式

- <!-- 添加事件监听器时使用事件捕获模式 -->
- <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
- <div v-on:click.capture="doThis">...</div>


### .once 事件将只会触发一次

- <!-- 点击事件将只会触发一次 -->
- <a v-on:click.once="doThis"></a>

## 表单输入绑定 v-model 的修饰符

### .lazy
- 在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：
- <!-- 在“change”时而非“input”时更新 -->
- <input v-model.lazy="msg">

### .number
- 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
- <input v-model.number="age" type="number">
- 这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也可能会返回字符串。 - 、+ 、 e 都可以输入。

### .trim
- 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：
- <input v-model.trim="msg">