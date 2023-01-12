import React, { Fragment } from 'react';
import bgImage from '../../../images/workout-bg.jpg';

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Header/Layout.module.scss';
import { useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Header from '../../common/Header/Header';
import { Link, useParams } from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';



const SingleWorkout = () => {
    const {id} = useParams();
    const {data, isSuccess} = useQuery('Get workout', ()=>
        $api({
            url: `/workouts/${id}`,
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
   
    return (
        <>
        <div 
        className={`${stylesLayout.wrapper} ${ stylesLayout.otherPage}`}
        style = {{backgroundImage: `url(${bgImage})`, height: 356}}>
            <Header/>
                
                    {isSuccess && (
                    <div>
                    <time className={styles.time}>{data.minutes + 'min'}</time>
                    <h1 className={stylesLayout.heading}>{data.name}</h1>
                    </div>)}
        </div> 
        
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                {isSuccess ? (
                    <div className={styles.wrapper}>
                        {data.exercises.map((ex, idx)=>{
                            return (
                                <Fragment key={`ex ${idx}`}>
                                <div className={styles.item}>
                                    <Link to={`/exercises/${ex._id}`}>
                                    <span>{ex.name}</span>
                                    <img 
                                    src={`/uploads/exercises/${ex.imageName}.svg`} 
                                    height='34' 
                                    alt=''/>
                                    </Link>
                                </div>
                                {idx%2!==0 && <div className={styles.line}></div>}
                                </Fragment>
                            );      
                        })}
                    </div>
                ):(
                    <Alert type='warning' text='Exercises not found'></Alert>
                )}
                
            </div>
            </>
    );
};
export default SingleWorkout;