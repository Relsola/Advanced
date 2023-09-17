import { createContext, useContext, useState } from "react";
// useContext 是一种无需通过组件传递 props 而可以直接在组件树中传递数据的技术
// useMemo 会从函数调用中创建/重新访问记忆化值，只有在第二个参数中传入的依赖项发生变化时，才会重新运行该函数

const ThemeContext = createContext('system');
const useGetTheme = () => useContext(ThemeContext);

const MyComponent = () => {
    const theme = useGetTheme();
    return <p>当前主题:{theme}</p>
};


const Theme = () => {
    // useContext 和 useState 动态使用
    const [theme, setTheme] = useState('light');
    const handle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={handle}>切换主题</button>
            <MyComponent />
        </ThemeContext.Provider>
    )
};


const LevelContext = createContext(0);

const Heading = ({ children }) => {
    const level = useContext(LevelContext);
    const HeadingTag = `h${level}`;
    return <HeadingTag>{children}</HeadingTag>
}

const Section = ({ children }) => {
    const level = useContext(LevelContext) + 1;
    return (
        <section>
            <LevelContext.Provider value={level}>
                {children}
            </LevelContext.Provider>
        </section>
    )
}

const Page = () => (
    <Section>
        <Heading>大标题</Heading>
        <Section>
            <Heading>一级标题</Heading>
            <Heading>一级标题</Heading>
            <Section>
                <Heading>二级标题</Heading>
                <Heading>二级标题</Heading>
                <Section>
                    <Heading>三级标题</Heading>
                    <Heading>三级标题</Heading>
                </Section>
            </Section>
        </Section>
    </Section>
)

export default Page 