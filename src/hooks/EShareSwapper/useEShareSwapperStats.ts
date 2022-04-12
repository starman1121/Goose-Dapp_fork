import {useEffect, useState} from 'react';
import useBulFinance from '../useBulFinance';
import {EShareSwapperStat} from '../../bomb-finance/types';
import useRefresh from '../useRefresh';

const useEShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<EShareSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const bombFinance = useBulFinance();

  useEffect(() => {
    async function fetchEShareSwapperStat() {
      try {
        if (bombFinance.myAccount) {
          setStat(await bombFinance.getEShareSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchEShareSwapperStat();
  }, [setStat, bombFinance, fastRefresh, account]);

  return stat;
};

export default useEShareSwapperStats;
