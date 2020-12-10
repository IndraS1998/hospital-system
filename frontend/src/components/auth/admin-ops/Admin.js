import React, {useContext, useEffect, useState} from "react";
import {HospitalContext} from "../../../store/useStore";
import AdminOperations from "./AdminOperations";
import './Admin.css';
import '../Login.css';
import '../../home/Home.css';

const Admin = () =>{
    const reducer = useContext(HospitalContext);
    const {adminLog,onAdminLogIn,onOpenModal,onGetHandledRequests,onGetUnHandledRequests} = reducer;
    const [name,setName] =useState('');
    const [password,setPassword] = useState('');

    async function fetchAll()   //getting all requests
    {
        try{
            await onGetHandledRequests();
            await onGetUnHandledRequests();
        }catch (e) {
            onOpenModal('network error please try again later');
        }
    }

    useEffect(()=>{
        fetchAll().then(() => console.log('all good'));
    },[]);

    if(adminLog){
        return(
            <AdminOperations onFetchData={fetchAll}/>
        )
    }


    return(
        <div className='column height_admin'>
            <h2 className='clr-purple'>Admin Login</h2>
            <div className='login-form'>
                <input type="text" className='input-style' placeholder='name' value={name} onChange={e=>setName(e.target.value)}/>
                <input type="password" placeholder='password' className='input-style' value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className='sign-up-btn' onClick={async ()=>{
                    if(name.length < 1 || password.length < 1){
                        onOpenModal('please fill all required spaces');
                    }else{
                        await onAdminLogIn(name,password);
                    }
                }}>Log In</button>
            </div>
        </div>
    )
}

export default Admin;