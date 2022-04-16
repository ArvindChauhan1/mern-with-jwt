import { Routes, Route, Link } from "react-router-dom";

import LoginPage from './auth/LoginPage'
import { PrivateRoute } from './_component/PrivateRoute'


import Homepage from "./pages/Homepage";
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { useAuth } from "./auth/use-auth";

function App() {
  const auth = useAuth()

  const handleLogout = () => {
    auth.signout()
  }

  return (
    <>
      <div className="bg-indigo-600 text-sm sm:text-base font-medium text-white tracking-wider">
        <span>
          {auth.user ? <Link to='./'>
            <span className="inline-block p-4 hover:bg-indigo-700 cursor-pointer">
              Home
            </span>
          </Link> : ""}
          {auth.user ? <Link to='/profile'>
            <span className="inline-block p-4 hover:bg-indigo-700 cursor-pointer">
              Profile
            </span>
          </Link> : ""}

          {!auth.user ? <Link to='/login'>
            <span className="inline-block p-4 hover:bg-indigo-700 cursor-pointer">
              Login
            </span>
          </Link> : ""}
        </span>
        <span className="inline-block float-right ">
          {auth.user ?
            <span className="inline-block p-2 m-2 cursor-pointer hover:bg-indigo-700" onClick={handleLogout}>
              Logout
            </span>
            :
            <Link to='/register'>
              <span className="inline-block p-2 m-2 cursor-pointer hover:bg-indigo-700" onClick={handleLogout}>
                Register
              </span>
            </Link>
          }
        </span>
      </div>
      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
