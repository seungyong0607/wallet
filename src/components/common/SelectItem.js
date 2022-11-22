import Component from "../../core/Component.js";

class SelectItem extends Component {
  template() {
    const { label , items } = this.$props;
    return `
      <div class="itemLabel">
        <span>${label}</span>
      </div>
      <div class="itemContent">
        <select name="tokens" id="token-select" class="inputs">
          ${items.map(item => `<option value="${item.value}">${item.label}</option>`).join('')}
        </select>
      </div>
    `
  }
}

export default SelectItem;