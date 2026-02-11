import { createContext, useState, useEffect } from "react";

export const PredictionContext = createContext();

export const PredictionProvider = ({children}) => {

  // Load from localStorage
  const [prediction,setPrediction] = useState(() => {
    const saved = localStorage.getItem("prediction");
    return saved ? JSON.parse(saved) : null;
  });

  // Save whenever updated
  useEffect(()=>{
    if(prediction){
      localStorage.setItem("prediction", JSON.stringify(prediction));
    }
  },[prediction]);

  return (
    <PredictionContext.Provider value={{prediction,setPrediction}}>
      {children}
    </PredictionContext.Provider>
  );
};
