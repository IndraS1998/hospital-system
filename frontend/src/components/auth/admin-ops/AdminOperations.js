import React,{useState,useContext} from "react";
import Request from "./admin-transactions/Request";
import {HospitalContext} from "../../../store/useStore";
import './Admin.css';
import '../../home/Home.css';


const AdminOperations = ({onFetchData}) =>{

    const reducer = useContext(HospitalContext);
    const {handledRequests,unHandledRequests} = reducer;
    const [request,setRequest] = useState(false);

    return(
        <div className='height_admin'>
            <div className='admin_nav'>
                <div className='admin-nav-item' onClick={()=>setRequest(true)}>Handled Requests</div>
                <div className='admin-nav-item' onClick={()=>setRequest(false)}>Un-handled Requests</div>
            </div>
            <h3 className='clr-purple center'>REQUESTS</h3>
            <div className='column'>
                {request?
                    handledRequests.map((request,index) => <Request key={index} onFetchData={onFetchData} request={request}/>) :
                    unHandledRequests.map((request,index) => <Request key={index} onFetchData={onFetchData} request={request}/>)}
            </div>
        </div>
    )
}

export default AdminOperations;