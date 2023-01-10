import React from 'react'
import styles from './Counters.module.scss'
import cn from 'classnames'

const Counters = ({minutes, workouts, kgs, type}) => {
    return (
        <div className={cn(styles.wrapper, {
            [styles.profile]: type === 'profile'
        })}>
            <div className={styles.count}>
                <div className={styles.heading}>Минуты</div>
                <div className={styles.number}>{minutes}</div>
            </div>
            <div className={styles.count}>
                <div className={styles.heading}>Тренировки</div>
                <div className={styles.number}>{workouts}</div>
            </div>
            <div className={styles.count}>
                <div className={styles.heading}>Кг</div>
                <div className={styles.number}>{kgs}</div>
            </div>
        </div>
    );
};

export default Counters