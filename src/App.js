import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import Comments from './pages/Comments/Comments';
import NotFound from './pages/NotFound/NotFound';
import RedirectUser from './pages/Redirect/RedirectUser';
import Private from './Components/PrivateRoute/PrivateRoute';
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Swal from 'sweetalert2';
import './App.css';

const token = localStorage.getItem("token");

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const onAlert = (iconError, titleError) => {
  Toast.fire({
    icon: iconError,
    title: titleError
  })
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onAlert={onAlert} />} />
        <Route path="/redirect" element={<RedirectUser />} />

        <Route path="/admin" element={<Private role="admin"><Admin onAlert={onAlert} token={token} /></Private>} />
        <Route path="/admin/edit" element={<Private role="admin"><Admin onAlert={onAlert} token={token} /></Private>} />
        <Route path="/user" element={<Private role="user"> <User onAlert={onAlert} token={token} /> </Private>} />
        <Route path="/user/favorite" element={<Private role="user"> <User onAlert={onAlert} token={token} /> </Private>} />
        <Route path="/user/search" element={<Private role="user"> <User onAlert={onAlert} token={token} /> </Private>} />
        <Route path="/user/comment" element={<Private role="user"> <User onAlert={onAlert} token={token} /> </Private>} />
        <Route path="/user/comments/:id" element={<Private role="user"> <Comments onAlert={onAlert} token={token} /> </Private>} />
        <Route path="/admin/comments/:id" element={<Private role="admin"> <Comments onAlert={onAlert} token={token} /> </Private>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;