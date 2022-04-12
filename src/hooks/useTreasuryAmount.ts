import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useBulFinance from './useBulFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const bombFinance = useBulFinance();

  useEffect(() => {
    if (bombFinance) {
      const {Treasury} = bombFinance.contracts;
      bombFinance.EGG.balanceOf(Treasury.address).then(setAmount);
    }
  }, [bombFinance]);
  return amount;
};

export default useTreasuryAmount;
