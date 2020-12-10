import React,{useContext} from "react";
import {HospitalContext} from "../../store/useStore";
import './Utils.css';

const ErrorModal = () =>{
    const reducer = useContext(HospitalContext);

    if(!reducer.modal){
        return null;
    }

    return(
        <div className='modal-container column'>
            {reducer.modalMessage}
            <button className='modal-btn' onClick={reducer.onCloseModal}>
                close modal
            </button>
        </div>
    )
}

export default ErrorModal;