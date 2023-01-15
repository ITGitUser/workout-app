import React from 'react';
import bgImage from '../../../images/workout-bg.jpg';
import deleteImage from '../../../images/delete.svg';
import styles from '../Workouts/SingleWorkout.module.scss'//одинаковые стили для списка упражнений и списка тренировок
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Alert from '../../ui/Alert/Alert';
import Layout from '../../common/Header/Layout';
import Loader from '../../ui/Loader';



const ListExercises = () => {

    const {data, isSuccess, refetch} = useQuery('Get exercises', ()=>
        $api({
            url: `/exercises`,
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
   
 
    const {
        mutate: deleteExercise,
        isLoading, 
        error: deleteError,
    }=useMutation('Delete exercise', (exId)=>
    $api({
        url: `/exercises/${exId}`,
        type: 'DELETE',
    }), {onSuccess(data){
       refetch();
       
    }}
    );
    return (
        <>
            <Layout bgImage = {bgImage} heading = 'Список упражнений'/>
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                {deleteError && <Alert type='error' text={deleteError}/>}
                {isLoading && <Loader/>}
                {isSuccess ? (
                    <div className={styles.wrapper}>
                        {data.map((ex, idx)=>(
                            
                                <div className={styles.item} key={`exercise ${idx}`}>
                                    <button 
                                    aria-label=''>
                                        <span>{ex.name}</span>
                                        
                                    </button>
                                    <img 
                                    src={deleteImage} 
                                    height='34' 
                                    alt='удалить'
                                    draggable={false}
                                    onClick={ ()=>
                                        deleteExercise( ex._id)
                                        }/>
                                        
                                </div>  
                                                           
                           
                        ))}
                        
                    </div>
                ):(
                    <Alert type='warning' text='Упражнения не найдены'></Alert>
                )}
                
            </div>
            </>
    );
};
export default ListExercises;