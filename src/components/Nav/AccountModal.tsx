import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useBulFinance from '../../hooks/useBulFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';

const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const bombFinance = useBulFinance();

  const bombBalance = useTokenBalance(bombFinance.EGG);
  const displayBulBalance = useMemo(() => getDisplayBalance(bombBalance, 18, 2), [bombBalance]);

  const bulshareBalance = useTokenBalance(bombFinance.ESHARE);
  const displayBULshareBalance = useMemo(() => getDisplayBalance(bulshareBalance, 18, 2), [bulshareBalance]);

  const bbondBalance = useTokenBalance(bombFinance.EBOND);
  const displayBbondBalance = useMemo(() => getDisplayBalance(bbondBalance, 18, 2), [bbondBalance]);

    const xbulBalance = useTokenBalance(bombFinance.XBUL);
  const displayXbulBalance = useMemo(() => getDisplayBalance(xbulBalance, 18, 2), [xbulBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="EGG" />
          <StyledBalance>
            <StyledValue>{displayBulBalance}</StyledValue>
            <Label text="EGG Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="ESHARE" />
          <StyledBalance>
            <StyledValue>{displayBULshareBalance}</StyledValue>
            <Label text="ESHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
        {/* <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="XBUL" />
          <StyledBalance>
            <StyledValue>{displayXbulBalance}</StyledValue>
            <Label text="XBUL Available" />
          </StyledBalance>
        </StyledBalanceWrapper> */}
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="EBOND" />
          <StyledBalance>
            <StyledValue>{displayBbondBalance}</StyledValue>
            <Label text="EBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
