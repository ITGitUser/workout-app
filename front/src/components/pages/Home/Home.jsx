import Layout from '../../common/Header/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters/Counters'
import bgImage from '../../../images/home-bg.jpg'
import styles from './Home.module.scss'
import {useNavigate} from 'react-router-dom'

const Home = () =>{
    const navigate = useNavigate();
    return (
        <Layout bgImage={bgImage}>
        <Button text='New' type='main' callback={ ()=>{navigate('/new-workout')} }/>
        <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
        <Counters/>
        </Layout>
    );
};

export default Home;