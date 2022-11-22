import Component from "../../core/Component.js";

class HistoryItem extends Component {
  template() {
    const { items, userInfo } = this.$props;
    const { ID } = userInfo;

    console.log(items);
    console.log(userInfo);

    return `
      ${items.map(item=> `
        <div class="historyItems">
          <div class="historyItemsTop">
           <span class="${ID === item.To ? 'deposit': 'withdraw'}">${ID === item.To ? '입금': '출금'}</span>
            <div class="acount">
              <p class="count">${item.Amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} MCNT</p>
              <p class="dollor">$ 77~</p>
            </div>
            <span class="state">완료</span>
          </div>
          <div class="historyItemsBottom">
            <div class="id">
              <p>
                거래ID
              </p>
              <p>
                ${item.To}
              </p>
            </div>
            <div class="time">
              ${(new Date(item.Createdat).getMonth()+1).toString() +'-'+ new Date(item.Createdat).getDate().toString() +' '+ new Date(item.Createdat).getHours().toString() +':'+ new Date(item.Createdat).getMinutes().toString() +":"+ (("0" + new Date(item.Createdat).getSeconds().toString()).slice(-2))   }
            </div>
          </div>
        </div>`).join('')
      }
    `
  }
}

{/* <span class="${item.type}">${item.type == "deposit" ? '입금': '출금'}</span> */}
export default HistoryItem;