import React,{useState,useContext} from "react";
import {Link} from 'react-router-dom'
import {HospitalContext} from "../../store/useStore";
import Landing from "./client-ops/Landing";
import './Login.css';

const SignUp = () =>{

    const contextReceiver = useContext(HospitalContext);
    const {onSignUserUp,logged,foundUser,onOpenModal} = contextReceiver;
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConf,setPasswordConf] = useState('');
    const [sex,setSex] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [age,setAge] = useState('');

    if(logged){
        return(
            <Landing foundUser={foundUser}/>
        )
    }

    return (
        <section className='sing-up-center incr height_50'>
            <h2 className='txt-blue'>SIGN UP PAGE</h2>
            <p className='txt-blue'><Link to='/login'>already have an account?</Link></p>
            <div className='center'>
                <div className='login-form'>
                    <input type="text" placeholder='name' value={name} className='input-style' onChange={e=>setName(e.target.value)}/>
                    <input type="text" placeholder='sex' value={sex} className='input-style' onChange={e=>setSex(e.target.value)}/>
                    <input type="text" value={address} className='input-style' placeholder='address' onChange={e=>setAddress(e.target.value)}/>
                </div>
                <div className='login-form'>
                    <input type="text" className='input-style' placeholder='phone-number' value={phone} onChange={e=>setPhone(e.target.value)}/>
                    <input type="password" className='input-style' placeholder='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                    <input type="password" className='input-style' placeholder='confirm-password' value={passwordConf} onChange={e=>setPasswordConf(e.target.value)}/>
                    <input type="text" className='input-style' placeholder='age' value={age} onChange={e => setAge(e.target.value)}/>
                </div>
            </div>
            <button className="sign-up-btn" onClick={()=>{
                if(!name || !sex || !address || !phone || !age){
                    onOpenModal('please make sure that all valid spaces are filled');
                }else if(password.length < 6 || !(passwordConf === password) ){
                    onOpenModal('passwords do not match or too short');
                }else{
                    onSignUserUp(name,address,phone,sex,password,age);
                }
            }}>
                submit
            </button>
        </section>
    )
}

export default SignUp