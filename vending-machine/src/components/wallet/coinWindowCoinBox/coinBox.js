import { getWonTemplate } from '../../../helper/utils';
import { StyledCoinBoxWrapper, StyledCoinBox } from './coinBox.styled';
import { WalletContext } from '../../../context/walletProvider';
import { useContext } from 'react';
import { InputMoneyContext } from '../../../context/inputMoneyProvider';
import { LogContext } from '../../../context/logProvider';

export function CoinBox({ coinInfo }) {
  const { decrementCoin } = useContext(WalletContext);
  const { setInputMoney } = useContext(InputMoneyContext);
  const { logInputMoney } = useContext(LogContext);

  async function handleClick() {
    if (coinInfo.quantity > 0) {
      await decrementCoin(coinInfo.id, 1);
      setInputMoney(inputMoney => inputMoney + coinInfo.coin);
      logInputMoney(coinInfo.coin);
    }
  }

  return (
    <StyledCoinBoxWrapper>
      <StyledCoinBox onClick={handleClick}>{getWonTemplate(coinInfo.coin)}</StyledCoinBox>
      <StyledCoinBox onClick={handleClick}>{`${coinInfo.quantity}개`}</StyledCoinBox>
    </StyledCoinBoxWrapper>
  );
}
