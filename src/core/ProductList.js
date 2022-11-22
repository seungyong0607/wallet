import Component from "../core/Component.js"

export default class ProductList extends Component {
  $productList;

  constructor({ $target, initialState }) {
    this.$productList = document.createElement('ul');
    this.$target = $target;
    this.$target.appendChild()
  }
}