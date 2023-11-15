// react应用入口页面
import { createRoot } from 'react-dom/client';
import App from './App';
import fn from "@/components/index"

console.log(fn());

const root = document.getElementById('root');
if (root !== null) { createRoot(root).render(<App />) }