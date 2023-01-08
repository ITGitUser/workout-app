import React from 'react';
import Layout from '../../common/Header/Layout';
import ReactSelect from 'react-select';
import bgImage from '../../../images/new-workout.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import { Link } from 'react-router-dom';

const NewWorkout = () => {
    const [name, setName]= React.useState('');
    const [exercises, setExercises] = React.useState('');

    const handleSubmit = () => {
        console.log('submit');
    };
    return (
        <>
        <Layout bgImage={bgImage} heading='Craete new workout'/> 
            <div className='wrapper-inner-page'>
                <form onSubmit={handleSubmit}>
                    <Field
                    placeholder = 'Enter name'
                    value = {name}
                    onChange = {e => setName(e.target.value)}
                    required/>
                    <Link to='/new-exercise' className='dark-link'>Add new exercise</Link>
                    <ReactSelect
                        classNamePrefix='select2-selection'
                        placeholder='Exercises...'
                        title='Exercises'
                        options={[
                            {value: 'dklfdslkfj', label: 'Push-ups'},
                            {value: 'ohhiywe', label: 'Pull-ups'},
                        ]}
                        isSearchable={true}
                        value={exercises}
                        onChange={setExercises}
                        isMulti={true}
                    />
                    <Button text = 'Create' callback={ ()=>{} }></Button>
                </form>
            </div>
            </>
    );
};
export default NewWorkout;