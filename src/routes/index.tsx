import{ Route, Routes } from 'react-router-dom'
import App from '../page/App'

export default function PageRouter(){
    return(
     <Routes>
             <Route path="/" element={<App />} />
        <Route path="/about" element={<App />} />
           </Routes>
    )
}