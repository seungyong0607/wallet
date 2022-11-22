// import { Component } from './core/Component.js';
// import { store } from './store.js';
import Header from "./components/Header.js";
import RouterView from "./components/RouterView.js";
import Footer from "./components/Footer.js";

import LoginPage from "./page/LoginPage.js";
import AssetPage from "./page/AssetPage.js";
import NftPage from "./page/NftPage.js";
import TransferPage from "./page/TransferPage.js";
import HistoryPage from "./page/HistoryPage.js";

import { routeInit, routeChange } from "./util/router.js";
import { createElement } from "./util/createElement.js";


import { request } from "./api/api.js";
import { setItem, getItem, removeItem } from "./util/storage.js";

export default class App {
  $app;
  $header;
  $routeView;
  $footer;
  #state;

  constructor({ $app }) {
    this.$app = $app;
    const $header = createElement('header');
    this.$routeView = createElement('routeView');
    this.$footer = createElement('footer');
    this.#state = {
      userInfo: null,
      balance: null,
      tokens: null,
      accessToken: null,
    }

    this.$header = new Header($header, { logout: this.logout })
    new RouterView(this.$routeView);
    new Footer(this.$footer);

    this.$app.appendChild($header);
    this.$app.appendChild(this.$routeView);
    this.$app.appendChild(this.$footer);

    const $modal = document.createElement('div');
    $modal.innerHTML = `
      <div class="modal-window">
        <img src="/public/loding.gif" />
      </div>
    `;
    $modal.id = 'modal';
    $modal.classList.add('modal-overlay');
    $modal.style.display = 'none';

    this.$app.appendChild($modal);


    this.init();

    routeInit(this.route); // router 등록
    this.route();
  }

  async transferToken() {
    const receiver = document.querySelector('#getReceiver').innerText;
    const amount = document.querySelector('.inputNumber').value;

    const token = getItem('accessToken');
    // 'shleeb@sandboxnetwork.net',
    console.log('this.#state.balance[2]', this.#state.balance)
    const data = await request("/user/tx/send", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: this.#state.balance.amount[2].Serviceid,
        Receiver: receiver,
        Amount: Number(amount),
      }),
    });

    if(data.status == 200){
      alert('전송 완료');
      routeChange('/history');
    }
  }

  async useRefreshToken() {
    const token = getItem('refreshToken');

    try {
      if (token != '') {
        const data = await request('/auth/renew', {
          method: "GET",
          headers: {
            authorization: token,
          },
          'contentType': 'json'
        })

        console.log("useRefreshTokenuseRefreshToken : ", data); // 419
        return data.Access;
      }
    } catch (e) {
      loginPage.render();
    }
  }

  async useAssessToken(token) {
    let obj = {
      token,
      data: null,
    }

    try {
      let res = await fetch('http://www.litriggy.com:7777/api/v1/auth/check', {
        method: "GET",
        headers: {
          authorization: token,
        },
        'contentType': 'json'
      })

      const data = await res.json();
      obj.data = data.data;

      if (data.status == 419) {
        // 419 에러
        let authorization = await useRefreshToken();
        obj.token = authorization;

        let data = await request('/auth/check', {
          method: "GET",
          headers: {
            authorization,
          },
          'contentType': 'json'
        })

        obj = {
          ...obj,
          data: data.data,
        }

        removeItem('accessToken');
        setItem('accessToken', obj.token);
      }

      return obj;
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  }

  async getBalance(accessToken) {
    const balance = await request("/user/balances/0/10", {
      method: "GET",
      headers: {
        authorization: accessToken,
        "Content-Type": "application/json",
      },
    });

    this.#state = {
      ...this.#state,
      balance,
    }
  }

  async getHistoryData() {
    const token = getItem('accessToken');
    const data = await request("/user/tx/0/30", {
      method: "GET",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });

    console.log('history', data);
    return data;
  }

  async init() {
    const token = getItem('accessToken');

    if (this.#state.userInfo == null && token == undefined) {
      routeChange('/index.html'); // 로그인
    } else {
      const data = await this.useAssessToken(token);
      this.#state.userInfo = data.data;
      await this.getBalance(data.token);
      this.$header.setState(this.#state.userInfo);
      routeChange('/asset');
    }
  }

  route = async () => {
    const { pathname } = location;
    if (pathname === '/index.html') {
      document.querySelector('.header').style.display = "none";
      document.querySelector('.footer').style.display = "none";
    } else {
      document.querySelector('.header').style.display = "flex";
      document.querySelector('.footer').style.display = "flex";
    }

    if (pathname === '/index.html') {
      new LoginPage(
        {
          $target: this.$routeView,
          login: this.login.bind(this),
        });
    } else if (pathname === '/asset') {
      const token = getItem('accessToken');
      await this.getBalance(token);
      new AssetPage(
        this.$routeView,
        { 
          balance: this.#state.balance,
          routeChange, 
        });
    } else if (pathname === '/nft') {
      new NftPage(this.$routeView, 
        {
          routeChange,
        });
    } else if (pathname === '/history') {
      const data = await this.getHistoryData();
      new HistoryPage(this.$routeView, 
        { 
          routeChange, 
          data,
          userInfo: this.#state.userInfo,
        });
    } else if (pathname === '/transfer') {
      new TransferPage(this.$routeView, 
        {
          routeChange,
          userInfo: this.#state.userInfo,
          balance: this.#state.balance,
          transferToken: this.transferToken.bind(this),
          userCheck: this.userCheck,
        });
    }
  }

  async userCheck(e) {
    let obj = {
      userEmail: '',
      userName: '',
      flag: false, 
    };

    const email = e.target.value;
    // const email = 'shleeb@sandboxnetwork.net';
    console.log('email', email);
    
    try {
      const data = await request(`/user/name/${email}`);
      console.log('check :', data);
      if(data.status === 200) {
        obj = {
          userEmail: email,
          userName: data.lastname+data.firstname,
          flag: true, 
        }
        return obj;
      }
    } catch(e) {  
      console.log(e);
    }
     
    alert('아이디가 유효하지 않습니다.');
    return obj;
  }

  logout() {
    removeItem('accessToken');
    removeItem('refreshToken');

    window.close();
  }

  async login() {
    const { token } = await chrome.identity.getAuthToken({ interactive: true });

    if (token == null) {
      console.log('login fail');
      return;
    }

    try {
      const data = await request("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AccessToken: token,
          OauthType: "google",
        }),
      });

      if (data.status === 200) {
        removeItem('accessToken');
        removeItem('refreshToken');

        setItem('accessToken', data['access-token']);
        setItem('refreshToken', data['refresh-token']);

        this.#state.userInfo = data['message'];
        this.$header.setState(this.#state.userInfo);
        routeChange('/asset');
      }

      // await getBalance(data['access-token']);
      // myPage.setState(self.state);

    } catch (e) {
      console.log(e);
    }
  }


}