import Component from "../core/Component.js";

class RouterView extends Component {
  render() {
    const main = document.createElement('main');
    main.classList = `main`;
    main.innerHTML = `<h1>routerView</h1>`;
    this.$target.appendChild(main);
  }
}

export default RouterView;