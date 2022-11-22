
export default function LoginPage({ $target, login }) {
  $target.innerHTML = ``;
  const imgSrc = "/public/btn_google_signin_dark_normal_web.png";

  const $page = document.createElement('div');
  $page.className = 'LoginPage';
  $page.innerHTML = `
    <div class="welcome">
      <p>MCNT에</p>
      <p>오신 것을</p>
      <p>환영합니다.</p>
    </div>
    <div class="loginDesc">
      <!--<p>계정에 접근하기 위해 </p>-->
      <p>
        구글 로그인 해주시기 바랍니다.
      <p>
    </div>
    <div class="loginButton">
      <img id="login_button" src="${imgSrc}" />
    </div>
  `;

  $target.appendChild($page);

  $target.querySelector('.loginButton').addEventListener('click', () => {
    login();
  })
}