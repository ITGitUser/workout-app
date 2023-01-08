import React from 'react'
import Home from './components/pages/Home/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './components/pages/Auth/Auth';

const App = ()=>{

return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} exact={true} />
            <Route path='/new-workout' element={<NewWorkout />} />
            <Route path='/auth' element={<Auth />} />
        </Routes>
    </BrowserRouter>
        
);
};

export default App;