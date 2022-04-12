import {useCallback} from 'react';
import useBulFinance from '../useBulFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapEBondToEShare = () => {
  const bombFinance = useBulFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapEShare = useCallback(
    (bbondAmount: string) => {
      const bbondAmountBn = parseUnits(bbondAmount, 18);
      handleTransactionReceipt(bombFinance.swapEBondToEShare(bbondAmountBn), `Swap ${bbondAmount} EBond to EShare`);
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onSwapEShare: handleSwapEShare};
};

export default useSwapEBondToEShare;
