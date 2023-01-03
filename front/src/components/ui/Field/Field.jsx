import React from 'react'
import styles from './Field.module.scss'

const Field = ( {placeholder, value, onChange, type ='text'}) => {
    return (
        <div>
            <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.input}/>
        </div>
    );
}

export default Field;