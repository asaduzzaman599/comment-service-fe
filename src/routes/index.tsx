import{ Route, Routes } from 'react-router-dom'
import App from '../page/App'
import Signup from '../page/signup'
import Login from '../page/login'

export default function PageRouter(){
    return(
     <Routes>
             <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comments" element={<Login />} />
           </Routes>
    )
}