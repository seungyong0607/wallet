import Component from "../../core/Component.js";
 
class TransferButtonItem extends Component {

  setup() {
    this.$state = {
      ...this.$state,
      buttonFlag: 'disabled',
    }
  }

  template() {
    const { buttonFlag } = this.$state;
    const { label } = this.$props;
    return `
      <button class="transferButton ${buttonFlag == true ? 'able' : 'disabled'}"}>${label}</button>
    `
  }

  setEvent() {
    const { onSubmit } =  this.$props;
    this.addEvent('click', '.disabled', () => {
      alert('입력을 완료해주세요.');
    })

    this.addEvent('click', '.able', () => {
      onSubmit();
    })
  }
}

export default TransferButtonItem;