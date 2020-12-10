import React,{useState,useContext} from "react";
import {HospitalContext} from "../../../../store/useStore";
import '../Landing.css';

const Consultation = ({name})=>{
    const [text,setText] = useState('');
    const reducer = useContext(HospitalContext);
    return(
        <div className='column'>
            <h2 className='clr-purple mt-1'>Request Appointment</h2>
            <div>
                <textarea  cols="30" placeholder='  some info about your problem' rows="10" value={text} onChange={e=>setText(e.target.value)}/>
            </div>
            <button className="appointment-btn" onClick={async () => {
                if(text.length > 5){
                    try{
                        await reducer.onCreateAppointment(name,text);
                    }catch (e) {
                        reducer.onOpenModal('could not fetch data');
                    }
                }else{
                    reducer.onOpenModal('please give a proper description of your problem');
                }
            }}>
                Send
            </button>
        </div>
    )
}
export default Consultation