import React from 'react';
import bgImage from '../../../images/profile-bg.jpg';
import afterImage from '../../../images/after.jpg'
import userImage from '../../../images/header/user.svg'
import styles from './Profile.module.scss'
import stylesLayout from '../../common/Header/Layout.module.scss'
import {  useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Header from '../../common/Header/Header';
import Counters from '../../ui/Counters/Counters';
import deleteImage from '../../../images/delete.svg';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames'


var options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    timezone: 'UTC',
    
  };

const Profile = () => {
    const [switchLogs, setSwitchLogs]=React.useState(true);
    const navigate = useNavigate();
    const {data, isSuccess, refetch} = useQuery('home page counters', ()=>
        $api({
            url: '/users/profile',
        }),
        {
            refetchOnWindowFocus: false,
        }
    );
    const {
        mutate: deleteWorkoutLog,  
       //isSuccess: isSuccessMutate, 
    }=useMutation('Delete workout log', (workLogId)=>
    $api({
        url: `/workouts/completed/${workLogId}`,
        type: 'DELETE',
       // body: {workId},
    }), {onSuccess(data){
        refetch();
       
    }}
    );
    //const workoutsCompleted= data.workoutsLogsCompleted;
    return (
        <>
        <div 
        className={`${stylesLayout.wrapper} ${ stylesLayout.otherPage}`}
        style = {{backgroundImage: `url(${bgImage})`, height: 356}}>
            <Header/>
                <div className={styles.center}>
                    <img src={userImage} alt='profile' height='56' draggable={false}></img>
                    {isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
                </div>

            {isSuccess  && <Counters
        minutes={data.minutes}
        workouts={data.workoutsCount}
        kgs={data.kgs}/>}
        </div> 
            <div 
            className='wrapper-inner-page'
            style={{paddingLeft: 0, paddingRight:0}}
            >
                 <div className={styles.wrapper}>
                        <div className={styles.switchWorkoutsLogs}>
                            <button className={cn(styles.LogsButton, {
                                    [styles.LogsActive]: switchLogs===true,
                                })} aria-label='completed' 
                                onClick={ ()=>setSwitchLogs(true)}>
                                <span>Завершенные({data?.workoutsLogsCompleted.length})</span>
                            </button>
                            <button className={cn(styles.LogsButton, {
                                    [styles.LogsActive]: switchLogs===false,
                                })} aria-label='noCompleted' 
                                onClick={ ()=>setSwitchLogs(false)}>
                                <span>Незавершенные({data?.workoutsLogsNoCompleted.length})</span>
                            </button>
                        </div>

                { switchLogs ? (data?.workoutsLogsCompleted.map((workouts, idx)=>(
                            <div className={styles.item} key={`workouts ${idx}`}>
                                <button 
                                aria-label='workouts completed'>
                                 <span>{workouts.workout?.name}</span> 
                                 <div className={styles.date}>{new Date(workouts.updatedAt).toLocaleDateString("ru", options)}</div>    
                                </button>   
                            </div>  
                    ))):(
                        data?.workoutsLogsNoCompleted.map((workoutsLog, idx)=>(
                            <div className={styles.item} key={`workouts ${idx}`}>
                                <button 
                                className=''
                                aria-label='workouts no completed' 
                                onClick={
                                    ()=>navigate(`/workout/${workoutsLog._id}`)
                                }>
                                 <span>{workoutsLog.workout?.name}</span> 
                                 <div className={styles.date}>{new Date(workoutsLog.updatedAt).toLocaleDateString("ru", options)}</div>    
                                </button>   
                                <img 
                                    src={deleteImage} 
                                    height='34' 
                                    alt='удалить'
                                    draggable={false}
                                    onClick={  () => { if (window.confirm(`Вы действтельно хотите удалить ?`)){ deleteWorkoutLog(workoutsLog._id) } } }  
                                         />
                            </div>  
                    ))
                    )  }
                        
                    </div>
                <div className={styles.before_after}>
                    <div>
                        <div className={styles.heading}>До</div>
                        <img src={afterImage} alt='' draggable={false}></img>
                    </div>
                    <div>
                        <div className={styles.heading}>После</div>
                        <img src={afterImage} alt='' draggable={false}></img>
                    </div>
                </div>
            </div>
            </>
    );
};
export default Profile;