import React,{useContext} from "react";
import {HospitalContext} from "../../../../store/useStore";
import '../Admin.css';
import '../../../home/Home.css'
import {BiCheck} from "react-icons/bi";

const Request = ({request,onFetchData}) =>{
    const {id,name,description,affected} = request;
    let reducer = useContext(HospitalContext);

    return(
        <div className='center request_item'>
            <h3>{name}</h3>
            <p className='text-sm clr-purple'>description</p>
            <p>{description}</p>
            <p className='text-sm'>affected : <span className='green'>
                {affected && <BiCheck />}
            </span></p>
            <p className='mutation-btn' onClick={async ()=>{
                try{
                    await reducer.onEditRequest(id);
                }catch (e) {
                    reducer.onOpenModal('network error please try again later');
                    return
                }
                try{
                    await onFetchData();
                }catch (e) {
                    console.log('here 11');
                    reducer.onOpenModal('could\'t update!');
                }
            }}>
                edit
            </p>
        </div>
    )
}

export default Request;