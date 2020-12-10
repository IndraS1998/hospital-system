import React,{useState} from 'react';

import {store} from "./data";

const HospitalContext = React.createContext([...store.users]);
const { Provider } = HospitalContext;

const HospitalContextProvider = ({children}) =>{

    /*
    *       Global variables
    * */
    const [requests,setRequests] = useState([...store.requests]);


    /*
    *       %%  === MODALS ===  %%
    * */

    const [modal,setModal] = useState(false);   // variable for managing the view of the modal
    const [modalMessage,setModalMessage] = useState('');    //message that is passed through the modal
    const [loading,setLoading] = useState(false);

    const onOpenModal = message =>{     //function for opening the modal
        setModalMessage(message);
        setModal(true);
    }

    const onCloseModal = () => setModal(false);

    /*
    *       %%  === AUTHENTICATION  === %%
    * */

    //      --variables--
    const [logged,setLogged] = useState(false); //contains the state for whether a user is logged
    const [foundUser,setFoundUser] = useState();

    //      --functions--
    const onLogIn = () =>setLogged(true);
    const onLogOut = () => setLogged(false);

    // function for login in the user
    const onPerformLogin = async (name,password) =>{
        if(name && password){
            setLoading(true);
            let res;
            try{
                res = await fetch('http://localhost:5000/user/',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        name,
                        password
                    })
                })
            }catch (e) {
                setLoading(false);
                onOpenModal('something went wrong');
                console.log(e);
                return;
            }
            if(!res.ok){
                setLoading(false);
                onOpenModal('error please make sure your data is right');
                return;
            }
            let digest = await res.json();
            // noinspection JSCheckFunctionSignatures
            setFoundUser(digest.user);
            setLogged(true);
            setLoading(false);
        }else{
            onOpenModal("please make sure all requirements are effectively filled");
        }

    }

    //function for signing up a user
    const onSignUserUp = async (name,address,phone,sex,password,age) =>{
        setLoading(true);
        let response;
        try {
            response = await fetch('http://localhost:5000/user/create',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name,
                    address,
                    phone,
                    sex,
                    password,
                    age
                })
            })
        }catch (e) {
            setLoading(false);
            onOpenModal("something went wrong please try later");
            console.log(e);
            return ;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal('user name taken');
            return;
        }
        let digest = await response.json();
        // noinspection JSCheckFunctionSignatures
        setFoundUser(digest.user);
        setLogged(true);
        setLoading(false);
    }

    /*
    *       %%  === REQUESTS ===  %%%
    * */

    //      --variables--
    const [handledRequests,setHandledRequests] = useState();
    const [unHandledRequests,setUnhandledRequests] = useState();

    //      --functions--

    const onCreateAppointment = async (name,text) =>{ // creating an appointment
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/request/create',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name,
                    description : text
                })
            })
        }catch (e) {
            setLoading(false);
            onOpenModal('network error please try again later');
            console.log('here 1');
            return;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal(response.message);
            console.log('here 2')
            return;
        }
        setLoading(false);
        console.log('here 3');
        onOpenModal('successfully requested appointment');
    }

    const onGetAppointmentsById =  async (name) =>{ //deprecated
        setLoading(true);
        let response;
        try {
            response = await fetch('http://localhost:5000/request',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({name})
            })
        }catch (e) {
            setLoading(false);
            onOpenModal('network error please try again later');
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal(response.message);
        }
        let digest = await response.json();
        setLoading(false);
        return digest.requests;
    }

    const onGetRequests = async () =>{
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/request');
        }catch (e) {
            setLoading(false);
            onOpenModal('network error couldn\'t fetch requests');
            return ;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal(response.message);
        }
        let digest = await response.json();
        setLoading(false);
        return digest.requests;
    }

    const onGetHandledRequests = async () =>{
        let hRequests;
        try{
            hRequests = await onGetRequests();
        }catch (e) {
            onOpenModal('network error please try again later');
            return
        }
        if(hRequests.length<1){
            onOpenModal('no requests handled yet buddy');
        }else{
            let handledReqs = hRequests.filter(req => req.affected === true);
            setHandledRequests(handledReqs);
        }
    }

    const onGetUnHandledRequests = async () =>{
        let uRequests;
        try{
            uRequests = await onGetRequests();
        }catch (e) {
            onOpenModal('please try again later, couldn\'t fetch data');
        }
        if(uRequests.length < 1){
            onOpenModal('all requests handled!');
        }else{
            let unHandledReqs = uRequests.filter(req => req.affected === false);
            setUnhandledRequests(unHandledReqs);
        }
    }

    const onEditRequest = async (id) =>{
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/request',{
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({foundID : id})
            })
        }catch (e) {
            setLoading(false);
            onOpenModal('network error please try again later');
            return ;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal('something went wrong');
            return ;
        }
        setLoading(false);
        onOpenModal('succeeded in editing consultation request');
    }

    const onDeleteRequest = async (id) =>{    //method for deleting a request
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/request',{
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({foundId : id})
            });
        }catch (e) {
            setLoading(false);
            onOpenModal('network error please try again later');
            return
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal(response.message);
            return
        }
        setLoading(false);
        onOpenModal('succeeded in deleting consultation request');
        console.log('success');
    }

    /*
    *       %%  === ADMIN-SECTION ===  %%
    * */

    //      --variables--

    const [adminLog,setAdminLog] = useState(false);
    const [workingAdmin,setWorkingAdmin] = useState();

    //      --functions--
    const onCreateAdmin = async (name,password,desc,sex,phone,address) =>{  //creating a new admin
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/admin/create',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name,
                    password,
                    desc,
                    sex,
                    phone,
                    address
                })
            });
        }catch (e) {
            console.log(e);
            setLoading(false);
            onOpenModal('network error');
            return;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal('invalid data');
            return;
        }
        let digest = await response.json();
        setLoading(false);
    }

    const onAdminLogIn = async (name,password) =>{  //logging in to admin status
        setLoading(true);
        let response;
        try{
            response = await fetch('http://localhost:5000/admin',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name,
                    password
                })
            })
        }catch (e) {
            setLoading(false);
            onOpenModal('something went wrong please try again later');
            return;
        }
        if(!response.ok){
            setLoading(false);
            onOpenModal(response.message);
            return;
        }
        let digest = await response.json();
        setAdminLog(true);
        setWorkingAdmin(digest.admin);
        setLoading(false);
    }


    return(
            <Provider value={{
                logged,foundUser,modal,modalMessage,loading,adminLog,workingAdmin,
                handledRequests,unHandledRequests,
                onLogIn,onLogOut,onPerformLogin,onSignUserUp, onGetAppointmentsById,
                onOpenModal,onCloseModal,onCreateAppointment,onAdminLogIn,onCreateAdmin,
                onGetHandledRequests,onGetUnHandledRequests,onEditRequest,onDeleteRequest,onGetRequests
            }}>
                {children}
            </Provider>
    )
}

export {HospitalContextProvider, HospitalContext}