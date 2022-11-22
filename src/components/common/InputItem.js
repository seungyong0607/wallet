import Component from "../../core/Component.js";

class InputItem extends Component {
  template() {
    const { label, receiverInput, type } = this.$props;

    return `
    <div class="itemLabel">
      <span>${label}</span>
    </div>
    <div class="itemContent">
      <input type="${type}" class="inputs ${type=="number" ? 'inputNumber': ''}" onChange="${receiverInput}" value="" />
    </div>
    `
  }
}

export default InputItem;


// function InputItem({ $target, label, value, focusOut }) {
//   this.render = () => {
//     let $subItemWrap = document.createElement('div');
//     $subItemWrap.classList = `sub_item_wrap`;

//     let $input = document.createElement('input');
//     $input.classList = 'sub_item_input';
//     $input.value = 'seungyong@sandboxnetwork.net';

//     $input.addEventListener('focusout', (event) => { focusOut(event) });
//     // <input type="text" value="${value}" class="sub_item_input" />

//     $subItemWrap.innerHTML = `
//       <span class="text">${label}</span>
//     `;

//     $subItemWrap.appendChild($input);


//     $target.appendChild($subItemWrap);
//   }

//   this.render();

// }

// export default InputItem;