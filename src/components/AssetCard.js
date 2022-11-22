import Component from "../core/Component.js";

export default class AssetCard extends Component {

  template() {
    console.log(this);
    const { balance } = this.$props;
    return `
      ${balance.amount.map(item => `
        <div class="assetCard">
          <p class="desc">${item.Tokenname.String.toUpperCase()} Balance</p>
          <div>
            <span class="balance">${item.Holdingasset.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
            <span class="mcnt">${item.Tokenname.String.toUpperCase()}</span>
          </div>
          <p class="dollar">
          $ 9.35~
          </p>
        </div>
      `).join('')}
   `;
  }
}