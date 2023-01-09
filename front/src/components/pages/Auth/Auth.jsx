import React from 'react';
import Layout from '../../common/Header/Layout';
import bgImage from '../../../images/bg-auth.png';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import styles from './Auth.module.scss'
import Alert from '../../ui/Alert/Alert';
import { useMutation } from 'react-query';
import { $api } from '../../../api/api';
import Loader from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';


const Auth = () => {
    const [email, setEmail]= React.useState('');
    const [password, setPassword]= React.useState('');
    const [type, setType] = React.useState('auth') //auth||reg
    const { setIsAuth } = useAuth()
    const navigate = useNavigate();
    const successLogin= (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true);

        setPassword('');
        setEmail('');
        navigate('/');
    };
    const {mutate: register, isLoading, error}=useMutation('Registration', ()=>
    $api({
        url: '/users',
        type: 'POST',
        body: {email, password},
        auth: false,
    }), {onSuccess(data){
        successLogin(data.token);
    }}
    );

    const {mutate: auth, isLoading: isLoadingAuth, error: errorAuth}=useMutation('Auth', ()=>
    $api({
        url: '/users/login',
        type: 'POST',
        body: {email, password},
        auth: false,
    }), {onSuccess(data){
        successLogin(data.token);
    }}
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if(type==='auth'){
            auth();
        }else{
            register();
        }
    }; 
   
    return (
        <>
        <Layout bgImage={bgImage} heading='Вход || Регистрация'/> 
            <div className='wrapper-inner-page'>
                {error && <Alert type='error' text={error}/>}
                {errorAuth && <Alert type='error' text={errorAuth}/>}
                {(isLoading || isLoadingAuth) && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <Field
                    type='email'
                    placeholder = 'Введите email'
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    required/>
                    <Field
                    placeholder = 'Введите пароль'
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                    required/>
                    <div className={styles.wrapperButtons}>
                        <Button text = 'Войти' callback={ ()=>setType('auth') }></Button>
                        <Button text = 'Регистрация' callback={ ()=>setType('reg') }></Button>
                    </div>
                </form>
            </div>
            </>
    );
};
export default Auth;