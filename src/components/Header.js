import Component from "../core/Component.js";

class Header extends Component {
  template() {
    if(location.pathname == 'index.html') return ;

    if(this.$state == undefined ) {
      return '';
    }

    const fullName = this.$state.Lastname.String + this.$state.Firstname.String;

    return `
      <i class="fa-solid fa-lock backButton logout"></i>
      <span class="username">
        ${fullName}
      </span>
    `;
  }

  setEvent() {
    const { logout } = this.$props;

    this.addEvent('click', '.logout', () => {
      logout();
    });
  }
}

export default Header;