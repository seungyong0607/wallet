import Component from "../core/Component.js";

import UserLabelItem from "../components/common/UserLabelItem.js";
import TokenLabelItem from "../components/common/TokenLabelItem.js";
import SelectItem from "../components/common/selectItem.js";
import InputItem from "../components/common/InputItem.js";
import TransferButtonItem from "../components/common/TransferButtonItem.js";
import EmailCheckItem from "../components/EmailCheckItem.js";

class TransferPage extends Component {
  template() {
    return `
      <div class="transferCard card">
        <div class="titleArea">
          <h2 class="title">토큰 전송</h2> 
        </div>
        <div class="contentArea">
          <div class="tokenSelect itemWrap"></div>
          <div class="sender itemWrap"></div>
          <div class="receiver itemWrap"></div>
          <div class="checkedReceiver itemWrap" style="display: none"></div>
          <div class="tokenAbleCount itemWrap"></div>
          <div class="tokenCount itemWrap"></div>
          <div class="buttonArea itemWrap"></div>
        </div>
      </div>
    `
  }

  mounted() {

    const { transferToken, userInfo, balance, userCheck } = this.$props;
    console.log(balance);
    // const $contentArea = this.$target.querySelector('.contentArea');
    const $tokenSelect = this.$target.querySelector('.tokenSelect');
    const $receiver = this.$target.querySelector('.receiver');
    const $checkedReceiver = this.$target.querySelector('.checkedReceiver');
    const $sender = this.$target.querySelector('.sender');
    const $tokenCount = this.$target.querySelector('.tokenCount');
    const $tokenAbleCount = this.$target.querySelector('.tokenAbleCount');
    const $buttonArea = this.$target.querySelector('.buttonArea');
    // const email = 'shleeb@sandboxnetwork.net';

    const self = this;

    const callBackUserCheck = async (e, fn) => {
      const obj = await fn(e);

      $transferButtonItem.setState({ buttonFlag: obj.flag });

      if(obj.flag) {
        console.log(obj.flag, self.$target.querySelector('.receiver'));
        self.$target.querySelector('.receiver').style.display= 'none';
        self.$target.querySelector('.checkedReceiver').style.display= 'flex';
        // self.setState({ receiver:obj.userEmail, amount: 100, })

        new UserLabelItem($checkedReceiver, {
          label: '받는 사람',
          userInfo: {
            name: obj.userName,
            email: obj.userEmail,
          },
          get: true,
        });
      }
    }

    new SelectItem($tokenSelect, {
      label: '토큰 선택',
      items: [
        { label: '--토큰을 선택해주세요.--', value: '' },
        { label: 'MCNT', value: 'mcnt' },
      ]
    });

    new UserLabelItem($sender, {
      label: '보낸 사람',
      userInfo: {
        name: userInfo.Lastname.String + " " + userInfo.Firstname.String,
        email: userInfo.Email.String,
      },
      get: false,
    });

    new EmailCheckItem($receiver, {
      label: '받는 사람',
      userCheck,
      callBackUserCheck,
    });

    new TokenLabelItem($tokenAbleCount, {
      label: '출금 가능',
      count: balance.amount,
    });

    new InputItem($tokenCount, {
      label: '출금 수량',
      type: 'number',
    });

    // receiver, amount

    const $transferButtonItem = new TransferButtonItem($buttonArea, {
      label: '전송',
      onSubmit: transferToken,
    })
  }
}

export default TransferPage;
