import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const networkId = await web3.eth.net.getId();
const contractAddress = MyContract.networks[networkId].address;
//const contractAddress = '0x4845D3370e0516B214EE2C0034F16604934D0D9c';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function BuyPage ({ account }) {
    const [ETH, setEth] = useState(0)

    const Buy = (e) => {
        instance.methods.Buy_token().send({from:account, value:10**18*ETH/1000}).then((res) => {
            alert('購入が完了しました！');
            setEth(0);
        }).catch((err) => {
            alert('エラーが発生しました');
            setEth(0);
        })

    }
   
  return (
    <body>
        <div>
        <h1>トークン購入ページ</h1>
        </div>
        <div>
            <h2>トークン購入</h2>
            <input type="number" id="task-input" placeholder="購入トークン数を入力してください" step='1000' value={ETH} onChange={(e)=>{setEth(e.target.value);}}/>
            <button type="button" onClick={Buy}>追加</button>  
        </div>
        <p>Current Account: {account}</p>
        <Link to="/">
                <button>戻る</button>
        </Link>
    </body>
  );
};

export default BuyPage;