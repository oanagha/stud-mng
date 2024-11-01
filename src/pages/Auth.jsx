import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { registerApi,loginApi } from '../services/allApi';
function Auth() {
    const [authStatus, setAuthStatus] = useState(false)
    const changeStatus = () => {
        setAuthStatus(!authStatus)}
     


        const nav=useNavigate()
    const [user,setUser]=useState({
        email:"",username:"",password:""
    })
    const handleRegister=async()=>{
        console.log(user);
        const {email,username,password}=user
        if(!email || !username ||!password){
            toast.warning("Enter valid inpts")
        }else{
           const res=await registerApi(user) 
           console.log(res);
               if(res.status==200){
                toast.success("Registered Successfully")
                changeStatus()
                setUser({
                    email:"",username:"",password:""
                })
               }else{
                toast.error("Registration Failed")
               }
        }
        
    } 
  const handleLogin=async()=>{
    const {email,password}=user
    if(!email || !password){
        toast.warning("Enter valid inputs")
    }else{
        const res=await loginApi({email,password})
        if(res.status==200){
            console.log(res);
            toast.success("Login Successfull")
            sessionStorage.setItem("token",res.data.token)
            sessionStorage.setItem("uname",res.data.username)
            setUser({
                email:"",password:""
            })
            nav('/dash')
        } 
        else{
            toast.error("Login Failed")
            console.log(res);
            
        }
    }
  }

  return (
    <>
     <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh',backgroundColor:'wheat' }}>
                <div className='w-75 border bg-light shadow p-4 row '>
                    <div className="col ">
                        {
                            authStatus ?
                                <img src="https://cdni.iconscout.com/illustration/premium/thumb/girl-doing-bank-account-registration-illustration-download-in-svg-png-gif-file-formats--online-banking-application-process-apps-pack-business-illustrations-8762991.png?f=webp" alt="" className='img-fluid' />
                                :
                                <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-profile-illustration-download-in-svg-png-gif-file-formats--account-media-online-male-swift-pack-people-illustrations-4504662.png" alt="" className='img-fluid' />

                        }
                    </div>
                    <div className="col ">
                        {
                            authStatus ?
                                <h2 className='text-center align-items-center text-dark'> User Registeration</h2>
                                :
                                <h2 className='text-center text-dark'>LOGIN HERE</h2>
                        }
                        <div className="my-3 ">
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com " value={user.email}  onChange={(e)=>{setUser({...user,email:e.target.value})}} />
                            </FloatingLabel>
                            {
                                authStatus &&
                                <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3" >
                                    <Form.Control type="text" placeholder="enter username" value={user.username}  onChange={(e)=>{setUser({...user,username:e.target.value})}} />
                                </FloatingLabel>
                            }

                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" value={user.password}  onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
                            </FloatingLabel>
                            <div className='mt-5 d-flex justify-content-between'>

                                {
                                    authStatus ?
                                        <button className="btn btn-primary" onClick={handleRegister} >Register</button>
                                        :
                                        <button className='btn btn-primary' onClick={handleLogin} >Login</button>
                                }
                                <button className="btn btn-link text-dark" onClick={changeStatus}>
                                    {
                                        authStatus ?
                                            <>Already a User?</>
                                            :
                                            <>New user?</>
                                    }
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default Auth