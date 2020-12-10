import React from "react";
import '../Landing.css';
import '../../Login.css';

const LandingMain = ({name,address,phone,sex,age}) =>{
    return(
        <div className='column'>
            <h1 className='mt-2 clr-purple'>{name}</h1>
            <div className='landing-section-container'>
                <p className='text-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, cum delectus deserunt facere ipsam mollitia perferendis quasi recusandae repellendus rerum suscipit veritatis! Commodi ea expedita ipsam laboriosam nostrum quibusdam quo.
                </p>
            </div>
            <div className='center'>
                <div className="cart">
                    <p className='info'>address : <span>{address}</span></p>
                    <p className='info'>sex : <span>{sex}</span></p>
                </div>
                <div className="cart">
                    <p className='info'>phone #: <span>{phone}</span></p>
                    <p className='info'>age : <span>{age}</span></p>
                </div>
            </div>
        </div>
    )
}

export default LandingMain;