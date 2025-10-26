import{ Route, Routes } from 'react-router-dom'
import App from '../page/App'
import Signup from '../page/signup'
import Login from '../page/login'
import PrivateRoute from '../components/PrivateRoute'
import CommentSection from '../page/Comment'
import CommentDetailsPage from '../page/CommnetDetails'

export default function PageRouter(){
    return(
     <Routes>
             <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comments" element={<PrivateRoute><CommentSection/></PrivateRoute>} />
        <Route path="/comments/:id" element={<PrivateRoute><CommentDetailsPage/></PrivateRoute>} />
           </Routes>
    )
}