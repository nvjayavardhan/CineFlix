import React from 'react'
import { useState  } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CineFlix from '../images/Screenshot_2024-02-08_212512.png'
import './Login.css'
function Login({log ,setlog}) {
    let navigate=useNavigate();
    let [user, setuser] = useState({ username: "", password: "" });
    let [mistakes,setmistakes]=useState("");
    let [flag,setflag]=useState(0);
    const { register,handleSubmit,watch,formState: { errors },} = useForm()
    const onChange= (event)=>{
        setflag(0);
        setuser({...user,[event.target.name]:event.target.value})
        console.log(user)
    }
    const handleChange = async()=>{
        console.log(user);
        const response=await fetch("http://localhost:5000/api/loginuser",{
        method : 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({password:user.password,username:user.username})}
        );
        const result=await response.json()
        console.log(result)
        if(result.errors!=""){
        setmistakes(result.errors);
        setflag(1);}
        if(result.success===true)
        {
            localStorage.setItem("AuthToken",result.AuthToken);
            localStorage.setItem("Username",user.username);
            console.log(localStorage.AuthToken);
            setlog(1);
            navigate('/');
        }
    }
    return (
        <div className='mainl'>
        <div className='container containerl'>
            <img className='img' src={CineFlix} alt='CineFlix'/>
            <form onSubmit={handleSubmit(handleChange)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Username</label>
                    <input type="text" className="searchbar form-control" id="exampleInputEmail1" name='username' aria-describedby="emailHelp" placeholder="Enter username" value={user.username} onChange={onChange}/>
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="searchbar form-control" id="exampleInputPassword1" name='password' placeholder="Password" value={user.password} onChange={onChange}/>
                </div>
                <button type="submit" className="submit btn btn-primary" >Submit</button>
            </form>
            {flag==1 ? (
                <div class="col-sm-12" >
                <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
                    <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                    <strong class="font__weight-semibold">Oh snap!</strong> {mistakes}
                </div>
            </div>
            ):(<></>)}
            <h3 className='heading'>If you are a new user <Link to="/signup">Click Here</Link></h3>
        </div>
        </div>
    )
}

export default Login;