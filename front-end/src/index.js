import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Proposal from './components/Proposal';
import Proposals from './components/Proposals';
import CreateProposal from './components/CreateProposal';
import Header from './components/Header';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.ropsten],
  [
    alchemyProvider({ alchemyId: process.env.INFURA_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Alfred',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}
      theme={darkTheme({
        accentColor: '#fdf6e3',
        accentColorForeground: '#586e75',
        borderRadius: 'medium',
        fontStack: 'system',
      })}
    >
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="proposals" element={<Proposals />}/>
          <Route path="proposals/proposal/:proposalId" element= {<Proposal />}/>
          <Route path="create-a-proposal" element={<CreateProposal />}/>
        </Routes>
      </BrowserRouter>
     </RainbowKitProvider>
   </WagmiConfig>
);

reportWebVitals();