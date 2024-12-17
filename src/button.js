import React from 'react';

export default function Button({displayKey, userClick}) {
  function handleClick(event) {
    userClick(event.target.innerText);
  }  

  return (
    <>
    <button className='btn' onClick={handleClick}>{displayKey}</button>
    </>
  )
}