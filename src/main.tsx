import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ReactQueryWrapper from "@/lib/intagrations/react-query/ReactQueryWrapper.tsx";

createRoot(document.getElementById('root')!).render(
    <ReactQueryWrapper>
        <App/>
    </ReactQueryWrapper>
)
