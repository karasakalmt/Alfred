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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="proposals" element={<Proposals />}/>
      <Route path="proposals/proposal/:proposalId" element= {<Proposal />}/>
      <Route path="create-a-proposal" element={<CreateProposal />}/>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();