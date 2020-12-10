import React from 'react';
import './Home.css';
import logo from '../../heart.svg';

const Home = () =>{

    return(
        <section className='main height_50'>
            <img src={logo} className='App-logo' alt="we do care"/>
        </section>
    )
}

export default Home