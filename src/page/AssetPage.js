import AssetCard from "../components/AssetCard.js";
import Component from "../core/Component.js";

class AssetPage extends Component {
  template(){
    return `
    <div class="AssetPage routeView"></div>
  `;
  }

  mounted() {
    // this.$props.$state;
    const $page = this.$target.querySelector('.AssetPage');
    const { balance } = this.$props;
    new AssetCard($page, {
      balance,
    });
    
    // $page.
  }
}

export default AssetPage;