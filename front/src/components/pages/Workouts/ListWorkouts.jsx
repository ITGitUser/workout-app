import React, { Fragment } from 'react';
import bgImage from '../../../images/workout-bg.jpg';
import deleteImage from '../../../images/delete.svg';
import editImage from '../../../images/edit.svg';
import styles from './SingleWorkout.module.scss'
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';
import Layout from '../../common/Header/Layout';
import Loader from '../../ui/Loader';




const ListWorkouts = () => {
    const navigate = useNavigate();
    const {data, isSuccess, refetch} = useQuery('Get workouts', ()=>
        $api({
            url: `/workouts`,
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
   
    const {
        mutate: createWorkoutLog, 
        isLoading,
        isSuccess: isSuccessMutate, 
        error,
    }=useMutation('Create new workout log', ({workoutId})=>
    $api({
        url: '/workouts/log',
        type: 'POST',
        body: {workoutId},
    }), {onSuccess(data){
        navigate(`/workout/${data._id}`);
    }}
    );
 
    const {
        mutate: deleteWorkout,  
       //isSuccess: isSuccessMutate, 
    }=useMutation('Delete workout', (workId)=>
    $api({
        url: `/workouts/${workId}`,
        type: 'DELETE',
       // body: {workId},
    }), {onSuccess(data){
       refetch();
       
    }}
    );
    return (
        <>
            <Layout bgImage = {bgImage} heading = 'Список тренировок'/>
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                {error && <Alert type='error' text={error}/>}
                {isSuccessMutate && <Alert text='Workout log created'/>}
                {isLoading && <Loader/>}
                {isSuccess ? (
                    <div className={styles.wrapper}>
                        {data.map((workout, idx)=>(
                            
                                <div className={styles.item} key={`workout ${idx}`}>
                                    <button 
                                    aria-label='Create new workout'
                                    onClick={ ()=>
                                    createWorkoutLog({
                                        workoutId: workout._id,
                                    })}>
                                        <span>{workout.name}</span>
                                        
                                    </button>
                                   
                                    <img 
                                    src={editImage} 
                                    height='32' 
                                    alt='редактировать'
                                    draggable={false}
                                    onClick={  ()=>{ navigate(`/workout/edit/${workout._id}`) } }  
                                         />
                                    <img 
                                    src={deleteImage} 
                                    height='34' 
                                    alt='удалить'
                                    draggable={false}
                                    onClick={  () => { if (window.confirm(`Вы действтельно хотите удалить "${workout.name}"?`)){deleteWorkout( workout._id)} } }  
                                         />
                                        
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