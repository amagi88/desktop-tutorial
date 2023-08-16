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


function MyPage (props) {
    const [address, setAddress] = useState('0x69566715402f4cc9d8410C9eFe5b6e29e83C1D0f');
    const [token, setToken] = useState('');
    const [ETH, setEth] = useState('');
    const [add, setAdd] = useState(address)

    // useEffect(() => {
    //     async function checkbalance() {
    //         const balance = await setAddress(props.account)
    //         instance.methods.balanceOf(address).call().then((resolve) =>{
    //             setToken(JSON.parse(resolve));
    //               });
    //     }
    //     checkbalance();
    //     console.log(props);
    // }, [props.account]);
    useEffect(() => {
        web3.eth.getBalance(address).then((resolve) =>{
           const balanceEth = web3.utils.fromWei(resolve, 'ether');
           setEth(balanceEth);
        });
    }, [props.account]);
   
  return (
    <body>
        <h1></h1>
        <div>
            <p>Current Account: {address}</p>
            <p>Current Account: {add}</p>
            <p>手持ちトークン:{token}</p>
            <p>手持ちETH:{ETH}</p>
        </div>
        <div>
            <Link to="/eventregister">
                <button>イベント登録ページ</button>
            </Link>
            <Link to="/eventhistory">
                <button>イベント履歴</button>
            </Link>
            <Link to="/goodsregister">
                <button>景品登録</button>
            </Link>
            <Link to="/buy">
                <button>トークン購入</button>
            </Link>
        </div>
    </body>
  );
};

export default MyPage;