import React from 'react';
import {Link} from 'react-router-dom';

const Help = () =>{
    return(
        <div className='height_50 column incr'>
            <h2 className='clr-purple'>Our Hospital</h2>
            <p className='mx-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem doloribus ea eum exercitationem fugiat ipsam ipsum iste natus nostrum numquam obcaecati pariatur quam quasi qui quod, quos sed soluta.</p>
            <p className='clr-purple'><Link to='/signUp'>click here to log in and consult</Link> </p>
        </div>
    )
}

export default Help