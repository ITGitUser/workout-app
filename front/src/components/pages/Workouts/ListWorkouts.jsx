import React, { Fragment } from 'react';
import bgImage from '../../../images/workout-bg.jpg';

import styles from './SingleWorkout.module.scss'
import { useQuery } from 'react-query';
import { $api } from '../../../api/api';
import { Link } from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';
import Layout from '../../common/Header/Layout';



const ListWorkouts = () => {
    const {data, isSuccess} = useQuery('Get workouts', ()=>
        $api({
            url: `/workouts`,
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
   
    return (
        <>
            <Layout bgImage = {bgImage} heading = 'Список тренировок'/>
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                {isSuccess ? (
                    <div className={styles.wrapper}>
                        {data.map((workout, idx)=>(
                            
                                <div className={styles.item} key={`workout ${idx}`}>
                                    <Link to={`/workout/${workout._id}`}>
                                    <span>{workout.name}</span>
                                    </Link>
                                </div>                               
                                 
                        ))}
                    </div>
                ):(
                    <Alert type='warning' text='Тренировки не найдены'></Alert>
                )}
                
            </div>
            </>
    );
};
export default ListWorkouts;