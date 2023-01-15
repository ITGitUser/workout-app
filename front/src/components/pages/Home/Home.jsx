import Layout from '../../common/Header/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
import bgImage from '../../../images/home-bg.jpg'
import styles from './Home.module.scss'
import {useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query'
import { $api } from '../../../api/api'
import { useAuth } from '../../../hooks/useAuth'


const Home = () =>{
    const navigate = useNavigate();
    const {isAuth} = useAuth();
    const {data, isSuccess} = useQuery('home page counters', ()=>
        $api({
            url: '/users/profile',
        }),
        {
            refetchOnWindowFocus: false,
            enabled: isAuth,
        }
    );

    return (
        <Layout bgImage={bgImage}>
        <Button text='Создать новую' type='main' callback={ ()=>{navigate('/new-workout')} }/>
        <h1 className={styles.heading}>Приложение для тренировок</h1>
        {(isSuccess && isAuth) && <Counters
        minutes={data.minutes}
        workouts={data.workoutsCount}
        kgs={data.kgs}/>}
        </Layout>
    );
};

export default Home;