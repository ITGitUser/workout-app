import React from 'react'

import styles from './Confirm.module.scss'

const Confirm = ( {callback, text} ) => {
    const hideConfirm=()=>{

    };
    return(
        <div className={styles.confirm}>
            <h1>{text}</h1>
            <button onClick={()=>hideConfirm} className={styles.buttonConfFalse}>Нет</button>
            <button onClick={callback} className={styles.buttonConfTrue}>Да</button>
        </div>
    );
};

export default Confirm;