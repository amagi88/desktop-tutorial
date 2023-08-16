import './App.css';
import React, { useEffect,useState } from 'react';
import { BrowserRouter, Router, Switch, Route, Routes} from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';
import MPage from './MyPage.js';
import EPage from './EventPage.js';
import EHis from './EventHis.js';
import GPage from './GoodsPage.js';
import BPage from './BuyPage.js';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const networkId = await web3.eth.net.getId();
const contractAddress = MyContract.networks[networkId].address;
//const contractAddress = '0x4845D3370e0516B214EE2C0034F16604934D0D9c';
const instance = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const [Account, setAccount] = useState('');



  //アカウントの所属判定
  useEffect(() => {
    const GetA = () => {
      web3.eth.getAccounts().then((resolve) => {
        setAccount(resolve[0]);
      });
    }
    GetA();
  });

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
    };
  // アカウントの変更を購読
  window.ethereum.on('accountsChanged', handleAccountsChanged);
  return () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }}
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MPage account={Account} />} />
            <Route path="/eventregister" element={<EPage account={Account} />} />
            <Route path="/eventhistory" element={<EHis account={Account} />} />
            <Route path="/goodsregister" element={<GPage account={Account} />} />
            <Route path="/buy" element={<BPage account={Account} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
