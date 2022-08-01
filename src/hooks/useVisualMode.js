import {useState} from 'react'

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 
    
    
  function transition(newMode, replace=false) {
    if (replace === false) {
       setHistory((prev) => [...prev, newMode]);
    } else {
       setHistory((prev) => [...prev.slice(0, prev.length - 1),
       newMode,]);
        }
    }
          
  function back() {
    if(history.length > 1){
      setHistory((prev) => prev.slice(0, -1))
    }
   }
    return { mode:history[history.length-1], transition, back };
}