import React from 'react';

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Task from './Task';


const App = () => {
 
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Task/>}></Route>
    </Routes>
    </BrowserRouter>
    
    </>
   
  );
};

export default App;
