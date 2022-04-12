import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useBulStats from '../../hooks/useBulStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebulshareStats from '../../hooks/usebulshareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Bul as bombTesting, EShare as bulshareTesting } from '../../bomb-finance/deployments/deployments.testing.json';
import { Egg as bombProd, EShare as bulshareProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import BUL_BNBZapModal from '../Bank/components/BUL_BNBZapModal';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import useBulFinance from '../../hooks/useBulFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet'
import BulImage from '../../assets/img/goose.png';

import kycLogo from '../../assets/img/KYC_assure.png';
import HomeImage from '../../assets/img/background.jpg';

export const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    // background-blend-mode: overlay;
    background-color: #404040 !important;

  }
`;
const TITLE = 'goosefinance.xyz | BNB pegged algocoin'

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const bombFtmLpStats = useLpStats('EGG-BNB-LP');
  const bulshareFtmLpStats = useLpStats('ESHARE-BNB-LP');
  const bombStats = useBulStats();
  const bulshareStats = usebulshareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBulFinance();

  let bomb;
  let eshare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    bomb = bombTesting;
    eshare = bulshareTesting;
  } else {
    bomb = bombProd;
    eshare = bulshareProd;
  }

  const buyEggAddress =
     'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=' +
    // 'https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=' +
    bomb.address;
  // https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyEShareAddress = 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=0xD30619724d3cB74491C86D269501A53c6004819a';
  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bulshareLPStats = useMemo(() => (bulshareFtmLpStats ? bulshareFtmLpStats : null), [bulshareFtmLpStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);

  // console.log('debug=> circluating supply', bombCirculatingSupply, bombPriceInDollars)
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bulsharePriceInDollars = useMemo(
    () => (bulshareStats ? Number(bulshareStats.priceInDollars).toFixed(2) : null),
    [bulshareStats],
  );
  const bulsharePriceInBNB = useMemo(
    () => (bulshareStats ? Number(bulshareStats.tokenInFtm).toFixed(4) : null),
    [bulshareStats],
  );
  const bulshareCirculatingSupply = useMemo(
    () => (bulshareStats ? String(bulshareStats.circulatingSupply) : null),
    [bulshareStats],
  );
  const bulshareTotalSupply = useMemo(() => (bulshareStats ? String(bulshareStats.totalSupply) : null), [bulshareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'EGG-BNB-LP' });
  const bulshareLpZap = useZap({ depositTokenName: 'ESHARE-BNB-LP' });

  const [onPresentBulZap, onDissmissBulZap] = useModal(
    <BUL_BNBZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBulZap();
      }}
      tokenName={'EGG-BNB-LP'}
    />,
  );

  const [onPresentBULshareZap, onDissmissBULshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bulshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBULshareZap();
      }}
      tokenName={'ESHARE-BNB-LP'}
    />,
  );

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
        >
          {/* <img src={BulImage} alt='goosefinance.xyz' style={{ maxHeight: '240px' }} /> */}
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center' }}>
              <h2>Welcome to GOOSE</h2>
              <p>
              EGG is an algocoin which is designed to follow price of BNB. Enjoy high yields and reduce carbon footprint at the same time. For each LP token created Goose Finance plants 10 trees! High yields normally only found on high risk assets, but with exposure to BNB instead!
              </p>
              <p>
              Imagine EGG printing and Planting trees at same time? Your wish is granted.
              </p>
              
              <p>
                <strong>EGG is pegged via algorithm to a 100:1 ratio to BNB.</strong>
                {/* Stake your EGG-BTC LP in the Farm to earn ESHARE rewards. Then stake your earned ESHARE in the
                Boardroom to earn more EGG! */}
              </p>

              <Alert variant="filled" color="info" severity="info">
                <h4>Genesis pools are active now!. It will end on March 16th 15:00 UTC.</h4>
              </Alert>
              {/* <p>
                <a href="https://www.assuredefi.io/projects/goosefinance/"  className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                KYC processed by
                <img alt="KYC logo" src={kycLogo} height="40px" style={{verticalAlign:"middle"}} />
              </a>
              </p> */}
            </Box>
          </Paper>
        </Grid>
{/* 
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} justify="center" style={{ margin: '12px', display: 'flex' }}>

            <Alert variant="filled" severity="info" style={{"background":"#250f0d"}}>
              <h2>EGG STAKING IS LIVE!</h2>
              <h4>
                Get your xEGG now by staking EGG.   <Button href="/xbul" className="shinyButton" style={{ margin: '10px' }}>
                  Get xEGG
                </Button>
              </h4>

            </Alert>

          </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center">
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button  href="/boardroom" className="shinyButton" style={{ margin: '10px' }}>
                Stake Now
              </Button>
              <Button  href="/farm" className="shinyButton" style={{ margin: '10px' }}>
                Farm Now
              </Button>
              <Button 
                target="_blank"
                href={buyEggAddress}
                style={{ margin: '10px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy EGG
              </Button>
              <Button 
                target="_blank"
                href={buyEShareAddress}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                Buy ESHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* EGG */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EGG" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('EGG');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>EGG</h2>
              100 EGG (1.0 Peg) =
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>{bombPriceInBNB ? bombPriceInBNB : '-.----'} BNB</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / EGG
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(bombCirculatingSupply * bombPriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(bombCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bombTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* ESHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('ESHARE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ESHARE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>ESHARE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {bulsharePriceInBNB ? bulsharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${bulsharePriceInDollars ? bulsharePriceInDollars : '-.--'} / ESHARE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((bulshareCirculatingSupply * bulsharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(bulshareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(bulshareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* EBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  bombFinance.watchAssetInMetamask('EBOND');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EBOND" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>EBOND</h2>
              100 EBOND
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / EBOND</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="EGG-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>EGG-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentBulZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bombLPStats?.tokenAmount ? bombLPStats?.tokenAmount : '-.--'} EGG /{' '}
                  {bombLPStats?.ftmAmount ? bombLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bombLPStats?.priceOfOne ? bombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${bombLPStats?.totalLiquidity ? roundAndFormatNumber(bombLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {bombLPStats?.totalSupply ? roundAndFormatNumber(bombLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="ESHARE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>ESHARE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentBULshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {bulshareLPStats?.tokenAmount ? bulshareLPStats?.tokenAmount : '-.--'} ESHARE /{' '}
                  {bulshareLPStats?.ftmAmount ? bulshareLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${bulshareLPStats?.priceOfOne ? bulshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {bulshareLPStats?.totalLiquidity ? roundAndFormatNumber(bulshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {bulshareLPStats?.totalSupply ? roundAndFormatNumber(bulshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
            
    </Page>
  );
};

export default Home;
