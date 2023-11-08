import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
function Signup() {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [msg,setMsg]=useState("")
  async function submitData(){
    try {
      const data = await axios.post("http://localhost:8000/signup",{
        name,
        email,
        password
      })
      console.log(data);
      if(!data.data.result){
        setMsg(data.data.msg)
      }else{
        window.location.replace("/login")
      }

    } catch (error) {
      console.log(error);
    }
   

  }
    return (
      <div className="auth-wrapper">
      <div className="auth-inner">
      <form>
        <h3>Sign Up</h3>
        <p style={{color:"red"}} className='text-center'>{msg}</p>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            onChange={e=>{setName(e.target.value)}}
          />
        </div>
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
            <Link to="/login">
            Already have an account
            </Link>
          
        </p>
      </form>
      </div>
      </div>
    )
 
    }
    export default Signup