import React, {useContext, useState} from "react";
import {ThemeContext} from "./App";
const CounterHooks = (props) => {
    const [state,setState] = useState(0);
    const theme = useContext(ThemeContext);
    return (
    <div>
        CounterHooks
        <button style={ theme } onClick={() => {
            setState((prevState)=>prevState -1)
        }}>
            -
        </button>
        <span>{state}</span>
        <button style={theme } onClick={()=>{
            setState((prevState) => prevState + 1)
        }}>+</button>
    </div>
    );
}

export  default  CounterHooks;