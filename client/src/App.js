import Login from './Components/Login';
import Signup from './Components/Signup';
import Homepage from './Components/Homepage';
import Singleview from './Components/Singleview';
import React from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Redux/userSlice';
import Dashboard from './Components/Dashboard';


function App() {
 const currentUser = useSelector(state=>state.user.user);
  const dispatch = useDispatch()
  function userlogout(){
    dispatch(logout())
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {
                  currentUser && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                      </li>
                      <li className="nav-item nav-link" onClick={userlogout}>
                        Logout
                      </li>
                    </>
                  )
                }

                {
                  !currentUser && (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                      </li>
                    </>

                  )
                }

              </ul>
             

            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={currentUser ? <Homepage /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Homepage /> : <Signup />} />
          <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Login />} />
          <Route path="/singleview/:id" element={currentUser ? <Singleview /> : <Login />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App