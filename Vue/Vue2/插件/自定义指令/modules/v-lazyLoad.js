// 实现一个图片懒加载指令，只加载浏览器可见区域的图片。

//在assets静态文件夹下放入默认图
import defaultGif from "@/assets/default.gif";

let imgsInf = []; //存储尚未加载的图片信息

//调用该函数 用于加载单张图片
function loadingImg(imgDOM) {
    //获得该img元素的src信息
    let imgSrc = imgsInf.filter((imgInf) => imgInf.dom === imgDOM)[0].src;
    const tempImg = new Image(); //新建Image对象实例

    //改写onload事件
    tempImg.onload = function () {
        // 当图片加载完成之后 替换img元素的src属性
        imgDOM.src = imgSrc;
    };

    tempImg.src = imgSrc; //Image实例代替加载
    imgsInf = imgsInf.filter((imgInf) => imgInf.dom !== imgDOM); //将已加载好的图片进行删除
}

//io 为 IntersectionObserver对象 - 由IntersectionObserver()构造器创建
const io = new IntersectionObserver((entries) => {
    //entries 为 IntersectionObserverEntry对像数组
    entries.forEach((item) => {
        //item为 IntersectionObserverEntry 对象

        // isIntersecting是一个Boolean值，判断目标元素当前是否可见
        if (item.isIntersecting) {
            //img元素可见时
            loadingImg(item.target); //加载该img元素
            io.unobserve(item.target); //图片加载完后即停止监听该元素
        }
    });
});
//不传options参数
//默认根元素(root属性)为浏览器视口、
//默认阈值(threshold属性)为 0，表示目标元素刚进入根元素可见范围时触发回调函数


const lazyLoad = {
    inserted(el, { value }) {
        //刚插入父节点时
        el.src = defaultGif; // 先暂时使用默认图片的src
        io.observe(el); //开始监听该img元素
        const imgInf = {
            dom: el, //img 元素DOM节点
            src: value, //img的真正src信息
        };
        imgsInf.push(imgInf); //存储img元素的src信息
    },
    
    unbind(el) {
        //某个img元素解绑时 清除该img元素的信息 并停止监听该img元素
        io.unobserve(el); //停止监听
        imgsInf = imgsInf.filter((imgInf) => imgInf.dom !== el); //清除存储信息
    }
}

export default lazyLoad