import React from 'react';
import UserInput from './user-input';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
    <div>
      <h1>Preview Border Radius - CSS</h1>
    </div>
    <div className='main-display-block container-fluid m-5'>
      <div className='row' style={{height: 800}}>
        <UserInput />
      </div>
      
    </div>
    </>    
  );
}