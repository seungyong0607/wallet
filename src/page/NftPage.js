import Component from "../core/Component.js";

class NftPage extends Component {
  template() {
    return `
      <div class="NftCard card">
        <div class="titleArea">
          <h2 class="title">My NFT's</h2> 
        </div>
        <div class="contentArea">
        </div>
      </div>
    `;
  }

  mounted() {
    const $deposit = this.$target.querySelector('.deposit');
    const $withdraw = this.$target.querySelector('.withdraw');
  }
}

export default NftPage;
