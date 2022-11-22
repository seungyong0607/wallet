import Component from "../../core/Component.js";

class TokenLabelItem extends Component {
  template() {
    const { label, count } = this.$props; 
    
    return `
    <div class="itemLabel">
      <span>${label}</span>
    </div>
    <div class="itemContent">
      <p style="text-align:right">${count[2].Holdingasset.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} MCNT</p>
    </div>
    `
  }
}

export default TokenLabelItem;