import { StyledContainer, StyledBtn } from './swtichBox.styled';
import { useLocation, useNavigate } from 'react-router-dom';

export function SwitchBox() {
  const navigate = useNavigate();
  const location = useLocation();

  function clickVendingMachine() {
    navigate('/fe-vm');
  }

  function clickWallet() {
    navigate('/myWallet');
  }

  return (
    <StyledContainer>
      <StyledBtn onClick={clickVendingMachine} select={location.pathname === '/'}>
        자판기
      </StyledBtn>
      <StyledBtn onClick={clickWallet} select={location.pathname === '/myWallet'}>
        지갑
      </StyledBtn>
    </StyledContainer>
  );
}
