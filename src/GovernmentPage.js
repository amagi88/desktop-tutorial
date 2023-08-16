import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import MyContract from './build/SightseeingToken.json';

const web3 = new Web3(window.ethereum);
const contractABI = MyContract.abi;
const networkId = await web3.eth.net.getId();
const contractAddress = MyContract.networks[networkId].address;
//const contractAddress = '0x4845D3370e0516B214EE2C0034F16604934D0D9c';
const instance = new web3.eth.Contract(contractABI, contractAddress);


function GovernmentPage ({ account }) {
    const [token, setToken] = useState('');
    const [amount, setAmount] = useState('');
    const [eventName, setEve] = useState('');
    const [reward, setRew] = useState('');
    const [participants, setPart] = useState([]);
    const [to, setTo] = useState('');
    const [eventId, setEventID] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [address, setAddress] = useState('');
    const [goodsname, setGoodsname] = useState('');
    const [price, setPrice] = useState(0);
    const [from, setFrom] = useState('');
    //トークン手持ちの問い合わせ
    useEffect(() => {
        instance.methods.balanceOf(account).call().then((resolve) =>{
            setToken(JSON.parse(resolve));
          });
    },[account]);

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
    const goods_ope = ((e) => {
        //e.preventDefault();
        instance.methods.goodsope(true, 'aaa', 3).send({from:account}).then(() => {
            alert('完了');
        }).catch((err) => {
            alert('入力が不正です');
        });
    });
    const token_request = ((e) => {
        e.preventDefault();
        if (amount<100 || amount%100!==0) {
            alert('入力が不正です1');
        }else {
            instance.methods.request(to,amount).send({from:account, value:amount/100*10**18}).then((resolve) => {
                alert('完了');
            }).catch(() => {
                alert('入力が不正です');
            });
        }
    });
    const token_retrieve = ((e) => {
        e.preventDefault();
        instance.methods.retrieve(address).send({from:account}).then((resolve) => {
            alert('取り消し完了');
        }).catch((err) => {
            alert('失敗');
        });
    });
    const accept = ((e) => {
        e.preventDefault();
        instance.methods.accept(from).send({from:account}).then((resoleve) => {
            alert('受諾完了');
        }).catch((err) => {
            alert(err);
        });
    });

  return (
    <body>
        <h1>Government Page</h1>
        <div>
            <p>Current Account: {account}</p>
            <p>手持ちトークン:{token}</p>
        </div>
        <div>
            <h2>イベント関連</h2>
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
        </div>
        <div>
            <h2>特産品</h2>
            <select value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value)}}>
            <option value="">選択してください</option>
            <option value="true">登録</option>
            <option value="false">削除</option>
            </select>
            <br></br><input type="text" placeholder="特産品の名前" value={goodsname} onChange={(e)=>{setGoodsname(e.target.value);}}/>
            <br></br>{selectedOption==='true' ? (<input type="number" placeholder="報酬" value={price} onChange={(e)=>{setPrice(e.target.value);}}/>):('')}
            <button type="button" onClick={goods_ope}>追加</button>
        </div>
    </body>
  );
};

export default GovernmentPage;