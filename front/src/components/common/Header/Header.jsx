import React from 'react'
import styles from './Header.module.scss'
import userImage from '../../../images/header/user.svg'
import arrowImage from  '../../../images/header/arrow.svg'
import Hamburger from './Hamburger/Hamburger'
import {useLocation, useNavigate} from 'react-router-dom'

const Header = ()  =>{
    const navigate = useNavigate();
    return (
    <header className={styles.header}>
        {useLocation().pathname!=='/'? (
        <button type='button' onClick={ ()=>{navigate(-1)}}>
        <img src={arrowImage} alt="Back"/>
    </button>): (
        <button type='button' onClick={()=>{navigate('/auth')}}>
        <img src={userImage} alt="Auth"/>
    </button>
    )
        
        }
        
        <Hamburger/>
    </header>);
};

export default Header;