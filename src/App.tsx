import React, {useEffect, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {SettingCounter} from "./components/SettingCounter";
import {BoxCounter} from "./components/BoxCounter";

function App() {
    let [valueStart, setValueStart] = useState<number>(0);
    let [valueMax, setValueMax] = useState<number>(5);
    let [counter, setCounter] = useState<number>(valueStart);
    let [error, setError] = useState<string>('');
    let [textChangeValue, setTextChangeValue] = useState<string>('');
    let [disabledSet, setDisabledSet] = useState<boolean>(true);
    let [disabledRes, setDisabledRes] = useState<boolean>(true);
    let [disabledInc, setDisabledInc] = useState<boolean>(false);
    useEffect(() => {
        const savedStartValue = localStorage.getItem('startValue');
        const savedMaxValue = localStorage.getItem('maxValue');
        if (savedStartValue) setValueStart(JSON.parse(savedStartValue));
        if (savedMaxValue) setValueMax(JSON.parse(savedMaxValue));
    }, []);

    const textError = "Incorrect value!";
    const textValue = "enter values and press 'set'";
    const newValueStart = (newValue: number) => {
        setValueStart(newValue)
        if(newValue<0 || newValue>=valueMax) {
            setError(textError)
            setDisabledSet(true)
        } else {
            setError("")
            setTextChangeValue(textValue)
            setDisabledSet(false)
        }
    }
    const newValueMax = (newValue: number) => {
        setValueMax(newValue)
        if(newValue<=valueStart) {
            setError(textError)
            setDisabledSet(true)
        } else {
            setError("")
            setTextChangeValue(textValue)
            setDisabledSet(false)
            setDisabledRes(true)
        }
    }
    const increaseByOne = () => {
        setDisabledRes(false)
        if (counter < valueMax) {
            setCounter(++counter)
            if(counter === valueMax) setDisabledInc(true)
        }
    }
    const counterReset = () => {
        setCounter(counter = valueStart)
        setDisabledRes(true)
        setDisabledInc(false)
    }
    const addSettings = () => {
        setTextChangeValue("")
        setError("")
        setCounter(valueStart)
        setDisabledSet(true)
        setDisabledRes(true)
        setDisabledInc(false)
        localStorage.setItem('startValue', JSON.stringify(valueStart))
        localStorage.setItem('maxValue', JSON.stringify(valueMax))
    }
    const redClassCounter = counter === valueMax ? 'red-counter' : '';

    return (
        <ContainerMain>
            <SettingCounter disabledSet={disabledSet}
                            error={error}
                            addSettings={addSettings}
                            valueMax={valueMax}
                            valueStart={valueStart}
                            newValueMax={newValueMax}
                            newValueStart={newValueStart}/>
            <BoxCounter counter={counter}
                        error={error}
                        textChangeValue={textChangeValue}
                        redClassCounter={redClassCounter}
                        increaseByOne={increaseByOne}
                        counterReset={counterReset}
                        disabledInc={disabledInc}
                        disabledRes={disabledRes}/>
        </ContainerMain>
    );
}
export default App;

const ContainerMain = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`


