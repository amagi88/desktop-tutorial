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


function GoodsPage ({ account }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setprice] = useState('');
  const [id, setid] = useState('');

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  const registergoods = (e) => {
    instance.methods.register_Goods(price).send().then((res) => {
      //DB登録処理
      setprice('');
      setSelectedImage(null);
      setName('');
    }).catch((err) => {
      alert('エラーが起きました');
    })
  }
  const rmgoods = (e) => {
    //削除処理

  }
   
  return (
    <body>
      <div>
        <h1>景品登録ページ</h1>
        <p>Current Account: {account}</p>
      </div>
      <div>
            <h2>景品登録</h2>
            <input type="text" id="task-input" placeholder="名前を入力" value={name} onChange={(e) => {setName(e.target.value);}}/>
            <input type="number" id="task-input" placeholder="価格を入力" value={price} onChange={(e) => {setprice(e.target.value);}}/>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <img selectedImage alt="Image" />
            <button type="button" onClick={registergoods}>登録</button>
            <h2>景品削除</h2>
            <input type="number" id="task-input" placeholder="削除する景品のID" value={id} onChange={(e) => {setid(e.target.value);}}/>
            <button type="button" onClick={rmgoods}>削除</button>
      </div>
      <div>
        <p>現在の特産品一覧</p>
      </div>
      <div>
        <Link to="/">
                <button>戻る</button>
        </Link>
        </div>
    </body>
  );
};

export default GoodsPage;