import React from 'react'

const Button = ({text, callback, style='main'}) => {
    return(
    <button onClick={callback} className={}>
        {text}
    </button>
    );
};

export default Button;