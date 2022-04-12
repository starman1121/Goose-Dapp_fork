import {useCallback, useEffect, useState} from 'react';
import useBulFinance from '../useBulFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimateEShare = (bbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const bombFinance = useBulFinance();

  const estimateAmountOfEShare = useCallback(async () => {
    const bbondAmountBn = parseUnits(bbondAmount);
    const amount = await bombFinance.estimateAmountOfEShare(bbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfEShare().catch((err) => console.error(`Failed to get estimateAmountOfEShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfEShare]);

  return estimateAmount;
};

export default useEstimateEShare;
