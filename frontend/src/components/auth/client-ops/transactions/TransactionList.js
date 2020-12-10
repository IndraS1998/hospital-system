import React from "react";
import TransactionItem from "./TransactionItem";
import '../Landing.css';

const TransactionList = ({requests}) =>{
    return(
        <div className='column'>
            <div><h3 className='clr-purple mt-2'>My requests</h3></div>
            {requests.map((request,index) => <TransactionItem key={index} desc={request.description} affected={request.affected}/>)}
        </div>
    )
}

export default TransactionList;