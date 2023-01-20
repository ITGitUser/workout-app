import {useState} from 'react';
import cn from 'classnames'
import Layout from '../../common/Header/Layout';
import bgImage from '../../../images/new-exercise.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import styles from '../NewExercise/NewExercise.module.scss'
import { $api } from '../../../api/api';
import { useMutation, useQuery } from 'react-query';
import Alert from '../../ui/Alert/Alert';
import Loader from '../../ui/Loader';
import { useParams } from 'react-router-dom';
const dataKind = [
    'chest', 'shoulders', 'biceps', 'legs', 'hit'
]

const EditingExercise = () => {
    const {id} = useParams();

    const {data, refetch} = useQuery('Get exercise', ()=>
        $api({
            url: `/exercises/${id}`,
        }),
        {
            
        }
    );
    
    const [name, setName]= useState('');
    const [times, setTimes] = useState();
    const [imageName, setImageName] = useState();
    const {
        isSuccess: isSuccessEdit,
        mutate, 
        isLoading,
        error,
    }=useMutation(
        'Edit new exercise', 
        ()=>
    $api({
        url: '/exercises',
        type: 'PUT',
        body: {name, times, imageName, exerciseId: id},
    }), {
        onSuccess(data){
            setName('');
            setTimes('');
            setImageName(imageName);
      refetch();
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
        <Layout bgImage={bgImage} heading={`Редактирование упражнения: ${data?.name}`}/> 
            <div className='wrapper-inner-page'>
                {error && <Alert type='error' text={error}/>}
                {isSuccessEdit && <Alert text='Exercise edited'/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <Field
                    placeholder = {data?.name}
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    required/>
                    <Field
                    placeholder = {data?.times}
                    value = {times}
                    onChange = {e => setTimes(e.target.value)}
                    required/>
                    <div className={styles.images}>
                        {dataKind.map( name => (
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
                    <Button text = 'Сохранить' callback={ ()=>{} }></Button>
                </form>
            </div>
            </>
    );
};
export default EditingExercise;