import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import env from '../../enviroinment'
import {useNavigate} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';

function Login() {
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")
  let navigate = useNavigate()

  let handleLogin = async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/login`,{
      email,
      password
    })
    if(res.data.statusCode===200)
    {
        setToggle(false)
       sessionStorage.setItem('token',res.data.token)
       sessionStorage.setItem('role',res.data.role)
       sessionStorage.setItem('userId',res.data.userId)
       if(res.data.role==="admin")
          navigate('/dashboard')
       else
          navigate('/user-menu')   
    }
    else
    {
      setToggle(false)
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
        setEmail("")
        setPassword("")
      },3000)

    }
  }
  return <>
    <div className="login-wrapper">
      <h1>Welcome to App</h1>
      <p>Login to Continue</p>
    </div>
    <div className='login-main-wrapper'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={()=>handleLogin()}>
          Submit
        </Button>
      </Form>
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>  
  </>
}

export default Login