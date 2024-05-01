import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
function SignUp() {
    let [user, setuser] = useState({ name: "", email: "", location: "", username: "", password: "" });
    let [mistakes, setmistakes] = useState("");
    let [flag, setflag] = useState(0);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onChange = (event) => {
        setflag(0);
        setuser({ ...user, [event.target.name]: event.target.value })
        console.log(user)
    }
    const handleChange = async () => {
        console.log(user);
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: user.name, email: user.email, location: user.location, username: user.username, password: user.password })
        }
        );
        const result = await response.json()
        if(result.success)
        {
            setflag(2);
        }
        else if  (result.errors !== "") {
            setmistakes(result.errors);
            setflag(1);
        }
    }
    return (
        <div className='mains'>
        <div className='container containers'>
            <form onSubmit={handleSubmit(handleChange)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" name='name' value={user.name} placeholder="Enter name" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" placeholder="Enter email" value={user.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Location</label>
                    <input type="text" className="form-control" placeholder="Enter location" name='location' value={user.location} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your location with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" >Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" name='username' value={user.username} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' placeholder="Password" value={user.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
                {
                    flag == 1 ? (
                        <div class="col-sm-12">
                            <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
                                <i class="start-icon far fa-times-circle faa-pulse animated"></i>
                                <strong class="font__weight-semibold">Oh snap!</strong> {mistakes}
                            </div>
                        </div>

                    ) : (<></>)
                }
                {
                    flag == 2 ? (
                        <div class="col-sm-12">
                            <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                                <i class="start-icon far fa-check-circle faa-tada animated"></i>
                                <strong class="font__weight-semibold">Well done!</strong> You successfully created account.
                            </div>
                        </div>

                    ) : (<></>)
                }
            </form>
        </div>
        </div>
    )
}

export default SignUp;