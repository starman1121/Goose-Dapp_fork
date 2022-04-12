import React from 'react';

//Graveyard ecosystem logos
import bombLogo from '../../assets/img/egg.png';
import tShareLogo from '../../assets/img/eshares.png';
import bombLogoPNG from '../../assets/img/egg.png';
import xbulLogo from '../../assets/img/xbul.png';

import tShareLogoPNG from '../../assets/img/eshares.png';
import tBondLogo from '../../assets/img/ebond.png';

import bombFtmLpLogo from '../../assets/img/bomb-bitcoin-LP.png';
import bulshareFtmLpLogo from '../../assets/img/eshare-bnb-LP.png';
import usdcLogo from '../../assets/img/USDC.png';
import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';
import dogeLogo from '../../assets/img/DOGE-icon.png';
import ethLogo from '../../assets/img/ETH-icon.png';
import ShibaLogo from '../../assets/img/SHIBA-icon.png';
import FtmLogo from '../../assets/img/WFTM.png';
import BusdLogo from '../../assets/img/BUSD.png';
const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  EGG: bombLogo,
  BULPNG: bombLogoPNG,
  ESHAREPNG: tShareLogoPNG,
  XBUL: xbulLogo,
  ESHARE: tShareLogo,
  EBOND: tBondLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIB: ShibaLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  DOGE: dogeLogo,
  ETH: ethLogo,
  USDC: usdcLogo,
  FTM: FtmLogo,
  BUSD: BusdLogo,
  'EGG-BNB-LP': bombFtmLpLogo,
  'EGG-BTCB-LP': bombFtmLpLogo,
  'ESHARE-BNB-LP': bulshareFtmLpLogo,
  'ESHARE-BNB-APELP': bulshareFtmLpLogo,
  'EGG-BTCB-APELP': bombFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 90}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
