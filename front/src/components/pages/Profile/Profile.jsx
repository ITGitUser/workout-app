import React from 'react';
import bgImage from '../../../images/profile-bg.jpg';
import afterImage from '../../../images/after.jpg'
import userImage from '../../../images/header/user.svg'
import styles from './Profile.module.scss'
import stylesLayout from '../../common/Header/Layout.module.scss'
import { useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Header from '../../common/Header/Header';
import Counters from '../../ui/Counters/Counters';

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
    const {data, isSuccess} = useQuery('home page counters', ()=>
        $api({
            url: '/users/profile',
        }),
        {
            refetchOnWindowFocus: false,
        }
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
                {data?.workoutsLogsCompleted.map((workouts, idx)=>(
                            <div className={styles.item} key={`workouts ${idx}`}>
                                <button 
                                aria-label='workouts completed'>
                                 <span>{workouts.workout.name}</span> 
                                 <div className={styles.date}>{new Date(workouts.updatedAt).toLocaleDateString("ru", options)}</div>    
                                </button>   
                            </div>  
                    ))}
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