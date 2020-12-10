import React,{useState,useContext} from "react";
import {HospitalContext} from "../../../../store/useStore";
import "./MkeAdmin.css";
import '../Admin.css'

let MakeAdmin = () =>{
    let [name,setName] = useState('');
    let [desc,setDesc] = useState('');
    let [sex,setSex] = useState('');
    let [address,setAddress] = useState('');
    let [phone,setPhone] = useState('');
    let [password,setPassword] = useState('');
    let [passwordConf,setPasswordConf] = useState('');
    let reducer = useContext(HospitalContext);
    return(
        <section className='height_admin set_black'>
            <div className='column'>
                <input type="text" placeholder='name' className='styler' value={name} onChange={e=>setName(e.target.value)}/>
                <input type="text" value={desc} placeholder='description' className='styler' onChange={e=>setDesc(e.target.value)}/>
                <input type="text" placeholder='sex' className='styler' value={sex} onChange={e=>setSex(e.target.value)}/>
            </div>
            <div className='column'>
                <input type="text" placeholder='address' value={address} className='styler' onChange={r=>setAddress(r.target.value)}/>
                <input type="text" placeholder='phone #' className='styler' value={phone} onChange={r=>setPhone(r.target.value)}/>
                <input type="text" placeholder='password' className='styler' value={password} onChange={r=>setPassword(r.target.value)}/>
                <input type="text" placeholder='re password' className='styler' value={passwordConf} onChange={r=>setPasswordConf(r.target.value)}/>
            </div>
            <button className='btn-2' onClick={ async ()=>{
                if(passwordConf !== password){
                    reducer.onOpenModal('please mke sure your pass words match');
                    return
                }
                if(password.length < 5){
                    reducer.onOpenModal('password too short');
                    return;
                }
                if(name && sex && desc && address && phone){
                    try{
                        await reducer.onCreateAdmin(name,password,desc,sex,phone,address);
                    }catch (e) {
                        reducer.onOpenModal('something went wrong please try again later');
                        return
                    }
                }
            }}>
                submit
            </button>
        </section>
    )
}

export default MakeAdmin;