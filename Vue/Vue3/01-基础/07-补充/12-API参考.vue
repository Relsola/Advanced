<!-- 全局API -->
<script>
// 应用实例
createApp(); // 创建一个应用实例。
createSSRApp(); // 以 SSR 激活模式创建一个应用实例。用法与 createApp() 完全相同。
app.mount(); // 将应用实例挂载在一个容器元素中。
app.unmount(); // 卸载一个已挂载的应用实例。
app.component();
app.directive();
app.use();
app.mixin();
app.provide();
app.runWithContext();
app.version;
app.config;
app.config.errorHandler;
app.config.warnHandler;
app.config.performance;
app.config.compilerOptions;
app.config.globalProperties;
app.config.optionMergeStrategies;


// 通用
version
nextTick()
defineComponent()
defineAsyncComponent()
defineCustomElement()
</script>


<!-- 组合式 API -->
<script>
setup()
基本使用
访问 Props
Setup 上下文
与渲染函数一起使用

// 响应式: 核心
ref()
computed()
reactive()
readonly()
watchEffect()
watchPostEffect()
watchSyncEffect()
watch()

// 响应式: 工具
isRef()
unref()
toRef()
toValue()
toRefs()
isProxy()
isReactive()
isReadonly()

// 响应式: 进阶
shallowRef()
triggerRef()
customRef()
shallowReactive()
shallowReadonly()
toRaw()
markRaw()
effectScope()
getCurrentScope()
onScopeDispose()

// 生命周期钩子
onMounted()
onUpdated()
onUnmounted()
onBeforeMount()
onBeforeUpdate()
onBeforeUnmount()
onErrorCaptured()
onRenderTracked()
onRenderTriggered()
onActivated()
onDeactivated()
onServerPrefetch()

// 依赖注入
provide()
inject()
</script>


<!-- 进阶 API -->
<script>
渲染函数
h()
mergeProps()
cloneVNode()
isVNode()
resolveComponent()
resolveDirective()
withDirectives()
withModifiers()
服务端渲染
renderToString()
renderToNodeStream()
pipeToNodeWritable()
renderToWebStream()
pipeToWebWritable()
renderToSimpleStream()
useSSRContext()
TypeScript 工具类型
PropType<T>
MaybeRef<T>
MaybeRefOrGetter<T>
ExtractPropTypes<T>
ExtractPublicPropTypes<T>
ComponentCustomProperties
ComponentCustomOptions
ComponentCustomProps
CSSProperties
自定义渲染
createRenderer()
</script>

<!-- 选项式 API -->
<script>
状态选项
data
props
computed
methods
watch
emits
expose
渲染选项
template
render
compilerOptions
slots
生命周期选项
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeUnmount
unmounted
errorCaptured
renderTracked
renderTriggered
activated
deactivated
serverPrefetch
组合选项
provide
inject
mixins
extends
其他杂项
name
inheritAttrs
components
directives
组件实例
$data
$props
$el
$options
$parent
$root
$slots
$refs
$attrs
$watch()
$emit()
$forceUpdate()
$nextTick()
</script>

<!-- 内置内容 -->
<script>
指令
v-text
v-html
v-show
v-if
v-else
v-else-if
v-for
v-on
v-bind
v-model
v-slot
v-pre
v-once
v-memo
v-cloak
// 组件
// <Transition>
// <TransitionGroup>
// <KeepAlive>
// <Teleport>
// <Suspense>
// 特殊元素
// <component>
// <slot>
// <template>
特殊 Attributes
key
ref
is
</script>


