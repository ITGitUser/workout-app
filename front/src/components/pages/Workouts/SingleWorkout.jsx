import React, { Fragment } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import bgImage from '../../../images/workout-bg.jpg';

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Header/Layout.module.scss';
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Header from '../../common/Header/Header';
import Alert from '../../ui/Alert/Alert';
import cn from 'classnames';
import { useEffect } from 'react';
import Loader from '../../ui/Loader';



const SingleWorkout = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data, isSuccess, isLoading} = useQuery('Get workout', ()=>
        $api({
            url: `/workouts/log/${id}`,
        })
    );

    const {
        mutate: setWorkoutCompleted,
        error: errorCompleted
    }=useMutation('Change log state', ()=>
    $api({
        url: '/workouts/log/completed',
        type: 'PUT',
        body: {logId: id},
    }), {onSuccess(){
        navigate('/workouts');
    }}
    );
   
    useEffect( ()=>{
        if(isSuccess && 
            data?.workoutLog.exerciseLog && 
            data.workoutLog.exerciseLog.length ===
                data.workoutLog.exerciseLog.filter(log=>log.completed).length &&
                data.workoutLog._id === id){
                    setWorkoutCompleted()
                }
    }, [data?.workoutLog.exerciseLog]);

    return (
        <>
        <div 
        className={`${stylesLayout.wrapper} ${ stylesLayout.otherPage}`}
        style = {{backgroundImage: `url(${bgImage})`, height: 356}}>
            <Header/>
                
                    {isSuccess && (
                    <div>
                    <time className={styles.time}>{data.minutes + 'min'}</time>
                    <h1 className={stylesLayout.heading}>{data.workoutLog.workout.name}</h1>
                    </div>)}
        </div> 
        
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                <div style={{width: '90%', margin: '0 auto'}}>
                {errorCompleted && <Alert type='error' text={errorCompleted}/>}
                </div>  
                {isLoading || (isSuccess && data.workoutLog._id !== id )? ( <Loader/>):(
                    <div className={styles.wrapper}>
                        {data.workoutLog.exerciseLog.map((exLog, idx)=>{
                            return (
                                <Fragment key={`ex log ${idx}`}>
                                <div className={cn(styles.item, {
                                    [styles.completed]: exLog.completed,
                                })}>
                                    
                                    <button 
                                    aria-label='Move to exercise' 
                                    onClick = {()=>
                                        navigate(`/exercise/${exLog._id}`)
                                    }>
                                    <span>{exLog.exercise.name}</span>
                                    <img 
                                    src={`/uploads/exercises/${exLog.exercise.imageName}.svg`} 
                                    height='34' 
                                    alt=''
                                    draggable={false}/>
                                    </button>
                                </div>
                                {idx%2!==0 && idx !== data.workoutLog.exerciseLog.length-1 && (
                                <div className={styles.line}></div>
                                )}
                                </Fragment>
                            );      
                        })}
                    </div>
                ) }
                {isSuccess && data?.length===0 && (
                    <Alert type='warning' text='Exercises not found'></Alert>
               ) }              
              
            </div>
            </>
    );
};
export default SingleWorkout;