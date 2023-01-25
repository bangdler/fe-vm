import { createContext, useState } from 'react';
import { getWonTemplate } from '../helper/utils';

export const LogContext = createContext([]);

export function LogProvider({ children }) {
  const [logList, setLogList] = useState([]);

  const logChoose = name => {
    const log = `${name} 선택됨.`;
    setLogList(logList => [...logList, log]);
  };

  const logSoldOut = name => {
    const log = `${name} 품절됨.`;
    setLogList(logList => [...logList, log]);
  };

  const logDrop = name => {
    const log = `${name} 덜커덩`;
    setLogList(logList => [...logList, log]);
  };

  const logPayback = money => {
    const log = `${getWonTemplate(money)} 반환됨.`;
    setLogList(logList => [...logList, log]);
  };

  const logInputMoney = money => {
    const log = `${getWonTemplate(money)} 투입됨.`;
    setLogList(logList => [...logList, log]);
  };
  return (
    <LogContext.Provider value={{ logList, logChoose, logSoldOut, logDrop, logPayback, logInputMoney }}>
      {children}
    </LogContext.Provider>
  );
}
