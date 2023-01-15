import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import hamburgerImage from '../../../../images/header/hamburger.svg'
import hamburgerCloseImage from '../../../../images/hamburger-close.svg'
import {menu} from './menuBase'
import styles from './Hamburger.module.scss'
import { useOutsideAlerter } from '../../../../hooks/useOutsideAlerter'
import { useAuth } from '../../../../hooks/useAuth'

const Hamburger = () => {
    const {setIsAuth} = useAuth();
    const navigate = useNavigate();
    const {ref, isComponentVisible, setIsComponentVisible} = useOutsideAlerter(false);
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        setIsAuth(true);
        setIsComponentVisible(false);
        navigate('/');
        document.location.reload();//временный костыль
    };
return (
    <div className={styles.wrapper} ref={ref}>
    <button type='button' onClick={()=>setIsComponentVisible(!isComponentVisible)}>
      <img src={isComponentVisible?hamburgerCloseImage:hamburgerImage} 
      alt="Menu" 
      height='24'
      width='27'
      draggable={false}/>
    </button>
    <nav className={`${styles.menu} ${isComponentVisible?styles.show:''}`}>
    <ul>
        {
            menu.map( (item, idx)=>( 
                <li key={`_menu_${idx}`}>
                    <Link to={item.link}>{item.title}</Link>
                </li>
             ))
        }
        <li>
            <button onClick={handleLogout}>Выйти</button>
        </li>
    </ul>
    </nav>

    </div>
);
};

export default Hamburger;