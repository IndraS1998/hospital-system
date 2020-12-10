import React from "react";
import '../Landing.css';

const LandingNav = ({setTransaction,setConsult,fetchData}) =>{
    return(
            <div className="operation-nav">
                <p className="operation-nav-item" onClick={()=>{
                    setTransaction(false);
                    setConsult(false);
                }}>home</p>
                <p className="operation-nav-item" onClick={()=>{
                    setConsult(true);
                    setTransaction(false);
                }
                }>
                    consult
                </p>
                <p className="operation-nav-item" onClick={async ()=>{
                    try{
                        await fetchData();
                    }catch (e) {
                        console.log('couldn\'t fetch data');
                        return
                    }
                    setConsult(false);
                    setTransaction(true);
                }}>My requests</p>
            </div>
    )
}
export default LandingNav;
