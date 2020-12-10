import React,{useContext,useState} from "react";
import {Link} from "react-router-dom";
import {HospitalContext} from "../../store/useStore";
import Landing from "./client-ops/Landing";
import Admin from "./admin-ops/Admin";
import './Login.css'

const Login = () =>{
    const contextReceiver = useContext(HospitalContext);
    const {logged,foundUser,onPerformLogin,onOpenModal} = contextReceiver;
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [admin,setAdmin] = useState(false);

    const onSetPassword = e => setPassword(e.target.value);
    const onSetName = e => setName(e.target.value);

    if(logged){
        return (
            <Landing foundUser={foundUser}/>
        )
    }

    if(admin){
        return (
            <Admin />
        )
    }

    return (
        <section className='incr height_50 column'>
            <h2 className='txt-blue'>Login Page</h2>
            <div className='center login-form'>
                <form >
                    <div>
                        <input className='input-style' type="text" placeholder='user name' value={name} onChange={e=>onSetName(e)}/>
                    </div>
                    <div>
                        <input className='input-style' type="password" placeholder='password' value={password} onChange={e=>onSetPassword(e)}/>
                    </div>
                    <button className='btn' onClick={ e => {
                        e.preventDefault();
                        if(name && password){
                            onPerformLogin(name,password);
                        }
                    }}>Submit</button>
                </form>
                <article>
                    <p className='text-sm admin-logger' onClick={()=>setAdmin(true)}>I am admin</p>
                </article>
            </div>
        </section>
    )
}

export default Login