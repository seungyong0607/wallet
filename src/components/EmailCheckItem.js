import Component from "../core/Component.js";

class EmailCheckItem extends Component {
  template() {
    const { label } = this.$props;

    return `
      <div class="itemLabel">
        <span>${label}</span>
      </div>
      <div class="itemContent">
        <input type="text" id="emailInput" class="inputs" value="" />
      </div>
    `
  }

  setEvent() {
    const { userCheck, callBackUserCheck } = this.$props; 
    this.addEvent('focusout', '#emailInput', (e) => callBackUserCheck(e, userCheck));
  }

}

export default EmailCheckItem;