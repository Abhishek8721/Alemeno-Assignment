import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import { useDispatch } from 'react-redux'
import { loginFailure, loginSuccess } from '../Redux/userSlice'
axios.defaults.withCredentials = true
function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [msg,setMsg]=useState("")
  const dispatch = useDispatch()
  async function submitData(){
    try {
    
      const result = await axios.post("http://localhost:8000/login",{
        email,
        password
      })
      console.log(result);
      if(!result.data.result){
        setMsg(result.data.msg)
        dispatch(loginFailure())
      }
    dispatch(loginSuccess(result.data.data))

    } catch (error) {
      dispatch(loginFailure())
      console.log(error);
    }
   

  }
    return (
      <div className="auth-wrapper">
          <div className="auth-inner">
      <form>
        <h3>Sign In</h3>
        <p style={{color:"red"}} className='text-center'>{msg}</p>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e=>{setEmail(e.target.value)}}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e=>{setPassword(e.target.value)}}
          />
        </div>
        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={submitData}>
            Submit
          </button>
        </div>
        <p className="create-account text-center">
            <Link to="/signup">
            Create an account
            </Link>
          
        </p>
      </form>
      </div>
      </div>
    )
 
    }
    export default Login