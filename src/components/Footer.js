import Component from "../core/Component.js";
import { routeChange } from "../util/router.js";

class Footer extends Component {
  render() {
    const footer = document.createElement('footer');
    footer.classList = `footer`;
    footer.innerHTML = `
      <ul class="footerMenu">
        <li id="asset">
          <i class="fa-solid fa-coins footerIcons"></i>
          coin
        </span>
        </li>
        <li id="nft">
          <i class="fa-solid fa-image footerIcons"></i>
          <span>nft</span>
        </li>
        <li id="transfer">
          <i class="fa-solid fa-money-bill-transfer footerIcons"></i>
          <span>transfer</span>
        </li>
        <li id="history">
          <i class="fa-solid fa-clock-rotate-left footerIcons"></i>
          <span>history</span>
        </li>
      </ul>
    `;
    this.$target.appendChild(footer);
  }

  setEvent() { 
    this.addEvent('click', '#asset', () => {
      routeChange('/asset');
    })
    
    this.addEvent('click', '#nft', () => {
      routeChange('/nft');
    })
    
    this.addEvent('click', '#transfer', () => {
      routeChange('/transfer');
    })

    this.addEvent('click', '#history', () => {
      routeChange('/history');
    })
  }

}

export default Footer;