import React from "react";
import '../Landing.css';
import {BiCheck} from 'react-icons/bi';

const TransactionItem = ({desc,affected}) =>{
    return(
        <div className='center request-item text-center '>
            <p className='transaction-txt'>{desc}</p>
            <div className='column'>
                <p className='transaction-txt'>seen?</p>
                {affected && <span className='green'><BiCheck /></span>}
            </div>
        </div>
    )
}

export default TransactionItem;