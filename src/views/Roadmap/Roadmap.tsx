import React from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Switch} from 'react-router-dom';
import HomeImage from '../../assets/img/background.jpg';
import { Grid , Container } from '@material-ui/core';



const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-blend-mode: overlay !important;
  }
`;


const Roadmap: React.FC = () => {
  return (
    <Switch>
      <Page>
      {/* <BackgroundImage /> */}
      <Container>   
              <Grid item xs={12} md={12} lg={12} >     
                  <h2 style={{ fontSize: '80px', textAlign:'center' }}>ROADMAP</h2>   

                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>It's important we build lasting utility into EGG & ESHARE in order to create a sustainable long term project, to do so we will be building out the platform's functionality into other areas of DeFi. As EGG is pegged to 0.01 BNB it allows us to use it in ways similar to how a stablecoin would such as for payments, borrowing & lending. <br></br><br></br>We're first & foremost a community led project & very receptive to suggestions as well as changes should the community see it as the best course of action. Below is where we'll be headed in the this year. </p>

                  <h2 style={{textAlign:'center', marginTop: '60px' }}>Q1</h2>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Renounce ownerships of All contracts ✅</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- User help guides in docs ✅</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Implement Zap contract for LPs ✅</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Start marketing blast & influencer partnerships ✅</p> 
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Starting Genesis Pool on March 14th 15:00 UTC. It will run for 2 days.</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Adding EGG-BNB liquidity on March 15th 15:00 UTC.</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Starting LP Reward Pool on March 15th 15:00 UTC. It will run for 9 days.</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Starting ESHARE Reward Pool on March 15th 15:00 UTC.</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Starting Boardroom on March 15th 15:00 UTC.</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Start weekly EGG burns from the DAO </p>   
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- ESHARE governance voting through snapshot </p>      
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Integrate weekly ESHARE raffle on site </p>                  
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- NFT drop for LPs & ESHARE hodlers providing exclusive access to new developments</p> 
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Launchpad & partnerships with projects to give exclusive benefits for ESHARE holders ✅</p>
                  
                  

                  <h2 style={{textAlign:'center', marginTop: '60px' }}>Q2</h2>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- UI/UX website revamp</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Chainlink integrations</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Implement bonding to secure protocol owned liquidity</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Auto repaying loans using yielding strategies</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Leveraged positions</p>                
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- NFT based p2e game & staking</p>

                  <h2 style={{textAlign:'center', marginTop: '60px' }}>Q3</h2>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Implement cross chain EGG liquidity</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Integrate EGG on large lending platforms as a stablecoin</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Yield strategies & aggregation of these integrations cross chain</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Partner with various projects in the ecosystem to improve token utilization in farms, lending/borrowing & exchange</p>
                  

                  <h2 style={{textAlign:'center', marginTop: '60px' }}>Q4</h2>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Dedicated mobile app for Goose Finance</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Partner with crypto payment gateways to accept EGG</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Partner with card provider</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Card/NFC payments using credit from collateral provided</p>
                  <p style={{ fontSize: '20px', textAlign:'center', color: '#fff' }}>- Payment rewards & cashback system</p>

              </Grid>
      </Container>
      </Page>
    </Switch>
  );
};

export default Roadmap;
