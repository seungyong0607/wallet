import HistoryItem from "../components/common/HistoryItem.js";
import Component from "../core/Component.js";

class HistoryPage extends Component {
  template() {
    return `
      <div class="historyCard card">
        <div class="titleArea">
          <h2 class="title">입출금내역</h2> 
        </div>
        <div class="contentArea historyContent">
        </div>
      </div>
    `;
  }

  mounted() {
    const $contentArea = this.$target.querySelector('.contentArea');
    const { data, userInfo }  = this.$props;
    new HistoryItem($contentArea, {
      items: data.data,
      userInfo, 
      // {
      //   type: 'deposit',
      //   count: 2400,
      //   dollar: '2,400$',
      //   state: '완료',
      //   id: 'seungyong@sandboxnetwork.net',
      //   time: '2022.10.24 18:46',
      // }, 
    })

  }
}

export default HistoryPage;
