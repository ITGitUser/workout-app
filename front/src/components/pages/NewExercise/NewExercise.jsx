import {useState} from 'react';
import cn from 'classnames'
import Layout from '../../common/Header/Layout';
import bgImage from '../../../images/new-exercise.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import styles from './NewExercise.module.scss'
import { $api } from '../../../api/api';
import { useMutation } from 'react-query';
import Alert from '../../ui/Alert/Alert';
import Loader from '../../ui/Loader';
const data = [
    'chest', 'shoulders', 'biceps', 'legs', 'hit'
]

const NewExercise = () => {
    const [name, setName]= useState('');
    const [times, setTimes] = useState(3);
    const [imageName, setImageName] = useState('chest');

    const {
        isSuccess,
        mutate, 
        isLoading,
        error,
    }=useMutation(
        'Create new exercise', 
        ()=>
    $api({
        url: '/exercises',
        type: 'POST',
        body: {name, times, imageName},
    }), {
        onSuccess(data){
        setName('');
        setTimes(3);
        setImageName('chest');
    }}
    );

    const handleSubmit = e => {
        e.preventDefault();
        if (name && times && imageName) {
            mutate();
        }
    };
    return (
        <>
        <Layout bgImage={bgImage} heading='Craete new exercise'/> 
            <div className='wrapper-inner-page'>
                {error && <Alert type='error' text={error}/>}
                {isSuccess && <Alert text='Exercise created'/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <Field
                    placeholder = 'Введите название'
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    required/>
                    <Field
                    placeholder = 'Введите время'
                    value = {times}
                    onChange = {e => setTimes(e.target.value)}
                    required/>
                    <div className={styles.images}>
                        {data.map( name => (
                            <img 
                            key={`ex img ${name}`}
                            src={`/uploads/exercises/${name}.svg`} 
                            alt={name}
                            draggable={false}
                            className={cn({
                                [styles.active]:imageName === name
                            })}
                            onClick={()=>setImageName(name)}/>
                        ))}
                        
                    </div>
                    <Button text = 'Создать' callback={ ()=>{} }></Button>
                </form>
            </div>
            </>
    );
};
export default NewExercise;