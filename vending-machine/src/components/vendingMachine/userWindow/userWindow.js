import { getWonTemplate } from '../../../helper/utils';
import {
  StyledUserWindowContainer,
  StyledInputMoneyMonitorWrapper,
  StyledInputMoneyMonitor,
  StyledInputBoxWrapper,
  StyledInputBox,
  StyledRepaymentBtn,
} from './userWindow.styled';
import { useContext, useEffect } from 'react';
import { LogMonitor } from '../userWindowLogMonitor/logMonitor';
import { PAYBACK_TIME } from '../../../common/constants';
import { InputMoneyContext } from '../../../context/inputMoneyProvider';
import { LogContext } from '../../../context/logProvider';
import { ProgressContext } from '../../../context/progressProvider';
import { PaybackTimerContext } from '../../../context/paybackTimerProvider';
import { WalletContext } from '../../../context/walletProvider';

export function UserWindow() {
  const { inputMoney, setInputMoney } = useContext(InputMoneyContext);
  const { logInputMoney, logPayback } = useContext(LogContext);
  const { inProgress } = useContext(ProgressContext);
  const { paybackTimer, startPaybackTimer, stopPaybackTimer } = useContext(PaybackTimerContext);
  const { walletInfo, decrementCoin, incrementCoin, putServerCoins } = useContext(WalletContext);

  useEffect(() => {
    if (inputMoney === 0) return;
    if (inProgress) {
      stopPaybackTimer();
      return;
    }
    startPaybackTimer(PAYBACK_TIME, doPaybackProcess);
  }, [inputMoney, inProgress]);

  function handleKeyPress(e) {
    if (inProgress) return;
    if (e.key !== 'Enter') return;
    if (e.target.value <= 0) return;
    const inputValue = e.target.value.replace(',', '');
    doMoneyInputProcess(Number(inputValue));

    e.target.value = null;
  }

  function handleInputChange(e) {
    const changedValue = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (changedValue > 0) {
      e.target.value = changedValue.toLocaleString();
    }
  }

  function doMoneyInputProcess(keyboardInputMoney) {
    const currentPossibleCoinObj = getPossibleCoin(keyboardInputMoney);
    const currentInputMoney = getCurrentInputMoney(currentPossibleCoinObj);
    takeMoneyOutOfWallet(currentPossibleCoinObj);
    setInputMoney(inputMoney => inputMoney + currentInputMoney);
    logInputMoney(currentInputMoney);
  }

  function getPossibleCoin(inputMoney) {
    let changedMoney;
    // 1의 자리 제거
    changedMoney = Math.floor(inputMoney / 10) * 10;

    const possibleCoinObj = {
      10: 0,
      100: 0,
      500: 0,
      1000: 0,
      5000: 0,
      10000: 0,
    };

    for (let i = walletInfo.length - 1; i >= 0; i--) {
      let curCoin = walletInfo[i].coin;
      if (curCoin > changedMoney) continue;

      let requiredNumOfCurCoin = Math.floor(changedMoney / curCoin);
      let possibleNumOfCurCoin =
        requiredNumOfCurCoin > walletInfo[i].quantity ? walletInfo[i].quantity : requiredNumOfCurCoin;
      possibleCoinObj[curCoin] = possibleNumOfCurCoin;
      changedMoney -= curCoin * possibleNumOfCurCoin;
    }

    return possibleCoinObj;
  }

  function takeMoneyOutOfWallet(coinObj) {
    for (let coin in coinObj) {
      let requiredNum = coinObj[coin];
      for (let i = 0; i < requiredNum; i++) {
        decrementCoin(Number(coin));
      }
    }
  }

  function getCurrentInputMoney(coinObj) {
    let currentInputMoney = 0;
    for (let coin in coinObj) {
      let requiredNum = coinObj[coin];
      currentInputMoney += coin * requiredNum;
    }
    return currentInputMoney;
  }

  function handleClickRepaymentBtn() {
    if (paybackTimer.current !== null) {
      stopPaybackTimer();
      startPaybackTimer(PAYBACK_TIME / 2, doPaybackProcess);
    }
  }

  function doPaybackProcess() {
    putMoneyInWallet(inputMoney);
    logPayback(inputMoney);
    setInputMoney(0);
  }

  function putMoneyInWallet(currentInputMoney) {
    let changedMoney = currentInputMoney;

    for (let i = walletInfo.length - 1; i >= 0; i--) {
      let curCoin = walletInfo[i].coin;
      if (curCoin > changedMoney) continue;

      let possibleNumOfCurCoin = Math.floor(changedMoney / curCoin);
      for (let i = 0; i < possibleNumOfCurCoin; i++) {
        incrementCoin(curCoin);
      }
      changedMoney -= curCoin * possibleNumOfCurCoin;
    }
  }

  return (
    <StyledUserWindowContainer>
      <StyledInputMoneyMonitorWrapper>
        <p>투입된 금액</p>
        <StyledInputMoneyMonitor>{getWonTemplate(inputMoney)}</StyledInputMoneyMonitor>
      </StyledInputMoneyMonitorWrapper>
      <StyledInputBoxWrapper>
        <StyledInputBox placeholder="금액을 입력하세요." onKeyPress={handleKeyPress} onChange={handleInputChange} />
        <p>(원)</p>
      </StyledInputBoxWrapper>
      <StyledRepaymentBtn onClick={handleClickRepaymentBtn}>반환</StyledRepaymentBtn>
      <LogMonitor />
    </StyledUserWindowContainer>
  );
}
