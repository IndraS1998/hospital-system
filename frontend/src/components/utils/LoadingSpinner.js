import React,{useContext} from "react";
import {HospitalContext} from "../../store/useStore";
import './Utils.css';

const LoadingSpinner = () =>{
    const reducer = useContext(HospitalContext);

    if(!reducer.loading){
        return null;
    }
    return(
        <div className='modal-container column'>
            <p className="text-Large">Loading...</p>
        </div>
    )
}

export default LoadingSpinner;