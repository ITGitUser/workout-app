import React from 'react';
import Layout from '../../common/Header/Layout';
import bgImage from '../../../images/new-workout.jpg';
import Field from '../../ui/Field/Field';
import styles from './NewWorkout.module.scss';
import Button from '../../ui/Button/Button';

const NewWorkout = () => {
    const [name, setName]= React.useState('');

    const handleSubmit = () => {
        console.log('submit');
    };
    return (
        <>
        <Layout bgImage={bgImage}/> 
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <Field
                    placeholder = 'Enter name'
                    value = {name}
                    onChange = {e => setName(e.target.value)}/>
                    <Button text = 'Create' callback={ ()=>{} }></Button>
                </form>
            </div>
            </>
    );
};
export default NewWorkout;