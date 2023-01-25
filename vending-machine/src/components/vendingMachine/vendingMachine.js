import { StyledVMContainer } from './vendingMachine.styled';
import { ShowWindow } from './showWindow/showWindow';
import { UserWindow } from './userWindow/userWindow';
import { SwitchBox } from '../switchBox/switchBox';

export function VendingMachine() {
  return (
      <>
        <SwitchBox />
        <StyledVMContainer>
          <ShowWindow />
          <UserWindow />
        </StyledVMContainer>
    </>
  );
}
