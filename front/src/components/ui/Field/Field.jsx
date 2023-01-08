import React from 'react'
import styles from './Field.module.scss'

const Field = ( {placeholder, value, onChange, type ='text', required}) => {
    return (
        <div>
            <input 
      			placeholder={placeholder}
                  type={type}
                  value={value}
                  onChange={onChange}
                  className={styles.input}
                  required={required}
                  />
        </div>
    );
}

export default Field;