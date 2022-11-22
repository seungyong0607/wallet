import Component from "../../core/Component.js";

class UserLabelItem extends Component {
  template() {
    const { label, userInfo,get } = this.$props; 
    return `
      <div class="itemLabel">
        <span>${label}</span>
      </div>
      <div class="itemContent">
        <p>
          ${userInfo.name}
        </p>
        <p id="${get == false ? 'receiver' : 'getReceiver'}" style="font-size:12px !important;">
          ${userInfo.email}
        </p>
      </div>
    `
  }
}

export default UserLabelItem;