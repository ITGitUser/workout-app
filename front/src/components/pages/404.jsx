import React from 'react';
import Layout from '../common/Header/Layout';
import bgImage from '../../images/new-workout.jpg';


const Error404 = () => {
    return (
        <>
        <Layout bgImage={bgImage} heading='Page not found'/> 
            <div className='wrapper-inner-page'>
               404 page not found
            </div>
            </>
    );
};
export default Error404;