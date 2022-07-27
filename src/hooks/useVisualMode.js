import React, {useState} from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
    
    
  function transition(newMode, replace=false) {
    if (replace === false) {
       setHistory((history) => [...history, newMode]);
    } else {
       let copyHistory = [...history];
       setHistory((history) => [...copyHistory.slice(0, copyHistory.length - 1),
       newMode,]);
        }
        setMode(newMode);
    }
          
  function back() {
    setHistory((history) => {
    let copyHistory = [...history];
    if (copyHistory.length === 1) {
      return copyHistory;
      } else {
        copyHistory.pop();
        setMode(copyHistory[copyHistory.length - 1]);
        return copyHistory;
        }
    });
   }
    return { mode, transition, back };
}