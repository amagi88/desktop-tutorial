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


function EventPage ({ account }) {
  const [eventName, setEve] = useState('');
  const [reward, setRew] = useState('');
  const [participants, setPart] = useState([]);
  const [eventId, setEventID] = useState('');

  const registerEve = ((e) => {
    instance.methods.EventRegister(eventName, parseInt(reward,10)).send({from:account}).then((resolve) => {
        alert("イベント登録が完了しました");
    }).catch((err) => {
        alert("入力が不正");
    });
});
const provide = ((e) => {
  instance.methods.provide_token(Number(eventId), participants).send({from:account}).then((resolve) => {
      alert("トークン配布が完了しました");
  }).catch(() => {
      alert("入力が不正");
  });
});
   
  return (
    <body>
        <h1>イベント登録ページ</h1>
        <p>Current Account: {account}</p>
        <div>
            <h3>イベントの登録</h3>               
            <input type="text" id="task-input" placeholder="イベントの名前" value={eventName} onChange={(e)=>{setEve(e.target.value);}}/>
            <input type="number" id="task-input" placeholder="報酬" value={reward} onChange={(e)=>{setRew(e.target.value);}}/>
            <button type="button" onClick={registerEve}>追加</button>      
        </div>
        <div>
            <h3>トークン配布</h3>
            <input type='text' id='provision' placeholder='イベント番号' value={eventId} onChange={(e) => {setEventID(e.target.value);}}/>
            <input type='text' id='provision' placeholder='アドレス'value={participants} onChange={(e) => {setPart(e.target.value.split(','));}}/>
            <button type="button" onClick={provide}>追加</button>
        </div>
        <div>
          <p>開催中のイベント一覧</p>
        </div>
        <Link to="/">
                <button>戻る</button>
        </Link>
    </body>
  );
};

export default EventPage;