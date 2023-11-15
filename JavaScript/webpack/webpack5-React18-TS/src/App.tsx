import { useState, lazy, Suspense, } from 'react';
/* 
  资源懒加载
  可以有效提升首屏加载速度
  使用import语法配合react的Lazy动态引入资源
*/
const LazyDemo = lazy(() => import('@/components/LazyDemo'));

import smallImg from '@/assets/imgs/5kb.webp';
import bigImg from '@/assets/imgs/22kb.webp'


/* 
  资源预加载
  页面初始化时预加载了组件资源,但是不执行里面的代码
  需要时从预加载的资源中直接取出来执行,不用再从服务器请求,节省了很多时间。
 */
// prefetch
const PreFetchDemo = lazy(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /*webpackPrefetch: true*/ // 开启prefetch预获取
    '@/components/PreFetchDemo'
))
// preload
const PreloadDemo = lazy(() => import(
    /* webpackChunkName: "PreloadDemo" */
    /*webpackPreload: true*/ // 开启preload预获取
    '@/components/PreloadDemo'
))

function App() {
    const [count, setCounts] = useState('');
    const [show, setShow] = useState(false);

    const onChange = (e: any) => {
        setCounts(e.target.value)
    };

    // 点击事件中动态引入css, 设置show为true
    const onClick = () => {
        import('@/style.css');
        import('@/style.less');
        setShow(true);
    }

    return <>
        <h2>webpack5-react-ts</h2>

        <img src={smallImg} alt="小于10kb的图片" />
        <img src={bigImg} alt="大于于10kb的图片" />

        <p>受控组件</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件</p>
        <input type="text" />

        <h2 onClick={onClick}>展示</h2>
        {/* show为true时加载LazyDemo组件 */}
        {show && <Suspense fallback={null}><LazyDemo /></Suspense>}

        {show && (
            <>
                <Suspense fallback={null}><PreloadDemo /></Suspense>
                <Suspense fallback={null}><PreFetchDemo /></Suspense>
            </>
        )}
    </>
}
export default App
