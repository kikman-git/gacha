import React from 'react';
import '../styles/Header.css';
import logo from '../resources/RakutenLogo.png';




function Header() {

  return (
    <div className="header">
      <div className="logo">
        <a herf="#">
          <img src={logo} width="175" height="100" alt="logo" /></a>
      </div>
      {/* <nav>
        <ul>
          <h3>Let's Gacha!</h3>
        </ul>
      </nav> */}
    </div>
    // <div className="header">
    //     {/* <div className="logo">
    //         <a href="https://www.rakuten.co.jp/">
    //             <img src={logo} alt = "logo"/>
    //         </a>
    //     </div> */}
    //     <h3>Let's Gacha!</h3>
    // </div>
  );
}

export default Header;
