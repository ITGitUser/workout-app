import React from 'react';
import bgImage from '../../../images/workout-bg.jpg';
import deleteImage from '../../../images/delete.svg';
import editImage from '../../../images/edit.svg';
import styles from './Exercises.module.scss'
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Alert from '../../ui/Alert/Alert';
import Layout from '../../common/Header/Layout';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';



const ListExercises = () => {
    const navigate= useNavigate();
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
                    <div className={styles.wrapperList}>
                        {data.map((ex, idx)=>(
                            
                                <div className={styles.item} key={`exercise ${idx}`}>
                                    <img 
                                        height='35' 
                                        alt={ex.imageName}
                                        draggable={false}
                                         src={`/uploads/exercises/${ex.imageName}.svg`} />
                                    <button 
                                    aria-label=''>
                                        
                                        <span>{ex.name}</span>
                                        
                                    </button>
                                    <img 
                                    src={editImage} 
                                    height='32' 
                                    alt='редактировать'
                                    draggable={false}
                                    onClick={  ()=>{ navigate(`/exercise/edit/${ex._id}`) }  }  
                                         />
                                    <img 
                                    src={deleteImage} 
                                    height='35' 
                                    alt='удалить'
                                    draggable={false}
                                    onClick={ () => { if (window.confirm(`Вы действтельно хотите удалить "${ex.name}"?`)){deleteExercise( ex._id)} }
                                        
                                        
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