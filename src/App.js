import React, { useState } from 'react';
import Button from './button';

export default function App() {
  const [results, setResults] = useState([]);
  const [operations, setOperations] = useState({
    first: '',
    operator: '',
    second: '',
  })
  const [isFirst, setIsFirst] = useState(true);
  const [isFinal, setIsFinal] = useState(false);

  function handleNumber(value) {
    
        
    if (isFirst) {
      if(operations.first.length >= 8) {return;}
      setOperations({...operations, ['first']: operations.first + value})

      setIsFinal(false);

    } else {
      if(operations.second.length >= 8) {return;}
      setOperations({...operations, ['second']: operations.second + value})
    }
  }

  function handleOperators(value) {

    if (value === '-' && operations.first === '') {
      setOperations({...operations, ['first']: '-'})
    } else {

      setOperations({...operations, ['operator']: value})

      setIsFirst(false);
    }
  }

  function handleSpecial(value) {

    switch (value) {      
      case 'C':
        if (isFirst) {
          setOperations({...operations, ['first']: operations.first.slice(0, -1)})
        } else {

          if ( operations.second === '' || operations.second === '0' ) {
            setOperations({...operations, ['operator']: ''})
            setIsFirst(true);
            break;
          }
          setOperations({...operations, ['second']: operations.second.slice(0, -1)})
        };
        break;
      case 'AC':

        setOperations({
          first: '',
          operator: '',
          second: '',
          result: undefined
        })

        setIsFirst(true);

        setIsFinal(false);

        break;
      case '±':

        if (isFirst) {

          if (operations.first === '') {
            setOperations({...operations, ['first']: '-'})
          } else if (!Number(operations.first)) {
            setOperations({...operations, ['first']: ''})
          } else {
            setOperations({...operations, ['first']: (Number(operations.first) * -1).toString()})
          }       

        } else {

          if (operations.second === '') {
            setOperations({...operations, ['second']: '-'})
          } else if (!Number(operations.second)) {
            setOperations({...operations, ['second']: '' })
          } else {
            setOperations({...operations, ['second']: (Number(operations.second) * -1).toString()})
          }         

        };
        break;
    }
  }
  
  function calculate() {
    if (isFirst) {return;}
    let {first, operator, second} = operations;
    let final = 0;
    second = second === '' ? '0' : second;

    switch (operator) {
      case '+':
        final = parseFloat(first) + parseFloat(second);
        break;
      case '-':
        final = parseFloat(first) - parseFloat(second);
        break;
      case 'x':
        final = parseFloat(first) * parseFloat(second);
        break;
      case '÷':
        final = parseFloat(first) / parseFloat(second);
        break;
    }

    if (final % 1 !== 0) {
      final = Number(final.toFixed(3));
    };

    
    if (final >= 100000000) {
      final = 'ERR';
    };

    setOperations({
      first: '',
      second: '',
      operator: ''
    })
    setResults([...results, final]);
    setIsFirst(true);
    setIsFinal(true);
  }

  // useEffect(() => {
  //   console.log(operations.first);
  // }, [operations.first]);
  
  return (
    <>
    <div>
      <h1 className='text-3xl font-bold mb-8 ms-10'>Calculator</h1>
    </div>
    <div className='grid grid-cols-2 auto-rows-auto min-w-96'>
      <div>
        <div className='flex h-10 btn m-4 items-center justify-between'>
          <p className='ps-3'>{isFinal? results.at(-1): (isFirst? operations.first : operations.second)}</p>
          <p className='pe-3'>{operations.operator}</p>
        </div>
        <div className='grid grid-cols-4 m-4 justify-between gap-4 h-96'>
          <div className='col-span-2 grid'>
            <Button displayKey={'C'} userClick={handleSpecial}/>
          </div>
          <div className='col-span-2 grid'>
            <Button displayKey={'AC'}  userClick={handleSpecial}/>
          </div>
          <Button displayKey={'±'} userClick={handleSpecial} />
          <Button displayKey={'÷'} userClick={handleOperators} />
          <Button displayKey={'x'} userClick={handleOperators} />
          <Button displayKey={'-'} userClick={handleOperators} />
          <div className='col-span-3 grid grid-cols-3 gap-4'>
            <Button displayKey={'7'} userClick={handleNumber} />
            <Button displayKey={'8'} userClick={handleNumber} />
            <Button displayKey={'9'} userClick={handleNumber}/>
          </div>
          <div className='row-span-2 grid'>
            <Button displayKey={'+'} userClick={handleOperators} />
          </div>
          <Button displayKey={'4'} userClick={handleNumber} />
          <Button displayKey={'5'} userClick={handleNumber} />
          <Button displayKey={'6'} userClick={handleNumber} />
          <div className='col-span-3 grid grid-cols-3 gap-4'>
            <Button displayKey={'1'} userClick={handleNumber} />
            <Button displayKey={'2'}  userClick={handleNumber}/>
            <Button displayKey={'3'} userClick={handleNumber} />
          </div>
          <div className='row-span-2 grid'>
            <Button displayKey={'='} userClick={calculate} />
          </div>
          <div className='col-span-2 grid'>
            <Button displayKey={'0'} userClick={handleNumber} />
          </div>
          <Button displayKey={'.'} userClick={handleNumber} />
        </div>
      </div>
      <div className='ms-4 mt-2 border rounded-3xl p-3'>
        <p className='text-xl mb-3'>Results: </p>
        <div className='flex flex-col-reverse'>
          {[...results].map((result, index) => (
            <p>{`${index+1}: ${result}`}</p>
          ))}
        </div>
        
      </div>
    </div>
    </>    
  );
}