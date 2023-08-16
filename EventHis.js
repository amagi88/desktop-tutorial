import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';

// const web3 = new Web3(window.ethereum);
// const contractABI = MyContract.abi;
// const networkId = await web3.eth.net.getId();
// const contractAddress = MyContract.networks[networkId].address;
// //const contractAddress = '0x4845D3370e0516B214EE2C0034F16604934D0D9c';
// const instance = new web3.eth.Contract(contractABI, contractAddress);


function EventHis ({ account }) {

   
  return (
    <body>
        <h1>イベント履歴</h1>
        <p>Current Account: {account}</p>
        <Link to="/">
                <button>戻る</button>
        </Link>
    </body>
  );
};

export default EventHis;