import React from 'react'
import {Link} from 'react-router-dom'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/hamburger-close.svg'
import {menu} from './menuBase'
import styles from './Hamburger.module.scss'

const Hamburger = () => {
    const [show, setShow] = React.useState(false);
    const handleLogout = ()=>{
        console.log('logout');
    };

return (
    <div className={styles.wrapper}>
    <button type='button'>
      <img src={show?hamburgerCloseImage:hamburgerImage} alt="Menu" onClick={()=>setShow(!show)}/>
    </button>
    <nav className={`${styles.menu} ${show?styles.show:''}`}>
    <ul>
        {
            menu.map( (item, idx)=>( 
                <li key={`_menu_${idx}`}>
                    <Link to={item.link}>{item.title}</Link>
                </li>
             ))
        }
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
    </ul>
    </nav>

    </div>
);
};

export default Hamburger;