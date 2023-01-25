import { createContext, useRef } from 'react';

export const PaybackTimerContext = createContext(null);

export function PaybackTimerProvider({ children }) {
  const paybackTimer = useRef(null);

  const startPaybackTimer = (time, callback) => {
    paybackTimer.current = setTimeout(() => {
      callback();
    }, time);
  };

  const stopPaybackTimer = () => {
    clearTimeout(paybackTimer.current);
  };

  return (
    <PaybackTimerContext.Provider value={{ paybackTimer, startPaybackTimer, stopPaybackTimer }}>
      {children}
    </PaybackTimerContext.Provider>
  );
}
