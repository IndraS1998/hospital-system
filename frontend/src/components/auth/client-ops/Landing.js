import React, {useState,useEffect,useContext} from 'react';
import {HospitalContext} from "../../../store/useStore";
import LandingNav from "./transactions/LandingNav";
import Consultation from "./transactions/Consultation";
import TransactionList from "./transactions/TransactionList";
import LandingMain from "./transactions/LandingMain";
import './Landing.css';

const Landing = ({foundUser}) =>{
    const [consult,setConsult] = useState(false);
    const [transaction,setTransaction] = useState(false);
    const {name,address,phone,sex,age} = foundUser;
    const reducer = useContext(HospitalContext);
    const [requests,setRequests] = useState();
    let requestsById ;

    async function fetchSingleUserData() {
        requestsById = await reducer.onGetRequests();
        let newRequests = requestsById.filter(req => req.name === name);
        if(requestsById.length < 1){
            reducer.onOpenModal('couldn\'t get requests by user');
            return
        }
        setRequests(newRequests);
    }

    return(
       <section className='height_60'>
           <LandingNav setTransaction={setTransaction} fetchData={fetchSingleUserData} setConsult={setConsult} />
           {consult && <Consultation name={name} />}
           {transaction && <TransactionList requests={requests} /> }
           {!consult && !transaction && <LandingMain age={age} name={name} address={address} phone={phone} sex={sex}/>}
       </section>
    )
}

export default Landing;