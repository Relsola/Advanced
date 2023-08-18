import { onBeforeUnmount, onMounted, reactive } from "vue";

// 获取鼠标当前点击位置
export default () => {

    const point = reactive({ x: 0, y: 0 })

    const savePoint = (event) => {
        point.x = event.pageX;
        point.y = event.pageY;
    }

    onMounted(() => {
        window.addEventListener("click", savePoint);
    });
    onBeforeUnmount(() => {
        window.removeEventListener("click", savePoint);
    });
    return point
}