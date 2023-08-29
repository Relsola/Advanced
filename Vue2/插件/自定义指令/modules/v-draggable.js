// 实现一个拖拽指令，可在页面可视区域任意拖拽元素。

const draggable = {
    inserted: function (el) {
        el.style.cursor = "pointer";
        if (el.style.position !== "fixed" && el.style.position !== "absolute")
            throw new Error("Element position must 'fixed' or 'absolute'")

        // 控制拖拽范围
        const parent = el.offsetParent; // 获取相对定位父元素
        const maxX = parent.clientWidth - el.offsetWidth;
        const maxY = parent.clientHeight - el.offsetHeight;


        el.onmousedown = function (e) {
            e.preventDefault(); // 阻止默认文本选择行为

            const startLeft = el.offsetLeft; // 保存初始位置
            const startTop = el.offsetTop;
            const disX = e.clientX - startLeft; // 使用初始位置作为参考
            const disY = e.clientY - startTop;


            const start = (e) => {
                let x = e.clientX - disX;
                let y = e.clientY - disY;

                if (x < 0) x = 0
                else if (x > maxX) x = maxX
                if (y < 0) y = 0
                else if (y > maxY) y = maxY

                el.style.left = `${x}px`
                el.style.top = `${y}px`
            }

            const end = () => {
                document.removeEventListener("mousemove", start);
                document.removeEventListener("mouseup", end);
            };

            document.addEventListener("mousemove", start);
            document.addEventListener("mouseup", end);
        }
    },
}
export default draggable