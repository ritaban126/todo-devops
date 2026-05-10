import React from 'react';
import {Routes,Route}  from 'react-router-dom'
import ToDo from './components/ToDo';


function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Todo List
      </h1>
      <Routes>
        <Route path='/' element={<ToDo/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
