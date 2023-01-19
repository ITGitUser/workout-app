import React, {Fragment} from 'react';
import bgImage1 from '../../../images/ex-bg-1.jpg';
import bgImage2 from '../../../images/ex-bg-2.jpg';
import checkImage from '../../../images/exercises/check.svg';
import checkCompletedImage from '../../../images/exercises/check-completed.svg';
import styles from './Exercises.module.scss'
import stylesLayout from '../../common/Header/Layout.module.scss';
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Header from '../../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import Alert from '../../ui/Alert/Alert';
import { useState } from 'react';
import { useEffect } from 'react';
import debounce from 'lodash.debounce'//для создания задержки при отправке данных
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor( Math.random()*(max-min+1) )+min;
};


const SingleExercise = () => {
    const {id} = useParams();
    const [bgImage, setBgImage] = useState(bgImage1);
    const navigate = useNavigate();

    useEffect( ()=>{
        setBgImage(getRandomInt(1,2)===1? bgImage1:bgImage2);
    },[] );

    const {data, isSuccess, refetch} = useQuery('Get exercise log', ()=>
        $api({
            url: `/exercises/log/${id}`,
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
   
    const {
        mutate: changeState,  
        error: errorChange
    }=useMutation('Change log state', ({timeIndex, key, value})=>
    $api({
        url: '/exercises/log',
        type: 'PUT',
        body: {timeIndex, key, value, logId: id},
        auth: false,
    }), {onSuccess(){
        refetch();
    }}
    );
       
    const {
        mutate: setExCompleted,  
        error: errorCompleted
    }=useMutation('Change log state', ()=>
    $api({
        url: '/exercises/log/completed',
        type: 'PUT',
        body: {logId: id, completed: true},
    }), {onSuccess(){
        navigate(`/workout/${data.workoutLog}`)
    }}
    );

    useEffect( ()=>{
        if (isSuccess &&
            data.times.length===
            data.times.filter(time=>time.completed).length) {
            
           setExCompleted();
        }
    }, [data?.times, isSuccess] );

    return (
        <>
        <div 
        className={`${stylesLayout.wrapper} ${ stylesLayout.otherPage}`}
        style = {{backgroundImage: `url(${bgImage})`, height: 356}}>
            <Header/>
                
                    {isSuccess && (
                        <div className={styles.heading}>
                            <img 
                            src = {`/uploads/exercises/${data.exercise.imageName}.svg`}
                            height='34'
                            alt=''
                            draggable={false}
                            />
                            <h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
                        </div>
                    )}
        </div> 
        
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}>
                <div style={{width: '90%', margin: '0 auto'}}>
                    {errorChange && <Alert type='error' text={errorChange}/>}
                    {errorCompleted && <Alert type='error' text={errorCompleted}/>}
                </div>
                {isSuccess ? (
                    <div className={styles.wrapper}>
                                    <div className={styles.row}>
                                        <div>
                                            <span>
                                                Предыдущие
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                Вес/Повторения
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                Статус
                                            </span>
                                        </div>
                                    </div>
                                    {data.times.map((item, idx)=>(
                                <div 
                                className={cn(styles.row, {
                                    [styles.completed]: item.completed,
                                })} 
                                key={`time ${idx}`}>
                                    <div className={styles.opacity}>
                                        <input type='number' defaultValue={item.prevWeight} disabled/>
                                        <i>kg{item.completed?'':' '}/</i>
                                        <input type='number' defaultValue={item.prevRepeat} disabled/>
                                    </div>

                                    <div>
                                        <input 
                                        type='tel' 
                                        pattern='[0-9]*'
                                        defaultValue={item.weight} 
                                        onChange={debounce(e=>e.target.value && changeState({
                                            timeIndex: idx,
                                            key: 'weight',
                                            value: e.target.value,
                                        }), 1000)} 
                                        disabled={item.completed}/>
                                        <i>kg{item.completed?'':' '}/</i>
                                        <input 
                                        type='number' 
                                        defaultValue={item.repeat} 
                                        onChange={debounce(e=>changeState({
                                            timeIndex: idx,
                                            key: 'repeat',
                                            value: e.target.value,
                                        }), 1000)}
                                        disabled={item.completed}/>
                                    </div>

                                    <div>
                                      <img 
                                      src={item.completed ? checkCompletedImage:checkImage} 
                                      className={styles.checkbox} 
                                      alt=''
                                      onClick={()=>changeState({
                                        timeIndex: idx,
                                        key: 'completed',
                                        value: !item.completed,
                                    })}/>
                                    </div>
                                </div>
                                  ))}
                                
                              
                            
                    </div>
                ):(
                    <Alert type='warning' text='Times not found'></Alert>
                )}
                
            </div>
            </>
    );
};
export default SingleExercise;