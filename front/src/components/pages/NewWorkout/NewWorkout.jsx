import React from 'react';
import Layout from '../../common/Header/Layout';
import ReactSelect from 'react-select';
import bgImage from '../../../images/new-workout.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { $api } from '../../../api/api';
import Alert from '../../ui/Alert/Alert';
import Loader from '../../ui/Loader';

const NewWorkout = () => {
    const [name, setName]= React.useState('');
    const [exercisesCurrent, setExercisesCurrent] = React.useState([]);

    const {data, isSuccess} = useQuery('list exercises', ()=>
    $api({
        url: '/exercises',
    }),
    {
        refetchOnWindowFocus: false,
    }
);

const {
    mutate, 
    isLoading, 
    isSuccess: isSuccessMutate,
    error
}=useMutation('Create new workout', ({exIds})=>
$api({
    url: '/workouts',
    type: 'POST',
    body: {name, exerciseIds: exIds},
}), {
    onSuccess(){
        setName('');
        setExercisesCurrent([]);
    }
}
);

    const handleSubmit = (e) => {
        e.preventDefault();

        const exIds = exercisesCurrent.map(ex => ex.value);

        mutate({
            exIds,
        });
    };
    return (
        <>
        <Layout bgImage={bgImage} heading='Новая тренировка'/> 
            <div className='wrapper-inner-page'>
                {error && <Alert type='error' text={error}/>}
                {isSuccessMutate && <Alert text='Workouts created'/>}
                {isLoading && <Loader/>}
                <form onSubmit={handleSubmit}>
                    <Field
                    placeholder = 'Введите название тренировки'
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    required/>
                    <Link to='/new-exercise' className='dark-link'>Добавить новое упражнение</Link>
                    {isSuccess && data && (
                    <ReactSelect
                        classNamePrefix='select2-selection'
                        placeholder='Упражнения...'
                        title='Упражнения'
                        options={
                            data.map(ex=>({
                                value: ex._id,
                                label: ex.name,
                            }))}
                        //isSearchable={true}
                        value={exercisesCurrent}
                        onChange={setExercisesCurrent}
                        isMulti={true}
                    />)}
                    <Button text = 'Создать' callback={ ()=>{} }></Button>
                </form>
            </div>
            </>
    );
};
export default NewWorkout;