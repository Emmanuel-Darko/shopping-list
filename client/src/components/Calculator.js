import React,{ useState, useEffect } from 'react';

const Calculator = () => {
    const [firstValue, setFirstValue] = useState(0)
    const [secondValue, setSecondValue] = useState(0)
    const [operation, setOperation] = useState('')
    const [finalValue, setFinalValue] = useState(0)

    useEffect(() => {
        // const final = firstValue - secondValue
        // setFinalValue(final)
        switch(operation){
            case '+':
                return setFinalValue(firstValue + secondValue)
            case '-':
                return setFinalValue(firstValue - secondValue)
            case '*':
                return setFinalValue(firstValue * secondValue)
            case '/':
                return setFinalValue((firstValue / secondValue).toFixed(2))
            default:
                return setFinalValue(0)
        }
    }, [finalValue, firstValue, secondValue,operation]);

    return(
        <div style={{marginTop: '5rem'}}>
            <h3>Calculator ({ operation })</h3>
            <input
                type="number"
                placeholder="enter first value"
                onChange = {(e) => setFirstValue(+e.target.value)}
            />
            <button style={{backgroundColor:`red`}} onClick={(e) => setOperation('+')}>+</button>
            <button style={{backgroundColor:`red`}} onClick={(e) => setOperation('-')}>-</button>
            <button style={{backgroundColor:`red`}} onClick={(e) => setOperation('*')}>*</button>
            <button style={{backgroundColor:`red`}} onClick={(e) => setOperation('/')}>/</button>
            <input
                type="number"
                placeholder="enter second value"
                onChange = {(e) => setSecondValue(+e.target.value)}
            />
            <div style={{marginTop:'2rem'}}>
                <h4> = <span style={{backgroundColor:'green', color:'white', padding:'1rem', borderRadius: '1rem'}}> {finalValue} </span></h4>
            </div>
        </div>
    )
}

export default Calculator;