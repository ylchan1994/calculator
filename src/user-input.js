import React, { useEffect, useState } from "react";

export default function UserInput() {
  const [finalBorder, setFinalBorder] = useState('');

  const [ border, setBorder ] = useState({
    topLeft: 0,
    topRight: 0,
    bottomRight: 0,
    bottomLeft: 0,
    topLeftAdd: 0,
    topRightAdd: 0,
    bottomRightAdd: 0,
    bottomLeftAdd: 0,
  });

  const [ add, setAdd ] = useState({
    topLeftAdd: '',
    topRightAdd: '',
    bottomRightAdd: '',
    bottomLeftAdd: '',
  });
  
  const [hasAdditional, setHasAdditional] = useState(false);

  useEffect(() => {
    const {topLeft, topRight, bottomLeft, bottomRight, topLeftAdd, topRightAdd, bottomLeftAdd, bottomRightAdd} = border
    const needSecondary = topLeftAdd != 0 || topRightAdd !=  0 || bottomLeftAdd != 0 || bottomRightAdd != 0;
    setFinalBorder(`${topLeft} ${topRight} ${bottomRight} ${bottomLeft}` 
      + (needSecondary? `/ ${topLeftAdd} ${topRightAdd} ${bottomRightAdd} ${bottomLeftAdd}` : '')) 
    console.log(Object.values(border), Object.values(add));
  }, [border])


  function handleChange(event) {
    const { name, value } = event.target;

    if (name.match(/(.+)Add/)) {
      setAdd((prevState) => {
        const newState = {...prevState};
        newState[name] = value !== ''? value : '';
        return newState
      });   
      setBorder((prevState) => {
        const newState = {...prevState};
        newState[name] = value !== ''? value : prevState[name.slice(0, -3)];
        return newState
      });    
    } else {
      setBorder((prevState) => {
        const newState = {...prevState};
        newState[name] = value !== ''? value : '0';
        newState[`${name}Add`] = (!hasAdditional || add[`${name}Add`] == '') ? newState[name] : newState[`${name}Add`];
        return newState
      }); 
    }
           
  } 

  function handleSubmit(event) {
    event.preventDefault();
    setHasAdditional(true);
  } 


  return (
    <>
    <div className='col-4 mx-5 d-flex justify-content-center align-items-center h-50'>
      <div className="bg-primary w-100 h-100 d-flex justify-content-center align-items-center" style={{border: '1px solid black', borderRadius: finalBorder }}>
        <h1>Preview</h1>
      </div>
    </div>
    <div className='col-1'></div>
    <div className='col-6'>
      <form onSubmit={handleSubmit}>
        <h3>Initial corner border radius</h3>
        <div className="row py-2">
          <label className="col-2">Top left</label>
          <input type="text" name="topLeft" placeholder="px, rem, %, or em" 
            className="col-3" onInput={handleChange}></input>      
        </div>
        <div className="row py-2">
          <label className="col-2">Top right</label>
          <input type="text" name="topRight" placeholder="px, rem, %, or em" 
            className="col-3" onInput={handleChange} ></input>      
        </div>
        <div className="row py-2">
          <label className="col-2">Bottom Right</label>
          <input type="text" name="bottomRight" placeholder="px, rem, %, or em" 
            className="col-3" onInput={handleChange} ></input>      
        </div>
        <div className="row py-2">
          <label className="col-2">Bottom left</label>
          <input type="text" name="bottomLeft" placeholder="px, rem, %, or em" 
            className="col-3" onInput={handleChange} ></input>      
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Modify additional border?</button>
        </div>
        {hasAdditional? (
          <>
          <h3 className="pt-3">Additional corner border (for elliptic)</h3>
          <div className="row py-2">
            <label className="col-2">Top left</label>
            <input type="text" name="topLeftAdd" placeholder="px, rem, %, or em" 
              className="col-3" onInput={handleChange} ></input>      
          </div>
          <div className="row py-2">
            <label className="col-2">Top right</label>
            <input type="text" name="topRightAdd" placeholder="px, rem, %, or em" 
              className="col-3" onInput={handleChange} ></input>      
          </div>
          <div className="row py-2">
            <label className="col-2">Bottom Right</label>
            <input type="text" name="bottomRightAdd" placeholder="px, rem, %, or em" 
              className="col-3" onInput={handleChange} ></input>      
          </div>
          <div className="row py-2">
            <label className="col-2">Bottom Left</label>
            <input type="text" name="bottomLeftAdd" placeholder="px, rem, %, or em" 
              className="col-3" onInput={handleChange} ></input>      
          </div>
          </>
        ) : ''}
                
      </form>
    </div>
    </>
    
    
  )
}