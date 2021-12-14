import CounterHooks from "./CounterHooks";
import {useState} from "react";
import React from "react";

export const ThemeContext = React.createContext();

function App() {
    const [theme,setTheme] = useState('red');
    return (
        <ThemeContext.Provider value={{background:theme}}>
            <CounterHooks initialCount={0}/>
            <button onClick={()=>{
                setTheme(prevState => {
                    return prevState === 'red' ? 'blue' : 'red';
                })
            }}>Toggle Theme</button>
        </ThemeContext.Provider>
    );
}

export default App;
